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
  - tipo/decisoes
---

# 09-DECISOES.md

# 3BET POT — DECISÕES


# OBJETIVO

Registrar as principais decisões estratégicas tomadas durante o estudo do módulo 3BET POT.


Este arquivo representa o histórico das conclusões finais após análise de:

- Guideline;
- Videoaulas;
- Transcrições;
- Solver;
- Exercícios;
- Correções.


---

# DECISÕES FUNDAMENTAIS


# 01 — SEPARAÇÃO IP X OOP


## Decisão

Manter estratégias completamente separadas entre:


3BET POT OOP

e

3BET POT IP


## Motivo

A posição altera:

- Realização de equity;
- Construção de range;
- Frequência de aposta;
- Escolha de size;
- Linhas futuras.


## Aplicação

Nunca importar uma estratégia de uma árvore para outra.


---

# 02 — SEPARAÇÃO SHORT STACK X DEEP STACK


## Decisão

Manter árvores independentes para:


SHORT STACK

e

DEEP STACK


## Motivo

A diferença de SPR altera:


- Construção de range;
- Valor das mãos;
- Pressão aplicada;
- Planejamento de streets.


## Aplicação

Nunca utilizar uma simplificação de Short Stack em Deep Stack sem validação.


---

# 03 — TURN COMO ESTRUTURA GERAL


## Decisão

A estratégia de TURN do módulo segue a estrutura:


BLANK

→ B100 (GEO)


HIGH CARD

→ B40


FLUSH

→ B40


CONECTA

→ B70


## Motivo

A estrutura foi consolidada como regra geral do módulo 3BET POT.


---

# 04 — CONSTRUÇÃO DE BLEFES


## Decisão

Não utilizar apenas blockers como critério para blefe.


## Motivo

Os blefes devem possuir:


- Equidade;
- Possibilidade de evolução;
- Draws;
- Backdoors.


## Aplicação

Priorizar:

- FD;
- BDFD;
- BDST;
- Draws diretos.


---

# 05 — GUIDELINE X SOLVER


## Decisão

Manter diferença entre:


GUIDELINE

e

SOLVER


## Motivo

O guideline representa a estratégia prática.


O solver representa:

- Frequências;
- Misturas;
- Exceções.


## Aplicação

Usar solver para validar e aprofundar, não substituir o guideline.


---

# 06 — ORDEM DE ANÁLISE


## Decisão

Toda análise deve seguir:


1. Posição

2. Stack

3. Board

4. Size

5. Split

6. Frequência Solver


## Motivo

Evitar decisões baseadas apenas no board ou na força absoluta da mão.


---

# 07 — ORDEM DE PRIORIDADE DAS FONTES


## Data

28/10/2026


## Decisão

Seguir a ordem geral do KB (`theory/CLAUDE.md`): esclarecimento do autor do KB, correção do instrutor, solver, videoaulas e transcrições, guideline, exercícios.


## Motivo

A ordem antiga do módulo estava invertida (guideline primeiro e correções por último). Decisão do autor do KB.


## Impacto no módulo

`08-Referencias.md` atualizado. Divergência 01 de `06-Pendencias.md` resolvida.


---

# 08 — BB E SB SEPARADOS NO 3BET POT OOP (09/11/2026)

## Decisão

A aula do BB não vale para o SB. O 3-bet pot OOP no BB tem arvore própria (short e deep), e o SB segue sem aula.

## Motivo

O range do SB é linear e o do BB, polarizado, o que muda a frequência de aposta e a realização de equity.

## Impacto no módulo

A Prática e a Teoria do BB usam só a aula do BB. O SB e o IP ficam abertos (Pendência 13).

---

# 09 — CRITÉRIO ENTRE ALL-IN, B40 E B25 NO SHORT (09/11/2026)

## Decisão

O size do short stack segue as três perguntas do instrutor: B25 se a vantagem é absoluta, B40 se o range precisa de split e o valor não precisa de proteção, all-in se o valor precisa de proteção e o range não perde ao colocar tudo.

## Motivo

É o critério que o instrutor usa em todos os exemplos e resume no guideline.

## Impacto no módulo

As Regras 4 e 5 da aula do BB. O 6-5-4 e o 5-4-3 ficam fora (Pendência 07).

---

# 10 — LEITURA DA TRANSCRIÇÃO (09/11/2026)

## Decisão

Onde a fala e a transcrição são confusas, valem a guideline que o instrutor recita no fim de cada parte e a leitura do vídeo. O que não dá para confirmar vira pendência, e não regra.

## Motivo

A transcrição é automática e confunde nomes e naipes.

## Impacto no módulo

As mãos sem ação clara (Pendência 10) não entram nas regras.

# 11 — MIDDLE STACK COMO MISTURA (09/11/2026)

## Decisão

As faixas de stack da aula são até 30bb (short), de 30 a 60bb (middle) e 60bb ou mais (deep). O middle não tem árvore própria: perto de 30bb usa a lógica do short, perto de 60bb a do deep, e o stack do exemplo decide.

## Motivo

Esclarecimento do autor do KB sobre as três faixas que o instrutor escreve no início da aula.

## Impacto no módulo

Regra 14 da aula do BB. A Prática trata short e deep, e o middle entra conforme o stack de cada exemplo.

---

# DECISÕES FUTURAS


Novas decisões devem conter:


## Data:


## Spot:


## Fonte:


## Decisão tomada:


## Motivo:


## Impacto no módulo:


---

# REGRA FINAL


Toda decisão estratégica deve respeitar:


Material original

↓

Validação

↓

Consolidação

↓

Documentação

<!-- graphify-links:start -->

---

## Ligações

_Gerado a partir do grafo do graphify. Não editar à mão: é sobrescrito na próxima geração._

**Pasta:** [[theory/08-3BET-POT/README|theory/08-3BET-POT]]

**Mesma pasta:** [[theory/08-3BET-POT/08 - 3BET POT GUIDELINE|01-Guideline]] · [[theory/08-3BET-POT/02-VideoAulas|02-VideoAulas]] · [[theory/08-3BET-POT/03-Solver|03-Solver]] · [[theory/08-3BET-POT/04-Exercicios|04-Exercicios]] · [[theory/08-3BET-POT/05-Regras-Consolidadas|05-Regras-Consolidadas]] · [[theory/08-3BET-POT/06-Pendencias|06-Pendencias]] · [[theory/08-3BET-POT/07-Changelog|07-Changelog]] · [[theory/08-3BET-POT/08-Referencias|08-Referencias]]

<!-- graphify-links:end -->
