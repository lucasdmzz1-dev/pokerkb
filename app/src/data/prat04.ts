import {
  POTE_FLOP,
  fmt,
  r2,
  type AcaoRiver,
  type Passo,
  type SituacaoRiver,
} from "@/data/pratRiver"

// Módulo 04 (Third Barrel e vs Third Barrel): o HJ abre e o BB paga, com 40bb. O
// agressor aposta B33 no flop e B70 no turn (padrão da aula); o river tem pote de 18bb.
// As mãos vêm das regras e da aula prática (`theory/04-Third-Barrel-e-vs-Third-Barrel`):
// a transcrição não traz os boards, então os naipes são ilustrativos. A mão da aula com
// A-T-2-J (K-J, Q-J, A-8, A-7, A-4 e 5-5) está nos seis primeiros.

const FLOP = r2(POTE_FLOP / 3) // 1,5: aposta de 1/3 do pote
const POTE_TURN = r2(POTE_FLOP + 2 * FLOP) // 7,5
const TURN = r2(POTE_TURN * 0.7) // 5,25: B70
const POTE_RIVER = r2(POTE_TURN + 2 * TURN) // 18

const BASE: Passo[] = [
  { nome: "HJ", acao: "Raise 2" },
  { nome: "BTN a SB", acao: "Fold" },
  { nome: "BB", acao: "Call" },
]

type Linha = "flop" | "turn" | "river" | "river-check"

// O que já aconteceu até a decisão. O agressor sempre aposta, o BB sempre paga.
function historia(linha: Linha): Passo[] {
  const p: Passo[] = [...BASE, { rua: "Flop" }]
  if (linha === "flop") return p
  p.push(
    { nome: "BB", acao: "Check" },
    { nome: "HJ", acao: `Bet ${fmt(FLOP)}` },
    { nome: "BB", acao: "Call" },
    { rua: "Turn" }
  )
  if (linha === "turn") {
    p.push({ nome: "BB", acao: "Check" })
    return p
  }
  if (linha === "river-check") {
    p.push(
      { nome: "BB", acao: "Check" },
      { nome: "HJ", acao: "Check" },
      { rua: "River" },
      { nome: "BB", acao: "Check" }
    )
    return p
  }
  p.push(
    { nome: "BB", acao: "Check" },
    { nome: "HJ", acao: `Bet ${fmt(TURN)}` },
    { nome: "BB", acao: "Call" },
    { rua: "River" },
    { nome: "BB", acao: "Check" }
  )
  return p
}

type Base = Pick<
  SituacaoRiver,
  | "id"
  | "tipo"
  | "board"
  | "hero"
  | "certa"
  | "aceita"
  | "classe"
  | "porque"
  | "ilustrativo"
>

const POTE_STACK: Record<Linha, [number, number]> = {
  flop: [POTE_FLOP, 38],
  turn: [POTE_TURN, r2(38 - FLOP)],
  "river-check": [POTE_TURN, r2(38 - FLOP)],
  river: [POTE_RIVER, r2(38 - FLOP - TURN)],
}

// Herói no HJ, agressor: decide o turn (check ou bet) ou o river (o BB deu check).
function ataque(b: Base, linha: Linha): SituacaoRiver {
  const [pote, stack] = POTE_STACK[linha]
  const turn = linha === "turn"
  return {
    ...b,
    heroPos: "HJ",
    vilaoPos: "BB",
    pote,
    stack,
    passos: historia(linha),
    acaoVilao: "",
    acoes: turn ? ["CHECK", "BET"] : ["CHECK", "B40", "B50", "B70", "B100"],
    ilustrativo: true,
  }
}

// Herói no BB: enfrenta o bet do HJ no flop, no turn ou no river (`aposta` em % do pote).
function defesa(
  b: Base,
  linha: "flop" | "turn" | "river",
  aposta: number
): SituacaoRiver {
  const [pote, stack] = POTE_STACK[linha]
  const valor = r2(pote * aposta)
  const passos: Passo[] =
    linha === "river"
      ? [
          ...BASE,
          { rua: "Flop" },
          { nome: "BB", acao: "Check" },
          { nome: "HJ", acao: `Bet ${fmt(FLOP)}` },
          { nome: "BB", acao: "Call" },
          { rua: "Turn" },
          { nome: "BB", acao: "Check" },
          { nome: "HJ", acao: `Bet ${fmt(TURN)}` },
          { nome: "BB", acao: "Call" },
          { rua: "River" },
          { nome: "BB", acao: "Check" },
        ]
      : linha === "turn"
        ? [
            ...BASE,
            { rua: "Flop" },
            { nome: "BB", acao: "Check" },
            { nome: "HJ", acao: `Bet ${fmt(FLOP)}` },
            { nome: "BB", acao: "Call" },
            { rua: "Turn" },
            { nome: "BB", acao: "Check" },
          ]
        : [...BASE, { rua: "Flop" }, { nome: "BB", acao: "Check" }]
  return {
    ...b,
    heroPos: "BB",
    vilaoPos: "HJ",
    pote,
    stack,
    passos,
    acaoVilao: `Bet ${fmt(valor)}`,
    acoes: ["CALL", "FOLD"],
    ilustrativo: true,
  }
}

const TURN_AULA = ["Ad", "Tc", "2s", "Jh"]

export const situacoes04: SituacaoRiver[] = [
  // Ataque: construção do range de bet no turn.
  ataque(
    {
      id: "a-turn-kj",
      tipo: "Ataque: turn",
      board: TURN_AULA,
      hero: ["Kh", "Jc"],
      certa: "BET",
      classe: "Second pair com top kicker",
      porque:
        "o range de bet precisa de uma mão de força absoluta no second pair: o K-J aposta sempre e pune os J-x, T-x e Q-x que pagam.",
    },
    "turn"
  ),
  ataque(
    {
      id: "a-turn-qj",
      tipo: "Ataque: turn",
      board: TURN_AULA,
      hero: ["Qs", "Jd"],
      certa: "CHECK",
      classe: "Second pair sem o top kicker",
      porque:
        "o Q-J já ganha vezes o suficiente e aposta só o K-J como second pair. O check não perde nada: o BB também dá check com mãos melhores.",
    },
    "turn"
  ),
  ataque(
    {
      id: "a-turn-a8",
      tipo: "Ataque: turn",
      board: TURN_AULA,
      hero: ["As", "8d"],
      certa: "BET",
      classe: "Pior top pair que aposta",
      porque:
        "na linha do 8, o A-8 ou melhor aposta. É o pior top pair do range de bet, e se tomar check-raise o fold é tranquilo.",
    },
    "turn"
  ),
  ataque(
    {
      id: "a-turn-a7",
      tipo: "Ataque: turn",
      board: TURN_AULA,
      hero: ["Ac", "7d"],
      certa: "CHECK",
      classe: "Top pair abaixo da linha do 8",
      porque:
        "os top pairs mais fracos dão check e podem virar value bet no river, se ele chegar capado.",
    },
    "turn"
  ),
  ataque(
    {
      id: "a-turn-55",
      tipo: "Ataque: turn",
      board: TURN_AULA,
      hero: ["5s", "5h"],
      certa: "BET",
      classe: "Par baixo: bluff polar",
      porque:
        "o 55 aposta o turn porque faz foldar todos os T-x. Esse bluff só continua no river quando um draw completa.",
    },
    "turn"
  ),
  // Ataque: river, com o A-T-2-J da aula.
  ataque(
    {
      id: "a-river-a4",
      tipo: "Ataque: river blank",
      board: [...TURN_AULA, "3h"],
      hero: ["Ac", "4d"],
      certa: "B70",
      aceita: ["B50"],
      classe: "Top pair que deu check no turn",
      porque:
        "o BB deu check de novo e o seu A virou uma das melhores mãos. Valor com size alto: no mínimo B50, e o B70 é o padrão.",
    },
    "river-check"
  ),
  ataque(
    {
      id: "a-river-55-blank",
      tipo: "Ataque: river blank",
      board: [...TURN_AULA, "3h"],
      hero: ["5s", "5h"],
      certa: "CHECK",
      classe: "Bluff polar sem blockers",
      porque:
        "o 55 não bloqueia nada do valor do BB. Sem o draw completar, a mão não representa nada e abandona o bluff.",
    },
    "river"
  ),
  ataque(
    {
      id: "a-river-55-completa",
      tipo: "Ataque: draw completa",
      board: [...TURN_AULA, "Qd"],
      hero: ["5s", "5h"],
      certa: "B100",
      aceita: ["B70"],
      classe: "Bluff polar com o draw completo",
      porque:
        "a dama completa a Broadway e o 55 volta a representar valor. Bluff com size alto, porque o objetivo é gerar fold equity.",
    },
    "river"
  ),
  ataque(
    {
      id: "a-river-66-flush",
      tipo: "Ataque: draw completa",
      board: ["Ks", "9s", "4d", "2c", "7s"],
      hero: ["6h", "6d"],
      certa: "B100",
      aceita: ["B70"],
      classe: "Bluff polar com o flush completo",
      porque:
        "o par baixo atacou o turn como parte polar e só volta a blefar quando o flush completa. Size alto.",
    },
    "river"
  ),
  ataque(
    {
      id: "a-river-66-blank",
      tipo: "Ataque: river blank",
      board: ["Ks", "9d", "4c", "2h", "3d"],
      hero: ["6h", "6d"],
      certa: "CHECK",
      classe: "Par baixo no river blank",
      porque:
        "no river blank só quem tem blockers reais continua blefando. O par baixo sem blockers abandona.",
    },
    "river"
  ),
  ataque(
    {
      id: "a-river-tj-natural",
      tipo: "Ataque: bluff natural",
      board: ["9c", "8d", "2s", "Kh", "3d"],
      hero: ["Th", "Js"],
      certa: "B100",
      aceita: ["B70"],
      classe: "Bluff natural: T-J com a broca perdida",
      porque:
        "o T-J tem blockers reais e pertence ao range de continuação, então continua blefando até no river blank. Size alto.",
    },
    "river"
  ),
  // Ataque: size de valor pelo que a mão bloqueia.
  ataque(
    {
      id: "a-value-k9",
      tipo: "Ataque: value bet",
      board: ["Kd", "9c", "4s", "2h", "7c"],
      hero: ["Ks", "9h"],
      certa: "B100",
      classe: "Dois pares que não bloqueiam nada",
      porque:
        "o K-9 não bloqueia dois pares do BB, que nunca foldam. Value com o size máximo para extrair tudo.",
    },
    "river"
  ),
  ataque(
    {
      id: "a-value-ak",
      tipo: "Ataque: value bet",
      board: ["Ac", "Kh", "8s", "4d", "3c"],
      hero: ["As", "Kd"],
      certa: "B40",
      aceita: ["B50"],
      classe: "Dois pares que bloqueiam dois pares",
      porque:
        "o A-K bloqueia os dois pares que o BB pode ter, e a frequência deles cai. Dá para apostar meio pote.",
    },
    "river"
  ),
  // Ataque: monotone.
  ataque(
    {
      id: "a-mono-turn",
      tipo: "Ataque: monotone",
      board: ["Kh", "8h", "3h", "5d"],
      hero: ["Td", "9d"],
      certa: "BET",
      classe: "Bluff off-suit com backdoors",
      porque:
        "o range de bluff do turn não pode ser só de copas: o T-9 de ouros faz foldar Q-8, K-5 e 3-x e guarda bluff para o flush completar.",
    },
    "turn"
  ),
  ataque(
    {
      id: "a-mono-river",
      tipo: "Ataque: draw completa",
      board: ["Kh", "8h", "3h", "5d", "2h"],
      hero: ["Td", "9d"],
      certa: "B100",
      aceita: ["B70"],
      classe: "Bluff polar com o flush completo",
      porque:
        "a quarta copa completa o draw que o T-9 representava: bluff com size alto.",
    },
    "river"
  ),
  // Defesa: street por street.
  defesa(
    {
      id: "d-flop-par",
      tipo: "Defesa: flop",
      board: ["Kd", "Ts", "5c"],
      hero: ["5h", "4s"],
      certa: "CALL",
      classe: "Bottom pair",
      porque:
        "contra o c-bet de 33% do pote o BB continua com todos os pares, até o third pair.",
    },
    "flop",
    1 / 3
  ),
  defesa(
    {
      id: "d-turn-blank-t8",
      tipo: "Defesa: turn blank",
      board: ["Kd", "Ts", "5c", "6h"],
      hero: ["Th", "8c"],
      certa: "CALL",
      classe: "Second pair no turn blank",
      porque:
        "no turn blank o BB não foldia second pair ou melhor, mesmo contra size maior.",
    },
    "turn",
    0.7
  ),
  defesa(
    {
      id: "d-turn-din-t8",
      tipo: "Defesa: turn dinâmico",
      board: ["Kd", "Ts", "5c", "9h"],
      hero: ["Th", "8c"],
      certa: "FOLD",
      classe: "Second pair sem redraw",
      porque:
        "o 9 conecta o board e muda o nuts: o BTN ganha equity e só continua o top pair ou o par com redraw. O T-8 folda.",
    },
    "turn",
    0.7
  ),
  defesa(
    {
      id: "d-turn-din-t6",
      tipo: "Defesa: turn dinâmico",
      board: ["Kd", "Ts", "5c", "9h"],
      hero: ["Tc", "6d"],
      certa: "FOLD",
      classe: "Second pair sem redraw",
      porque:
        "no turn dinâmico o second pair sem interação com o board folda, e o T-6 não tem nenhum redraw.",
    },
    "turn",
    0.7
  ),
  defesa(
    {
      id: "d-turn-din-5j",
      tipo: "Defesa: turn dinâmico",
      board: ["Kd", "Ts", "5c", "9h"],
      hero: ["5s", "Jd"],
      certa: "CALL",
      classe: "Third pair com redraw",
      porque:
        "o 5-J tem par e a broca para a sequência: no turn dinâmico, par com redraw continua.",
    },
    "turn",
    0.7
  ),
  defesa(
    {
      id: "d-turn-din-j9",
      tipo: "Defesa: turn dinâmico",
      board: ["Kd", "Ts", "5c", "9h"],
      hero: ["Js", "9c"],
      certa: "CALL",
      classe: "Par com redraw",
      porque:
        "o J-9 tem par do board e interage com a sequência, então continua mesmo no turn dinâmico.",
    },
    "turn",
    0.7
  ),
  defesa(
    {
      id: "d-turn-din-tj",
      tipo: "Defesa: turn dinâmico",
      board: ["Kd", "Ts", "5c", "9h"],
      hero: ["Td", "Js"],
      certa: "CALL",
      classe: "Second pair com redraw",
      porque:
        "o T-J nunca folda aqui: é par com a broca da sequência, e esse é o redraw que o turn dinâmico exige.",
    },
    "turn",
    0.7
  ),
  defesa(
    {
      id: "d-turn-din-5q",
      tipo: "Defesa: turn dinâmico",
      board: ["Kd", "Ts", "5c", "9h"],
      hero: ["5s", "Qd"],
      certa: "CALL",
      classe: "Third pair com redraw",
      porque:
        "o 5-Q tem par e a broca para a sequência: par com redraw continua no turn dinâmico.",
    },
    "turn",
    0.7
  ),
  // Defesa: river.
  defesa(
    {
      id: "d-river-b70-fraco",
      tipo: "Defesa: river B70",
      board: ["Qs", "8s", "3c", "2h", "5d"],
      hero: ["Qd", "9d"],
      certa: "CALL",
      classe: "Top pair fraco",
      porque: "contra B70 o BB defende todos os top pairs, até o mais fraco.",
    },
    "river",
    0.7
  ),
  defesa(
    {
      id: "d-river-b70-a",
      tipo: "Defesa: river B70",
      board: ["Qs", "8s", "3c", "2h", "5d"],
      hero: ["As", "Qd"],
      certa: "CALL",
      classe: "Top pair com A♠",
      porque:
        "contra B70 todos os top pairs pagam, mesmo o que bloqueia os blefes de espadas. O preço ainda é bom.",
    },
    "river",
    0.7
  ),
  defesa(
    {
      id: "d-river-pote-sem",
      tipo: "Defesa: river pote",
      board: ["Qs", "8s", "3c", "2h", "5d"],
      hero: ["Qh", "Jh"],
      certa: "CALL",
      classe: "Top pair sem ♠",
      porque:
        "contra pote o BB defende os top pairs que não bloqueiam os blefes naturais dele, e aqui os blefes são os flush draws de espadas.",
    },
    "river",
    1
  ),
  defesa(
    {
      id: "d-river-pote-a",
      tipo: "Defesa: river pote",
      board: ["Qs", "8s", "3c", "2h", "5d"],
      hero: ["As", "Qd"],
      certa: "FOLD",
      classe: "Top pair com A♠",
      porque:
        "contra pote o A♠ bloqueia os flush draws que o BTN blefa. É o top pair que sai do range de call.",
    },
    "river",
    1
  ),
]

export type { AcaoRiver }
