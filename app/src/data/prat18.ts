import {
  POTE_FLOP,
  fmt,
  r2,
  type AcaoRiver,
  type Passo,
  type SituacaoRiver,
} from "@/data/pratRiver"

// Módulo 18 (XC e Play River): o BTN abre, o BB (herói) paga, dá check-call no flop, o
// turn termina em check-check e o herói age primeiro no river (linha XC-XX-B).
// As mãos 1 a 6 e os exercícios 7 e 8 vêm de `theory/18-XC-Play-River/04-Exercicios.md`
// (boards e naipes lidos no vídeo da aula). Os boards dos exercícios 9 e 10 não têm
// naipe na teoria e são ilustrativos.

const PRIMEIRA: AcaoRiver[] = [
  "CHECKCALL",
  "CHECKFOLD",
  "B25",
  "B40",
  "B70",
  "B100",
]
const ENFRENTA: AcaoRiver[] = ["CALL", "FOLD"]

function xc(c: number, efetivo = 40) {
  return {
    pote: r2(POTE_FLOP * (1 + 2 * c)),
    stack: r2(efetivo - 2 - POTE_FLOP * c),
    c,
  }
}

function passos(c: number, bet?: number): Passo[] {
  const p: Passo[] = [
    { nome: "BTN", acao: "Raise 2" },
    { nome: "SB", acao: "Fold" },
    { nome: "BB", acao: "Call" },
    { rua: "Flop" },
    { nome: "BB", acao: "Check" },
    { nome: "BTN", acao: `Bet ${fmt(POTE_FLOP * c)}` },
    { nome: "BB", acao: "Call" },
    { rua: "Turn" },
    { nome: "BB", acao: "Check" },
    { nome: "BTN", acao: "Check" },
    { rua: "River" },
  ]
  if (bet !== undefined) {
    p.push({ nome: "BB", acao: "Check" })
  }
  return p
}

function primeira(
  base: Omit<
    SituacaoRiver,
    "heroPos" | "vilaoPos" | "pote" | "stack" | "passos" | "acaoVilao" | "acoes"
  >,
  c: number,
  efetivo = 40
): SituacaoRiver {
  const { pote, stack } = xc(c, efetivo)
  return {
    ...base,
    heroPos: "BB",
    vilaoPos: "BTN",
    pote,
    stack,
    passos: passos(c),
    acaoVilao: "",
    acoes: PRIMEIRA,
  }
}

function enfrenta(
  base: Omit<
    SituacaoRiver,
    "heroPos" | "vilaoPos" | "pote" | "stack" | "passos" | "acaoVilao" | "acoes"
  >,
  c: number
): SituacaoRiver {
  const { pote, stack } = xc(c)
  const bet = r2((pote * 2) / 3)
  return {
    ...base,
    heroPos: "BB",
    vilaoPos: "BTN",
    pote,
    stack: r2(stack),
    passos: passos(c, bet),
    acaoVilao: `Bet ${fmt(bet)}`,
    acoes: ENFRENTA,
  }
}

// Variações das mãos da aula: em cada board, outras mãos da mesma categoria que o
// instrutor cita (todos os A-x em pote, K-x em B25, bluff com 6-x, 4-x em check-call...).
// Cada linha é [id, mão, resposta, classe, porque, também aceita].
type Linha = [string, [string, string], AcaoRiver, string, string, AcaoRiver[]?]

function lote(
  tipo: string,
  board: string[],
  c: number,
  efetivo: number,
  ilustrativo: boolean,
  linhas: Linha[]
): SituacaoRiver[] {
  return linhas.map(([id, hero, certa, classe, porque, aceita]) =>
    primeira(
      {
        id,
        tipo,
        board,
        hero,
        certa,
        aceita,
        classe,
        porque,
        ilustrativo: ilustrativo || undefined,
      },
      c,
      efetivo
    )
  )
}

const variacoes18: SituacaoRiver[] = [
  // Mão 1 (A-6-K-Q-9): o BTN está capado e o T-J fez sequência.
  ...lote("Sequência", ["Ad", "6c", "Kh", "Qs", "9d"], 1 / 3, 40, false, [
    [
      "v1-a1",
      ["Ac", "3h"],
      "B100",
      "Top pair",
      "todos os A-x vão em pote: o range do BTN está capado e o top pair virou o nuts.",
    ],
    [
      "v1-a2",
      ["Ah", "7s"],
      "B100",
      "Top pair",
      "todos os A-x vão em pote, mesmo com kicker ruim. Não é mão de bloco.",
    ],
    [
      "v1-a3",
      ["As", "4h"],
      "B100",
      "Top pair",
      "o top pair é a mão para pôr o máximo de fichas contra esse range capado.",
    ],
    [
      "v1-k1",
      ["Ks", "3d"],
      "B25",
      "Second pair",
      "o K-x aposta B25 em frequência muito alta e extrai de Q-x e 9-x.",
    ],
    [
      "v1-k2",
      ["Kd", "2c"],
      "B25",
      "Second pair",
      "second pair é valor: aposta baixo e extrai de pares médios e de A-x.",
    ],
    [
      "v1-k3",
      ["Kc", "5s"],
      "B25",
      "Second pair",
      "o K-x aposta B25. O pote só vale para os A-x.",
    ],
    [
      "v1-b1",
      ["6s", "2s"],
      "B100",
      "Bluff com 6-x",
      "sem bluff natural (o T-J fez sequência), o 6-x blefa em pote e ataca 9-x e Q-x.",
    ],
    [
      "v1-b2",
      ["6h", "3h"],
      "B100",
      "Bluff com 6-x",
      "o bluff vem do 6-x, sempre em pote.",
    ],
    [
      "v1-b3",
      ["6d", "4s"],
      "B100",
      "Bluff com 6-x",
      "sem bluff natural, o par baixo vira bluff no size alto.",
    ],
    [
      "v1-f1",
      ["8h", "7h"],
      "B100",
      "Float com backdoor",
      "os floats com backdoor blefam em pote e atacam 9-x e Q-x.",
    ],
    [
      "v1-f2",
      ["8c", "7c"],
      "B100",
      "Float com backdoor",
      "float com backdoor de flush: bluff em pote.",
    ],
    [
      "v1-f3",
      ["8s", "7s"],
      "B100",
      "Float com backdoor",
      "float com backdoor de flush: bluff em pote.",
    ],
    [
      "v1-q1",
      ["Qd", "8d"],
      "CHECKCALL",
      "Third pair",
      "o Q-x passa a ser mais check-call.",
    ],
    [
      "v1-q2",
      ["Qh", "4c"],
      "CHECKCALL",
      "Third pair",
      "o Q-x passa a ser mais check-call.",
    ],
    [
      "v1-q3",
      ["Qc", "7d"],
      "CHECKCALL",
      "Third pair",
      "o Q-x passa a ser mais check-call.",
    ],
  ]),
  // Mão 2 (7-9-K-J-6): quase não há bluff natural, o par vira bluff.
  ...lote("Sequência", ["7d", "9s", "Kh", "Jc", "6c"], 0.25, 40, false, [
    [
      "v2-p3",
      ["2d", "2c"],
      "B100",
      "Par baixo sem bluff natural",
      "bluff de par é sempre no size mais alto.",
    ],
    ["v2-k1", ["Ks", "4s"], "B100", "Top pair", "K-x ou melhor aposta pote."],
    ["v2-k2", ["Kd", "3c"], "B100", "Top pair", "K-x ou melhor aposta pote."],
    ["v2-k3", ["Ks", "2c"], "B100", "Top pair", "K-x ou melhor aposta pote."],
    ["v2-j1", ["Jd", "4d"], "B25", "Second pair", "o J-x aposta B25."],
    ["v2-j2", ["Jh", "3h"], "B25", "Second pair", "o J-x aposta B25."],
    ["v2-j3", ["Js", "2s"], "B25", "Second pair", "o J-x aposta B25."],
  ]),
  // Mão 3 (9-Q-6-3-Q): muitos bluffs disponíveis, o size alto pode passar do pote.
  ...lote("Dobra", ["9d", "Qd", "6h", "3h", "Qh"], 0.4, 40, false, [
    [
      "v3-q1",
      ["Qs", "8c"],
      "B100",
      "Trinca com muitos draws bustados",
      "há muitos bluffs disponíveis, então o valor toma call e o size alto é pote ou mais.",
    ],
    [
      "v3-q2",
      ["Qc", "4s"],
      "B100",
      "Trinca com muitos draws bustados",
      "a dama aposta alto, e aqui o alto é muito alto.",
    ],
    [
      "v3-q3",
      ["Qs", "2c"],
      "B100",
      "Trinca com muitos draws bustados",
      "a dama aposta alto: dá para passar do pote.",
    ],
  ]),
  // Mão 4 (J-Q-4-J-3): na dobra, trinca vai no alto e o resto no baixo.
  ...lote("Dobra", ["Jd", "Qc", "4d", "Jh", "3s"], 0.5, 40, false, [
    [
      "v4-t1",
      ["Jc", "7h"],
      "B100",
      "Trinca",
      "na dobra, o que vira trinca vai no size alto.",
    ],
    [
      "v4-t2",
      ["Js", "5h"],
      "B100",
      "Trinca",
      "na dobra, o que vira trinca vai no size alto.",
    ],
    [
      "v4-t3",
      ["Jc", "2c"],
      "B100",
      "Trinca",
      "na dobra, o que vira trinca vai no size alto.",
    ],
    [
      "v4-q1",
      ["Qs", "7c"],
      "B25",
      "Q-x",
      "o que não é trinca vai no size baixo: o Q-x extrai de 55 a TT e de A high. O B40 também serve.",
      ["B40"],
    ],
    [
      "v4-q2",
      ["Qh", "6d"],
      "B25",
      "Q-x",
      "o Q-x faz bloco: na dobra simples o top pair usa B25, e o B40 também serve.",
      ["B40"],
    ],
    [
      "v4-q3",
      ["Qd", "5h"],
      "B25",
      "Q-x",
      "o Q-x extrai de pares menores e de A high, no size baixo.",
      ["B40"],
    ],
    [
      "v4-b1",
      ["Kd", "Td"],
      "B100",
      "Flush draw bustado",
      "bluff ruim vai em pote: flush draw bustado e K-T.",
    ],
    ["v4-b2", ["Kh", "Ts"], "B100", "K-T", "bluff ruim vai em pote."],
    [
      "v4-b3",
      ["Td", "8d"],
      "B100",
      "Flush draw bustado",
      "bluff ruim vai em pote: T high ou maior ataca poucas mãos.",
    ],
    [
      "v4-l1",
      ["6c", "5c"],
      "B25",
      "Bluff de low cards",
      "o bluff de low cards ataca mais mãos e vai no size baixo.",
    ],
    [
      "v4-l2",
      ["8c", "7c"],
      "B25",
      "Bluff de low cards",
      "9 high ou menor faz foldar muitas mãos: size baixo.",
    ],
    [
      "v4-l3",
      ["7h", "5s"],
      "B25",
      "Bluff de low cards",
      "9 high ou menor faz foldar muitas mãos: size baixo.",
    ],
    [
      "v4-l4",
      ["9s", "8h"],
      "B25",
      "Bluff de 9 high",
      "9 high ou menor vai no size baixo.",
    ],
    [
      "v4-c1",
      ["5s", "4s"],
      "CHECKCALL",
      "4-x",
      "4-x com kicker que não bloqueia bluff paga, de 4-2 a 4-8.",
    ],
    [
      "v4-c2",
      ["4c", "6h"],
      "CHECKCALL",
      "4-x",
      "4-x com kicker que não bloqueia bluff paga, de 4-2 a 4-8.",
    ],
    [
      "v4-c3",
      ["4s", "7s"],
      "CHECKCALL",
      "4-x",
      "4-x com kicker que não bloqueia bluff paga, de 4-2 a 4-8.",
    ],
    ["v4-c4", ["Ah", "4c"], "CHECKCALL", "A-4", "o A-4 paga sempre."],
    ["v4-f1", ["Ac", "9h"], "CHECKFOLD", "A high", "o A-9 off é check-fold."],
    [
      "v4-f2",
      ["Ah", "8c"],
      "CHECKFOLD",
      "A high",
      "A high sem par é check-fold.",
    ],
    [
      "v4-f3",
      ["Tc", "4c"],
      "CHECKFOLD",
      "4-x que bloqueia bluff",
      "o 4-9 e o 4-T são péssimos calls: bloqueiam o que o BTN blefa.",
    ],
    [
      "v4-f4",
      ["4h", "9h"],
      "CHECKFOLD",
      "4-x que bloqueia bluff",
      "o 9 é carta que o BTN blefa: o 4-9 é péssimo call.",
    ],
  ]),
  // Mão 5 (J-6-3-T-Q): a dama é carta que o BTN overblefa.
  ...lote(
    "High card no river",
    ["Jh", "6s", "3s", "Td", "Qc"],
    0.25,
    40,
    false,
    [
      [
        "v5-c1",
        ["8c", "6h"],
        "CHECKCALL",
        "6-x",
        "o 6-x desbloqueia os bluffs do BTN e paga em frequência muito alta.",
      ],
      [
        "v5-c2",
        ["6d", "4c"],
        "CHECKCALL",
        "6-x",
        "o 6-x desbloqueia os bluffs do BTN e paga em frequência muito alta.",
      ],
      [
        "v5-c3",
        ["7c", "6h"],
        "CHECKCALL",
        "6-x",
        "há bluffs naturais antes dele, então o 6-x não aposta e paga.",
      ],
      [
        "v5-d1",
        ["Jc", "6c"],
        "B100",
        "Dois pares",
        "dois pares apostam em pote.",
      ],
      [
        "v5-d2",
        ["Js", "6h"],
        "B100",
        "Dois pares",
        "dois pares apostam em pote.",
      ],
      [
        "v5-d3",
        ["Jd", "3d"],
        "B100",
        "Dois pares",
        "dois pares apostam em pote.",
      ],
      ["v5-j1", ["Jc", "7c"], "B25", "J-x", "o J-x aposta B25."],
      ["v5-j2", ["Jd", "2d"], "B25", "J-x", "o J-x aposta B25."],
      ["v5-j3", ["Js", "4d"], "B25", "J-x", "o J-x aposta B25."],
    ]
  ),
  // Mão 6 (J-6-T-3-5): blank. Os J-x vão all-in com 18bb, e o botão de all-in não existe aqui.
  ...lote("Blank", ["Jh", "6d", "Ts", "3c", "5c"], 1 / 3, 18, false, [
    [
      "v6-t1",
      ["Tc", "8h"],
      "B25",
      "Second pair no blank",
      "todos os T-x apostam B25: é mão boa, não absoluta.",
    ],
    [
      "v6-t2",
      ["Th", "2h"],
      "B25",
      "Second pair no blank",
      "todos os T-x apostam B25: extraem de pares médios e de A-x.",
    ],
    [
      "v6-t3",
      ["Td", "7c"],
      "B25",
      "Second pair no blank",
      "todos os T-x apostam B25.",
    ],
    [
      "v6-b1",
      ["9h", "8h"],
      "B25",
      "9 high",
      "no blank, o bluff de 9 high ou menor vai no B25.",
    ],
    [
      "v6-b2",
      ["9d", "2d"],
      "B25",
      "9 high",
      "no blank, o bluff de 9 high ou menor vai no B25.",
    ],
    [
      "v6-b3",
      ["8s", "2s"],
      "B25",
      "8 high",
      "no blank, o bluff de 9 high ou menor vai no B25.",
    ],
    [
      "v6-q1",
      ["Qh", "9c"],
      "B100",
      "Q high",
      "no blank, o bluff de J high e Q high vai no size alto.",
    ],
    [
      "v6-q2",
      ["Qd", "8h"],
      "B100",
      "Q high",
      "no blank, o bluff de J high e Q high vai no size alto.",
    ],
    [
      "v6-q3",
      ["Qs", "2d"],
      "B100",
      "Q high",
      "no blank, o bluff de J high e Q high vai no size alto.",
    ],
    ["v6-c1", ["6h", "2h"], "CHECKCALL", "6-x", "6-2, 6-4, 6-7 e 6-8 pagam."],
    ["v6-c2", ["6s", "7c"], "CHECKCALL", "6-x", "6-2, 6-4, 6-7 e 6-8 pagam."],
    ["v6-c3", ["6c", "8h"], "CHECKCALL", "6-x", "6-2, 6-4, 6-7 e 6-8 pagam."],
    [
      "v6-a1",
      ["Ac", "6c"],
      "CHECKCALL",
      "A-6",
      "o A-6 é ótimo: não bloqueia nenhum bluff.",
    ],
    [
      "v6-a2",
      ["Ad", "6h"],
      "CHECKCALL",
      "A-6",
      "o A-6 é ótimo: não bloqueia nenhum bluff.",
    ],
    [
      "v6-f1",
      ["9d", "6c"],
      "CHECKFOLD",
      "6-9",
      "o 9 é carta que o BTN blefa: o 6-9 é fold.",
    ],
    [
      "v6-f2",
      ["Qh", "6c"],
      "CHECKFOLD",
      "6-Q",
      "a dama é carta que o BTN blefa: o 6-Q é fold.",
    ],
    [
      "v6-f3",
      ["Kc", "6h"],
      "CHECKFOLD",
      "6-K",
      "o 6-K também é ruim para pagar.",
    ],
  ]),
  // Guideline por runout. Os boards a partir daqui são ilustrativos, só a regra vem da aula.
  ...lote(
    "High card no turn",
    ["Qd", "5c", "2h", "Ks", "8d"],
    1 / 3,
    40,
    true,
    [
      [
        "v7-1",
        ["Kc", "7h"],
        "B100",
        "Top pair",
        "top pairs ou melhor vão no size alto, que com a high card no turn é o pote.",
      ],
      [
        "v7-2",
        ["Qs", "4h"],
        "B25",
        "Second pair",
        "correção final do professor: second pairs sempre usam o menor size da situação (B25).",
      ],
      [
        "v7-3",
        ["Qh", "6c"],
        "B25",
        "Second pair",
        "correção final do professor: second pairs sempre usam o menor size da situação (B25).",
      ],
      [
        "v7-4",
        ["Jc", "3c"],
        "B100",
        "J high",
        "bluff de high cards, menos A high, vai no size alto.",
      ],
      [
        "v7-5",
        ["9s", "7c"],
        "B25",
        "9 high",
        "bluff de 9 high ou menor vai no size baixo.",
      ],
    ]
  ),
  ...lote(
    "High card no river",
    ["Qd", "5c", "2h", "8s", "Kd"],
    1 / 3,
    40,
    true,
    [
      [
        "v8-1",
        ["Kc", "7h"],
        "B70",
        "Top pair",
        "com a high card no river o size alto desce para B70.",
      ],
      [
        "v8-2",
        ["Qs", "4h"],
        "B25",
        "Second pair",
        "correção final do professor: second pairs sempre usam o menor size da situação (B25), qualquer kicker.",
      ],
      [
        "v8-3",
        ["Qh", "6c"],
        "B25",
        "Second pair",
        "correção final do professor: second pairs sempre usam o menor size da situação (B25).",
      ],
      [
        "v8-4",
        ["Jc", "3c"],
        "B70",
        "J high",
        "bluff de J high e Q high vai no size alto, que aqui é B70.",
      ],
      [
        "v8-5",
        ["9s", "7c"],
        "B40",
        "9 high",
        "bluff de 9 high ou menor vai no size baixo, que aqui é B40.",
      ],
    ]
  ),
  ...lote("Sequência", ["Qs", "8d", "7c", "5h", "6s"], 1 / 3, 40, true, [
    [
      "v9-2",
      ["8h", "3h"],
      "B25",
      "Second pair",
      "com sequência de low cards, second pair aposta B25.",
    ],
    [
      "v9-3",
      ["Qd", "8c"],
      "B25",
      "Dois pares",
      "com quatro cartas de low cards para a sequência, os dois pares apostam B25.",
    ],
  ]),
]

// As 25 mãos do estudo guiado do time (solver com correções do professor). Aqui o
// coach só distingue check de bet, então o botão é CHECK e não check-call ou check-fold.
// Os pots da ferramenta usam outro modelo de ante e de flop; o da prática segue o do site.
const ACOES_COACH: AcaoRiver[] = ["CHECK", "B25", "B40", "B70", "B100"]

function coach(
  id: string,
  tipo: string,
  board: string[],
  hero: [string, string],
  certa: AcaoRiver,
  classe: string,
  porque: string,
  rngSplit?: SituacaoRiver["rng"]
): SituacaoRiver {
  return {
    ...primeira(
      { id, tipo, board, hero, certa, classe, porque, rng: rngSplit },
      0.5
    ),
    acoes: ACOES_COACH,
  }
}

const FLUSH_UM_PAR =
  "quatro cartas do mesmo naipe têm prioridade: mão com apenas um par fica em check."
const DOBRA_SIMPLES =
  "dobra simples no board: a força relativa da mão define o size. Segundo par e pares abaixo ficam em check."
const PAR_ABAIXO =
  "par abaixo da faixa de valor preserva showdown: não é air e não vira blefe automaticamente."
const SECOND_PAIR =
  "correção final do professor: second pairs sempre usam o menor size da situação (B25), qualquer kicker e mesmo com draws bustados."

const coach18: SituacaoRiver[] = [
  coach(
    "t01-flush-air",
    "Flush",
    ["Td", "6h", "8d", "Qc", "Kd"],
    ["7h", "5s"],
    "B25",
    "Air sem blocker",
    "river de flush: sem blocker para apostar alto, os outros blefes elegíveis usam o size baixo, B25. Não exigir blocker para o blefe baixo."
  ),
  coach(
    "t02-second-pair",
    "High card no river",
    ["6h", "4d", "Qd", "Ac", "Kh"],
    ["2d", "Kd"],
    "B25",
    "Second pair",
    SECOND_PAIR
  ),
  coach(
    "t03-flush-par",
    "Flush",
    ["6c", "9c", "3c", "Th", "4c"],
    ["4s", "7h"],
    "CHECK",
    "Um par",
    FLUSH_UM_PAR
  ),
  coach(
    "t04-trinca-flush",
    "Flush",
    ["Tc", "Kc", "Ac", "Td", "3c"],
    ["8d", "Th"],
    "B25",
    "Trinca em board dobrado com quatro do mesmo naipe",
    "trinca é o mínimo de valor confirmado nesse board: 50% B25 e 50% check.",
    { ate: 50, acao: "B25", senao: "CHECK" }
  ),
  coach(
    "t05-flush-par",
    "Flush",
    ["Ad", "6d", "9d", "5d", "Ts"],
    ["4s", "6s"],
    "CHECK",
    "Um par",
    FLUSH_UM_PAR
  ),
  coach(
    "t06-dobra",
    "Dobra",
    ["7s", "2d", "8c", "9c", "9s"],
    ["Qs", "2h"],
    "CHECK",
    "Dois pares com a dobra do board",
    DOBRA_SIMPLES
  ),
  coach(
    "t07-blank-par",
    "Blank",
    ["Td", "3d", "Th", "8c", "5h"],
    ["2s", "2d"],
    "CHECK",
    "Par abaixo da faixa de valor",
    PAR_ABAIXO
  ),
  coach(
    "t08-dobra",
    "Dobra",
    ["3c", "Ks", "Qs", "3s", "Ah"],
    ["7d", "Qc"],
    "CHECK",
    "Segundo par na dobra",
    DOBRA_SIMPLES
  ),
  // O estudo justifica o check pelo corte de kicker J, que parecia equívoco (deixaria só o
  // Q-J). O áudio do coach (12/11/2026) dá outro motivo: o ás no river é carta muito ruim
  // e a estratégia vai para bet muito alto ou check. Por isso a explicação aqui é a do áudio.
  coach(
    "t09-third-pair",
    "High card no river",
    ["Kd", "Qc", "7h", "5h", "As"],
    ["Td", "Qs"],
    "CHECK",
    "Third pair em board com ás no river",
    "o ás no river é uma carta muito ruim para o BB: a estratégia tende a ir para um bet muito alto ou check. O third pair com T fica em check."
  ),
  coach(
    "t10-trinca",
    "Dobra",
    ["9s", "6d", "4c", "4s", "7d"],
    ["Ts", "4h"],
    "B100",
    "Trinca",
    "trinca ou melhor usa B100, com a reserva de check-raise das mãos selecionadas."
  ),
  coach(
    "t11-high-card",
    "High card no river",
    ["2h", "4c", "2d", "5d", "Tc"],
    ["6h", "Kh"],
    "B70",
    "Bluff sem par",
    "o bluff sem par com high card alta vai no size alto, que aqui é B70."
  ),
  coach(
    "t12-dobra",
    "Dobra",
    ["Ks", "8d", "5d", "Qc", "Qh"],
    ["5h", "8s"],
    "CHECK",
    "Dois pares abaixo da dobra do board",
    DOBRA_SIMPLES
  ),
  coach(
    "t13-trinca",
    "Dobra",
    ["9c", "Ks", "Ad", "9h", "7c"],
    ["9d", "2d"],
    "B100",
    "Trinca",
    "trinca ou melhor usa B100, com a reserva de check-raise das mãos selecionadas."
  ),
  coach(
    "t14-second-pair",
    "Blank",
    ["6s", "2h", "Ah", "4s", "7c"],
    ["Js", "7h"],
    "B25",
    "Second pair",
    SECOND_PAIR
  ),
  coach(
    "t15-sequencia",
    "Sequência",
    ["5d", "Ts", "4h", "2h", "6s"],
    ["2d", "3d"],
    "B100",
    "Sequência com quatro cartas abertas, sem flush",
    "sequência para cima ou mão superior: 50% B100 e 50% B40. Sem check neste split.",
    { ate: 50, acao: "B100", senao: "B40" }
  ),
  coach(
    "t16-dobra-tp",
    "Dobra",
    ["5h", "Jh", "3c", "Th", "5d"],
    ["8h", "Jc"],
    "B25",
    "Top pair na dobra",
    "dobra simples no board: top pair ou overpair usa B25."
  ),
  coach(
    "t17-flush-dois-pares",
    "Flush",
    ["2d", "As", "Ad", "5d", "6d"],
    ["Kh", "2s"],
    "CHECK",
    "Dois pares em board dobrado com quatro do mesmo naipe",
    "dois pares e as demais mãos fora do range de aposta ficam em check."
  ),
  coach(
    "t18-flush-par",
    "Flush",
    ["3d", "7h", "6s", "Js", "Ts"],
    ["Kc", "3s"],
    "CHECK",
    "Par abaixo da faixa de valor",
    PAR_ABAIXO
  ),
  coach(
    "t19-dobra",
    "Dobra",
    ["8c", "5s", "4c", "8s", "2c"],
    ["4h", "Ah"],
    "CHECK",
    "Dois pares abaixo da dobra do board",
    DOBRA_SIMPLES
  ),
  coach(
    "t20-flush-par",
    "Flush",
    ["As", "Ts", "7s", "3c", "Qd"],
    ["5s", "3d"],
    "CHECK",
    "Par abaixo da faixa de valor",
    PAR_ABAIXO
  ),
  coach(
    "t21-flush-par",
    "Flush",
    ["Qd", "6s", "Ah", "8h", "Th"],
    ["6h", "4s"],
    "CHECK",
    "Par abaixo da faixa de valor",
    PAR_ABAIXO
  ),
  coach(
    "t22-sequencia-flush",
    "Sequência",
    ["Tc", "9s", "7d", "Js", "Qs"],
    ["Kd", "8d"],
    "B40",
    "Sequência feita com flush possível",
    "quatro cartas para sequência no river com flush possível: a mão feita aposta por valor em B40."
  ),
  coach(
    "t23-a-high",
    "Dobra",
    ["Kd", "2s", "5c", "Ks", "3c"],
    ["8d", "Ah"],
    "CHECK",
    "A high em board dobrado",
    "A high, K high com A no board e Q high com A e K no board só blefam na exceção: flush e sequência juntos, ou quatro cartas para a sequência. Fora disso, check."
  ),
  coach(
    "t24-dois-pares",
    "Blank",
    ["7c", "3c", "Ks", "9d", "2d"],
    ["2s", "7s"],
    "B100",
    "Dois pares reais",
    "correção final do professor: top pairs ou melhor pertencem ao valor de size alto, e dois pares reais usam B100."
  ),
  coach(
    "t25-flush-top-pair",
    "Flush",
    ["5c", "Ad", "4h", "2d", "Qd"],
    ["6d", "As"],
    "CHECK",
    "Top pair com quatro para a sequência e flush possível",
    "quatro cartas para a sequência no river com flush possível: fora dos grupos de aposta deste spot."
  ),
  // Boards mais difíceis (dobra, flush e second pair em boards novos). Só entram mãos
  // cuja categoria já foi corrigida pelo professor nos estudos acima: mesma regra, outro board.
  coach(
    "n1-trinca",
    "Dobra",
    ["Js", "8d", "3h", "3s", "6c"],
    ["3d", "Ah"],
    "B100",
    "Trinca",
    "trinca ou melhor usa B100, com a reserva de check-raise das mãos selecionadas."
  ),
  coach(
    "n2-trinca",
    "Dobra",
    ["Qh", "7s", "7c", "2d", "9h"],
    ["7d", "Kc"],
    "B100",
    "Trinca",
    "trinca ou melhor usa B100, com a reserva de check-raise das mãos selecionadas."
  ),
  coach(
    "n3-trinca",
    "Dobra",
    ["Ac", "5h", "5d", "Td", "8s"],
    ["5s", "Kd"],
    "B100",
    "Trinca",
    "trinca ou melhor usa B100, com a reserva de check-raise das mãos selecionadas."
  ),
  coach(
    "n4-full",
    "Dobra",
    ["Ks", "8d", "8c", "Kh", "4s"],
    ["8h", "2c"],
    "B100",
    "Full house",
    "trinca ou melhor usa B100, com a reserva de check-raise das mãos selecionadas."
  ),
  coach(
    "n5-tp-dobra",
    "Dobra",
    ["Qs", "9h", "4c", "4d", "2h"],
    ["Qc", "8d"],
    "B25",
    "Top pair na dobra",
    "dobra simples no board: top pair ou overpair usa B25."
  ),
  coach(
    "n6-second-pair",
    "Blank",
    ["Kc", "9d", "4s", "Th", "2c"],
    ["Tc", "6d"],
    "B25",
    "Second pair",
    SECOND_PAIR
  ),
  coach(
    "n7-second-pair",
    "Blank",
    ["Jc", "7d", "4h", "2s", "9c"],
    ["9d", "Ah"],
    "B25",
    "Second pair",
    SECOND_PAIR
  ),
  coach(
    "n8-dois-pares",
    "Blank",
    ["Kd", "8c", "5h", "2s", "9d"],
    ["8d", "5s"],
    "B100",
    "Dois pares reais",
    "correção final do professor: top pairs ou melhor pertencem ao valor de size alto, e dois pares reais usam B100."
  ),
  coach(
    "n10-flush-par",
    "Flush",
    ["Kh", "9h", "4c", "2h", "6h"],
    ["4d", "7s"],
    "CHECK",
    "Um par",
    FLUSH_UM_PAR
  ),
  coach(
    "n11-flush-par",
    "Flush",
    ["8s", "Qs", "3d", "5s", "9s"],
    ["3h", "Kd"],
    "CHECK",
    "Par abaixo da faixa de valor",
    PAR_ABAIXO
  ),
]

export const situacoes18: SituacaoRiver[] = [
  // As seis mãos da aula.
  primeira(
    {
      id: "x1-a5",
      tipo: "Sequência",
      board: ["Ad", "6c", "Kh", "Qs", "9d"],
      hero: ["As", "5c"],
      certa: "B100",
      classe: "Top pair com kicker ruim",
      porque:
        "o range do BTN está capado, então o top pair vira o nuts e vai no size alto, mesmo com kicker ruim. Não é mão de bloco.",
    },
    1 / 3
  ),
  primeira(
    {
      id: "x2-55",
      tipo: "Sequência",
      board: ["7d", "9s", "Kh", "Jc", "6c"],
      hero: ["5s", "5h"],
      certa: "B100",
      classe: "Par baixo sem bluff natural",
      porque:
        "os draws do flop fizeram sequência e quase não há bluff natural. O 55 vira o bluff, no size alto, e ataca 6-x, 7-x e 9-x.",
    },
    0.25
  ),
  primeira(
    {
      id: "x3-q7",
      tipo: "Dobra",
      board: ["9d", "Qd", "6h", "3h", "Qh"],
      hero: ["Qc", "7s"],
      certa: "B100",
      classe: "Trinca com muitos draws bustados",
      porque:
        "há muitos bluffs disponíveis, então o valor toma mais call. O size alto é o pote e pode passar dele.",
    },
    0.4
  ),
  primeira(
    {
      id: "x4-q8",
      tipo: "Dobra",
      board: ["Jd", "Qc", "4d", "Jh", "3s"],
      hero: ["Qd", "8h"],
      certa: "B25",
      aceita: ["B40"],
      classe: "Top pair do flop na dobra",
      porque:
        "o Q-8 extrai de 55 a TT e de A high, então aposta baixo. Os J-x vão no pote. Na dobra simples o top pair usa o size baixo, B25. O B40 também serve, como na aula.",
    },
    0.5
  ),
  primeira(
    {
      id: "x5-96",
      tipo: "High card no river",
      board: ["Jh", "6s", "3s", "Td", "Qc"],
      hero: ["9c", "6h"],
      certa: "CHECKCALL",
      classe: "Second pair do flop",
      porque:
        "há bluffs naturais antes dele e a dama no river é uma carta que o BTN overblefa: o 6-x paga em frequência muito alta.",
    },
    0.25
  ),
  primeira(
    {
      id: "x6-t4",
      tipo: "Blank",
      board: ["Jh", "6d", "Ts", "3c", "5c"],
      hero: ["Td", "4d"],
      certa: "B25",
      classe: "Second pair no blank",
      porque:
        "o T-x extrai de pares médios e de A-x e aposta baixo, porque é mão boa e não absoluta. Com J-x, all-in (BTN com 18bb).",
    },
    1 / 3,
    18
  ),
  // Exercício 7: qual 6-x paga contra o bet de 2/3 do BTN.
  ...(
    [
      ["x7-64", ["6h", "4s"], "CALL", "Third pair com kicker baixo"],
      ["x7-69", ["6s", "9c"], "FOLD", "Third pair com kicker que ele blefa"],
      ["x7-6q", ["6h", "Qd"], "FOLD", "Third pair com kicker que ele blefa"],
      ["x7-a6", ["As", "6h"], "CALL", "Third pair com kicker ás"],
    ] as [string, [string, string], AcaoRiver, string][]
  ).map(([id, hero, certa, classe]) =>
    enfrenta(
      {
        id,
        tipo: "Enfrenta o bet: blank",
        board: ["Jh", "6d", "Ts", "3c", "5c"],
        hero,
        certa,
        classe,
        porque:
          certa === "CALL"
            ? "contra o range capado o call vem de mãos que desbloqueiam os bluffs do BTN. Par com kicker baixo ou com ás paga."
            : "a dama e o 9 são cartas que o BTN blefa: o par com esse kicker bloqueia os bluffs que você quer que ele tenha.",
      },
      1 / 3
    )
  ),
  // Exercício 8: qual 4-x paga na dobra.
  ...(
    [
      ["x8-42", ["4s", "2h"], "CALL", "Third pair com kicker baixo"],
      ["x8-48", ["4h", "8s"], "CALL", "Third pair com kicker baixo"],
      ["x8-a4", ["As", "4h"], "CALL", "Third pair com kicker ás"],
      ["x8-49", ["4s", "9h"], "FOLD", "Third pair com kicker que ele blefa"],
      ["x8-4t", ["4h", "Ts"], "FOLD", "Third pair com kicker que ele blefa"],
      ["x8-a9", ["As", "9h"], "FOLD", "A high sem par"],
    ] as [string, [string, string], AcaoRiver, string][]
  ).map(([id, hero, certa, classe]) =>
    enfrenta(
      {
        id,
        tipo: "Enfrenta o bet: dobra",
        board: ["Jd", "Qc", "4d", "Jh", "3s"],
        hero,
        certa,
        classe,
        porque:
          id === "x8-a9"
            ? "o A-9 off não tem par e não paga: é check-fold."
            : certa === "CALL"
              ? "qualquer par é candidato ao call, principalmente com kicker que não bloqueia os bluffs do BTN."
              : "o 9 e o T são cartas que o BTN blefa: o par com esse kicker é péssimo para pagar.",
      },
      0.5
    )
  ),
  // Exercícios 9 e 10: o size muda com a ordem da high card e com a sequência.
  primeira(
    {
      id: "x9-turn",
      tipo: "High card no turn",
      board: ["Qd", "5c", "2h", "Ks", "8d"],
      hero: ["Qc", "9h"],
      certa: "B25",
      classe: "Second pair com high card no turn",
      porque:
        "correção final do professor: second pairs sempre usam o menor size da situação (B25), qualquer kicker e mesmo com draws bustados.",
      ilustrativo: true,
    },
    1 / 3
  ),
  primeira(
    {
      id: "x9-river",
      tipo: "High card no river",
      board: ["Qd", "5c", "2h", "8s", "Kd"],
      hero: ["Qc", "9h"],
      certa: "B25",
      classe: "Second pair com high card no river",
      porque:
        "correção final do professor: second pairs sempre usam o menor size da situação (B25), qualquer kicker e mesmo com draws bustados.",
      ilustrativo: true,
    },
    1 / 3
  ),
  primeira(
    {
      id: "x10-baixa",
      tipo: "Sequência",
      board: ["Qc", "8d", "7s", "5h", "6c"],
      hero: ["Qd", "8h"],
      certa: "B25",
      classe: "Dois pares com sequência de low cards",
      porque:
        "o BTN tem poucas sequências quando ela vem de low cards: os dois pares apostam B25.",
      ilustrativo: true,
    },
    1 / 3
  ),
  primeira(
    {
      id: "x10-broadway",
      tipo: "Sequência",
      board: ["Qd", "9c", "2s", "Th", "Jc"],
      hero: ["Qs", "9h"],
      certa: "CHECKCALL",
      classe: "Dois pares com sequência de Broadway",
      porque:
        "o BTN tem muito K-x em todas as posições. Os dois pares ganham mais no check-call, porque desbloqueiam o que ele blefa.",
      ilustrativo: true,
    },
    1 / 3
  ),
  ...variacoes18,
  ...coach18,
]
