import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import { ArrowLeft, Square } from "lucide-react"
import {
  BotaoResposta,
  CartaoResultado,
  estadoDe,
} from "@/components/poker/resposta"
import { ResultadoFinal } from "@/components/poker/resultado-final"
import { RelatarErro } from "@/components/poker/relatar-erro"
import { RngStrip } from "@/components/poker/cards"
import { destacar } from "@/components/poker/destacar"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Mesa, valorBB } from "@/components/poker/mesa"
import {
  BOARDS_BB,
  situacoesBB,
  type GrupoBB,
  type SituacaoBB,
} from "@/data/prat17"
import { Ficha, SeletorTema, type Tema } from "@/pages/pratica-probe"
import { rng, shuffle, type ItemSessao, type Sessao } from "@/lib/poker"
import { KEYS, lerSessoes, writeJSON } from "@/lib/storage"

type Fase = "setup" | "jogo" | "fim"
type Acao = "Check" | "B25" | "B40" | "B70"

// SB deu limp, o BB aumentou para 3,5bb e o SB pagou: pote de 7bb com 36,5bb atrás.
const POTE = 7
const bb = (f: number) => (Math.round(POTE * f * 10) / 10).toString()

const ACOES: {
  a: Acao
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

const NOME_ACAO: Record<Acao, string> = {
  Check: "check",
  B25: "bet 25%",
  B40: "bet 40%",
  B70: "bet 70%",
}

const GRUPOS: { id: GrupoBB; nome: string }[] = [
  { id: "B25", nome: "Boards de B25" },
  { id: "B40", nome: "Boards de B40" },
  { id: "B70", nome: "Boards de B70" },
  { id: "Range", nome: "Range bet" },
]

const contagem = (g: GrupoBB) => situacoesBB.filter((s) => s.grupo === g).length

export default function PraticaBB({ onTema }: { onTema: (t: Tema) => void }) {
  const [fase, setFase] = useState<Fase>("setup")
  const [grupos, setGrupos] = useState<GrupoBB[]>(GRUPOS.map((g) => g.id))
  const [qty, setQty] = useState("10")
  const [erro, setErro] = useState("")
  const [fila, setFila] = useState<SituacaoBB[]>([])
  const [i, setI] = useState(0)
  const [itens, setItens] = useState<ItemSessao[]>([])
  const [roll, setRoll] = useState(1)
  const [resp, setResp] = useState<Acao | null>(null)
  const [sessId, setSessId] = useState(0)
  const [levada, setLevada] = useState(false)
  // Guarda síncrona contra duas teclas no mesmo quadro.
  const respondido = useRef(false)

  const atual = fila[i]
  const apostar = atual ? roll <= atual.bucket : false
  const esperado: Acao | undefined = atual
    ? apostar
      ? atual.size
      : "Check"
    : undefined

  const responder = useCallback(
    (a: Acao) => {
      if (!atual || !esperado || respondido.current) return
      respondido.current = true
      setItens((prev) => [
        ...prev,
        {
          sid: atual.id,
          tipo: atual.boardNome,
          bucket: atual.bucket,
          rng: roll,
          resp: a,
          esperado,
          ok: a === esperado,
          board: atual.board,
          hero: atual.hero,
          classe: atual.classe,
          porque: atual.porque,
          nota: `RNG ${roll}, bucket de ${atual.bucket}%.`,
        },
      ])
      setResp(a)
    },
    [atual, esperado, roll]
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
    if (grupos.length === 0) {
      setErro("Escolha ao menos um tipo de board.")
      return
    }
    const n = Number(qty)
    let pool = shuffle(situacoesBB.filter((s) => grupos.includes(s.grupo)))
    if (n && pool.length > n) pool = pool.slice(0, n)
    setErro("")
    comecar(pool)
  }

  function comecar(pool: SituacaoBB[]) {
    setFila(pool)
    setI(0)
    setItens([])
    setResp(null)
    respondido.current = false
    setRoll(rng())
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
      modulo: "17",
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
    setRoll(rng())
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
          lead="Treine as decisões do módulo 17. Você é o BB, em posição: o SB deu limp, você aumentou para 3,5bb e ele pagou, com 40bb. Veja o board, a sua mão e o RNG, e escolha a ação."
        />
        <div className="mx-auto max-w-[1080px] px-5 pb-20">
          <form
            onSubmit={iniciar}
            className="mx-auto grid max-w-xl gap-7 rounded-[22px] border bg-card p-6 md:p-8"
          >
            <SeletorTema tema="bb" onTema={onTema} />

            <fieldset className="grid gap-2.5">
              <legend className="mb-1 font-medium text-muted-foreground">
                Tipos de board
              </legend>
              <div className="flex flex-wrap gap-2">
                {GRUPOS.map((g) => (
                  <Label
                    key={g.id}
                    className="flex cursor-pointer items-center gap-2 rounded-full border bg-card px-3.5 py-2"
                  >
                    <Checkbox
                      checked={grupos.includes(g.id)}
                      onCheckedChange={(v) =>
                        setGrupos((prev) =>
                          v ? [...prev, g.id] : prev.filter((x) => x !== g.id)
                        )
                      }
                    />
                    {g.nome}
                    <span className="text-muted-foreground">
                      {contagem(g.id)}
                    </span>
                  </Label>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                {BOARDS_BB.length} boards da aula, do triple broadway ao
                dobrado.
              </p>
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
            nome: "Check quando era para apostar",
            n: erros.filter((x) => x.resp === "Check").length,
          },
          {
            nome: "Apostou quando era check",
            n: erros.filter((x) => x.esperado === "Check").length,
          },
          {
            nome: "Apostou com o size errado",
            n: erros.filter((x) => x.resp !== "Check" && x.esperado !== "Check")
              .length,
          },
        ]}
        levada={levada}
        onLevar={levar}
        onNovo={() => setFase("setup")}
        onRefazer={refazerErros}
      />
    )
  }

  if (!atual || !esperado) return null
  const ok = resp === esperado
  const ultimo = i === fila.length - 1
  let sequencia = 0
  for (let k = itens.length - 1; k >= 0 && itens[k].ok; k--) sequencia++

  const pct = <strong className="text-foreground">{atual.bucket}%</strong>
  const tamanho = (
    <strong className="text-foreground">{NOME_ACAO[atual.size]}</strong>
  )
  let texto: ReactNode
  if (atual.bucket === 0) {
    texto = (
      <>
        Esta mão nunca aposta neste split: o bucket dela é de {pct}, então dá
        check, qualquer que seja o RNG.
      </>
    )
  } else if (ok) {
    texto = apostar ? (
      <>
        Sua mão está no bucket de {pct} e o RNG {roll} cai na aposta. O size
        deste board é {tamanho}.
      </>
    ) : (
      <>
        Sua mão está no bucket de {pct}, mas o RNG {roll} cai no check.
      </>
    )
  } else if (resp !== "Check" && apostar) {
    texto = (
      <>
        Apostar estava certo (RNG {roll} ≤ {pct}), mas o size deste board é{" "}
        {tamanho}.
      </>
    )
  } else if (resp === "Check") {
    texto = (
      <>
        O RNG {roll} cai na aposta (bucket de {pct}). O certo era {tamanho}.
      </>
    )
  } else {
    texto = (
      <>
        O RNG {roll} fica acima de {pct}, então a mão dá check.
      </>
    )
  }

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
        <Ficha nome="SB" acao="Limp" />
        <Ficha nome="BB" acao="Raise 3,5" />
        <Ficha nome="SB" acao="Call" />
        <span className="px-1 text-xs text-muted-foreground">Flop</span>
        <Ficha nome="SB" acao="Check" />
        <Ficha nome="BB" acao={resp ? NOME_ACAO[resp] : "Tomar ação"} vez />
      </div>

      <Mesa
        opener="HJ"
        board={atual.board}
        hero={atual.hero}
        roll={roll}
        mao={i + 1}
        total={fila.length}
        sequencia={sequencia}
        fichasHero={valorBB(ACOES.find((x) => x.a === resp)?.sub)}
        gen={{
          heroPos: "BB",
          vilaoPos: "SB",
          stack: 40,
          stackHero: 36.5,
          stackVilao: 36.5,
          pote: POTE,
          rotuloVilao: "Pagou 3,5",
          acaoVilao: "Check",
        }}
      />

      <div className="mx-auto mt-4 grid max-w-[880px] grid-cols-2 gap-2 sm:grid-cols-4 md:gap-3">
        {ACOES.map(({ a, rotulo, sub, tecla, cor }) => (
          <BotaoResposta
            key={a}
            rotulo={rotulo}
            sub={sub}
            tecla={tecla}
            cor={cor}
            estado={estadoDe(a, resp, esperado)}
            onClick={() => responder(a)}
          />
        ))}
      </div>

      <div aria-live="polite">
        {resp && (
          <CartaoResultado ok={ok}>
            <p className="max-w-[64ch] text-lg text-muted-foreground">
              {texto}
            </p>
            <p className="max-w-[64ch] text-lg text-muted-foreground">
              <strong className="text-foreground">{atual.classe}</strong> no
              board{" "}
              <strong className="text-foreground">{atual.boardNome}</strong>:{" "}
              {destacar(atual.porque)}
            </p>
            {atual.criterio && (
              <p className="max-w-[64ch] text-muted-foreground">
                {destacar(atual.criterio)}
              </p>
            )}
            {atual.freq !== undefined && (
              <p className="max-w-[64ch] text-muted-foreground">
                Frequência geral de aposta neste tipo de board:{" "}
                <strong className="text-foreground">{atual.freq}%</strong>.
              </p>
            )}
            <RngStrip bucket={atual.bucket} rng={roll} size={atual.size} />
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
                tema="BB raised pot vs SB"
                questao={atual.id}
                contexto={{
                  board: atual.board.join(" "),
                  mao: atual.hero.join(" "),
                  rng: String(roll),
                  bucket: String(atual.bucket),
                  resposta: String(resp),
                  certa: esperado,
                }}
              />
            </div>
          </CartaoResultado>
        )}
      </div>
    </main>
  )
}
