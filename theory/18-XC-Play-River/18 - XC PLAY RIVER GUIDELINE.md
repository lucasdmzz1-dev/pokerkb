---
tags:
  - modulo/18-xc-play-river
  - spot/srp
  - posicao/oop
  - street/river
  - linha/xc-xx-play
  - tipo/guideline
---

# Guideline — XC e Play River

> Módulo 18 — XC e Play River

---

# Contexto

Stack: de 18bb a mais de 100bb nos exemplos.
Spot: BTN abre, BB paga. Flop: check-call. Turn: check-check. River: o BB age primeiro (linha XC-XX-B).
Posição: Hero no BB, fora de posição.
Street: river.
Fonte: TXT "Jogando do BB na linha XC-XX-B", mostrado na tela, e a fala do instrutor.

---

# Como ler

- O "tipo" é o que o turn e o river fizeram com o board: nada (blank), uma high card, flush, sequência ou dobra.
- Todo spot tem dois sizes: um baixo e um alto. O baixo é B25 (ou B40, quando o grupo que aposta é mais restrito). O alto é o pote (B100).
- No jogo short stack, o size alto vira all-in: o que faria pote vai all-in. Com muitos bluffs disponíveis, o size alto pode passar do pote (B150).
- "9 high ou menor" e "T high ou maior" falam da carta mais alta da mão que blefa.

---

# Blank

Exemplo: J♥ 6♦ T♠, turn 3♣, river 5♣.

**Sizes: B25 e B100.**

| Size | Valor | Bluff |
|---|---|---|
| B25 | Dois pares, second pairs e os melhores third pairs (só quando não completam draws do board) | 9 high ou menor |
| B100 | Top pairs e os melhores second pairs | J high, Q high. A high só quando completam draws |

Justificativa: o BTN quase não tem top pair. O top pair do BB vira o nuts e quer o máximo de fichas. O second pair extrai de pares médios e de A-x, e aposta baixo porque não é uma mão absoluta.

---

# Dinâmico: high card

A ordem importa. A high card no turn deixa o BTN ainda mais capado. A high card no river dá a ele mais mãos que acertaram.

## High card no turn

Exemplo: Q-5-2, turn K, river 8.

**Sizes: B25 e B100.**

| Size | Valor | Bluff |
|---|---|---|
| B25 | Dois pares contendo o third pair, second pairs e os melhores third pairs (só quando não completam draws do board) | 9 high ou menor |
| B100 | Top pairs e second pairs | High cards, menos A high |

No exemplo, o Q-x é forte o bastante para o pote: o range do BTN está concentrado em 66, 77, 99, TT e JJ.

## High card no river

Exemplo: Q-5-2, turn 8, river K.

**Sizes: B40 e B70.**

| Size | Valor | Bluff |
|---|---|---|
| B40 | (em branco no TXT) | 9 high ou menor |
| B70 | Top pairs e second pair | J high, Q high. A high só quando completam draws |

Justificativa: com a mudança de nuts no river, o BTN ainda tem mais mãos que acertaram. O size alto desce para o B70, para o valor continuar sendo pago.

---

# Dinâmico: flush

**Sizes: B25 (ou B40) e B100.** O título do TXT diz B25-B100, e as linhas usam B40. A escolha entre B25 e B40 segue a composição: grupo mais restrito, B40.

| Size | Valor | Bluff |
|---|---|---|
| B40 | Os melhores second pairs e flush + par que bloqueia o calling range | Frequência pequena de airs |
| B100 | Top pairs ou melhor | J high ou menor (no TXT). Na fala: as broadways |

---

# Dinâmico: straight

## Sequência no turn

**Sizes: B25 e B100.**

| Size | Valor | Bluff |
|---|---|---|
| B25 | Second pair e os melhores third pairs | Air que faz foldar vários air melhores |
| B100 | Top pairs ou melhor | Air que faz foldar poucos air melhores (como A-x e K-x) |

## Sequência no river

Os bluffs em size alto vêm de blockers.

## Quatro cartas para a sequência

| Board | O BTN tem a sequência? | Estratégia |
|---|---|---|
| Q-8-7, turn 5, river 6 (falta 4 ou 9) | Pouco | B25 e B100. A sequência vai no B100 e os dois pares no B25 |
| Q-9-2, turn T, river J (falta K ou 8) | Muito: ele tem K-x em todas as posições | B100 ou check. Só o K aposta por valor. O 8 e os dois pares dão check-call |

Justificativa: quando a sequência vem de low cards, o BTN tem poucas, e o BB aposta muitas mãos de valor além da sequência. Quando vem de uma Broadway, os dois pares ganham mais no check-call, porque desbloqueiam o que ele blefa.

---

# Dinâmico: dobra

**Sizes: B25 e B100.**

| Size | Valor | Bluff |
|---|---|---|
| B25 | Third pair, se houver muitos draws bustados. Caso contrário, second pair | 9 high ou menor (quanto mais folds naturais, menor o size) |
| B100 | Trincas e os melhores second pairs | T high ou maior. Não blefar A high |

Na fala: o que vira trinca vai para o B100 e o que não é trinca vai para o B25. Um top pair forte que ainda sobrou também vai no B100. O grupo de bluffs é o mesmo dos outros boards.

---

# Enfrentando o bet do BTN (check-call)

O BB dá check e o BTN aposta (bet-check-bet). O range de valor do BTN é restrito, porque ele já não tem o topo. O call vem de mãos que desbloqueiam os bluffs dele.

- **Quem paga:** qualquer par é candidato, principalmente o third pair, com kicker que não bloqueia os bluffs.
- **Kickers ruins:** os que o BTN blefa. No J-T-6 da aula, Q-x e 9-x são péssimos e K-x é ruim. 6-2, 6-4, 6-7 e 6-8 pagam. 6-9, 6-Q e 6-K foldam.
- **Ás é bom kicker:** o BTN tende a não blefar A-x, porque quer fazer foldar A-x e K-x. A-6 é ótimo call.
- **Pelo size do BTN:**
  - 1/3 a 40% do pote: call com qualquer par.
  - 2/3 a 75% do pote (o size normal): call com o grupo acima.
  - Overbet: mais cuidado. A história dele não faz sentido, e o call é pontual.
- **River com high card:** é um dos spots mais overbluffados. O ajuste é pagar mais.

---

# Check-raise no river (tempero)

| | Board | Mão |
|---|---|---|
| Valor | Com sequência | A sequência, cerca de 50% das vezes |
| Valor | Com flush | Flush com o par do board |
| Valor | Normal | Dois pares que desbloqueiam o par que ele aposta por valor, cerca de 50% das vezes |
| Bluff | Normal | Par com a última carta que bateu no board (bloqueia os dois pares dele) |
| Bluff | Com sequência | Blocker da sequência |
| Bluff | Com flush | Blocker do flush |

Com efetivo de até 30bb, o check-raise é check-shove.

---

# Considerações finais (TXT)

1. Top pairs ou melhor sempre querem ir para o size alto.
2. O segundo par entra na composição do size baixo.
3. Quanto mais draws bustados, mais o segundo par entra na composição do bet alto.
4. Quanto mais draws bustados, mais o terceiro par faz a composição do bet baixo.
5. Quanto mais mãos naturais fazemos foldar, usamos o B25 (bluff de low cards, 9 high ou menor).
6. Quanto menos mãos naturais fazemos foldar, usamos o B100 (bluff de high cards, T high ou maior).
7. A high só blefa quando completam draws claros.
