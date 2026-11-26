export type Suit = "s" | "h" | "d" | "c"
export type CardCode = string

export type TipoId = "conectado" | "semi" | "seco" | "monotone" | "dobrado"
export type Size = "B25" | "B50"

export interface Bucket {
  p: number
  maos: string
  grupo?: string
}

export interface Tipo {
  id: TipoId
  nome: string
  size: Size
  exemplo: CardCode[]
  criterio: string
  nota: string
  buckets: Bucket[]
  blocos?: { grupo: string; rotulo: string; codes: CardCode[] }[]
}

export interface Situacao {
  id: string
  tipo: TipoId
  board: CardCode[]
  hero: CardCode[]
  classe: string
  bucket: number
  porque: string
}

export interface RefBoard {
  b: CardCode[]
  t: TipoId
  fixo: boolean
}

export const mod15 = {
  id: "15",
  slug: "bet-vs-missed",
  nome: "Bet vs Missed C-Bet",
  spot: "Pote single raised · você em posição · o agressor deu check no flop",
  fonte: "theory/15-Bet-vs-Missed (guideline, regras, solver e 12-Padroes)",

  em30: [
    "Frequência de cada mão: 100%, 75%, 50% ou 25%. As mais fortes vão nas frequências mais altas, e as mais fracas nas mais baixas.",
    "Nenhum board se aposta 100%: o agressor que deu check não está capado.",
    "Só dois sizes: B25 e B50. B25 quando você quer thin value (muitas mãos apostando), B50 quando não quer.",
    "Size: acompanha o grupo de mãos que você aposta, e não a sua mão.",
    "Classifique o board: conectado high, semi conectado, seco, monotone ou dobrado.",
    "Pior trinca: vai em 100% nos boards que têm bucket de 100% (semi conectado e seco).",
    "Para sortear: use o naipe do board (mais equity) ou um randomizador, sempre com a mão inteira.",
  ],

  tipos: [
    {
      id: "conectado",
      nome: "Conectado high",
      size: "B50",
      exemplo: ["As", "Kh", "Td"],
      criterio:
        "Cartas encadeadas (altas, ou baixas contra um opener que acerta quase tudo), com muitas sequências e draws. Não existe bucket de 100%.",
      nota: "Frequência média de aposta: cerca de 30% a 35%.",
      buckets: [
        { p: 75, maos: "Sequência e flush draw nuts" },
        {
          p: 50,
          maos: "Trincas, dois pares, TP forte, duas pontas, BDFD + BDSD",
        },
        {
          p: 25,
          maos: "TP médio e fraco, segundo par, terceiro par, underpair, air, gutshot",
        },
      ],
    },
    {
      id: "semi",
      nome: "Semi conectado",
      size: "B50",
      exemplo: ["Js", "9h", "6c"],
      criterio:
        "O range do opener acerta muito o board: por cartas altas (A-K-2), por cartas médias conectadas (J-9-6) ou por boards baixos conectados (7-6-5, 6-5-4).",
      nota: "A pior trinca, o top two pair e o overpair vão em 100%.",
      buckets: [
        { p: 100, maos: "Pior trinca, top two pair e overpair" },
        { p: 75, maos: "Dois pares, TP forte, sequência" },
        {
          p: 50,
          maos: "TP médio, underpair, flush draw, duas pontas, gutshot, BDFD + BDSD",
        },
        { p: 25, maos: "TP fraco, segundo par, terceiro par, air" },
      ],
    },
    {
      id: "seco",
      nome: "Seco",
      size: "B25",
      exemplo: ["Qs", "5h", "3c"],
      criterio:
        "Poucas cartas altas, com gaps amplos e poucas possibilidades de gutshot e duas pontas (T-6-2, K-7-4). Quanto mais baixo o board e maiores os gaps, mais seco. Pelos exemplos do trainer do coach, também são secos T-7-3, T-7-5, 8-3-2, 8-7-2, 9-8-2, 9-6-4, 9-5-4 e 9-6-2.",
      nota: "Frequência média de 55% a 65%. Não existe bucket de 25%. A top trinca vai em 75% porque bloqueia o valor que você sempre dá check.",
      buckets: [
        { p: 100, maos: "Overpair e trincas (menos a top trinca)" },
        { p: 75, maos: "Dois pares, TP e a top trinca" },
        { p: 50, maos: "Todo o restante" },
      ],
    },
    {
      id: "monotone",
      nome: "Monotone",
      size: "B25",
      exemplo: ["As", "9s", "8s"],
      criterio: "Três cartas do mesmo naipe.",
      nota: "O valor não vem do raise no turn: aposte os melhores flushes e dê check com os piores, o que induz blefes.",
      buckets: [
        { p: 75, maos: "Trinca e BDSD" },
        {
          p: 50,
          maos: "Flush, dois pares, top pair, flush draw, duas pontas e gutshot",
        },
        { p: 25, maos: "Todo o restante" },
      ],
    },
    {
      id: "dobrado",
      nome: "Dobrado",
      size: "B25",
      exemplo: ["Ks", "Kh", "7c"],
      criterio:
        "Board pareado, sempre. Seco: a terceira carta não forma sequência nem flush draw com o par (K-K-2, J-3-3, 8-8-4, 7-7-3). Carregado: forma (K-K-J, J-J-9).",
      nota: "O subtipo do K-K-7 como seco é inferência.",
      blocos: [
        { grupo: "Seco", rotulo: "Seco", codes: ["Ks", "Kh", "7c"] },
        {
          grupo: "Carregado",
          rotulo: "Carregado, com flush draw",
          codes: ["Kd", "Kh", "Jd"],
        },
      ],
      buckets: [
        { p: 75, grupo: "Seco", maos: "Fulls e trincas" },
        { p: 50, grupo: "Seco", maos: "Todo o restante" },
        { p: 50, grupo: "Carregado", maos: "Mãos com mais equity" },
        { p: 25, grupo: "Carregado", maos: "Todo o restante" },
      ],
    },
  ] as Tipo[],

  pocket: [
    "Mãos mais fortes nos buckets mais altos.",
    "Nenhum board se aposta 100%.",
    "Só B25 e B50.",
    "Thin value pede B25, e a falta dele pede B50.",
    "A pior trinca vai em 100% onde existe bucket de 100%.",
    "Segundo e terceiro par: ficam em 25% (e 50% nos boards secos).",
    "Pocket pairs: acima de todas as cartas é overpair. No J-9-6, TT é segundo par, 77 é terceiro par e só 55 é underpair.",
    "Draw no meio: o com backdoor aposta, o sem dá check.",
    "Naipe do board ou randomizador, sempre com a mão inteira.",
    "Turn e river: não se frequenciam, seguem o que você já faz.",
  ],

  refBoards: [
    { b: ["As", "Kh", "Td"], t: "conectado", fixo: true },
    { b: ["Qs", "Jh", "Td"], t: "conectado", fixo: false },
    { b: ["Ad", "Kh", "2c"], t: "semi", fixo: false },
    { b: ["Js", "9h", "6c"], t: "semi", fixo: true },
    { b: ["7s", "6h", "5c"], t: "semi", fixo: false },
    { b: ["Qs", "5h", "3c"], t: "seco", fixo: true },
    { b: ["Kd", "7h", "4c"], t: "seco", fixo: false },
    { b: ["Td", "6h", "2c"], t: "seco", fixo: false },
    { b: ["9d", "6h", "2c"], t: "seco", fixo: false },
    { b: ["9s", "8h", "2c"], t: "seco", fixo: false },
    { b: ["9h", "6s", "4c"], t: "seco", fixo: false },
    { b: ["9c", "5h", "4d"], t: "seco", fixo: false },
    { b: ["As", "9s", "8s"], t: "monotone", fixo: true },
    { b: ["Ks", "Kh", "7c"], t: "dobrado", fixo: true },
    { b: ["Kd", "Kh", "Jc"], t: "dobrado", fixo: false },
    { b: ["8c", "8h", "4d"], t: "dobrado", fixo: false },
    { b: ["7h", "7c", "3s"], t: "dobrado", fixo: false },
  ] as RefBoard[],

  // Só para a tela da teoria: o treino (situacoes) não usa estes exemplos.
  // Board de referência do dobrado seco: K♠ K♥ 7♣.
  exemplosDobrado: [
    { id: "dob-1", grupo: "Seco", p: 75, classe: "Full", hero: ["7h", "7d"] },
    {
      id: "dob-2",
      grupo: "Seco",
      p: 75,
      classe: "Trincas",
      hero: ["Kd", "Qc"],
    },
    {
      id: "dob-3",
      grupo: "Seco",
      p: 50,
      classe: "Todo o restante",
      hero: ["Ad", "Qd"],
    },
    {
      id: "dob-4",
      grupo: "Carregado",
      p: 50,
      classe: "Mãos com mais equity",
      hero: ["Qd", "Td"],
    },
    {
      id: "dob-5",
      grupo: "Carregado",
      p: 25,
      classe: "Todo o restante",
      hero: ["9c", "8c"],
    },
  ] as {
    id: string
    grupo: string
    p: number
    classe: string
    hero: CardCode[]
  }[],

  situacoes: [
    {
      id: "seco-1",
      tipo: "seco",
      board: ["Qs", "5h", "3c"],
      hero: ["Ad", "Ac"],
      classe: "Overpair",
      bucket: 100,
      porque: "Overpair vai em 100% no seco.",
    },
    {
      id: "seco-2",
      tipo: "seco",
      board: ["Qs", "5h", "3c"],
      hero: ["5d", "5c"],
      classe: "Trinca de 5",
      bucket: 100,
      porque: "Trinca que não é a top trinca vai em 100% no seco.",
    },
    {
      id: "seco-3",
      tipo: "seco",
      board: ["Qs", "5h", "3c"],
      hero: ["Qd", "Qc"],
      classe: "Top trinca",
      bucket: 75,
      porque:
        "A top trinca vai em 75%: ela bloqueia o valor que você sempre dá check.",
    },
    {
      id: "seco-4",
      tipo: "seco",
      board: ["Qs", "5h", "3c"],
      hero: ["Qd", "Jd"],
      classe: "Top pair",
      bucket: 75,
      porque: "Top pair vai em 75% no seco.",
    },
    {
      id: "seco-5",
      tipo: "seco",
      board: ["Qs", "5h", "3c"],
      hero: ["5d", "3d"],
      classe: "Dois pares",
      bucket: 75,
      porque: "Dois pares vão em 75% no seco.",
    },
    {
      id: "seco-6",
      tipo: "seco",
      board: ["Qs", "5h", "3c"],
      hero: ["2d", "2c"],
      classe: "Underpair",
      bucket: 50,
      porque: "Todo o restante vai em 50% no seco: não existe bucket de 25%.",
    },
    {
      id: "seco-7",
      tipo: "seco",
      board: ["Qs", "5h", "3c"],
      hero: ["Kd", "Jd"],
      classe: "Uma overcard (K), sem par",
      bucket: 50,
      porque: "Todo o restante vai em 50% no seco: não existe bucket de 25%.",
    },

    {
      id: "semi-1",
      tipo: "semi",
      board: ["Js", "9h", "6c"],
      hero: ["Ad", "Ac"],
      classe: "Overpair",
      bucket: 100,
      porque: "Overpair vai em 100% no semi conectado.",
    },
    {
      id: "semi-2",
      tipo: "semi",
      board: ["Js", "9h", "6c"],
      hero: ["6d", "6s"],
      classe: "Pior trinca (trinca de 6)",
      bucket: 100,
      porque: "A pior trinca vai em 100% nos boards que têm bucket de 100%.",
    },
    {
      id: "semi-3",
      tipo: "semi",
      board: ["Js", "9h", "6c"],
      hero: ["Jd", "9d"],
      classe: "Top two pair",
      bucket: 100,
      porque: "Top two pair vai em 100% no semi conectado.",
    },
    {
      id: "semi-4",
      tipo: "semi",
      board: ["Js", "9h", "6c"],
      hero: ["9d", "6d"],
      classe: "Dois pares",
      bucket: 75,
      porque: "Dois pares (que não são o top two) vão em 75%.",
    },
    {
      id: "semi-5",
      tipo: "semi",
      board: ["Js", "9h", "6c"],
      hero: ["5d", "5c"],
      classe: "Underpair",
      bucket: 50,
      porque: "Underpair vai em 50% no semi conectado.",
    },
    {
      id: "semi-6",
      tipo: "semi",
      board: ["Js", "9h", "6c"],
      hero: ["Ad", "6d"],
      classe: "Terceiro par",
      bucket: 25,
      porque: "Terceiro par vai em 25% no semi conectado.",
    },
    {
      id: "semi-7",
      tipo: "semi",
      board: ["Js", "9h", "6c"],
      hero: ["Ad", "5d"],
      classe: "Air",
      bucket: 25,
      porque: "Air vai em 25% no semi conectado.",
    },

    {
      id: "mono-1",
      tipo: "monotone",
      board: ["As", "9s", "8s"],
      hero: ["Ad", "Ac"],
      classe: "Trinca de ases",
      bucket: 75,
      porque: "Trinca vai em 75% no monotone.",
    },
    {
      id: "mono-2",
      tipo: "monotone",
      board: ["As", "9s", "8s"],
      hero: ["Ks", "Qs"],
      classe: "Flush",
      bucket: 50,
      porque:
        "Flush vai em 50% no monotone: os melhores flushes apostam e os piores dão check.",
    },
    {
      id: "mono-3",
      tipo: "monotone",
      board: ["As", "9s", "8s"],
      hero: ["Ad", "Kd"],
      classe: "Top pair",
      bucket: 50,
      porque: "Top pair vai em 50% no monotone.",
    },
    {
      id: "mono-4",
      tipo: "monotone",
      board: ["As", "9s", "8s"],
      hero: ["7d", "6d"],
      classe: "Duas pontas",
      bucket: 50,
      porque: "Duas pontas vão em 50% no monotone.",
    },
    {
      id: "mono-5",
      tipo: "monotone",
      board: ["As", "9s", "8s"],
      hero: ["9d", "8d"],
      classe: "Dois pares",
      bucket: 50,
      porque: "Dois pares vão em 50% no monotone.",
    },
    {
      id: "mono-6",
      tipo: "monotone",
      board: ["As", "9s", "8s"],
      hero: ["5d", "5c"],
      classe: "Underpair",
      bucket: 25,
      porque: "Todo o restante vai em 25% no monotone.",
    },

    {
      id: "conec-1",
      tipo: "conectado",
      board: ["As", "Kh", "Td"],
      hero: ["Qd", "Jd"],
      classe: "Sequência",
      bucket: 75,
      porque: "Sequência vai em 75% no conectado high.",
    },
    {
      id: "conec-2",
      tipo: "conectado",
      board: ["As", "Kh", "Td"],
      hero: ["Tc", "Ts"],
      classe: "Trinca de dez",
      bucket: 50,
      porque:
        "Trinca vai em 50% no conectado high: aqui não existe bucket de 100%.",
    },
    {
      id: "conec-3",
      tipo: "conectado",
      board: ["As", "Kh", "Td"],
      hero: ["Ad", "Kd"],
      classe: "Dois pares",
      bucket: 50,
      porque: "Dois pares vão em 50% no conectado high.",
    },
    {
      id: "conec-4",
      tipo: "conectado",
      board: ["As", "Kh", "Td"],
      hero: ["7c", "6c"],
      classe: "Air",
      bucket: 25,
      porque: "Air vai em 25% no conectado high.",
    },
  ] as Situacao[],
}

export const tipoById = Object.fromEntries(
  mod15.tipos.map((t) => [t.id, t])
) as Record<TipoId, Tipo>
