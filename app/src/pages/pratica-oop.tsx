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
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Mesa, valorBB } from "@/components/poker/mesa"
import {
  NOME_ESTRATEGIA,
  TEXTURAS,
  situacoesOop,
  type AcaoOop,
  type Cenario,
  type SituacaoOop,
  type TexturaOop,
} from "@/data/prat05"
import { Ficha, SeletorTema, type Tema } from "@/pages/pratica-probe"
import { shuffle, type ItemSessao, type Sessao } from "@/lib/poker"
import { KEYS, lerSessoes, writeJSON } from "@/lib/storage"

type Fase = "setup" | "jogo" | "fim"
type Escolha = "EP" | "CO" | "os dois"

// Pote single raised de 40bb: o herói abriu 2, o BTN pagou e o SB e o BB deram fold.
const POTE = 5.5
const bb = (f: number) => (Math.round(POTE * f * 10) / 10).toString()

const ACOES: {
  a: AcaoOop
  rotulo: string
  sub: string
  tecla: string
  cor: string
}[] = [
  {
    a: "Check-call",
    rotulo: "CHECK-CALL",
    sub: "",
    tecla: "C",
    cor: "bg-[#37829b] hover:bg-[#3f92ae]",
  },
  {
    a: "Check-raise",
    rotulo: "CHECK-RAISE",
    sub: "",
    tecla: "R",
    cor: "bg-[#6d4aa8] hover:bg-[#7d5ab8]",
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
    cor: "bg-[#c4602b] hover:bg-[#d4703b]",
  },
  {
    a: "B70",
    rotulo: "BET 70%",
    sub: `${bb(0.7)} bb`,
    tecla: "3",
    cor: "bg-[#a63a3a] hover:bg-[#b84a4a]",
  },
]

const NOME_ACAO: Record<AcaoOop, string> = {
  "Check-call": "check-call",
  "Check-raise": "check-raise",
  B25: "bet 25%",
  B40: "bet 40%",
  B70: "bet 70%",
}

const NOME_CENARIO: Record<Cenario, string> = {
  EP: "EP contra o BTN",
  CO: "CO contra o BTN",
}

const ehBet = (a: string) => a.startsWith("B")
const TEXTURAS_IDS = Object.keys(TEXTURAS) as TexturaOop[]

function contagem(c: Cenario[], t: TexturaOop): number {
  return situacoesOop.filter((s) => s.textura === t && c.includes(s.cenario))
    .length
}

export default function PraticaOop({ onTema }: { onTema: (t: Tema) => void }) {
  const [fase, setFase] = useState<Fase>("setup")
  const [escolha, setEscolha] = useState<Escolha>("os dois")
  const [texturas, setTexturas] = useState<TexturaOop[]>(TEXTURAS_IDS)
  const [qty, setQty] = useState("10")
  const [erro, setErro] = useState("")
  const [fila, setFila] = useState<SituacaoOop[]>([])
  const [i, setI] = useState(0)
  const [itens, setItens] = useState<ItemSessao[]>([])
  const [resp, setResp] = useState<AcaoOop | null>(null)
  const [sessId, setSessId] = useState(0)
  const [levada, setLevada] = useState(false)
  // Guarda síncrona contra duas teclas no mesmo quadro.
  const respondido = useRef(false)

  const cenarios: Cenario[] = escolha === "os dois" ? ["EP", "CO"] : [escolha]
  const atual = fila[i]

  const responder = useCallback(
    (a: AcaoOop) => {
      if (!atual || respondido.current) return
      respondido.current = true
      setItens((prev) => [
        ...prev,
        {
          sid: atual.id,
          tipo: `${TEXTURAS[atual.textura].nome} · ${atual.cenario}`,
          bucket: 0,
          rng: 0,
          resp: a,
          esperado: atual.certa,
          ok: a === atual.certa,
          board: atual.board,
          hero: atual.hero,
          classe: atual.classe,
          porque: atual.porque,
          nota: `${atual.naipes} ${atual.cenario} contra o BTN.`,
        },
      ])
      setResp(a)
    },
    [atual]
  )

  useEffect(() => {
    if (fase !== "jogo") return
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if ((e.target as HTMLElement | null)?.tagName === "TEXTAREA") return
      const k = e.key.toLowerCase()
      const alvo = ACOES.find((x) => x.tecla.toLowerCase() === k)
      if (alvo) responder(alvo.a)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [fase, responder])

  function iniciar(e: React.FormEvent) {
    e.preventDefault()
    if (texturas.length === 0) {
      setErro("Escolha ao menos um tipo de board.")
      return
    }
    const n = Number(qty)
    let pool = shuffle(
      situacoesOop.filter(
        (s) => cenarios.includes(s.cenario) && texturas.includes(s.textura)
      )
    )
    if (n && pool.length > n) pool = pool.slice(0, n)
    setErro("")
    comecar(pool)
  }

  function comecar(pool: SituacaoOop[]) {
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
      modulo: "05",
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
          lead="Treine as decisões do módulo 05. Você abriu de EP ou de CO com 40bb, o BTN pagou e você age primeiro no flop. Os naipes do board e da sua mão decidem a jogada."
        />
        <div className="mx-auto max-w-[1080px] px-5 pb-20">
          <form
            onSubmit={iniciar}
            className="mx-auto grid max-w-xl gap-7 rounded-[22px] border bg-card p-6 md:p-8"
          >
            <SeletorTema tema="oop" onTema={onTema} />

            <fieldset className="grid gap-2.5">
              <legend className="mb-1 font-medium text-muted-foreground">
                Cenário
              </legend>
              <RadioGroup
                value={escolha}
                onValueChange={(v) => setEscolha(v as Escolha)}
                className="flex flex-wrap gap-2"
              >
                {[
                  ["EP", "EP contra BTN"],
                  ["CO", "CO contra BTN"],
                  ["os dois", "Os dois"],
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

            <fieldset className="grid gap-2.5">
              <legend className="mb-1 font-medium text-muted-foreground">
                Tipos de board
              </legend>
              <div className="flex flex-wrap gap-2">
                {TEXTURAS_IDS.map((t) => {
                  const n = contagem(cenarios, t)
                  const off = n === 0
                  return (
                    <Label
                      key={t}
                      className={
                        "flex items-center gap-2 rounded-full border bg-card px-3.5 py-2 " +
                        (off ? "opacity-45" : "cursor-pointer")
                      }
                    >
                      <Checkbox
                        disabled={off}
                        checked={!off && texturas.includes(t)}
                        onCheckedChange={(v) =>
                          setTexturas((prev) =>
                            v ? [...prev, t] : prev.filter((x) => x !== t)
                          )
                        }
                      />
                      {TEXTURAS[t].nome}
                      <span className="text-muted-foreground">
                        {off ? "só no CO" : n}
                      </span>
                    </Label>
                  )
                })}
              </div>
            </fieldset>

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
                  ["50", "50"],
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

            <p role="alert" className="min-h-6 text-destructive">
              {erro}
            </p>
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
            n: erros.filter((x) => ehBet(x.resp) && !ehBet(x.esperado)).length,
          },
          {
            nome: "Check quando era para apostar",
            n: erros.filter((x) => !ehBet(x.resp) && ehBet(x.esperado)).length,
          },
          {
            nome: "Size errado",
            n: erros.filter((x) => ehBet(x.resp) && ehBet(x.esperado)).length,
          },
          {
            nome: "Check-call no lugar de check-raise, ou o contrário",
            n: erros.filter((x) => !ehBet(x.resp) && !ehBet(x.esperado)).length,
          },
        ]}
        levada={levada}
        onLevar={levar}
        onNovo={() => setFase("setup")}
        onRefazer={refazerErros}
      />
    )
  }

  if (!atual) return null
  const textura = TEXTURAS[atual.textura]
  const ok = resp === atual.certa
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
        <Ficha nome={atual.heroPos} acao="Raise 2" />
        <Ficha nome="BTN" acao="Call" />
        <span className="px-1 text-xs text-muted-foreground">Flop</span>
        <Ficha
          nome={atual.heroPos}
          acao={resp ? NOME_ACAO[resp] : "Tomar ação"}
          vez
        />
      </div>

      <Mesa
        opener="HJ"
        board={atual.board}
        hero={atual.hero}
        mao={i + 1}
        total={fila.length}
        sequencia={sequencia}
        fichasHero={valorBB(ACOES.find((x) => x.a === resp)?.sub)}
        gen={{
          heroPos: atual.heroPos,
          vilaoPos: "BTN",
          stack: 40,
          stackHero: 38,
          stackVilao: 38,
          pote: POTE,
          rotuloVilao: "Pagou 2",
          acaoVilao: "",
        }}
      />

      <div className="mx-auto mt-4 grid max-w-[880px] grid-cols-2 gap-2 sm:grid-cols-5 md:gap-3">
        {ACOES.map(({ a, rotulo, sub, tecla, cor }) => (
          <BotaoResposta
            key={a}
            rotulo={rotulo}
            sub={sub}
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
              no board{" "}
              <strong className="text-foreground">
                {nomeNaFrase(textura.nome)}
              </strong>
              , {NOME_CENARIO[atual.cenario]}.
            </p>
            <p className="max-w-[64ch] text-lg text-muted-foreground">
              <strong className="text-foreground">{atual.classe}</strong>:{" "}
              {destacar(atual.porque)}
            </p>
            <p className="max-w-[64ch] text-lg text-muted-foreground">
              {destacar(atual.naipes)}
            </p>
            <p className="max-w-[64ch] text-muted-foreground">
              {NOME_CENARIO[atual.cenario]}:{" "}
              <strong className="text-foreground">
                {NOME_ESTRATEGIA[atual.estrategia]}
              </strong>
              {atual.size ? ` em ${atual.size}` : ""} neste tipo de board.
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
                tema="C-Bet OOP 40bb"
                questao={atual.id}
                contexto={{
                  board: atual.board.join(" "),
                  cenario: atual.cenario,
                  posicao: atual.heroPos,
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
