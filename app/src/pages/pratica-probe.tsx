import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowLeft, Square } from "lucide-react"
import {
  BotaoResposta,
  CartaoResultado,
  estadoDe,
} from "@/components/poker/resposta"
import { ResultadoFinal } from "@/components/poker/resultado-final"
import { RelatarErro } from "@/components/poker/relatar-erro"
import { destacar } from "@/components/poker/destacar"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Mesa } from "@/components/poker/mesa"
import { mod14, turnById } from "@/data/mod14"
import {
  ROTULO_TURN,
  situacoesProbe,
  type AcaoProbe,
  type SituacaoProbe,
} from "@/data/prat14"
import { shuffle, type ItemSessao, type Sessao } from "@/lib/poker"
import { KEYS, lerSessoes, writeJSON } from "@/lib/storage"
import { cn } from "@/lib/utils"

type Fase = "setup" | "jogo" | "fim"

// Pote single raised: o BTN abriu 2, o SB deu fold e o BB pagou, com o small blind morto.
const POTE = 4.5
const bb = (f: number) => (Math.round(POTE * f * 10) / 10).toString()

const ACOES: {
  a: AcaoProbe
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
    a: "B40",
    rotulo: "BET 40%",
    sub: `${bb(0.4)} bb`,
    tecla: "1",
    cor: "bg-[#b7791f] hover:bg-[#c98a2b]",
  },
  {
    a: "B70",
    rotulo: "BET 70%",
    sub: `${bb(0.7)} bb`,
    tecla: "2",
    cor: "bg-[#c4602b] hover:bg-[#d4703b]",
  },
  {
    a: "B100",
    rotulo: "BET 100%",
    sub: `${bb(1)} bb`,
    tecla: "3",
    cor: "bg-[#a63a3a] hover:bg-[#b84a4a]",
  },
]

const NOME_ACAO: Record<AcaoProbe, string> = {
  "Check-call": "check-call",
  "Check-raise": "check-raise",
  B40: "bet 40%",
  B70: "bet 70%",
  B100: "bet 100%",
}

const ehBet = (a: string) => a.startsWith("B")

export function Ficha({
  nome,
  acao,
  vez,
}: {
  nome: string
  acao: string
  vez?: boolean
}) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center gap-1.5 rounded-md border py-0.5 pr-0.5 pl-2 text-xs",
        vez && "border-primary"
      )}
    >
      <span className="text-muted-foreground">{nome}</span>
      <span
        className={cn(
          "rounded px-2 py-0.5 font-medium",
          vez ? "text-primary" : "bg-muted text-muted-foreground"
        )}
      >
        {acao}
      </span>
    </span>
  )
}

export type Tema = "bet" | "probe" | "cbet" | "cbet40" | "oop" | "bb" | "tbet"

export function SeletorTema({
  tema,
  onTema,
}: {
  tema: Tema
  onTema: (t: Tema) => void
}) {
  const temas: [Tema, string][] = [
    ["bet", "Bet vs Missed C-Bet"],
    ["probe", "Probe Turn"],
    ["cbet", "C-Bet IP Short Stack"],
    ["cbet40", "C-Bet IP 40bb"],
    ["oop", "C-Bet OOP 40bb"],
    ["bb", "BB raised pot vs SB"],
    ["tbet", "3Bet Pot do BB"],
  ]
  return (
    <fieldset className="grid gap-2.5">
      <legend className="mb-1 font-medium text-muted-foreground">Tema</legend>
      <div className="flex flex-wrap gap-2">
        {temas.map(([id, nome]) => (
          <button
            key={id}
            type="button"
            aria-pressed={tema === id}
            onClick={() => onTema(id)}
            className={cn(
              "cursor-pointer rounded-full border px-3.5 py-2 uppercase transition-colors",
              tema === id
                ? "border-primary bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground hover:text-foreground"
            )}
          >
            {nome}
          </button>
        ))}
        <span className="rounded-full border bg-card px-3.5 py-2 text-muted-foreground uppercase opacity-50">
          Misturar temas · em breve
        </span>
      </div>
    </fieldset>
  )
}

export default function PraticaProbe({
  onTema,
}: {
  onTema: (t: Tema) => void
}) {
  const [fase, setFase] = useState<Fase>("setup")
  const [qty, setQty] = useState("10")
  const [fila, setFila] = useState<SituacaoProbe[]>([])
  const [i, setI] = useState(0)
  const [itens, setItens] = useState<ItemSessao[]>([])
  const [resp, setResp] = useState<AcaoProbe | null>(null)
  const [sessId, setSessId] = useState(0)
  const [levada, setLevada] = useState(false)
  // Guarda síncrona contra duas teclas no mesmo quadro.
  const respondido = useRef(false)

  const atual = fila[i]
  const turn = atual ? turnById[atual.turn] : undefined

  const responder = useCallback(
    (a: AcaoProbe) => {
      if (!atual || respondido.current) return
      respondido.current = true
      setItens((prev) => [
        ...prev,
        {
          sid: atual.id,
          tipo: ROTULO_TURN[atual.turn],
          bucket: 0,
          rng: 0,
          resp: a,
          esperado: atual.certa,
          ok: a === atual.certa,
          board: [...turnById[atual.turn].flop, turnById[atual.turn].turn],
          hero: atual.hero,
          classe: atual.classe,
          porque: atual.porque,
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
    let pool = shuffle(situacoesProbe)
    if (n && pool.length > n) pool = pool.slice(0, n)
    comecar(pool)
  }

  function comecar(pool: SituacaoProbe[]) {
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
      modulo: mod14.id,
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
          lead="Treine as decisões do módulo 14. Você está no BB, o flop deu check-check e saiu o turn. Escolha a ação."
        />
        <div className="mx-auto max-w-[1080px] px-5 pb-20">
          <form
            onSubmit={iniciar}
            className="mx-auto grid max-w-xl gap-7 rounded-[22px] border bg-card p-6 md:p-8"
          >
            <SeletorTema tema="probe" onTema={onTema} />
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
            nome: "Apostou quando era para pagar ou subir",
            n: erros.filter((x) => ehBet(x.resp) && !ehBet(x.esperado)).length,
          },
          {
            nome: "Size errado",
            n: erros.filter((x) => ehBet(x.resp) && ehBet(x.esperado)).length,
          },
          {
            nome: "Check quando era para apostar",
            n: erros.filter((x) => !ehBet(x.resp) && ehBet(x.esperado)).length,
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

  if (!atual || !turn) return null
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
        <Ficha nome="BTN" acao="Raise 2" />
        <Ficha nome="SB" acao="Fold" />
        <Ficha nome="BB" acao="Call" />
        <span className="px-1 text-xs text-muted-foreground">Flop</span>
        <Ficha nome="BB" acao="Check" />
        <Ficha nome="BTN" acao="Check" />
        <span className="px-1 text-xs text-muted-foreground">Turn</span>
        <Ficha nome="BB" acao={resp ? NOME_ACAO[resp] : "Tomar ação"} vez />
      </div>

      <Mesa
        probe
        opener="HJ"
        board={[...turn.flop, turn.turn]}
        hero={atual.hero}
        mao={i + 1}
        total={fila.length}
        sequencia={sequencia}
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
              no{" "}
              <strong className="text-foreground">
                {ROTULO_TURN[atual.turn].toLowerCase()}
              </strong>
              .
            </p>
            <p className="max-w-[64ch] text-lg text-muted-foreground">
              <strong className="text-foreground">{atual.classe}</strong>:{" "}
              {destacar(atual.porque)}
            </p>
            <p className="max-w-[64ch] text-muted-foreground">
              {destacar(turn.criterio)}
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
                tema="Probe Turn"
                questao={atual.id}
                contexto={{
                  board: [...turn.flop, turn.turn].join(" "),
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
