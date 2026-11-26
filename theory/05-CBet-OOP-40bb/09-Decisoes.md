---
tags:
  - modulo/05-cbet-oop-40bb
  - spot/srp
  - posicao/oop
  - street/flop
  - street/turn
  - linha/cbet
  - linha/second-barrel
  - stack/40bb
  - tipo/decisoes
---

# Decisões — C-Bet OOP

---

# Decisão 1 — Contexto obrigatório

Todo módulo deve iniciar com:

- Stack.
- Spot.
- Posição.
- Ranges.
- Street.
- Fonte.

---

# Decisão 2 — C-Bet OOP separado de outros módulos

Não misturar:

- Short Stack.
- Deep Stack.
- Outros spots.

---

# Decisão 3 — EP vs BTN e CO vs BTN separados

As estratégias não devem ser unificadas.

Cada posição possui construção própria.

---

# Decisão 4 — Não documentar apenas sizings

O size é consequência da estratégia.

A KB deve registrar:

- Por que apostar.
- O que apostar.
- O que checar.

---

# Decisão 5 — Exercícios fazem parte das regras

As correções dos exercícios podem alterar:

- Regras Consolidadas.
- Decisões estratégicas.

---

# Decisão 6 — Não misturar conhecimento externo

Somente entram:

- Material do professor.
- Solver.
- Exercícios.
- Correções.

---

# Estado Final

Módulo estruturado:

SRP OOP C-Bet Flop

40bb

EP vs BTN / CO vs BTN

Com:

- Estratégia.
- Solver.
- Exercícios.
- Regras.
- Histórico.

---

# Decisão 7 — EP no treino da Prática (02/11/2026)

Na Prática, o "EP" do módulo é o EP2 do Poker Academy (UTG+1 de uma mesa de 9 jogadores, o UTG1 da mesa do site). O CO é o CO do Poker Academy. Os ranges de abertura estão em `theory/tools/ranges-poker-academy.md`. Pocket pair abaixo do top pair dá check-call e segue a definição do módulo 17 (Decisão 14).

**Status:** definitiva para a Prática.

---

# Decisão 8 — Boards extras do treino (02/11/2026)

A Prática passou a ter mais de um board por textura, só com os que o coach rotulou no arquivo de exemplos e que encaixam de forma clara no guideline:

| Textura | Boards |
|---|---|
| BBX | K-Q-5 (base), K-T-6, Q-J-6 |
| K-Q high | K-8-4 (base), Q-8-4, K-8-5, K-6-4 |
| J-T high | J-7-3 (base), J-6-4, J-8-3 |
| Low com sequência | 7-6-4 (base), 7-6-5 |

As regras de decisão de cada textura não mudaram. Cada board entra rainbow e com dois naipes.

**Status:** provisória. Os boards sem textura clara estão na Pendência 8.

<!-- graphify-links:start -->

---

## Ligações

_Gerado a partir do grafo do graphify. Não editar à mão: é sobrescrito na próxima geração._

**Pasta:** [[theory/05-CBet-OOP-40bb/README|theory/05-CBet-OOP-40bb]]

**Mesma pasta:** [[theory/05-CBet-OOP-40bb/05 - CBET OOP 40BB GUIDELINE|01-Guideline]] · [[theory/05-CBet-OOP-40bb/02-VideoAulas|02-VideoAulas]] · [[theory/05-CBet-OOP-40bb/03-Solver|03-Solver]] · [[theory/05-CBet-OOP-40bb/04-Exercicios|04-Exercicios]] · [[theory/05-CBet-OOP-40bb/05-Regras-Consolidadas|05-Regras-Consolidadas]] · [[theory/05-CBet-OOP-40bb/06-Pendencias|06-Pendencias]] · [[theory/05-CBet-OOP-40bb/07-Changelog|07-Changelog]] · [[theory/05-CBet-OOP-40bb/08-Referencias|08-Referencias]]

**Outros módulos:**

- [[theory/06-XR-SHORT/09-Decisoes|06-XR-SHORT · 09-Decisoes]]
- [[theory/04-Third-Barrel-e-vs-Third-Barrel/09-Decisoes|04-Third-Barrel-e-vs-Third-Barrel · 09-Decisoes]]

<!-- graphify-links:end -->
