// Prática do módulo 08 (3Bet Pot), só o flop, do BB que deu 3-bet contra o open do BTN.
// As regras vêm da aula "3bet pot do BB" e do guideline do módulo: o board decide o size
// e a estratégia, e a mão decide a ação (bet, check-call, check-raise ou check-fold).
// Mão que a aula não resolve de forma clara devolve null e não entra no treino.

import { classeDaMao } from "@/data/ranges"
import { bb3bet, classesDo3bet, type Stack3bet } from "@/data/ranges3bet"
import { descreverNaipes, ler } from "@/data/prat05"
import { forcaDoTopPair, temBDSD } from "@/data/prat15"

export type Arvore = "short" | "deep"
export type AcaoTb =
  "Check-call" | "Check-raise" | "Check-fold" | "B25" | "B40" | "B70" | "All-in"

// range: B25 com o range inteiro. shortB40 e shortAllin: splits do short stack.
// deepB40 e deepB70: splits do deep stack.
export type Est = "range" | "shortB40" | "shortAllin" | "deepB40" | "deepB70"

// Spot da aula: o BTN abre 2bb, o BB dá 3-bet e o BTN paga. O stack e o size do 3-bet
// são os do Poker Academy (25bb com 3x e 60bb com 4x).
export const SPOT: Record<
  Arvore,
  {
    nome: string
    stack: Stack3bet
    efetivo: number
    raise: number
    pote: number
    atras: number
  }
> = {
  short: {
    nome: "BB short stack",
    stack: 25,
    efetivo: 25,
    raise: 6,
    pote: 12.5,
    atras: 19,
  },
  deep: {
    nome: "BB deep stack",
    stack: 60,
    efetivo: 60,
    raise: 8,
    pote: 16.5,
    atras: 52,
  },
}

export const NOME_EST: Record<Est, string> = {
  range: "Seco, monotone e dobrado",
  shortB40: "Carregado",
  shortAllin: "Com sequência",
  deepB40: "Com sequência ou mais interação",
  deepB70: "Tx e Jx com flush draw",
}

export const ARVORE_DA: Record<Est, Arvore> = {
  range: "short",
  shortB40: "short",
  shortAllin: "short",
  deepB40: "deep",
  deepB70: "deep",
}

interface BoardTb {
  id: string
  nome: string
  arvore: Arvore
  est: Est
  // Um board por variante de naipes (a aula usa dois naipes ou rainbow).
  boards: string[][]
}

// Boards da aula e os que seguem a mesma regra. Seco, monotone e dobrado valem para o
// short e para o deep (range bet em B25).
const SECOS: { id: string; nome: string; boards: string[][] }[] = [
  { id: "a82", nome: "A-8-2", boards: [["Ad", "8s", "2c"]] },
  { id: "k72", nome: "K-7-2", boards: [["Ks", "7d", "2c"]] },
  { id: "j52", nome: "J-5-2", boards: [["Js", "5d", "2c"]] },
  { id: "j64", nome: "J-6-4", boards: [["Js", "6s", "4h"]] },
  { id: "q73", nome: "Q-7-3", boards: [["Qc", "7h", "3d"]] },
  { id: "a94", nome: "A-9-4", boards: [["As", "9d", "4c"]] },
  { id: "k82", nome: "K-8-2", boards: [["Ks", "8d", "2c"]] },
  { id: "a72", nome: "A-7-2", boards: [["As", "7d", "2c"]] },
  { id: "k74", nome: "K-7-4", boards: [["Kd", "7h", "4c"]] },
  { id: "d552", nome: "5-5-2, dobrado", boards: [["5c", "5h", "2s"]] },
  { id: "mono", nome: "A-T-8, monotone", boards: [["As", "Ts", "8s"]] },
]

export const BOARDS_TB: BoardTb[] = [
  ...(["short", "deep"] as Arvore[]).flatMap((arvore) =>
    SECOS.map((b) => ({
      ...b,
      id: `${arvore}-${b.id}`,
      arvore,
      est: "range" as Est,
    }))
  ),
  // Short stack: carregado sem sequência, split B40.
  {
    id: "short-j94",
    nome: "J-9-4",
    arvore: "short",
    est: "shortB40",
    boards: [
      ["Jc", "9h", "4h"],
      ["Jc", "9d", "4s"],
    ],
  },
  {
    id: "short-q86",
    nome: "Q-8-6",
    arvore: "short",
    est: "shortB40",
    boards: [
      ["Qs", "8h", "6h"],
      ["Qs", "8d", "6c"],
    ],
  },
  // Short stack: com sequência, split all-in.
  {
    id: "short-jt7",
    nome: "J-T-7",
    arvore: "short",
    est: "shortAllin",
    boards: [
      ["Js", "Td", "7d"],
      ["Js", "Td", "7c"],
    ],
  },
  {
    id: "short-876",
    nome: "8-7-6",
    arvore: "short",
    est: "shortAllin",
    boards: [
      ["8s", "7s", "6d"],
      ["8s", "7d", "6c"],
    ],
  },
  {
    id: "short-986",
    nome: "9-8-6",
    arvore: "short",
    est: "shortAllin",
    boards: [
      ["9d", "8s", "6s"],
      ["9d", "8s", "6c"],
    ],
  },
  {
    id: "short-t98",
    nome: "T-9-8",
    arvore: "short",
    est: "shortAllin",
    boards: [
      ["Ts", "9s", "8d"],
      ["Ts", "9d", "8c"],
    ],
  },
  // Deep stack: com sequência (e K-9-7, que interage mais), split B40.
  {
    id: "deep-t98",
    nome: "T-9-8",
    arvore: "deep",
    est: "deepB40",
    boards: [
      ["Ts", "9s", "8d"],
      ["Ts", "9d", "8c"],
    ],
  },
  {
    id: "deep-876",
    nome: "8-7-6",
    arvore: "deep",
    est: "deepB40",
    boards: [
      ["8s", "7s", "6d"],
      ["8s", "7d", "6c"],
    ],
  },
  {
    id: "deep-k98",
    nome: "K-9-8",
    arvore: "deep",
    est: "deepB40",
    boards: [
      ["Ks", "9s", "8d"],
      ["Ks", "9d", "8c"],
    ],
  },
  {
    id: "deep-q98",
    nome: "Q-9-8",
    arvore: "deep",
    est: "deepB40",
    boards: [
      ["Qs", "9h", "8h"],
      ["Qs", "9d", "8c"],
    ],
  },
  {
    id: "deep-k97",
    nome: "K-9-7",
    arvore: "deep",
    est: "deepB40",
    boards: [["Ks", "9d", "7c"]],
  },
  // Deep stack: Tx e Jx com flush draw, e 98x com flush draw. Split B70.
  ...(
    [
      ["982", "9-8-2", ["9s", "8h", "2s"]],
      ["j92", "J-9-2", ["Js", "9h", "2s"]],
      ["j82", "J-8-2", ["Js", "8h", "2s"]],
      ["j72", "J-7-2", ["Js", "7h", "2s"]],
      ["t92", "T-9-2", ["Ts", "9h", "2s"]],
      ["t82", "T-8-2", ["Ts", "8h", "2s"]],
      ["t72", "T-7-2", ["Ts", "7h", "2s"]],
      ["t84", "T-8-4", ["Ts", "8h", "4s"]],
    ] as [string, string, string[]][]
  ).map(([id, nome, board]) => ({
    id: `deep-${id}`,
    nome: `${nome}, com flush draw`,
    arvore: "deep" as Arvore,
    est: "deepB70" as Est,
    boards: [board],
  })),
]

const R = "23456789TJQKA"
const rk = (c: string) => R.indexOf(c[0]) + 2

interface Decisao {
  acao: AcaoTb
  aceita?: AcaoTb[]
  classe: string
  porque: string
}

function dec(
  acao: AcaoTb,
  classe: string,
  porque: string,
  aceita?: AcaoTb[]
): Decisao {
  return { acao, classe, porque, aceita }
}

const PARES = ["secondPair", "thirdPair", "underpair"]

export function decidir(
  est: Est,
  board: string[],
  hero: [string, string],
  classes: string[]
): Decisao | null {
  if (est === "range") {
    return dec(
      "B25",
      "Qualquer mão",
      "É range bet: o BB tem vantagem absoluta e o range inteiro aposta em B25."
    )
  }
  const L = ler(board, hero)
  const set = ["setAlto", "setMeio", "setBaixo"].includes(L.feita)
  const draw = L.flushDraw || L.oesd || L.gutshot
  const combo = L.flushDraw && (L.oesd || L.gutshot)
  const redrawFlush = L.bdfd || L.temNaipeFD
  const bdst = temBDSD(board, hero, draw)
  const bdBoth = redrawFlush && bdst
  const rs = hero.map(rk)
  const sdValue =
    L.feita === "nada" &&
    !draw &&
    rs.includes(14) &&
    (rs.includes(13) || rs.includes(12))
  // Mão sem par e sem draw, mas com duas overcards ou com um over e backdoor de flush: a
  // aula não diz se ela desiste, então fica fora do treino em vez de virar check-fold.
  const duvidosa =
    L.feita === "nada" &&
    !draw &&
    !sdValue &&
    (L.overcards === 2 || (L.overcards >= 1 && redrawFlush))
  const forca =
    L.feita === "topPair" ? forcaDoTopPair(board, hero, classes) : null
  const feitaTop = L.feita === "sequencia" || L.feita === "flush"
  if (feitaTop && est !== "deepB40" && est !== "shortAllin") return null

  // ---------- short stack: carregado, split B40 ----------
  if (est === "shortB40") {
    if (set)
      return dec(
        "Check-call",
        "Trinca",
        "Trinca dá check-call: com SPR baixo não precisa acelerar, bloqueia quem paga e deixa o rival acertar um par."
      )
    if (L.feita === "overpair")
      return dec("B40", "Overpair", "Overpair aposta por valor no split B40.", [
        "Check-raise",
      ])
    if (L.feita === "topPair")
      return dec(
        "B40",
        forca === "forte" ? "Top pair forte" : "Top pair",
        "Top pair aposta por valor no split B40.",
        forca === "forte" ? ["Check-raise"] : undefined
      )
    if (L.feita === "doisPares")
      return dec(
        "Check-call",
        "Dois pares",
        "Em board sem sequência e com SPR baixo, dois pares fazem slow play."
      )
    if (PARES.includes(L.feita))
      return dec(
        "Check-call",
        "Par que não é top pair",
        "Qualquer par que não seja top pair dá check-call, e par não folda."
      )
    if (L.feita !== "nada") return null
    if (combo)
      return dec(
        "Check-raise",
        "Combo draw",
        "Combo draw dá check-shove: tem equity de sobra e o rival paga muito.",
        ["Check-call"]
      )
    if (L.nutFlushDraw && L.overcards === 2)
      return dec(
        "Check-raise",
        "Nut flush draw com overcards",
        "Nut flush draw com duas overcards tem equity de sobra: check-shove, e o check-call também serve.",
        ["Check-call"]
      )
    if (L.flushDraw || L.oesd)
      return dec("B40", "Draw direto", "Draw direto é bluff do split B40.", [
        "Check-call",
      ])
    if (L.gutshot)
      return dec(
        "Check-call",
        "Broca",
        "Qualquer draw continua depois do check: a broca dá check-call."
      )
    if (bdBoth)
      return dec(
        "B40",
        "BDFD + BDST",
        "O bluff do split B40 sai de mãos com BDFD + BDST, e só com o naipe do board."
      )
    if (sdValue)
      return dec(
        "Check-call",
        "Valor de showdown",
        "Ás-alta com K ou Q tem valor de showdown e dá check-call."
      )
    if (duvidosa) return null
    return dec(
      "Check-fold",
      "Sem par nem draw",
      "Sem par, sem draw e sem BDFD + BDST, a mão desiste do pote."
    )
  }

  // ---------- short stack: com sequência, split all-in ----------
  if (est === "shortAllin") {
    if (set)
      return dec(
        "Check-call",
        "Trinca",
        "Trinca dá check-call: não precisa de proteção, bloqueia quem paga e dá free card."
      )
    if (feitaTop)
      return dec(
        "Check-call",
        "Sequência",
        "Sequência feita dá check-call e deixa o rival acertar alguma coisa."
      )
    if (L.feita === "overpair")
      return dec(
        "Check-raise",
        "Overpair",
        "Overpair vulnerável dá check-shove.",
        ["All-in"]
      )
    if (L.feita === "topPair")
      return L.flushDraw
        ? dec(
            "Check-raise",
            "Top pair com flush draw",
            "Top pair com flush draw tem equity de sobra e dá check-shove.",
            ["All-in"]
          )
        : dec(
            "All-in",
            "Top pair",
            "Ninguém folda par para o all-in no SPR baixo, então o top pair vai all-in por valor.",
            ["Check-raise"]
          )
    if (L.feita === "doisPares")
      return dec(
        "Check-call",
        "Dois pares",
        "Par não folda: dá check-call. Com sequência no board, dois pares também podem apostar.",
        ["All-in"]
      )
    if (PARES.includes(L.feita))
      return dec(
        "Check-call",
        "Par que não é top pair",
        "Par não folda: dá check-call."
      )
    if (L.feita !== "nada") return null
    if (combo)
      return dec("Check-raise", "Combo draw", "Combo draw dá check-shove.", [
        "All-in",
      ])
    if (L.nutFlushDraw)
      return dec(
        "Check-raise",
        "Nut flush draw",
        "Nut flush draw com overcards tem muita equity: check-shove, deixando o rival acertar e blefar.",
        ["All-in"]
      )
    if (L.flushDraw || L.oesd)
      return dec(
        "All-in",
        L.flushDraw ? "Flush draw" : "Duas pontas",
        "Com all-in o bluff precisa de equity direta: flush draw e duas pontas vão all-in.",
        ["Check-raise"]
      )
    if (L.gutshot) {
      // Broca com as duas cartas acima do board (A-K, A-Q, A-T): é o bluff "overs e
      // broca" da aula, e vai all-in. Com um over só precisa do backdoor de flush.
      if (L.overcards === 2)
        return dec(
          "All-in",
          "Broca com duas overcards",
          "Broca com duas overcards tem equity de sobra: é bluff do split e vai all-in."
        )
      if (L.acimaBoard && redrawFlush)
        return dec(
          "All-in",
          "Broca com overcard e BDFD",
          "Broca com overcard e backdoor de flush tem equity para o all-in."
        )
      // Broca com um over e sem redraw: a ação está em aberto, fica fora do treino.
      if (L.acimaBoard) return null
      return dec(
        "Check-fold",
        "Broca sem over nem redraw",
        "Broca sem over nem redraw, em board com sequência, não tem equity para continuar."
      )
    }
    if (sdValue)
      return dec(
        "Check-call",
        "Valor de showdown",
        "Ás-alta com K ou Q tem valor de showdown e dá check-call."
      )
    if (duvidosa) return null
    return dec(
      "Check-fold",
      "Sem par nem draw",
      "Sem par, sem draw direto e sem o naipe do board, a mão desiste."
    )
  }

  // ---------- deep stack: com sequência ou mais interação, split B40 ----------
  if (est === "deepB40") {
    if (L.feita === "setAlto")
      return dec(
        "Check-call",
        "Top set",
        "O top set dá check-call: bloqueia quem paga e dá free card."
      )
    if (L.feita === "setBaixo")
      return dec(
        "B40",
        "Trinca de baixo",
        "A trinca de baixo aposta por valor no split B40.",
        ["Check-raise"]
      )
    if (L.feita === "setMeio")
      return dec(
        "Check-raise",
        "Trinca que não é o top set",
        "A trinca que não bloqueia o top pair dá check-raise, em size alto para atolar o turn."
      )
    if (feitaTop)
      return L.flushDraw || L.feita === "flush"
        ? dec(
            "Check-call",
            "Sequência com flush draw",
            "Sequência com flush draw dá check-call e deixa o rival acertar."
          )
        : dec(
            "B40",
            "Sequência",
            "Sequência sem o naipe do board aposta, ou dá check-raise em size alto.",
            ["Check-raise"]
          )
    if (L.feita === "overpair")
      return dec(
        "B40",
        "Overpair",
        "Overpair aposta por valor: ele não precisa do check-raise e precisa de proteção."
      )
    if (L.feita === "topPair")
      return forca === "fraco"
        ? dec(
            "Check-call",
            "Top pair fraco",
            "O top pair fraco fica no check-call."
          )
        : dec(
            "B40",
            forca === "forte" ? "Top pair forte" : "Top pair",
            "Top pair que conecta com o board ou tem kicker extra aposta por valor."
          )
    if (PARES.includes(L.feita))
      return dec(
        "Check-call",
        "Par que não é top pair",
        "Qualquer par dá check-call, e par não folda."
      )
    if (L.feita !== "nada") return null
    if (combo)
      return dec(
        "Check-raise",
        "Combo draw",
        "Combo draw dá check-raise em size alto.",
        ["Check-call"]
      )
    if (L.flushDraw || L.oesd)
      return dec(
        "B40",
        L.flushDraw ? "Flush draw" : "Duas pontas",
        "Flush draw e duas pontas são o bluff do split B40.",
        ["Check-call"]
      )
    if (L.gutshot)
      return redrawFlush
        ? dec(
            "B40",
            "Broca com redraw",
            "Broca com redraw de flush aposta de bluff."
          )
        : dec("Check-call", "Broca", "Draw direto sem redraw dá check-call.")
    if (bdBoth)
      return dec(
        "B40",
        "BDFD + BDST",
        "O bluff do split B40 também sai de mãos com BDFD + BDST."
      )
    if (sdValue) {
      // A-K e A-Q sem redraw: a ação está em aberto (Pendência 10 do módulo 08).
      if (!redrawFlush) return null
      return dec(
        "Check-call",
        "Valor de showdown com redraw",
        "Em board com sequência, A-K e A-Q só dão check-call com redraw."
      )
    }
    if (duvidosa) return null
    return dec(
      "Check-fold",
      "Sem par nem draw",
      "Sem par, sem draw e sem BDFD + BDST, a mão desiste."
    )
  }

  // ---------- deep stack: Tx e Jx com flush draw, split B70 ----------
  if (set)
    return dec(
      "Check-call",
      "Trinca",
      "Trinca dá check-call: bloqueia quem paga e deixa o rival acertar algo."
    )
  if (feitaTop) return null
  if (L.feita === "overpair")
    return dec(
      "B70",
      "Overpair",
      "Os overpairs são mão forte e vulnerável: apostam no split B70.",
      ["Check-raise"]
    )
  if (L.feita === "topPair")
    return forca === "fraco"
      ? dec(
          "Check-call",
          "Top pair fraco",
          "No B70 os piores top pairs ficam para o check-call."
        )
      : dec(
          "B70",
          forca === "forte" ? "Top pair forte" : "Top pair",
          "No B70 aposta só o filé: os melhores top pairs."
        )
  if (PARES.includes(L.feita))
    return dec(
      "Check-call",
      "Par que não é top pair",
      "Qualquer par dá check-call, e par não folda."
    )
  if (L.feita !== "nada") return null
  if (combo)
    return dec(
      "Check-raise",
      "Combo draw",
      "Combo draw dá check-raise em size alto.",
      ["Check-call"]
    )
  if (L.flushDraw || L.oesd)
    return dec(
      "B70",
      L.flushDraw ? "Flush draw" : "Duas pontas",
      "O bluff do B70 precisa de equity: flush draw e duas pontas apostam.",
      ["Check-call"]
    )
  if (L.gutshot)
    return redrawFlush
      ? dec(
          "B70",
          "Broca com redraw",
          "Broca com redraw de flush aposta de bluff no B70."
        )
      : dec("Check-call", "Broca", "Draw direto sem redraw dá check-call.")
  if (bdBoth)
    return dec(
      "B70",
      "BDFD + BDST",
      "O bluff do B70 também sai de mãos com BDFD + BDST, mas só com o naipe do board."
    )
  if (sdValue)
    return dec(
      "Check-call",
      "Valor de showdown",
      "Ás-alta com K ou Q tem valor de showdown e dá check-call."
    )
  if (duvidosa) return null
  return dec(
    "Check-fold",
    "Sem par nem draw",
    "Sem par, sem draw e sem BDFD + BDST, a mão desiste."
  )
}

// ---------- situações ----------

// Decisões fáceis (todo o range aposta, ou a mão sem nada desiste), médias (par e trinca
// no check-call) e difíceis (as que pedem pensar: valor contra check-call, bluff,
// backdoors, o naipe do board, o size).
export type Dificuldade = "facil" | "media" | "dificil"

export function nivelDe(classe: string): Dificuldade {
  if (classe === "Qualquer mão" || classe === "Sem par nem draw") return "facil"
  if (
    classe === "Par que não é top pair" ||
    classe === "Trinca" ||
    classe === "Top set"
  )
    return "media"
  return "dificil"
}

export interface SituacaoTb {
  id: string
  arvore: Arvore
  est: Est
  boardNome: string
  board: string[]
  hero: [string, string]
  certa: AcaoTb
  aceita?: AcaoTb[]
  classe: string
  porque: string
  naipes: string
  dificuldade: Dificuldade
}

function todasAsMaos(): [string, string][] {
  const baralho: string[] = []
  for (const r of "AKQJT98765432") for (const s of "shdc") baralho.push(r + s)
  const out: [string, string][] = []
  for (let i = 0; i < baralho.length; i++)
    for (let j = i + 1; j < baralho.length; j++)
      out.push([baralho[i], baralho[j]])
  return out
}

function semente(texto: string): () => number {
  let h = 2166136261
  for (const ch of texto) h = Math.imul(h ^ ch.charCodeAt(0), 16777619)
  return () => {
    h ^= h << 13
    h ^= h >>> 17
    h ^= h << 5
    return (h >>> 0) / 4294967296
  }
}

const COTA: Record<Dificuldade, number> = { facil: 1, media: 2, dificil: 3 }

// Nas difíceis, a ação conta: poucas mãos de check-call e check-fold (que são a maioria
// do range) e mais de bet, all-in e check-raise, que são o que o aluno mais erra.
const aposta = (a: AcaoTb) => a.startsWith("B") || a === "All-in"
function cotaDe(s: SituacaoTb): number {
  if (s.dificuldade !== "dificil") return COTA[s.dificuldade]
  if (s.certa === "Check-raise") return 6
  if (aposta(s.certa)) return 4
  return 1
}

function gerar(): SituacaoTb[] {
  const maos = todasAsMaos()
  const lista: SituacaoTb[] = []
  for (const b of BOARDS_TB) {
    const stack = SPOT[b.arvore].stack
    const classes = classesDo3bet(stack)
    b.boards.forEach((board, v) => {
      const grupos = new Map<string, SituacaoTb[]>()
      // Mãos da mesma classe (mesmos números e suited ou off) com ações diferentes: o
      // naipe do board muda a jogada, e é onde a decisão fica apertada.
      const porClasse = new Map<string, SituacaoTb[]>()
      for (const m of maos) {
        if (m.some((c) => board.includes(c))) continue
        const classeMao = classeDaMao(m)
        if (!bb3bet(stack, classeMao)) continue
        const d = decidir(b.est, board, m, classes)
        if (!d) continue
        const chave = `${d.classe}|${d.acao}`
        const sit: SituacaoTb = {
          id: `3b-${b.id}-${v}-${m[0]}${m[1]}`,
          arvore: b.arvore,
          est: b.est,
          boardNome: b.nome,
          board,
          hero: m,
          certa: d.acao,
          aceita: d.aceita,
          classe: d.classe,
          porque: d.porque,
          naipes: descreverNaipes(board, m),
          dificuldade: b.est === "range" ? "facil" : nivelDe(d.classe),
        }
        const g = grupos.get(chave) ?? []
        g.push(sit)
        grupos.set(chave, g)
        const pc = porClasse.get(classeMao) ?? []
        pc.push(sit)
        porClasse.set(classeMao, pc)
      }
      const escolhidas = new Map<string, SituacaoTb>()
      // Algumas mãos de cada categoria, sorteadas sempre do mesmo jeito: poucas nas
      // fáceis e mais nas difíceis. No range bet toda mão aposta, então ficam duas.
      for (const [chave, g] of grupos) {
        const rnd = semente(`${b.id}${v}${chave}`)
        const copia = g.slice()
        for (let i = copia.length - 1; i > 0; i--) {
          const j = Math.floor(rnd() * (i + 1))
          ;[copia[i], copia[j]] = [copia[j], copia[i]]
        }
        const cota = b.est === "range" ? 2 : cotaDe(copia[0])
        for (const s of copia.slice(0, cota)) escolhidas.set(s.id, s)
      }
      // Para cada mão difícil, a gêmea: mesma classe, ação diferente.
      for (const s of [...escolhidas.values()]) {
        if (s.dificuldade !== "dificil") continue
        const gemea = (porClasse.get(classeDaMao(s.hero)) ?? []).find(
          (o) =>
            o.certa !== s.certa &&
            !escolhidas.has(o.id) &&
            // O par precisa ter bet ou check-raise de um lado.
            (aposta(o.certa) ||
              o.certa === "Check-raise" ||
              aposta(s.certa) ||
              s.certa === "Check-raise")
        )
        if (gemea)
          escolhidas.set(gemea.id, { ...gemea, dificuldade: "dificil" })
      }
      lista.push(...escolhidas.values())
    })
  }
  return lista
}

export const situacoesTb: SituacaoTb[] = gerar()
