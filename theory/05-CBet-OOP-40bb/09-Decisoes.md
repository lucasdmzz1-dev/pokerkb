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

---

# Decisão 9 — Menos mãos repetidas no treino (24/11/2026)

A Prática não repete a mesma mão com naipes diferentes. Dentro de uma categoria, cada mão é de uma classe diferente (um 77, não vários 77). Cada classe de mão (77, AKs, AKo) aparece no máximo 2 vezes por board e por posição, somando o board rainbow e o de dois naipes.

Pedido do autor, pois o treino tinha muitos exercícios que eram a mesma coisa. No A high seco, o treino foi de 84 para 68 situações.

**Status:** definitiva para a Prática.

---

# Decisão 10 — Slides e notas do coach conciliados com a Prática (25/11/2026)

Os slides do coach (Regras 16 a 18), a nota da aula "Cbet OOP 40bbs deep" e a Prática divergiam em alguns pontos. Seguindo a ordem de prioridade (esclarecimento do autor, correção do coach, solver, aula, guideline), cada ponto ficou assim:

| Ponto | Decisão | Aplicado na Prática |
|---|---|---|
| Melhores PP (pocket pairs) sobre o segundo par | Os 2 melhores apostam por valor (autor). Vale no Split Range | Sim, no Split Range. No Split 25% segue check-call, porque a nota não traz |
| 2 melhores top pairs no XR por valor | Vale em todo board com split (autor, Regra 15) | Sim |
| Duas pontas "sem BDFD" (slide) × "sem naipe do board" (nota e guideline) | Vale "sem naipe do board": tem duas fontes e já estava na Prática. Quem não tem naipe do board também não tem BDFD | Mantido |
| Brocas "com BDFD" (slide) × "com naipe do board" (nota) | Vale a nota: broca com o naipe do flush draw (bet por bluff no Split Range, check-raise no Split 25%). A broca suited com BDFD é um draw com BDFD (linha abaixo) | Mantido |
| Draws com BDFD no check-raise por bluff | Duas pontas ou broca suited em um naipe que aparece uma vez no board vão de check-raise (slide e nota concordam) | Sim |
| Draws diretos no check-call | As duas pontas que não apostam nem dão check-raise (com naipe do board, sem BDFD) ficam no check-call *(inferência, por eliminação)* | Sim |
| Uma high card mais BDFD + BDST no check-raise por bluff | Na Prática, uma overcard com BDFD aposta (já corrigida pelo autor e pelo coach). A Prática não modela o BDST, então a diferença não dá para testar | Mantido |
| Boards carregados: todos os overpairs apostam e o check-raise não tem bluff | A Prática segue a Regra 14 (melhor overpair de check-raise). O módulo não define quais texturas são "carregadas" | Mantido |
| EP contra EP no board low: check range | Spot fora das relações do módulo. Fica como nota da aula | Não |
| Seguidas: metade aposta, metade vai de check-raise | Nenhuma fonte diz qual metade. O autor deixou a critério (26/11/2026) e usa RNG: de 1 a 50 check-raise, de 51 a 100 aposta | Sim: a Prática sorteia o RNG nas seguidas (Pendência 15) |
| Tabela de size e frequência da aula (Gyazos) | Conflita com a guideline em A high seco, BBX no EP e monotone. Mantém a guideline e a Prática, e o conflito fica na Pendência 18 | Não |

**Status:** provisória nas linhas marcadas como inferência. Definitiva nas demais.

---

# Decisão 11 — Aula de revisão CO contra BTN aplicada (25/11/2026)

A transcrição da aula de revisão (CO contra BTN) confirmou boa parte do módulo e trouxe mudanças. Seguindo a ordem de prioridade (aula acima da guideline e dos slides; esclarecimento do autor acima da aula):

| Ponto | Decisão | Aplicado na Prática |
|---|---|---|
| Conectados consecutivos (987, 765, 654, T98) | Check range, no CO e no EP (Regra 19). A aula diz que foi o que mais mudou | Sim: textura nova "Conectado consecutivo" em check range. O 765 saiu do "Low com sequência" |
| Boards carregados: todos os overpairs apostam | Confirmado pela aula (J-9-8). Vale a Regra 21, e a Regra 14 vale nos outros boards | Sim, nas texturas com sequência (High com sequência, Low com sequência e A high conectado) |
| Overpair do meio (KK) | Nos boards carregados aposta. Nos outros segue sem regra | Parcial |
| Top pair: os melhores no check-raise | A aula confirma no Split 25%: com A♥J♥ apostando, os outros AJ vão de check-raise | Já aplicado (Regra 15) |
| Pocket pairs acima do segundo par | A aula cita 10-10 e 9-9 no check-call e 8-8 e 7-7 no bet. O autor disse que os 2 melhores apostam | Mantido como o autor disse, e o autor confirmou de novo (Pendência 19 resolvida) |
| Flush draws que não são de ás | A aula manda apostar (K8, Q9, Q7, K7 de copas). A Prática dá check-raise | Sim, por decisão do autor: flush draw sem ás aposta, e o combo draw (flush draw com duas pontas) vai de check-raise (Pendência 20 resolvida) |
| Check-fold | A aula confirma: mão sem valor de showdown e sem equity dá check-fold | Não (o botão segue adiado, Pendência 7) |
| BDFD e BDST juntos | A aula pede os dois critérios em board seco. A Prática não modela o BDST | Não (Pendência 21) |
| Dobrado (JJ9) | B40 split range no CO contra BTN | Não: a Prática não trata board dobrado (Pendência 8) |

**Status:** definitiva nas linhas aplicadas. Provisória nos critérios marcados como inferência (quais texturas são carregadas, e o EP nos consecutivos altos).

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
