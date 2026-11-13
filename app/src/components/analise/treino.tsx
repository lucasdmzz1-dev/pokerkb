import { Button } from "@/components/ui/button"
import { Secao } from "@/components/analise/secao"
import { nomeAcao } from "@/components/poker/resultado-final"
import { tipoById, type TipoId } from "@/data/mod15"
import type { ItemSessao, Sessao } from "@/lib/poker"
import { useState } from "react"
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

// Com menos mãos que isso a porcentagem engana: o tipo vai para "ainda poucas mãos".
const POUCAS = 5
const FRACOS = 3
const BOM = 80

function nomeDoTipo(modulo: string, tipo: string): string {
  return modulo === "15" ? (tipoById[tipo as TipoId]?.nome ?? tipo) : tipo
}

interface Linha {
  nome: string
  n: number
  ok: number
  // O erro que mais se repete: o que você fez e o que era certo.
  tipico?: string
}

function agrupar(sessoes: Sessao[], modulo: string): Linha[] {
  const grupos = new Map<string, ItemSessao[]>()
  sessoes
    .flatMap((s) => s.itens)
    .forEach((x) => {
      const nome = nomeDoTipo(modulo, x.tipo)
      grupos.set(nome, [...(grupos.get(nome) ?? []), x])
    })
  return [...grupos.entries()].map(([nome, d]) => {
    const conta = new Map<string, number>()
    d.filter((x) => !x.ok).forEach((x) => {
      const k = `${nomeAcao(x.resp)} quando era ${nomeAcao(x.esperado)}`
      conta.set(k, (conta.get(k) ?? 0) + 1)
    })
    const tipico = [...conta.entries()].sort((a, b) => b[1] - a[1])[0]?.[0]
    return { nome, n: d.length, ok: d.filter((x) => x.ok).length, tipico }
  })
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
  const itens = sessoes.flatMap((s) => s.itens)
  const acertos = itens.filter((x) => x.ok).length
  const linhas = agrupar(sessoes, modulo)
  const confiaveis = linhas.filter((l) => l.n >= POUCAS)
  const fracos = confiaveis
    .filter((l) => l.ok < l.n)
    .sort((a, b) => a.ok / a.n - b.ok / b.n || b.n - a.n)
    .slice(0, FRACOS)
  const bons = confiaveis
    .filter((l) => (l.ok / l.n) * 100 >= BOM)
    .sort((a, b) => b.n - a.n)
  const novos = linhas.filter((l) => l.n < POUCAS)

  return (
    <>
      <p className="mb-6 text-center text-muted-foreground tabular-nums">
        <strong className="text-2xl text-foreground">
          {Math.round((acertos / itens.length) * 100)}%
        </strong>{" "}
        de acerto · {itens.length} mãos · {sessoes.length}{" "}
        {sessoes.length === 1 ? "sessão" : "sessões"}
      </p>

      <section className="rounded-2xl border bg-card p-5">
        <h3 className="mb-3 font-bold">Estudar primeiro</h3>
        {fracos.length === 0 ? (
          <p className="text-muted-foreground">
            Nenhum ponto fraco por enquanto. Continue treinando para o quadro
            ficar mais confiável.
          </p>
        ) : (
          <ol className="grid gap-4">
            {fracos.map((l) => (
              <li key={l.nome} className="grid gap-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <strong>{l.nome}</strong>
                  <span className="text-destructive tabular-nums">
                    {Math.round((l.ok / l.n) * 100)}% · {l.ok} de {l.n}
                  </span>
                </div>
                {l.tipico && (
                  <span className="text-sm text-muted-foreground">
                    Mais comum: {l.tipico}
                  </span>
                )}
              </li>
            ))}
          </ol>
        )}
      </section>

      {bons.length > 0 && (
        <p className="mt-4 text-muted-foreground">
          <strong className="text-primary">Em dia:</strong>{" "}
          {bons.map((l) => l.nome).join(" · ")}
        </p>
      )}
      {novos.length > 0 && (
        <p className="mt-2 text-sm text-muted-foreground">
          Ainda poucas mãos (menos de {POUCAS}):{" "}
          {novos.map((l) => `${l.nome} (${l.n})`).join(" · ")}
        </p>
      )}

      <details className="mt-8">
        <summary className="cursor-pointer text-muted-foreground">
          Sessões levadas ({sessoes.length})
        </summary>
        <div className="mt-3 grid gap-2.5">
          {[...sessoes].reverse().map((s) => (
            <div
              key={s.id}
              className="flex flex-wrap items-center gap-3.5 rounded-xl border bg-card px-4 py-3"
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
      </details>
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
