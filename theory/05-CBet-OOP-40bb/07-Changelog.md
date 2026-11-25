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
  - tipo/changelog
---

# Changelog — C-Bet OOP

---

# Versão 1.0

Criação do módulo:

SRP OOP C-Bet Flop

---

# Contexto definido

Stack:

40bb

Spot:

SRP

Posição:

OOP

Relações:

- EP vs BTN
- CO vs BTN

Street:

Flop

---

# Conteúdos adicionados

- Estratégia por textura.
- Splits.
- Split Range.
- Split 25%.
- Construção de bet.
- Construção de check.
- Estratégia por posição.

---

# Boards documentados

- A High seco.
- A High conectado.
- BBX.
- KQ High.
- JT High.
- High com sequência.
- Low com sequência.
- Low sem sequência.
- Monotone.

---

# Estrutura KB aplicada

Criados:

- Guideline.
- VideoAulas.
- Solver.
- Exercícios.
- Regras Consolidadas.
- Pendências.
- Changelog.
- Referências.
- Decisões.

---

# Versão 1.1

Adicionado:

Second Barrel OOP (Turn).

Fonte:

Guideline do instrutor (ainda sem aula).

Conteúdo:

- Estratégia de valor por textura de turn.
- Sizes: B40, B70, B100.
- Leitura da lógica de size por largura de range.
- Consistência com Módulo 10 (Multiway) e Módulo 11 (Value Bet).

Pendente:

- Bluffs, semi-bluffs e check no turn (ver Pendências, item 6).

---

# Versão 1.2 (02/11/2026)

- Pendências: acrescentados os itens 7 (check-fold e pares baixos), 8 (boards sem textura definida) e 9 (posições dos exemplos).
- Referências: acrescentada a seção 5, com os 16 exemplos do coach.
- Decisões: acrescentada a Decisão 8 (boards extras do treino).

---

# Versão 1.3 (24/11/2026)

Fonte: regras da área Prática (`app/src/data/prat05.ts`), corrigidas pelo dono e pelo coach.

- Regras Consolidadas: acrescentada a Regra 14 (overpairs, trincas, dois pares e par de bolso abaixo do top pair).
- Antes só estavam no código da Prática. Overpair do meio (KK no J-8-3) continua sem regra.

---

# Versão 1.4 (24/11/2026)

Fonte: esclarecimento do autor, a partir de uma mão da Prática.

- Regras Consolidadas: Regra 15 (A high seco: AK e AQ sem naipe do board vão de check-raise, não de check-call). Vale para CO e EP contra BTN (o autor confirmou o EP no mesmo dia).
- Pendências: item 10 (escopo da Regra 15: outras texturas).
- Prática (`prat05.ts`): CO e EP no A high seco passam a usar a Regra 15.

---

# Versão 1.5 (25/11/2026)

Fonte: revisão do módulo contra as regras da Prática, a pedido do autor (faltavam as mãos de cada linha).

- Novo arquivo `10-Como-Jogar.md`: mapa de mãos por linha (bet por valor, bet por bluff, check-raise por valor, check-raise por bluff, check-call), por Split Range e Split 25%, com exemplo completo no A high seco (A♠ 7♦ 2♣, EP e CO).
- Novo arquivo `11-Mapa-por-Textura.md`: as mesmas linhas para as 9 texturas, EP e CO, boards rainbow e com dois naipes, com as classes de mão de cada categoria e a tabela de quanto fica sem regra em cada uma.
- Pendências: itens 11 a 14 (mãos sem regra, top pair e second pair com naipe do board, mãos sem par e sem draw, "primeiro naipe do board").
- Sem mudança de regra. A função de cada mão (valor, bluff, proteção) está marcada como inferência onde a fonte não a diz.

---

# Versão 1.6 (25/11/2026)

Fonte: três slides do coach ("Split do Cbet OOP" e "Extra") e a nota "Cbet OOP CO vs BTN, 40bb deep".

- Guideline: nova seção "Split do C-Bet OOP — mãos por linha" (bet por valor e por bluff, check-raise por valor e por bluff, check-call, extras, frequência de bet por board e Split 25%).
- Regras Consolidadas: Regras 16 (bet por valor e por bluff), 17 (check-raise por valor, por bluff e check-call) e 18 (extras: monotone, boards carregados, EP contra EP).
- Referências: fonte 6.
- Pendências: itens 15 (divergências dos slides com a Prática), 16 (boards carregados) e 17 (EP contra EP); atualizações nos itens 10, 11 e 13.
- Esclarecimento do autor (25/11/2026): PP = pockets pair acima do segundo par da mesa, e os 2 melhores apostam por valor no Split Range. Aplicado na Prática (`prat05.ts`), EP e CO. Split 25% segue com check-call (Pendência 15).
- Esclarecimento do autor (25/11/2026): os 2 melhores top pairs vão de check-raise em todo board com split. Regra 15 ampliada e aplicada na Prática em todas as texturas.
- Decisão 10: como cada divergência entre slides, nota da aula e Prática foi conciliada. Na Prática, draws com BDFD vão de check-raise por bluff e as outras duas pontas dão check-call (inferência).
- Nota da aula "Cbet OOP 40bbs deep": seção "Desvantagens de jogar OOP" em `02-VideoAulas.md` e tabela de size e frequência em `03-Solver.md`. Conflitos com a guideline na Pendência 18.
- Pendências 10, 14, 15 (exceto as seguidas), 16 e 17 resolvidas.
- Conflitos: nada foi sobrescrito. A Regra 14 e a guideline seguem como estavam.

---

# Versão 1.7 (25/11/2026)

Fonte: aula de revisão CO contra BTN (transcrição de 25/11/2026).

- Guideline: seção "Atualização da aula de revisão CO contra BTN" (boards em check range, estratégia por board, Split 25%, check-raise, flush draws).
- Regras Consolidadas: Regras 19 (conectados consecutivos em check range), 20 (Split 25%) e 21 (check-raise seco e carregado). Nota na Regra 14 sobre boards carregados.
- Decisão 11: o que a aula confirmou e o que mudou na Prática.
- Prática (`prat05.ts`): textura nova "Conectado consecutivo" em check range (987, T98, 765, 654; o 765 saiu do Low com sequência) e todos os overpairs apostando nas texturas com sequência.
- Pendências: itens 19 (pares de bolso acima do segundo par), 20 (flush draws sem ás), 21 (BDST e check-fold). Atualizados os itens 7, 8, 16, 17 e 18.
- Decisões do autor (25/11/2026): os 2 melhores pockets pair acima do segundo par apostam (Pendência 19), e o flush draw sem ás aposta, com combo draw no check-raise (Pendência 20). Aplicado na Prática (`prat05.ts`).
- Conflitos: nada foi sobrescrito sem decisão registrada.

---

# Próximas atualizações

Adicionar:

- Mais exercícios.
- Mais correções.
- Novos Gyazos.

<!-- graphify-links:start -->

---

## Ligações

_Gerado a partir do grafo do graphify. Não editar à mão: é sobrescrito na próxima geração._

**Pasta:** [[theory/05-CBet-OOP-40bb/README|theory/05-CBet-OOP-40bb]]

**Mesma pasta:** [[theory/05-CBet-OOP-40bb/05 - CBET OOP 40BB GUIDELINE|01-Guideline]] · [[theory/05-CBet-OOP-40bb/02-VideoAulas|02-VideoAulas]] · [[theory/05-CBet-OOP-40bb/03-Solver|03-Solver]] · [[theory/05-CBet-OOP-40bb/04-Exercicios|04-Exercicios]] · [[theory/05-CBet-OOP-40bb/05-Regras-Consolidadas|05-Regras-Consolidadas]] · [[theory/05-CBet-OOP-40bb/06-Pendencias|06-Pendencias]] · [[theory/05-CBet-OOP-40bb/08-Referencias|08-Referencias]] · [[theory/05-CBet-OOP-40bb/09-Decisoes|09-Decisoes]]

**Módulos citados no texto:** [[theory/10-MULTIWAY-POT/README|10-MULTIWAY-POT]] · [[theory/11-Value-Bet-Masterclass/README|11-Value-Bet-Masterclass]]

<!-- graphify-links:end -->
