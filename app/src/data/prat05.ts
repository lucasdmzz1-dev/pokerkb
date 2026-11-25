// Prática do módulo 05 (C-Bet OOP 40bb, só o flop). Os naipes decidem boa parte das
// jogadas, então a resposta de cada mão sai de um conjunto de regras que lê os naipes
// do board e da mão (flush draw, backdoor, blocker). Mão que as regras do módulo não
// cobrem de forma clara devolve null e não entra no treino.

import { abre } from "@/data/ranges"

export type Cenario = "EP" | "CO"
export type EstrategiaOop = "range" | "split" | "split25" | "check"
export type AcaoOop = "Check-call" | "Check-raise" | "B25" | "B40" | "B70"
export type TexturaOop =
  | "ahighSeco"
  | "ahighConectado"
  | "bbx"
  | "kqHigh"
  | "jtHigh"
  | "highSeguida"
  | "lowSeguida"
  | "lowSemSeguida"
  | "monotone"

type Size = "B25" | "B40" | "B70"

interface Jogada {
  estrategia: EstrategiaOop
  size?: Size
  // Quantos dos melhores top pairs (por kicker) da metade que não aposta vão de check-raise.
  xrTopPair?: number
}

export interface Textura {
  nome: string
  // Boards do módulo (rainbow) e a versão com dois naipes, de mesmos números.
  rainbow?: string[]
  doisNaipes?: string[]
  // Outros boards da mesma textura, dos exemplos do coach (CBET OOP EXEMPLOS).
  outros?: { rainbow: string[]; doisNaipes: string[] }[]
  EP: Jogada | null
  CO: Jogada | null
}

// Tabela do guideline (EP contra BTN e CO contra BTN). O monotone do EP é aleatório,
// então não entra no treino.
export const TEXTURAS: Record<TexturaOop, Textura> = {
  ahighSeco: {
    nome: "A HIGH seco",
    rainbow: ["As", "7d", "2c"],
    doisNaipes: ["Ah", "7h", "2c"],
    EP: { estrategia: "split", size: "B25", xrTopPair: 2 },
    CO: { estrategia: "split", size: "B25", xrTopPair: 2 },
  },
  ahighConectado: {
    nome: "A HIGH conectado",
    rainbow: ["As", "Jd", "Tc"],
    doisNaipes: ["Ah", "Jh", "Tc"],
    EP: { estrategia: "split", size: "B40" },
    CO: { estrategia: "split25", size: "B40" },
  },
  bbx: {
    nome: "BBX",
    rainbow: ["Ks", "Qd", "5c"],
    doisNaipes: ["Kh", "Qh", "5c"],
    outros: [
      { rainbow: ["Ks", "Td", "6c"], doisNaipes: ["Kh", "Th", "6c"] },
      { rainbow: ["Qs", "Jd", "6c"], doisNaipes: ["Qh", "Jh", "6c"] },
    ],
    EP: { estrategia: "range", size: "B25" },
    CO: { estrategia: "split25", size: "B40" },
  },
  kqHigh: {
    nome: "K-Q high",
    rainbow: ["Ks", "8d", "4c"],
    doisNaipes: ["Kh", "8h", "4c"],
    outros: [
      { rainbow: ["Qs", "8d", "4c"], doisNaipes: ["Qh", "8h", "4c"] },
      { rainbow: ["Ks", "8d", "5c"], doisNaipes: ["Kh", "8h", "5c"] },
      { rainbow: ["Ks", "6d", "4c"], doisNaipes: ["Kh", "6h", "4c"] },
    ],
    EP: { estrategia: "split", size: "B40" },
    CO: { estrategia: "split25", size: "B40" },
  },
  jtHigh: {
    nome: "J-T high",
    rainbow: ["Js", "7d", "3c"],
    doisNaipes: ["Jh", "7h", "3c"],
    outros: [
      { rainbow: ["Js", "6d", "4c"], doisNaipes: ["Jh", "6h", "4c"] },
      { rainbow: ["Js", "8d", "3c"], doisNaipes: ["Jh", "8h", "3c"] },
    ],
    EP: { estrategia: "split", size: "B40" },
    CO: { estrategia: "split25", size: "B70" },
  },
  highSeguida: {
    nome: "High com sequência",
    rainbow: ["Qs", "Td", "9c"],
    doisNaipes: ["Qh", "Th", "9c"],
    EP: { estrategia: "split", size: "B40" },
    CO: { estrategia: "split25", size: "B40" },
  },
  lowSeguida: {
    nome: "Low com sequência",
    rainbow: ["7s", "6d", "4c"],
    doisNaipes: ["7h", "6h", "4c"],
    outros: [{ rainbow: ["7s", "6d", "5c"], doisNaipes: ["7h", "6h", "5c"] }],
    EP: { estrategia: "split", size: "B70" },
    CO: { estrategia: "split", size: "B40" },
  },
  lowSemSeguida: {
    nome: "Low sem sequência",
    rainbow: ["9s", "4d", "2c"],
    doisNaipes: ["9h", "4h", "2c"],
    EP: { estrategia: "split", size: "B70" },
    CO: { estrategia: "split", size: "B70" },
  },
  monotone: {
    nome: "Monotone",
    rainbow: ["Ks", "8s", "3s"],
    EP: null,
    CO: { estrategia: "check" },
  },
}

export const NOME_ESTRATEGIA: Record<EstrategiaOop, string> = {
  range: "range bet",
  split: "split range",
  split25: "split 25%",
  check: "check range",
}

// ---------- leitura de cartas e naipes ----------

const R = "23456789TJQKA"
const rk = (c: string) => R.indexOf(c[0]) + 2
const su = (c: string) => c[1]

function maiorSequencia(ranks: number[]): number {
  const s = new Set(ranks)
  if (s.has(14)) s.add(1)
  for (let h = 14; h >= 5; h--) {
    let ok = true
    for (let k = 0; k < 5; k++) if (!s.has(h - k)) ok = false
    if (ok) return h
  }
  return 0
}

interface Leitura {
  // Mão feita.
  feita:
    | "setAlto"
    | "setMeio"
    | "setBaixo"
    | "doisPares"
    | "overpair"
    | "topPair"
    | "secondPair"
    | "thirdPair"
    | "underpair"
    | "sequencia"
    | "flush"
    | "nada"
  // Overpair: do menor (primeiro acima do board) ao melhor possível.
  overpairPrimeiro: boolean
  overpairMelhor: boolean
  // Draws.
  flushDraw: boolean
  nutFlushDraw: boolean
  oesd: boolean
  gutshot: boolean
  // Naipes. F é o naipe repetido do board (flush draw) e T o naipe que aparece uma vez.
  temNaipeFD: boolean // uma carta do naipe do flush draw (mão off)
  bdfd: boolean // suited com o naipe que aparece uma vez no board
  semNaipeBoard: boolean // nenhuma carta em naipe do board
  kickerAlto: number
  overcards: number
  acimaBoard: boolean
  // O ás do naipe do flush draw está no board.
  aceNoNaipeFD: boolean
}

export function ler(board: string[], hero: string[]): Leitura {
  const br = board.map(rk).sort((a, b) => b - a)
  const hr = hero.map(rk)
  const contagemSuit: Record<string, number> = {}
  for (const c of board) contagemSuit[su(c)] = (contagemSuit[su(c)] ?? 0) + 1
  const naipeFD = Object.keys(contagemSuit).find((s) => contagemSuit[s] === 2)
  const naipesBoard = new Set(Object.keys(contagemSuit))
  const suited = su(hero[0]) === su(hero[1])
  const [h1, h2] = hr
  const todas = [...br, ...hr]

  let feita: Leitura["feita"] = "nada"
  const pocket = h1 === h2
  if (maiorSequencia(todas) && maiorSequencia(br) === 0) feita = "sequencia"
  const sc: Record<string, number> = { ...contagemSuit }
  for (const c of hero) sc[su(c)] = (sc[su(c)] ?? 0) + 1
  if (Object.values(sc).some((n) => n >= 5)) feita = "flush"
  if (feita === "nada") {
    if (pocket && br.includes(h1)) {
      feita = h1 === br[0] ? "setAlto" : h1 === br[1] ? "setMeio" : "setBaixo"
    } else if (!pocket && br.includes(h1) && br.includes(h2)) {
      feita = "doisPares"
    } else if (pocket) {
      // Par de bolso: overpair acima do board; segundo par entre a primeira e a segunda
      // carta; terceiro par entre a segunda e a terceira; underpair abaixo de todas.
      feita =
        h1 > br[0]
          ? "overpair"
          : h1 > br[1]
            ? "secondPair"
            : h1 > br[2]
              ? "thirdPair"
              : "underpair"
    } else {
      const par = hr.find((x) => br.includes(x))
      if (par !== undefined)
        feita =
          par === br[0] ? "topPair" : par === br[1] ? "secondPair" : "thirdPair"
    }
  }

  // Overpair: o primeiro é o número logo acima do board, o melhor é o ás.
  const overpairPrimeiro =
    feita === "overpair" &&
    h1 ===
      Math.min(
        ...[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].filter((x) => x > br[0])
      )
  const overpairMelhor = feita === "overpair" && h1 === 14

  // Draws (a mão precisa participar da sequência).
  const outs: number[] = []
  if (feita !== "sequencia" && feita !== "flush") {
    for (let r = 2; r <= 14; r++) {
      if (maiorSequencia([...todas, r]) && !maiorSequencia([...br, r]))
        outs.push(r)
    }
  }
  const oesd = outs.length >= 2
  const gutshot = outs.length === 1

  const nF = naipeFD ? hero.filter((c) => su(c) === naipeFD).length : 0
  const flushDraw = !!naipeFD && nF === 2
  const nutFlushDraw =
    flushDraw &&
    hr.includes(14) &&
    !board.some((c) => su(c) === naipeFD && rk(c) === 14)
  const temNaipeFD = !!naipeFD && nF === 1
  const bdfd =
    suited && contagemSuit[su(hero[0])] === 1 && su(hero[0]) !== naipeFD
  const semNaipeBoard = hero.every((c) => !naipesBoard.has(su(c)))

  return {
    feita,
    overpairPrimeiro,
    overpairMelhor,
    flushDraw,
    nutFlushDraw,
    oesd,
    gutshot,
    temNaipeFD,
    bdfd,
    semNaipeBoard,
    kickerAlto: Math.max(...hr),
    overcards: hr.filter((x) => x > br[0]).length,
    acimaBoard: hr.some((x) => x > br[0]),
    aceNoNaipeFD:
      !!naipeFD && board.some((c) => rk(c) === 14 && su(c) === naipeFD),
  }
}

// ---------- regras ----------

export interface Decisao {
  acao: AcaoOop
  classe: string
  porque: string
}

function ap(size: Size): AcaoOop {
  return size
}

function rotuloGeral(L: Leitura): string {
  const nomes: Record<Leitura["feita"], string> = {
    setAlto: "Top set",
    setMeio: "Trinca do meio",
    setBaixo: "Trinca baixa",
    doisPares: "Dois pares",
    overpair: "Overpair",
    topPair: "Top pair",
    secondPair: "Second pair",
    thirdPair: "Third pair",
    underpair: "Underpair",
    sequencia: "Sequência",
    flush: "Flush",
    nada: L.flushDraw
      ? "Flush draw"
      : L.oesd
        ? "Duas pontas"
        : L.gutshot
          ? "Broca"
          : "Sem par",
  }
  return nomes[L.feita]
}

export function decidir(
  jogada: Jogada,
  board: string[],
  hero: string[],
  doisNaipes: boolean
): Decisao | null {
  const L = ler(board, hero)
  const size = jogada.size
  const est = jogada.estrategia

  // Monotone do CO: check range, e só as mãos com par fecham a regra.
  if (est === "check") {
    if (["topPair", "secondPair", "thirdPair", "underpair"].includes(L.feita))
      return {
        acao: "Check-call",
        classe: rotuloGeral(L) + " no board monotone",
        porque: "No monotone, de CO contra o BTN, o range inteiro dá check.",
      }
    return null
  }
  if (!size) return null

  // Range bet: o range inteiro aposta.
  if (est === "range")
    return {
      acao: ap(size),
      classe: rotuloGeral(L),
      porque: "É range bet: o range inteiro aposta, em " + size + ".",
    }

  // Par com draw e flush draw com draw de sequência são combos que as regras não cobrem.
  const pares = ["topPair", "secondPair", "thirdPair", "underpair"]
  if (pares.includes(L.feita) && (L.oesd || L.gutshot || L.flushDraw))
    return null
  if (L.flushDraw && (L.oesd || L.gutshot)) return null

  // Mãos que valem igual nos dois splits.
  switch (L.feita) {
    case "setBaixo":
      return {
        acao: ap(size),
        classe: "Trinca baixa",
        porque: "A pior trinca aposta por valor.",
      }
    case "setMeio":
      return {
        acao: "Check-raise",
        classe: "Trinca do meio",
        porque: "A trinca do meio vai de check-raise por valor.",
      }
    case "setAlto":
      return {
        acao: "Check-call",
        classe: "Top set",
        porque:
          "O top set dá check-call: mantém uma mão forte no check e protege o range.",
      }
    case "doisPares":
      return {
        acao: ap(size),
        classe: "Dois pares",
        porque: "Dois pares apostam por valor.",
      }
    case "overpair":
      if (L.overpairMelhor && !L.overpairPrimeiro)
        return {
          acao: "Check-raise",
          classe: "Melhor overpair",
          porque: "Os melhores overpairs vão de check-raise por valor.",
        }
      if (L.overpairPrimeiro && !L.overpairMelhor)
        return {
          acao: ap(size),
          classe: "Primeiro overpair",
          porque: "Os primeiros overpairs acima do board apostam por valor.",
        }
      return null
    case "sequencia":
    case "flush":
      return null
    default:
  }

  // Flush draw: a regra do instrutor para os nut flush draws e XR com os demais.
  if (
    L.flushDraw &&
    !["topPair", "secondPair", "doisPares"].includes(L.feita)
  ) {
    // Com o ás do naipe no board o nut flush draw muda de dono, e a regra não cobre.
    if (L.aceNoNaipeFD) return null
    if (L.nutFlushDraw) {
      const k =
        L.kickerAlto === 14
          ? Math.min(...hero.map(rk).filter((x) => x !== 14))
          : 0
      if (k >= 10)
        return {
          acao: "Check-call",
          classe: "Nut flush draw forte (AK a AT)",
          porque:
            "O nut flush draw forte tem valor de showdown e bloqueia boa parte dos flush draws do vilão: dá check-call.",
        }
      if (k >= 6)
        return {
          acao: ap(size),
          classe: "Nut flush draw médio (A9 a A6)",
          porque:
            "O nut flush draw médio aposta: protege contra os outs de ás no turn e gera fold equity no flop e no turn.",
        }
      if (k >= 2)
        return {
          acao: "Check-raise",
          classe: "Nut flush draw baixo (A5 a A2)",
          porque:
            "O nut flush draw baixo vai de check-raise: tem pouco showdown value e cooleria os flush draws do vilão.",
        }
    }
    if (!L.nutFlushDraw && hero.map(rk).every((x) => x !== 14))
      return {
        acao: "Check-raise",
        classe: "Flush draw",
        porque: "Os flush draws são o bluff de check-raise do range.",
      }
    return null
  }
  if (L.flushDraw) return null

  // Par de bolso abaixo do top pair fica no check-call, sem olhar os naipes.
  if (
    hero[0][0] === hero[1][0] &&
    ["secondPair", "thirdPair", "underpair"].includes(L.feita)
  )
    return {
      acao: "Check-call",
      classe:
        L.feita === "secondPair"
          ? "Second pair (par de bolso)"
          : L.feita === "thirdPair"
            ? "Third pair (par de bolso)"
            : "Underpair",
      porque: "Pares com valor de showdown ficam no check-call.",
    }

  if (est === "split") {
    // Os melhores top pairs (kickers mais altos) da metade que não aposta vão de
    // check-raise por valor, em vez de check-call.
    if (L.feita === "topPair" && L.semNaipeBoard && jogada.xrTopPair) {
      const br = board.map(rk)
      const par = hero.map(rk).find((x) => br.includes(x))
      const kicker = hero.map(rk).find((x) => x !== par)
      const melhores: number[] = []
      for (let r = 14; r >= 2 && melhores.length < jogada.xrTopPair; r--)
        if (r !== par && !br.includes(r)) melhores.push(r)
      if (kicker !== undefined && melhores.includes(kicker))
        return {
          acao: "Check-raise",
          classe: "Melhor top pair sem naipe do board",
          porque:
            "Os melhores top pairs da metade que não aposta vão de check-raise por valor.",
        }
    }
    if (L.feita === "topPair" || L.feita === "secondPair") {
      const nome = L.feita === "topPair" ? "Top pair" : "Second pair"
      if (doisNaipes) {
        if (L.temNaipeFD && L.feita === "topPair")
          return {
            acao: ap(size),
            classe: nome + " com o naipe do flush draw",
            porque:
              "No split range o top pair aposta com os naipes do board. Aqui a mão tem o naipe do flush draw.",
          }
        if (L.bdfd)
          return {
            acao: ap(size),
            classe: nome + " com backdoor flush draw",
            porque:
              "No split range o " +
              nome.toLowerCase() +
              " com backdoor flush draw aposta.",
          }
        if (L.semNaipeBoard)
          return {
            acao: "Check-call",
            classe: nome + " sem naipe do board",
            porque:
              "Sem nenhum naipe do board, o " +
              nome.toLowerCase() +
              " fica no check-call: a metade que não aposta.",
          }
        return null
      }
      if (L.bdfd)
        return {
          acao: ap(size),
          classe: nome + " com backdoor flush draw",
          porque:
            "No split range o " +
            nome.toLowerCase() +
            " com backdoor flush draw aposta.",
        }
      if (L.semNaipeBoard)
        return {
          acao: "Check-call",
          classe: nome + " sem naipe do board",
          porque:
            "Sem nenhum naipe do board, o " +
            nome.toLowerCase() +
            " fica no check-call: a metade que não aposta.",
        }
      return null
    }
    if (L.feita === "thirdPair" || L.feita === "underpair")
      return {
        acao: "Check-call",
        classe: L.feita === "thirdPair" ? "Third pair" : "Underpair",
        porque: "Pares com valor de showdown ficam no check-call.",
      }
    if (L.oesd)
      return L.semNaipeBoard
        ? {
            acao: ap(size),
            classe: "Duas pontas sem naipe do board",
            porque:
              "No split range as duas pontas sem o naipe do board apostam como bluff.",
          }
        : null
    if (L.gutshot) {
      if (doisNaipes && L.temNaipeFD)
        return {
          acao: ap(size),
          classe: "Broca com o naipe do board",
          porque:
            "No split range a broca com o naipe do board aposta como bluff.",
        }
      return null
    }
    if (L.feita === "nada" && L.bdfd && L.overcards === 1)
      return {
        acao: ap(size),
        classe: "Uma overcard com backdoor flush draw",
        porque: "Uma overcard com backdoor flush draw entra no range de bet.",
      }
    return null
  }

  // split 25%
  if (L.feita === "topPair") {
    if (doisNaipes) {
      if (L.temNaipeFD)
        return {
          acao: ap(size),
          classe: "Top pair off com o naipe do flush draw",
          porque:
            "No split 25% só uma parte pequena dos top pairs aposta: a parte off com o naipe do flush draw.",
        }
      if (L.bdfd)
        return {
          acao: ap(size),
          classe: "Top pair suited com backdoor flush draw",
          porque:
            "No split 25% o top pair suited com backdoor flush draw está entre os que apostam.",
        }
      return {
        acao: "Check-call",
        classe: "Top pair",
        porque:
          "No split 25% a maior parte dos top pairs dá check-call. Só apostam os off com o naipe do flush draw e os suited com backdoor.",
      }
    }
    if (L.semNaipeBoard)
      return {
        acao: ap(size),
        classe: "Top pair sem naipe do board",
        porque:
          "No split 25%, em board rainbow, os top pairs que apostam são os sem o naipe do board.",
      }
    if (L.bdfd)
      return {
        acao: ap(size),
        classe: "Top pair suited com backdoor flush draw",
        porque:
          "No split 25% o top pair suited com backdoor flush draw está entre os que apostam.",
      }
    return {
      acao: "Check-call",
      classe: "Top pair",
      porque:
        "No split 25% a maior parte dos top pairs dá check-call. Só apostam os sem o naipe do board ou os suited com backdoor.",
    }
  }
  if (
    L.feita === "secondPair" ||
    L.feita === "thirdPair" ||
    L.feita === "underpair"
  )
    return {
      acao: "Check-call",
      classe:
        L.feita === "secondPair"
          ? "Second pair"
          : L.feita === "thirdPair"
            ? "Third pair"
            : "Underpair",
      porque: "No split 25% os pares abaixo do top pair ficam no check-call.",
    }
  if (L.oesd && doisNaipes && L.temNaipeFD)
    return {
      acao: "Check-raise",
      classe: "Duas pontas com o naipe do board",
      porque:
        "No split 25% as duas pontas com o naipe do board vão de check-raise.",
    }
  if (L.gutshot && doisNaipes && L.temNaipeFD)
    return {
      acao: "Check-raise",
      classe: "Broca com o naipe do board",
      porque: "No split 25% a broca com o naipe do board vai de check-raise.",
    }
  if (L.feita === "nada" && L.bdfd && L.overcards === 1)
    return {
      acao: ap(size),
      classe: "Uma overcard com backdoor flush draw",
      porque: "Uma overcard com backdoor flush draw entra no range de bet.",
    }
  return null
}

// ---------- situações ----------

const SIMBOLO: Record<string, string> = { s: "♠", h: "♥", d: "♦", c: "♣" }

// Texto dos naipes da questão: o que o board tem e como a mão se relaciona com ele.
export function descreverNaipes(board: string[], hero: string[]): string {
  const L = ler(board, hero)
  const cont: Record<string, number> = {}
  for (const c of board) cont[su(c)] = (cont[su(c)] ?? 0) + 1
  const naipes = Object.keys(cont)
  const fd = naipes.find((n) => cont[n] === 2)
  const unico = naipes.find((n) => cont[n] === 1)
  let b: string
  if (naipes.length === 1) b = `Board monotone em ${SIMBOLO[naipes[0]]}.`
  else if (fd)
    b = `Board com flush draw em ${SIMBOLO[fd]}, e o ${SIMBOLO[unico ?? ""]} aparece uma vez.`
  else b = `Board rainbow (${naipes.map((n) => SIMBOLO[n]).join(" ")}).`
  let m: string
  if (L.flushDraw && fd) m = `Sua mão é suited em ${SIMBOLO[fd]}: flush draw.`
  else if (L.temNaipeFD && fd)
    m = `Sua mão tem uma carta de ${SIMBOLO[fd]}, o naipe do flush draw (mão off).`
  else if (L.bdfd)
    m = `Sua mão é suited em ${SIMBOLO[su(hero[0])]}, que aparece uma vez no board: backdoor flush draw.`
  else if (L.semNaipeBoard) m = "Sua mão não tem nenhum naipe do board."
  else m = "Sua mão tem um naipe do board, mas não é suited nem do flush draw."
  return `${b} ${m}`
}

export interface SituacaoOop {
  id: string
  textura: TexturaOop
  cenario: Cenario
  variante: "rainbow" | "doisNaipes"
  board: string[]
  hero: [string, string]
  heroPos: "UTG" | "UTG1" | "LJ" | "CO"
  certa: AcaoOop
  classe: string
  porque: string
  naipes: string
  estrategia: EstrategiaOop
  size?: Size
}

const NAIPES = ["s", "h", "d", "c"]

function todasAsMaos(): [string, string][] {
  const baralho: string[] = []
  for (const r of "AKQJT98765432") for (const s of NAIPES) baralho.push(r + s)
  const out: [string, string][] = []
  for (let i = 0; i < baralho.length; i++)
    for (let j = i + 1; j < baralho.length; j++)
      out.push([baralho[i], baralho[j]])
  return out
}

// Gerador determinístico para sortear as mãos de cada categoria sempre do mesmo jeito.
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

// O EP do módulo é o EP2 do Poker Academy (UTG+1), que é o UTG1 da nossa mesa.
const EP_POS: SituacaoOop["heroPos"][] = ["UTG1"]

// Classe da mão sem os naipes exatos: par (77), suited (AKs) ou off (AKo).
function classeMao(m: readonly string[]): string {
  const [a, b] = [m[0], m[1]].sort((x, y) => rk(y) - rk(x))
  if (a[0] === b[0]) return a[0] + b[0]
  return a[0] + b[0] + (su(a) === su(b) ? "s" : "o")
}

function gerar(): SituacaoOop[] {
  const maos = todasAsMaos()
  const lista: SituacaoOop[] = []
  const usoPorClasse = new Map<string, number>()
  for (const [id, t] of Object.entries(TEXTURAS) as [TexturaOop, Textura][]) {
    const variantes: [SituacaoOop["variante"], string[]][] = []
    if (t.rainbow) variantes.push(["rainbow", t.rainbow])
    if (t.doisNaipes) variantes.push(["doisNaipes", t.doisNaipes])
    for (const o of t.outros ?? []) {
      variantes.push(["rainbow", o.rainbow])
      variantes.push(["doisNaipes", o.doisNaipes])
    }
    for (const cenario of ["EP", "CO"] as Cenario[]) {
      const jogada = t[cenario]
      if (!jogada) continue
      for (const [variante, board] of variantes) {
        const grupos = new Map<string, SituacaoOop[]>()
        for (const m of maos) {
          if (m.some((c) => board.includes(c))) continue
          // O herói só joga mãos que abre desta posição.
          if (!abre(cenario === "EP" ? "EP2" : "CO", m)) continue
          const d = decidir(jogada, board, m, variante === "doisNaipes")
          if (!d) continue
          const chave = d.classe + "|" + d.acao
          const sit: SituacaoOop = {
            id: `${id}-${cenario}-${variante}-${board.join("")}-${m[0]}${m[1]}`,
            textura: id,
            cenario,
            variante,
            board,
            hero: m,
            heroPos: "CO",
            certa: d.acao,
            classe: d.classe,
            porque: d.porque,
            naipes: descreverNaipes(board, m),
            estrategia: jogada.estrategia,
            size: jogada.size,
          }
          const g = grupos.get(chave) ?? []
          g.push(sit)
          grupos.set(chave, g)
        }
        // Duas mãos de cada categoria, sorteadas sempre do mesmo jeito. As mãos de uma
        // categoria são de classes diferentes (um 77, não vários 77 com naipes diferentes),
        // e cada classe de mão aparece no máximo 2 vezes por board e posição.
        for (const [chave, g] of grupos) {
          const rnd = semente(
            `${id}${cenario}${variante}${board.join("")}${chave}`
          )
          const copia = g.slice()
          for (let i = copia.length - 1; i > 0; i--) {
            const j = Math.floor(rnd() * (i + 1))
            ;[copia[i], copia[j]] = [copia[j], copia[i]]
          }
          const max = jogada.estrategia === "range" ? 3 : 2
          const classesDoGrupo = new Set<string>()
          const escolhidas: SituacaoOop[] = []
          for (const s of copia) {
            if (escolhidas.length >= max) break
            const cm = classeMao(s.hero)
            const k = `${id}|${cenario}|${board.map((c) => c[0]).join("")}|${cm}`
            if (classesDoGrupo.has(cm) || (usoPorClasse.get(k) ?? 0) >= 2)
              continue
            classesDoGrupo.add(cm)
            usoPorClasse.set(k, (usoPorClasse.get(k) ?? 0) + 1)
            escolhidas.push(s)
          }
          for (const s of escolhidas) {
            lista.push({
              ...s,
              heroPos:
                cenario === "CO"
                  ? "CO"
                  : EP_POS[Math.floor(rnd() * EP_POS.length)],
            })
          }
        }
      }
    }
  }
  return lista
}

export const situacoesOop: SituacaoOop[] = gerar()
