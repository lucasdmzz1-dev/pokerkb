// Ranges de 3-bet do BB contra o open do BTN, para a Prática do módulo 08 (3Bet Pot).
// Fonte: Poker Academy (Charts), ChipEV, CE-Symmetric, Regular, BB vs. RFI do BTN, lidos
// em 09/11/2026. Só entram as mãos com raise (a ação que leva ao flop): o all-in não.
// No short (25bb) ficam de fora o JTs (raise 23%, all-in 77%) e o A9o (raise 7%, all-in
// 74%), por decisão do autor: quase sempre vão all-in e dificilmente chegam ao flop.
// Cada entrada é "mão:R<frequência do raise>". O tamanho é o do site, em múltiplos do open.

export type Stack3bet = 25 | 30 | 40 | 60 | 80

export const BB_3BET: Record<
  Stack3bet,
  { tamanho: string; freq: number; maos: string }
> = {
  25: {
    tamanho: "3x",
    freq: 5.6,
    maos: "AA:R100 AKs:R100 AQs:R55 AJs:R100 ATs:R100 KK:R100 QQ:R100 KJo:R9 JJ:R25 T9s:R80 98s:R61 A8o:R24 Q8o:R4 J8o:R7 T8o:R2 87s:R20 A7o:R16 K7o:R12 J7o:R14 T7o:R9 A6o:R13 K6o:R14 Q6o:R5 T6o:R11 A5o:R5 K5o:R16 Q5o:R4 J5o:R19 A4o:R2 K4o:R10 Q4o:R20 J4o:R4 A3o:R12 K3o:R8 Q3o:R12 Q2o:R18 J2o:R6",
  },
  30: {
    tamanho: "3.5x",
    freq: 9.4,
    maos: "AA:R100 AKs:R100 AQs:R100 AJs:R100 ATs:R100 AKo:R74 KK:R100 KQs:R76 QQ:R100 KJo:R24 QJo:R13 JJ:R100 JTs:R28 ATo:R12 KTo:R4 TT:R83 T9s:R61 A9o:R36 98s:R60 A8o:R20 Q8o:R10 J8o:R9 T8o:R7 87s:R35 A7o:R22 K7o:R13 Q7o:R4 J7o:R22 T7o:R17 A6o:R7 K6o:R34 Q6o:R15 T6o:R19 A5o:R27 K5o:R12 Q5o:R14 J5o:R18 A4o:R10 K4o:R14 Q4o:R17 J4o:R2 44:R18 A3o:R21 K3o:R13 Q3o:R20 J3o:R9 A2o:R10 Q2o:R15 J2o:R17",
  },
  40: {
    tamanho: "4x",
    freq: 13.3,
    maos: "AA:R100 AKs:R100 AQs:R100 AJs:R100 ATs:R100 AKo:R100 KK:R100 KQs:R100 KJs:R17 AQo:R32 KQo:R36 QQ:R100 AJo:R25 KJo:R33 QJo:R11 JJ:R100 ATo:R82 KTo:R5 TT:R100 A9o:R47 Q9o:R3 J9o:R11 T9o:R5 99:R100 A8o:R9 Q8o:R20 J8o:R16 T8o:R15 98o:R10 88:R7 A7o:R30 K7o:R30 Q7o:R6 J7o:R38 T7o:R19 97o:R14 A6o:R11 K6o:R42 Q6o:R20 T6o:R25 96o:R8 86o:R7 66:R55 A5o:R45 K5o:R24 Q5o:R16 J5o:R5 55:R45 A4o:R14 K4o:R16 Q4o:R8 44:R32 A3o:R18 K3o:R20 Q3o:R23 A2o:R8 Q2o:R27",
  },
  60: {
    tamanho: "4x",
    freq: 16.5,
    maos: "AA:R100 AKs:R100 AQs:R100 AJs:R100 ATs:R39 A5s:R1 A4s:R31 AKo:R100 KK:R100 KQs:R49 KJs:R35 K7s:R39 K6s:R40 K5s:R46 K4s:R18 AQo:R85 KQo:R91 QQ:R100 Q9s:R1 Q8s:R23 Q7s:R14 Q6s:R26 Q5s:R36 AJo:R86 KJo:R45 QJo:R36 JJ:R100 JTs:R3 J9s:R28 J8s:R62 J7s:R14 J5s:R31 ATo:R76 KTo:R42 QTo:R17 JTo:R15 TT:R100 T9s:R65 T8s:R78 T7s:R66 T6s:R89 A9o:R29 K9o:R1 Q9o:R27 J9o:R12 T9o:R9 99:R100 98s:R99 97s:R93 96s:R90 95s:R1 A8o:R2 Q8o:R4 J8o:R4 T8o:R1 98o:R3 88:R86 87s:R70 86s:R47 A7o:R23 K7o:R29 77:R36 76s:R57 75s:R1 A6o:R7 K6o:R35 Q6o:R18 66:R16 65s:R45 A5o:R44 K5o:R15 54s:R68 53s:R1 A4o:R24 A3o:R1",
  },
  80: {
    tamanho: "3.75x",
    freq: 15.6,
    maos: "AA:R100 AKs:R100 AQs:R100 AJs:R100 ATs:R100 A5s:R100 A4s:R88 AKo:R100 KK:R100 KQs:R100 KJs:R100 KTs:R89 K6s:R44 K5s:R23 AQo:R100 KQo:R69 QQ:R100 QJs:R51 QTs:R4 Q8s:R13 Q6s:R37 Q5s:R14 AJo:R59 KJo:R40 QJo:R28 JJ:R100 JTs:R48 J9s:R54 J8s:R80 J7s:R25 J5s:R12 ATo:R37 KTo:R23 QTo:R26 TT:R100 T9s:R100 T8s:R100 T7s:R39 T6s:R84 K9o:R4 Q9o:R8 J9o:R9 99:R95 98s:R100 97s:R65 96s:R80 88:R44 87s:R100 86s:R100 85s:R10 A7o:R14 K7o:R43 77:R7 76s:R100 75s:R13 A6o:R6 K6o:R14 66:R22 65s:R100 A5o:R10 K5o:R13 54s:R100",
  },
}

const TABELA = new Map<Stack3bet, Map<string, number>>()

function tabela(stack: Stack3bet): Map<string, number> {
  let t = TABELA.get(stack)
  if (!t) {
    t = new Map()
    for (const item of BB_3BET[stack].maos.split(" ")) {
      const [classe, f] = item.split(":R")
      t.set(classe, Number(f))
    }
    TABELA.set(stack, t)
  }
  return t
}

// O BB dá 3-bet (raise) com esta classe de mão, com qualquer frequência acima de zero.
export function bb3bet(stack: Stack3bet, classe: string): boolean {
  return (tabela(stack).get(classe) ?? 0) > 0
}

export function classesDo3bet(stack: Stack3bet): string[] {
  return [...tabela(stack).keys()]
}
