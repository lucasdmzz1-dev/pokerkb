---
tags:
  - modulo/08-3bet-pot
  - spot/3bp
  - posicao/ip
  - posicao/oop
  - street/flop
  - street/turn
  - stack/short
  - stack/deep
  - tipo/guideline
---

# 3BET POT — GUIDELINE


**Flashcards:** [[theory/08-3BET-POT/08 - 3BET POT FLASHCARDS|08 - 3BET POT FLASHCARDS]]


# OBJETIVO

Definir as estratégias pós-flop em potes 3betados considerando:

- Posição (OOP / IP)
- Stack efetivo (Short / Deep)
- Textura do board
- Escolha de size
- Construção de range


---

# PRINCÍPIOS FUNDAMENTAIS


## SEPARAÇÃO DE ESTRATÉGIAS

3BET POT OOP ≠ 3BET POT IP

SHORT STACK ≠ DEEP STACK


Nunca utilizar uma estratégia de uma árvore em outra.


---

# DIFERENÇA DE POSIÇÃO


## IP

Principal objetivo:

- Atacar pares;
- Realizar melhor a equidade;
- Controlar o pote através da posição.


## OOP

Principal objetivo:

- Pressionar pares e draws;
- Proteger a equidade;
- Construir ranges de aposta e defesa mais cuidadosos.


---

# DIFERENÇA DE STACK


## SHORT STACK

Características:

- SPR baixo;
- Menos streets disponíveis;
- Mais simplificação;
- Maior facilidade de jogar por stacks.


## DEEP STACK

Características:

- SPR alto;
- Mais necessidade de construção de range;
- Maior importância de cobertura de board;
- Mais valor para mãos suited e conectadas.


---


# 01 — 3BET POT OOP


# 01.1 — SHORT STACK


## FLOP


# BOARD SECO

## Estratégia:

B25


Estratégia de range.


---

# BOARD CONECTADO

## Estratégia:

B40


## SPLIT B40


### VALOR

- TP+


### BLEFE

- FD
- 2 pontas


### CHECK CALL

- Trincas
- Qualquer par
- Qualquer draw
- Mãos com valor de showdown


### CHECK RAISE

- Overpairs
- TPTK
- Combo Draw


---

# BOARD COM SEQUÊNCIA

## Estratégia:

ALL-IN


## SPLIT ALL-IN


### VALOR

- Primeiros overpairs ao board
- TP


### BLEFE

- FD
- 2 pontas


### CHECK CALL

- Trincas
- Sequências
- Par
- Brocas + redraw


### CHECK RAISE

- Overpairs
- Combo Draw


---


# 01.2 — DEEP STACK


## FLOP


# BOARD SECO

## Estratégia:

B25-B40


---

# BOARD Tx / Jx / 98xs


## Estratégia:

B70


## SPLIT B70


### VALOR

- Primeiros overpairs ao board
- TP


### BLEFE

- FD
- 2 pontas
- Brocas
- BDFD + BDST


### CHECK CALL

- Trincas
- Qualquer par
- Qualquer draw
- Mãos com valor de showdown


### CHECK RAISE

- Overpairs
- Combo Draw


---


# BOARD COM SEQUÊNCIA


## Estratégia:

B40


## SPLIT B40


### VALOR

- Todos os overpairs
- Bottom set
- Melhores TP
- TP que conectem com o board


### BLEFE

- FD
- 2 pontas
- Brocas
- BDFD + BDST


### CHECK CALL

- Top set
- Sequência com FD
- Qualquer par
- Draws diretos
- SD value + FD
- SD value + BDFD
- Combo Draw


### CHECK RAISE

- Sequência
- Trincas restantes
- Combo Draw


---


# TURN — 3BET POT


A estratégia de TURN é geral para o módulo.


## BLANK

B100 (GEO)


---

## HIGH CARD

B40


---

## FLUSH

B40


---

## CONECTA

B70


---


# 02 — 3BET POT IP


# 02.1 — SHORT STACK


## FLOP


# B25

Estratégia:

Range Bet


---

# B40

Estratégia:

Split


---

# B70

Estratégia:

Boards específicos


Principalmente:

- Boards low;
- Boards onde existe necessidade de maior pressão.


---


# 02.2 — DEEP STACK


## FLOP


Estratégia baseada em:

- maior SPR;
- maior cobertura de board;
- construção de range.


Aplicar guideline específico IP Deep.


---

# 03 — GUIDELINE DA AULA DO BB (09/11/2026)

**Fonte:** aula "3bet pot do BB — Postflop 1" (transcrição e vídeo), guideline que o instrutor recita no fim de cada parte. Vale só para o **BB que deu 3-bet contra o open do BTN, fora de posição no flop**. O SB e o IP não foram tratados na aula (Pendência 13).

**Spot de referência (replayer da aula):** BTN abre 2bb, BB dá 3-bet de 6,5bb a 7bb e o BTN paga. Pote no flop de 13 a 15,5bb. O BB faz cerca de 1bb a mais que o SB, porque o range do BB é mais polarizado.

---

## BB SHORT STACK (até 30bb, SPR baixo)

| Board | Estratégia | Exemplos da aula |
|---|---|---|
| Seco, monotone e dobrado | B25, range bet | A-8-2, K-7-2, Q-7-3, J-5-2, J-6-4, A-T-8 monotone |
| Carregado, sem sequência | B40, split | J-9-4, Q-8-6 |
| Com sequência | ALL-IN, split | J-T-7, 9-8-6, 8-7-6 |

Exceção citada: 6-5-4 e 5-4-3 (o rival quase não acerta par). A teoria apontaria range all-in, mas o instrutor chamou de "exceção da exceção" e pediu para não generalizar.

### Split B40 (carregado sem sequência)

- **Valor (bet):** top pair ou melhor, com os primeiros overpairs.
- **Bluff (bet):** draws diretos e mãos com BDFD + BDST (só com o naipe do board).
- **Check-call:** trincas, qualquer par que não seja top pair, qualquer draw (mais carregado o board, mais o draw precisa ser direto e com redraw) e mãos com valor de showdown (A-K, A-Q e, às vezes, A-J).
- **Check-raise (check-shove):** overpairs que deram check e combo draws.
- **Check-fold:** o que não cai em nada acima. A aula cita K5 e A6 sem o naipe do board.

### Split ALL-IN (com sequência)

- **Valor (all-in):** os primeiros overpairs ao board e os top pairs.
- **Bluff (all-in):** flush draws e duas pontas. Ás-alta com broca e BDFD (como A♠9♠ no J-T-7) também entra.
- **Check-call:** trincas, sequências, pares e brocas com redraw.
- **Check-raise (check-shove):** overpairs e combo draws.
- **Check-fold:** o que não tem par, draw direto nem naipe do board.

### Range B25 (seco)

Todas as mãos apostam. O BB tem vantagem absoluta: o rival tem pouca interação com o board, as mãos de valor não precisam de proteção e o rival folda muito.

---

## BB DEEP STACK (60bb ou mais, SPR alto)

| Board | Estratégia | Exemplos da aula |
|---|---|---|
| Seco | B25 (B40 quando o board interage mais) | K-8-2, Q-7-3, A-9-4, 5-5-2 em B25. K-9-7 em B40 |
| Com sequência | B40, split | K-9-8, Q-9-8, 8-7-6, T-9-8 |
| Tx ou Jx conectado com flush draw, e 98x com flush draw | B70, split | 9-8-2, J-7-2, T-8-4 |

Sem o flush draw, o Tx e o Jx podem ir para B40. O all-in deixa de servir: o board com sequência muda muito para as próximas streets, e apostar alto isola o BB contra um range forte e o deixa sem ação quando vem 9, T ou o board pareia.

### Split B40 deep (com sequência)

- **Valor (bet):** sequência sem o naipe do board, todos os overpairs, top pairs que conectam com o board ou têm kicker extra, e a trinca de baixo.
- **Bluff (bet):** duas pontas, brocas com flush draw e BDFD + BDST. Em board com sequência o bluff é quase só equity direta.
- **Check-call:** top set (bloqueia quem paga), sequência com flush draw (deixa o rival acertar), qualquer par, draws diretos, mãos de showdown com flush draw ou BDFD. A-K e A-Q só com redraw.
- **Check-raise:** sequência sem flush draw (bet também serve), trincas que não bloqueiam o top pair e combo draws. O check-raise vai em size muito alto, para atolar o turn.
- **Overpairs:** apostam. O check-raise com overpair é exceção (A-A ou K-K com o naipe do board).

### Split B70 deep (Tx e Jx com flush draw)

- **Valor (bet):** os top pairs (os piores ficam para o check) e os primeiros overpairs. O size alto exige um range de valor mais restrito.
- **Bluff (bet):** duas pontas, brocas com redraw e BDFD + BDST. Sem backdoor não aposta (A♣5♥ no 9-8-2 não vira bluff).
- **Check-call:** draws, qualquer par, trincas (bloqueiam o que paga) e valor de showdown.
- **Check-raise:** overpairs e combo draws.

---

## COMO O INSTRUTOR ESCOLHE O SIZE

1. Veja as mãos de valor: qual size extrai o máximo delas.
2. Depois monte os bluffs, que acompanham o size (all-in pede equity direta).
3. Por último, monte o check, para não ficar com check-fold infinito.

Se o rival não folda os pares para o all-in, o melhor size para o valor é o all-in. Se surgir dúvida sobre ele pagar ou não, a estratégia passa para o size (B40).

# CONSTRUÇÃO DE BLEFES


Blefe não é composto apenas por blockers.


Priorizar mãos com:


- Equidade;
- Flush Draw;
- Backdoor Flush Draw;
- Backdoor Straight Draw;
- Possibilidade de evolução.


Evitar transformar mãos sem potencial em blefes.


---


# BOARDS LOW


Boards baixos possuem importância especial.


Características:

- Alteram a distribuição de vantagem;
- Possuem maior necessidade de adaptação;
- Podem exigir splits diferentes.


---


# GUIDELINE X SOLVER


## GUIDELINE

Define:

- Estratégia base;
- Size principal;
- Estrutura do range.


## SOLVER

Define:

- Frequência;
- Misturas;
- Ajustes específicos.


---

# ORDEM DE ANÁLISE


1. Posição

2. Stack

3. Board

4. Size

5. Split

6. Frequência Solver


---

# REGRA FINAL


Nunca copiar uma estratégia de:

- OOP para IP;
- IP para OOP;
- Short para Deep;
- Deep para Short.


Cada árvore deve ser estudada separadamente.

<!-- graphify-links:start -->

---

## Ligações

_Gerado a partir do grafo do graphify. Não editar à mão: é sobrescrito na próxima geração._

**Pasta:** [[theory/08-3BET-POT/README|theory/08-3BET-POT]]

**Mesma pasta:** [[theory/08-3BET-POT/02-VideoAulas|02-VideoAulas]] · [[theory/08-3BET-POT/03-Solver|03-Solver]] · [[theory/08-3BET-POT/04-Exercicios|04-Exercicios]] · [[theory/08-3BET-POT/05-Regras-Consolidadas|05-Regras-Consolidadas]] · [[theory/08-3BET-POT/06-Pendencias|06-Pendencias]] · [[theory/08-3BET-POT/07-Changelog|07-Changelog]] · [[theory/08-3BET-POT/08-Referencias|08-Referencias]] · [[theory/08-3BET-POT/09-Decisoes|09-Decisoes]]

**Outros módulos:**

- [[theory/07-XR-DEEP/05-Regras-Consolidadas|07-XR-DEEP · 05-Regras-Consolidadas]]
- [[theory/07-XR-DEEP/07 - XR DEEP GUIDELINE|07-XR-DEEP · 01-Guideline]]
- [[theory/07-XR-DEEP/07-Changelog|07-XR-DEEP · 07-Changelog]]

<!-- graphify-links:end -->
