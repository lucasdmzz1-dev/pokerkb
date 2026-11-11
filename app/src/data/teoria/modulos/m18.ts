import type { AbaT, AcaoT, MaoEx, ModuloTeoria } from "@/data/teoria/tipos"
import type { CardCode } from "@/data/mod15"

// Uma mão da aula: o board completo, a resposta do herói e o que as outras mãos fazem.
function mao(
  id: string,
  nome: string,
  criterio: string,
  cartas: CardCode[],
  rotulo: string,
  resposta: string,
  acoes: AcaoT[],
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
        etiqueta: { texto: resposta, cor: "verde" },
        acoes,
      },
    ],
  }
}

interface Faixa {
  texto: string
  maos?: MaoEx[]
}

// Um tipo de runout do guideline: o size baixo e o size alto, por valor e de bluff.
function runout(
  id: string,
  nome: string,
  criterio: string,
  cartas: CardCode[],
  rotulo: string,
  baixo: string,
  alto: string,
  f: { bv: Faixa; bb: Faixa; av: Faixa; ab: Faixa },
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
        etiqueta: { texto: `${baixo} e ${alto}`, cor: "claro" },
        acoes: [
          { nome: `${baixo} por valor`, cor: "verde", ...f.bv },
          { nome: `${baixo} de bluff`, cor: "amarelo", ...f.bb },
          { nome: `${alto} por valor`, cor: "verde", ...f.av },
          { nome: `${alto} de bluff`, cor: "amarelo", ...f.ab },
        ],
      },
    ],
  }
}

const m18: ModuloTeoria = {
  slug: "xc-play-river",
  tema: "XC no River",
  nome: "XC e Play River",
  spot: "Pote single raised · BTN abre e BB paga · check-call no flop, check-check no turn · você no BB, primeiro a agir no river",
  tags: ["River", "BB OOP", "Range capado", "Sizes B25 e B100"],
  videos: [{ id: "hTXdS7jt-k0" }],
  secoes: [
    {
      tipo: "lista",
      titulo: "Em 30 segundos",
      itens: [
        "Range capado: quando o BTN aposta o flop e dá check no turn, ele quase não tem mais top pair forte, dois pares e trincas. Sobram valor médio e give-up.",
        "Novo grupo de nuts: o seu top pair virou o nuts, mesmo com kicker ruim. Ele sempre aposta, no size alto.",
        "Second pair é valor: aposta no size baixo e extrai de pares médios e de A-x.",
        "Dois sizes: um baixo (B25, ou B40 com grupo mais restrito) e um alto (pote). Quanto mais mãos apostam, menor o size.",
        "Size do bluff: 9 high ou menor ataca muitas mãos e vai no B25. T high ou maior ataca poucas e vai no B100.",
        "Par e A high: só blefam quando não há bluff natural, e sempre no size mais alto.",
        "Check-call: pague o bet do BTN com os pares que desbloqueiam os bluffs dele. Não precisa do topo.",
      ],
    },
    {
      tipo: "cartoes",
      titulo: "Linha contínua e range capado",
      intro:
        "A aula separa as duas situações. Quase todo estudo é de linha contínua, e aqui o range do BTN é capado.",
      colunas: 2,
      itens: [
        {
          etiqueta: { texto: "Bet, bet, bet", cor: "vermelho" },
          titulo: "Linha contínua",
          textos: [
            "O range de aposta pesa para top pair com bom kicker, dois pares e trincas.",
            "O bluffcatcher bloqueia valor e desbloqueia bluff: paga com top pair.",
            "Pagar três barrels com par fraco é erro.",
          ],
        },
        {
          etiqueta: { texto: "Bet, check", cor: "verde" },
          titulo: "Range capado",
          textos: [
            "O check no turn tira o topo do range do BTN.",
            "O valor dele no river vem de second pair e de um slow play eventual.",
            "O bluffcatcher só precisa desbloquear o que ele blefa: pares fracos pagam.",
          ],
        },
      ],
    },
    {
      tipo: "cartoes",
      titulo: "Os dois sizes",
      intro:
        "Todo spot dessa linha tem um size baixo e um size alto. O que muda é onde você encaixa a sua mão.",
      colunas: 2,
      itens: [
        {
          etiqueta: { texto: "B25 ou B40", cor: "claro" },
          titulo: "Size baixo",
          textos: [
            "Second pair e os melhores third pairs.",
            "Bluff de 9 high ou menor, que faz foldar muitas mãos naturais.",
            "B25 com grupo largo de apostas. B40 com grupo mais restrito.",
          ],
          maos: [{ nome: "Second pair", cartas: ["Td", "4d"] }],
        },
        {
          etiqueta: { texto: "Pote", cor: "verde" },
          titulo: "Size alto",
          textos: [
            "Top pair ou melhor, sempre.",
            "Bluff de T high ou maior. Quanto pior o bluff, mais ficha.",
            "No jogo short stack vira all-in. Com muitos bluffs disponíveis, pode passar do pote.",
          ],
          maos: [{ nome: "Top pair", cartas: ["As", "5c"] }],
        },
      ],
    },
    {
      tipo: "abas",
      titulo: "As seis mãos da aula",
      intro:
        "Em todas: o BTN abre, você paga do BB, dá check-call no flop, o turn termina em check-check e você age no river.",
      abas: [
        mao(
          "m1",
          "A5: top pair",
          "O range do BTN está capado, e o A-5 virou o nuts. Não é mão de bloco: é mão para pôr o máximo de fichas. Na aula, a maioria respondeu B70 ou check-call.",
          ["Ad", "6c", "Kh", "Qs", "9d"],
          "A-6-K, turn Q, river 9 (aula)",
          "Pote",
          [
            {
              nome: "Bet por valor",
              cor: "verde",
              texto:
                "Todos os A-x em pote. O K-x aposta B25 em frequência muito alta: extrai de Q-x e 9-x.",
              maos: [
                { nome: "Top pair: pote", cartas: ["As", "5c"] },
                { nome: "Second pair: B25", cartas: ["Kc", "4s"] },
              ],
            },
            {
              nome: "Bet de bluff",
              cor: "amarelo",
              texto:
                "Não há bluff natural: o T-J fez sequência. O bluff vem do 6-x e dos floats com backdoor, todos em pote, atacando 9-x e Q-x.",
              maos: [
                { nome: "6-x", cartas: ["7s", "6s"] },
                { nome: "Float com backdoor", cartas: ["8h", "7h"] },
              ],
            },
            {
              nome: "Check-call",
              cor: "branco",
              texto: "O Q-x passa a ser mais check-call.",
              maos: [{ nome: "Third pair", cartas: ["Qd", "8d"] }],
            },
          ],
          "Depois do B25, contra raise: K-2, K-3 e K-4 pagam. K-T e K-J não, porque bloqueiam o que ele blefa."
        ),
        mao(
          "m2",
          "55: par vira bluff",
          "Quase não há bluff natural: os draws do flop fizeram sequência. Aí o par vira bluff, e bluff de par é sempre no size mais alto, para fazer foldar par. Na aula, a maioria respondeu check-fold.",
          ["7d", "9s", "Kh", "Jc", "6c"],
          "7-9-K, turn J, river 6 (aula)",
          "Pote",
          [
            {
              nome: "Bet de bluff",
              cor: "amarelo",
              texto:
                "O 55 blefa em pote e ataca 6-x, 7-x e 9-x. Sem bluff natural, o size alto é pote no máximo.",
              maos: [{ nome: "Par baixo", cartas: ["5s", "5h"] }],
            },
            {
              nome: "Bet por valor",
              cor: "verde",
              texto: "K-x ou melhor em pote. J-x em B25.",
              maos: [
                { nome: "Top pair: pote", cartas: ["Ks", "4s"] },
                { nome: "Second pair: B25", cartas: ["Jd", "4d"] },
              ],
            },
          ]
        ),
        mao(
          "m3",
          "Q7: trinca",
          "Há muitos bluffs disponíveis: T-8, T-7, 8-7, 8-5, flush draw de ouros, K-T, K-J e T-J. Quanto mais bluffs, mais o valor toma call e mais alto pode ser o size.",
          ["9d", "Qd", "6h", "3h", "Qh"],
          "9-Q-6, turn 3, river Q (aula)",
          "Pote ou mais",
          [
            {
              nome: "Bet por valor",
              cor: "verde",
              texto:
                "A dama aposta alto, e aqui o alto é muito alto: dá para passar do pote.",
              maos: [{ nome: "Trinca", cartas: ["Qc", "7s"] }],
            },
          ],
          "Se o river fosse o J♥, que traz sequência e flush ao mesmo tempo, o size alto cairia para B70 e os J-x fariam bloco."
        ),
        mao(
          "m4",
          "Q8: dobra",
          "Na dobra, o que vira trinca vai no size alto e o que não é trinca vai no baixo. O Q-8 extrai de 55 a TT e de A high.",
          ["Jd", "Qc", "4d", "Jh", "3s"],
          "J-Q-4, turn J, river 3 (aula)",
          "B40 ou B25",
          [
            {
              nome: "Bet por valor",
              cor: "verde",
              texto:
                "J-x em pote. O Q-8 faz bloco: B40 serve muito bem, e B25 não tem problema.",
              maos: [
                { nome: "Trinca: pote", cartas: ["Js", "9s"] },
                { nome: "Q-x: B40", cartas: ["Qd", "8h"] },
              ],
            },
            {
              nome: "Bet de bluff",
              cor: "amarelo",
              texto:
                "Bluff ruim vai em pote: flush draw bustado e K-T. O 6-5 de paus ataca mais mãos e vai no size baixo.",
              maos: [
                { nome: "Draw bustado: pote", cartas: ["Kd", "Td"] },
                { nome: "Low cards: baixo", cartas: ["6c", "5c"] },
              ],
            },
            {
              nome: "Check-call",
              cor: "branco",
              texto:
                "4-x com kicker que não bloqueia bluff: 4-2 a 4-8, e A-4 sempre.",
              maos: [
                { nome: "4-x", cartas: ["5s", "4s"] },
                { nome: "A-4", cartas: ["As", "4h"] },
              ],
            },
            {
              nome: "Check-fold",
              cor: "vermelho",
              texto:
                "A-9 off. O 4-9 e o 4-T são péssimos calls, e o 4-K é questionável.",
              maos: [
                { nome: "A high", cartas: ["Ac", "9h"] },
                { nome: "4-x que bloqueia bluff", cartas: ["Tc", "4c"] },
              ],
            },
          ]
        ),
        mao(
          "m5",
          "96: check-call",
          "A dama no river é carta que o BTN overblefa. O ajuste é pagar mais. O 6-x desbloqueia os bluffs dele e paga em frequência muito alta. Na aula, a maioria respondeu check-fold.",
          ["Jh", "6s", "3s", "Td", "Qc"],
          "J-6-3, turn T, river Q (aula)",
          "Check-call",
          [
            {
              nome: "Check-call",
              cor: "branco",
              texto:
                "9-6, 8-6 e os outros 6-x. O 9-6 não aposta, porque há bluffs naturais antes dele.",
              maos: [{ nome: "6-x", cartas: ["9c", "6h"] }],
            },
            {
              nome: "Bet por valor",
              cor: "verde",
              texto: "Dois pares em pote. Q-x aposta. J-x em B25.",
              maos: [
                { nome: "Dois pares: pote", cartas: ["Jd", "6d"] },
                { nome: "J-x: B25", cartas: ["Jc", "7c"] },
              ],
            },
            {
              nome: "Check-fold",
              cor: "vermelho",
              texto:
                "Se você acha que ele blefa A-x, o 6-x e o 3-x com ás são os primeiros a foldar.",
              maos: [{ nome: "A-6", cartas: ["Ad", "6c"] }],
            },
          ]
        ),
        mao(
          "m6",
          "T4: second pair",
          "O valor médio do BTN aqui é T-x, 99 ou menor e um K-x pontual. O T-4 é muito bom, mas não é mão absoluta: size baixo. O BTN tem 18bb, então o size alto é all-in.",
          ["Jh", "6d", "Ts", "3c", "5c"],
          "J-6-T, turn 3, river 5 (aula)",
          "B25",
          [
            {
              nome: "Bet por valor",
              cor: "verde",
              texto: "Todos os T-x em B25. Todos os J-x em all-in.",
              maos: [
                { nome: "Second pair: B25", cartas: ["Td", "4d"] },
                { nome: "Top pair: all-in", cartas: ["Js", "8s"] },
              ],
            },
            {
              nome: "Check-call",
              cor: "branco",
              texto:
                "6-2, 6-4, 6-7 e 6-8 pagam. A-6 é ótimo: não bloqueia nenhum bluff.",
              maos: [
                { nome: "6-x", cartas: ["6s", "4s"] },
                { nome: "A-6", cartas: ["Ac", "6c"] },
              ],
            },
            {
              nome: "Check-fold",
              cor: "vermelho",
              texto:
                "6-9 e 6-Q: a dama e o 9 são cartas que o BTN blefa. O 6-K também é ruim.",
              maos: [
                { nome: "6-9", cartas: ["9h", "6h"] },
                { nome: "6-Q", cartas: ["Qh", "6c"] },
              ],
            },
          ]
        ),
      ],
    },
    {
      tipo: "abas",
      titulo: "Guideline por tipo de runout",
      intro:
        "O que o turn e o river fizeram com o board define os sizes e o que entra em cada um.",
      abas: [
        runout(
          "blank",
          "Blank",
          "Turn e river não mudam nada. O BTN quase não tem top pair.",
          ["Jh", "6d", "Ts", "3c", "5c"],
          "J-6-T, turn 3, river 5 (aula)",
          "B25",
          "B100",
          {
            bv: {
              texto:
                "Dois pares, second pairs e os melhores third pairs (só quando não completam draws do board).",
              maos: [{ nome: "Second pair", cartas: ["Td", "4d"] }],
            },
            bb: {
              texto: "9 high ou menor.",
              maos: [{ nome: "9 high", cartas: ["9h", "8h"] }],
            },
            av: {
              texto: "Top pairs e os melhores second pairs.",
              maos: [{ nome: "Top pair", cartas: ["Js", "8s"] }],
            },
            ab: {
              texto: "J high e Q high. A high só quando completam draws.",
              maos: [{ nome: "Q high", cartas: ["Qh", "9c"] }],
            },
          }
        ),
        runout(
          "hc-turn",
          "High card no turn",
          "A high card no turn deixa o BTN ainda mais capado: ele deu check com ela no board. O Q-x é forte o bastante para o pote.",
          ["Qs", "5d", "2c", "Kh", "8s"],
          "Q-5-2, turn K, river 8 (aula)",
          "B25",
          "B100",
          {
            bv: {
              texto:
                "Dois pares contendo o third pair, second pairs e os melhores third pairs (só quando não completam draws do board).",
            },
            bb: { texto: "9 high ou menor." },
            av: {
              texto:
                "Top pairs e second pairs. O Q-x cobra de 66, 77, 99, TT e JJ.",
              maos: [{ nome: "Q-x", cartas: ["Qd", "9d"] }],
            },
            ab: { texto: "High cards, menos A high." },
          }
        ),
        runout(
          "hc-river",
          "High card no river",
          "Com a mudança de nuts no river, o BTN ainda tem mais mãos que acertaram. O size alto desce para o B70.",
          ["Qs", "5d", "2c", "8s", "Kh"],
          "Q-5-2, turn 8, river K (aula)",
          "B40",
          "B70",
          {
            bv: { texto: "Em branco no guideline da aula." },
            bb: { texto: "9 high ou menor." },
            av: {
              texto: "Top pairs e second pair.",
              maos: [{ nome: "Q-x", cartas: ["Qd", "9d"] }],
            },
            ab: {
              texto: "J high e Q high. A high só quando completam draws.",
            },
          },
          "A ordem dos fatores altera o produto: o mesmo Q-x faz pote com o K no turn e B70 com o K no river."
        ),
        runout(
          "flush",
          "Flush",
          "O título do guideline diz B25 e B100, e as linhas usam B40. A escolha entre B25 e B40 segue a composição: grupo mais restrito, B40.",
          ["Ks", "8s", "3d", "5s", "2c"],
          "Board ilustrativo",
          "B40",
          "B100",
          {
            bv: {
              texto:
                "Os melhores second pairs e flush + par que bloqueia o calling range.",
            },
            bb: { texto: "Frequência pequena de airs." },
            av: { texto: "Top pairs ou melhor." },
            ab: {
              texto:
                "No guideline escrito: J high ou menor. Na fala: de maneira geral, as Broadways. Em aberto.",
            },
          }
        ),
        runout(
          "straight",
          "Straight",
          "Com a sequência no turn, valem os dois sizes. No river, os bluffs em size alto vêm de blockers.",
          ["Qs", "8d", "7c", "5h", "6s"],
          "Q-8-7, turn 5, river 6 (aula)",
          "B25",
          "B100",
          {
            bv: {
              texto:
                "Second pair e os melhores third pairs. Com quatro cartas de low cards para a sequência, os dois pares também.",
            },
            bb: { texto: "Air que faz foldar vários air melhores." },
            av: { texto: "Top pairs ou melhor. A sequência vai aqui." },
            ab: {
              texto: "Air que faz foldar poucos air melhores (como A-x e K-x).",
            },
          },
          "Quatro cartas para a sequência com Broadway (Q-9-2, turn T, river J): só B100 ou check. Só o K aposta por valor. O 8 e os dois pares dão check-call, porque o BTN tem muito K-x."
        ),
        runout(
          "dobra",
          "Dobra",
          "O que vira trinca vai no B100. O que não é trinca vai no B25.",
          ["Jd", "Qc", "4d", "Jh", "3s"],
          "J-Q-4, turn J, river 3 (aula)",
          "B25",
          "B100",
          {
            bv: {
              texto:
                "Third pair, se houver muitos draws bustados. Caso contrário, second pair.",
            },
            bb: {
              texto:
                "9 high ou menor. Quanto mais folds naturais, menor o size.",
            },
            av: {
              texto: "Trincas e os melhores second pairs.",
              maos: [{ nome: "Trinca", cartas: ["Js", "9s"] }],
            },
            ab: { texto: "T high ou maior. Não blefar A high." },
          }
        ),
      ],
    },
    {
      tipo: "lista",
      titulo: "Pagando o bet do BTN",
      intro:
        "Você deu check no river e o BTN apostou. O valor dele é restrito, então o call vem de quem desbloqueia os bluffs.",
      tom: "positivo",
      itens: [
        "Qualquer par é candidato: principalmente o third pair. As cartas do turn e do river você quase não tem.",
        "O que o BTN blefa: as Broadways que erraram (T, J, Q, K) e, contra o BTN, muitos 9-x. Ele tende a não blefar A-x, porque quer fazer foldar A-x e K-x.",
        {
          texto:
            "Kicker bom: par com carta baixa ou com ás. No J-T-6-3-5, o 6-4 e o A-6 pagam.",
          maos: [
            { nome: "6-4", cartas: ["6s", "4s"] },
            { nome: "A-6", cartas: ["Ac", "6c"] },
          ],
        },
        {
          texto:
            "Kicker ruim: par com carta que ele blefa. No J-T-6-3-5, o 6-9 e o 6-Q foldam.",
          maos: [
            { nome: "6-9", cartas: ["9h", "6h"] },
            { nome: "6-Q", cartas: ["Qh", "6c"] },
          ],
        },
        "Pelo size dele: até 40% do pote, call com qualquer par. Em 2/3 a 75%, call com o grupo acima. Contra overbet, call pontual, porque a história dele não faz sentido.",
        "High card no river: é um dos spots mais overbluffados. Pague mais.",
      ],
    },
    {
      tipo: "cartoes",
      titulo: "Check-raise no river",
      intro:
        "O tempero da aula. Com até 30bb efetivos, o check-raise é check-shove.",
      colunas: 2,
      itens: [
        {
          etiqueta: { texto: "Valor", cor: "verde" },
          titulo: "Por valor",
          textos: [
            "Board com sequência: a sequência, cerca de 50% das vezes.",
            "Board com flush: o flush com o par do board.",
            "Board normal: dois pares que desbloqueiam o par que ele aposta por valor, cerca de 50% das vezes. Se ele aposta o second pair, use top pair com third pair.",
          ],
        },
        {
          etiqueta: { texto: "Bluff", cor: "amarelo" },
          titulo: "De bluff",
          textos: [
            "Par com a última carta que bateu no board: bloqueia os dois pares dele.",
            "Exemplo: a broca do flop que acertou o par no river e não é bom bluffcatcher.",
            "Board com sequência: um blocker da sequência. Board com flush: um blocker do flush.",
          ],
        },
      ],
    },
    {
      tipo: "lista",
      titulo: "Ainda em aberto",
      tom: "neutro",
      itens: [
        "Bluff do B100 no flush: o guideline escrito diz J high ou menor, e a fala diz Broadways.",
        "High card no river: a linha de valor do B40 está em branco no guideline.",
        "Size acima do pote: vale com muitos bluffs disponíveis, sem um corte objetivo.",
        "Outras posições: a aula é BTN contra BB. Contra EP, a high card no river pesa mais.",
      ],
    },
    {
      tipo: "lista",
      titulo: "Regras de bolso",
      itens: [
        "Check no turn: capa o range do BTN.",
        "Top pair ou melhor: sempre no size alto.",
        "Second pair: sempre aposta, no size baixo.",
        "Draws bustados: quanto mais, mais o second pair sobe para o bet alto e mais o third pair entra no bet baixo.",
        "Bluff de low cards: 9 high ou menor, B25. Bluff de high cards: T high ou maior, B100.",
        "A high: só blefa quando completam draws claros.",
        "Bluffcatcher: desbloqueie o que ele blefa. Par com kicker baixo ou com ás paga.",
        "Três barrels: é outra história. Aí o call precisa bloquear valor.",
      ],
    },
  ],
}

export default m18
