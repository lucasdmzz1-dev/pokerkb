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
  - tipo/regras
---

# Regras Consolidadas — C-Bet OOP

## Módulo — SRP OOP C-Bet Flop

---

# Contexto

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

# Regra 1 — C-Bet OOP é construção de range

A decisão não é:

"Minha mão é boa?"

A decisão é:

"Como essa mão se encaixa na construção do meu range de bet e check?"

---

# Regra 2 — O range de check precisa ser protegido

Não podemos construir:

Bet = mãos fortes

Check = mãos fracas

O range de check precisa conter:

- Valor.
- Showdown value.
- Mãos capazes de continuar.
- Mãos fortes para proteção.

---

# Regra 3 — EP vs BTN e CO vs BTN são estratégias diferentes

Não utilizar a mesma estratégia para os dois spots.

Motivo:

A composição dos ranges é diferente.

---

# Regra 4 — Escolher primeiro a estratégia do board

Antes de escolher uma mão:

Identificar:

- Range.
- Split Range.
- Split 25%.
- Check Range.

A mão individual vem depois.

---

# Regra 5 — Split Range

Utilizar quando queremos dividir uma grande parte do range.

Construção:

## Top Pairs

Metade dos Top Pairs.

Usar com os naipes do board.

---

## Second Pairs

Metade dos Second Pairs.

Usar com os naipes do board.

---

## Draws

Preferência:

- 2 pontas sem naipe do board.
- Brocas com naipe do board.

---

## Backdoors

Entram:

- BDFD.
- BDST.

---

# Regra 6 — Split 25%

Utilizado quando queremos uma frequência menor de aposta.

---

## Top Pair

Entram:

- Parte off com naipe do Flush Draw.
- Parte suited com BDFD.

Board rainbow:

- Usar mãos sem naipe do board.

---

## Draws

Preferência:

- 2 pontas com naipe do board.
- Brocas com naipe do board.

---

# Regra 7 — Top Pair não é automático

Top Pair pode:

- Apostar.
- Checar.

Critérios:

- Kicker.
- Naipe.
- Textura.
- Necessidade de proteção.

---

# Regra 8 — Second Pair possui divisão

Second Pair pode entrar no:

Bet:

Quando possui:

- Melhor kicker.
- Melhor interação.
- Valor/proteção.

Check:

Quando:

- Quer realizar equity.
- Não quer enfrentar agressão.

---

# Regra 9 — Mãos muito fortes também podem checar

Trincas e mãos fortes podem permanecer no check.

Objetivo:

- Proteger o range de check.
- Evitar que o adversário ataque todo check.

---

# Regra 10 — Nem todo draw aposta

A decisão depende de:

- Equity.
- Capacidade de continuar.
- Blockers.
- Realização de equity.

---

# Regra 11 — Low conectado e Low desconectado possuem estratégias diferentes

## Low conectado

Board muda mais.

Utilizamos size menor.

---

## Low desconectado

Valor precisa de proteção.

Utilizamos size maior.

---

# Regra 12 — Monotone CO vs BTN

Estratégia:

Check Range.

---

# Regra 13 — Size faz parte da estratégia

Não é apenas quantidade de apostas.

O size escolhido representa:

- Construção do range.
- Textura do board.
- Objetivo da aposta.

---

# Regra 14 — Mãos feitas fortes na Prática: overpairs, trincas e dois pares

Fonte: regras da área Prática do site (corrigidas pelo dono e pelo coach), registradas aqui em 24/11/2026. Valem para Split Range e Split 25%, antes de olhar os naipes. Não vêm da guideline nem da aula.

## Overpairs

- Melhor overpair (AA): **check-raise** por valor.
- Primeiro overpair acima do board (ex.: QQ no J-8-3): **bet** no size do board, por valor.
- Overpairs do meio (ex.: KK no J-8-3): sem regra definida, ficam fora do treino.

Exemplo: J♠ 8♦ 3♣, EP contra BTN (Split Range, B40). A♥A♣ dá check-raise. Os naipes da mão não mudam a jogada.

## Trincas

- Pior trinca: **bet** por valor.
- Trinca do meio: **check-raise** por valor.
- Top set: **check-call** (mantém uma mão forte no check e protege o range, Regras 2 e 9).

## Dois pares

- **Bet** por valor.

## Par de bolso abaixo do top pair

- Second pair, third pair e underpair de par de bolso: **check-call**, sem olhar os naipes (Decisão 7).

## Fora das regras (sem jogada definida)

Par com draw, flush draw com draw de sequência, sequência feita e flush feito. A Prática não treina esses casos.

---

# Regra 15 — A high seco, EP e CO contra BTN: os 2 melhores top pairs vão de check-raise

Fonte: esclarecimento do autor do KB (24/11/2026), vindo de uma correção na Prática.

No A high seco (Split Range, B25), a metade dos top pairs que não aposta (sem naipe do board) não fica toda no check-call. Os 2 melhores top pairs, pelo kicker (AK e AQ), vão de **check-raise** por valor. Os demais (AJ para baixo) seguem no check-call. Os que apostam (naipe do flush draw, backdoor flush draw) seguem apostando.

Exemplo: A♥ 7♥ 2♣, CO contra BTN. A♠Q♦ não tem naipe do board e é um dos 2 melhores top pairs: check-raise. A♠J♦ segue no check-call.

**Escopo:** A high seco, nos dois spots (CO contra BTN, e EP contra BTN, confirmado pelo autor no mesmo dia). As outras texturas ficam como estavam até o autor confirmar (Pendência 10).

---

# Regra principal do módulo

C-Bet OOP é construir dois ranges funcionais:

Range de Bet:

- Extrai valor.
- Protege mãos.
- Pressiona.

Range de Check:

- Possui força.
- Realiza equity.
- Protege contra exploração.

# Correção do Instrutor — Divisão dos Nut Flush Draws

## Spot

Contexto:

Stack:
40bb

Spot:
SRP

Posição:
OOP

Street:
Flop

Módulo:
C-Bet OOP

Board:
K♦ 4♥ 2♥

Mão:
A♥7♥

---

# Conceito

Os Nut Flush Draws não devem ser tratados como um grupo único.

A estratégia divide os NFDs conforme a força do Ax.

A ideia é extrair a melhor função de cada grupo:

- Valor de showdown.
- Bloqueio de flush draws do vilão.
- Proteção de equity.
- Fold equity.
- Capacidade de coolerar draws adversários.

---

# 1) Nut Flush Draws Fortes

Exemplos:

AK  
AQ  
AJ  
AT

Linha:

## Check Call

Motivos:

- Possuem valor de showdown mais robusto.
- Possuem hot cards.
- Bloqueiam boa parte dos flush draws do vilão.

Essas mãos não precisam transformar sua força em agressão.

---

# 2) Nut Flush Draws Médios

Exemplos:

A9  
A8  
A7  
A6

Linha:

## Bet

Motivos:

- Protegem contra outs de Ax no turn.
- Geram fold equity no flop.
- Geram fold equity no turn.
- Aproveitam a vulnerabilidade do range adversário.

Exemplo:

A♥7♥

No board K♦4♥2♥:

→ BET

---

# 3) Nut Flush Draws Baixos

Exemplos:

A5  
A4  
A3  
A2

Linha:

## Check Raise

Motivos:

- Possuem menor valor de showdown.
- Permitem manter mais Flush Draws no range adversário.
- Conseguem coolerar esses Flush Draws quando acertam.
- Funcionam melhor como agressão.

---

# Regra Consolidada

Nut Flush Draw não é uma categoria única.

Divisão prática:

## Ax forte:
XC

## Ax médio:
BET

## Ax baixo:
XR

---

# Observação

Uma alternativa seria randomizar todos os Nut Flush Draws com uma frequência média de aproximadamente 33%.

Porém, a divisão por grupos permite uma estratégia mais prática:

- Cada grupo cumpre uma função específica.
- Facilita execução humana.
- Mantém a frequência próxima da solução do solver.

<!-- graphify-links:start -->

---

## Ligações

_Gerado a partir do grafo do graphify. Não editar à mão: é sobrescrito na próxima geração._

**Pasta:** [[theory/05-CBet-OOP-40bb/README|theory/05-CBet-OOP-40bb]]

**Mesma pasta:** [[theory/05-CBet-OOP-40bb/05 - CBET OOP 40BB GUIDELINE|01-Guideline]] · [[theory/05-CBet-OOP-40bb/02-VideoAulas|02-VideoAulas]] · [[theory/05-CBet-OOP-40bb/03-Solver|03-Solver]] · [[theory/05-CBet-OOP-40bb/04-Exercicios|04-Exercicios]] · [[theory/05-CBet-OOP-40bb/06-Pendencias|06-Pendencias]] · [[theory/05-CBet-OOP-40bb/07-Changelog|07-Changelog]] · [[theory/05-CBet-OOP-40bb/08-Referencias|08-Referencias]] · [[theory/05-CBet-OOP-40bb/09-Decisoes|09-Decisoes]]

**Outros módulos:**

- [[theory/06-XR-SHORT/05-Regras-Consolidadas|06-XR-SHORT · 05-Regras-Consolidadas]]

<!-- graphify-links:end -->
