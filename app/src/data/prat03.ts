export type AcaoBarrel = "Check" | "B40" | "B70" | "Geo"
export type PosBarrel = "HJ" | "CO" | "BTN"
export type TurnBarrel =
  "blank" | "conecta" | "overcard" | "flushAlto" | "flushBaixo" | "dobra"

// Pote single raised de 40bb: o herói abriu 2 e o BB pagou (4,5 bb). Depois o herói
// deu c-bet no flop e o BB pagou. O flop de cada tipo vem do módulo 02.
export const POTE_PRE = 4.5

export interface TurnInfo {
  nome: string
  // Flop mais o turn.
  board: string[]
  // Size da c-bet do flop, em fração do pote.
  flop: 0.25 | 0.7
  estrategia: string
}

export const TURN_BARREL: Record<TurnBarrel, TurnInfo> = {
  blank: {
    nome: "Turn blank",
    board: ["As", "Tc", "2s", "8d"],
    flop: 0.25,
    estrategia:
      "Turn que não muda os nuts: estratégia polarizada, em frequência média de 50% e size geométrico.",
  },
  conecta: {
    nome: "Turn que conecta",
    board: ["Qh", "9s", "2h", "8d"],
    flop: 0.25,
    estrategia:
      "Turn que conecta o board: estratégia mais linear, em B70. Aposta quem conecta e quem tem blockers, e dá check para quem bloqueia o que o vilão folda.",
  },
  overcard: {
    nome: "Overcard no turn",
    board: ["9s", "7d", "5c", "Kd"],
    flop: 0.7,
    estrategia:
      "Overcard que não conecta: o agressor tem a vantagem toda. Aposta B70 com quase todo o range, deixa o valor médio no check e blefa bastante.",
  },
  flushAlto: {
    nome: "Flush completa com carta alta",
    board: ["9s", "7s", "3d", "Ks"],
    flop: 0.7,
    estrategia:
      "Flush com carta alta: size B40, para apostar os novos top pairs e os melhores second pairs.",
  },
  flushBaixo: {
    nome: "Flush completa com carta baixa",
    board: ["9s", "7s", "3d", "2s"],
    flop: 0.7,
    estrategia:
      "Flush com carta baixa: size B70, para apostar por valor os melhores top pairs do flop.",
  },
  dobra: {
    nome: "Turn dobra o board",
    board: ["Qh", "9s", "2d", "2c"],
    flop: 0.25,
    estrategia:
      "Carta que dobra o board: size médio, B70, para apostar por valor um número maior de mãos.",
  },
}

export interface SituacaoBarrel {
  id: string
  tipo: TurnBarrel
  pos: PosBarrel
  hero: [string, string]
  certa: AcaoBarrel
  classe: string
  porque: string
}

// Cada mão vem do exemplo dado na aula prática de second barrel IP, no turn.
// No turn blank o size é o geométrico: a mesma fração do pote no turn e no river, até o all-in.
export const situacoesBarrel: SituacaoBarrel[] = [
  // Turn blank (As Tc 2s, turn 8d)
  {
    id: "bl-a7",
    tipo: "blank",
    pos: "CO",
    hero: ["Ah", "7d"],
    certa: "Check",
    classe: "Top pair com kicker fraco",
    porque:
      "tem valor de showdown e ganha vezes o suficiente dando check, então fica no check.",
  },
  {
    id: "bl-aq",
    tipo: "blank",
    pos: "BTN",
    hero: ["Ah", "Qd"],
    certa: "Geo",
    classe: "Top pair forte",
    porque: "top pair forte aposta por valor, no size geométrico.",
  },
  {
    id: "bl-a9",
    tipo: "blank",
    pos: "HJ",
    hero: ["Ad", "9h"],
    certa: "Geo",
    classe: "Pior top pair que aposta",
    porque: "o A9 é o pior ás que aposta por valor no turn blank.",
  },
  {
    id: "bl-22",
    tipo: "blank",
    pos: "CO",
    hero: ["2h", "2d"],
    certa: "Geo",
    classe: "Trinca",
    porque: "trinca aposta por valor, no size geométrico.",
  },
  {
    id: "bl-kqs",
    tipo: "blank",
    pos: "BTN",
    hero: ["Ks", "Qd"],
    certa: "Geo",
    classe: "Bluff com espada",
    porque:
      "o K♠ bloqueia o flush draw do vilão e a mão não tem showdown, então blefa no size geométrico.",
  },
  {
    id: "bl-kqc",
    tipo: "blank",
    pos: "HJ",
    hero: ["Kc", "Qc"],
    certa: "Check",
    classe: "Bluff que bloqueia o backdoor",
    porque:
      "com dois paus a mão bloqueia o backdoor do vilão, que é uma mão que folda, então dá check.",
  },
  {
    id: "bl-k7h",
    tipo: "blank",
    pos: "HJ",
    hero: ["Kh", "7h"],
    certa: "Geo",
    classe: "Bluff que desbloqueia os folds",
    porque:
      "não bloqueia o flush draw que folda nem o backdoor, e ainda faz fold de rei dama, rei valete e dama valete, então blefa no size geométrico.",
  },
  {
    id: "bl-k7c",
    tipo: "blank",
    pos: "HJ",
    hero: ["Kc", "7c"],
    certa: "Check",
    classe: "Bluff que bloqueia o backdoor",
    porque:
      "o mesmo K7, mas com dois paus: bloqueia o backdoor do vilão, que é fold natural, então dá check.",
  },
  {
    id: "bl-65h",
    tipo: "blank",
    pos: "CO",
    hero: ["6h", "5h"],
    certa: "Geo",
    classe: "Bluff sem nenhum blocker",
    porque:
      "não tem showdown e não bloqueia nada do que folda, então é um bom bluff no size geométrico.",
  },
  {
    id: "bl-qjs",
    tipo: "blank",
    pos: "BTN",
    hero: ["Qh", "Js"],
    certa: "Geo",
    classe: "Duas pontas off com espada",
    porque:
      "a espada bloqueia o flush draw do vilão, que dá menos check-raise, então realiza a equity apostando.",
  },
  {
    id: "bl-qjc",
    tipo: "blank",
    pos: "CO",
    hero: ["Qc", "Jc"],
    certa: "Check",
    classe: "Duas pontas com paus",
    porque:
      "os paus bloqueiam o backdoor do vilão, que é fold natural, então dá check para realizar a equity.",
  },
  {
    id: "bl-k8",
    tipo: "blank",
    pos: "BTN",
    hero: ["Kd", "8h"],
    certa: "Check",
    classe: "Valor médio com showdown",
    porque:
      "ganha vezes o suficiente de rei dama, rei valete e dos pares médios dando check, então não aposta.",
  },
  {
    id: "bl-kt",
    tipo: "blank",
    pos: "HJ",
    hero: ["Kh", "Td"],
    certa: "Geo",
    classe: "Second pair com top kicker",
    porque:
      "o second pair com top kicker aposta por valor: o vilão paga com vários 10x e flush draws.",
  },
  {
    id: "bl-jt",
    tipo: "blank",
    pos: "HJ",
    hero: ["Th", "Jd"],
    certa: "Check",
    classe: "Valor médio e valete que bloqueia",
    porque:
      "o valete bloqueia o que o vilão folda e a mão tem showdown, então dá check.",
  },
  {
    id: "bl-a5h",
    tipo: "blank",
    pos: "CO",
    hero: ["Ah", "5h"],
    certa: "Check",
    classe: "Top pair com kicker fraco",
    porque:
      "o ás com kicker fraco tem showdown e fica no range de check para pagar o vilão quando ele blefar.",
  },

  // Turn que conecta (Qh 9s 2h, turn 8d)
  {
    id: "co-jt",
    tipo: "conecta",
    pos: "CO",
    hero: ["Jc", "Tc"],
    certa: "B70",
    classe: "Sequência",
    porque: "sequência feita aposta por valor, em B70.",
  },
  {
    id: "co-qj",
    tipo: "conecta",
    pos: "BTN",
    hero: ["Qc", "Jd"],
    certa: "B70",
    classe: "Top pair forte",
    porque: "no turn que conecta o top pair aposta por valor, em B70.",
  },
  {
    id: "co-a4o",
    tipo: "conecta",
    pos: "HJ",
    hero: ["Ah", "4c"],
    certa: "B70",
    classe: "Bluff com o ás de copas",
    porque:
      "o A♥ bloqueia o flush draw do vilão e a mão não bloqueia o que ele folda, então blefa.",
  },
  {
    id: "co-a4s",
    tipo: "conecta",
    pos: "CO",
    hero: ["As", "4s"],
    certa: "Check",
    classe: "Bluff que bloqueia o backdoor",
    porque:
      "o A♠ e o 4♠ bloqueiam o backdoor de espadas, que é uma mão que folda, então dá check.",
  },
  {
    id: "co-ath",
    tipo: "conecta",
    pos: "HJ",
    hero: ["Ah", "Th"],
    certa: "B70",
    classe: "Flush draw forte com gutshot",
    porque:
      "o flush draw nuts é forte o bastante para apostar e pagar all-in, então aposta, em B70.",
  },
  {
    id: "co-kjh",
    tipo: "conecta",
    pos: "BTN",
    hero: ["Kh", "Jh"],
    certa: "B70",
    classe: "Flush draw forte com gutshot",
    porque:
      "com o flush draw forte e o gutshot a mão aposta e paga o all-in, em B70.",
  },
  {
    id: "co-a4h",
    tipo: "conecta",
    pos: "CO",
    hero: ["Ah", "4h"],
    certa: "Check",
    classe: "Flush draw que quer realizar",
    porque:
      "flush draw nuts fraco não aposta o turn que conecta: dá check para realizar a equity.",
  },

  // Overcard no turn (9s 7d 5c, turn Kd)
  {
    id: "oc-k9",
    tipo: "overcard",
    pos: "BTN",
    hero: ["Kh", "9c"],
    certa: "B70",
    classe: "Dois pares",
    porque: "dois pares com o rei novo aposta por valor, em B70.",
  },
  {
    id: "oc-kj",
    tipo: "overcard",
    pos: "CO",
    hero: ["Kc", "Jc"],
    certa: "B70",
    classe: "Novo top pair",
    porque: "o rei virou o novo top pair, e aposta por valor, em B70.",
  },
  {
    id: "oc-a7",
    tipo: "overcard",
    pos: "HJ",
    hero: ["Ah", "7h"],
    certa: "Check",
    classe: "Terceiro par com valor de showdown",
    porque:
      "tem valor de showdown e ganha vezes o suficiente dando check, então não vale apostar.",
  },
  {
    id: "oc-a4",
    tipo: "overcard",
    pos: "BTN",
    hero: ["Ad", "4s"],
    certa: "B70",
    classe: "Bluff sem showdown",
    porque:
      "sem valor de showdown, e a overcard não conecta com o vilão, então blefa em B70.",
  },
  {
    id: "oc-a9",
    tipo: "overcard",
    pos: "CO",
    hero: ["Ah", "9h"],
    certa: "B70",
    classe: "Second pair com ás",
    porque: "os 9x que conectam com o board apostam por valor, em B70.",
  },
  {
    id: "oc-88",
    tipo: "overcard",
    pos: "CO",
    hero: ["8h", "8d"],
    certa: "Check",
    classe: "Par de bolso com showdown",
    porque: "tem valor de showdown e ganha vezes o suficiente dando check.",
  },
  {
    id: "oc-44",
    tipo: "overcard",
    pos: "HJ",
    hero: ["4h", "4d"],
    certa: "Check",
    classe: "Par de bolso com showdown",
    porque: "tem valor de showdown e ganha vezes o suficiente dando check.",
  },

  // Flush completa com carta alta (9s 7s 3d, turn Ks)
  {
    id: "fa-a4s",
    tipo: "flushAlto",
    pos: "CO",
    hero: ["As", "4s"],
    certa: "B40",
    classe: "Flush do ás",
    porque: "flush nut com carta alta é thin value, em B40.",
  },
  {
    id: "fa-kj",
    tipo: "flushAlto",
    pos: "BTN",
    hero: ["Kc", "Jc"],
    certa: "B40",
    classe: "Novo top pair",
    porque: "o rei virou o novo top pair, e aposta por valor, em B40.",
  },
  {
    id: "fa-99",
    tipo: "flushAlto",
    pos: "HJ",
    hero: ["9d", "9h"],
    certa: "B40",
    classe: "Trinca",
    porque: "a trinca aposta por valor, em B40.",
  },

  // Flush completa com carta baixa (9s 7s 3d, turn 2s)
  {
    id: "fb-a5s",
    tipo: "flushBaixo",
    pos: "CO",
    hero: ["As", "5s"],
    certa: "B70",
    classe: "Flush do ás",
    porque: "flush nut com carta baixa aposta por valor, em B70.",
  },
  {
    id: "fb-a9",
    tipo: "flushBaixo",
    pos: "BTN",
    hero: ["Ad", "9c"],
    certa: "B70",
    classe: "Melhor top pair do flop",
    porque: "o melhor top pair do flop ainda aposta por valor, em B70.",
  },

  // Turn dobra o board (Qh 9s 2d, turn 2c)
  {
    id: "db-qq",
    tipo: "dobra",
    pos: "HJ",
    hero: ["Qc", "Qs"],
    certa: "B70",
    classe: "Full house",
    porque: "mão forte aposta por valor, em B70.",
  },
  {
    id: "db-aq",
    tipo: "dobra",
    pos: "CO",
    hero: ["Ah", "Qd"],
    certa: "B70",
    classe: "Top pair forte",
    porque:
      "na dobra o size é médio, B70, e o top pair forte aposta por valor.",
  },
  {
    id: "db-kk",
    tipo: "dobra",
    pos: "BTN",
    hero: ["Kh", "Kd"],
    certa: "B70",
    classe: "Overpair",
    porque: "na dobra o overpair aposta por valor, em B70.",
  },
]
