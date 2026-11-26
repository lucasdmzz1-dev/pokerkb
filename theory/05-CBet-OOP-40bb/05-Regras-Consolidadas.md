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
- **Exceção, boards carregados** (com sequência): todos os overpairs apostam, sem check-raise de valor (Regra 21, aula de 25/11/2026). Isso inclui o overpair do meio.

Exemplo: J♠ 8♦ 3♣, EP contra BTN (Split Range, B40). A♥A♣ dá check-raise. Os naipes da mão não mudam a jogada.

## Trincas

- Pior trinca: **bet** por valor.
- Trinca do meio: **check-raise** por valor.
- Top set: **check-call** (mantém uma mão forte no check e protege o range, Regras 2 e 9).

## Dois pares

- **Bet** por valor.

## Pocket pair abaixo do top pair

- Second pair, third pair e underpair de pocket pair: **check-call**, sem olhar os naipes (Decisão 7).

## Fora das regras (sem jogada definida)

Par com draw, flush draw com draw de sequência, sequência feita e flush feito. A Prática não treina esses casos.

---

# Regra 15 — Os 2 melhores top pairs vão de check-raise, em todo board com split

Fonte: esclarecimento do autor do KB (24/11/2026), vindo de uma correção na Prática, e confirmação do autor em 25/11/2026 de que vale em todos os boards que têm split.

Na metade dos top pairs que não aposta, os 2 melhores pelo kicker vão de **check-raise** por valor, em vez de check-call. No A high seco são AK e AQ. Nos outros boards são os 2 maiores kickers possíveis (no K-8-4, AK e KQ). Os demais top pairs seguem no check-call, e os que apostam (naipe do flush draw, backdoor flush draw) seguem apostando.

Exemplo: A♥ 7♥ 2♣, EP ou CO contra BTN. A♠Q♦ não tem naipe do board e é um dos 2 melhores top pairs: check-raise. A♠J♦ segue no check-call.

**Escopo:** todas as texturas com Split Range ou Split 25%, no EP e no CO. No Split 25% em board rainbow, os top pairs sem naipe do board apostam (Regra 6), então a regra vale para os top pairs que ficariam no check-call. Não vale no range bet (BBX no EP) nem no check range (monotone).

---

# Regra 16 — Bet por valor e bet por bluff no split (slides do coach)

Fonte: slides do coach, 25/11/2026. Vale para o Split Range e, com as frequências menores, para o Split 25%.

**Bet por valor:** metade das seguidas, pior trinca, dois pares, primeiros overpairs, top pairs com BDFD e offs com naipes do board, os melhores PP (pocket pairs) sobre o segundo par da mesa, second pairs com BDFD.

PP = pocket pairs, esclarecido pelo autor em 25/11/2026. São os pocket pairs acima do segundo par do board (por exemplo, entre o K e o 8 no K-8-4). Os 2 melhores deles apostam por valor (esclarecimento do autor, 25/11/2026), e os demais seguem no check-call. Exemplo: no K-8-4, QQ e JJ apostam, e TT e 99 dão check-call. Na Prática isso vale no Split Range, nas duas posições. No Split 25% os pocket pairs seguem no check-call até o autor confirmar (Pendência 15).

**Bet por bluff:** duas pontas sem BDFD, brocas com BDFD, duas pontas ou brocas da parte off que bloqueia o flush draw, e mãos com BDFD + BDST que façam foldar mãos melhores.

Os slides e a Prática divergiam em alguns pontos, resolvidos na Decisão 10 de `09-Decisoes.md`. Só as seguidas (qual metade aposta) seguem em aberto (Pendência 15).

---

# Regra 17 — Check-raise por valor, check-raise por bluff e check-call (slides do coach)

Fonte: slides do coach, 25/11/2026.

- **XR por valor:** a outra metade das seguidas, middle set, melhores overpairs e os 2 melhores top pairs.
- **XR por bluff:** flush draws, draws com BDFD e mãos com uma high card mais BDFD + BDST. Pela aula de 25/11/2026 e decisão do autor, o flush draw sem ás aposta, e o check-raise fica com os nut flush draws baixos (A5 a A2), os combo draws (flush draw com duas pontas) e os draws com BDFD.
- **XC:** top set, todos os pares, mãos com valor de showdown e draws diretos.

Os 2 melhores top pairs no XR por valor valem em todo board com split (Regra 15). Como a Prática e os slides foram conciliados está na Decisão 10 de `09-Decisoes.md`:

- **Draws com BDFD** (duas pontas ou broca suited em um naipe que aparece uma vez no board): check-raise por bluff.
- **Duas pontas sem naipe do board:** bet por bluff. As duas pontas que sobram (com um naipe do board, sem BDFD) são os draws diretos do check-call *(inferência)*.

---

# Regra 18 — Extras do coach: monotone, boards carregados e EP contra EP

Fonte: slide "Extra" do coach, 25/11/2026.

- **Monotone:** o bluff OOP é aleatório, com frequência baixa e size small. Combina com o "aleatório" do EP contra BTN na guideline.
- **Boards carregados:** apostamos todos os overpairs em frequência de flop, e o check-raise não tem a parte polar (sem bluff no check-raise). Confirmado na aula de 25/11/2026 e aplicado na Prática (Regra 21, Decisão 11).
- **EP contra EP:** check range no board low. É um spot fora das relações do módulo, então fica só como nota da aula (Decisão 10).

---

# Regra 19 — Conectados consecutivos: check range

Fonte: aula de revisão CO contra BTN, 25/11/2026 (o coach diz que foi o que mais mudou).

Em board conectado consecutivo (987, 765, 654, T98 e parecidos) o range inteiro dá check, no CO e no EP, junto com o monotone. A frequência de bet do solver é de cerca de 5%, com exceções de até 20% (o 987). O range de abertura quase não interage com o board, e o board muda muito de nuts. Q-J-T segue o BBX. Quanto mais alto o consecutivo, maior a interação (o 987 aposta mais que o 543).

Na Prática, o board consecutivo é uma textura própria em check range. O 765 saiu do "Low com sequência". O 7-6-4, que não é consecutivo, segue como Low com sequência (split range). O EP no consecutivo vem do comentário do coach sobre lows conectados no EP (765); nos consecutivos altos (987, T98) o EP é *(inferência)*.

---

# Regra 20 — Split 25%: como as mãos se distribuem (aula)

Fonte: aula de revisão CO contra BTN, 25/11/2026. Confirma e detalha as Regras 6, 15, 16 e 17.

- Só o overpair vai em frequência alta. As mãos fortes ficam em no máximo 50%, e o range todo em cerca de 25%.
- Second pair e third pair nunca apostam no Split 25%. Dão check-call.
- Mãos sem valor de showdown e sem equity dão **check-fold** (A6o, Q7s de ouro no J-6-2). Mão solta só aposta com BDFD e BDST juntos em board seco.
- Mãos com BDFD e BDST apostam. A carta do primeiro naipe do board vai de check-raise (A5 de espadas no J-6-2), e os outros naipes apostam.
- Draws diretos e brocas: usar o naipe do board. A parte off do check-raise usa o blocker do flush draw.
- Top pair em board rainbow aposta sem o naipe do board. Em board com flush draw, aposta a parte off com o naipe do flush draw. Os melhores top pairs da parte que checa vão de check-raise (Regra 15).
- Valor de showdown (AK, AQ no J-high) dá check-call.

---

# Regra 21 — Check-raise: seco é polar, carregado é equity

Fonte: aula de revisão CO contra BTN e slide "Extra" do coach, 25/11/2026.

- Quanto mais seco o board, mais polar pode ser o check-raise (A5 com backdoors no J-6-2).
- Quanto mais carregado o board, mais equity o check-raise precisa ter, e ele não tem a parte polar.
- Em board carregado (J-9-8), os overpairs apostam, porque não se quer pôr dinheiro no pote com um par só.

Na Prática, "carregado" é o board com sequência: High com sequência, Low com sequência e A high conectado. É inferência do critério, porque o módulo não lista as texturas carregadas.

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
