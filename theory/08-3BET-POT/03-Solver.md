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
  - tipo/solver
---

# 3BET POT — SOLVER


# OBJETIVO

Consolidar as análises realizadas no solver para validar:

- Frequências;
- Escolha de size;
- Mistura entre bet e check;
- Composição dos ranges;
- Diferenças entre guideline e estratégia ótima.


---

# METODOLOGIA DE ANÁLISE


Todo spot analisado deve seguir a ordem:


1. Posição

- OOP
- IP


2. Stack

- Short Stack
- Deep Stack


3. Board


4. Estratégia encontrada


5. Frequência


6. Composição das mãos


7. Conclusão estratégica


---

# GUIDELINE X SOLVER


## GUIDELINE


Representa:

- Estratégia simplificada;
- Árvore prática;
- Regras para tomada de decisão.


O guideline define:

- Família do board;
- Size principal;
- Estrutura inicial do range.


---

## SOLVER


Representa:

- Frequências reais;
- Mistura de estratégias;
- Ajustes específicos;
- Exceções.


O solver não substitui o guideline.

Ele complementa a compreensão da estratégia.


---

# ORGANIZAÇÃO DOS ESTUDOS


# 01 — 3BET POT OOP


## SHORT STACK


### FLOP


Registrar:

- Board;
- Estratégia principal;
- Frequência de bet;
- Frequência de check;
- Size utilizado;
- Composição dos ranges.


### TURN


Registrar:

- Carta do turn;
- Mudança de dinâmica;
- Size;
- Continuação ou abandono.


---

## DEEP STACK


### FLOP


Registrar:

- Board;
- Size escolhido;
- Frequência;
- Construção do range.


### TURN


Registrar:

- Evolução da estratégia;
- Mudanças de frequência;
- Linhas futuras.


---

# 02 — 3BET POT IP


## SHORT STACK


Registrar:


- Boards analisados;
- Frequência de B25;
- Frequência de B40;
- Frequência de B70;
- Composição dos splits.


---

## DEEP STACK


Registrar:


- Boards analisados;
- Estratégias de size;
- Frequências;
- Diferenças em relação ao Short Stack.


---

# RELATÓRIO DO GTO WIZARD NA AULA DO BB (09/11/2026)

**Fonte:** relatório mostrado pelo instrutor na aula "3bet pot do BB — Postflop 1". Os sizes configurados no solver eram 10%, 25%, 50%, 75% e all-in. Não há combos nem frequências por mão no material, só a leitura geral.

- **Frequência de check:** cerca de 21% no relatório do BB que dá 3-bet com um range razoável e cobertura de board. Ou seja, o BB poderia apostar em torno de 80% do range.
- **Onde o BB não aposta alto:** boards conectados, com sequência e muita interação com o range do rival (T-9-8, J-T-9, 9-8-5). Aí é preciso desenvolver o check.
- **Boards em que o check não importa:** K-8-2 com flush draw. Todas as mãos fazem de tudo um pouco e o EV de apostar é praticamente igual. O instrutor diz para apostar o range e só se preocupar a partir do turn.
- **Cuidado:** o solver é muito sensível a qualquer ajuste de range, reação ou size. O instrutor pede para seguir a lógica e a frequência mais comum, e não decorar o relatório.

**Pendência:** os combos e as frequências desses nós ainda não estão no KB (Pendência 11).

# PADRÃO DE REGISTRO DE SPOT


## SPOT


Posição:

Stack:

Board:

Ação pré-flop:


---

## SOLVER


Estratégias disponíveis:


Frequências:


Size:


Hands principais:


---

## ANÁLISE


Por que o solver escolhe essa estratégia?


Quais mãos entram?


Quais mãos ficam fora?


Existe diferença para o guideline?


---

## CONCLUSÃO


Regra consolidada:


Erro evitado:


Aplicação futura:


---

# PONTOS IMPORTANTES


## Nunca analisar solver sem contexto


Sempre identificar:

- posição;
- stack;
- board;
- street.


---

## Nunca transportar frequência de uma árvore para outra


Exemplo:


3BET POT OOP

não define

3BET POT IP


SHORT STACK

não define

DEEP STACK


---

# BANCO DE PADRÕES


Adicionar conforme estudo:


## Boards secos


Spots:


## Boards conectados


Spots:


## Boards com sequência


Spots:


## Boards low


Spots:


## Turns


Blank:

High Card:

Flush:

Conecta:

<!-- graphify-links:start -->

---

## Ligações

_Gerado a partir do grafo do graphify. Não editar à mão: é sobrescrito na próxima geração._

**Pasta:** [[theory/08-3BET-POT/README|theory/08-3BET-POT]]

**Mesma pasta:** [[theory/08-3BET-POT/08 - 3BET POT GUIDELINE|01-Guideline]] · [[theory/08-3BET-POT/02-VideoAulas|02-VideoAulas]] · [[theory/08-3BET-POT/04-Exercicios|04-Exercicios]] · [[theory/08-3BET-POT/05-Regras-Consolidadas|05-Regras-Consolidadas]] · [[theory/08-3BET-POT/06-Pendencias|06-Pendencias]] · [[theory/08-3BET-POT/07-Changelog|07-Changelog]] · [[theory/08-3BET-POT/08-Referencias|08-Referencias]] · [[theory/08-3BET-POT/09-Decisoes|09-Decisoes]]

<!-- graphify-links:end -->
