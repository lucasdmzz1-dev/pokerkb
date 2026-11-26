---
tags:
  - modulo/05-cbet-oop-40bb
  - spot/srp
  - posicao/oop
  - street/flop
  - stack/40bb
  - tipo/guia
---

# Como Jogar — C-Bet OOP

## Módulo 05 — C-Bet OOP 40bb (só o flop)

> Guia de mesa. Spot: SRP, 40bb, você OOP contra o BTN (EP vs BTN e CO vs BTN). Diz **qual mão vai para qual linha e com que função**: bet por valor, bet por bluff, check-raise por valor, check-raise por bluff e check-call. Os motivos estão em `05-Regras-Consolidadas.md`.

**Fontes e marcações.** As linhas vêm da guideline, da correção do instrutor (nut flush draws), dos esclarecimentos do autor (Regras 14 e 15) e das regras da Prática, que o autor e o coach já corrigiram. O que está marcado como *(inferência)* é a função da mão (valor, bluff, proteção), que as fontes dão só em parte. Mão que nenhuma fonte cobre fica na seção 5, e a decisão sobre ela está nas Pendências 11 a 14.

---

# 1. Antes de escolher a mão (10 segundos)

1. **Estratégia do board** (guideline): range, split range, split 25% ou check range, conforme textura e posição.
2. **Mão feita ou draw?** Mão feita sai da tabela 2. Draw sai da tabela 3.
3. **Naipes.** Eles dividem o top pair, o second pair e os draws dentro do split: naipe do flush draw, backdoor flush draw (BDFD) ou nenhum naipe do board.
4. **Size** vem da textura, não da mão (guideline).

---

# 2. Mãos feitas

Valem igual no Split Range e no Split 25% (sets, dois pares, overpairs e pocket pairs).

| Mão | Linha | Função |
|---|---|---|
| **Melhor overpair** (AA), fora de board carregado | **Check-raise** | Valor |
| **Primeiro overpair** acima do board (QQ no J-8-3) | **Bet** | Valor |
| Overpair do meio (KK no J-8-3), fora de board carregado | Sem regra | Pendência 11 |
| **Todo overpair em board carregado** (com sequência: High com sequência, Low com sequência, A high conectado) | **Bet** | Valor (Regra 21, aula de 25/11/2026). Sem check-raise de valor |
| **Top set** | **Check-call** | Proteção do check (mão forte no check) |
| **Trinca do meio** | **Check-raise** | Valor |
| **Trinca baixa** | **Bet** | Valor |
| **Dois pares** | **Bet** | Valor |
| **2 melhores pocket pairs acima do segundo par** (QQ e JJ no K-8-4), só no Split Range | **Bet** | Valor (slides do coach, Regra 16) |
| Demais pocket pairs abaixo do top pair (second, third, underpair) | **Check-call** | Showdown value, sem olhar os naipes |
| Sequência ou flush feitos | Sem regra | Pendência 11 |

## Top pair e second pair (aqui os naipes decidem)

| Mão | Split Range | Split 25% |
|---|---|---|
| **Top pair com o naipe do flush draw** (off) | **Bet** (valor e proteção) | **Bet** |
| **Top pair suited com BDFD** | **Bet** | **Bet** |
| **Top pair sem naipe do board** | **Check-call** | **Check-call** em board com dois naipes; **Bet** em board rainbow |
| **2 melhores top pairs** pelo kicker (AK e AQ no A high seco; AK e KQ no K-8-4), na metade que não aposta | **Check-raise** (valor, Regra 15) | **Check-raise** (os que ficariam no check-call) |
| **Second pair com BDFD** | **Bet** (valor e proteção) | **Check-call** |
| **Second pair sem naipe do board** | **Check-call** (a metade que não aposta) | **Check-call** |
| **Third pair** (sem ser pocket pair) | **Check-call** | **Check-call** |
| Top pair ou second pair com um naipe do board que não é do flush draw nem suited (e second pair off com o naipe do flush draw) | Sem regra | Pendência 12 |

No range bet (BBX no EP) todo o range aposta, e no check range (monotone no CO) as mãos com par dão check-call.

---

# 3. Draws e mãos sem par

| Mão | Split Range | Split 25% |
|---|---|---|
| **Duas pontas sem naipe do board** | **Bet** (bluff) | **Check-call** (draw direto) |
| **Duas pontas com o naipe do flush draw** (board de dois naipes) | **Check-call** (draw direto) | **Check-raise** (bluff) |
| **Duas pontas com um naipe do board, sem BDFD** | **Check-call** (draw direto) | **Check-call** (draw direto) |
| **Draw com BDFD** (duas pontas ou broca suited em um naipe que aparece uma vez) | **Check-raise** (bluff) | **Check-raise** (bluff) |
| **Broca com o naipe do flush draw** (board de dois naipes) | **Bet** (bluff) | **Check-raise** (bluff) |
| **Uma overcard com BDFD** (sem par) | **Bet** (bluff) | **Bet** (bluff) |
| **Flush draw sem ás** | **Bet** (bluff, não colore mãos piores e faz foldar melhores) | **Bet** (bluff) |
| **Combo draw** (flush draw com duas pontas) | **Check-raise** (bluff) | **Check-raise** (bluff) |
| **Nut flush draw forte** (AK a AT) | **Check-call** | **Check-call** |
| **Nut flush draw médio** (A9 a A6) | **Bet** (semi-bluff, protege contra outs de Ax no turn) | **Bet** |
| **Nut flush draw baixo** (A5 a A2) | **Check-raise** (semi-bluff, cooleria os flush draws do vilão) | **Check-raise** |

Casos sem regra: par com draw, flush draw com draw de sequência, brocas em board rainbow, e o ás do naipe do flush draw no board (o nut flush draw muda de dono).

---

# 4. As cinco linhas, em lista

**Bet por valor:** primeiro overpair, trinca baixa, dois pares, top pair com o naipe do flush draw, top pair suited com BDFD (e, no Split Range, second pair com BDFD).

**Bet por bluff:** flush draws sem ás, duas pontas sem naipe do board (Split Range), broca com o naipe do flush draw (Split Range), uma overcard com BDFD, nut flush draw médio (semi-bluff).

**Check-raise por valor:** melhor overpair, trinca do meio, os 2 melhores top pairs em todo board com split (Regra 15).

**Check-raise por bluff:** draws com BDFD, combo draws (flush draw com duas pontas), nut flush draw baixo (A5 a A2, semi-bluff), e no Split 25% as duas pontas e as brocas com o naipe do flush draw.

**Check-call:** top set, pocket pairs abaixo do top pair, top pair e second pair sem naipe do board, third pair, nut flush draw forte (AK a AT), as duas pontas que não apostam nem dão check-raise (draws diretos) e todas as mãos com par no monotone do CO.

*(Inferência)* A função de cada linha (valor ou bluff) vem do texto das regras da Prática e da guideline. Onde a fonte diz só "aposta" ou "check-call", o rótulo "valor e proteção" segue a Regra 8.

**Slides do coach (Regras 16 e 17).** Os slides e a nota da aula dão a mesma divisão em valor e bluff. As diferenças com a Prática foram conciliadas na Decisão 10. O que mudou nas tabelas acima: os 2 melhores top pairs no check-raise em todo split, os 2 melhores pocket pairs acima do segundo par apostando no Split Range (QQ e JJ no K-8-4), os draws com BDFD no check-raise e as outras duas pontas no check-call. Os slides falam de boards carregados (todos os overpairs apostam), e a tabela segue a Regra 14. Só as seguidas (metade aposta, metade check-raise) seguem sem regra, porque nenhuma fonte diz qual metade.

---

**Check range:** o monotone (só no CO) e os conectados consecutivos (987, T98, 765, 654), no EP e no CO (Regra 19). Só as mãos com par têm regra, e todas dão check-call.

As outras texturas (A high conectado, BBX, K-Q high, J-T high, High com sequência, Low com sequência, Low sem sequência, conectado consecutivo e monotone) estão no `11-Mapa-por-Textura.md`, no mesmo formato, para EP e CO.

---

# 6. Onde ainda falta regra

As Pendências 11 a 14 de `06-Pendencias.md` listam as mãos sem regra. As maiores faltas são as mãos sem par e sem draw (qual vira bluff, qual vira check-fold) e os check-raise bluffs no Split Range em board rainbow, onde hoje só o flush draw e o nut flush draw baixo fazem bluff de check-raise.
