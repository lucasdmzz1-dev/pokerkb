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
  - tipo/exercicios
---

# 04-EXERCICIOS.md

# 3BET POT — EXERCÍCIOS


# OBJETIVO

Criar uma base prática de exercícios para dominar a tomada de decisão em potes 3betados.

Os exercícios devem treinar:

- Identificação da posição;
- Identificação do stack;
- Classificação do board;
- Escolha do size;
- Construção do range;
- Aplicação dos splits;
- Comparação entre guideline e solver.


---

# REGRAS DOS EXERCÍCIOS


Antes de responder qualquer spot, seguir a ordem:


1. Identificar a posição

- OOP
- IP


2. Identificar o stack

- Short Stack
- Deep Stack


3. Classificar o board


4. Definir a estratégia


5. Definir o size


6. Definir o split


7. Justificar a escolha


---

# SEPARAÇÃO OBRIGATÓRIA


Nunca misturar:


3BET POT OOP

≠

3BET POT IP


SHORT STACK

≠

DEEP STACK


Cada exercício deve pertencer a uma árvore específica.


---

# MODELO DE EXERCÍCIO


## SPOT


Posição:


Stack:


Street:


Board:


Ação pré-flop:



---

## PERGUNTA


Qual a estratégia correta?


Qual size utilizar?


Existe split?


Como construir o range?


---

## RESPOSTA


Classificação do board:


Estratégia:


Size:


Split:


Mãos principais:


---

## CORREÇÃO


Guideline:


Solver:


Diferença encontrada:


---

## APRENDIZADO


Regra consolidada:


Erro evitado:


Aplicação futura:



---


# 01 — 3BET POT OOP SHORT STACK


# FLOP


## BOARD SECO


Exercícios:


- Identificar quando utilizar B25.
- Avaliar quando existe estratégia de range bet.
- Separar mãos que apostam e mãos que realizam via check.



---

## BOARD CONECTADO


Exercícios:


- Identificar quando utilizar B40.
- Separar valor, blefe, check call e check raise.


Pontos de análise:


Valor:

- TP+


Blefe:

- FD
- 2 pontas


Check Call:

- Trincas
- Qualquer par
- Qualquer draw
- Valor de showdown


Check Raise:

- Overpairs
- TPTK
- Combo Draw



---

## BOARD COM SEQUÊNCIA


Exercícios:


- Identificar quando utilizar All-in.
- Trabalhar o split de stack.


Pontos de análise:


Valor:

- Primeiros overpairs ao board
- TP


Blefe:

- FD
- 2 pontas


Check Call:

- Trincas
- Sequências
- Par
- Brocas + redraw


Check Raise:

- Overpairs
- Combo Draw



---


# TURN — OOP SHORT STACK


Exercícios:


## BLANK

Estratégia:

B100 (GEO)


## HIGH CARD

Estratégia:

B40


## FLUSH

Estratégia:

B40


## CONECTA

Estratégia:

B70



---


# 02 — 3BET POT OOP DEEP STACK


# FLOP


## BOARD SECO


Exercícios:


- Avaliar escolha entre B25 e B40.
- Identificar necessidade de proteção e construção.


---

## BOARD Tx / Jx / 98xs


Exercícios:


- Identificar spots de B70.
- Trabalhar construção de range.


Split:


Valor:

- Primeiros overpairs ao board
- TP


Blefe:

- FD
- 2 pontas
- Brocas
- BDFD + BDST


Check Call:

- Trincas
- Qualquer par
- Qualquer draw
- Valor de showdown


Check Raise:

- Overpairs
- Combo Draw



---

## BOARD COM SEQUÊNCIA


Exercícios:


- Identificar diferença para Short Stack.
- Trabalhar B40.


Split:


Valor:

- Todos os overpairs
- Bottom set
- Melhores TP
- TP que conectem com board


Blefe:

- FD
- 2 pontas
- Brocas
- BDFD + BDST


Check Call:

- Top set
- Sequência com FD
- Qualquer par
- Draws diretos
- SD value + FD
- SD value + BDFD
- Combo Draw


Check Raise:

- Sequência
- Trincas restantes
- Combo Draw



---


# TURN — OOP DEEP STACK


Exercícios:


## BLANK

B100 (GEO)


## HIGH CARD

B40


## FLUSH

B40


## CONECTA

B70



---


# 03 — 3BET POT IP SHORT STACK


# FLOP


## B25


Exercícios:


- Identificar spots de range bet.
- Avaliar vantagem de range.


---

## B40


Exercícios:


- Identificar quando existe split.
- Separar mãos que apostam e mãos que controlam.


---

## B70


Exercícios:


- Identificar boards específicos.
- Avaliar necessidade de size maior.


Principalmente:

- Boards low;
- Boards dinâmicos.



---


# TURN — IP SHORT STACK


Exercícios:


Aplicar a estrutura geral de TURN:


Blank:

B100 (GEO)


High Card:

B40


Flush:

B40


Conecta:

B70



---


# 04 — 3BET POT IP DEEP STACK


# FLOP


Exercícios:


- Avaliar diferenças para Short Stack.
- Trabalhar construção de range com SPR maior.
- Identificar importância de cobertura de board.


---


# TURN — IP DEEP STACK


Aplicar:


Blank:

B100 (GEO)


High Card:

B40


Flush:

B40


Conecta:

B70



---

# EXERCÍCIOS DA AULA DO BB (09/11/2026)

Spot de todos: BB deu 3-bet contra o open do BTN, o BTN pagou e o BB age primeiro no flop. **Short:** 25bb, 3-bet de 6,5bb, pote de 14,5bb. **Deep:** 60bb ou mais. As mãos foram conferidas carta a carta com o board.

---

## Exercício 1 — Classifique o board (short)

Responda com a estratégia e o size.

| Board | Resposta |
|---|---|
| A♦ 8♠ 2♣ | B25, range bet (seco) |
| K♠ 7♦ 2♣ | B25, range bet (seco) |
| J♠ 5♦ 2♣ | B25, range bet (seco) |
| J♣ 6♥ 4♠ | B25, range bet (seco, rival com pouca interação) |
| A♠ T♠ 8♠ | B25, range bet (monotone) |
| Q♠ 8♦ 6♣ | B40, split (carregado) |
| J♣ 9♥ 4♥ | B40, split (carregado, sem sequência) |
| J♠ T♦ 7♦ | All-in, split (sequência) |
| 8♠ 7♦ 6♣ | All-in, split (sequência) |
| 9♦ 8♠ 6♣ | All-in, split (sequência) |

**Aprendizado:** a pergunta é se o valor perde ao ir all-in e se o range precisa de split. Referência: Regras 3 e 4 da aula do BB (`05-Regras-Consolidadas.md`).

---

## Exercício 2 — J♠ T♦ 7♦ no short stack

Mão do BB, uma de cada vez. O board tem sequência (all-in, split).

| Mão | Resposta | Motivo |
|---|---|---|
| A♣ J♣ | All-in | top pair sem o naipe do board, desbloqueia os draws |
| A♦ J♦ | Check-shove | top pair com nut flush draw |
| Q♣ Q♥ | Check-shove | overpair |
| T♣ T♥ | Check-call | trinca que bloqueia os T que pagam |
| A♠ 9♠ | All-in | broca, overcard e BDFD |

---

## Exercício 3 — J♣ 9♥ 4♥ no short stack

Board carregado, B40, split. Mão do BB:

| Mão | Resposta | Motivo |
|---|---|---|
| A♣ A♠ | Bet B40 | overpair, valor |
| A♣ J♦ | Bet B40 | top pair, valor |
| K♥ 5♣ | Bet B40 | só o K♥: BDFD e BDST |
| K♣ 5♦ | Check-fold | sem o naipe do board |
| J♠ J♦ | Check-call | trinca |
| A♥ K♥ | Check-shove | combo draw (a aula também aceita check-call) |

---

## Exercício 4 — J♣ 6♥ 4♠ no short stack

Mão do BB: A♠ K♠. **Resposta:** B25, range bet. O board é seco para o BB (pouca interação do rival), então não há split e toda mão aposta.

---

## Exercício 5 — Classifique o board (deep)

| Board | Resposta |
|---|---|
| K♠ 8♦ 2♣ | B25 |
| Q♣ 7♥ 3♦ | B25 |
| A♠ 9♦ 4♣ | B25 |
| 5♣ 5♥ 2♠ | B25, range |
| K♠ 9♦ 7♣ | B40 (interage mais) |
| T♠ 9♦ 8♣ | B40 (sequência) |
| 8♠ 7♦ 6♣ | B40 (sequência) |
| 9♠ 8♥ 2♠ | B70 (98x com flush draw) |
| J♠ 7♦ 2♠ | B70 (Jx com flush draw) |

**Regra de bolso:** com sequência, B40. Sem sequência e com flush draw em Tx, Jx ou 98x, B70. Seco, B25.

---

## Exercício 6 — K♦ K♠ no 2♠ 8♥ 9♠ (deep)

**Resposta:** bet B70 (split). Quanto mais deep, mais B70. Quanto mais raso, mais B40.

---

## Exercício 7 — Quando passar do all-in para o size

Pergunta: no short stack o all-in no J-T-7 é a melhor jogada. O que muda se o stack for deep (SPR 3)?

**Resposta:** o all-in deixa de servir, porque o rival pode foldar mãos médias. O board com sequência vira B40, em split, e o B40 deixa o SPR em 1 no turn.

# BANCO DE CORREÇÕES


Registrar:


## Spot:


## Erro:


## Motivo do erro:


## Correção:


## Nova regra criada:



---


# EXERCÍCIOS CONSOLIDADOS


Os exercícios que gerarem aprendizados importantes devem ser transferidos para:


05-Regras-Consolidadas.md


e:


09-Decisoes.md



# OBJETIVO FINAL


Ser capaz de analisar qualquer spot de 3BET POT seguindo:


Posição

↓

Stack

↓

Board

↓

Size

↓

Split

↓

Frequência Solver

<!-- graphify-links:start -->

---

## Ligações

_Gerado a partir do grafo do graphify. Não editar à mão: é sobrescrito na próxima geração._

**Pasta:** [[theory/08-3BET-POT/README|theory/08-3BET-POT]]

**Mesma pasta:** [[theory/08-3BET-POT/08 - 3BET POT GUIDELINE|01-Guideline]] · [[theory/08-3BET-POT/02-VideoAulas|02-VideoAulas]] · [[theory/08-3BET-POT/03-Solver|03-Solver]] · [[theory/08-3BET-POT/05-Regras-Consolidadas|05-Regras-Consolidadas]] · [[theory/08-3BET-POT/06-Pendencias|06-Pendencias]] · [[theory/08-3BET-POT/07-Changelog|07-Changelog]] · [[theory/08-3BET-POT/08-Referencias|08-Referencias]] · [[theory/08-3BET-POT/09-Decisoes|09-Decisoes]]

<!-- graphify-links:end -->
