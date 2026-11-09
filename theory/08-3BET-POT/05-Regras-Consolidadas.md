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
  - tipo/regras
---

# 05-REGRAS-CONSOLIDADAS.md

# 3BET POT — REGRAS CONSOLIDADAS


# OBJETIVO

Registrar todo o conhecimento final extraído do módulo 3BET POT.

Este arquivo representa as conclusões estratégicas consolidadas após análise de:

- Guideline;
- Videoaulas;
- Transcrições;
- Solver;
- Exercícios;
- Correções.


---

# PRINCÍPIO FUNDAMENTAL DO MÓDULO


A primeira decisão em qualquer spot de 3BET POT é identificar:


1. Posição

2. Stack

3. Board

4. Size

5. Split


Nunca analisar uma situação sem essa classificação.


---

# SEPARAÇÃO DAS ESTRATÉGIAS


## 3BET POT OOP


Possui uma estratégia própria baseada em:

- Menor realização de equity;
- Necessidade de proteção;
- Construção de ranges de aposta e defesa.


---

## 3BET POT IP


Possui uma estratégia própria baseada em:

- Posição;
- Melhor realização de equity;
- Maior controle de pote.


---

# REGRA ABSOLUTA




Nunca transportar uma linha de Short Stack para Deep Stack.


---

# FLOP — OOP SHORT STACK


## BOARD SECO

Estratégia:

B25


---

## BOARD CONECTADO

Estratégia:

B40


Split:


Valor:

- TP+


Blefe:

- FD
- 2 pontas


Check Call:

- Trincas;
- Qualquer par;
- Qualquer draw;
- Valor de showdown.


Check Raise:

- Overpairs;
- TPTK;
- Combo Draw.



---

## BOARD COM SEQUÊNCIA

Estratégia:

ALL-IN


Split:


Valor:

- Primeiros overpairs ao board;
- TP.


Blefe:

- FD;
- 2 pontas.


Check Call:

- Trincas;
- Sequências;
- Par;
- Brocas + redraw.


Check Raise:

- Overpairs;
- Combo Draw.



---

# FLOP — OOP DEEP STACK


## BOARD SECO

Estratégia:

B25-B40


---

## BOARD Tx / Jx / 98xs

Estratégia:

B70


Split:


Valor:

- Primeiros overpairs ao board;
- TP.


Blefe:

- FD;
- 2 pontas;
- Brocas;
- BDFD + BDST.


Check Call:

- Trincas;
- Qualquer par;
- Qualquer draw;
- Valor de showdown.


Check Raise:

- Overpairs;
- Combo Draw.



---

## BOARD COM SEQUÊNCIA

Estratégia:

B40


Split:


Valor:

- Todos os overpairs;
- Bottom set;
- Melhores TP;
- TP que conectem com board.


Blefe:

- FD;
- 2 pontas;
- Brocas;
- BDFD + BDST.


Check Call:

- Top set;
- Sequência com FD;
- Qualquer par;
- Draws diretos;
- SD value + FD;
- SD value + BDFD;
- Combo Draw.


Check Raise:

- Sequência;
- Trincas restantes;
- Combo Draw.



---

# TURN — 3BET POT


A estrutura de TURN é geral para o módulo.


## BLANK

B100 (GEO)


## HIGH CARD

B40


## FLUSH

B40


## CONECTA

B70



---

# CONSTRUÇÃO DE BLEFES


Blefe não deve ser construído apenas com blockers.


Priorizar:


- Flush Draw;
- Backdoor Flush Draw;
- Backdoor Straight Draw;
- Draws diretos;
- Mãos com potencial de evolução.


Evitar:


- Mãos sem equidade;
- Blockers sem futuro.



---

# GUIDELINE X SOLVER


## GUIDELINE


Responsável por:

- Estratégia base;
- Simplificação;
- Tomada de decisão prática.


---

## SOLVER


Responsável por:

- Frequências;
- Misturas;
- Ajustes;
- Exceções.


O solver complementa o guideline.


---

# ERROS PRINCIPAIS


## Misturar IP e OOP


Correção:

Sempre identificar a posição antes da análise.



---

## Misturar Short e Deep


Correção:

Sempre identificar o SPR antes da estratégia.



---

## Transformar qualquer blocker em blefe


Correção:

Avaliar equidade e potencial futuro.



---

# CONCLUSÃO FINAL


A análise de 3BET POT deve seguir:


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


A estratégia correta nasce da árvore correta.

# REGRAS DA AULA DO BB — 09/11/2026

Regras do BB que deu 3-bet contra o open do BTN, fora de posição. As regras anteriores deste arquivo continuam valendo para o resto do módulo.

---

## Regra 1 — BB e SB não se misturam

O range do BB é mais polarizado, e a frequência média de aposta e a realização de equity fora de posição são menores. Não use a árvore do SB no BB.

## Regra 2 — O pré-flop define a faixa de stack

Até 30bb (short stack), 3-bet muito polarizado e muitas mãos off jogáveis. De 30 a 60bb (middle stack), cobertura de board. Acima de 60bb (deep stack), range linear com suited. (Contexto de pré-flop, vindo da aula anterior. Ver Pendência 12 e a Regra 14.)

## Regra 3 — Ordem de decisão do size

Primeiro o valor (qual size extrai o máximo), depois os bluffs que acompanham esse size, e por último o check.

## Regra 4 — Short stack: três estratégias

- **B25, range bet:** seco, monotone e dobrado. O BB tem vantagem absoluta.
- **B40, split:** carregado sem sequência.
- **All-in, split:** board com sequência. Exceção: 6-5-4 e 5-4-3.

## Regra 5 — All-in, split ou range

- All-in quando o valor precisa de proteção e o range não perde ao colocar tudo.
- B40 quando o range precisa de split e o valor não precisa de proteção.
- B25 quando a vantagem é absoluta.

Se o rival não folda os pares para o all-in, o all-in extrai o máximo. Surgindo a dúvida sobre ele pagar ou não, a estratégia passa para o size.

## Regra 6 — Short stack: o que cada mão faz

- **Bet por valor:** top pair ou melhor, com os primeiros overpairs. No all-in, só os primeiros overpairs e os top pairs.
- **Bet de bluff:** draws diretos e BDFD + BDST, só com o naipe do board.
- **Check-call:** trincas (SPR baixo não pede acelerar e bloqueia quem paga), qualquer par que não seja top pair, qualquer draw (direto, com redraw, em board carregado) e valor de showdown (A-K e A-Q).
- **Check-raise (check-shove):** overpairs que deram check e combo draws.
- **Check-fold:** o que não cai em nada acima, como K5 e A6 sem o naipe do board.

## Regra 7 — Nunca fold par nem draw depois do check

Quem dá check com um par ou um draw direto não folda para o size pequeno do rival. O fold fica para a mão sem par e sem draw.

## Regra 8 — Dois pares

Em SPR baixo, dois pares é mão de slow play em board sem sequência. Com sequência no board, pode apostar.

## Regra 9 — Deep stack: três estratégias

- **B25:** seco (e o range inteiro, quando o board não muda o nuts).
- **B40, split:** board com sequência (todos os overpairs apostam). Também em seco que interage mais.
- **B70, split:** Tx e Jx conectados com flush draw, e 98x com flush draw. Sem o flush draw, o Tx e o Jx podem ir para B40.

## Regra 10 — Deep stack: o que cada mão faz

- **Bet por valor (B40):** sequência sem o naipe do board, todos os overpairs, top pairs que conectam ou com kicker extra, e a trinca de baixo.
- **Bet por valor (B70):** top pairs (os piores vão para o check) e os primeiros overpairs.
- **Bet de bluff:** duas pontas, brocas com flush draw e BDFD + BDST. Sem backdoor, não aposta.
- **Check-call:** top set, sequência com flush draw, qualquer par, draws diretos, valor de showdown com flush draw ou BDFD. A-K e A-Q só com redraw em board com sequência.
- **Check-raise:** sequência sem flush draw, trincas que não bloqueiam o top pair, combo draws e, no B70, overpairs. O size é muito alto, para atolar o turn.

## Regra 11 — Size alto pede mão forte

Quanto mais alto o size, mais o rival folda e mais restritos ficam o valor e o bluff. Guarde os piores top pairs para o check.

## Regra 12 — O check precisa ter plano

Fora de posição, dar check com mão que queria apostar custa EV (cobertor curto). Toda mão boa que dá check já sabe se vai para check-call ou check-shove.

## Regra 13 — 3-betar mais do que a teoria

O field abre demais e folda muito, então 3-betar mais é lucrativo, até o meio do torneio. Na reta final e contra rival equilibrado, ajuste para menos.

## Regra 14 — Middle stack (30 a 60bb): mistura entre short e deep

As três faixas da aula são até 30bb (short), de 30 a 60bb (middle) e 60bb ou mais (deep). O middle não tem árvore própria: é uma mistura. Perto de 30bb, joga-se mais como short stack, e perto de 60bb, mais como deep. Na prática, o instrutor dá exemplos com stacks definidos e a estratégia segue o stack do exemplo. **[Autor, esclarecimento de 09/11/2026]**

<!-- graphify-links:start -->

---

## Ligações

_Gerado a partir do grafo do graphify. Não editar à mão: é sobrescrito na próxima geração._

**Pasta:** [[theory/08-3BET-POT/README|theory/08-3BET-POT]]

**Mesma pasta:** [[theory/08-3BET-POT/08 - 3BET POT GUIDELINE|01-Guideline]] · [[theory/08-3BET-POT/02-VideoAulas|02-VideoAulas]] · [[theory/08-3BET-POT/03-Solver|03-Solver]] · [[theory/08-3BET-POT/04-Exercicios|04-Exercicios]] · [[theory/08-3BET-POT/06-Pendencias|06-Pendencias]] · [[theory/08-3BET-POT/07-Changelog|07-Changelog]] · [[theory/08-3BET-POT/08-Referencias|08-Referencias]] · [[theory/08-3BET-POT/09-Decisoes|09-Decisoes]]

<!-- graphify-links:end -->
