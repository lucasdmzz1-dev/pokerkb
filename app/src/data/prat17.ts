// Prática do módulo 17 (BB raised pot contra o SB que deu limp, 40bb, flop). O herói é
// o BB, em posição: o SB deu limp, o BB aumentou para 3,5bb e o SB pagou. O bucket de
// cada mão sai das tabelas de split do guideline (B25, B40 e B70), e o size vem do
// board. Mão que as tabelas não resolvem de forma clara devolve null.
import { ler } from "@/data/prat05"
import { forcaDoTopPair, temBDSD } from "@/data/prat15"
import { bbRaisa, classeDaMao, classesQueOBBRaisa } from "@/data/ranges"

export type SizeBB = "B25" | "B40" | "B70"
export type EstrategiaBB =
  "range" | "split25" | "split40" | "split70" | "dobradoConectado"
export type GrupoBB = "B25" | "B40" | "B70" | "Range"

export interface BoardBBTreino {
  id: string
  nome: string
  board: string[]
  size: SizeBB
  estrategia: EstrategiaBB
  grupo: GrupoBB
  // Frequência geral de aposta do board no guideline por board (IMG1), em %.
  freq?: number
  // Por que o board tem esse size, nas palavras do coach.
  criterio?: string
  // Tabela do guideline por board (IMG1) deste board, quando o coach deu uma.
  img1?: "alto70" | "conectado40" | "high40" | "low" | "mono"
  // Board monotone: segue a tabela B25 (IMG2), sem flush nem flush draw.
  monotone?: boolean
}

// Boards da aula (guideline, "Critérios por board"). O size e a estratégia são os que
// a fala do coach dá. Os naipes de alguns boards a aula não diz: escolhi um jeito
// coerente com o que ela diz (flush draw ou rainbow).
export const BOARDS_BB: BoardBBTreino[] = [
  {
    id: "ktq",
    nome: "K-T-Q, triple broadway",
    board: ["Ks", "Ts", "Qh"],
    size: "B70",
    estrategia: "split70",
    grupo: "B70",
  },
  {
    id: "975",
    nome: "9-7-5, low conectado",
    board: ["5c", "7h", "9d"],
    size: "B70",
    estrategia: "split70",
    grupo: "B70",
    criterio:
      "Seguida em board low: o SB não tem a sequência offsuit, então B70.",
  },
  {
    id: "t85",
    nome: "T-8-5, low conectado com flush draw",
    board: ["Ts", "8s", "5d"],
    size: "B70",
    estrategia: "split70",
    grupo: "B70",
    criterio:
      "Seguida em board low: o SB não tem a sequência offsuit, então B70.",
  },
  {
    id: "t84fd",
    nome: "T-8-4, com flush draw",
    board: ["Ts", "8s", "4d"],
    size: "B70",
    estrategia: "split70",
    grupo: "B70",
    criterio:
      "O 4 conecta mais com o T e o 8 que o 3 e o 2: mais interação e flush draw, então B70 (coach, áudio de 04/11/2026).",
  },
  {
    id: "qt7",
    nome: "Q-T-7, semi conectado com flush draw",
    board: ["Qh", "Th", "7c"],
    size: "B70",
    estrategia: "split70",
    grupo: "B70",
  },
  {
    id: "q87",
    nome: "Q-8-7, semi conectado com flush draw",
    board: ["Qc", "8d", "7d"],
    size: "B70",
    estrategia: "split70",
    grupo: "B70",
  },
  {
    id: "j76",
    nome: "J-7-6, semi conectado com flush draw",
    board: ["Jd", "7s", "6s"],
    size: "B70",
    estrategia: "split70",
    grupo: "B70",
  },
  {
    id: "k98",
    nome: "K-9-8, semi conectado com flush draw",
    board: ["Ks", "9s", "8d"],
    size: "B70",
    estrategia: "split70",
    grupo: "B70",
  },
  {
    id: "kq8",
    nome: "K-Q-8, broadway",
    board: ["Ks", "Qs", "8h"],
    size: "B70",
    estrategia: "split70",
    img1: "alto70",
    grupo: "B70",
    freq: 25,
  },
  {
    id: "j96",
    nome: "J-9-6, semi conectado",
    board: ["Js", "9s", "6h"],
    size: "B70",
    estrategia: "split70",
    img1: "alto70",
    grupo: "B70",
    freq: 33,
  },
  {
    id: "j97",
    nome: "J-9-7, conectado",
    board: ["Js", "9s", "7h"],
    size: "B40",
    estrategia: "split40",
    img1: "conectado40",
    grupo: "B40",
    freq: 45,
  },
  {
    id: "752",
    nome: "7-5-2, low desconectado",
    board: ["7c", "5d", "2h"],
    size: "B40",
    estrategia: "split40",
    img1: "low",
    grupo: "B40",
    freq: 66,
  },
  {
    id: "q83",
    nome: "Q-8-3, high card com duas de valor",
    board: ["Qs", "8h", "3h"],
    size: "B40",
    estrategia: "split40",
    img1: "high40",
    grupo: "B40",
    freq: 50,
  },
  {
    id: "q63",
    nome: "Q-6-3, high card com duas baixas",
    board: ["Qs", "6d", "3d"],
    size: "B25",
    estrategia: "split25",
    img1: "low",
    grupo: "B25",
    freq: 66,
    criterio:
      "Uma carta alta e duas baixas (abaixo do 8x, que o SB quase não defende offsuit): size baixo, muito thin value, B25.",
  },
  {
    id: "k94",
    nome: "K-9-4, monotone",
    board: ["Ks", "9s", "4s"],
    size: "B25",
    estrategia: "split25",
    img1: "mono",
    grupo: "B25",
    freq: 50,
    monotone: true,
  },
  {
    id: "a82",
    nome: "A-8-2, A high seco",
    board: ["Ad", "8s", "2h"],
    size: "B25",
    estrategia: "range",
    grupo: "Range",
    freq: 100,
  },
  {
    id: "883",
    nome: "8-8-3, dobrado seco",
    board: ["8c", "8h", "3s"],
    size: "B25",
    estrategia: "range",
    grupo: "Range",
    freq: 100,
  },
  {
    id: "998",
    nome: "9-9-8, dobrado conectado",
    board: ["9s", "9h", "8d"],
    size: "B25",
    estrategia: "dobradoConectado",
    grupo: "B25",
    freq: 55,
  },
  {
    id: "q92",
    nome: "Q-9-2, high card",
    board: ["Qs", "9h", "2c"],
    size: "B40",
    estrategia: "split40",
    grupo: "B40",
    criterio:
      "No Q-9-2 muitos 9x ainda querem apostar, entre outras mãos: B40.",
  },
  {
    id: "q97",
    nome: "Q-9-7, muito dinâmico",
    board: ["Qs", "9d", "7c"],
    size: "B70",
    estrategia: "split70",
    grupo: "B70",
    criterio:
      "Board muito dinâmico, com alta interação com o range do SB e sem incentivo de thin value: B70.",
  },
  {
    id: "kj4",
    nome: "K-J-4, dois broadways",
    board: ["4c", "Jd", "Kc"],
    size: "B40",
    estrategia: "split40",
    grupo: "B40",
    criterio:
      "Duas cartas altas e uma baixa tendem ao B40: o 4 não é defendido pelo SB.",
  },
  {
    id: "jt8",
    nome: "J-T-8, com sequência",
    board: ["Td", "Js", "8c"],
    size: "B40",
    estrategia: "split40",
    grupo: "B40",
    criterio:
      "Seguida que o SB tem offsuit: B40. O offsuit que ele defende começa em 8x.",
  },
  {
    id: "qj8",
    nome: "Q-J-8, com flush draw",
    board: ["Jd", "Qc", "8c"],
    size: "B40",
    estrategia: "split40",
    grupo: "B40",
    criterio:
      "Seguida que o SB tem offsuit (T-9): B40. O offsuit que ele defende começa em 8x.",
  },
  {
    id: "842",
    nome: "8-4-2, low desconectado",
    board: ["4c", "2c", "8d"],
    size: "B40",
    estrategia: "split40",
    grupo: "B40",
  },
  {
    id: "q94",
    nome: "Q-9-4, duas cartas de valor",
    board: ["4h", "Qc", "9c"],
    size: "B40",
    estrategia: "split40",
    grupo: "B40",
    criterio: "Duas cartas altas e uma baixa tendem ao B40.",
  },
  {
    id: "t74",
    nome: "T-7-4, com flush draw",
    board: ["Th", "7h", "4c"],
    size: "B40",
    estrategia: "split40",
    grupo: "B40",
  },
  {
    id: "t84",
    nome: "T-8-4, sem flush draw",
    board: ["Ts", "8d", "4c"],
    size: "B40",
    estrategia: "split40",
    grupo: "B40",
    criterio:
      "Duas cartas acima do 8 e sem flush draw: B40. É leitura da resposta do autor, a confirmar com o coach.",
  },
  {
    id: "t83fd",
    nome: "T-8-3, com flush draw",
    board: ["Ts", "8s", "3d"],
    size: "B40",
    estrategia: "split40",
    grupo: "B40",
    criterio:
      "Com um 3 no lugar do 4 há menos interação: B40 mesmo com flush draw (coach, áudio de 04/11/2026).",
  },
  {
    id: "t82fd",
    nome: "T-8-2, com flush draw",
    board: ["Ts", "8s", "2d"],
    size: "B40",
    estrategia: "split40",
    grupo: "B40",
    criterio:
      "Com um 2 no lugar do 4 há menos interação: B40 mesmo com flush draw (coach, áudio de 04/11/2026).",
  },
  {
    id: "t42",
    nome: "T-4-2, high card",
    board: ["Td", "4c", "2h"],
    size: "B25",
    estrategia: "split25",
    grupo: "B25",
    criterio:
      "Uma carta alta e duas baixas (abaixo do 8x, que o SB quase não defende offsuit): size baixo, muito thin value, B25.",
  },
  {
    id: "j42",
    nome: "J-4-2, high card",
    board: ["Jh", "4d", "2c"],
    size: "B25",
    estrategia: "split25",
    grupo: "B25",
    criterio:
      "Uma carta alta e duas baixas (abaixo do 8x, que o SB quase não defende offsuit): size baixo, muito thin value, B25.",
  },
  {
    id: "aq3",
    nome: "A-Q-3, A high com flush draw",
    board: ["Ad", "Qd", "3c"],
    size: "B25",
    estrategia: "split25",
    grupo: "B25",
  },
  {
    id: "at3",
    nome: "A-T-3, A high com flush draw",
    board: ["As", "Tc", "3s"],
    size: "B25",
    estrategia: "split25",
    grupo: "B25",
    criterio:
      "A high com a segunda carta conectando e flush draw: B25 (trainer do time, 13/11/2026). Não é board dobrado: o 3 aparece só uma vez.",
  },
  {
    id: "q85",
    nome: "Q-8-5, semi conectado com flush draw",
    board: ["Qd", "8d", "5c"],
    size: "B70",
    estrategia: "split70",
    grupo: "B70",
    criterio:
      "O Q-8-5 permite menos thin value que o Q-8-3, e com flush draw o size é B70. Com o 3 no lugar do 5 (Q-8-3) é B40 (coach, 13/11/2026).",
  },
  {
    id: "832",
    nome: "8-3-2, low desconectado",
    board: ["8d", "2h", "3d"],
    size: "B40",
    estrategia: "split40",
    grupo: "B40",
    criterio:
      "O 8 é a carta mais alta, e o 8 não conta como baixa: B40, como o 8-4-2. B25 é só para uma carta acima do 8 e duas abaixo (Q-6-3, T-4-2) (trainer do time, 13/11/2026).",
  },
  {
    id: "a98",
    nome: "A-9-8, A high carregado",
    board: ["Ah", "9d", "8c"],
    size: "B25",
    estrategia: "split25",
    grupo: "B25",
  },
  {
    id: "ak2",
    nome: "A-K-2, A high seco",
    board: ["Ad", "Kh", "2c"],
    size: "B25",
    estrategia: "range",
    grupo: "Range",
  },
]

const R = "23456789TJQKA"
const rk = (c: string) => R.indexOf(c[0]) + 2

interface Resultado {
  bucket: number
  classe: string
  porque: string
}

// Buckets do guideline por board (IMG1) dos boards que o coach montou um a um. Mão que
// a tabela não cita devolve null.
function bucketImg1(
  b: BoardBBTreino,
  hero: [string, string],
  L: ReturnType<typeof ler>
): Resultado | null {
  const forca =
    L.feita === "topPair"
      ? forcaDoTopPair(b.board, hero, classesQueOBBRaisa())
      : null
  const draw = L.oesd || L.gutshot || L.flushDraw
  const bdsd = temBDSD(b.board, hero, draw)
  const air = L.feita === "nada" && !draw
  const airBD = air && L.bdfd && bdsd
  const set = ["setAlto", "setMeio", "setBaixo"].includes(L.feita)
  const nfd = L.feita === "nada" && L.nutFlushDraw
  const fdPior = L.feita === "nada" && L.flushDraw && !L.nutFlushDraw
  const res = (bucket: number, classe: string): Resultado => ({
    bucket,
    classe,
    porque: `${classe} vai em ${bucket}% neste board (guideline por board).`,
  })
  const doisOuOP =
    L.feita === "doisPares"
      ? "Dois pares"
      : L.feita === "overpair"
        ? "Overpair"
        : ""

  switch (b.img1) {
    case "alto70":
      if (doisOuOP) return res(75, doisOuOP)
      if (forca === "forte") return res(75, "Top pair forte")
      if (forca === "medio") return res(50, "Top pair")
      if (forca === "fraco") return res(25, "Top pair fraco")
      if (nfd) return res(50, "Nut flush draw")
      if (set) return res(25, "Trinca")
      if (L.feita === "secondPair") return res(25, "Segundo par")
      if (L.feita === "underpair") return res(0, "Underpair")
      if (fdPior) return res(25, "Flush draw")
      if (airBD) return res(25, "Air com BDFD e BDST")
      return null
    case "conectado40":
      if (L.feita === "sequencia") return res(75, "Sequência")
      if (doisOuOP) return res(75, doisOuOP)
      if (forca === "forte") return res(75, "Top pair forte")
      if (set) return res(50, "Trinca")
      if (forca) return res(50, "Top pair")
      if (nfd) return res(50, "Nut flush draw")
      if (L.feita === "secondPair") return res(25, "Segundo par")
      if (L.feita === "underpair") return res(0, "Underpair")
      if (fdPior) return res(25, "Flush draw")
      if (airBD) return res(25, "Air com BDFD e BDST")
      return null
    case "high40":
      if (doisOuOP) return res(75, doisOuOP)
      if (forca === "forte") return res(75, "Top pair forte")
      if (set) return res(50, "Trinca")
      if (forca) return res(50, "Top pair")
      if (nfd) return res(50, "Nut flush draw")
      if (L.feita === "secondPair") return res(25, "Segundo par")
      if (L.feita === "thirdPair") return res(25, "Terceiro par")
      if (L.feita === "underpair") return res(0, "Underpair")
      if (fdPior) return res(25, "Flush draw")
      if (airBD) return res(25, "Air com BDFD e BDST")
      return null
    case "low":
      if (doisOuOP) return res(100, doisOuOP)
      if (set) return res(75, "Trinca")
      if (forca) return res(75, "Top pair")
      if (air) return res(75, "Air")
      if (L.feita === "secondPair") return res(50, "Segundo par")
      if (L.feita === "thirdPair") return res(50, "Terceiro par")
      if (L.feita === "nada" && draw) return res(50, "Draw")
      if (L.feita === "underpair")
        return b.size === "B40" ? res(0, "Underpair") : res(50, "Underpair")
      return null
    case "mono": {
      if (set || doisOuOP) return res(75, set ? "Trinca" : doisOuOP)
      if (L.feita === "flush") return res(50, "Flush")
      if (forca === "forte") return res(50, "Top pair forte")
      if (forca) return res(25, "Top pair")
      if (L.feita === "secondPair") return res(25, "Segundo par")
      if (air) {
        const rs = hero.map(rk)
        return rs.includes(14) && rs.includes(13)
          ? res(25, "A-K high")
          : res(50, "Air")
      }
      return null
    }
    default:
      return null
  }
}

export function bucketBB(
  b: BoardBBTreino,
  hero: [string, string]
): Resultado | null {
  if (b.estrategia === "range")
    return {
      bucket: 100,
      classe: "Qualquer mão",
      porque: "É range bet: o range inteiro aposta em B25.",
    }

  if (b.estrategia === "dobradoConectado") {
    const cont: Record<number, number> = {}
    for (const c of [...b.board, ...hero]) cont[rk(c)] = (cont[rk(c)] ?? 0) + 1
    return Object.values(cont).some((n) => n >= 3)
      ? {
          bucket: 75,
          classe: "Trinca ou melhor",
          porque: "No dobrado conectado trinca, full e quadra vão em 75%.",
        }
      : {
          bucket: 50,
          classe: "Todo o restante",
          porque: "No dobrado conectado o restante do range vai em 50%.",
        }
  }

  const L = ler(b.board, hero)
  // No monotone, a mão com uma carta do naipe tem flush draw, e a tabela não a cobre.
  if (b.monotone && hero.filter((c) => c[1] === b.board[0][1]).length === 1)
    return null
  const comPar = ["topPair", "secondPair", "thirdPair", "underpair"].includes(
    L.feita
  )
  if (comPar && (L.oesd || L.gutshot || L.flushDraw)) return null
  if (b.img1) return bucketImg1(b, hero, L)
  if (L.feita === "sequencia" || L.feita === "flush") return null
  const draw = L.oesd || L.gutshot || L.flushDraw
  const topPair = L.feita === "topPair"
  const forte = topPair
    ? forcaDoTopPair(b.board, hero, classesQueOBBRaisa()) === "forte"
    : false
  const tabela = b.estrategia
  const nomeTabela =
    tabela === "split25" ? "B25" : tabela === "split40" ? "B40" : "B70"
  const res = (bucket: number, classe: string): Resultado => ({
    bucket,
    classe,
    porque: `${classe} vai em ${bucket}% no split ${nomeTabela}.`,
  })

  if (tabela === "split25") {
    if (L.feita === "overpair") return res(100, "Overpair")
    if (L.feita === "setBaixo" || L.feita === "setMeio")
      return res(100, "Trinca (menos o top set)")
    if (L.feita === "setAlto") return res(75, "Top set")
    if (L.feita === "doisPares") return res(75, "Dois pares")
    if (topPair) return res(75, "Top pair")
    if (L.feita === "nada" && L.flushDraw) return res(75, "Flush draw")
    if (draw) return null
    const nome: Record<string, string> = {
      secondPair: "Segundo par",
      thirdPair: "Terceiro par",
      underpair: "Underpair",
      nada: "Air",
    }
    return res(50, nome[L.feita] ?? "Todo o restante")
  }

  if (tabela === "split40") {
    if (L.feita === "overpair") return res(75, "Overpair")
    if (["setAlto", "setMeio", "setBaixo"].includes(L.feita))
      return res(75, "Trinca")
    if (L.feita === "doisPares") return res(75, "Dois pares")
    if (topPair) return forte ? res(75, "Top pair forte") : res(50, "Top pair")
    if (L.feita === "underpair") return res(0, "Underpair")
    if (L.feita === "nada" && L.flushDraw) return res(75, "Flush draw")
    if (draw) return null
    const nome: Record<string, string> = {
      secondPair: "Segundo par",
      thirdPair: "Terceiro par",
      nada: "Air",
    }
    return res(25, nome[L.feita] ?? "Todo o restante")
  }

  // split B70
  if (L.feita === "overpair") return res(75, "Overpair")
  if (topPair) return forte ? res(75, "Top pair forte") : res(50, "Top pair")
  // Sizes muito altos: a prioridade são as mãos fortes e vulneráveis (dois pares,
  // overpair e top pair forte), e as trincas bloqueiam os pares (coach).
  if (L.feita === "doisPares") return res(75, "Dois pares")
  if (L.feita === "underpair") return res(0, "Underpair")
  // No B70 as trincas vão em 25%: o top set bloqueia quem paga (guideline por board).
  if (["setAlto", "setMeio", "setBaixo"].includes(L.feita))
    return res(25, "Trinca")
  // Os melhores draws (aqui, o flush draw) vão em 50%.
  if (L.feita === "nada" && L.flushDraw) return res(50, "Flush draw")
  if (draw) return null
  const nome: Record<string, string> = {
    secondPair: "Segundo par",
    thirdPair: "Terceiro par",
    nada: "Air",
  }
  return res(25, nome[L.feita] ?? "Todo o restante")
}

// ---------- geração ----------

export interface SituacaoBB {
  id: string
  boardId: string
  boardNome: string
  grupo: GrupoBB
  board: string[]
  hero: [string, string]
  size: SizeBB
  estrategia: EstrategiaBB
  bucket: number
  classe: string
  porque: string
  freq?: number
  criterio?: string
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

function gerar(): SituacaoBB[] {
  const maos = todasAsMaos()
  const lista: SituacaoBB[] = []
  for (const b of BOARDS_BB) {
    const grupos = new Map<string, SituacaoBB[]>()
    for (const m of maos) {
      if (m.some((c) => b.board.includes(c))) continue
      if (!bbRaisa(m)) continue
      const r = bucketBB(b, m)
      if (!r) continue
      const chave = `${r.classe}|${r.bucket}`
      const sit: SituacaoBB = {
        id: `bb17-${b.id}-${m[0]}${m[1]}`,
        boardId: b.id,
        boardNome: b.nome,
        grupo: b.grupo,
        board: b.board,
        hero: m,
        size: b.size,
        estrategia: b.estrategia,
        bucket: r.bucket,
        classe: r.classe,
        porque: `${r.porque} (${classeDaMao(m)})`,
        freq: b.freq,
        criterio: b.criterio,
      }
      const g = grupos.get(chave) ?? []
      g.push(sit)
      grupos.set(chave, g)
    }
    for (const [chave, g] of grupos) {
      const rnd = semente(b.id + chave)
      const copia = g.slice()
      for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(rnd() * (i + 1))
        ;[copia[i], copia[j]] = [copia[j], copia[i]]
      }
      lista.push(...copia.slice(0, b.estrategia === "range" ? 4 : 2))
    }
  }
  return lista
}

export const situacoesBB: SituacaoBB[] = gerar()
