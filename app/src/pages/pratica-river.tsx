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
import {
  apostas,
  checks,
  type AcaoCheck,
  type MaoBet,
  type MaoCheck,
  type SizeRiver,
} from "@/data/prat18"
import { Ficha, SeletorTema, type Tema } from "@/pages/pratica-probe"
import { shuffle, type ItemSessao, type Sessao } from "@/lib/poker"
import { KEYS, lerSessoes, writeJSON } from "@/lib/storage"

type Fase = "setup" | "jogo" | "fim"
type Parte = "bet" | "check"
type Questao = (MaoBet | MaoCheck) & { parte: Parte }

const SIZES: SizeRiver[] = ["B25", "B40", "B70", "B100"]

const BOTOES_BET: {
  a: SizeRiver
  rotulo: string
  tecla: string
  cor: string
}[] = [
  {
    a: "B25",
    rotulo: "BET 25%",
    tecla: "1",
    cor: "bg-[#b7791f] hover:bg-[#c98a2b]",
  },
  {
    a: "B40",
    rotulo: "BET 40%",
    tecla: "2",
    cor: "bg-[#c4602b] hover:bg-[#d4703b]",
  },
  {
    a: "B70",
    rotulo: "BET 70%",
    tecla: "3",
    cor: "bg-[#b84d33] hover:bg-[#c85d43]",
  },
  {
    a: "B100",
    rotulo: "BET 100%",
    tecla: "4",
    cor: "bg-[#a63a3a] hover:bg-[#b84a4a]",
  },
]

const BOTOES_CHECK: {
  a: AcaoCheck
  rotulo: string
  tecla: string
  cor: string
}[] = [
  {
    a: "Call",
    rotulo: "CHECK-CALL",
    tecla: "C",
    cor: "bg-[#37829b] hover:bg-[#3f92ae]",
  },
  {
    a: "Fold",
    rotulo: "CHECK-FOLD",
    tecla: "F",
    cor: "bg-[#6b6f76] hover:bg-[#7b8086]",
  },
]

const NOME: Record<string, string> = {
  B25: "bet 25%",
  B40: "bet 40%",
  B70: "bet 70%",
  B100: "bet 100%",
  Call: "check-call",
  Fold: "check-fold",
}

const NOME_PARTE: Record<Parte, string> = {
  bet: "Quando eu aposto",
  check: "Quando eu dou check",
}

export default function PraticaRiver({
  onTema,
}: {
  onTema: (t: Tema) => void
}) {
  const [fase, setFase] = useState<Fase>("setup")
  const [parte, setParte] = useState<Parte>("bet")
  const [qty, setQty] = useState("10")
  const [fila, setFila] = useState<Questao[]>([])
  const [i, setI] = useState(0)
  const [itens, setItens] = useState<ItemSessao[]>([])
  const [resp, setResp] = useState<string | null>(null)
  const [sessId, setSessId] = useState(0)
  const [levada, setLevada] = useState(false)
  // Guarda síncrona contra duas teclas no mesmo quadro.
  const respondido = useRef(false)

  const atual = fila[i]
  const botoes = atual?.parte === "check" ? BOTOES_CHECK : BOTOES_BET

  const aceitas = (q: Questao): string[] => {
    const aceita = "aceita" in q ? q.aceita : undefined
    return aceita ? [q.certa, aceita] : [q.certa]
  }

  const responder = useCallback(
    (a: string) => {
      if (!atual || respondido.current) return
      respondido.current = true
      setItens((prev) => [
        ...prev,
        {
          sid: atual.id,
          tipo: atual.runout,
          bucket: 0,
          rng: 0,
          resp: a,
          esperado: atual.certa,
          ok: aceitas(atual).includes(a),
          board: atual.board,
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
      const alvo = botoes.find((x) => x.tecla.toLowerCase() === k)
      if (alvo) responder(alvo.a)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [fase, responder, botoes])

  function comecar(pool: Questao[]) {
    setFila(pool)
    setI(0)
    setItens([])
    setResp(null)
    respondido.current = false
    setLevada(false)
    setFase("jogo")
  }

  function iniciar(e: React.FormEvent) {
    e.preventDefault()
    const n = Number(qty)
    const base: Questao[] =
      parte === "bet"
        ? apostas.map((q) => ({ ...q, parte: "bet" as const }))
        : checks.map((q) => ({ ...q, parte: "check" as const }))
    let pool = shuffle(base)
    if (n && pool.length > n) pool = pool.slice(0, n)
    comecar(pool)
  }

  function refazerErros() {
    const ids = new Set(itens.filter((x) => !x.ok).map((x) => x.sid))
    comecar(shuffle(fila.filter((q) => ids.has(q.id))))
  }

  function encerrar() {
    const sess: Sessao = {
      id: Date.now(),
      modulo: "18",
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
    const total = parte === "bet" ? apostas.length : checks.length
    return (
      <main>
        <PageHeader
          title="Prática"
          lead="Treine o módulo 18. Você está no BB, o BTN abriu, o flop foi check-call e o turn check-check. Escolha a parte: quando você aposta ou quando dá check."
        />
        <div className="mx-auto max-w-[1080px] px-5 pb-20">
          <form
            onSubmit={iniciar}
            className="mx-auto grid max-w-xl gap-7 rounded-[22px] border bg-card p-6 md:p-8"
          >
            <SeletorTema tema="river" onTema={onTema} />
            <fieldset className="grid gap-2.5">
              <legend className="mb-1 font-medium text-muted-foreground">
                Parte
              </legend>
              <RadioGroup
                value={parte}
                onValueChange={(v) => setParte(v as Parte)}
                className="flex flex-wrap gap-2"
              >
                {(["bet", "check"] as Parte[]).map((v) => (
                  <Label
                    key={v}
                    className="flex cursor-pointer items-center gap-2 rounded-full border bg-card px-3.5 py-2"
                  >
                    <RadioGroupItem value={v} />
                    {NOME_PARTE[v]}
                  </Label>
                ))}
              </RadioGroup>
              <p className="text-sm text-muted-foreground">
                {parte === "bet"
                  ? "Você aposta e escolhe o size, por valor ou de bluff."
                  : "Você dá check, o BTN aposta e você escolhe entre call e fold."}
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
                  ["0", `Todas (${total})`],
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
    const ehBet = fila[0]?.parte !== "check"
    return (
      <ResultadoFinal
        itens={itens}
        tituloTipos="Por runout"
        motivosDe={(erros) =>
          ehBet
            ? [
                {
                  nome: "Size baixo no lugar do alto",
                  n: erros.filter(
                    (x) =>
                      SIZES.indexOf(x.resp as SizeRiver) <
                      SIZES.indexOf(x.esperado as SizeRiver)
                  ).length,
                },
                {
                  nome: "Size alto no lugar do baixo",
                  n: erros.filter(
                    (x) =>
                      SIZES.indexOf(x.resp as SizeRiver) >
                      SIZES.indexOf(x.esperado as SizeRiver)
                  ).length,
                },
              ]
            : [
                {
                  nome: "Pagou quando era fold",
                  n: erros.filter((x) => x.resp === "Call").length,
                },
                {
                  nome: "Foldou quando era call",
                  n: erros.filter((x) => x.resp === "Fold").length,
                },
              ]
        }
        levada={levada}
        onLevar={levar}
        onNovo={() => setFase("setup")}
        onRefazer={refazerErros}
      />
    )
  }

  if (!atual) return null
  const ok = resp !== null && aceitas(atual).includes(resp)
  // Se acertou pelo size que também vale, o botão escolhido fica verde.
  const certaNaTela = ok && resp ? resp : atual.certa
  const ultimo = i === fila.length - 1
  const check = atual.parte === "check"
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
        <Ficha nome="BTN" acao="Raise" />
        <Ficha nome="BB" acao="Call" />
        <span className="px-1 text-xs text-muted-foreground">Flop</span>
        <Ficha nome="BB" acao="Check-call" />
        <span className="px-1 text-xs text-muted-foreground">Turn</span>
        <Ficha nome="BB" acao="Check" />
        <Ficha nome="BTN" acao="Check" />
        <span className="px-1 text-xs text-muted-foreground">River</span>
        {check ? (
          <>
            <Ficha nome="BB" acao="Check" />
            <Ficha nome="BTN" acao="Bet" vez={false} />
            <Ficha nome="BB" acao={resp ? NOME[resp] : "Tomar ação"} vez />
          </>
        ) : (
          <Ficha nome="BB" acao={resp ? NOME[resp] : "Tomar ação"} vez />
        )}
      </div>

      <Mesa
        opener="HJ"
        board={atual.board}
        hero={atual.hero}
        mao={i + 1}
        total={fila.length}
        sequencia={sequencia}
        gen={{
          heroPos: "BB",
          vilaoPos: "BTN",
          stack: 0,
          semStack: true,
          pote: null,
          rotuloVilao: "Abriu",
          acaoVilao: check ? "Bet" : "Check",
        }}
      />

      <div
        className={
          check
            ? "mx-auto mt-4 grid max-w-[440px] grid-cols-2 gap-2 md:gap-3"
            : "mx-auto mt-4 grid max-w-[880px] grid-cols-2 gap-2 sm:grid-cols-4 md:gap-3"
        }
      >
        {botoes.map(({ a, rotulo, tecla, cor }) => (
          <BotaoResposta
            key={a}
            rotulo={rotulo}
            sub=""
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
              <strong className="text-foreground">{NOME[atual.certa]}</strong>
              {"aceita" in atual && atual.aceita && (
                <>
                  {" "}
                  (também vale{" "}
                  <strong className="text-foreground">
                    {NOME[atual.aceita]}
                  </strong>
                  )
                </>
              )}{" "}
              em <strong className="text-foreground">{atual.runout}</strong>.
            </p>
            <p className="max-w-[64ch] text-lg text-muted-foreground">
              <strong className="text-foreground">{atual.classe}</strong>:{" "}
              {destacar(atual.porque)}
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
                tema="XC e Play River"
                questao={atual.id}
                contexto={{
                  board: atual.board.join(" "),
                  mao: atual.hero.join(" "),
                  parte: atual.parte,
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
