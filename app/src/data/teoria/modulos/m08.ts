import type { AbaT, MaoEx, ModuloTeoria } from "@/data/teoria/tipos"
import type { CardCode } from "@/data/mod15"

interface Grupo {
  texto: string
  maos: MaoEx[]
}

function split(
  id: string,
  nome: string,
  criterio: string,
  etiqueta: string,
  cartas: CardCode[],
  rotulo: string,
  valor: Grupo,
  bluff: Grupo,
  checkCall: Grupo,
  checkRaise: Grupo,
  checkFold?: Grupo,
  nota?: string
): AbaT {
  return {
    id,
    nome,
    criterio,
    nota,
    blocos: [
      {
        cartas,
        rotulo,
        etiqueta: { texto: etiqueta, cor: "vermelho" },
        acoes: [
          { nome: "Bet por valor", cor: "verde", ...valor },
          { nome: "Bet de bluff", cor: "amarelo", ...bluff },
          { nome: "Check-call", cor: "branco", ...checkCall },
          { nome: "Check-raise", cor: "vermelho", ...checkRaise },
          ...(checkFold
            ? [{ nome: "Check-fold", cor: "vermelho" as const, ...checkFold }]
            : []),
        ],
      },
    ],
  }
}

const m08: ModuloTeoria = {
  slug: "3bet-pot",
  tema: [
    "3Bet Pot IP",
    "3Bet Pot OOP no SB",
    "3Bet Pot OOP no BB Short",
    "3Bet Pot OOP no BB Deep",
  ],
  nome: "3Bet Pot",
  spot: "Pote 3betado · BB que deu 3bet contra o open do BTN, fora de posição no flop · short stack e deep stack",
  tags: ["Flop e turn", "BB OOP", "Short e deep"],
  secoes: [
    {
      tipo: "lista",
      titulo: "Em 30 segundos",
      itens: [
        "BB e SB não se misturam: o range do BB é mais polarizado, aposta menos e realiza menos equity fora de posição. A aula é só do BB.",
        "Stack define a árvore: até 30bb é short, 60bb ou mais é deep. Entre 30 e 60bb é uma mistura, e o stack do exemplo decide.",
        "Ordem do size: primeiro o valor (qual size extrai o máximo), depois os bluffs que acompanham esse size, e por último o check.",
        "Short stack: seco, monotone e dobrado em B25 com o range. Carregado sem sequência em B40, split. Com sequência, all-in em split.",
        "Deep stack: seco, monotone e dobrado em B25. Com sequência, B40 em split. Tx, Jx e 98x com flush draw, B70 em split.",
        "Check com plano: toda mão boa que dá check já sabe se vai para check-call ou check-shove. Par e draw direto não foldam.",
        "Size alto pede mão forte: quanto maior o size, mais restritos ficam o valor e o bluff.",
      ],
    },
    {
      tipo: "cartoes",
      titulo: "Spot da aula",
      intro:
        "O BTN abre 2bb, o BB dá 3bet de 6,5bb a 7bb e o BTN paga. O pote no flop fica entre 13 e 15,5bb.",
      colunas: 3,
      itens: [
        {
          etiqueta: { texto: "Até 30bb", cor: "vermelho" },
          titulo: "Short stack",
          textos: [
            "SPR baixo e menos streets.",
            "Qualquer par já tem equity para o stack.",
            "Três estratégias: B25, B40 e all-in.",
          ],
        },
        {
          etiqueta: { texto: "30 a 60bb", cor: "amarelo" },
          titulo: "Middle stack",
          textos: [
            "Não tem árvore própria: é uma mistura.",
            "Perto de 30bb, joga como short.",
            "Perto de 60bb, joga como deep.",
          ],
        },
        {
          etiqueta: { texto: "60bb ou mais", cor: "verde" },
          titulo: "Deep stack",
          textos: [
            "SPR alto: o board muda muito nas próximas streets.",
            "O all-in deixa de servir.",
            "Três estratégias: B25, B40 e B70.",
          ],
        },
      ],
    },
    {
      tipo: "cartoes",
      titulo: "Como escolher o size no short",
      intro:
        "As três perguntas do instrutor. Se o rival não folda os pares para o all-in, o all-in extrai o máximo. Surgindo a dúvida, a estratégia passa para o size.",
      colunas: 3,
      itens: [
        {
          etiqueta: { texto: "B25", cor: "claro" },
          titulo: "Range bet",
          texto:
            "Vantagem absoluta: o rival tem pouca interação com o board, o valor não precisa de proteção e há muito fold.",
          cartas: ["Ad", "8s", "2c"],
        },
        {
          etiqueta: { texto: "B40", cor: "vermelho" },
          titulo: "Split",
          texto:
            "O range precisa de split e o valor não precisa de proteção.",
          cartas: ["Jc", "9h", "4h"],
        },
        {
          etiqueta: { texto: "All-in", cor: "verde" },
          titulo: "Split",
          texto:
            "O valor precisa de proteção e o range não perde ao colocar tudo: ninguém folda J-x, T-x nem 7-x com redraw.",
          cartas: ["Js", "Td", "7d"],
        },
      ],
    },
    {
      tipo: "boards",
      titulo: "Boards da aula: short stack",
      intro: "Exercício 1 da aula, com 25bb.",
      itens: [
        {
          cartas: ["Ad", "8s", "2c"],
          etiqueta: { texto: "B25", cor: "claro" },
          nome: "A-8-2, seco",
          nota: "Range bet.",
        },
        {
          cartas: ["Ks", "7d", "2c"],
          etiqueta: { texto: "B25", cor: "claro" },
          nome: "K-7-2, seco",
          nota: "Range bet.",
        },
        {
          cartas: ["Jc", "6h", "4s"],
          etiqueta: { texto: "B25", cor: "claro" },
          nome: "J-6-4, seco",
          nota: "O rival tem pouca interação: range bet, sem split.",
        },
        {
          cartas: ["As", "Ts", "8s"],
          etiqueta: { texto: "B25", cor: "claro" },
          nome: "A-T-8, monotone",
          nota: "Muitas mãos suited do rival ficam com um naipe só.",
        },
        {
          cartas: ["Qs", "8d", "6c"],
          etiqueta: { texto: "B40", cor: "vermelho" },
          nome: "Q-8-6, carregado",
          nota: "Split B40.",
        },
        {
          cartas: ["Jc", "9h", "4h"],
          etiqueta: { texto: "B40", cor: "vermelho" },
          nome: "J-9-4, carregado sem sequência",
          nota: "O B25 muda o nuts, o all-in sobra para o valor e o B70 equivale ao all-in.",
        },
        {
          cartas: ["Js", "Td", "7d"],
          etiqueta: { texto: "All-in", cor: "verde" },
          nome: "J-T-7, com sequência",
          nota: "Split all-in.",
        },
        {
          cartas: ["8s", "7d", "6c"],
          etiqueta: { texto: "All-in", cor: "verde" },
          nome: "8-7-6, com sequência",
          nota: "Split all-in.",
        },
        {
          cartas: ["9d", "8s", "6c"],
          etiqueta: { texto: "All-in", cor: "verde" },
          nome: "9-8-6, com sequência",
          nota: "Split all-in.",
        },
      ],
    },
    {
      tipo: "boards",
      titulo: "Boards da aula: deep stack",
      intro:
        "Exercício 5 da aula, com 60bb ou mais. Monotone e dobrado também vão em B25. Quanto mais deep, mais B70. Quanto mais raso, mais B40.",
      itens: [
        {
          cartas: ["Ks", "8d", "2c"],
          etiqueta: { texto: "B25", cor: "claro" },
          nome: "K-8-2, seco",
          nota: "B25.",
        },
        {
          cartas: ["Qc", "7h", "3d"],
          etiqueta: { texto: "B25", cor: "claro" },
          nome: "Q-7-3, seco",
          nota: "B25.",
        },
        {
          cartas: ["As", "9d", "4c"],
          etiqueta: { texto: "B25", cor: "claro" },
          nome: "A-9-4, seco",
          nota: "B25.",
        },
        {
          cartas: ["5c", "5h", "2s"],
          etiqueta: { texto: "B25", cor: "claro" },
          nome: "5-5-2, dobrado",
          nota: "B25 com o range.",
        },
        {
          cartas: ["Ks", "9d", "7c"],
          etiqueta: { texto: "B40", cor: "vermelho" },
          nome: "K-9-7, interage mais",
          nota: "Seco que interage mais com o rival vai para B40.",
        },
        {
          cartas: ["Ts", "9d", "8c"],
          etiqueta: { texto: "B40", cor: "vermelho" },
          nome: "T-9-8, com sequência",
          nota: "Split B40.",
        },
        {
          cartas: ["8s", "7d", "6c"],
          etiqueta: { texto: "B40", cor: "vermelho" },
          nome: "8-7-6, com sequência",
          nota: "No short era all-in. No deep vira B40.",
        },
        {
          cartas: ["9s", "8h", "2s"],
          etiqueta: { texto: "B70", cor: "verde" },
          nome: "9-8-2, 98x com flush draw",
          nota: "Split B70.",
        },
        {
          cartas: ["Js", "7d", "2s"],
          etiqueta: { texto: "B70", cor: "verde" },
          nome: "J-7-2, Jx com flush draw",
          nota: "Sem o flush draw, o Tx e o Jx podem ir para B40.",
        },
      ],
    },
    {
      tipo: "abas",
      titulo: "Os splits do BB",
      intro:
        "O que cada mão faz em cada split. No short, as mãos são as dos exercícios da aula.",
      abas: [
        split(
          "short-b40",
          "Short: B40",
          "Board carregado sem sequência. O valor não precisa de proteção, e o bluff sai de draws diretos e de mãos com BDFD + BDST, só com o naipe do board.",
          "B40",
          ["Jc", "9h", "4h"],
          "J-9-4 com dois de copas (aula)",
          {
            texto: "Top pair ou melhor, com os primeiros overpairs.",
            maos: [
              { nome: "Overpair", cartas: ["Ac", "As"] },
              { nome: "Top pair", cartas: ["Ac", "Jd"] },
            ],
          },
          {
            texto:
              "Draws diretos e mãos com BDFD + BDST, só com o naipe do board.",
            maos: [{ nome: "K♥: BDFD + BDST", cartas: ["Kh", "5c"] }],
          },
          {
            texto:
              "Trincas (bloqueiam quem paga), qualquer par que não seja top pair, qualquer draw e valor de showdown (A-K, A-Q). Dois pares fazem slow play.",
            maos: [
              { nome: "Trinca", cartas: ["Js", "Jd"] },
              { nome: "Par", cartas: ["Tc", "Td"] },
            ],
          },
          {
            texto:
              "Check-shove com os overpairs que deram check e os combo draws. No A♥K♥, o check-call também serve.",
            maos: [{ nome: "Combo draw", cartas: ["Ah", "Kh"] }],
          },
          {
            texto: "O que não cai em nada acima, como K5 sem o naipe do board.",
            maos: [{ nome: "Sem o naipe do board", cartas: ["Kc", "5d"] }],
          }
        ),
        split(
          "short-allin",
          "Short: all-in",
          "Board com sequência. O valor vai all-in, porque o rival não folda par, e o bluff precisa de equity direta.",
          "All-in",
          ["Js", "Td", "7d"],
          "J-T-7 com dois de ouros (aula)",
          {
            texto:
              "Os primeiros overpairs e os top pairs. O top pair sem o naipe do board desbloqueia os draws e toma call de pior.",
            maos: [{ nome: "Top pair", cartas: ["Ac", "Jc"] }],
          },
          {
            texto:
              "Flush draws, duas pontas e ás-alta com broca e BDFD.",
            maos: [{ nome: "Broca, overcard e BDFD", cartas: ["As", "9s"] }],
          },
          {
            texto:
              "Trincas, sequências, pares, brocas com redraw e valor de showdown (A-K, A-Q off).",
            maos: [
              { nome: "Trinca: bloqueia os T", cartas: ["Tc", "Th"] },
              { nome: "Valor de showdown", cartas: ["Ah", "Kc"] },
            ],
          },
          {
            texto:
              "Check-shove com overpairs e combo draws. Quanto mais vulnerável a mão que deu check, mais ela vai para o check-shove.",
            maos: [
              { nome: "Overpair", cartas: ["Qc", "Qh"] },
              { nome: "Top pair + nut flush draw", cartas: ["Ad", "Jd"] },
            ],
          },
          {
            texto: "Sem par, sem draw direto e sem o naipe do board.",
            maos: [{ nome: "K-6 off", cartas: ["Kc", "6h"] }],
          },
          "Overpair no all-in: a guideline da aula põe os primeiros overpairs no valor e também no check-raise, e o Q-Q da aula foi para o check-shove. Qual aposta e qual dá check-shove ainda está em aberto."
        ),
        split(
          "deep-b40",
          "Deep: B40",
          "Board com sequência. O all-in deixa de servir: isola o BB contra um range forte e o deixa sem ação quando vem 9, T ou o board pareia.",
          "B40",
          ["Js", "Td", "7d"],
          "J-T-7 deep (aula; mãos montadas pela regra)",
          {
            texto:
              "Todos os overpairs, top pairs que conectam ou com kicker extra, e a trinca de baixo.",
            maos: [
              { nome: "Overpair", cartas: ["Qc", "Qh"] },
              { nome: "Top pair, kicker extra", cartas: ["Jh", "9c"] },
              { nome: "Trinca de baixo", cartas: ["7h", "7c"] },
            ],
          },
          {
            texto:
              "Equity direta: duas pontas, brocas com flush draw e BDFD + BDST.",
            maos: [{ nome: "Duas pontas", cartas: ["Kc", "Qh"] }],
          },
          {
            texto:
              "Top set (bloqueia quem paga), sequência com flush draw, qualquer par e draws diretos. A-K e A-Q só com redraw.",
            maos: [
              { nome: "Top set", cartas: ["Jh", "Jc"] },
              { nome: "Sequência + flush draw", cartas: ["9d", "8d"] },
            ],
          },
          {
            texto:
              "Sequência sem flush draw (bet também serve), trincas que não bloqueiam o top pair e combo draws. Size muito alto, para atolar o turn.",
            maos: [
              { nome: "Sequência", cartas: ["9c", "8h"] },
              { nome: "Trinca do meio", cartas: ["Th", "Tc"] },
              { nome: "Combo draw", cartas: ["Kd", "Qd"] },
            ],
          },
          undefined,
          "O check-raise com overpair é exceção em board com sequência (A-A ou K-K com o naipe do board)."
        ),
        split(
          "deep-b70",
          "Deep: B70",
          "Tx, Jx e 98x com flush draw. O size alto faz o rival foldar mais, então só apostam as melhores mãos de valor e os bluffs com mais equity.",
          "B70",
          ["9s", "8h", "2s"],
          "9-8-2 com dois de espadas (aula)",
          {
            texto:
              "Os primeiros overpairs e os melhores top pairs. O K-K da aula aposta, com ou sem o naipe do board.",
            maos: [
              { nome: "Overpair", cartas: ["Kd", "Ks"] },
              { nome: "Top pair", cartas: ["Ah", "9c"] },
            ],
          },
          {
            texto:
              "Flush draws (as brocas com redraw da aula), duas pontas e BDFD + BDST. Sem backdoor, não aposta: o A♣5♥ não vira bluff.",
            maos: [
              { nome: "Flush draw", cartas: ["As", "5s"] },
              { nome: "Duas pontas", cartas: ["Th", "7h"] },
              { nome: "BDFD + BDST", cartas: ["Ks", "Qc"] },
            ],
          },
          {
            texto:
              "Os piores top pairs, qualquer par, trincas (bloqueiam quem paga), os draws que não apostam e valor de showdown.",
            maos: [
              { nome: "Top pair fraco", cartas: ["9h", "6h"] },
              { nome: "Trinca", cartas: ["8d", "8c"] },
            ],
          },
          {
            texto: "Overpairs e combo draws.",
            maos: [{ nome: "Combo draw", cartas: ["Ts", "7s"] }],
          }
        ),
      ],
    },
    {
      tipo: "lista",
      titulo: "Regras da aula",
      tom: "positivo",
      itens: [
        "Par e draw não foldam: quem dá check com par ou draw direto não folda para o size pequeno do rival. O fold fica para a mão sem par e sem draw.",
        "Dois pares: em SPR baixo, é mão de slow play em board sem sequência. Com sequência no board, pode apostar.",
        "Trincas no check: no short, não precisam de proteção e bloqueiam quem paga. A trinca que dá check-raise nunca é a que bloqueia o top pair.",
        "Cobertor curto: fora de posição, dar check com mão que queria apostar custa EV. Por isso o check precisa de plano.",
        "SPR e o size: com SPR 3, se o rival pode foldar K-T para o all-in, a melhor estratégia vira size. O B40 deixa o SPR em 1 no turn.",
        "Solver: o BB poderia apostar cerca de 80% do range. Nos boards com sequência e muita interação (T-9-8, J-T-9, 9-8-5) é preciso desenvolver o check.",
      ],
    },
    {
      tipo: "cartoes",
      titulo: "Turn do 3bet pot",
      intro:
        "A guideline dá só o size por tipo de turn, sem dizer quais mãos apostam. A aula do BB não trata o turn. Boards ilustrativos.",
      colunas: 2,
      itens: [
        {
          etiqueta: { texto: "B100", cor: "verde" },
          titulo: "Turn blank",
          texto: "B100, no size geométrico.",
          cartas: ["Ks", "7d", "2c"],
          turn: "3h",
        },
        {
          etiqueta: { texto: "B40", cor: "vermelho" },
          titulo: "Carta alta",
          texto: "B40.",
          cartas: ["8s", "6d", "3c"],
          turn: "Ah",
        },
        {
          etiqueta: { texto: "B40", cor: "vermelho" },
          titulo: "Flush",
          texto: "B40.",
          cartas: ["Ks", "8s", "3d"],
          turn: "5s",
        },
        {
          etiqueta: { texto: "B70", cor: "verde" },
          titulo: "Turn que conecta",
          texto: "B70.",
          cartas: ["Js", "9d", "4c"],
          turn: "Th",
        },
      ],
    },
    {
      tipo: "cartoes",
      titulo: "Flop IP",
      intro:
        "Da guideline geral do módulo. O IP ainda não tem aula. Boards ilustrativos.",
      colunas: 3,
      itens: [
        {
          etiqueta: { texto: "B25", cor: "claro" },
          titulo: "Short: B25",
          texto: "Range bet.",
          cartas: ["As", "7d", "2c"],
        },
        {
          etiqueta: { texto: "B40", cor: "vermelho" },
          titulo: "Short: B40",
          texto: "Split.",
          cartas: ["Qs", "Js", "6d"],
        },
        {
          etiqueta: { texto: "B70", cor: "verde" },
          titulo: "Short: B70",
          texto:
            "Boards específicos, principalmente low e boards em que você precisa de mais pressão.",
          cartas: ["7s", "5d", "2c"],
        },
      ],
    },
    {
      tipo: "lista",
      titulo: "Ainda em aberto",
      tom: "neutro",
      itens: [
        "Overpair no all-in: qual aposta e qual dá check-shove.",
        "6-5-4 e 5-4-3 no short: a teoria apontaria all-in com o range, mas o instrutor chamou de exceção e não pediu para treinar.",
        "Seco no deep: o critério exato entre B25 e B40.",
        "Middle stack: a partir de que stack passa a usar a lógica do deep.",
        "SB e IP: seguem sem aula. Não use a árvore do BB no SB.",
      ],
    },
    {
      tipo: "lista",
      titulo: "Regras de bolso",
      itens: [
        "Uma árvore por spot: nunca copie a estratégia de OOP para IP, de BB para SB, de short para deep ou de deep para short.",
        "Ordem do size: valor, bluff e por último o check.",
        "BB short: B25 em seco, monotone e dobrado. B40 em carregado sem sequência. All-in com sequência.",
        "BB deep: B25 em seco, monotone e dobrado (B40 quando interage mais). B40 com sequência. B70 em Tx, Jx e 98x com flush draw.",
        "Bluff com equity: draws diretos e BDFD + BDST, só com o naipe do board. Sem backdoor, não aposta.",
        "Check com plano: check-call ou check-shove. Par e draw direto não foldam.",
        "Turn: blank em B100, carta alta em B40, flush em B40, carta que conecta em B70.",
      ],
    },
  ],
}

export default m08
