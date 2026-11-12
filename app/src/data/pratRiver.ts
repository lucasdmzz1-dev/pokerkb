import type { Pos } from "@/components/poker/mesa"

// Tipos e botões compartilhados pelas práticas de river dos módulos 04 (Third Barrel
// e vs Third Barrel) e 18 (XC e Play River).
export type AcaoRiver =
  | "CHECK"
  | "CHECKCALL"
  | "CHECKFOLD"
  | "BET"
  | "B25"
  | "B40"
  | "B50"
  | "B70"
  | "B100"
  | "CALL"
  | "FOLD"

export type Passo = { rua: string } | { nome: string; acao: string }

export interface SituacaoRiver {
  id: string
  tipo: string
  board: string[]
  hero: [string, string]
  heroPos: Pos
  vilaoPos: Pos
  // Pote e stack atrás de cada jogador na hora da decisão.
  pote: number
  stack: number
  passos: Passo[]
  // Texto do que o vilão fez agora (vazio quando o herói age primeiro).
  acaoVilao: string
  acoes: AcaoRiver[]
  certa: AcaoRiver
  aceita?: AcaoRiver[]
  // Spot de split: o RNG decide a ação (de 1 até `ate` vale `acao`, depois vale `senao`).
  // `certa` fica como a ação de referência, a primeira do split.
  rng?: { ate: number; acao: AcaoRiver; senao: AcaoRiver }
  classe: string
  porque: string
  // Board montado a partir da regra, e não de uma mão da aula.
  ilustrativo?: boolean
}

export const r2 = (n: number) => Math.round(n * 100) / 100
export const fmt = (n: number) => String(r2(n)).replace(".", ",")

export const META: Record<
  AcaoRiver,
  { rotulo: string; nome: string; frac?: number; tecla: string; cor: string }
> = {
  CHECK: {
    rotulo: "CHECK",
    nome: "check",
    tecla: "C",
    cor: "bg-[#37829b] hover:bg-[#3f92ae]",
  },
  CHECKCALL: {
    rotulo: "CHECK-CALL",
    nome: "check-call",
    tecla: "C",
    cor: "bg-[#37829b] hover:bg-[#3f92ae]",
  },
  CHECKFOLD: {
    rotulo: "CHECK-FOLD",
    nome: "check-fold",
    tecla: "F",
    cor: "bg-[#5b6470] hover:bg-[#6a7480]",
  },
  CALL: {
    rotulo: "CALL",
    nome: "call",
    tecla: "C",
    cor: "bg-[#37829b] hover:bg-[#3f92ae]",
  },
  FOLD: {
    rotulo: "FOLD",
    nome: "fold",
    tecla: "F",
    cor: "bg-[#5b6470] hover:bg-[#6a7480]",
  },
  BET: {
    rotulo: "BET 70%",
    nome: "bet 70%",
    frac: 0.7,
    tecla: "1",
    cor: "bg-[#8f4aa6] hover:bg-[#a05bb7]",
  },
  B25: {
    rotulo: "BET 25%",
    nome: "bet 25%",
    frac: 0.25,
    tecla: "1",
    cor: "bg-[#b7791f] hover:bg-[#c98a2b]",
  },
  B40: {
    rotulo: "BET 40%",
    nome: "bet 40%",
    frac: 0.4,
    tecla: "2",
    cor: "bg-[#b0592a] hover:bg-[#c26a39]",
  },
  B50: {
    rotulo: "BET 50%",
    nome: "bet 50%",
    frac: 0.5,
    tecla: "3",
    cor: "bg-[#a63a3a] hover:bg-[#b84a4a]",
  },
  B70: {
    rotulo: "BET 70%",
    nome: "bet 70%",
    frac: 0.7,
    tecla: "4",
    cor: "bg-[#8f2f6a] hover:bg-[#a13f7a]",
  },
  B100: {
    rotulo: "POTE",
    nome: "bet pote",
    frac: 1,
    tecla: "5",
    cor: "bg-[#6d3aa6] hover:bg-[#7f4bb8]",
  },
}

export const ehBet = (a: string) => a === "BET" || /^B\d+$/.test(a)

// Passos do pré-flop e do flop de um pote single raised em que o BB pagou. O pote
// do flop é de 4,5bb (abertura de 2, call do BB e o blind morto do SB).
export const POTE_FLOP = 4.5
