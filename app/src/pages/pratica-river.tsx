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
import { situacoes04 } from "@/data/prat04"
import { situacoes18 } from "@/data/prat18"
import {
  META,
  ehBet,
  fmt,
  r2,
  type AcaoRiver,
  type SituacaoRiver,
} from "@/data/pratRiver"
import { Ficha, SeletorTema, type Tema } from "@/pages/pratica-probe"
import { rng, shuffle, type ItemSessao, type Sessao } from "@/lib/poker"
import { KEYS, lerSessoes, writeJSON } from "@/lib/storage"

type Fase = "setup" | "jogo" | "fim"

// A ação certa da mão. Nos spots de split o RNG decide entre as duas ações.
function certaDe(q: SituacaoRiver, roll: number): AcaoRiver {
  if (!q.rng) return q.certa
  return roll <= q.rng.ate ? q.rng.acao : q.rng.senao
}

interface Config {
  tema: Tema
  modulo: string
  nomeTema: string
  lead: string
  titulosTipos: string
  situacoes: SituacaoRiver[]
  // Filtro opcional da seleção (ataque ou defesa, aposta ou check).
  tituloFiltro?: string
  filtros?: { id: string; label: string; vale: (s: SituacaoRiver) => boolean }[]
}

const CONFIG_04: Config = {
  tema: "tbarrel",
  modulo: "04",
  nomeTema: "Third Barrel e vs Third Barrel",
  lead: "Treine as decisões do módulo 04. O HJ abriu com 40bb e o BB pagou. Ora você é o agressor e decide o turn e o river, ora é o BB e enfrenta as apostas.",
  titulosTipos: "Por situação",
  situacoes: situacoes04,
  filtros: [
    { id: "todas", label: "Ataque e defesa", vale: () => true },
    { id: "ataque", label: "Só ataque", vale: (s) => s.heroPos === "HJ" },
    { id: "defesa", label: "Só defesa", vale: (s) => s.heroPos === "BB" },
  ],
}

const CONFIG_18: Config = {
  tema: "xc",
  modulo: "18",
  nomeTema: "XC e Play River",
  lead: "Treine as decisões do módulo 18. O BTN abriu, você pagou do BB, deu check-call no flop e o turn foi check-check. Você age primeiro no river.",
  titulosTipos: "Por tipo de board",
  situacoes: situacoes18,
  tituloFiltro: "Parte",
  filtros: [
    { id: "todas", label: "Tudo", vale: () => true },
    // Quando o herói aposta: a resposta certa é um size.
    { id: "bet", label: "Ataque River", vale: (s) => ehBet(s.certa) },
    // Quando o herói dá check: check-call, check-fold e o call ou fold contra o bet do BTN.
    { id: "check", label: "Defesa River", vale: (s) => !ehBet(s.certa) },
  ],
}

function PraticaRiver({
  cfg,
  onTema,
}: {
  cfg: Config
  onTema: (t: Tema) => void
}) {
  const [fase, setFase] = useState<Fase>("setup")
  const [qty, setQty] = useState("10")
  const [filtro, setFiltro] = useState("todas")
  const [fila, setFila] = useState<SituacaoRiver[]>([])
  const [i, setI] = useState(0)
  const [itens, setItens] = useState<ItemSessao[]>([])
  const [resp, setResp] = useState<AcaoRiver | null>(null)
  const [sessId, setSessId] = useState(0)
  const [levada, setLevada] = useState(false)
  // Guarda síncrona contra duas teclas no mesmo quadro.
  const respondido = useRef(false)
  const [roll, setRoll] = useState(() => rng())

  const atual = fila[i]

  const responder = useCallback(
    (a: AcaoRiver) => {
      if (!atual || respondido.current) return
      respondido.current = true
      const certa = certaDe(atual, roll)
      setItens((prev) => [
        ...prev,
        {
          sid: atual.id,
          tipo: atual.tipo,
          bucket: 0,
          rng: atual.rng ? roll : 0,
          resp: a,
          esperado: certa,
          ok: a === certa || !!atual.aceita?.includes(a),
          board: atual.board,
          hero: atual.hero,
          classe: atual.classe,
          porque: atual.porque,
        },
      ])
      setResp(a)
    },
    [atual, roll]
  )

  useEffect(() => {
    if (fase !== "jogo" || !atual) return
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const k = e.key.toLowerCase()
      const alvo = atual.acoes.find((a) => META[a].tecla.toLowerCase() === k)
      if (alvo) responder(alvo)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [fase, atual, responder])

  function iniciar(e: React.FormEvent) {
    e.preventDefault()
    const n = Number(qty)
    const vale = cfg.filtros?.find((f) => f.id === filtro)?.vale
    let pool = shuffle(vale ? cfg.situacoes.filter(vale) : cfg.situacoes)
    if (n && pool.length > n) pool = pool.slice(0, n)
    comecar(pool)
  }

  function comecar(pool: SituacaoRiver[]) {
    setFila(pool)
    setI(0)
    setItens([])
    setResp(null)
    setRoll(rng())
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
      modulo: cfg.modulo,
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
    setRoll(rng())
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
        <PageHeader title="Prática" lead={cfg.lead} />
        <div className="mx-auto max-w-[1080px] px-5 pb-20">
          <form
            onSubmit={iniciar}
            className="mx-auto grid max-w-xl gap-7 rounded-[22px] border bg-card p-6 md:p-8"
          >
            <SeletorTema tema={cfg.tema} onTema={onTema} />
            {cfg.filtros && (
              <fieldset className="grid gap-2.5">
                <legend className="mb-1 font-medium text-muted-foreground">
                  {cfg.tituloFiltro ?? "Lado"}
                </legend>
                <RadioGroup
                  value={filtro}
                  onValueChange={setFiltro}
                  className="flex flex-wrap gap-2"
                >
                  {cfg.filtros.map((f) => (
                    <Label
                      key={f.id}
                      className="flex cursor-pointer items-center gap-2 rounded-full border bg-card px-3.5 py-2"
                    >
                      <RadioGroupItem value={f.id} />
                      {f.label}
                    </Label>
                  ))}
                </RadioGroup>
              </fieldset>
            )}
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
        tituloTipos={cfg.titulosTipos}
        motivosDe={(erros) => [
          {
            nome: "Apostou quando era para dar check ou fold",
            n: erros.filter(
              (x) =>
                ehBet(x.resp) &&
                (x.esperado === "CHECK" ||
                  x.esperado === "CHECKCALL" ||
                  x.esperado === "CHECKFOLD")
            ).length,
          },
          {
            nome: "Check quando era para apostar",
            n: erros.filter(
              (x) =>
                (x.resp === "CHECK" ||
                  x.resp === "CHECKCALL" ||
                  x.resp === "CHECKFOLD") &&
                ehBet(x.esperado)
            ).length,
          },
          {
            nome: "Size errado",
            n: erros.filter((x) => ehBet(x.resp) && ehBet(x.esperado)).length,
          },
          {
            nome: "Pagou quando era fold",
            n: erros.filter(
              (x) =>
                (x.resp === "CALL" || x.resp === "CHECKCALL") &&
                (x.esperado === "FOLD" || x.esperado === "CHECKFOLD")
            ).length,
          },
          {
            nome: "Foldou quando era call",
            n: erros.filter(
              (x) =>
                (x.resp === "FOLD" || x.resp === "CHECKFOLD") &&
                (x.esperado === "CALL" || x.esperado === "CHECKCALL")
            ).length,
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
  const certa = certaDe(atual, roll)
  const ok = resp === certa || !!(resp && atual.aceita?.includes(resp))
  // O que o botão mostra como certo: a ação escolhida, se o instrutor também a aceita.
  const certaNaTela = ok && resp ? resp : certa
  const ultimo = i === fila.length - 1
  let sequencia = 0
  for (let k = itens.length - 1; k >= 0 && itens[k].ok; k--) sequencia++
  const colunas = atual.acoes.length

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
        {atual.passos.map((p, k) =>
          "rua" in p ? (
            <span key={k} className="px-1 text-xs text-muted-foreground">
              {p.rua}
            </span>
          ) : (
            <Ficha key={k} nome={p.nome} acao={p.acao} />
          )
        )}
        {atual.acaoVilao && (
          <Ficha nome={atual.vilaoPos} acao={atual.acaoVilao} />
        )}
        <Ficha
          nome={atual.heroPos}
          acao={resp ? META[resp].nome : "Tomar ação"}
          vez
        />
      </div>

      <Mesa
        opener="HJ"
        board={atual.board}
        hero={atual.hero}
        roll={atual.rng ? roll : undefined}
        mao={i + 1}
        total={fila.length}
        sequencia={sequencia}
        fichasHero={
          resp && META[resp].frac
            ? r2(atual.pote * META[resp].frac!)
            : undefined
        }
        gen={{
          heroPos: atual.heroPos,
          vilaoPos: atual.vilaoPos,
          stack: atual.stack,
          pote: atual.pote,
          rotuloVilao: atual.vilaoPos === "BB" ? "Pagou 2" : "Abriu 2",
          acaoVilao: atual.acaoVilao,
          fichasRotulo: false,
        }}
      />

      <div
        className={
          colunas === 2
            ? "mx-auto mt-4 grid max-w-[880px] grid-cols-2 gap-2 md:gap-3"
            : colunas === 5
              ? "mx-auto mt-4 grid max-w-[880px] grid-cols-2 gap-2 sm:grid-cols-5 md:gap-3"
              : "mx-auto mt-4 grid max-w-[880px] grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3"
        }
      >
        {atual.acoes.map((a) => {
          const m = META[a]
          return (
            <BotaoResposta
              key={a}
              rotulo={m.rotulo}
              sub={m.frac ? `${fmt(r2(atual.pote * m.frac))} bb` : ""}
              tecla={m.tecla}
              cor={m.cor}
              estado={estadoDe(a, resp, certaNaTela)}
              onClick={() => responder(a)}
            />
          )
        })}
      </div>

      <div aria-live="polite">
        {resp && (
          <CartaoResultado ok={ok}>
            <p className="max-w-[64ch] text-lg text-muted-foreground">
              {ok ? "A ação certa era " : "O certo era "}
              <strong className="text-foreground">{META[certa].nome}</strong>
              {ok && resp !== certa && (
                <> (o {META[resp].nome} também vale)</>
              )}{" "}
              em{" "}
              <strong className="text-foreground">
                {nomeNaFrase(atual.tipo)}
              </strong>
              .
            </p>
            <p className="max-w-[64ch] text-lg text-muted-foreground">
              <strong className="text-foreground">{atual.classe}</strong>:{" "}
              {destacar(atual.porque)}
            </p>
            {atual.rng && (
              <p className="max-w-[64ch] text-muted-foreground">
                Spot de split: com RNG de 1 a {atual.rng.ate} vale{" "}
                <strong className="text-foreground">
                  {META[atual.rng.acao].nome}
                </strong>
                , de {atual.rng.ate + 1} a 100 vale{" "}
                <strong className="text-foreground">
                  {META[atual.rng.senao].nome}
                </strong>
                . Seu RNG foi {roll}.
              </p>
            )}
            {atual.ilustrativo && (
              <p className="max-w-[64ch] text-sm text-muted-foreground">
                Board ilustrativo: montado a partir da regra do módulo.
              </p>
            )}
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
                tema={cfg.nomeTema}
                questao={atual.id}
                contexto={{
                  board: atual.board.join(" "),
                  mao: atual.hero.join(" "),
                  resposta: String(resp),
                  certa,
                  ...(atual.rng ? { rng: String(roll) } : {}),
                }}
              />
            </div>
          </CartaoResultado>
        )}
      </div>
    </main>
  )
}

export function PraticaTerceiro({ onTema }: { onTema: (t: Tema) => void }) {
  return <PraticaRiver cfg={CONFIG_04} onTema={onTema} />
}

export function PraticaXC({ onTema }: { onTema: (t: Tema) => void }) {
  return <PraticaRiver cfg={CONFIG_18} onTema={onTema} />
}
