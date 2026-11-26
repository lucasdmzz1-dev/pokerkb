---
tags:
  - modulo/09-bet-check-bet
  - spot/srp
  - street/river
  - linha/bet-check-bet
  - tipo/pendencias
---

# PENDÊNCIAS


- Completar todos os exemplos da aula.
- Adicionar frequências do solver.
- Adicionar árvores completas.
- Separar BTN e BB quando houver diferença.
- Exercício 05 (8♥8♣ no 6♣ A♠ K♠ 2♦ A♦, river que dobra) aposta B70 por valor, mas o Guideline (Dinâmico Dobra de Carta, B70) só lista top pair e second pair como valor. O 88 não é nenhum dos dois. A explicação do exercício (valor relativo ao range que chega capado) não está escrita no Guideline. Confirmar com o coach se o value do B70 no river que dobra inclui pocket pairs abaixo do second pair e, se sim, ampliar o Guideline. Conflito registrado na leitura completa da teoria (MAIN CHAT TEORIA, 28/10/2026).

- Regras do professor de 03 e 04/11/2026 (trainer, mensagens do Yago e print do painel "Bet Check Bet") divergem do Guideline no B70 contra B100. Registrado em 16/11/2026, a partir da prática do site; o Guideline não foi alterado, e a decisão de ampliar é do MAIN CHAT TEORIA:
  - O size passa a depender do que o river mudou, e não só do tipo de mão. Blank usa B70. Carta alta nova, flush, sequência alta ou dobra usam B100 (o Guideline mandava low cards no B70 nos dinâmicos).
  - Blefe sem par nos dinâmicos vai de B100 no trainer, inclusive 9 high e low cards (mãos 5, 7, 9, 10, 11 e 14). O Guideline só autoriza B100 para broadways.
  - Ax dinâmico: top pair com kicker T ou maior usa B100 e kicker abaixo de T usa B70. Com flush possível no board, top pair usa B70 mesmo com kicker alto. O Guideline dava B70 para qualquer top pair no Ax.
  - Dobra: trincas ou melhor, B100. Board já duplamente dobrado (K-Q-K-Q-7): carta isolada no river é blank, sem POT.
  - Quatro cartas para sequência: dois pares vão de B70, e sequências e blefes autorizados vão de B100. O Guideline mandava dois pares no B100.
  - Fora do value e do bluff: A-high fica em check (exceto o draw duplo do painel A-HIGH), K-high não blefa em board A-high, Q-high não blefa em board K-high, e terceiro par ou pior fica em check.
  - Dúvida: o texto do painel diz que o offsuit precisa do blocker do flush completado, mas a mão 9 do trainer (4♥7♥ no K♦ que completa o flush de ouros) dá B100 sem blocker. Confirmar com o coach.
  - Dúvida: o exercício 05 (88 na dobra) pode virar check pela regra de terceiro par. Confirmar com o coach.

<!-- graphify-links:start -->

---

## Ligações

_Gerado a partir do grafo do graphify. Não editar à mão: é sobrescrito na próxima geração._

**Pasta:** [[theory/09-BET-CHECK-BET/README|theory/09-BET-CHECK-BET]]

**Mesma pasta:** [[theory/09-BET-CHECK-BET/09 - BET CHECK BET GUIDELINE|01-Guideline]] · [[theory/09-BET-CHECK-BET/02-VideoAulas|02-VideoAulas]] · [[theory/09-BET-CHECK-BET/03-Solver|03-Solver]] · [[theory/09-BET-CHECK-BET/04-Exercicios|04-Exercicios]] · [[theory/09-BET-CHECK-BET/05-Regras-Consolidadas|05-Regras-Consolidadas]] · [[theory/09-BET-CHECK-BET/07-Changelog|07-Changelog]] · [[theory/09-BET-CHECK-BET/08-Referencias|08-Referencias]] · [[theory/09-BET-CHECK-BET/09-Decisoes|09-Decisoes]]

<!-- graphify-links:end -->
