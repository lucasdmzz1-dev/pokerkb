// Prática do módulo 18 (XC e Play River). O herói está no BB, o BTN abriu, o flop foi
// check-call e o turn check-check. Cada mão vem das seis mãos da aula ou do guideline por
// runout (data/teoria/modulos/m18.ts). Duas partes: quando o herói aposta (o size) e
// quando dá check e o BTN aposta (call ou fold).

export type SizeRiver = "B25" | "B40" | "B70" | "B100"
export type AcaoCheck = "Call" | "Fold"

export interface MaoBet {
  id: string
  board: string[]
  hero: [string, string]
  certa: SizeRiver
  // Outro size que o instrutor também aceita.
  aceita?: SizeRiver
  runout: string
  classe: string
  porque: string
}

export interface MaoCheck {
  id: string
  board: string[]
  hero: [string, string]
  certa: AcaoCheck
  runout: string
  classe: string
  porque: string
}

const A16 = ["Ad", "6c", "Kh", "Qs", "9d"]
const R79 = ["7d", "9s", "Kh", "Jc", "6c"]
const J4 = ["Jd", "Qc", "4d", "Jh", "3s"]
const J63 = ["Jh", "6s", "3s", "Td", "Qc"]
const J6T = ["Jh", "6d", "Ts", "3c", "5c"]

export const apostas: MaoBet[] = [
  {
    id: "m1-tp",
    board: A16,
    hero: ["As", "5c"],
    certa: "B100",
    runout: "A-6-K, turn Q, river 9",
    classe: "Top pair",
    porque: "O range do BTN está capado e o top pair virou o nuts: pote.",
  },
  {
    id: "m1-sp",
    board: A16,
    hero: ["Kc", "4s"],
    certa: "B25",
    runout: "A-6-K, turn Q, river 9",
    classe: "Second pair",
    porque: "Second pair aposta B25 e extrai de Q-x e 9-x.",
  },
  {
    id: "m1-6x",
    board: A16,
    hero: ["7s", "6s"],
    certa: "B100",
    runout: "A-6-K, turn Q, river 9",
    classe: "Bluff com 6-x",
    porque: "Sem bluff natural (o T-J fez sequência), o 6-x blefa em pote.",
  },
  {
    id: "m1-float",
    board: A16,
    hero: ["8h", "7h"],
    certa: "B100",
    runout: "A-6-K, turn Q, river 9",
    classe: "Float com backdoor",
    porque: "Os floats com backdoor blefam em pote e atacam 9-x e Q-x.",
  },
  {
    id: "m2-55",
    board: R79,
    hero: ["5s", "5h"],
    certa: "B100",
    runout: "7-9-K, turn J, river 6",
    classe: "Par baixo vira bluff",
    porque:
      "Quase não há bluff natural. O par vira bluff, sempre no size mais alto, para fazer foldar par.",
  },
  {
    id: "m2-tp",
    board: R79,
    hero: ["Ks", "4s"],
    certa: "B100",
    runout: "7-9-K, turn J, river 6",
    classe: "Top pair",
    porque: "K-x ou melhor aposta pote.",
  },
  {
    id: "m2-sp",
    board: R79,
    hero: ["Jd", "4d"],
    certa: "B25",
    runout: "7-9-K, turn J, river 6",
    classe: "Second pair",
    porque: "J-x aposta B25.",
  },
  {
    id: "m3-trinca",
    board: ["9d", "Qd", "6h", "3h", "Qh"],
    hero: ["Qc", "7s"],
    certa: "B100",
    runout: "9-Q-6, turn 3, river Q",
    classe: "Trinca",
    porque:
      "Há muitos bluffs disponíveis, então o size alto é muito alto: pote ou mais.",
  },
  {
    id: "m4-trinca",
    board: J4,
    hero: ["Js", "9s"],
    certa: "B100",
    runout: "J-Q-4, turn J, river 3",
    classe: "Trinca",
    porque: "Na dobra, o que vira trinca vai no size alto.",
  },
  {
    id: "m4-q8",
    board: J4,
    hero: ["Qd", "8h"],
    certa: "B40",
    aceita: "B25",
    runout: "J-Q-4, turn J, river 3",
    classe: "Q-x",
    porque:
      "O que não é trinca vai no size baixo. O Q-8 faz bloco: B40 serve muito bem e B25 não tem problema.",
  },
  {
    id: "m4-draw",
    board: J4,
    hero: ["Kd", "Td"],
    certa: "B100",
    runout: "J-Q-4, turn J, river 3",
    classe: "Draw bustado",
    porque: "Bluff ruim vai em pote: flush draw bustado e K-T.",
  },
  {
    id: "m4-low",
    board: J4,
    hero: ["6c", "5c"],
    certa: "B25",
    runout: "J-Q-4, turn J, river 3",
    classe: "Bluff de low cards",
    porque: "O 6-5 de paus ataca mais mãos e vai no size baixo.",
  },
  {
    id: "m5-dois",
    board: J63,
    hero: ["Jd", "6d"],
    certa: "B100",
    runout: "J-6-3, turn T, river Q",
    classe: "Dois pares",
    porque: "Dois pares apostam pote.",
  },
  {
    id: "m5-jx",
    board: J63,
    hero: ["Jc", "7c"],
    certa: "B25",
    runout: "J-6-3, turn T, river Q",
    classe: "J-x",
    porque: "J-x aposta B25.",
  },
  {
    id: "m6-sp",
    board: J6T,
    hero: ["Td", "4d"],
    certa: "B25",
    runout: "J-6-T, turn 3, river 5",
    classe: "Second pair",
    porque:
      "Todos os T-x apostam B25. O T-4 é muito bom, mas não é mão absoluta.",
  },
  {
    id: "blank-9",
    board: J6T,
    hero: ["9h", "8h"],
    certa: "B25",
    runout: "J-6-T, turn 3, river 5 (blank)",
    classe: "9 high",
    porque: "No blank, o bluff de 9 high ou menor vai no B25.",
  },
  {
    id: "blank-q",
    board: J6T,
    hero: ["Qh", "9c"],
    certa: "B100",
    runout: "J-6-T, turn 3, river 5 (blank)",
    classe: "Q high",
    porque: "No blank, o bluff de J high e Q high vai no B100.",
  },
  {
    id: "hcturn-q",
    board: ["Qs", "5d", "2c", "Kh", "8s"],
    hero: ["Qd", "9d"],
    certa: "B100",
    runout: "Q-5-2, turn K, river 8 (high card no turn)",
    classe: "Q-x",
    porque:
      "A high card no turn deixa o BTN ainda mais capado: o Q-x cobra de 66, 77, 99, TT e JJ em pote.",
  },
  {
    id: "hcriver-q",
    board: ["Qs", "5d", "2c", "8s", "Kh"],
    hero: ["Qd", "9d"],
    certa: "B70",
    runout: "Q-5-2, turn 8, river K (high card no river)",
    classe: "Q-x",
    porque:
      "A ordem dos fatores altera o produto: o mesmo Q-x faz pote com o K no turn e B70 com o K no river.",
  },
]

export const checks: MaoCheck[] = [
  {
    id: "c-m1-q8",
    board: A16,
    hero: ["Qd", "8d"],
    certa: "Call",
    runout: "A-6-K, turn Q, river 9",
    classe: "Third pair",
    porque: "O Q-x passa a ser mais check-call.",
  },
  {
    id: "c-m4-54",
    board: J4,
    hero: ["5s", "4s"],
    certa: "Call",
    runout: "J-Q-4, turn J, river 3",
    classe: "4-x",
    porque: "4-x com kicker que não bloqueia bluff paga: de 4-2 a 4-8.",
  },
  {
    id: "c-m4-a4",
    board: J4,
    hero: ["As", "4h"],
    certa: "Call",
    runout: "J-Q-4, turn J, river 3",
    classe: "A-4",
    porque: "O A-4 paga sempre.",
  },
  {
    id: "c-m4-a9",
    board: J4,
    hero: ["Ac", "9h"],
    certa: "Fold",
    runout: "J-Q-4, turn J, river 3",
    classe: "A high",
    porque: "O A-9 off é check-fold.",
  },
  {
    id: "c-m4-t4",
    board: J4,
    hero: ["Tc", "4c"],
    certa: "Fold",
    runout: "J-Q-4, turn J, river 3",
    classe: "4-x que bloqueia bluff",
    porque: "O 4-9 e o 4-T são péssimos calls: bloqueiam o que o BTN blefa.",
  },
  {
    id: "c-m5-96",
    board: J63,
    hero: ["9c", "6h"],
    certa: "Call",
    runout: "J-6-3, turn T, river Q",
    classe: "6-x",
    porque:
      "A dama é carta que o BTN overblefa. O 6-x desbloqueia os bluffs dele e paga em frequência muito alta.",
  },
  {
    id: "c-m6-64",
    board: J6T,
    hero: ["6s", "4s"],
    certa: "Call",
    runout: "J-6-T, turn 3, river 5",
    classe: "6-x",
    porque: "6-2, 6-4, 6-7 e 6-8 pagam.",
  },
  {
    id: "c-m6-a6",
    board: J6T,
    hero: ["Ac", "6c"],
    certa: "Call",
    runout: "J-6-T, turn 3, river 5",
    classe: "A-6",
    porque: "O A-6 é ótimo: não bloqueia nenhum bluff.",
  },
  {
    id: "c-m6-96",
    board: J6T,
    hero: ["9h", "6h"],
    certa: "Fold",
    runout: "J-6-T, turn 3, river 5",
    classe: "6-9",
    porque: "O 9 é carta que o BTN blefa: o 6-9 é fold.",
  },
  {
    id: "c-m6-q6",
    board: J6T,
    hero: ["Qh", "6c"],
    certa: "Fold",
    runout: "J-6-T, turn 3, river 5",
    classe: "6-Q",
    porque: "A dama é carta que o BTN blefa: o 6-Q é fold.",
  },
]
