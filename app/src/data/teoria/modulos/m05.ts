import type { ModuloTeoria } from "@/data/teoria/tipos"

const m05: ModuloTeoria = {
  slug: "cbet-oop",
  tema: ["C-Bet OOP", "2nd Barrel OOP"],
  nome: "C-Bet OOP",
  spot: "Pote single raised · você fora de posição, como agressor · 40bb · EP e CO contra o BTN",
  tags: [
    "Flop e turn",
    "Fora de posição",
    "40bb",
    "Sizes B25, B40, B70 e B100",
  ],
  videos: [
    { id: "9HYSNZPf464", nome: "C-Bet OOP 1" },
    { id: "GZ22MZ0AkCk", nome: "C-Bet OOP 2" },
    { id: "uuxtxkIsfrw", nome: "2nd Barrel OOP" },
  ],
  secoes: [
    {
      tipo: "lista",
      titulo: "Em 30 segundos",
      itens: [
        "Dois ranges funcionais: c-bet fora de posição não é só frequência de aposta. É construir um range de bet e um range de check, os dois funcionais.",
        "Range de check forte: ele precisa ter força, realizar equity e proteger contra exploração.",
        "Dois tipos de split: split range e split 25%.",
        "Top pair pode ficar no check: depende da textura, do naipe e da necessidade de proteção do check.",
        "Trincas e draws: nem toda trinca aposta, e nem todo draw. Parte das melhores trincas fica no check.",
        "Bluffs: consideram quem você quer fazer foldar e quais cartas reduzem as continuações do adversário.",
        "Size no turn: acompanha a largura do range de valor. B100 no blank, B40 nos turns dinâmicos.",
      ],
    },
    {
      tipo: "cartoes",
      titulo: "Os dois tipos de split",
      intro: "Nos dois casos, a ideia é distribuir mãos entre bet e check.",
      itens: [
        {
          titulo: "Split range",
          textos: [
            "Divide uma grande parte do range entre bet e check. Não significa apostar pouco.",
            "Top pairs: metade, usando os naipes do board.",
            "Second pairs: metade, usando os naipes do board.",
            "Draws: duas pontas sem o naipe do board e brocas com o naipe do board.",
            "Backdoors: mãos com BDFD e BDST.",
          ],
        },
        {
          titulo: "Split 25%",
          textos: [
            "Só uma parte menor do range aposta.",
            "Top pairs: 25% deles, com a parte off que tem o naipe do flush draw e a parte suited com BDFD. Em board rainbow, mãos sem o naipe do board.",
            "Draws: duas pontas e brocas com o naipe do board. Use o primeiro naipe do board para o check-raise.",
            "Backdoors: uma overcard com BDFD e BDST.",
          ],
        },
      ],
    },
    {
      tipo: "cartoes",
      titulo: "Estratégia e size por textura",
      intro:
        "Cada cartão mostra um board ilustrativo e o que fazer abrindo de EP e de CO contra o BTN.",
      colunas: 3,
      itens: [
        {
          etiqueta: { texto: "B25", cor: "claro" },
          titulo: "A high seco",
          cartas: ["As", "7d", "2c"],
          textos: ["EP vs BTN: split range.", "CO vs BTN: split range."],
        },
        {
          etiqueta: { texto: "B40", cor: "vermelho" },
          titulo: "A high conectado",
          cartas: ["As", "Jd", "Tc"],
          textos: ["EP vs BTN: split range.", "CO vs BTN: split 25%."],
        },
        {
          etiqueta: { texto: "B25 / B40", cor: "claro" },
          titulo: "BBX",
          cartas: ["Ks", "Qd", "5c"],
          textos: [
            "EP vs BTN: range, em B25.",
            "CO vs BTN: split 25%, em B40.",
          ],
        },
        {
          etiqueta: { texto: "B40", cor: "vermelho" },
          titulo: "K-Q high",
          cartas: ["Ks", "8d", "4c"],
          textos: ["EP vs BTN: split range.", "CO vs BTN: split 25%."],
        },
        {
          etiqueta: { texto: "B40 / B70", cor: "vermelho" },
          titulo: "J-T high",
          cartas: ["Js", "7d", "3c"],
          textos: [
            "EP vs BTN: split range, em B40.",
            "CO vs BTN: split 25%, em B70.",
          ],
        },
        {
          etiqueta: { texto: "B40", cor: "vermelho" },
          titulo: "High com sequência",
          cartas: ["Qs", "Td", "9c"],
          textos: ["EP vs BTN: split range.", "CO vs BTN: split 25%."],
        },
        {
          etiqueta: { texto: "B70 / B40", cor: "verde" },
          titulo: "Low com sequência",
          cartas: ["7s", "6d", "4c"],
          textos: [
            "EP vs BTN: split range, em B70.",
            "CO vs BTN: split range, em B40.",
          ],
        },
        {
          etiqueta: { texto: "B70", cor: "verde" },
          titulo: "Low sem sequência",
          cartas: ["9s", "4d", "2c"],
          textos: ["EP vs BTN: split range.", "CO vs BTN: split range."],
        },
        {
          etiqueta: { texto: "B25", cor: "claro" },
          titulo: "Monotone",
          cartas: ["Ks", "8s", "3s"],
          textos: [
            "EP vs BTN: aleatório, em B25.",
            "CO vs BTN: range de check.",
          ],
        },
      ],
    },
    {
      tipo: "abas",
      titulo: "Exemplo da aula: nut flush draws",
      intro:
        "No K♦4♥2♥, os nut flush draws não são um grupo único. A divisão é pela força do kicker do ás.",
      abas: [
        {
          id: "nfd",
          nome: "K-4-2 com dois de copas",
          criterio:
            "Cada grupo de nut flush draw tem a sua função: valor de showdown, bloqueio dos flush draws do vilão, proteção de equity, fold equity ou capacidade de coolerar os draws dele.",
          blocos: [
            {
              cartas: ["Kd", "4h", "2h"],
              rotulo: "K-4-2 com dois de copas",
              acoes: [
                {
                  nome: "Check-call",
                  cor: "branco",
                  texto:
                    "NFD fortes (AK, AQ, AJ, AT de copas): têm valor de showdown mais robusto, hot cards e bloqueiam boa parte dos flush draws do vilão.",
                  maos: [
                    { nome: "AK de copas", cartas: ["Ah", "Kh"] },
                    { nome: "AQ de copas", cartas: ["Ah", "Qh"] },
                    { nome: "AT de copas", cartas: ["Ah", "Th"] },
                  ],
                },
                {
                  nome: "Bet",
                  cor: "verde",
                  texto:
                    "NFD médios (A9 a A6 de copas): protegem contra os outs de Ax no turn e geram fold equity no flop e no turn.",
                  maos: [
                    { nome: "A9 de copas", cartas: ["Ah", "9h"] },
                    { nome: "A7 de copas", cartas: ["Ah", "7h"] },
                  ],
                },
                {
                  nome: "Check-raise",
                  cor: "vermelho",
                  texto:
                    "NFD baixos (A5 a A2 de copas): menor valor de showdown, mantêm mais flush draws no range do vilão e conseguem coolerá-los quando acertam.",
                  maos: [
                    { nome: "A5 de copas", cartas: ["Ah", "5h"] },
                    { nome: "A3 de copas", cartas: ["Ah", "3h"] },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      tipo: "cartoes",
      titulo: "Como construir cada categoria de mão",
      itens: [
        {
          titulo: "Top pair",
          texto:
            "Depende da textura, do naipe, da necessidade de proteção e da construção do range de check.",
        },
        {
          titulo: "Second pair",
          texto:
            "Também se divide, pelo kicker, pela interação com o board e pela capacidade de continuar.",
        },
        {
          titulo: "Trincas",
          texto:
            "Aposte parte delas e mantenha parte das melhores no check, para proteger o range de check.",
        },
        {
          titulo: "Draws",
          texto:
            "Depende da capacidade de continuar, da realização de equity e dos blockers.",
        },
      ],
    },
    {
      tipo: "cartoes",
      titulo: "Second barrel fora de posição",
      intro:
        "Guideline do instrutor. Cobre só o range de valor: bluffs, semi-bluffs e a composição do check no turn ainda não estão definidos. Um flop e um turn ilustrativos em cada caso:",
      itens: [
        {
          etiqueta: { texto: "B100", cor: "verde" },
          titulo: "Turn blank",
          texto: "Os 2 ou 3 melhores top pairs ou melhor.",
          cartas: ["Ks", "8d", "3c"],
          turn: "2h",
        },
        {
          etiqueta: { texto: "B40", cor: "vermelho" },
          titulo: "Dinâmico, high card seco",
          texto:
            "Todos os top pairs (deixe 1 ou 2 dos piores no check-call) e os 2 melhores second pairs ou melhor.",
          cartas: ["Ks", "7d", "2c"],
          turn: "Th",
        },
        {
          etiqueta: { texto: "B70", cor: "verde" },
          titulo: "Dinâmico, high card seco, sem value de second pair",
          texto: "Todos os top pairs ou melhor.",
          cartas: ["As", "6d", "2c"],
          turn: "Jh",
        },
        {
          etiqueta: { texto: "B100", cor: "verde" },
          titulo: "High card carregado",
          texto: "Os 1 ou 2 melhores top pairs ou melhor.",
          cartas: ["Ks", "Js", "9d"],
          turn: "4c",
        },
        {
          etiqueta: { texto: "B40", cor: "vermelho" },
          titulo: "Dinâmico, flush",
          texto: "Os 2 melhores top pairs ou melhor.",
          cartas: ["Ks", "8s", "3d"],
          turn: "5s",
        },
      ],
    },
    {
      tipo: "lista",
      titulo: "Regras de bolso",
      itens: [
        "Dois ranges funcionais: c-bet fora de posição é construir os dois, e não maximizar apostas.",
        "Range de bet: extrai valor, pressiona e protege mãos.",
        "Range de check: tem força, realiza equity e protege contra exploração.",
        "Split range: metade dos top pairs e dos second pairs, com os naipes do board.",
        "Split 25%: só uma parte menor aposta, com os naipes do flush draw.",
        "Nut flush draws: AK a AT dão check-call, A9 a A6 apostam, A5 a A2 dão check-raise.",
        "Turn: blank em B100 com os melhores top pairs. Turn dinâmico em B40.",
        "Pocket pairs: acima de todas as cartas é overpair, entre as cartas é segundo ou terceiro par, abaixo de todas é underpair. Pocket pair abaixo do top pair dá check-call.",
      ],
    },
  ],
}

export default m05
