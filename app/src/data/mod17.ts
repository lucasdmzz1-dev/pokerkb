import type { CardCode } from "@/data/mod15"

export type SizeBB = "B25" | "B40" | "B70"
export type SplitId = "b25" | "b40" | "b70"

export interface ExemploBB {
  classe: string
  hero: CardCode[]
}

export interface BucketBB {
  p: number
  maos: string
  ex: ExemploBB[]
}

export interface SplitBB {
  id: SplitId
  size: SizeBB
  nome: string
  quando: string
  board: CardCode[]
  boardNome: string
  buckets: BucketBB[]
  nota: string
}

export interface BoardBB {
  cards: CardCode[]
  nome: string
  size: SizeBB
  nota: string
}

export const mod17 = {
  id: "17",
  slug: "bb-raise-pot-vs-sb",
  nome: "BB Raise Pot vs SB",
  spot: "Blind war · você no BB, em posição · SB dá limp, BB raise de 3,5bb e SB paga · 40bb",
  fonte:
    "theory/17-BB-Raised-Pot-vs-SB-Limp (guideline, tabela dos splits e aula)",

  em30: [
    "Range do BB polarizado: topo e lixo, pouca mão média. Por isso não dá para apostar o range inteiro em size médio.",
    "Limp-call do SB: defende pouco offsuit baixo. Carta de valor 8 ou mais no board significa que o SB acerta par.",
    "Thin value define o size: B25 quando o board tem thin value, B70 quando não tem, B40 no que sobrar.",
    "Size maior: menor a frequência de aposta e maior a necessidade de split.",
    "Altas e baixas no board: uma carta alta e duas baixas (abaixo do 8x), B25. Duas altas e uma baixa, B40. Duas altas com a terceira conectando, B70.",
    "Range off do SB: seguida que ele tem offsuit (Q-J-8, J-T-8), B40. Seguida em board low, que ele não tem offsuit (9-7-5, T-8-5), B70.",
    "Dobrado seco e A high seco: range em B25.",
  ],

  premissas: [
    "BB polarizado: faz 3,5bb e fica em posição, mas sem cobertura linear não consegue apostar range em size médio, como um range de EP contra o BB.",
    "Limp-call do SB: não defende 7-3, 7-5, 8-6, T-6 e 9-6. A parte offsuit começa em 8x.",
    "Range do SB: pergunte sempre qual é. Quanto menos ele acerta o board, mais o BB aposta mãos finas em frequência alta.",
  ],

  sizes: [
    {
      size: "B25",
      nome: "Temos thin value",
      nota: "O máximo de thin value. Range ou split B25.",
    },
    {
      size: "B40",
      nome: "Intermediário",
      nota: "O que sobrar. Split B40.",
    },
    {
      size: "B70",
      nome: "Não temos thin value",
      nota: "O mínimo de thin value. Split B70.",
    },
  ] as { size: SizeBB; nome: string; nota: string }[],

  splits: [
    {
      id: "b25",
      size: "B25",
      nome: "Split B25",
      quando: "Board em que temos thin value.",
      board: ["Qc", "6h", "3h"],
      boardNome: "Q-6-3 com flush draw",
      buckets: [
        {
          p: 100,
          maos: "Overpair e sets (menos o top set)",
          ex: [
            { classe: "Overpair", hero: ["Ad", "As"] },
            { classe: "Sets (menos o top set)", hero: ["6c", "6d"] },
          ],
        },
        {
          p: 75,
          maos: "Dois pares, top set, TP e bons draws",
          ex: [
            { classe: "Dois pares", hero: ["Qd", "6d"] },
            { classe: "Top set", hero: ["Qh", "Qd"] },
            { classe: "TP", hero: ["Qs", "Jd"] },
            { classe: "Bons draws", hero: ["Ah", "Kh"] },
          ],
        },
        {
          p: 50,
          maos: "Todo o restante",
          ex: [{ classe: "Todo o restante", hero: ["Js", "9d"] }],
        },
      ],
      nota: "Em board muito favorável, o bucket de 25% vira 100% e a mão vira range.",
    },
    {
      id: "b40",
      size: "B40",
      nome: "Split B40",
      quando: "Board intermediário, o que sobrar.",
      board: ["4c", "Jd", "Kc"],
      boardNome: "K-J-4, dois broadways",
      buckets: [
        {
          p: 75,
          maos: "Overpair, sets, dois pares, TP forte e flush draws",
          ex: [
            { classe: "Overpair", hero: ["Ah", "As"] },
            { classe: "Sets", hero: ["Kh", "Kd"] },
            { classe: "Dois pares", hero: ["Kd", "Jh"] },
            { classe: "TP forte", hero: ["Kh", "Qh"] },
            { classe: "Flush draws", hero: ["Ac", "9c"] },
          ],
        },
        {
          p: 50,
          maos: "TPs e melhores draws",
          ex: [
            { classe: "TPs", hero: ["Kd", "8d"] },
            { classe: "Melhores draws", hero: ["Qc", "Tc"] },
          ],
        },
        {
          p: 25,
          maos: "Todo o restante",
          ex: [{ classe: "Todo o restante", hero: ["8h", "7h"] }],
        },
        {
          p: 0,
          maos: "Underpair",
          ex: [{ classe: "Underpair", hero: ["9h", "9d"] }],
        },
      ],
      nota: "Quanto maior o size, menor a frequência e maior a necessidade de split.",
    },
    {
      id: "b70",
      size: "B70",
      nome: "Split B70",
      quando: "Board em que não temos thin value.",
      board: ["5c", "7h", "9d"],
      boardNome: "9-7-5, low conectado",
      buckets: [
        {
          p: 75,
          maos: "Overpair, dois pares e TP forte",
          ex: [
            { classe: "Overpair", hero: ["Ah", "Ac"] },
            { classe: "Dois pares", hero: ["9c", "7c"] },
            { classe: "TP forte", hero: ["9h", "Ac"] },
          ],
        },
        {
          p: 50,
          maos: "TPs e melhores draws",
          ex: [
            { classe: "TPs", hero: ["9s", "3s"] },
            { classe: "Melhores draws", hero: ["Ts", "8s"] },
          ],
        },
        {
          p: 25,
          maos: "Trincas, second pair e todo o restante",
          ex: [
            { classe: "Trinca", hero: ["7s", "7d"] },
            { classe: "Second pair", hero: ["Ad", "7c"] },
            { classe: "Todo o restante", hero: ["Kc", "Qd"] },
          ],
        },
        {
          p: 0,
          maos: "Underpair",
          ex: [{ classe: "Underpair", hero: ["4h", "4d"] }],
        },
      ],
      nota: "No B70 a prioridade são as mãos fortes e vulneráveis nas próximas streets: dois pares, overpair e TP forte em 75%. A trinca vai em 25%: bloqueia pares e não ganha nada colocando dinheiro em frequência alta. Underpair é o pocket pair abaixo da carta mais baixa do board.",
    },
  ] as SplitBB[],

  tiposDeBoard: [
    { nome: "Monotone", size: "B25", estrategia: "Split próprio de monotone" },
    { nome: "Dobrado seco", size: "B25", estrategia: "Range (100%)" },
    { nome: "A high seco", size: "B25", estrategia: "Range (100%)" },
    {
      nome: "Dobrado conectado",
      size: "B25",
      estrategia: "Split próprio de dobrado conectado",
    },
    { nome: "A high conectado", size: "B25", estrategia: "Split B25" },
    {
      nome: "Uma alta e duas baixas (abaixo do 8x)",
      size: "B25",
      estrategia: "Split B25, muito thin value (Q-6-3, T-4-2)",
    },
    {
      nome: "Duas altas e uma baixa",
      size: "B40",
      estrategia: "Split B40 (K-J-4, Q-9-4, Q-9-2)",
    },
    {
      nome: "Seguida que o SB tem offsuit",
      size: "B40",
      estrategia: "Split B40 (Q-J-8, J-T-8)",
    },
    { nome: "Low desconectado", size: "B40", estrategia: "Split B40" },
    {
      nome: "Duas altas, a terceira conectando",
      size: "B70",
      estrategia: "Split B70 (K-Q-8, Q-9-7)",
    },
    {
      nome: "Low conectado",
      size: "B70",
      estrategia: "Split B70 (9-7-5, T-8-5)",
    },
    {
      nome: "Semi conectado com flush draw",
      size: "B70",
      estrategia: "Split B70 (Q-T-7, Q-8-7, J-7-6, K-9-8)",
    },
  ] as { nome: string; size: SizeBB; estrategia: string }[],

  boards: [
    {
      cards: ["Ks", "Ts", "Qh"],
      nome: "Triple broadway",
      size: "B70",
      nota: "Frequência de 25% a 33%. AK e KJ em 75%, K2 e J3 em 50%, mãos ruins em 25%.",
    },
    {
      cards: ["4c", "Jd", "Kc"],
      nome: "K-J-4, dois broadways",
      size: "B40",
      nota: "Mais thin value que o K-T-Q, porque o 4 não é defendido.",
    },
    {
      cards: ["Td", "Js", "8c"],
      nome: "J-T-8, com sequência",
      size: "B40",
      nota: "O SB tem sequências offsuit.",
    },
    {
      cards: ["Jd", "Qc", "8c"],
      nome: "Q-J-8, com flush draw",
      size: "B40",
      nota: "B40 porque o SB tem a seguida offsuit. O bucket dos flush draws ainda tem certeza média (50% na fala, 75% nas tabelas).",
    },
    {
      cards: ["4c", "2c", "8d"],
      nome: "8-4-2, low desconectado",
      size: "B40",
      nota: "As overcards mudam os nuts, e os pares do board perdem valor.",
    },
    {
      cards: ["5c", "7h", "9d"],
      nome: "9-7-5, low conectado",
      size: "B70",
      nota: "Seguida em board low, que o SB não tem offsuit. Dois pares, overpair e TP forte em 75%, trinca em 25%.",
    },
    {
      cards: ["Ks", "Qs", "8h"],
      nome: "K-Q-8, a terceira conecta",
      size: "B70",
      nota: "Duas altas com a terceira conectando. Frequência de 25%, e o SB não tem a seguida.",
    },
    {
      cards: ["Qs", "9s", "7d"],
      nome: "Q-9-7, muito dinâmico",
      size: "B70",
      nota: "Alta interação com o range do SB e sem incentivo de thin value.",
    },
    {
      cards: ["Qd", "9c", "2h"],
      nome: "Q-9-2, duas altas e uma baixa",
      size: "B40",
      nota: "Muitos 9x ainda querem apostar.",
    },
    {
      cards: ["Td", "8d", "5c"],
      nome: "T-8-5, low conectado com flush draw",
      size: "B70",
      nota: "Quanto mais conecta, pior: T-7-4 é B40, e o T-8-5 com flush draw já é B70.",
    },
    {
      cards: ["4h", "Qc", "9c"],
      nome: "Q-9-4, duas cartas de valor",
      size: "B40",
      nota: "Duas cartas de valor 8 ou mais: o SB acerta mais pares.",
    },
    {
      cards: ["3h", "6h", "Qc"],
      nome: "Q-6-3, com flush draw",
      size: "B25",
      nota: "Uma alta e duas baixas: muito thin value. Frequência de 66% a 75%, quase range. Nas tabelas por board do coach, dois pares e overpair em 100%, trinca, TP e air em 75%.",
    },
  ] as BoardBB[],

  especiais: [
    {
      nome: "Monotone",
      size: "B25" as SizeBB,
      textos: [
        "Buckets de 25%, 50% e 75%, com frequência geral perto de 50%.",
        "As mãos mais fortes vão nos buckets altos.",
        "Second pair vai em 25%, de preferência com carta do naipe.",
        "O mesmo split vale para qualquer monotone, inclusive o 7-8-9.",
        "O check evita tomar check-raise de mãos off com carta do naipe.",
      ],
    },
    {
      nome: "Dobrado conectado",
      size: "B25" as SizeBB,
      textos: [
        "Trinca, full e quadra em 75%, e todo o restante em 50%.",
        "A frequência é alta, mas com check desenvolvido.",
        "Você toma mais check-raise e realiza menos equity.",
      ],
    },
  ],

  turn: [
    "Flop em check-check: o size do turn é sempre alto. B70 no mínimo, para apostar todos os TP, e B100 ou mais para apostar só TP com bom kicker.",
    "Flop apostado: blank é geométrico, e carta que conecta com o board tende a B70.",
    "Mais TP no valor: quanto mais TP você quer apostar, menor o size.",
  ],

  pocket: [
    "Thin value define o size: B25 com thin value, B70 sem, B40 no meio.",
    "Size maior: menor frequência e mais split.",
    "Altas e baixas: uma alta e duas baixas, B25. Duas altas e uma baixa, B40. Duas altas com a terceira conectando, B70.",
    "Range off do SB: seguida que ele tem offsuit, B40. Seguida em board low, B70.",
    "Triple broadway, low conectado e semi conectado com flush draw: B70.",
    "A high seco e dobrado seco: range em B25.",
    "Monotone: B25, buckets 25/50/75, frequência perto de 50%.",
    "Dobrado conectado: trinca, full e quadra em 75%, o restante em 50%.",
    "No B70: dois pares, overpair e TP forte em 75%. Trinca em 25%.",
    "Pocket pairs: acima de todas as cartas é overpair, entre as cartas é segundo ou terceiro par, abaixo de todas é underpair.",
    "Flush draw no board: a mão com carta do naipe aposta mais e a sem carta dá check.",
    "Turn depois de check-check: size alto, B70 no mínimo.",
  ],
}

export const splitById = Object.fromEntries(
  mod17.splits.map((s) => [s.id, s])
) as Record<SplitId, SplitBB>
