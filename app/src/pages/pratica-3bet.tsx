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
import { Mesa } from "@/components/poker/mesa"
import {
  ARVORE_DA,
  NOME_EST,
  SPOT,
  situacoesTb,
  type AcaoTb,
  type Arvore,
  type Est,
  type SituacaoTb,
} from "@/data/prat08"
import { Ficha, SeletorTema, type Tema } from "@/pages/pratica-probe"
import { shuffle, type ItemSessao, type Sessao } from "@/lib/poker"
import { KEYS, lerSessoes, writeJSON } from "@/lib/storage"

type Fase = "setup" | "jogo" | "fim"
type Escolha = Arvore | "os dois"

const bb = (n: number) => (Math.round(n * 10) / 10).toString().replace(".", ",")

function acoesDe(arvore: Arvore): {
  a: AcaoTb
  rotulo: string
  sub: string
  tecla: string
  cor: string
}[] {
  const { pote, atras } = SPOT[arvore]
  const sub = (f: number) => `${bb(pote * f)} bb`
  const base = [
    {
      a: "Check-call" as AcaoTb,
      rotulo: "CHECK-CALL",
      sub: "",
      tecla: "C",
      cor: "bg-[#37829b] hover:bg-[#3f92ae]",
    },
    {
      a: "Check-raise" as AcaoTb,
      rotulo: arvore === "short" ? "CHECK-SHOVE" : "CHECK-RAISE",
      sub: "",
      tecla: "R",
      cor: "bg-[#6d4aa8] hover:bg-[#7d5ab8]",
    },
    {
      a: "Check-fold" as AcaoTb,
      rotulo: "CHECK-FOLD",
      sub: "",
      tecla: "F",
      cor: "bg-[#4a5568] hover:bg-[#5a6578]",
    },
    {
      a: "B25" as AcaoTb,
      rotulo: "BET 25%",
      sub: sub(0.25),
      tecla: "1",
      cor: "bg-[#b7791f] hover:bg-[#c98a2b]",
    },
    {
      a: "B40" as AcaoTb,
      rotulo: "BET 40%",
      sub: sub(0.4),
      tecla: "2",
      cor: "bg-[#c4602b] hover:bg-[#d4703b]",
    },
  ]
  return arvore === "short"
    ? [
        ...base,
        {
          a: "All-in" as AcaoTb,
          rotulo: "ALL-IN",
          sub: `${bb(atras)} bb`,
          tecla: "3",
          cor: "bg-[#a63a3a] hover:bg-[#b84a4a]",
        },
      ]
    : [
        ...base,
        {
          a: "B70" as AcaoTb,
          rotulo: "BET 70%",
          sub: sub(0.7),
          tecla: "3",
          cor: "bg-[#a63a3a] hover:bg-[#b84a4a]",
        },
      ]
}

const NOME_ACAO: Record<AcaoTb, string> = {
  "Check-call": "check-call",
  "Check-raise": "check-raise",
  "Check-fold": "check-fold",
  B25: "bet 25%",
  B40: "bet 40%",
  B70: "bet 70%",
  "All-in": "all-in",
}

const ehAposta = (a: string) => a.startsWith("B") || a === "All-in"
const ESTS = Object.keys(NOME_EST) as Est[]

function contagem(arvores: Arvore[], e: Est): number {
  return situacoesTb.filter((s) => s.est === e && arvores.includes(s.arvore))
    .length
}

export default function Pratica3bet({ onTema }: { onTema: (t: Tema) => void }) {
  const [fase, setFase] = useState<Fase>("setup")
  const [escolha, setEscolha] = useState<Escolha>("os dois")
  const [grupos, setGrupos] = useState<Est[]>(ESTS)
  const [qty, setQty] = useState("10")
  const [erro, setErro] = useState("")
  const [fila, setFila] = useState<SituacaoTb[]>([])
  const [i, setI] = useState(0)
  const [itens, setItens] = useState<ItemSessao[]>([])
  const [resp, setResp] = useState<AcaoTb | null>(null)
  const [sessId, setSessId] = useState(0)
  const [levada, setLevada] = useState(false)
  // Guarda síncrona contra duas teclas no mesmo quadro.
  const respondido = useRef(false)

  const arvores: Arvore[] =
    escolha === "os dois" ? ["short", "deep"] : [escolha]
  const atual = fila[i]

  const responder = useCallback(
    (a: AcaoTb) => {
      if (!atual || respondido.current) return
      respondido.current = true
      const spot = SPOT[atual.arvore]
      setItens((prev) => [
        ...prev,
        {
          sid: atual.id,
          tipo: `${NOME_EST[atual.est]} · ${atual.arvore === "short" ? "short" : "deep"}`,
          bucket: 0,
          rng: 0,
          resp: a,
          esperado: atual.certa,
          ok: a === atual.certa || !!atual.aceita?.includes(a),
          board: atual.board,
          hero: atual.hero,
          classe: atual.classe,
          porque: atual.porque,
          nota: `${atual.naipes} ${spot.nome}, ${atual.boardNome}.`,
        },
      ])
      setResp(a)
    },
    [atual]
  )

  useEffect(() => {
    if (fase !== "jogo" || !atual) return
    const acoes = acoesDe(atual.arvore)
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if ((e.target as HTMLElement | null)?.tagName === "TEXTAREA") return
      const k = e.key.toLowerCase()
      const alvo = acoes.find((x) => x.tecla.toLowerCase() === k)
      if (alvo) responder(alvo.a)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [fase, responder, atual])

  function iniciar(e: React.FormEvent) {
    e.preventDefault()
    if (grupos.length === 0) {
      setErro("Escolha ao menos um tipo de board.")
      return
    }
    const n = Number(qty)
    let pool = shuffle(
      situacoesTb.filter(
        (s) => arvores.includes(s.arvore) && grupos.includes(s.est)
      )
    )
    if (n && pool.length > n) pool = pool.slice(0, n)
    setErro("")
    comecar(pool)
  }

  function comecar(pool: SituacaoTb[]) {
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
      modulo: "08",
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
          lead="Treine as decisões do módulo 08, só o flop. Você é o BB, deu 3-bet contra o open do BTN e ele pagou. Você age primeiro, e o board, a sua mão e o stack decidem a jogada."
        />
        <div className="mx-auto max-w-[1080px] px-5 pb-20">
          <form
            onSubmit={iniciar}
            className="mx-auto grid max-w-xl gap-7 rounded-[22px] border bg-card p-6 md:p-8"
          >
            <SeletorTema tema="tbet" onTema={onTema} />

            <fieldset className="grid gap-2.5">
              <legend className="mb-1 font-medium text-muted-foreground">
                Stack
              </legend>
              <RadioGroup
                value={escolha}
                onValueChange={(v) => setEscolha(v as Escolha)}
                className="flex flex-wrap gap-2"
              >
                {[
                  ["short", "Short stack · 25bb"],
                  ["deep", "Deep stack · 60bb"],
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
                {ESTS.map((e) => {
                  const n = contagem(arvores, e)
                  const off = n === 0
                  return (
                    <Label
                      key={e}
                      className={
                        "flex items-center gap-2 rounded-full border bg-card px-3.5 py-2 " +
                        (off ? "opacity-45" : "cursor-pointer")
                      }
                    >
                      <Checkbox
                        disabled={off}
                        checked={!off && grupos.includes(e)}
                        onCheckedChange={(v) =>
                          setGrupos((prev) =>
                            v ? [...prev, e] : prev.filter((x) => x !== e)
                          )
                        }
                      />
                      {NOME_EST[e]} · {rotuloGrupo(e)}
                      <span className="text-muted-foreground">
                        {off ? `só no ${ARVORE_DA[e]}` : n}
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
            n: erros.filter((x) => ehAposta(x.resp) && !ehAposta(x.esperado))
              .length,
          },
          {
            nome: "Check quando era para apostar",
            n: erros.filter((x) => !ehAposta(x.resp) && ehAposta(x.esperado))
              .length,
          },
          {
            nome: "Size errado",
            n: erros.filter((x) => ehAposta(x.resp) && ehAposta(x.esperado))
              .length,
          },
          {
            nome: "Check-call, check-raise ou check-fold trocados",
            n: erros.filter((x) => !ehAposta(x.resp) && !ehAposta(x.esperado))
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

  if (!atual) return null
  const spot = SPOT[atual.arvore]
  const acoes = acoesDe(atual.arvore)
  const ok = resp === atual.certa || !!(resp && atual.aceita?.includes(resp))
  // O que o botão mostra como certo: a ação escolhida, se ela também vale.
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
        <Ficha nome="BB" acao={`Raise ${bb(spot.raise)}`} />
        <Ficha nome="BTN" acao="Call" />
        <span className="px-1 text-xs text-muted-foreground">Flop</span>
        <Ficha nome="BB" acao={resp ? NOME_ACAO[resp] : "Tomar ação"} vez />
      </div>

      <Mesa
        opener="CO"
        board={atual.board}
        hero={atual.hero}
        mao={i + 1}
        total={fila.length}
        sequencia={sequencia}
        gen={{
          heroPos: "BB",
          vilaoPos: "BTN",
          stack: spot.efetivo,
          stackHero: spot.atras,
          stackVilao: spot.atras,
          pote: spot.pote,
          rotuloVilao: `Pagou ${bb(spot.raise - 2)}`,
          acaoVilao: "",
        }}
      />

      <div className="mx-auto mt-4 grid max-w-[880px] grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6 md:gap-3">
        {acoes.map(({ a, rotulo, sub, tecla, cor }) => (
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
                {NOME_ACAO[certaNaTela]}
              </strong>
              {ok && resp !== atual.certa && (
                <> (o {NOME_ACAO[atual.certa]} também vale)</>
              )}{" "}
              no board{" "}
              <strong className="text-foreground">
                {nomeNaFrase(atual.boardNome)}
              </strong>
              , {spot.nome}.
            </p>
            <p className="max-w-[64ch] text-lg text-muted-foreground">
              <strong className="text-foreground">{atual.classe}</strong>:{" "}
              {destacar(atual.porque)}
            </p>
            <p className="max-w-[64ch] text-lg text-muted-foreground">
              {destacar(atual.naipes)}
            </p>
            <p className="max-w-[64ch] text-muted-foreground">
              {spot.nome}:{" "}
              <strong className="text-foreground">
                {estrategiaDe(atual.est)}
              </strong>{" "}
              neste tipo de board.
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
                tema="3Bet Pot do BB"
                questao={atual.id}
                contexto={{
                  board: atual.board.join(" "),
                  stack: spot.nome,
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

function rotuloGrupo(e: Est): string {
  return e === "range"
    ? "B25"
    : e === "shortB40" || e === "deepB40"
      ? "B40"
      : e === "shortAllin"
        ? "all-in"
        : "B70"
}

function estrategiaDe(e: Est): string {
  return e === "range"
    ? "range bet em B25"
    : e === "shortB40"
      ? "split B40"
      : e === "shortAllin"
        ? "split all-in"
        : e === "deepB40"
          ? "split B40"
          : "split B70"
}
