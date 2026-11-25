---
tags:
  - modulo/05-cbet-oop-40bb
  - spot/srp
  - posicao/oop
  - street/flop
  - stack/40bb
  - tipo/guia
---

# Mapa por Textura — C-Bet OOP

## Módulo 05 — C-Bet OOP 40bb (só o flop)

> Complemento do `10-Como-Jogar.md`. Mostra, em cada textura da guideline, quais classes de mão vão para bet, check-raise e check-call, no EP contra BTN e no CO contra BTN. Gerado das regras da Prática aplicadas a todas as mãos que cada posição abre (EP2 e CO do Poker Academy), em 25/11/2026. Cada board de exemplo é o board-base da textura, em versão rainbow e com dois naipes.

**Como ler.** Cada linha mostra a categoria, os combos (entre parênteses) e as classes (s = suited, o = off). A função (valor, bluff, proteção) segue o `10-Como-Jogar.md`. O que a Prática não cobre fica fora das listas e entra na linha "Sem regra" (Pendências 11 a 14).

---

# 1. A high seco

## Board A♠ 7♦ 2♣ (rainbow)

**EP contra BTN: split range, B25.** 236 combos no range de abertura, 95 com regra.

| Linha | Categoria (combos) | Classes |
|---|---|---|
| Bet | Top pair com backdoor flush draw (20) | AKs, AQs, AJs, ATs, A9s, A8s, A6s, A5s, A4s, A3s |
| Bet | Melhor par de bolso sobre o segundo par (12) | KK, QQ |
| Bet | Second pair com backdoor flush draw (4) | 87s, 76s |
| Bet | Dois pares (2) | A7s |
| Check-raise | Trinca do meio (3) | 77 |
| Check-raise | Draw com backdoor flush draw (3) | 54s |
| Check-raise | Melhor top pair (2) | AKs, AQs |
| Check-call | Second pair (par de bolso) (24) | JJ, TT, 99, 88 |
| Check-call | Third pair (par de bolso) (12) | 66, 55 |
| Check-call | Top pair sem naipe do board (8) | AJs, ATs, A9s, A8s, A6s, A5s, A4s, A3s |
| Check-call | Top set (3) | AA |
| Check-call | Second pair sem naipe do board (2) | 87s, 76s |
| Sem regra | 141 combos, 104 sem par e sem draw | |

**CO contra BTN: split range, B25.** 454 combos no range de abertura, 137 com regra.

| Linha | Categoria (combos) | Classes |
|---|---|---|
| Bet | Top pair com backdoor flush draw (20) | AKs, AQs, AJs, ATs, A9s, A8s, A6s, A5s, A4s, A3s |
| Bet | Second pair com backdoor flush draw (16) | K7s, Q7s, J7s, T7s, 97s, 87s, 76s, 75s |
| Bet | Melhor par de bolso sobre o segundo par (12) | KK, QQ |
| Bet | Dois pares (11) | A7o, A7s, A2s |
| Check-raise | Trinca do meio (3) | 77 |
| Check-raise | Draw com backdoor flush draw (3) | 54s |
| Check-raise | Melhor top pair (2) | AKs, AQs |
| Check-call | Second pair (par de bolso) (24) | JJ, TT, 99, 88 |
| Check-call | Third pair (par de bolso) (24) | 66, 55, 44, 33 |
| Check-call | Top pair sem naipe do board (8) | AJs, ATs, A9s, A8s, A6s, A5s, A4s, A3s |
| Check-call | Second pair sem naipe do board (8) | K7s, Q7s, J7s, T7s, 97s, 87s, 76s, 75s |
| Check-call | Top set (3) | AA |
| Check-call | Third pair (3) | K2s |
| Sem regra | 317 combos, 244 sem par e sem draw | |

## Board A♥ 7♥ 2♣ (dois naipes)

**EP contra BTN: split range, B25.** 237 combos no range de abertura, 114 com regra.

| Linha | Categoria (combos) | Classes |
|---|---|---|
| Bet | Top pair com o naipe do flush draw (12) | AKo, AQo, AJo, ATo |
| Bet | Melhor par de bolso sobre o segundo par (12) | KK, QQ |
| Bet | Top pair com backdoor flush draw (10) | AKs, AQs, AJs, ATs, A9s, A8s, A6s, A5s, A4s, A3s |
| Bet | Dois pares (3) | A7s |
| Bet | Second pair com backdoor flush draw (2) | 87s, 76s |
| Check-raise | Melhor top pair (8) | AKs, AKo, AQs, AQo |
| Check-raise | Trinca do meio (3) | 77 |
| Check-raise | Draw com backdoor flush draw (1) | 54s |
| Check-call | Second pair (par de bolso) (24) | JJ, TT, 99, 88 |
| Check-call | Top pair sem naipe do board (20) | AJs, AJo, ATs, ATo, A9s, A8s, A6s, A5s, A4s, A3s |
| Check-call | Third pair (par de bolso) (12) | 66, 55 |
| Check-call | Second pair sem naipe do board (4) | 87s, 76s |
| Check-call | Top set (3) | AA |
| Sem regra | 123 combos, 90 sem par e sem draw | |

**CO contra BTN: split range, B25.** 454 combos no range de abertura, 174 com regra.

| Linha | Categoria (combos) | Classes |
|---|---|---|
| Bet | Top pair com o naipe do flush draw (24) | AKo, AQo, AJo, ATo, A9o, A8o, A6o, A5o |
| Bet | Melhor par de bolso sobre o segundo par (12) | KK, QQ |
| Bet | Dois pares (11) | A7s, A7o, A2s |
| Bet | Top pair com backdoor flush draw (10) | AKs, AQs, AJs, ATs, A9s, A8s, A6s, A5s, A4s, A3s |
| Bet | Second pair com backdoor flush draw (8) | K7s, Q7s, J7s, T7s, 97s, 87s, 76s, 75s |
| Check-raise | Melhor top pair (8) | AKs, AKo, AQs, AQo |
| Check-raise | Trinca do meio (3) | 77 |
| Check-raise | Draw com backdoor flush draw (1) | 54s |
| Check-call | Top pair sem naipe do board (28) | AJs, AJo, ATs, ATo, A9s, A9o, A8s, A8o, A6s, A6o, A5s, A5o, A4s, A3s |
| Check-call | Second pair (par de bolso) (24) | JJ, TT, 99, 88 |
| Check-call | Third pair (par de bolso) (24) | 66, 55, 44, 33 |
| Check-call | Second pair sem naipe do board (16) | K7s, Q7s, J7s, T7s, 97s, 87s, 76s, 75s |
| Check-call | Top set (3) | AA |
| Check-call | Third pair (2) | K2s |
| Sem regra | 280 combos, 216 sem par e sem draw | |

# 2. A high conectado

## Board A♠ J♦ T♣ (rainbow)

**EP contra BTN: split range, B40.** 212 combos no range de abertura, 106 com regra.

| Linha | Categoria (combos) | Classes |
|---|---|---|
| Bet | Dois pares (20) | AJo, AJs, ATo, ATs, JTs |
| Bet | Top pair com backdoor flush draw (14) | A9s, A8s, A7s, A6s, A5s, A4s, A3s |
| Bet | Trinca baixa (3) | TT |
| Bet | Duas pontas sem naipe do board (2) | Q9s, 98s |
| Bet | Second pair com backdoor flush draw (2) | J9s |
| Check-raise | Draw com backdoor flush draw (15) | K9s, K8s, Q9s, 98s, 87s |
| Check-raise | Trinca do meio (3) | JJ |
| Check-call | Underpair (30) | 99, 88, 77, 66, 55 |
| Check-call | Top pair sem naipe do board (7) | A9s, A8s, A7s, A6s, A5s, A4s, A3s |
| Check-call | Third pair (6) | T9s, T8s |
| Check-call | Top set (3) | AA |
| Check-call | Second pair sem naipe do board (1) | J9s |
| Sem regra | 106 combos, 12 sem par e sem draw | |

**CO contra BTN: split 25%, B40.** 421 combos no range de abertura, 255 com regra.

| Linha | Categoria (combos) | Classes |
|---|---|---|
| Bet | Dois pares (27) | AJo, AJs, ATo, ATs, JTs, JTo |
| Bet | Top pair suited com backdoor flush draw (16) | A9s, A8s, A7s, A6s, A5s, A4s, A3s, A2s |
| Bet | Top pair sem naipe do board (8) | A9s, A8s, A7s, A6s, A5s, A4s, A3s, A2s |
| Bet | Trinca baixa (3) | TT |
| Check-raise | Draw com backdoor flush draw (51) | K9s, K8s, K7s, K6s, K5s, K4s, K3s, K2s, Q9s, Q8s, Q7s, Q6s, Q5s, Q4s, 98s, 97s, 87s |
| Check-raise | Trinca do meio (3) | JJ |
| Check-call | Top pair (45) | A9o, A8o, A7o, A6o, A5o |
| Check-call | Underpair (42) | 99, 88, 77, 66, 55, 44, 33 |
| Check-call | Second pair (21) | J9s, J9o, J8s, J7s, J6s |
| Check-call | Third pair (21) | T9s, T9o, T8s, T7s, T6s |
| Check-call | Duas pontas (draw direto) (15) | Q9o, Q9s, Q8s, 98s |
| Check-call | Top set (3) | AA |
| Sem regra | 166 combos, 28 sem par e sem draw | |

## Board A♥ J♥ T♣ (dois naipes)

**EP contra BTN: split range, B40.** 212 combos no range de abertura, 98 com regra.

| Linha | Categoria (combos) | Classes |
|---|---|---|
| Bet | Dois pares (20) | AJs, AJo, ATs, ATo, JTs |
| Bet | Top pair com backdoor flush draw (7) | A9s, A8s, A7s, A6s, A5s, A4s, A3s |
| Bet | Duas pontas sem naipe do board (4) | Q9s, 98s |
| Bet | Trinca baixa (3) | TT |
| Bet | Second pair com backdoor flush draw (1) | J9s |
| Check-raise | Draw com backdoor flush draw (5) | K9s, K8s, Q9s, 98s, 87s |
| Check-raise | Trinca do meio (3) | JJ |
| Check-raise | Combo draw (2) | Q9s, 98s |
| Check-call | Underpair (30) | 99, 88, 77, 66, 55 |
| Check-call | Top pair sem naipe do board (14) | A9s, A8s, A7s, A6s, A5s, A4s, A3s |
| Check-call | Third pair (4) | T9s, T8s |
| Check-call | Top set (3) | AA |
| Check-call | Second pair sem naipe do board (2) | J9s |
| Sem regra | 114 combos, 9 sem par e sem draw | |

**CO contra BTN: split 25%, B40.** 421 combos no range de abertura, 235 com regra.

| Linha | Categoria (combos) | Classes |
|---|---|---|
| Bet | Dois pares (27) | AJs, AJo, ATs, ATo, JTs, JTo |
| Bet | Top pair off com o naipe do flush draw (15) | A9o, A8o, A7o, A6o, A5o |
| Bet | Top pair suited com backdoor flush draw (8) | A9s, A8s, A7s, A6s, A5s, A4s, A3s, A2s |
| Bet | Trinca baixa (3) | TT |
| Check-raise | Draw com backdoor flush draw (17) | K9s, K8s, K7s, K6s, K5s, K4s, K3s, K2s, Q9s, Q8s, Q7s, Q6s, Q5s, Q4s, 98s, 97s, 87s |
| Check-raise | Broca com o naipe do board (12) | K9o, K8o |
| Check-raise | Duas pontas com o naipe do board (6) | Q9o |
| Check-raise | Combo draw (3) | Q9s, Q8s, 98s |
| Check-raise | Trinca do meio (3) | JJ |
| Check-call | Top pair (46) | A9s, A9o, A8s, A8o, A7s, A7o, A6s, A6o, A5s, A5o, A4s, A3s, A2s |
| Check-call | Underpair (42) | 99, 88, 77, 66, 55, 44, 33 |
| Check-call | Second pair (21) | J9s, J9o, J8s, J7s, J6s |
| Check-call | Third pair (17) | T9s, T9o, T8s, T7s, T6s |
| Check-call | Duas pontas (draw direto) (12) | Q9s, Q9o, Q8s, 98s |
| Check-call | Top set (3) | AA |
| Sem regra | 186 combos, 21 sem par e sem draw | |

# 3. BBX

## Board K♠ Q♦ 5♣ (rainbow)

**EP contra BTN: range bet, B25.** 225 combos no range de abertura, 225 com regra.

O range inteiro aposta B25. Não há check-raise nem check-call.

**CO contra BTN: split 25%, B40.** 439 combos no range de abertura, 278 com regra.

| Linha | Categoria (combos) | Classes |
|---|---|---|
| Bet | Uma overcard com backdoor flush draw (21) | A9s, A8s, A7s, A6s, A4s, A3s, A2s |
| Bet | Top pair suited com backdoor flush draw (20) | AKs, KJs, KTs, K9s, K8s, K7s, K6s, K4s, K3s, K2s |
| Bet | Dois pares (13) | KQo, KQs, K5s, Q5s |
| Bet | Top pair sem naipe do board (10) | AKs, KJs, KTs, K9s, K8s, K7s, K6s, K4s, K3s, K2s |
| Bet | Trinca baixa (3) | 55 |
| Check-raise | Melhor top pair (18) | AKo, KJo |
| Check-raise | Draw com backdoor flush draw (15) | AJs, ATs, JTs, J9s, T9s |
| Check-raise | Trinca do meio (3) | QQ |
| Check-call | Second pair (60) | AQs, AQo, QJs, QJo, QTs, QTo, Q9s, Q9o, Q8s, Q7s, Q6s, Q4s |
| Check-call | Third pair (par de bolso) (36) | JJ, TT, 99, 88, 77, 66 |
| Check-call | Top pair (27) | KTo, K9o, K8o |
| Check-call | Third pair (24) | A5s, A5o, 85s, 75s, 65s, 54s |
| Check-call | Duas pontas (draw direto) (13) | JTo, JTs |
| Check-call | Underpair (12) | 44, 33 |
| Check-call | Top set (3) | KK |
| Sem regra | 161 combos, 103 sem par e sem draw | |

## Board K♥ Q♥ 5♣ (dois naipes)

**EP contra BTN: range bet, B25.** 225 combos no range de abertura, 225 com regra.

O range inteiro aposta B25. Não há check-raise nem check-call.

**CO contra BTN: split 25%, B40.** 439 combos no range de abertura, 294 com regra.

| Linha | Categoria (combos) | Classes |
|---|---|---|
| Bet | Top pair off com o naipe do flush draw (15) | AKo, KJo, KTo, K9o, K8o |
| Bet | Dois pares (13) | KQs, KQo, K5s, Q5s |
| Bet | Flush draw sem ás (12) | J8s, J7s, J6s, T8s, T7s, T6s, 98s, 97s, 96s, 87s, 86s, 76s |
| Bet | Top pair suited com backdoor flush draw (10) | AKs, KJs, KTs, K9s, K8s, K7s, K6s, K4s, K3s, K2s |
| Bet | Uma overcard com backdoor flush draw (7) | A9s, A8s, A7s, A6s, A4s, A3s, A2s |
| Bet | Nut flush draw médio (A9 a A6) (4) | A9s, A8s, A7s, A6s |
| Bet | Trinca baixa (3) | 55 |
| Check-raise | Broca com o naipe do board (24) | AJo, ATo, J9o, T9o |
| Check-raise | Melhor top pair (16) | AKs, AKo, KJs, KJo |
| Check-raise | Duas pontas com o naipe do board (6) | JTo |
| Check-raise | Draw com backdoor flush draw (5) | AJs, ATs, JTs, J9s, T9s |
| Check-raise | Nut flush draw baixo (A5 a A2) (3) | A4s, A3s, A2s |
| Check-raise | Trinca do meio (3) | QQ |
| Check-raise | Combo draw (1) | JTs |
| Check-call | Second pair (60) | AQs, AQo, QJs, QJo, QTs, QTo, Q9s, Q9o, Q8s, Q7s, Q6s, Q4s |
| Check-call | Third pair (par de bolso) (36) | JJ, TT, 99, 88, 77, 66 |
| Check-call | Top pair (34) | KTs, KTo, K9s, K9o, K8s, K8o, K7s, K6s, K4s, K3s, K2s |
| Check-call | Third pair (19) | A5s, A5o, 85s, 75s, 65s, 54s |
| Check-call | Underpair (12) | 44, 33 |
| Check-call | Duas pontas (draw direto) (8) | JTs, JTo |
| Check-call | Top set (3) | KK |
| Sem regra | 145 combos, 98 sem par e sem draw | |

# 4. K-Q high

## Board K♠ 8♦ 4♣ (rainbow)

**EP contra BTN: split range, B40.** 237 combos no range de abertura, 113 com regra.

| Linha | Categoria (combos) | Classes |
|---|---|---|
| Bet | Uma overcard com backdoor flush draw (24) | AQs, AJs, ATs, A9s, A7s, A6s, A5s, A3s |
| Bet | Melhor par de bolso sobre o segundo par (12) | QQ, JJ |
| Bet | Top pair com backdoor flush draw (10) | AKs, KQs, KJs, KTs, K9s |
| Bet | Second pair com backdoor flush draw (8) | A8s, T8s, 98s, 87s |
| Bet | Dois pares (2) | K8s |
| Check-raise | Draw com backdoor flush draw (6) | 76s, 65s |
| Check-raise | Trinca do meio (3) | 88 |
| Check-raise | Melhor top pair (2) | AKs, KQs |
| Check-call | Third pair (par de bolso) (18) | 77, 66, 55 |
| Check-call | Second pair (par de bolso) (12) | TT, 99 |
| Check-call | Third pair (6) | A4s, 54s |
| Check-call | Second pair sem naipe do board (4) | A8s, T8s, 98s, 87s |
| Check-call | Top set (3) | KK |
| Check-call | Top pair sem naipe do board (3) | KJs, KTs, K9s |
| Sem regra | 124 combos, 80 sem par e sem draw | |

**CO contra BTN: split 25%, B40.** 455 combos no range de abertura, 221 com regra.

| Linha | Categoria (combos) | Classes |
|---|---|---|
| Bet | Uma overcard com backdoor flush draw (27) | AQs, AJs, ATs, A9s, A7s, A6s, A5s, A3s, A2s |
| Bet | Top pair suited com backdoor flush draw (20) | AKs, KQs, KJs, KTs, K9s, K7s, K6s, K5s, K3s, K2s |
| Bet | Dois pares (11) | K8o, K8s, K4s |
| Bet | Top pair sem naipe do board (10) | AKs, KQs, KJs, KTs, K9s, K7s, K6s, K5s, K3s, K2s |
| Bet | Trinca baixa (3) | 44 |
| Check-raise | Melhor top pair (18) | AKo, KQo |
| Check-raise | Draw com backdoor flush draw (9) | 76s, 75s, 65s |
| Check-raise | Trinca do meio (3) | 88 |
| Check-call | Second pair (33) | A8s, A8o, Q8s, J8s, T8s, 98s, 87s, 86s, 85s |
| Check-call | Top pair (27) | KJo, KTo, K9o |
| Check-call | Second pair (par de bolso) (24) | QQ, JJ, TT, 99 |
| Check-call | Third pair (par de bolso) (18) | 77, 66, 55 |
| Check-call | Third pair (9) | A4s, Q4s, 54s |
| Check-call | Underpair (6) | 33 |
| Check-call | Top set (3) | KK |
| Sem regra | 234 combos, 225 sem par e sem draw | |

## Board K♥ 8♥ 4♣ (dois naipes)

**EP contra BTN: split range, B40.** 238 combos no range de abertura, 126 com regra.

| Linha | Categoria (combos) | Classes |
|---|---|---|
| Bet | Top pair com o naipe do flush draw (12) | AKo, KQo, KJo, KTo |
| Bet | Melhor par de bolso sobre o segundo par (12) | QQ, JJ |
| Bet | Uma overcard com backdoor flush draw (8) | AQs, AJs, ATs, A9s, A7s, A6s, A5s, A3s |
| Bet | Flush draw sem ás (6) | QJs, QTs, Q9s, JTs, J9s, T9s |
| Bet | Top pair com backdoor flush draw (5) | AKs, KQs, KJs, KTs, K9s |
| Bet | Second pair com backdoor flush draw (4) | A8s, T8s, 98s, 87s |
| Bet | Nut flush draw médio (A9 a A6) (3) | A9s, A7s, A6s |
| Bet | Dois pares (3) | K8s |
| Check-raise | Melhor top pair (8) | AKs, AKo, KQs, KQo |
| Check-raise | Trinca do meio (3) | 88 |
| Check-raise | Nut flush draw baixo (A5 a A2) (2) | A5s, A3s |
| Check-raise | Draw com backdoor flush draw (2) | 76s, 65s |
| Check-call | Third pair (par de bolso) (18) | 77, 66, 55 |
| Check-call | Second pair (par de bolso) (12) | TT, 99 |
| Check-call | Top pair sem naipe do board (10) | KJs, KJo, KTs, KTo, K9s |
| Check-call | Second pair sem naipe do board (8) | A8s, T8s, 98s, 87s |
| Check-call | Third pair (4) | A4s, 54s |
| Check-call | Nut flush draw forte (AK a AT) (3) | AQs, AJs, ATs |
| Check-call | Top set (3) | KK |
| Sem regra | 112 combos, 82 sem par e sem draw | |

**CO contra BTN: split 25%, B40.** 455 combos no range de abertura, 218 com regra.

| Linha | Categoria (combos) | Classes |
|---|---|---|
| Bet | Top pair off com o naipe do flush draw (15) | AKo, KQo, KJo, KTo, K9o |
| Bet | Flush draw sem ás (15) | QJs, QTs, Q9s, Q7s, Q6s, Q5s, JTs, J9s, J7s, J6s, T9s, T7s, T6s, 97s, 96s |
| Bet | Dois pares (11) | K8s, K8o, K4s |
| Bet | Top pair suited com backdoor flush draw (10) | AKs, KQs, KJs, KTs, K9s, K7s, K6s, K5s, K3s, K2s |
| Bet | Uma overcard com backdoor flush draw (9) | AQs, AJs, ATs, A9s, A7s, A6s, A5s, A3s, A2s |
| Bet | Nut flush draw médio (A9 a A6) (3) | A9s, A7s, A6s |
| Bet | Trinca baixa (3) | 44 |
| Check-raise | Melhor top pair (16) | AKs, AKo, KQs, KQo |
| Check-raise | Nut flush draw baixo (A5 a A2) (3) | A5s, A3s, A2s |
| Check-raise | Trinca do meio (3) | 88 |
| Check-raise | Draw com backdoor flush draw (3) | 76s, 75s, 65s |
| Check-call | Top pair (34) | KJs, KJo, KTs, KTo, K9s, K9o, K7s, K6s, K5s, K3s, K2s |
| Check-call | Second pair (33) | A8s, A8o, Q8s, J8s, T8s, 98s, 87s, 86s, 85s |
| Check-call | Second pair (par de bolso) (24) | QQ, JJ, TT, 99 |
| Check-call | Third pair (par de bolso) (18) | 77, 66, 55 |
| Check-call | Third pair (6) | A4s, Q4s, 54s |
| Check-call | Underpair (6) | 33 |
| Check-call | Nut flush draw forte (AK a AT) (3) | AQs, AJs, ATs |
| Check-call | Top set (3) | KK |
| Sem regra | 237 combos, 219 sem par e sem draw | |

# 5. J-T high

## Board J♠ 7♦ 3♣ (rainbow)

**EP contra BTN: split range, B40.** 244 combos no range de abertura, 123 com regra.

| Linha | Categoria (combos) | Classes |
|---|---|---|
| Bet | Uma overcard com backdoor flush draw (33) | ATs, A9s, A8s, A6s, A5s, A4s, KTs, K9s, K8s, QTs, Q9s |
| Bet | Melhor par de bolso sobre o segundo par (12) | TT, 99 |
| Bet | Top pair com backdoor flush draw (10) | AJs, KJs, QJs, JTs, J9s |
| Bet | Second pair com backdoor flush draw (6) | A7s, 87s, 76s |
| Bet | Primeiro overpair (6) | QQ |
| Check-raise | Draw com backdoor flush draw (15) | T9s, T8s, 98s, 65s, 54s |
| Check-raise | Melhor overpair (6) | AA |
| Check-raise | Trinca do meio (3) | 77 |
| Check-raise | Melhor top pair (2) | AJs, KJs |
| Check-call | Third pair (par de bolso) (12) | 66, 55 |
| Check-call | Second pair (par de bolso) (6) | 88 |
| Check-call | Third pair (3) | A3s |
| Check-call | Second pair sem naipe do board (3) | A7s, 87s, 76s |
| Check-call | Top pair sem naipe do board (3) | QJs, JTs, J9s |
| Check-call | Top set (3) | JJ |
| Sem regra | 121 combos, 83 sem par e sem draw | |

**CO contra BTN: split 25%, B70.** 466 combos no range de abertura, 239 com regra.

| Linha | Categoria (combos) | Classes |
|---|---|---|
| Bet | Uma overcard com backdoor flush draw (60) | ATs, A9s, A8s, A6s, A5s, A4s, A2s, KTs, K9s, K8s, K6s, K5s, K4s, K2s, QTs, Q9s, Q8s, Q6s, Q5s, Q4s |
| Bet | Top pair suited com backdoor flush draw (14) | AJs, KJs, QJs, JTs, J9s, J8s, J6s |
| Bet | Top pair sem naipe do board (7) | AJs, KJs, QJs, JTs, J9s, J8s, J6s |
| Bet | Primeiro overpair (6) | QQ |
| Bet | Trinca baixa (3) | 33 |
| Bet | Dois pares (2) | J7s |
| Check-raise | Melhor top pair (18) | AJo, KJo |
| Check-raise | Draw com backdoor flush draw (15) | T9s, T8s, 98s, 65s, 54s |
| Check-raise | Melhor overpair (6) | AA |
| Check-raise | Trinca do meio (3) | 77 |
| Check-call | Second pair (33) | A7s, A7o, K7s, Q7s, T7s, 97s, 87s, 76s, 75s |
| Check-call | Top pair (27) | QJo, JTo, J9o |
| Check-call | Second pair (par de bolso) (18) | TT, 99, 88 |
| Check-call | Third pair (par de bolso) (18) | 66, 55, 44 |
| Check-call | Third pair (6) | A3s, K3s |
| Check-call | Top set (3) | JJ |
| Sem regra | 227 combos, 204 sem par e sem draw | |

## Board J♥ 7♥ 3♣ (dois naipes)

**EP contra BTN: split range, B40.** 244 combos no range de abertura, 119 com regra.

| Linha | Categoria (combos) | Classes |
|---|---|---|
| Bet | Melhor par de bolso sobre o segundo par (12) | TT, 99 |
| Bet | Uma overcard com backdoor flush draw (11) | ATs, A9s, A8s, A6s, A5s, A4s, KTs, K9s, K8s, QTs, Q9s |
| Bet | Top pair com o naipe do flush draw (9) | AJo, KJo, QJo |
| Bet | Flush draw sem ás (6) | KQs, KTs, K9s, K8s, QTs, Q9s |
| Bet | Primeiro overpair (6) | QQ |
| Bet | Top pair com backdoor flush draw (5) | AJs, KJs, QJs, JTs, J9s |
| Bet | Nut flush draw médio (A9 a A6) (3) | A9s, A8s, A6s |
| Bet | Second pair com backdoor flush draw (3) | A7s, 87s, 76s |
| Check-raise | Melhor top pair (8) | AJs, AJo, KJs, KJo |
| Check-raise | Melhor overpair (6) | AA |
| Check-raise | Draw com backdoor flush draw (5) | T9s, T8s, 98s, 65s, 54s |
| Check-raise | Trinca do meio (3) | 77 |
| Check-raise | Nut flush draw baixo (A5 a A2) (2) | A5s, A4s |
| Check-call | Third pair (par de bolso) (12) | 66, 55 |
| Check-call | Top pair sem naipe do board (8) | QJs, QJo, JTs, J9s |
| Check-call | Second pair sem naipe do board (6) | A7s, 87s, 76s |
| Check-call | Second pair (par de bolso) (6) | 88 |
| Check-call | Nut flush draw forte (AK a AT) (3) | AKs, AQs, ATs |
| Check-call | Top set (3) | JJ |
| Check-call | Third pair (2) | A3s |
| Sem regra | 125 combos, 91 sem par e sem draw | |

**CO contra BTN: split 25%, B70.** 467 combos no range de abertura, 221 com regra.

| Linha | Categoria (combos) | Classes |
|---|---|---|
| Bet | Uma overcard com backdoor flush draw (20) | ATs, A9s, A8s, A6s, A5s, A4s, A2s, KTs, K9s, K8s, K6s, K5s, K4s, K2s, QTs, Q9s, Q8s, Q6s, Q5s, Q4s |
| Bet | Flush draw sem ás (18) | KQs, KTs, K9s, K8s, K6s, K5s, K4s, K2s, QTs, Q9s, Q8s, Q6s, Q5s, Q4s, T6s, 96s, 86s, 85s |
| Bet | Top pair off com o naipe do flush draw (15) | AJo, KJo, QJo, JTo, J9o |
| Bet | Top pair suited com backdoor flush draw (7) | AJs, KJs, QJs, JTs, J9s, J8s, J6s |
| Bet | Primeiro overpair (6) | QQ |
| Bet | Nut flush draw médio (A9 a A6) (3) | A9s, A8s, A6s |
| Bet | Dois pares (3) | J7s |
| Bet | Trinca baixa (3) | 33 |
| Check-raise | Melhor top pair (16) | AJs, AJo, KJs, KJo |
| Check-raise | Melhor overpair (6) | AA |
| Check-raise | Broca com o naipe do board (6) | T9o |
| Check-raise | Draw com backdoor flush draw (5) | T9s, T8s, 98s, 65s, 54s |
| Check-raise | Nut flush draw baixo (A5 a A2) (3) | A5s, A4s, A2s |
| Check-raise | Trinca do meio (3) | 77 |
| Check-call | Second pair (33) | A7s, A7o, K7s, Q7s, T7s, 97s, 87s, 76s, 75s |
| Check-call | Top pair (28) | QJs, QJo, JTs, JTo, J9s, J9o, J8s, J6s |
| Check-call | Second pair (par de bolso) (18) | TT, 99, 88 |
| Check-call | Third pair (par de bolso) (18) | 66, 55, 44 |
| Check-call | Third pair (4) | A3s, K3s |
| Check-call | Nut flush draw forte (AK a AT) (3) | AKs, AQs, ATs |
| Check-call | Top set (3) | JJ |
| Sem regra | 246 combos, 217 sem par e sem draw | |

# 6. High com sequência

## Board Q♠ T♦ 9♣ (rainbow)

**EP contra BTN: split range, B40.** 227 combos no range de abertura, 101 com regra.

| Linha | Categoria (combos) | Classes |
|---|---|---|
| Bet | Uma overcard com backdoor flush draw (15) | A7s, A6s, A5s, A4s, A3s |
| Bet | Overpair em board carregado (12) | AA, KK |
| Bet | Dois pares (6) | QTs, Q9s, T9s |
| Bet | Trinca baixa (3) | 99 |
| Bet | Second pair com backdoor flush draw (2) | ATs |
| Bet | Duas pontas sem naipe do board (2) | AJs, 87s |
| Bet | Top pair com backdoor flush draw (2) | AQs |
| Check-raise | Draw com backdoor flush draw (18) | AKs, AJs, A8s, K8s, 87s, 76s |
| Check-raise | Trinca do meio (3) | TT |
| Check-raise | Melhor top pair (1) | AQs |
| Check-call | Underpair (18) | 77, 66, 55 |
| Check-call | Duas pontas (draw direto) (12) | AJo |
| Check-call | Third pair (3) | A9s |
| Check-call | Top set (3) | QQ |
| Check-call | Second pair sem naipe do board (1) | ATs |
| Sem regra | 126 combos, 13 sem par e sem draw | |

**CO contra BTN: split 25%, B40.** 435 combos no range de abertura, 221 com regra.

| Linha | Categoria (combos) | Classes |
|---|---|---|
| Bet | Dois pares (27) | QTo, QTs, Q9o, Q9s, T9s, T9o |
| Bet | Uma overcard com backdoor flush draw (18) | A7s, A6s, A5s, A4s, A3s, A2s |
| Bet | Overpair em board carregado (12) | AA, KK |
| Bet | Top pair suited com backdoor flush draw (10) | AQs, Q7s, Q6s, Q5s, Q4s |
| Bet | Top pair sem naipe do board (5) | AQs, Q7s, Q6s, Q5s, Q4s |
| Bet | Trinca baixa (3) | 99 |
| Check-raise | Draw com backdoor flush draw (48) | AKs, AJs, A8s, K8s, K7s, K6s, K5s, K4s, K3s, K2s, J7s, J6s, 87s, 86s, 85s, 76s |
| Check-raise | Melhor top pair (9) | AQo |
| Check-raise | Trinca do meio (3) | TT |
| Check-call | Underpair (30) | 77, 66, 55, 44, 33 |
| Check-call | Second pair (18) | ATs, ATo, T7s, T6s |
| Check-call | Third pair (18) | A9s, A9o, 97s, 96s |
| Check-call | Duas pontas (draw direto) (17) | AJo, AJs, J7s, J6s, 87s, 86s |
| Check-call | Top set (3) | QQ |
| Sem regra | 214 combos, 54 sem par e sem draw | |

## Board Q♥ T♥ 9♣ (dois naipes)

**EP contra BTN: split range, B40.** 228 combos no range de abertura, 103 com regra.

| Linha | Categoria (combos) | Classes |
|---|---|---|
| Bet | Overpair em board carregado (12) | AA, KK |
| Bet | Dois pares (7) | QTs, Q9s, T9s |
| Bet | Broca com o naipe do board (6) | AKo |
| Bet | Duas pontas sem naipe do board (6) | AJs, AJo, 87s |
| Bet | Uma overcard com backdoor flush draw (5) | A7s, A6s, A5s, A4s, A3s |
| Bet | Top pair com o naipe do flush draw (3) | AQo |
| Bet | Trinca baixa (3) | 99 |
| Bet | Nut flush draw médio (A9 a A6) (2) | A7s, A6s |
| Bet | Flush draw sem ás (2) | 65s, 54s |
| Bet | Top pair com backdoor flush draw (1) | AQs |
| Bet | Second pair com backdoor flush draw (1) | ATs |
| Check-raise | Draw com backdoor flush draw (6) | AKs, AJs, A8s, K8s, 87s, 76s |
| Check-raise | Melhor top pair (4) | AQs, AQo |
| Check-raise | Nut flush draw baixo (A5 a A2) (3) | A5s, A4s, A3s |
| Check-raise | Trinca do meio (3) | TT |
| Check-raise | Combo draw (2) | AJs, 87s |
| Check-call | Underpair (18) | 77, 66, 55 |
| Check-call | Duas pontas (draw direto) (10) | AJo |
| Check-call | Second pair sem naipe do board (4) | ATs, ATo |
| Check-call | Top set (3) | QQ |
| Check-call | Third pair (2) | A9s |
| Sem regra | 125 combos, 16 sem par e sem draw | |

**CO contra BTN: split 25%, B40.** 435 combos no range de abertura, 211 com regra.

| Linha | Categoria (combos) | Classes |
|---|---|---|
| Bet | Dois pares (27) | QTs, QTo, Q9s, Q9o, T9s, T9o |
| Bet | Overpair em board carregado (12) | AA, KK |
| Bet | Uma overcard com backdoor flush draw (6) | A7s, A6s, A5s, A4s, A3s, A2s |
| Bet | Top pair suited com backdoor flush draw (5) | AQs, Q7s, Q6s, Q5s, Q4s |
| Bet | Top pair off com o naipe do flush draw (3) | AQo |
| Bet | Trinca baixa (3) | 99 |
| Bet | Flush draw sem ás (3) | 75s, 65s, 54s |
| Bet | Nut flush draw médio (A9 a A6) (2) | A7s, A6s |
| Check-raise | Broca com o naipe do board (18) | AKo, A8o, K8o |
| Check-raise | Draw com backdoor flush draw (16) | AKs, AJs, A8s, K8s, K7s, K6s, K5s, K4s, K3s, K2s, J7s, J6s, 87s, 86s, 85s, 76s |
| Check-raise | Melhor top pair (8) | AQs, AQo |
| Check-raise | Duas pontas com o naipe do board (6) | AJo |
| Check-raise | Combo draw (5) | AJs, J7s, J6s, 87s, 86s |
| Check-raise | Nut flush draw baixo (A5 a A2) (4) | A5s, A4s, A3s, A2s |
| Check-raise | Trinca do meio (3) | TT |
| Check-call | Underpair (30) | 77, 66, 55, 44, 33 |
| Check-call | Second pair (18) | ATs, ATo, T7s, T6s |
| Check-call | Duas pontas (draw direto) (16) | AJs, AJo, J7s, J6s, 87s, 86s |
| Check-call | Third pair (15) | A9s, A9o, 97s, 96s |
| Check-call | Top pair (8) | Q7s, Q6s, Q5s, Q4s |
| Check-call | Top set (3) | QQ |
| Sem regra | 224 combos, 57 sem par e sem draw | |

# 7. Low com sequência

## Board 7♠ 6♦ 4♣ (rainbow)

**EP contra BTN: split range, B70.** 254 combos no range de abertura, 83 com regra.

| Linha | Categoria (combos) | Classes |
|---|---|---|
| Bet | Overpair em board carregado (42) | AA, KK, QQ, JJ, TT, 99, 88 |
| Bet | Duas pontas sem naipe do board (3) | A5s, T8s, 98s |
| Bet | Second pair com backdoor flush draw (2) | A6s |
| Bet | Top pair com backdoor flush draw (2) | A7s |
| Bet | Dois pares (2) | 76s |
| Check-raise | Draw com backdoor flush draw (21) | A8s, A5s, A3s, K8s, T9s, T8s, 98s |
| Check-raise | Trinca do meio (3) | 66 |
| Check-raise | Melhor top pair (1) | A7s |
| Check-call | Third pair (3) | A4s |
| Check-call | Top set (3) | 77 |
| Check-call | Second pair sem naipe do board (1) | A6s |
| Sem regra | 171 combos, 152 sem par e sem draw | |

**CO contra BTN: split range, B40.** 475 combos no range de abertura, 157 com regra.

| Linha | Categoria (combos) | Classes |
|---|---|---|
| Bet | Overpair em board carregado (42) | AA, KK, QQ, JJ, TT, 99, 88 |
| Bet | Second pair com backdoor flush draw (12) | A6s, K6s, Q6s, J6s, T6s, 96s |
| Bet | Top pair com backdoor flush draw (12) | A7s, K7s, Q7s, J7s, T7s, 97s |
| Bet | Uma overcard com backdoor flush draw (6) | A2s, K2s |
| Bet | Duas pontas sem naipe do board (5) | A5s, K5s, Q5s, T8s, 98s |
| Bet | Trinca baixa (3) | 44 |
| Bet | Dois pares (2) | 76s |
| Check-raise | Draw com backdoor flush draw (36) | A8s, A5s, A3s, K8s, K5s, K3s, Q8s, Q5s, J8s, T9s, T8s, 98s |
| Check-raise | Trinca do meio (3) | 66 |
| Check-raise | Melhor top pair (2) | A7s, K7s |
| Check-call | Duas pontas (draw direto) (12) | A5o |
| Check-call | Third pair (9) | A4s, K4s, Q4s |
| Check-call | Second pair sem naipe do board (6) | A6s, K6s, Q6s, J6s, T6s, 96s |
| Check-call | Top pair sem naipe do board (4) | Q7s, J7s, T7s, 97s |
| Check-call | Top set (3) | 77 |
| Sem regra | 318 combos, 226 sem par e sem draw | |

## Board 7♥ 6♥ 4♣ (dois naipes)

**EP contra BTN: split range, B70.** 255 combos no range de abertura, 89 com regra.

| Linha | Categoria (combos) | Classes |
|---|---|---|
| Bet | Overpair em board carregado (42) | AA, KK, QQ, JJ, TT, 99, 88 |
| Bet | Flush draw sem ás (9) | KQs, KJs, KTs, K9s, QJs, QTs, Q9s, JTs, J9s |
| Bet | Duas pontas sem naipe do board (6) | A5s, T8s, 98s |
| Bet | Dois pares (3) | 76s |
| Bet | Nut flush draw médio (A9 a A6) (1) | A9s |
| Bet | Top pair com backdoor flush draw (1) | A7s |
| Bet | Second pair com backdoor flush draw (1) | A6s |
| Check-raise | Draw com backdoor flush draw (7) | A8s, A5s, A3s, K8s, T9s, T8s, 98s |
| Check-raise | Combo draw (3) | A5s, T8s, 98s |
| Check-raise | Trinca do meio (3) | 66 |
| Check-raise | Melhor top pair (2) | A7s |
| Check-call | Nut flush draw forte (AK a AT) (4) | AKs, AQs, AJs, ATs |
| Check-call | Top set (3) | 77 |
| Check-call | Second pair sem naipe do board (2) | A6s |
| Check-call | Third pair (2) | A4s |
| Sem regra | 166 combos, 138 sem par e sem draw | |

**CO contra BTN: split range, B40.** 476 combos no range de abertura, 178 com regra.

| Linha | Categoria (combos) | Classes |
|---|---|---|
| Bet | Overpair em board carregado (42) | AA, KK, QQ, JJ, TT, 99, 88 |
| Bet | Broca com o naipe do board (18) | A8o, K8o, T9o |
| Bet | Duas pontas sem naipe do board (12) | A5s, A5o, K5s, Q5s, T8s, 98s |
| Bet | Flush draw sem ás (10) | KQs, KJs, KTs, K9s, K2s, QJs, QTs, Q9s, JTs, J9s |
| Bet | Top pair com backdoor flush draw (6) | A7s, K7s, Q7s, J7s, T7s, 97s |
| Bet | Second pair com backdoor flush draw (6) | A6s, K6s, Q6s, J6s, T6s, 96s |
| Bet | Top pair com o naipe do flush draw (3) | A7o |
| Bet | Dois pares (3) | 76s |
| Bet | Trinca baixa (3) | 44 |
| Bet | Uma overcard com backdoor flush draw (2) | A2s, K2s |
| Bet | Nut flush draw médio (A9 a A6) (1) | A9s |
| Check-raise | Draw com backdoor flush draw (12) | A8s, A5s, A3s, K8s, K5s, K3s, Q8s, Q5s, J8s, T9s, T8s, 98s |
| Check-raise | Melhor top pair (6) | A7s, A7o, K7s |
| Check-raise | Combo draw (5) | A5s, K5s, Q5s, T8s, 98s |
| Check-raise | Trinca do meio (3) | 66 |
| Check-raise | Nut flush draw baixo (A5 a A2) (1) | A2s |
| Check-call | Second pair sem naipe do board (14) | A6s, A6o, K6s, Q6s, J6s, T6s, 96s |
| Check-call | Duas pontas (draw direto) (10) | A5o |
| Check-call | Top pair sem naipe do board (8) | Q7s, J7s, T7s, 97s |
| Check-call | Third pair (6) | A4s, K4s, Q4s |
| Check-call | Nut flush draw forte (AK a AT) (4) | AKs, AQs, AJs, ATs |
| Check-call | Top set (3) | 77 |
| Sem regra | 298 combos, 214 sem par e sem draw | |

# 8. Conectado consecutivo

## Board 9♠ 8♦ 7♣ (rainbow)

**EP contra BTN: check range.** 245 combos no range de abertura, 42 com regra.

| Linha | Categoria (combos) | Classes |
|---|---|---|
| Check-call | Top pair no board consecutivo (15) | A9s, K9s, Q9s, J9s, T9s |
| Check-call | Underpair no board consecutivo (12) | 66, 55 |
| Check-call | Second pair no board consecutivo (9) | A8s, K8s, T8s |
| Check-call | Third pair no board consecutivo (6) | A7s, 76s |
| Sem regra | 203 combos, 56 sem par e sem draw | |

**CO contra BTN: check range.** 453 combos no range de abertura, 156 com regra.

| Linha | Categoria (combos) | Classes |
|---|---|---|
| Check-call | Top pair no board consecutivo (63) | A9o, A9s, K9o, K9s, Q9o, Q9s, J9o, J9s, T9o, T9s, 96s |
| Check-call | Second pair no board consecutivo (39) | A8s, A8o, K8s, K8o, Q8s, J8s, T8s, 86s, 85s |
| Check-call | Third pair no board consecutivo (30) | A7s, A7o, K7s, Q7s, J7s, T7s, 76s, 75s |
| Check-call | Underpair no board consecutivo (24) | 66, 55, 44, 33 |
| Sem regra | 297 combos, 76 sem par e sem draw | |

## Board 9♥ 8♥ 7♣ (dois naipes)

**EP contra BTN: check range.** 246 combos no range de abertura, 42 com regra.

| Linha | Categoria (combos) | Classes |
|---|---|---|
| Check-call | Top pair no board consecutivo (15) | A9s, K9s, Q9s, J9s, T9s |
| Check-call | Underpair no board consecutivo (12) | 66, 55 |
| Check-call | Second pair no board consecutivo (9) | A8s, K8s, T8s |
| Check-call | Third pair no board consecutivo (6) | A7s, 76s |
| Sem regra | 204 combos, 51 sem par e sem draw | |

**CO contra BTN: check range.** 454 combos no range de abertura, 156 com regra.

| Linha | Categoria (combos) | Classes |
|---|---|---|
| Check-call | Top pair no board consecutivo (63) | A9s, A9o, K9s, K9o, Q9s, Q9o, J9s, J9o, T9s, T9o, 96s |
| Check-call | Second pair no board consecutivo (39) | A8s, A8o, K8s, K8o, Q8s, J8s, T8s, 86s, 85s |
| Check-call | Third pair no board consecutivo (30) | A7s, A7o, K7s, Q7s, J7s, T7s, 76s, 75s |
| Check-call | Underpair no board consecutivo (24) | 66, 55, 44, 33 |
| Sem regra | 298 combos, 66 sem par e sem draw | |

# 9. Low sem sequência

## Board 9♠ 4♦ 2♣ (rainbow)

**EP contra BTN: split range, B70.** 257 combos no range de abertura, 87 com regra.

| Linha | Categoria (combos) | Classes |
|---|---|---|
| Bet | Uma overcard com backdoor flush draw (15) | A8s, A7s, A6s, K8s, T8s |
| Bet | Top pair com backdoor flush draw (12) | A9s, K9s, Q9s, J9s, T9s, 98s |
| Bet | Melhor par de bolso sobre o segundo par (12) | 88, 77 |
| Bet | Primeiro overpair (6) | TT |
| Bet | Second pair com backdoor flush draw (4) | A4s, 54s |
| Check-raise | Draw com backdoor flush draw (9) | A5s, A3s, 65s |
| Check-raise | Melhor overpair (6) | AA |
| Check-raise | Melhor top pair (2) | A9s, K9s |
| Check-call | Second pair (par de bolso) (12) | 66, 55 |
| Check-call | Top pair sem naipe do board (4) | Q9s, J9s, T9s, 98s |
| Check-call | Top set (3) | 99 |
| Check-call | Second pair sem naipe do board (2) | A4s, 54s |
| Sem regra | 170 combos, 149 sem par e sem draw | |

**CO contra BTN: split range, B70.** 477 combos no range de abertura, 153 com regra.

| Linha | Categoria (combos) | Classes |
|---|---|---|
| Bet | Uma overcard com backdoor flush draw (54) | A8s, A7s, A6s, K8s, K7s, K6s, K5s, K3s, Q8s, Q7s, Q6s, Q5s, J8s, J7s, J6s, T8s, T7s, T6s |
| Bet | Top pair com backdoor flush draw (16) | A9s, K9s, Q9s, J9s, T9s, 98s, 97s, 96s |
| Bet | Melhor par de bolso sobre o segundo par (12) | 88, 77 |
| Bet | Second pair com backdoor flush draw (8) | A4s, K4s, Q4s, 54s |
| Bet | Primeiro overpair (6) | TT |
| Check-raise | Draw com backdoor flush draw (9) | A5s, A3s, 65s |
| Check-raise | Melhor overpair (6) | AA |
| Check-raise | Trinca do meio (3) | 44 |
| Check-raise | Melhor top pair (2) | A9s, K9s |
| Check-call | Second pair (par de bolso) (12) | 66, 55 |
| Check-call | Third pair (6) | A2s, K2s |
| Check-call | Top pair sem naipe do board (6) | Q9s, J9s, T9s, 98s, 97s, 96s |
| Check-call | Third pair (par de bolso) (6) | 33 |
| Check-call | Second pair sem naipe do board (4) | A4s, K4s, Q4s, 54s |
| Check-call | Top set (3) | 99 |
| Sem regra | 324 combos, 246 sem par e sem draw | |

## Board 9♥ 4♥ 2♣ (dois naipes)

**EP contra BTN: split range, B70.** 257 combos no range de abertura, 88 com regra.

| Linha | Categoria (combos) | Classes |
|---|---|---|
| Bet | Melhor par de bolso sobre o segundo par (12) | 88, 77 |
| Bet | Flush draw sem ás (10) | KQs, KJs, KTs, K8s, QJs, QTs, JTs, T8s, 87s, 76s |
| Bet | Top pair com backdoor flush draw (6) | A9s, K9s, Q9s, J9s, T9s, 98s |
| Bet | Primeiro overpair (6) | TT |
| Bet | Uma overcard com backdoor flush draw (5) | A8s, A7s, A6s, K8s, T8s |
| Bet | Nut flush draw médio (A9 a A6) (3) | A8s, A7s, A6s |
| Bet | Second pair com backdoor flush draw (2) | A4s, 54s |
| Check-raise | Melhor overpair (6) | AA |
| Check-raise | Melhor top pair (4) | A9s, K9s |
| Check-raise | Draw com backdoor flush draw (3) | A5s, A3s, 65s |
| Check-call | Second pair (par de bolso) (12) | 66, 55 |
| Check-call | Top pair sem naipe do board (8) | Q9s, J9s, T9s, 98s |
| Check-call | Second pair sem naipe do board (4) | A4s, 54s |
| Check-call | Nut flush draw forte (AK a AT) (4) | AKs, AQs, AJs, ATs |
| Check-call | Top set (3) | 99 |
| Sem regra | 169 combos, 142 sem par e sem draw | |

**CO contra BTN: split range, B70.** 477 combos no range de abertura, 173 com regra.

| Linha | Categoria (combos) | Classes |
|---|---|---|
| Bet | Flush draw sem ás (26) | KQs, KJs, KTs, K8s, K7s, K6s, K5s, K3s, QJs, QTs, Q8s, Q7s, Q6s, Q5s, JTs, J8s, J7s, J6s, T8s, T7s, T6s, 87s, 86s, 85s, 76s, 75s |
| Bet | Uma overcard com backdoor flush draw (18) | A8s, A7s, A6s, K8s, K7s, K6s, K5s, K3s, Q8s, Q7s, Q6s, Q5s, J8s, J7s, J6s, T8s, T7s, T6s |
| Bet | Top pair com o naipe do flush draw (15) | A9o, K9o, Q9o, J9o, T9o |
| Bet | Melhor par de bolso sobre o segundo par (12) | 88, 77 |
| Bet | Top pair com backdoor flush draw (8) | A9s, K9s, Q9s, J9s, T9s, 98s, 97s, 96s |
| Bet | Broca com o naipe do board (6) | A5o |
| Bet | Primeiro overpair (6) | TT |
| Bet | Second pair com backdoor flush draw (4) | A4s, K4s, Q4s, 54s |
| Bet | Nut flush draw médio (A9 a A6) (3) | A8s, A7s, A6s |
| Check-raise | Melhor top pair (8) | A9s, A9o, K9s, K9o |
| Check-raise | Melhor overpair (6) | AA |
| Check-raise | Draw com backdoor flush draw (3) | A5s, A3s, 65s |
| Check-raise | Trinca do meio (3) | 44 |
| Check-call | Top pair sem naipe do board (18) | Q9s, Q9o, J9s, J9o, T9s, T9o, 98s, 97s, 96s |
| Check-call | Second pair (par de bolso) (12) | 66, 55 |
| Check-call | Second pair sem naipe do board (8) | A4s, K4s, Q4s, 54s |
| Check-call | Third pair (par de bolso) (6) | 33 |
| Check-call | Third pair (4) | A2s, K2s |
| Check-call | Nut flush draw forte (AK a AT) (4) | AKs, AQs, AJs, ATs |
| Check-call | Top set (3) | 99 |
| Sem regra | 304 combos, 249 sem par e sem draw | |

# 10. Monotone

## Board K♠ 8♠ 3♠ (monotone)

**EP contra BTN:** aleatório no guideline, fora da Prática.

**CO contra BTN: check range.** 458 combos no range de abertura, 159 com regra.

| Linha | Categoria (combos) | Classes |
|---|---|---|
| Check-call | Top pair no board monotone (75) | AKo, AKs, KQo, KQs, KJo, KJs, KTo, KTs, K9o, K9s, K7s, K6s, K5s, K4s, K2s |
| Check-call | Second pair no board monotone (57) | A8o, A8s, QQ, Q8s, JJ, J8s, TT, T8s, 99, 98s, 87s, 86s, 85s |
| Check-call | Third pair no board monotone (27) | A3s, 77, 66, 55, 44 |
| Sem regra | 299 combos, 243 sem par e sem draw | |

---

# Quanto falta em cada textura

| Textura | Board | Posição | Combos abertos | Sem regra | Sem par e sem draw |
|---|---|---|---|---|---|
| A high seco | rainbow | EP | 236 | 141 | 104 |
| A high seco | rainbow | CO | 454 | 317 | 244 |
| A high seco | dois naipes | EP | 237 | 123 | 90 |
| A high seco | dois naipes | CO | 454 | 280 | 216 |
| A high conectado | rainbow | EP | 212 | 106 | 12 |
| A high conectado | rainbow | CO | 421 | 166 | 28 |
| A high conectado | dois naipes | EP | 212 | 114 | 9 |
| A high conectado | dois naipes | CO | 421 | 186 | 21 |
| BBX | rainbow | EP | 225 | 0 | 0 |
| BBX | rainbow | CO | 439 | 161 | 103 |
| BBX | dois naipes | EP | 225 | 0 | 0 |
| BBX | dois naipes | CO | 439 | 145 | 98 |
| K-Q high | rainbow | EP | 237 | 124 | 80 |
| K-Q high | rainbow | CO | 455 | 234 | 225 |
| K-Q high | dois naipes | EP | 238 | 112 | 82 |
| K-Q high | dois naipes | CO | 455 | 237 | 219 |
| J-T high | rainbow | EP | 244 | 121 | 83 |
| J-T high | rainbow | CO | 466 | 227 | 204 |
| J-T high | dois naipes | EP | 244 | 125 | 91 |
| J-T high | dois naipes | CO | 467 | 246 | 217 |
| High com sequência | rainbow | EP | 227 | 126 | 13 |
| High com sequência | rainbow | CO | 435 | 214 | 54 |
| High com sequência | dois naipes | EP | 228 | 125 | 16 |
| High com sequência | dois naipes | CO | 435 | 224 | 57 |
| Low com sequência | rainbow | EP | 254 | 171 | 152 |
| Low com sequência | rainbow | CO | 475 | 318 | 226 |
| Low com sequência | dois naipes | EP | 255 | 166 | 138 |
| Low com sequência | dois naipes | CO | 476 | 298 | 214 |
| Conectado consecutivo | rainbow | EP | 245 | 203 | 56 |
| Conectado consecutivo | rainbow | CO | 453 | 297 | 76 |
| Conectado consecutivo | dois naipes | EP | 246 | 204 | 51 |
| Conectado consecutivo | dois naipes | CO | 454 | 298 | 66 |
| Low sem sequência | rainbow | EP | 257 | 170 | 149 |
| Low sem sequência | rainbow | CO | 477 | 324 | 246 |
| Low sem sequência | dois naipes | EP | 257 | 169 | 142 |
| Low sem sequência | dois naipes | CO | 477 | 304 | 249 |
| Monotone | rainbow | CO | 458 | 299 | 243 |

**O que forma o "sem regra":**

- **Boards secos, K-Q high, J-T high e lows** (A high seco, K-Q high, J-T high, Low com sequência, Low sem sequência, monotone e o CO no BBX): o maior bloco são as mãos sem par e sem draw (Pendência 13). Nos lows, os overpairs do meio e os top pairs e second pairs com naipe do board também pesam (Pendências 11 e 12).
- **Boards conectados** (A high conectado e High com sequência): quase não há mão sem par e sem draw. O sem regra é de par com draw (second pair com broca, top pair com broca ou duas pontas) e de sequência feita (Pendência 11). No A-J-T, por exemplo, o EP deixa sem regra 36 combos de second pair com broca, 24 de top pair com broca e 16 de sequência.
- **BBX no EP:** é range bet, então tudo aposta.
