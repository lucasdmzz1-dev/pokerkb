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
  - tipo/pendencias
---

# 06-PENDENCIAS.md

# 3BET POT — PENDÊNCIAS


# OBJETIVO

Registrar todos os pontos que ainda precisam de validação, aprofundamento ou revisão dentro do módulo 3BET POT.


Este arquivo deve conter somente:

- Dúvidas abertas;
- Pontos não consolidados;
- Divergências encontradas;
- Spots aguardando análise;
- Necessidades de validação no solver.


---

# REGRAS DE UTILIZAÇÃO


Antes de transformar qualquer ponto em regra definitiva:


1. Revisar guideline.

2. Revisar videoaulas e transcrições.

3. Revisar exemplos apresentados.

4. Validar no solver.

5. Registrar decisão final em:

`09-Decisoes.md`


---

# PENDÊNCIAS ATUAIS


# 01 — 3BET POT IP


## Status:

Em consolidação.


Pontos para revisar:


- Estratégia completa de Flop IP;
- Diferenças entre Short Stack e Deep Stack;
- Splits específicos;
- Exemplos das aulas;
- Frequências do solver.


---

# 02 — 3BET POT IP DEEP STACK


## Status:

Necessita consolidação completa.


Validar:


- Sizes utilizados;
- Boards específicos;
- Construção de range;
- Diferenças em relação ao Short Stack.


---

# 03 — EXEMPLOS DAS AULAS


## Status:

Em organização.


Adicionar:


- Spot;
- Contexto;
- Decisão;
- Estratégia aplicada;
- Motivo da escolha.


---

# 04 — SOLVER


## Status:

Em expansão.


Adicionar:


- Spots importantes;
- Frequências;
- Misturas encontradas;
- Diferenças entre guideline e solver.


---

# 05 — EXERCÍCIOS


## Status:

Em construção.


Adicionar:


- Exercícios por árvore:
  - OOP Short;
  - OOP Deep;
  - IP Short;
  - IP Deep.


- Correções;
- Erros recorrentes;
- Aprendizados.


---

# PONTOS QUE NÃO DEVEM SER CONSIDERADOS PENDENTES


## TURN — 3BET POT


Estrutura consolidada:


- Blank → B100 (GEO)
- High Card → B40
- Flush → B40
- Conecta → B70


Aplicável ao módulo 3BET POT.


---

# DIVERGÊNCIAS ENCONTRADAS


Caso exista conflito entre:


- Guideline;
- Aula;
- Transcrição;
- Solver;


Registrar:


## Fonte 1:

## Fonte 2:

## Conflito:

## Decisão:


## Divergência 01 — Ordem de prioridade das fontes

Conflito registrado na leitura completa da teoria (MAIN CHAT TEORIA, 28/10/2026).

## Fonte 1:

`08-Referencias.md` deste módulo: Guideline, Videoaulas, Transcrições, Solver, Exercícios, Correções.

## Fonte 2:

`theory/CLAUDE.md`: correção do instrutor, solver, videoaula, guideline, exercícios.

## Conflito:

A ordem do módulo está invertida em relação à geral: a correção do instrutor fica em último e o guideline em primeiro.

## Decisão:

Resolvida (28/10/2026): seguir a ordem geral do KB, com o autor do KB em 1º. Ver `08-Referencias.md` e a decisão 07 de `09-Decisoes.md`.


---

# REGRA FINAL


Nenhuma pendência deve virar regra estratégica sem passar por:


Material original

↓

Validação

↓

Decisão consolidada

---

# ATUALIZAÇÕES DE 09/11/2026

Fonte: aula "3bet pot do BB — Postflop 1". As dúvidas abaixo são da aula e da leitura da transcrição automática.

---

# 05 — STACK DO DEEP

A aula fala em "60 a 80bb" para o deep e dá um K-K em um replayer de ~43bb efetivos como exemplo deep. O short também varia (20 e poucos bb nos replayers, 30bb na fala).

**Resolvida em parte (autor, 09/11/2026):** as faixas são até 30bb (short), de 30 a 60bb (middle, uma mistura entre as duas árvores, mais perto de 30 joga como short e mais perto de 60 joga como deep) e 60bb ou mais (deep). O instrutor segue o stack de cada exemplo.

**Falta saber (coach):** a partir de que stack exato o middle passa a usar a lógica do deep.

**Status:** aberta, só para o corte dentro do middle.

---

# 06 — OVERPAIR NO ALL-IN: BET OU CHECK-SHOVE

No short com sequência, o guideline da aula diz "valor: primeiros overpairs" e também "check-raise: overpairs". Na prática da aula, o Q-Q no J-T-7 foi para o check-shove.

**Falta saber (coach):** qual overpair aposta all-in e qual dá check-shove, e em qual frequência.

**Status:** aberta.

---

# 07 — EXCEÇÃO DO 6-5-4 E DO 5-4-3

O instrutor diz que, pela teoria, o 6-5-4 deveria ir all-in range, porque o rival quase não acerta par. Chama de "exceção da exceção" e não pede para treinar.

**Falta saber (coach):** qual estratégia usar nesses dois boards.

**Status:** aberta.

---

# 08 — SECO NO DEEP: B25 OU B40

O deep usa "B25 a B40" no seco, e a aula cita K-8-2, Q-7-3, A-9-4 e 5-5-2 em B25 e K-9-7 em B40. O critério é "quando há mais interação, B40", sem regra de conectividade.

**Falta saber (coach):** o critério objetivo entre B25 e B40 no seco deep.

**Status:** aberta.

---

# 09 — "LOW SEM SEQUÊNCIA: B70" NO DEEP

Em um trecho da aula, o instrutor responde "board low sem sequência, B70" no deep. Isso conflita com o seco em B25 e com o K-8-2 em B25. A transcrição deste trecho é confusa.

**Falta saber (coach):** se há um grupo de boards low em B70 no deep.

**Status:** aberta.

---

# 10 — MÃOS COM AÇÃO NÃO CLARA NA TRANSCRIÇÃO

A transcrição não deixa clara a ação de algumas mãos citadas: Q-8 no J-T-7, K-6 sem o naipe, A-K e A-Q de naipes diferentes do board no deep, e as mãos do 9-8-6. Não entraram nas regras.

**Falta saber (coach):** a ação dessas mãos. O vídeo traz a resposta, mas a transcrição troca nomes e naipes.

**Status:** aberta.

---

# 11 — SOLVER

O relatório do GTO Wizard mostrado na aula não está no KB com combos e frequências (Solver, "Relatório do GTO Wizard na aula do BB").

**Status:** aberta.

---

# 12 — Ponte PÓS→PRÉ: faixas de stack do 3-bet do BB

A aula resume o 3-bet do BB por faixa de stack (até 30bb, 30 a 60bb, 60bb ou mais), com exemplos de mãos. Esse conteúdo é de pré-flop e deveria entrar no chat PRÉ-FLOP (módulo 12 ou um módulo de 3-bet).

**Status:** aberta, para o chat PRÉ-FLOP. Os ranges de 3-bet do BB contra o open do BTN, por stack, serão lidos do Poker Academy para a Prática.

---

# 13 — SB E IP NÃO COBERTOS

A aula é só do BB. A árvore do SB (já na Teoria como "3Bet Pot OOP no SB") e a IP seguem sem aula.

**Status:** aberta.

---

# 14 — TURN

A aula não traz o turn. O guideline dá só o size por tipo de turn (blank B100, carta alta B40, flush B40, carta que conecta B70), sem dizer quais mãos apostam.

**Status:** aberta.

---

# 15 — TRANSCRIÇÃO AUTOMÁTICA

A transcrição é automática e confunde palavras (Ás, all-in, bet) e os naipes de várias mãos. Os boards e as mãos dos replayers foram lidos nos frames do vídeo (cores do replayer). Os naipes lidos podem precisar de conferência.

**Status:** registrada.

<!-- graphify-links:start -->

---

## Ligações

_Gerado a partir do grafo do graphify. Não editar à mão: é sobrescrito na próxima geração._

**Pasta:** [[theory/08-3BET-POT/README|theory/08-3BET-POT]]

**Mesma pasta:** [[theory/08-3BET-POT/08 - 3BET POT GUIDELINE|01-Guideline]] · [[theory/08-3BET-POT/02-VideoAulas|02-VideoAulas]] · [[theory/08-3BET-POT/03-Solver|03-Solver]] · [[theory/08-3BET-POT/04-Exercicios|04-Exercicios]] · [[theory/08-3BET-POT/05-Regras-Consolidadas|05-Regras-Consolidadas]] · [[theory/08-3BET-POT/07-Changelog|07-Changelog]] · [[theory/08-3BET-POT/08-Referencias|08-Referencias]] · [[theory/08-3BET-POT/09-Decisoes|09-Decisoes]]

<!-- graphify-links:end -->
