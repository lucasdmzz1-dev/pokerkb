import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Comparacao, LeaksDoMes, useLeaks } from "@/components/analise/leaks"
import { MeusDados, PrimeirosPassos } from "@/components/analise/meus-dados"
import { PainelSemanal } from "@/components/analise/painel"
import { TreinoAnalise } from "@/components/analise/treino"
import { KEYS, lerSessoes, writeJSON } from "@/lib/storage"
import { cn } from "@/lib/utils"

const ABAS = [
  { id: "leaks", nome: "Leaks do mês" },
  { id: "comparacao", nome: "Comparação" },
  { id: "painel", nome: "Painel semanal" },
  { id: "treino", nome: "Treino" },
] as const

type Aba = (typeof ABAS)[number]["id"]

export default function Analise() {
  const { leaks, salvar } = useLeaks()
  const [aba, setAba] = useState<Aba>("leaks")
  const [todas, setTodas] = useState(lerSessoes)
  const levadas = todas.filter((s) => s.levar)

  function tirar(id: number) {
    const novas = todas.map((s) => (s.id === id ? { ...s, levar: false } : s))
    writeJSON(KEYS.sessions, novas)
    setTodas(novas)
  }

  return (
    <main>
      <PageHeader
        title="Análise"
        lead="Escolha o que você quer ver: os leaks do mês, a comparação com o mês anterior, o painel semanal ou o seu treino."
      />
      <div className="mx-auto max-w-[1080px] px-5 pb-24">
        <PrimeirosPassos aoComecar={() => setAba("leaks")} />
        <div
          role="tablist"
          aria-label="Seções da Análise"
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {ABAS.map((a) => (
            <button
              key={a.id}
              type="button"
              role="tab"
              id={`aba-${a.id}`}
              aria-selected={aba === a.id}
              aria-controls={`painel-${a.id}`}
              onClick={() => setAba(a.id)}
              className={cn(
                "cursor-pointer rounded-full border px-5 py-2.5 text-sm font-medium transition-[background-color,border-color,color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]",
                aba === a.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground"
              )}
            >
              {a.nome}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`painel-${aba}`}
          aria-labelledby={`aba-${aba}`}
        >
          {aba === "leaks" && (
            <LeaksDoMes
              leaks={leaks}
              salvar={salvar}
              abrirPainel={() => setAba("painel")}
            />
          )}
          {aba === "comparacao" && <Comparacao leaks={leaks} />}
          {aba === "painel" && <PainelSemanal />}
          {aba === "treino" && (
            <TreinoAnalise levadas={levadas} tirar={tirar} />
          )}
        </div>
        <MeusDados />
      </div>
    </main>
  )
}
