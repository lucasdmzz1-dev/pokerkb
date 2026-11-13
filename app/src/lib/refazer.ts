import { useEffect } from "react"
import type { Tema } from "@/pages/pratica-probe"
import { shuffle } from "@/lib/poker"

// Pedido da Análise: treinar na Prática só as mãos que você errou num módulo.
const CHAVE = "pkb:refazer"

const TEMA_DO_MODULO: Record<string, Tema> = {
  "01": "cbet",
  "02": "cbet40",
  "03": "barrel",
  "04": "tbarrel",
  "05": "oop",
  "08": "tbet",
  "14": "probe",
  "15": "bet",
  "17": "bb",
  "18": "xc",
}

interface Pedido {
  modulo: string
  ids: string[]
}

function ler(): Pedido | null {
  try {
    const v = JSON.parse(localStorage.getItem(CHAVE) ?? "null")
    return v && typeof v.modulo === "string" && Array.isArray(v.ids) ? v : null
  } catch {
    return null
  }
}

export function pedirRefazer(modulo: string, ids: string[]): void {
  try {
    localStorage.setItem(CHAVE, JSON.stringify({ modulo, ids }))
  } catch {
    /* sem armazenamento: o botão simplesmente não leva as mãos */
  }
}

// Tema da Prática a abrir quando há um pedido pendente.
export function temaPendente(): Tema | null {
  const p = ler()
  return p ? (TEMA_DO_MODULO[p.modulo] ?? null) : null
}

// Cada tela da Prática chama isto: se o pedido é do seu módulo, começa só com essas mãos.
export function useRefazerPendente<T extends { id: string }>(
  modulo: string,
  todas: T[],
  comecar: (pool: T[]) => void
): void {
  useEffect(() => {
    const p = ler()
    if (!p || p.modulo !== modulo) return
    try {
      localStorage.removeItem(CHAVE)
    } catch {
      /* ignora */
    }
    const ids = new Set(p.ids)
    const pool = todas.filter((q) => ids.has(q.id))
    if (pool.length > 0) comecar(shuffle(pool))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
