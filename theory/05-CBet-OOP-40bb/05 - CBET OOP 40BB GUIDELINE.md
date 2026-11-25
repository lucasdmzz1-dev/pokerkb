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
  - tipo/guideline
---

# Guideline — C-Bet OOP

**Flashcards:** [[theory/05-CBet-OOP-40bb/05 - CBET OOP 40BB FLASHCARDS|05 - CBET OOP 40BB FLASHCARDS]]

## Módulo — SRP OOP C-Bet Flop

---

# Contexto do Módulo

Stack:
40bb

Spot:
SRP

Posição:
OOP

Relações estudadas:

- EP vs BTN
- CO vs BTN

Street:
Flop

---

# Conceito Principal

C-Bet OOP não é baseado apenas em frequência de aposta.

A estratégia é construída através de:

- Range de bet.
- Range de check.
- Proteção do range de check.
- Realização de equity.
- Escolha das melhores mãos dentro de cada grupo.

O objetivo é evitar que o range de check fique fraco.

---

# Conceitos de Split

Existem dois principais tipos de construção:

---

# SPLIT RANGE

Estratégia onde dividimos uma grande parte do range entre:

- Bet.
- Check.

Não significa apostar pouco.

Significa distribuir mãos entre as duas ações.

---

## Construção do Split Range

### Top Pairs

Metade dos Top Pairs.

Critério:

- Usar com os naipes do board.

---

### Second Pairs

Metade dos Second Pairs.

Critério:

- Usar com os naipes do board.

---

### Draws

Entram:

- 2 pontas sem naipe do board.
- Brocas com naipe do board.

---

### Backdoors

Entram:

- Mãos com BDFD.
- Mãos com BDST.

---

# SPLIT 25%

Estratégia onde apenas uma parte menor do range aposta.

---

## Top Pairs

25% dos Top Pairs.

Critério:

- Parte off com o naipe do Flush Draw.
- Parte suited com BDFD.
- Em boards rainbow:
  - usar mãos sem o naipe do board.

---

## Draws

Entram:

- 2 pontas com naipe do board.
- Brocas com naipe do board.

Critério:

Usar o primeiro naipe do board para XR.

---

## Backdoors

Entram:

- Uma overcard + BDFD.
- BDST.

---

# Estratégia por Textura

---

# A HIGH SECO

## EP vs BTN

Estratégia:

Split Range

Size:

B25

---

## CO vs BTN

Estratégia:

Split Range

Size:

B25

---

# A HIGH CONECTADO

## EP vs BTN

Estratégia:

Split Range

Size:

B40

---

## CO vs BTN

Estratégia:

Split 25%

Size:

B40

---

# BBX

## EP vs BTN

Estratégia:

Range

Size:

B25

---

## CO vs BTN

Estratégia:

Split 25%

Size:

B40

---

# K-Q HIGH

## EP vs BTN

Estratégia:

Split Range

Size:

B40

---

## CO vs BTN

Estratégia:

Split 25%

Size:

B40

---

# J-T HIGH

## EP vs BTN

Estratégia:

Split Range

Size:

B40

---

## CO vs BTN

Estratégia:

Split 25%

Size:

B70

---

# HIGH COM SEGUIDA

## EP vs BTN

Estratégia:

Split Range

Size:

B40

---

## CO vs BTN

Estratégia:

Split 25%

Size:

B40

---

# LOW COM SEGUIDA

## EP vs BTN

Estratégia:

Split Range

Size:

B70

---

## CO vs BTN

Estratégia:

Split Range

Size:

B40

---

# LOW SEM SEGUIDA

## EP vs BTN

Estratégia:

Split Range

Size:

B70

---

## CO vs BTN

Estratégia:

Split Range

Size:

B70

---

# MONOTONE

## EP vs BTN

Estratégia:

Aleatório

Size:

B25

---

## CO vs BTN

Estratégia:

Check Range

---

# Construção por Categoria de Mão

---

# Top Pair

Não existe regra:

"Top Pair sempre aposta".

A escolha depende:

- Textura.
- Naipe.
- Necessidade de proteção.
- Construção do range de check.

---

# Second Pair

Também possui divisão.

Critérios:

- Kicker.
- Interação com board.
- Capacidade de continuar.

---

# Trincas

Nem toda trinca aposta.

A construção busca:

- Apostar parte das trincas.
- Manter parte das melhores trincas no check.

Objetivo:

Proteger o range de check.

---

# Draws

Nem todo draw aposta.

A decisão depende:

- Capacidade de continuar.
- Realização de equity.
- Blockers.

---

# Blockers

Os bluffs devem considerar:

- Quais mãos queremos fazer o vilão foldar.
- Quais cartas reduzem continuações adversárias.

---

# Regra Geral

C-Bet OOP não é maximizar apostas.

É construir dois ranges funcionais:

Range de Bet:

- Extrai valor.
- Pressiona.
- Protege mãos.

Range de Check:

- Possui força.
- Realiza equity.
- Protege contra exploração.


---

# Split do C-Bet OOP — mãos por linha (slides do coach)

Fonte: três slides do coach ("Split do Cbet OOP" em duas partes e "Extra") e a nota "Cbet OOP CO vs BTN, 40bb deep" (registrados em 25/11/2026). Os slides tratam do Split Range. A nota traz o mesmo split e acrescenta o Split 25%. A nota escreve "BU", que no módulo é BTN.

## Bet por valor

- Metade das seguidas (sequências feitas).
- Pior trinca.
- Dois pares.
- Primeiros overpairs acima do board.
- Top pairs com BDFD e os offs com naipes do board.
- Melhores PP (pockets pair) sobre o segundo par da mesa.
- Second pairs com BDFD.

## Bet por bluff

- Duas pontas sem BDFD.
- Brocas com BDFD.
- Duas pontas ou brocas da parte off que bloqueia o flush draw.
- Mãos com BDFD + BDST que façam foldar mãos melhores.

## Check-raise por valor

- Seguida (a outra metade), middle set, melhores overpairs e os 2 melhores top pairs.

## Check-raise por bluff

- Flush draws, draws com BDFD e mãos com uma high card mais BDFD + BDST.

## Check-call

- Top set, todos os pares, mãos com valor de showdown e draws diretos.

## Extra

- Em boards monotones, o bluff OOP é aleatório, com frequência baixa e size small.
- Em boards carregados, apostamos todos os overpairs em frequência de flop.
- Em boards carregados, o check-raise não tem a parte polar.
- EP contra EP: check range no board low.

## Frequência de bet por board (CO contra BTN)

- Maiores frequências de bet: 9 high e A high seco.
- Menores frequências de bet: monotone e high card.
- A tabela de textura, size e split da nota é a mesma que já está neste guideline para o CO.

## Split 25%, na nota

- 25% dos top pairs: a parte off com o naipe do flush draw, a parte suited com BDFD e, em board rainbow, os sem o naipe do board.
- Duas pontas e brocas: usar com o naipe do board e usar o primeiro naipe do board para o check-raise.
- Mãos com uma overcard, BDFD e BDST.

---

# Atualização da aula de revisão CO contra BTN (25/11/2026)

Fonte: aula de revisão do C-Bet OOP, CO contra BTN, com o coach (vídeo "CBet OOP co VS BU - ivan", transcrição de 25/11/2026). O coach diz que o que mudou nesta revisão foi principalmente a parte dos **conectados consecutivos**. O resto é a mesma estratégia, explicada de novo.

## Boards em check range

- **Monotone** e **conectados consecutivos** (987, 765, 654, T98 e parecidos): check range. Nos consecutivos, a frequência de bet do solver é baixa (cerca de 5%, com exceções de até 20%, como o 987).
- A razão: o range de abertura quase não interage com esses boards, e eles mudam muito de nuts. Interação é a do range inteiro, não de uma mão isolada.
- **Q-J-T** (três broadways seguidos) segue o BBX, não o check range.
- No EP, os lows conectados também são exceção de check range (o coach cita o 765).
- Quanto mais alto o consecutivo, mais interação: o 987 aposta mais que o 543.

## Estratégia por board, CO contra BTN (os seis números do quiz)

| Board | Estratégia |
|---|---|
| Monotone | Check range |
| Low sem seguida | B70 split range |
| A high seco | B25 split range |
| A high conectado | B40 split 25% |
| J-T high | B70 split 25% |
| K-Q high e BBX | B40 split 25% |
| High com seguida | B40 split 25% |
| Dobrado (JJ9, por exemplo) | B40 split range |
| Consecutivo (987, 765, 654, T98) | Check range |

- O board low é o único em que o CO usa as mesmas propriedades do EP (split range e size de EP). O A high mais seco também. Todo o resto vai para o Split 25%.
- No CO contra BTN nunca existe range bet, nem em BBX.
- A frequência global de bet do CO contra BTN fica perto de 25%. No split padrão as mãos vão perto de 50% e 50%, e no Split 25% as mãos vão perto de 25%.

## Por que a frequência é menor no CO

- O range de abertura é amplo, com muita mão fraca (Q4s, K3s, T7s), que erra o flop. Interage pouco, então checa mais.
- OOP é preciso ter equity para pôr dinheiro. Com muita mão fraca apostando no flop, falta mão para fazer barrel e sobra check-fold no turn.
- Com poucas mãos fortes no check, o bet do turn fica cheio de air e pobre de valor.

## Split 25%: como as mãos se distribuem

- **Overpair:** o primeiro overpair aposta, o melhor (AA) vai de check-raise, e o do meio fica no meio-termo, sem definição. É a única mão em frequência alta.
- **Top pair:** a maior parte vai de check. Aposta a parte que fica na frequência de 25%: em board rainbow, os que não têm o naipe do board, e em board com flush draw, a parte off com o naipe do flush draw. Os melhores top pairs sem essa condição (AJ no J-high, por exemplo) vão de check-raise por valor.
- **Second pair e third pair:** nunca apostam. Dão check-call. Pares de bolso baixos também (55, 44, 33 no J-6-2).
- **Trincas:** a pior aposta, a do meio dá check-raise, o top set dá check-call.
- **Valor de showdown (AK, AQ no J-high):** check-call. Se virar blank, vira bluff no turn.
- **Mãos sem valor de showdown e sem equity:** check-fold. Exemplos: A6o, Q7s de ouro no J-6-2. Mão solta precisa de conectividade, e em board seco os dois critérios juntos (BDFD e BDST) para apostar.
- **Draws diretos e brocas:** usar o naipe do board. Check-raise com o primeiro naipe do board. As outras mãos dividem entre bet e check-call. A parte off do check-raise usa o blocker do flush draw (a carta do naipe do flush draw), porque retém mais equity e toma menos raise.
- **Mãos com BDFD e BDST:** apostam. Com a carta do primeiro naipe do board, vão de check-raise (A5 de espadas no J-6-2). Os outros naipes apostam.

## Check-raise

- Quanto mais seco o board, mais polar (blefe) pode ser o check-raise. Em board seco (J-6-2), A5 com backdoors é um bom check-raise.
- Quanto mais carregado o board, mais equity o check-raise precisa ter, e ele não tem a parte polar.
- Em board carregado (J-9-8), os overpairs apostam: não se quer pôr dinheiro no pote com um par só.

## Flush draws com board de flush draw (split padrão)

- **Nut flush draw com valor de showdown** (AQ de copas): check-call.
- **Flush draws que não são os melhores** (K8, Q9, Q7, K7 de copas): apostam, porque não colorem mãos piores e fazem foldar mãos melhores.
- **Flush draws de ás e combo draws** (A5 de copas com backdoor de sequência, T9 de copas): check-raise.

## Pares de bolso acima do segundo par (exemplo da aula)

O coach cita 10-10 e 9-9 no check-call e 8-8 e 7-7 no bet, pela necessidade de proteção. Este exemplo diverge do esclarecimento do autor (os 2 melhores apostam), que o autor confirmou de novo e que vale (Pendência 19, resolvida).

## Seguidas

Os slides põem metade das seguidas no bet por valor e a outra metade no check-raise. A aula não define qual metade.

---

# Second Barrel OOP

Fonte: guideline do instrutor (ainda sem aula).

## Contexto

Stack:
40bb

Spot:
SRP, Hero agressor OOP, C-Bet no flop e pago.

Street:
Turn

---

## Estratégia por textura de turn

| Textura do turn | Size | Apostar |
|---|---|---|
| Blank | B100 | 2-3 melhores TP ou melhor |
| Dinâmico, high card seco | B40 | Todos os TP (deixar 1-2 piores no X/C) e os 2 melhores Second Pairs ou melhor |
| Dinâmico, high card seco, sem querer value de Second Pair | B70 | Todos os TP ou melhor |
| High card carregado | B100 | 1-2 melhores TP ou melhor |
| Dinâmico, flush | B40 | 2 melhores TP ou melhor |

---

## Leitura da lógica

Inferência a partir da tabela, não está escrita no guideline.

- O size acompanha a largura do range de valor. B40 inclui Second Pairs (range largo). B70 e B100 aparecem quando o range de valor é só TP ou melhor (range estreito).
- A mesma textura (dinâmico, high card seco) tem duas versões: B40 se queremos value de Second Pair, B70 se não queremos.
- Turn de flush é a exceção: o range é estreito (2 melhores TP), mas o size continua B40. Board que completa flush não pede size maior, porque o adversário passa a foldar mãos que deveriam continuar pagando (Regra 3 do módulo 11).
- Turn blank pede o size mais alto: sem mudança no que o vilão chega jogando, o top pair dele paga qualquer size (Regra 4 do módulo 11).

---

## Consistência com outros módulos

- Módulo 10, Multiway, situação 1: turn blank em B100 com os 3 melhores TP ou melhor, e dinâmico em B40 com Second Pairs fortes ou melhor. Os números batem.
- Módulo 11, Value Bet: a lógica de size por largura de range é a Regra 2.

---

## Em aberto

O guideline cobre só o range de valor. Bluffs, semi-bluffs e a composição do check no turn ainda não estão definidos (ver Pendências).

<!-- graphify-links:start -->

---

## Ligações

_Gerado a partir do grafo do graphify. Não editar à mão: é sobrescrito na próxima geração._

**Pasta:** [[theory/05-CBet-OOP-40bb/README|theory/05-CBet-OOP-40bb]]

**Mesma pasta:** [[theory/05-CBet-OOP-40bb/02-VideoAulas|02-VideoAulas]] · [[theory/05-CBet-OOP-40bb/03-Solver|03-Solver]] · [[theory/05-CBet-OOP-40bb/04-Exercicios|04-Exercicios]] · [[theory/05-CBet-OOP-40bb/05-Regras-Consolidadas|05-Regras-Consolidadas]] · [[theory/05-CBet-OOP-40bb/06-Pendencias|06-Pendencias]] · [[theory/05-CBet-OOP-40bb/07-Changelog|07-Changelog]] · [[theory/05-CBet-OOP-40bb/08-Referencias|08-Referencias]] · [[theory/05-CBet-OOP-40bb/09-Decisoes|09-Decisoes]]

**Módulos citados no texto:** [[theory/10-MULTIWAY-POT/README|10-MULTIWAY-POT]] · [[theory/11-Value-Bet-Masterclass/README|11-Value-Bet-Masterclass]]

**Outros módulos:**

- [[theory/06-XR-SHORT/09-Decisoes|06-XR-SHORT · 09-Decisoes]]
- [[theory/06-XR-SHORT/02-VideoAulas|06-XR-SHORT · 02-VideoAulas]]

<!-- graphify-links:end -->
