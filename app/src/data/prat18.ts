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
      certa: "B40",
      aceita: ["B25"],
      classe: "Top pair do flop na dobra",
      porque:
        "o Q-8 extrai de 55 a TT e de A high, então aposta baixo. Os J-x vão no pote. O B40 serve muito bem e o B25 não tem problema.",
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
      certa: "B100",
      classe: "Second pair com high card no turn",
      porque:
        "a high card no turn deixa o BTN ainda mais capado: o Q-x é forte o bastante para o pote.",
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
      certa: "B70",
      classe: "Second pair com high card no river",
      porque:
        "com a high card no river o BTN tem mais mãos que acertaram, então o size alto desce para B70.",
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
]
