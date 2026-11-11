import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowLeft, Square } from "lucide-react"
import {
  BotaoResposta,
  CartaoResultado,
  estadoDe,
} from "@/components/poker/resposta"
import { ResultadoFinal, nomeNaFrase } from "@/components/poker/resultado-final"
import { RelatarErro } from "@/components/poker/relatar-erro"
import { destacar } from "@/components/poker/destacar"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Mesa, valorBB } from "@/components/poker/mesa"
import {
  BOARD_CBET,
  situacoesCbet,
  type AcaoCbet,
  type SituacaoCbet,
} from "@/data/prat01"
import { Ficha, SeletorTema, type Tema } from "@/pages/pratica-probe"
import { shuffle, type ItemSessao, type Sessao } from "@/lib/poker"
import { KEYS, lerSessoes, writeJSON } from "@/lib/storage"

type Fase = "setup" | "jogo" | "fim"

// Pote single raised de 20bb: o BTN abriu 2, o SB deu fold e o BB pagou.
const POTE = 4.5
const bb = (f: number) => (Math.round(POTE * f * 10) / 10).toString()

const ACOES: {
  a: AcaoCbet
  rotulo: string
  sub: string
  tecla: string
  cor: string
}[] = [
  {
    a: "Check",
    rotulo: "CHECK",
    sub: "",
    tecla: "C",
    cor: "bg-[#37829b] hover:bg-[#3f92ae]",
  },
  {
    a: "B25",
    rotulo: "BET 25%",
    sub: `${bb(0.25)} bb`,
    tecla: "1",
    cor: "bg-[#b7791f] hover:bg-[#c98a2b]",
  },
  {
    a: "B40",
    rotulo: "BET 40%",
    sub: `${bb(0.4)} bb`,
    tecla: "2",
    cor: "bg-[#a63a3a] hover:bg-[#b84a4a]",
  },
]

const NOME_ACAO: Record<AcaoCbet, string> = {
  Check: "check",
  B25: "bet 25%",
  B40: "bet 40%",
}

const ehBet = (a: string) => a.startsWith("B")

export default function PraticaCbet({ onTema }: { onTema: (t: Tema) => void }) {
  const [fase, setFase] = useState<Fase>("setup")
  const [qty, setQty] = useState("10")
  const [fila, setFila] = useState<SituacaoCbet[]>([])
  const [i, setI] = useState(0)
  const [itens, setItens] = useState<ItemSessao[]>([])
  const [resp, setResp] = useState<AcaoCbet | null>(null)
  const [sessId, setSessId] = useState(0)
  const [levada, setLevada] = useState(false)
  // Guarda síncrona contra duas teclas no mesmo quadro.
  const respondido = useRef(false)

  const atual = fila[i]
  const board = atual ? BOARD_CBET[atual.tipo] : undefined

  const responder = useCallback(
    (a: AcaoCbet) => {
      if (!atual || !board || respondido.current) return
      respondido.current = true
      setItens((prev) => [
        ...prev,
        {
          sid: atual.id,
          tipo: board.nome,
          bucket: 0,
          rng: 0,
          resp: a,
          esperado: atual.certa,
          ok: a === atual.certa || !!atual.aceita?.includes(a),
          board: board.board,
          hero: atual.hero,
          classe: atual.classe,
          porque: atual.porque,
        },
      ])
      setResp(a)
    },
    [atual, board]
  )

  useEffect(() => {
    if (fase !== "jogo") return
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const k = e.key.toLowerCase()
      const alvo = ACOES.find((x) => x.tecla.toLowerCase() === k)
      if (alvo) responder(alvo.a)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [fase, responder])

  function iniciar(e: React.FormEvent) {
    e.preventDefault()
    const n = Number(qty)
    let pool = shuffle(situacoesCbet)
    if (n && pool.length > n) pool = pool.slice(0, n)
    comecar(pool)
  }

  function comecar(pool: SituacaoCbet[]) {
    setFila(pool)
    setI(0)
    setItens([])
    setResp(null)
    respondido.current = false
    setLevada(false)
    setFase("jogo")
  }

  // Joga de novo só as questões erradas da sessão, em outra ordem.
  function refazerErros() {
    const ids = new Set(itens.filter((x) => !x.ok).map((x) => x.sid))
    comecar(shuffle(fila.filter((q) => ids.has(q.id))))
  }

  // Fecha a sessão com as mãos respondidas até aqui e abre o resultado.
  function encerrar() {
    const sess: Sessao = {
      id: Date.now(),
      modulo: "01",
      total: itens.length,
      acertos: itens.filter((x) => x.ok).length,
      itens,
      levar: false,
    }
    writeJSON(KEYS.sessions, [...lerSessoes(), sess])
    setSessId(sess.id)
    setFase("fim")
  }

  function parar() {
    if (itens.length === 0) {
      setFase("setup")
      return
    }
    encerrar()
  }

  function proxima() {
    if (i === fila.length - 1) {
      encerrar()
      return
    }
    setI(i + 1)
    setResp(null)
    respondido.current = false
  }

  function levar() {
    writeJSON(
      KEYS.sessions,
      lerSessoes().map((s) => (s.id === sessId ? { ...s, levar: true } : s))
    )
    setLevada(true)
  }

  if (fase === "setup") {
    return (
      <main>
        <PageHeader
          title="Prática"
          lead="Treine as decisões do módulo 01. Você abriu do BTN com 20bb, o BB pagou e deu check no flop. Escolha a ação."
        />
        <div className="mx-auto max-w-[1080px] px-5 pb-20">
          <form
            onSubmit={iniciar}
            className="mx-auto grid max-w-xl gap-7 rounded-[22px] border bg-card p-6 md:p-8"
          >
            <SeletorTema tema="cbet" onTema={onTema} />
            <fieldset className="grid gap-2.5">
              <legend className="mb-1 font-medium text-muted-foreground">
                Quantidade
              </legend>
              <RadioGroup
                value={qty}
                onValueChange={setQty}
                className="flex flex-wrap gap-2"
              >
                {[
                  ["10", "10"],
                  ["20", "20"],
                  ["0", "Todas"],
                ].map(([v, label]) => (
                  <Label
                    key={v}
                    className="flex cursor-pointer items-center gap-2 rounded-full border bg-card px-3.5 py-2"
                  >
                    <RadioGroupItem value={v} />
                    {label}
                  </Label>
                ))}
              </RadioGroup>
            </fieldset>
            <div>
              <Button type="submit" size="lg" className="h-12 px-7 font-bold">
                Iniciar treino
              </Button>
            </div>
          </form>
        </div>
      </main>
    )
  }

  if (fase === "fim") {
    return (
      <ResultadoFinal
        itens={itens}
        tituloTipos="Por tipo de board"
        motivosDe={(erros) => [
          {
            nome: "Apostou quando era para dar check",
            n: erros.filter((x) => ehBet(x.resp) && x.esperado === "Check")
              .length,
          },
          {
            nome: "Check quando era para apostar",
            n: erros.filter((x) => x.resp === "Check").length,
          },
          {
            nome: "Size errado",
            n: erros.filter((x) => ehBet(x.resp) && ehBet(x.esperado)).length,
          },
        ]}
        levada={levada}
        onLevar={levar}
        onNovo={() => setFase("setup")}
        onRefazer={refazerErros}
      />
    )
  }

  if (!atual || !board) return null
  const ok = resp === atual.certa || !!(resp && atual.aceita?.includes(resp))
  // O que o botão mostra como certo: a ação escolhida, se o instrutor também a aceita.
  const certaNaTela = ok && resp ? resp : atual.certa
  const ultimo = i === fila.length - 1
  let sequencia = 0
  for (let k = itens.length - 1; k >= 0 && itens[k].ok; k--) sequencia++

  return (
    <main className="mx-auto max-w-[1080px] px-4 pt-6 pb-20 md:px-5">
      <div className="mx-auto mb-2 flex max-w-[880px] items-center justify-between gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="-ml-2 text-muted-foreground"
          onClick={() => setFase("setup")}
        >
          <ArrowLeft aria-hidden="true" /> Voltar à seleção
        </Button>
        <Button variant="outline" size="sm" onClick={parar}>
          <Square aria-hidden="true" /> Parar treino
        </Button>
      </div>
      <div
        className="mx-auto mb-3 flex max-w-[880px] flex-wrap items-center gap-1.5"
        aria-label="Ações até aqui"
      >
        <Ficha nome="BTN" acao="Raise 2" />
        <Ficha nome="SB" acao="Fold" />
        <Ficha nome="BB" acao="Call" />
        <span className="px-1 text-xs text-muted-foreground">Flop</span>
        <Ficha nome="BB" acao="Check" />
        <Ficha nome="BTN" acao={resp ? NOME_ACAO[resp] : "Tomar ação"} vez />
      </div>

      <Mesa
        cbet
        opener="HJ"
        board={board.board}
        hero={atual.hero}
        mao={i + 1}
        total={fila.length}
        sequencia={sequencia}
        fichasHero={valorBB(ACOES.find((x) => x.a === resp)?.sub)}
      />

      <div className="mx-auto mt-4 grid max-w-[880px] grid-cols-3 gap-2 md:gap-3">
        {ACOES.map(({ a, rotulo, sub, tecla, cor }) => (
          <BotaoResposta
            key={a}
            rotulo={rotulo}
            sub={sub}
            tecla={tecla}
            cor={cor}
            estado={estadoDe(a, resp, certaNaTela)}
            onClick={() => responder(a)}
          />
        ))}
      </div>

      <div aria-live="polite">
        {resp && (
          <CartaoResultado ok={ok}>
            <p className="max-w-[64ch] text-lg text-muted-foreground">
              {ok ? "A ação certa era " : "O certo era "}
              <strong className="text-foreground">
                {NOME_ACAO[atual.certa]}
              </strong>
              {ok && resp !== atual.certa && resp && (
                <> (o {NOME_ACAO[resp]} também vale)</>
              )}{" "}
              no board{" "}
              <strong className="text-foreground">
                {nomeNaFrase(board.nome)}
              </strong>
              , onde o c-bet fica perto de{" "}
              <strong className="text-foreground">{board.freq}</strong>.
            </p>
            <p className="max-w-[64ch] text-lg text-muted-foreground">
              <strong className="text-foreground">{atual.classe}</strong>:{" "}
              {destacar(atual.porque)}
            </p>
            <p className="max-w-[64ch] text-muted-foreground">
              {destacar(board.estrategia)}
            </p>
            <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
              <Button
                autoFocus
                size="lg"
                className="h-12 px-6 font-bold"
                onClick={proxima}
              >
                {ultimo ? "Ver resultado" : "Próxima mão"}
              </Button>
              <RelatarErro
                tema="C-Bet IP Short Stack"
                questao={atual.id}
                contexto={{
                  board: board.board.join(" "),
                  mao: atual.hero.join(" "),
                  resposta: String(resp),
                  certa: atual.certa,
                }}
              />
            </div>
          </CartaoResultado>
        )}
      </div>
    </main>
  )
}
