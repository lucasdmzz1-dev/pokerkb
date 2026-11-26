---
tags:
  - modulo/15-bet-vs-missed
  - spot/srp
  - posicao/ip
  - street/flop
  - linha/bet-vs-missed
  - tipo/padroes
---

# Padrões — Bet vs Missed C-Bet

> Módulo 15 — ficha de padrões (v0.1, rascunho em discussão)
>
> **Objetivo:** dizer em qual dos cinco tipos de flop qualquer board cai e em qual bucket cada classe de mão vai. É a base para criar boards e situações próprias (trainer) sem ficar só nos exemplos da aula.

---

# Contexto

Spot:
O agressor pré-flop abre, você paga em posição, o agressor dá check no flop (missed c-bet) e você age em posição.

Stacks:
A estratégia vale como um todo, sem stack fixo (Decisão 2).

Fonte:
Guideline, VideoAulas e Solver deste módulo (o guideline em imagem do instrutor), mais esclarecimentos do autor do KB em 31/10/2026.

Marcações:

- **[Imagem]**: está no guideline em imagem do instrutor.
- **[Aula]**: dito pelo instrutor.
- **[Autor]**: esclarecimento do autor do KB (31/10/2026).
- **[Inferência]**: conclusão a partir das fontes, ainda não validada.
- **[Dúvida]**: ponto aberto, a discutir ou levar ao coach (lista na seção 7).

---

# 1. Como classificar um board

Siga esta ordem:

1. **Três cartas do mesmo naipe?** É **monotone**. **[Imagem]**
2. **Board pareado (carta repetida)?** É **dobrado**, sempre, em qualquer altura. **[Autor]** O quanto a terceira carta se conecta com o par decide entre **seco** e **carregado** (seção 2). **[Autor]**
3. **Senão, olhe a interação do range do opener com o board:** quanto do range dele acerta o board (pares, dois pares, draws). Isso decide entre **seco**, **semi conectado** e **conectado high**. Duas coisas aumentam a conexão: **cartas mais altas** e **mais possibilidades de gutshot e duas pontas** no flop. **[Aula]** **[Autor]**
4. **Dois naipes no board não mudam o tipo.** O naipe só decide quais combos apostam (Regras 13 e 14 do guideline). **[Inferência]**
5. **Ajuste pelo opener:** a posição e o stack dele mudam o tipo do mesmo board (seção 5).

---

# 2. Os cinco tipos

| Tipo | Critério | Size |
|---|---|---|
| **Conectado high** | Cartas encadeadas (altas, ou baixas contra um opener que acerta quase tudo), com muitas sequências e draws. Não existe bucket de 100% | B50 |
| **Semi conectado** | O range do opener acerta muito o board, por cartas altas (A-K-2), por cartas médias conectadas (J-9-6) ou por boards baixos conectados (7-6-5, 6-5-4) | B50 |
| **Seco** | Poucas cartas altas, com gaps amplos e poucas possibilidades de gutshot e duas pontas (T-6-2, K-7-4). Quanto mais baixo o board e maiores os gaps, mais seco. O range do opener acerta pouco | B25 |
| **Monotone** | Três cartas do mesmo naipe | B25 |
| **Dobrado** | Board pareado. Seco: a terceira carta não forma sequência nem flush draw com o par. Carregado: forma |  B25 |

Critérios dos quatro primeiros tipos (menos o monotone) são **[Aula]** e **[Autor]**. A redação em termos de "acerta o range" é **[Inferência]**.

---

# 3. Os buckets de cada tipo **[Imagem]**

### Conectado high (B50)

| Bucket | Mãos |
|---|---|
| **75%** | Sequência e flush draw nuts |
| **50%** | Trincas, dois pares, TP forte, duas pontas, BDFD + BDSD |
| **25%** | TP médio e fraco, segundo par, terceiro par, underpair, air, gutshot |

### Semi conectado (B50)

| Bucket | Mãos |
|---|---|
| **100%** | Pior trinca, top two pair e overpair |
| **75%** | Dois pares, TP forte, sequência |
| **50%** | TP médio, underpair, flush draw, duas pontas, gutshot, BDFD + BDSD |
| **25%** | TP fraco, segundo par, terceiro par, air |

### Seco (B25)

| Bucket | Mãos |
|---|---|
| **100%** | Overpair e trincas (menos a top trinca) |
| **75%** | Dois pares, TP e a top trinca |
| **50%** | Todo o restante |

### Monotone (B25)

| Bucket | Mãos |
|---|---|
| **75%** | Trinca e BDSD |
| **50%** | Flush, dois pares, top pair, flush draw, duas pontas e gutshot |
| **25%** | Todo o restante |

### Dobrado (B25)

| Tipo | Bucket | Mãos |
|---|---|---|
| **Seco** | 75% | Fulls e trincas |
| **Seco** | 50% | Todo o restante |
| **Carregado** | 50% | Mãos com mais equity |
| **Carregado** | 25% | Todo o restante |

---

# 4. Classes de mão

**Pior trinca.** Vai em 100% **nos boards que têm bucket de 100%** (semi conectado e seco). Nos boards sem bucket de 100% (conectado high, monotone e dobrado) não há onde encaixá-la em 100%, e ela vai onde a tabela do board põe a trinca: 50% no conectado high, 75% no monotone e 75% no dobrado seco. **[Autor]**

**TP forte, médio e fraco.** A força do top pair é **relativa ao range que chega no spot**, e não a um kicker fixo. Forte são geralmente os dois melhores kickers que de fato existem no range. Fraco são os piores kickers do range. O range base é o range com que o autor paga pré-flop em cada posição. Mãos que vão para 3bet pré-flop saem da conta (por exemplo, o AK quase não aparece num flop K-9-2). No K-9-2, os melhores kickers são KQ e KJ, e o pior pode ser o K8s, conforme a posição. **[Autor]**

**Demais classes** (overpair, underpair, segundo e terceiro par, dois pares, draws): as definições estão em "Como ler este guideline" do `15 - BET VS MISSED GUIDELINE.md`.

---

# 5. Ajuste pelo opener

A classificação muda com o range do opener. Exemplos da aula **[Aula]**:

| Board | Situação | Tipo |
|---|---|---|
| 9-8-6 | contra HJ | semi conectado |
| 8-7-6 | deep | semi conectado |
| 8-7-6 | CO contra BTN | conectado |
| 8-5-4 | — | tratado como seco |

Contra EP e MP o range é outro que o do BB, então o tipo pode mudar (Regra 16 do guideline). **[Aula]**

---

# 6. Boards de referência

| Board | Tipo | Fonte | Status |
|---|---|---|---|
| A♠ K♥ T♦ | Conectado high | Imagem | Validado |
| QJT, QJ9, KJ9 | Conectado high (ultraconectado) | Aula (Regra 4) | Validado |
| 8-7-6 (CO contra BTN) | Conectado high | Aula | Validado |
| A-K-2 | Semi conectado | Aula (AJ em 75% com B50) e autor | Validado |
| J♠ 9♥ 6♣ | Semi conectado | Imagem | Validado |
| 9-8-6 (contra HJ) | Semi conectado | Aula | Validado |
| 8-7-6 (deep) | Semi conectado | Aula | Validado |
| 7-6-5, 6-5-4 | Semi conectado | Autor | Validado |
| Q♠ 5♥ 3♣ | Seco | Imagem | Validado |
| Q-2-3, K-5-3, K-7-4, A-7-2 | Seco | Autor | Validado |
| A-5-3, 9-4-2, T-3-2, Q-6-4 | Seco | Aula | Validado |
| T-6-2 | Seco | Autor | Validado |
| T-7-3, T-7-5, 8-3-2, 8-7-2 | Seco | Autor (exemplos do trainer do coach, 02/11/2026) | Validado |
| 9-8-2, 9-6-4, 9-5-4 | Seco | Trainer do coach (03/11/2026) | Validado |
| 9-6-2 | Seco (antes semi conectado) | Autor, pelos exemplos do trainer do coach (03/11/2026) | Validado |
| 8-5-4 | Seco (tratado como) | Aula | Validado |
| A♠ 9♠ 8♠ | Monotone | Imagem | Validado |
| J-3-3 | Dobrado seco | Aula | Validado |
| K-K-2 | Dobrado seco | Autor | Validado |
| 8-8-4, 7-7-3 | Dobrado seco | Trainer do coach (03/11/2026) | Validado |
| J-J-9 | Dobrado carregado | Aula | Validado |
| K-K-J | Dobrado carregado | Autor | Validado |
| K♠ K♥ 7♣ | Dobrado (tipo validado; subtipo seco é inferência) | Imagem e autor | Tipo validado |

---

# 7. Dúvidas abertas

1. **Boards intermediários** entre semi conectado e seco além dos exemplos validados (por exemplo 9-6-3, 8-6-2). O critério existe (altura e possibilidades de gutshot e duas pontas), mas o corte exato não. Por isso os exercícios usam só boards validados.
2. **Limite dos boards baixos:** 7-6-5 e 6-5-4 são semi conectados. Falta saber até onde vai (5-4-3, 7-5-4, 8-6-4).
3. **Dobrado:** o critério é a terceira carta formar sequência e flush draw com o par. Falta confirmar as cartas do meio (K-K-9, K-K-8, K-K-T).
4. **Fonte do range base do TP:** o range é o de call pré-flop do autor em cada posição. Falta esse range registrado no KB, por posição, para eu classificar o TP.
5. **Resolvida em 01/11/2026:** no K-9-2, os melhores kickers são KQ e KJ, e o pior pode ser o K8s, conforme a posição.

Itens esclarecidos em 01/11/2026: o critério de altura e de possibilidades de gutshot e duas pontas, os boards 9-6-2 (semi, revisto em 03/11/2026 para seco), T-6-2 (seco), 7-6-5 e 6-5-4 (semi), o critério da terceira carta no dobrado e o range base do TP.

Itens esclarecidos em 31/10/2026: A-K-2 é semi conectado, a lista dos boards secos, o critério da terceira carta no dobrado, o top pair relativo ao range e a pior trinca (ver `09-Decisoes.md`, Decisão 10).

---

# 8. Criação de exercícios

Por enquanto, os exercícios e as situações do trainer usam **só boards com status Validado** (seção 6). Boards intermediários ou com status Inferência ficam de fora até serem confirmados.

---

# 9. Esclarecimentos de 02/11/2026

- **Boards secos:** T-7-3, T-7-5, 8-3-2 e 8-7-2 são secos, segundo exemplos do trainer do coach. Isso responde em parte a dúvida 1 (boards intermediários entre semi conectado e seco).
- **Top set:** a imagem do flop seco (Q-5-3) lista overpair e trincas em 100% e "2 pares, TPs e TS" em 75%. A top trinca (TS) fica em 75%.
- **Pocket pairs (autor):** overpair é acima de todas as cartas. Entre a primeira e a segunda carta é segundo par, entre a segunda e a terceira é terceiro par, e só abaixo de todas é underpair. No J-9-6, TT é segundo par, 77 é terceiro par e 55 é underpair.
- **Range do treino:** a Prática só sorteia mãos que o BTN paga contra o open do CO e do HJ, a 40bb (Poker Academy). Os ranges estão em `theory/tools/ranges-poker-academy.md`. Mãos que o BTN só 3beta (AA, QQ, AKs) ou folda (53s, 96s) ficam fora do treino.

# 10. Exemplos do trainer do coach (03/11/2026)

- **Boards secos:** 9-8-2, 9-6-4 e 9-5-4 aparecem no trainer como board seco, em split B25 (overpairs e sets em 100%, dois pares e top pairs em 75%, o restante em 50%). Pelo mesmo critério, o 9-6-2 passa de semi conectado para seco.
- **Mãos do trainer:** TT no 9-8-2 e JJ no 9-5-4 são overpair, 100% B25. K9 no 9-6-4 é top pair, 75% B25.
- **Dobrado seco:** 8-8-4 e 7-7-3 são dobrado seco, com as trincas em B25 a 75% (T8 no 8-8-4, J7 no 7-7-3).
- **Top set:** o texto do trainer diz "overpairs e sets: 100%" sem citar a exceção da top trinca. No seco, a top trinca fica em 75%: confirmado pelo autor do KB em 03/11/2026, como na imagem do flop seco.

# Ligações

Regras 4, 10, 11 e 12 do guideline, `03-Solver.md` (as tabelas), `04-Exercicios.md` (exercícios 05, 06 e os de classificação de board) e `06-Pendencias.md`.
