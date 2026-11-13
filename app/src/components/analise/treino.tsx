import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { pedirRefazer } from "@/lib/refazer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Secao } from "@/components/analise/secao"
import { tipoById, type TipoId } from "@/data/mod15"
import type { Sessao } from "@/lib/poker"
import { cn } from "@/lib/utils"

const MODULOS: Record<string, string> = {
  "01": "C-Bet IP Short Stack",
  "02": "C-Bet IP e 2nd Barrel",
  "03": "2nd Barrel IP",
  "04": "3rd Barrel e vs 3rd Barrel",
  "05": "C-Bet OOP",
  "08": "3Bet Pot OOP no BB",
  "14": "Probe Turn",
  "15": "Bet vs Missed C-Bet",
  "17": "BB Raise Pot vs SB",
  "18": "XC no River",
}

// Poucas mãos num tipo: a porcentagem engana, então o número de mãos aparece junto.
const POUCAS = 5
const LIMITE = 5

function nomeDoTipo(modulo: string, tipo: string): string {
  return modulo === "15" ? (tipoById[tipo as TipoId]?.nome ?? tipo) : tipo
}

interface Linha {
  nome: string
  n: number
  ok: number
}

function agrupar(sessoes: Sessao[], modulo: string): Linha[] {
  const mapa = new Map<string, Linha>()
  sessoes
    .flatMap((s) => s.itens)
    .forEach((x) => {
      const nome = nomeDoTipo(modulo, x.tipo)
      const l = mapa.get(nome) ?? { nome, n: 0, ok: 0 }
      l.n++
      if (x.ok) l.ok++
      mapa.set(nome, l)
    })
  return [...mapa.values()]
}

function Ranking({
  titulo,
  vazio,
  linhas,
  erros,
}: {
  titulo: string
  vazio: string
  linhas: Linha[]
  erros: boolean
}) {
  const [todas, setTodas] = useState(false)
  const vistas = todas ? linhas : linhas.slice(0, LIMITE)
  return (
    <section className="rounded-2xl border bg-card p-5">
      <h3 className="mb-3 font-bold">{titulo}</h3>
      {linhas.length === 0 ? (
        <p className="text-muted-foreground">{vazio}</p>
      ) : (
        <ul className="grid gap-3">
          {vistas.map((l) => {
            const certas = l.ok
            const errados = l.n - l.ok
            const p = Math.round((certas / l.n) * 100)
            return (
              <li key={l.nome} className="grid gap-1.5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <span>{l.nome}</span>
                  <span className="text-sm text-muted-foreground tabular-nums">
                    {erros
                      ? `${errados} ${errados === 1 ? "erro" : "erros"} em ${l.n} mãos`
                      : `${certas} de ${l.n} mãos · ${p}%`}
                    {l.n < POUCAS && " · poucas mãos"}
                  </span>
                </div>
                <span className="h-2 overflow-hidden rounded-full bg-secondary">
                  <i
                    className={cn(
                      "block h-full",
                      erros ? "bg-destructive" : "bg-primary"
                    )}
                    style={{ width: `${erros ? 100 - p : p}%` }}
                  />
                </span>
              </li>
            )
          })}
        </ul>
      )}
      {linhas.length > LIMITE && (
        <Button
          variant="ghost"
          className="mt-3"
          onClick={() => setTodas(!todas)}
        >
          {todas ? "Ver só os primeiros" : `Ver todos (${linhas.length})`}
        </Button>
      )}
    </section>
  )
}

function Modulo({
  modulo,
  sessoes,
  tirar,
}: {
  modulo: string
  sessoes: Sessao[]
  tirar: (id: number) => void
}) {
  const navegar = useNavigate()
  const itens = sessoes.flatMap((s) => s.itens)
  // Mãos cuja resposta mais recente foi errada: as que já acertou depois saem.
  const ultima = new Map<string, boolean>()
  itens.forEach((x) => ultima.set(x.sid, x.ok))
  const idsErrados = [...ultima].filter(([, ok]) => !ok).map(([id]) => id)
  function treinarErros() {
    pedirRefazer(modulo, idsErrados)
    navegar("/pratica")
  }
  const acertos = itens.filter((x) => x.ok).length
  const linhas = agrupar(sessoes, modulo)
  const maisErros = linhas
    .filter((l) => l.ok < l.n)
    .sort((a, b) => b.n - b.ok - (a.n - a.ok) || a.ok / a.n - b.ok / b.n)
  const maisAcertos = linhas
    .filter((l) => l.ok > 0)
    .sort((a, b) => b.ok / b.n - a.ok / a.n || b.n - a.n)

  return (
    <>
      <div className="mb-6 grid [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))] gap-3">
        {[
          ["Acerto", `${Math.round((acertos / itens.length) * 100)}%`],
          ["Mãos", String(itens.length)],
          ["Sessões", String(sessoes.length)],
        ].map(([k, v]) => (
          <Card key={k} className="rounded-[14px] p-[18px]">
            <div className="text-muted-foreground">{k}</div>
            <div className="text-3xl font-bold tabular-nums">{v}</div>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Ranking
          titulo="Onde você mais errou"
          vazio="Nenhum erro até agora."
          linhas={maisErros}
          erros
        />
        <Ranking
          titulo="Onde você mais acertou"
          vazio="Nenhum acerto ainda."
          linhas={maisAcertos}
          erros={false}
        />
      </div>

      {idsErrados.length > 0 && (
        <div className="mt-6 flex justify-center">
          <Button onClick={treinarErros}>
            Treinar só o que errei ({idsErrados.length})
          </Button>
        </div>
      )}

      <h3 className="mt-10 mb-3 font-bold">Sessões deste módulo</h3>
      <div className="grid gap-2.5">
        {[...sessoes].reverse().map((s) => (
          <div
            key={s.id}
            className="flex flex-wrap items-center gap-3.5 rounded-xl border bg-card px-4 py-3.5"
          >
            <strong className="min-w-32 flex-1">
              {new Date(s.id).toLocaleDateString("pt-BR")}
            </strong>
            <span className="tabular-nums">
              {s.acertos} de {s.total}
            </span>
            <Button variant="outline" onClick={() => tirar(s.id)}>
              Tirar da análise
            </Button>
          </div>
        ))}
      </div>
    </>
  )
}

// Aba Treino: uma aba por módulo, só com as sessões levadas para a Análise.
export function TreinoAnalise({
  levadas,
  tirar,
}: {
  levadas: Sessao[]
  tirar: (id: number) => void
}) {
  const porModulo = new Map<string, Sessao[]>()
  levadas.forEach((s) => {
    const m = s.modulo || "15"
    porModulo.set(m, [...(porModulo.get(m) ?? []), s])
  })
  const ids = [...porModulo.keys()].sort()
  const [escolhido, setEscolhido] = useState<string | null>(null)
  const atual = escolhido && porModulo.has(escolhido) ? escolhido : ids[0]

  return (
    <Secao
      titulo="Evolução nos temas"
      lead="Só entram as sessões que você escolheu levar para a Análise."
    >
      {ids.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-5 text-muted-foreground">
          Nenhuma sessão levada ainda. Ao terminar um treino na Prática, escolha
          "Levar para a Análise".
        </div>
      ) : (
        <>
          <div
            role="tablist"
            aria-label="Módulos treinados"
            className="mb-6 flex flex-wrap justify-center gap-2"
          >
            {ids.map((m) => (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={atual === m}
                onClick={() => setEscolhido(m)}
                className={cn(
                  "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-[background-color,border-color,color] duration-150",
                  atual === m
                    ? "border-primary bg-primary/15 text-foreground"
                    : "bg-card text-muted-foreground hover:text-foreground"
                )}
              >
                {m} · {MODULOS[m] ?? `Módulo ${m}`}
              </button>
            ))}
          </div>
          <Modulo
            key={atual}
            modulo={atual}
            sessoes={porModulo.get(atual) ?? []}
            tirar={tirar}
          />
        </>
      )}
    </Secao>
  )
}
