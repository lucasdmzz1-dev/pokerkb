import {
  type AcaoRiver,
  type Passo,
  type SituacaoRiver,
} from "@/data/pratRiver"

// Módulo 09 (Bet-Check-Bet): o BTN (herói) abre, o BB paga, o BTN aposta o flop e o BB
// paga; o turn termina em check-check e o BB dá check no river. O herói decide o river.
// As 25 mãos vêm do trainer do professor (regras de 03 e 04/11/2026), com o gabarito
// dele. O pote do river é de 8,25bb; os stacks são didáticos e variam (36,5 e 38,63bb).
// O trainer não mostra o size do c-bet nem do open, então os passos não trazem valores.

const POTE = 8.25

const PASSOS: Passo[] = [
  { nome: "BTN", acao: "Raise" },
  { nome: "SB", acao: "Fold" },
  { nome: "BB", acao: "Call" },
  { rua: "Flop" },
  { nome: "BB", acao: "Check" },
  { nome: "BTN", acao: "Bet" },
  { nome: "BB", acao: "Call" },
  { rua: "Turn" },
  { nome: "BB", acao: "Check" },
  { nome: "BTN", acao: "Check" },
  { rua: "River" },
  { nome: "BB", acao: "Check" },
]

const ACOES: AcaoRiver[] = ["CHECK", "B70", "B100"]

type Base = Pick<
  SituacaoRiver,
  "id" | "tipo" | "board" | "hero" | "certa" | "classe" | "porque"
> & { stack?: number }

function btn({ stack = 36.5, ...b }: Base): SituacaoRiver {
  return {
    ...b,
    heroPos: "BTN",
    vilaoPos: "BB",
    pote: POTE,
    stack,
    passos: PASSOS,
    acaoVilao: "",
    acoes: ACOES,
  }
}

const T_BLANK = "Blank"
const T_HIGH = "Dinâmico high card"
const T_AX = "Dinâmico Ax"
const T_FLUSH = "Dinâmico flush"
const T_SEQ = "Dinâmico sequência"
const T_DOBRA = "Dobra no river"

const lista: Base[] = [
  {
    id: "t01",
    tipo: T_HIGH,
    board: ["7d", "3h", "4d", "Js", "Kh"],
    hero: ["As", "5s"],
    certa: "CHECK",
    classe: "A-high",
    porque: "o A-high fica em check, preservando o showdown.",
  },
  {
    id: "t02",
    tipo: T_SEQ,
    board: ["5s", "Ac", "3h", "7d", "6d"],
    hero: ["Qh", "Kh"],
    certa: "CHECK",
    classe: "K-high",
    porque: "o K-high não blefa num board de A-high, e fica em check.",
  },
  {
    id: "t03",
    tipo: T_BLANK,
    board: ["Qc", "Jh", "9c", "5h", "6d"],
    hero: ["Qs", "2d"],
    certa: "B70",
    classe: "Top pair",
    porque: "no blank o size é B70, e second pair ou melhor é valor.",
  },
  {
    id: "t04",
    tipo: T_BLANK,
    board: ["6h", "Ah", "8c", "2h", "Kd"],
    hero: ["4s", "Ts"],
    certa: "B70",
    classe: "Sem par",
    porque: "river blank usa B70.",
  },
  {
    id: "t05",
    tipo: T_HIGH,
    board: ["3h", "8h", "5h", "Jd", "Qc"],
    hero: ["6d", "9d"],
    certa: "B100",
    classe: "Sem par",
    porque:
      "a dama é carta alta nova no river, e o B100 vale nas mudanças de carta alta.",
  },
  {
    id: "t06",
    tipo: T_FLUSH,
    board: ["Td", "Tc", "Qc", "3s", "8c"],
    hero: ["5c", "9c"],
    certa: "B100",
    classe: "Flush",
    porque: "flush completo é valor do B100.",
  },
  {
    id: "t07",
    tipo: T_DOBRA,
    board: ["2d", "4d", "3s", "Jc", "Jh"],
    hero: ["5h", "Qh"],
    certa: "B100",
    classe: "Sem par",
    porque: "o river dobrou o board, e o B100 vale nas dobras.",
  },
  {
    id: "t08",
    tipo: T_BLANK,
    board: ["4s", "3s", "Ah", "6c", "Th"],
    hero: ["7c", "8s"],
    certa: "B70",
    classe: "Sem par",
    porque: "river blank usa B70.",
  },
  {
    id: "t09",
    tipo: T_FLUSH,
    board: ["8d", "6s", "9c", "3d", "Kd"],
    hero: ["4h", "7h"],
    certa: "B100",
    classe: "Sem par",
    porque:
      "o K completa o flush e é carta alta nova, e o B100 vale nos dois casos.",
  },
  {
    id: "t10",
    tipo: T_FLUSH,
    board: ["Ad", "3d", "2d", "Ks", "Ts"],
    hero: ["7s", "8s"],
    certa: "B100",
    classe: "Sem par",
    porque:
      "o T é carta alta nova num board de flush já possível, e o B100 vale nas mudanças de carta alta.",
  },
  {
    id: "t11",
    tipo: T_DOBRA,
    board: ["8c", "6h", "8d", "3s", "6s"],
    hero: ["4h", "Qh"],
    certa: "B100",
    classe: "Sem par",
    porque: "o river dobrou o board, e o B100 vale nas dobras.",
  },
  {
    id: "t12",
    tipo: T_BLANK,
    board: ["Kc", "Qh", "Kd", "Qd", "7h"],
    hero: ["2s", "Js"],
    certa: "B70",
    classe: "Sem par",
    porque:
      "o board já está duplamente dobrado, então a carta isolada no river é blank, sem POT.",
  },
  {
    id: "t13",
    tipo: T_AX,
    board: ["3h", "4h", "9c", "Ks", "Ac"],
    hero: ["Ad", "5c"],
    certa: "B70",
    classe: "Top pair",
    porque: "no Ax dinâmico, top pair com kicker abaixo de T usa B70.",
  },
  {
    id: "t14",
    tipo: T_HIGH,
    board: ["6h", "Th", "4s", "Tc", "Jc"],
    hero: ["8h", "Qh"],
    certa: "B100",
    classe: "Sem par",
    porque:
      "o valete é carta alta nova no river, e o B100 vale nas mudanças de carta alta.",
  },
  {
    id: "t15",
    tipo: T_BLANK,
    board: ["7d", "6c", "Qs", "Ah", "8h"],
    hero: ["4s", "4c"],
    certa: "CHECK",
    classe: "Terceiro par",
    porque:
      "terceiro par ou pior fica fora do value bet, preservando o showdown.",
    stack: 38.63,
  },
  {
    id: "t16",
    tipo: T_DOBRA,
    board: ["Td", "4h", "2c", "Th", "3s"],
    hero: ["7s", "As"],
    certa: "CHECK",
    classe: "A-high",
    porque: "o A-high fica em check, preservando o showdown.",
  },
  {
    id: "t17",
    tipo: T_BLANK,
    board: ["8c", "Js", "8h", "Qd", "4h"],
    hero: ["7s", "Ts"],
    certa: "B70",
    classe: "Sem par",
    porque: "river blank usa B70.",
    stack: 38.63,
  },
  {
    id: "t18",
    tipo: T_BLANK,
    board: ["4h", "Qs", "2d", "Qh", "8s"],
    hero: ["3d", "Jd"],
    certa: "B70",
    classe: "Sem par",
    porque: "river blank usa B70.",
  },
  {
    id: "t19",
    tipo: T_FLUSH,
    board: ["Jh", "7c", "Th", "4c", "6c"],
    hero: ["5c", "Jc"],
    certa: "B100",
    classe: "Flush",
    porque: "flush completo é valor do B100.",
  },
  {
    id: "t20",
    tipo: T_FLUSH,
    board: ["5d", "8s", "8c", "6d", "Td"],
    hero: ["8d", "9d"],
    certa: "B100",
    classe: "Flush",
    porque: "flush completo é valor do B100.",
  },
  {
    id: "t21",
    tipo: T_AX,
    board: ["4h", "Qc", "5s", "6c", "Ad"],
    hero: ["9s", "As"],
    certa: "B70",
    classe: "Top pair",
    porque: "no Ax dinâmico, top pair com kicker abaixo de T usa B70.",
  },
  {
    id: "t22",
    tipo: T_DOBRA,
    board: ["8s", "2c", "5d", "6s", "6h"],
    hero: ["Js", "As"],
    certa: "CHECK",
    classe: "A-high",
    porque: "o A-high fica em check, preservando o showdown.",
  },
  {
    id: "t23",
    tipo: T_FLUSH,
    board: ["8s", "5h", "Ad", "6s", "3s"],
    hero: ["Qh", "Kd"],
    certa: "CHECK",
    classe: "K-high",
    porque: "o K-high não blefa num board de A-high, e fica em check.",
  },
  {
    id: "t24",
    tipo: T_FLUSH,
    board: ["Ts", "7h", "2s", "Jc", "3s"],
    hero: ["Qc", "Ac"],
    certa: "CHECK",
    classe: "A-high",
    porque: "o A-high fica em check, preservando o showdown.",
  },
  {
    id: "t25",
    tipo: T_DOBRA,
    board: ["Ad", "Jc", "4h", "Kh", "Js"],
    hero: ["Td", "Jd"],
    certa: "B100",
    classe: "Trinca",
    porque: "na dobra do river, trincas ou melhor usam B100.",
  },
  // Mão 51 do trainer (26/11/2026).
  {
    id: "t26",
    tipo: T_DOBRA,
    board: ["Js", "7s", "4s", "8c", "8s"],
    hero: ["8h", "Qc"],
    certa: "B100",
    classe: "Trinca",
    porque:
      "na dobra, trincas ou melhor usam B100, mesmo num board com quatro cartas do mesmo naipe.",
  },
]

// Mãos montadas a partir das mesmas regras (n01 em diante). O que decide o size é o que o
// river mudou: blank usa B70; carta alta nova, flush e dobra usam B100 no bluff sem par e
// no valor forte. Top pair no Ax usa B100 com kicker T ou maior e B70 abaixo disso, e com
// flush possível no board vai de B70. A-high, K-high em board A-high, Q-high em board K-high
// e terceiro par ou pior ficam em check. Os naipes são ilustrativos.
const BA = ["Kc", "8d", "3s", "6h", "2d"]
const BB = ["Ad", "9c", "4s", "Jh", "3d"]
const BC = ["9c", "5d", "2s", "Jh", "Ac"]
const BD = ["Ks", "9d", "4d", "2c", "7d"]
const BE = ["Js", "7d", "4c", "Kh", "7h"]
const BF = ["7c", "4d", "2s", "9h", "Qc"]
const BG = ["5d", "8c", "3s", "Jh", "Kd"]

const TERCEIRO =
  "terceiro par ou pior fica fora do value bet, preservando o showdown."
const AHIGH = "o A-high fica em check, preservando o showdown."
const BLANK70 = "river blank usa B70."
const FLUSH100 = "flush completo é valor do B100."
const AX100 =
  "no Ax dinâmico, top pair com kicker T ou maior usa B100 (sem flush possível)."
const AX70 = "no Ax dinâmico, top pair com kicker abaixo de T usa B70."
const MUDA100 =
  "o river mudou a carta alta, e o B100 vale nas mudanças de carta alta."
const DOBRA100 = "o river dobrou o board, e o B100 vale nas dobras."

const extras: Base[] = [
  // Blank K-8-3-6-2
  {
    id: "n01",
    tipo: T_BLANK,
    board: BA,
    hero: ["Kh", "9h"],
    certa: "B70",
    classe: "Top pair",
    porque: "no blank o size é B70, e top pair com kicker fraco é valor.",
  },
  {
    id: "n02",
    tipo: T_BLANK,
    board: BA,
    hero: ["8s", "7s"],
    certa: "B70",
    classe: "Second pair",
    porque: "second pair é valor no B70 contra um range capado.",
  },
  {
    id: "n03",
    tipo: T_BLANK,
    board: BA,
    hero: ["Td", "Tc"],
    certa: "B70",
    classe: "Second pair",
    porque: "pocket pair acima do 8 é second pair, e é valor no B70.",
  },
  {
    id: "n04",
    tipo: T_BLANK,
    board: BA,
    hero: ["6c", "5c"],
    certa: "CHECK",
    classe: "Terceiro par",
    porque: TERCEIRO,
  },
  {
    id: "n05",
    tipo: T_BLANK,
    board: BA,
    hero: ["Qh", "Jh"],
    certa: "CHECK",
    classe: "Q-high",
    porque: "o Q-high não blefa num board de K-high, e fica em check.",
  },
  {
    id: "n06",
    tipo: T_BLANK,
    board: BA,
    hero: ["As", "Js"],
    certa: "CHECK",
    classe: "A-high",
    porque: AHIGH,
  },
  {
    id: "n07",
    tipo: T_BLANK,
    board: BA,
    hero: ["Ts", "9s"],
    certa: "B70",
    classe: "Sem par",
    porque: "sem par e sem A nem K, o bluff no blank usa B70.",
  },
  // Blank A-9-4-J-3
  {
    id: "n08",
    tipo: T_BLANK,
    board: BB,
    hero: ["Ac", "Td"],
    certa: "B70",
    classe: "Top pair",
    porque: BLANK70,
  },
  {
    id: "n09",
    tipo: T_BLANK,
    board: BB,
    hero: ["Ks", "Qs"],
    certa: "CHECK",
    classe: "K-high",
    porque: "o K-high não blefa num board de A-high, e fica em check.",
  },
  {
    id: "n10",
    tipo: T_BLANK,
    board: BB,
    hero: ["9s", "8s"],
    certa: "CHECK",
    classe: "Terceiro par",
    porque: TERCEIRO,
  },
  {
    id: "n11",
    tipo: T_BLANK,
    board: BB,
    hero: ["Jc", "Tc"],
    certa: "B70",
    classe: "Second pair",
    porque: "o par de valetes é o second pair do board, e é valor no B70.",
  },
  {
    id: "n12",
    tipo: T_BLANK,
    board: BB,
    hero: ["Ts", "8s"],
    certa: "B70",
    classe: "Sem par",
    porque: "sem par e sem K, o bluff no blank usa B70.",
  },
  {
    id: "n13",
    tipo: T_BLANK,
    board: BB,
    hero: ["Qs", "Qd"],
    certa: "B70",
    classe: "Second pair",
    porque: "pocket pair entre o A e o J é second pair, e é valor no B70.",
  },
  {
    id: "n14",
    tipo: T_BLANK,
    board: BB,
    hero: ["5d", "5c"],
    certa: "CHECK",
    classe: "Terceiro par",
    porque: TERCEIRO,
  },
  // Ás no river 9-5-2-J-A
  {
    id: "n15",
    tipo: T_AX,
    board: BC,
    hero: ["Ad", "Kc"],
    certa: "B100",
    classe: "Top pair",
    porque: AX100,
  },
  {
    id: "n16",
    tipo: T_AX,
    board: BC,
    hero: ["As", "Qd"],
    certa: "B100",
    classe: "Top pair",
    porque: AX100,
  },
  {
    id: "n17",
    tipo: T_AX,
    board: BC,
    hero: ["Ah", "Ts"],
    certa: "B100",
    classe: "Top pair",
    porque: AX100,
  },
  {
    id: "n18",
    tipo: T_AX,
    board: BC,
    hero: ["Ad", "8s"],
    certa: "B70",
    classe: "Top pair",
    porque: AX70,
  },
  {
    id: "n19",
    tipo: T_AX,
    board: BC,
    hero: ["Ah", "6h"],
    certa: "B70",
    classe: "Top pair",
    porque: AX70,
  },
  {
    id: "n20",
    tipo: T_AX,
    board: BC,
    hero: ["Kd", "Qd"],
    certa: "CHECK",
    classe: "K-high",
    porque: "o K-high não blefa num board de A-high, e fica em check.",
  },
  // Flush K-9-4-2-7
  {
    id: "n21",
    tipo: T_FLUSH,
    board: BD,
    hero: ["Ad", "5d"],
    certa: "B100",
    classe: "Flush",
    porque: FLUSH100,
  },
  {
    id: "n22",
    tipo: T_FLUSH,
    board: BD,
    hero: ["Qd", "6d"],
    certa: "B100",
    classe: "Flush",
    porque: FLUSH100,
  },
  {
    id: "n23",
    tipo: T_FLUSH,
    board: BD,
    hero: ["8d", "6d"],
    certa: "B100",
    classe: "Flush",
    porque: FLUSH100,
  },
  {
    id: "n24",
    tipo: T_FLUSH,
    board: BD,
    hero: ["Ad", "Qc"],
    certa: "CHECK",
    classe: "A-high",
    porque:
      "o A-high fica em check, mesmo com o A de ouros: a exceção do painel pede sequência alta e flush juntos.",
  },
  {
    id: "n25",
    tipo: T_FLUSH,
    board: BD,
    hero: ["Qd", "Jc"],
    certa: "CHECK",
    classe: "Q-high",
    porque: "o Q-high não blefa num board de K-high, e fica em check.",
  },
  {
    id: "n26",
    tipo: T_FLUSH,
    board: BD,
    hero: ["Kc", "Jc"],
    certa: "B70",
    classe: "Top pair",
    porque:
      "com flush possível no board, top pair usa B70 mesmo com kicker alto.",
  },
  {
    id: "n27",
    tipo: T_FLUSH,
    board: BD,
    hero: ["7c", "7h"],
    certa: "B100",
    classe: "Trinca",
    porque: "trinca feita no river é valor forte, no B100.",
  },
  {
    id: "n28",
    tipo: T_FLUSH,
    board: BD,
    hero: ["As", "9c"],
    certa: "CHECK",
    classe: "Second pair",
    porque:
      "second pair não aposta quando o river completa o flush sem melhorar a mão.",
  },
  // Dobra J-7-4-K-7
  {
    id: "n29",
    tipo: T_DOBRA,
    board: BE,
    hero: ["Ad", "7c"],
    certa: "B100",
    classe: "Trinca",
    porque: "na dobra do river, trincas ou melhor usam B100.",
  },
  {
    id: "n30",
    tipo: T_DOBRA,
    board: BE,
    hero: ["Qd", "9d"],
    certa: "CHECK",
    classe: "Q-high",
    porque: "o Q-high não blefa num board de K-high, e fica em check.",
  },
  {
    id: "n31",
    tipo: T_DOBRA,
    board: BE,
    hero: ["9s", "8s"],
    certa: "B100",
    classe: "Sem par",
    porque: DOBRA100,
  },
  {
    id: "n32",
    tipo: T_DOBRA,
    board: BE,
    hero: ["5c", "3c"],
    certa: "B100",
    classe: "Sem par",
    porque: DOBRA100,
  },
  // Dama no river 7-4-2-9-Q
  {
    id: "n33",
    tipo: T_HIGH,
    board: BF,
    hero: ["Qd", "Jd"],
    certa: "B100",
    classe: "Top pair",
    porque:
      "top pair novo com kicker T ou maior usa B100 (sem flush possível).",
  },
  {
    id: "n34",
    tipo: T_HIGH,
    board: BF,
    hero: ["Qs", "9s"],
    certa: "B70",
    classe: "Top pair",
    porque: "top pair com kicker abaixo de T usa B70.",
  },
  {
    id: "n35",
    tipo: T_HIGH,
    board: BF,
    hero: ["Ad", "9s"],
    certa: "B70",
    classe: "Second pair",
    porque: "second pair é valor no B70.",
  },
  {
    id: "n36",
    tipo: T_HIGH,
    board: BF,
    hero: ["Kd", "Ts"],
    certa: "B100",
    classe: "Sem par",
    porque: MUDA100,
  },
  {
    id: "n37",
    tipo: T_HIGH,
    board: BF,
    hero: ["6h", "5h"],
    certa: "B100",
    classe: "Sem par",
    porque: MUDA100,
  },
  {
    id: "n38",
    tipo: T_HIGH,
    board: BF,
    hero: ["As", "8s"],
    certa: "CHECK",
    classe: "A-high",
    porque: AHIGH,
  },
  {
    id: "n39",
    tipo: T_HIGH,
    board: BF,
    hero: ["8c", "8d"],
    certa: "CHECK",
    classe: "Terceiro par",
    porque: TERCEIRO,
  },
  {
    id: "n40",
    tipo: T_HIGH,
    board: BF,
    hero: ["Js", "Ts"],
    certa: "B100",
    classe: "Sem par",
    porque: MUDA100,
  },
  // Rei no river 5-8-3-J-K
  {
    id: "n41",
    tipo: T_HIGH,
    board: BG,
    hero: ["Kh", "Th"],
    certa: "B100",
    classe: "Top pair",
    porque: "top pair novo com kicker T usa B100 (sem flush possível).",
  },
  {
    id: "n42",
    tipo: T_HIGH,
    board: BG,
    hero: ["Ks", "9s"],
    certa: "B70",
    classe: "Top pair",
    porque: "top pair com kicker abaixo de T usa B70.",
  },
  {
    id: "n43",
    tipo: T_HIGH,
    board: BG,
    hero: ["Qh", "Th"],
    certa: "CHECK",
    classe: "Q-high",
    porque: "o Q-high não blefa num board de K-high, e fica em check.",
  },
  {
    id: "n44",
    tipo: T_HIGH,
    board: BG,
    hero: ["9h", "7h"],
    certa: "B100",
    classe: "Sem par",
    porque: MUDA100,
  },
  {
    id: "n45",
    tipo: T_HIGH,
    board: BG,
    hero: ["Ac", "6c"],
    certa: "CHECK",
    classe: "A-high",
    porque: AHIGH,
  },
]

export const situacoes09: SituacaoRiver[] = [...lista, ...extras].map(btn)
