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
import { Mesa } from "@/components/poker/mesa"
import {
  POTE_PRE,
  TURN_BARREL,
  situacoesBarrel,
  type AcaoBarrel,
  type SituacaoBarrel,
} from "@/data/prat03"
import { Ficha, SeletorTema, type Tema } from "@/pages/pratica-probe"
import { shuffle, type ItemSessao, type Sessao } from "@/lib/poker"
import { KEYS, lerSessoes, writeJSON } from "@/lib/storage"
import { useRefazerPendente } from "@/lib/refazer"

type Fase = "setup" | "jogo" | "fim"

const r1 = (n: number) => Math.round(n * 10) / 10
// Pote e stack no turn, depois da c-bet do flop e do call do BB (40bb, pote de 4,5).
const poteTurn = (flop: number) => r1(POTE_PRE * (1 + 2 * flop))
const stackTurn = (flop: number) => r1(38 - POTE_PRE * flop)

const ACOES: {
  a: AcaoBarrel
  rotulo: string
  tecla: string
  frac: number
  cor: string
}[] = [
  {
    a: "Check",
    rotulo: "CHECK",
    tecla: "C",
    frac: 0,
    cor: "bg-[#37829b] hover:bg-[#3f92ae]",
  },
  {
    a: "B40",
    rotulo: "BET 40%",
    tecla: "1",
    frac: 0.4,
    cor: "bg-[#c4602b] hover:bg-[#d4703b]",
  },
  {
    a: "B70",
    rotulo: "BET 70%",
    tecla: "2",
    frac: 0.7,
    cor: "bg-[#a63a3a] hover:bg-[#b84a4a]",
  },
  {
    a: "Geo",
    rotulo: "2E",
    tecla: "3",
    frac: -1,
    cor: "bg-[#7a2f6b] hover:bg-[#8c3b7c]",
  },
]

const NOME_ACAO: Record<AcaoBarrel, string> = {
  Check: "check",
  B40: "bet 40%",
  B70: "bet 70%",
  Geo: "bet 2E (geométrico)",
}

const ehBet = (a: string) => a.startsWith("B") || a === "Geo"

// Fração do pote que esvazia o stack em duas apostas iguais, turn e river.
const geometrico = (pote: number, stack: number) =>
  (Math.sqrt(1 + (2 * stack) / pote) - 1) / 2

export default function PraticaBarrel({
  onTema,
}: {
  onTema: (t: Tema) => void
}) {
  const [fase, setFase] = useState<Fase>("setup")
  const [qty, setQty] = useState("10")
  const [fila, setFila] = useState<SituacaoBarrel[]>([])
  const [i, setI] = useState(0)
  const [itens, setItens] = useState<ItemSessao[]>([])
  const [resp, setResp] = useState<AcaoBarrel | null>(null)
  const [sessId, setSessId] = useState(0)
  const [levada, setLevada] = useState(false)
  // Guarda síncrona contra duas teclas no mesmo quadro.
  const respondido = useRef(false)

  const atual = fila[i]
  const turn = atual ? TURN_BARREL[atual.tipo] : undefined

  const responder = useCallback(
    (a: AcaoBarrel) => {
      if (!atual || !turn || respondido.current) return
      respondido.current = true
      setItens((prev) => [
        ...prev,
        {
          sid: atual.id,
          tipo: turn.nome,
          bucket: 0,
          rng: 0,
          resp: a,
          esperado: atual.certa,
          ok: a === atual.certa,
          board: turn.board,
          hero: atual.hero,
          classe: atual.classe,
          porque: atual.porque,
          nota: `Em posição, no ${atual.pos}.`,
        },
      ])
      setResp(a)
    },
    [atual, turn]
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

  useRefazerPendente("03", situacoesBarrel, comecar)

  function iniciar(e: React.FormEvent) {
    e.preventDefault()
    const n = Number(qty)
    let pool = shuffle(situacoesBarrel)
    if (n && pool.length > n) pool = pool.slice(0, n)
    comecar(pool)
  }

  function comecar(pool: SituacaoBarrel[]) {
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
      modulo: "03",
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
          lead="Treine as decisões do módulo 03. Você abriu de HJ, CO ou BTN com 40bb, deu c-bet no flop e o BB pagou. Escolha a ação no turn."
        />
        <div className="mx-auto max-w-[1080px] px-5 pb-20">
          <form
            onSubmit={iniciar}
            className="mx-auto grid max-w-xl gap-7 rounded-[22px] border bg-card p-6 md:p-8"
          >
            <SeletorTema tema="barrel" onTema={onTema} />
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
        tituloTipos="Por tipo de turn"
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

  if (!atual || !turn) return null
  const ok = resp === atual.certa
  const ultimo = i === fila.length - 1
  const pote = poteTurn(turn.flop)
  const stack = stackTurn(turn.flop)
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
        <Ficha nome={atual.pos} acao="Raise 2" />
        <Ficha nome="BB" acao="Call" />
        <span className="px-1 text-xs text-muted-foreground">Flop</span>
        <Ficha nome={atual.pos} acao={`bet ${Math.round(turn.flop * 100)}%`} />
        <Ficha nome="BB" acao="Call" />
        <span className="px-1 text-xs text-muted-foreground">Turn</span>
        <Ficha nome="BB" acao="Check" />
        <Ficha
          nome={atual.pos}
          acao={resp ? NOME_ACAO[resp] : "Tomar ação"}
          vez
        />
      </div>

      <Mesa
        opener="HJ"
        board={turn.board}
        hero={atual.hero}
        mao={i + 1}
        total={fila.length}
        sequencia={sequencia}
        gen={{
          heroPos: atual.pos,
          vilaoPos: "BB",
          stack: 40,
          stackHero: stack,
          stackVilao: stack,
          pote,
          rotuloVilao: "Check",
          acaoVilao: "",
        }}
      />

      <div className="mx-auto mt-4 grid max-w-[880px] grid-cols-2 gap-2 sm:grid-cols-4 md:gap-3">
        {ACOES.map(({ a, rotulo, tecla, frac, cor }) => (
          <BotaoResposta
            key={a}
            rotulo={rotulo}
            sub={
              frac === 0
                ? ""
                : frac < 0
                  ? `${r1(pote * geometrico(pote, stack))} bb (${Math.round(geometrico(pote, stack) * 100)}%)`
                  : `${r1(pote * frac)} bb`
            }
            tecla={tecla}
            cor={cor}
            estado={estadoDe(a, resp, atual.certa)}
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
              </strong>{" "}
              no{" "}
              <strong className="text-foreground">
                {nomeNaFrase(turn.nome)}
              </strong>
              .
            </p>
            <p className="max-w-[64ch] text-lg text-muted-foreground">
              <strong className="text-foreground">{atual.classe}</strong>:{" "}
              {destacar(atual.porque)}
            </p>
            <p className="max-w-[64ch] text-muted-foreground">
              {destacar(turn.estrategia)}
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
                tema="Second Barrel IP"
                questao={atual.id}
                contexto={{
                  board: turn.board.join(" "),
                  posicao: atual.pos,
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
