---
tags:
  - modulo/15-bet-vs-missed
  - spot/srp
  - posicao/ip
  - street/flop
  - linha/bet-vs-missed
  - tipo/changelog
---

# Changelog — Bet vs Missed C-Bet

---

# Versão 1.2 (03/11/2026)

- 12-Padroes: 9-8-2, 9-6-4 e 9-5-4 secos, 8-8-4 e 7-7-3 dobrado seco, pelos exemplos do trainer do coach (seção 10).
- 9-6-2 passa de semi conectado para seco (12-Padroes e Decisão 10).
- Top set no seco: 75% confirmado pelo autor do KB.

---

# Versão 1.1 (02/11/2026)

- 12-Padroes: boards T-7-3, T-7-5, 8-3-2 e 8-7-2 como secos, definição dos pocket pairs, top set em 75% e o range do treino (seção 9).
- Decisões: acrescentada a Decisão 11.

---

# Versão 1.0

## Criação do módulo

Fonte: aula (transcrição e SRT) e guideline em imagem do instrutor (segunda versão).

Contexto definido:

- Pote single raised, agressor fora de posição que dá check no flop (missed c-bet) e jogador em posição.
- A estratégia vale como um todo, sem stack específico.

---

## Conteúdos adicionados

- Por que a estratégia mudou (os buracos da estratégia linear).
- A lógica dos buckets de frequência: 100%, 75%, 50% e 25%.
- Os sizes B25 e B50 e o motivo.
- Os cinco tipos de flop e as tabelas do guideline em imagem.
- Como dividir na mesa (naipe e randomizador) e os ajustes (posição, proporcionalidade, deep e short stack).
- O que muda no turn e no river.
- 34 exercícios, com os naipes dos boards especificados.

---

## Estrutura KB aplicada

Criados:

- README.
- Guideline.
- VideoAulas.
- Solver (que transcreve o guideline em imagem).
- Exercícios.
- Regras Consolidadas.
- Pendências.
- Referências.
- Decisões.

---

# Versão 1.1

Confirmação do coach sobre o bucket do flop conectado high: o semi conectado tem o bucket de 75% (dois pares, TP forte e sequência) e o conectado high tem o bucket de 50%, como no guideline em imagem. O coach disse para seguir 100% o guideline. Pendência encerrada.

---

# Versão 1.2

Ordem de prioridade das fontes padronizada na ordem geral do `theory/CLAUDE.md` (decisão do autor do KB, 28/10/2026). `08-Referencias.md` e `09-Decisoes.md` atualizados. Nenhuma regra de estratégia mudou.

---

# Versão 1.3

Fonte: esclarecimentos do autor do KB (31/10/2026).

- Criado `12-Padroes.md` (ficha de padrões): fluxo de classificação do board, critérios dos cinco tipos, buckets, classes de mão, boards de referência e dúvidas abertas.
- Regra 4 (Guideline e Regras Consolidadas): esclarecimento de que a pior trinca em 100% vale só onde existe bucket de 100%. Pendência 5 resolvida, com ajuste do Exercício 05 ainda por fazer.
- Decisão 10 registrada.

Nenhuma tabela de buckets mudou.

---

# Versão 1.4

Fonte: esclarecimentos do autor do KB (01/11/2026).

- `12-Padroes.md`: critério de altura e de possibilidades de gutshot e duas pontas, boards 9-6-2, T-6-2, 7-6-5 e 6-5-4, critério da terceira carta no dobrado, range base do TP e regra de usar só boards validados nos exercícios.
- Decisão 10 complementada.
- Exercício 05 ajustado: a pior trinca em 100% vale onde existe bucket de 100%. Texto anterior da alternativa correta: "d) 100%, menos no board ultraconectado high", com a correção "A pior trinca vai sempre em 100%. A exceção é o board ultraconectado high (AKT, QJT, QJ9, KJ9), onde não existe mão em 100%."

Nenhuma tabela de buckets mudou.

---

# Próximas Atualizações

Adicionar:

- Exercícios com as mãos reais da revisão.
- A revisão do módulo 10 (Multiway).

<!-- graphify-links:start -->

---

## Ligações

_Gerado a partir do grafo do graphify. Não editar à mão: é sobrescrito na próxima geração._

**Pasta:** [[theory/15-Bet-vs-Missed/README|theory/15-Bet-vs-Missed]]

**Mesma pasta:** [[theory/15-Bet-vs-Missed/15 - BET VS MISSED GUIDELINE|01-Guideline]] · [[theory/15-Bet-vs-Missed/02-VideoAulas|02-VideoAulas]] · [[theory/15-Bet-vs-Missed/03-Solver|03-Solver]] · [[theory/15-Bet-vs-Missed/04-Exercicios|04-Exercicios]] · [[theory/15-Bet-vs-Missed/05-Regras-Consolidadas|05-Regras-Consolidadas]] · [[theory/15-Bet-vs-Missed/06-Pendencias|06-Pendencias]] · [[theory/15-Bet-vs-Missed/08-Referencias|08-Referencias]] · [[theory/15-Bet-vs-Missed/09-Decisoes|09-Decisoes]]

**Módulos citados no texto:** [[theory/10-MULTIWAY-POT/README|10-MULTIWAY-POT]]

<!-- graphify-links:end -->
