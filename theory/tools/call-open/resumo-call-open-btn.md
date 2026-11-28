# BTN contra 1 open — resumo consolidado (Vanilla e PKO)

> Gerado por script a partir de `dados/call-open-btn-vanilla.json` e `dados/call-open-btn-pko.json`. Não edite as tabelas à mão: refaça a partir dos JSONs.

## Como ler

- **Fonte:** solver do 4BET Trainer (HRC Library), lido em 03/11/2026. Só mesas de 8 ou 9 jogadores e opens que não sejam RAISE 3 (RAISE 2 e 2,1 a 2,3 entram).
- **Cenário:** o BTN contra o open de uma posição inicial (UTG1 a MP na maioria; algumas árvores trazem LJ, HJ e CO). O que importa é o **% de open** do opener, lido no nó dele antes de abrir; a posição é só informação.
- **Faixa do BTN:** shallow até 25bb, médio de 25 a 45bb, fundo acima de 45bb.
- **Relação:** opener ÷ BTN em stack. *Cobre* (o BTN cobre o opener) abaixo de 0,8; *similar* de 0,8 a 1,3; *coberto* acima de 1,3.
- **Fase:** como a biblioteca classifica (Early, Mid, Bubble, Late). "Late e mesa final" junta Late, Semi FT e Mesa Final.
- **Células:** `call% (+all-in%) [open% | RP | #árvore]`. Todas as porcentagens são do range do BTN. Sem all-in quando ele é 0.
- **Amostra:** em geral uma árvore por célula. Os números dão tendência, não regra.

## Vanilla

Call do BTN por fase, faixa de stack e relação com o opener.

| Fase | BTN | BTN cobre | Similar | Coberto |
|---|---|---|---|---|
| Early | shallow (até 25bb) | 2,4% (+9,6) [18% \| RP +0,8 \| #7211] | 9,4% (+6,8) [20% \| RP +1,7 \| #5579] | 8,8% (+8,0) [19% \| RP +1,2 \| #4287] |
| Early | médio (25 a 45bb) | 11,8% [32% \| RP +2,3 \| #6480]<br>10,3% [25% \| RP +1,6 \| #6480]<br>8,8% (+3,6) [18% \| RP +1,6 \| #3610] | 11,7% [16% \| RP +3,4 \| #6480]<br>14,9% [20% \| RP +1,1 \| #5827] | 10,7% [22% \| RP +3,4 \| #6480]<br>12,6% [17% \| RP +2,4 \| #7118] |
| Early | fundo (mais de 45bb) | 11,9% [20% \| RP +1,5 \| #3278] | 21,0% [20% \| RP +1,3 \| #6704] | 16,6% [18% \| RP +1,5 \| #10474] |
| Mid | shallow (até 25bb) | 2,2% (+3,3) [16% \| RP +6,8 \| #4419] | 3,5% (+6,8) [17% \| RP +4,0 \| #5968] | 0,9% (+5,6) [19% \| RP +10,2 \| #9092] |
| Mid | médio (25 a 45bb) | 8,6% (+2,5) [16% \| RP +2,4 \| #10350] | 8,7% [21% \| RP +9,7 \| #3523] | 4,8% [15% \| RP +4,6 \| #9248] |
| Mid | fundo (mais de 45bb) | 12,4% [16% \| RP +3,8 \| #10427] | 16,4% [19% \| RP +3,8 \| #7675] | 17,2% [30% \| RP +8,8 \| #6991] |
| Bubble | shallow (até 25bb) | 2,1% (+3,3) [13% \| RP +2,7 \| #2356] | 0,4% (+3,8) [13% \| RP +14,8 \| #4741] | 1,1% (+5,2) [21% \| RP +14,8 \| #4433]<br>0,3% (+7,4) [40% \| RP +15,7 \| #5620] |
| Bubble | médio (25 a 45bb) | 7,1% [11% \| RP +4,9 \| #5132] | 9,3% [25% \| RP +11,4 \| #3930] | 17,6% [34% \| RP +11,5 \| #10110] |
| Bubble | fundo (mais de 45bb) | 15,9% (+3,8) [15% \| RP +1,7 \| #9633]<br>16,3% [14% \| RP +2,7 \| #4084] | — | — |
| Late e mesa final | shallow (até 25bb) | 3,6% (+18,0) [16% \| RP +9,3 \| #2776]<br>0,7% (+5,5) [13% \| RP +7,1 \| #4959] | 0,1% (+6,7) [14% \| RP +7,9 \| #7361] | 1,9% (+6,7) [23% \| RP +10,8 \| #3950] |
| Late e mesa final | médio (25 a 45bb) | 6,1% (+3,7) [17% \| RP +2,0 \| #3947] | 11,1% (+1,7) [17% \| RP +13,6 \| #5398] | 6,9% [22% \| RP +15,4 \| #3744]<br>9,3% (+1,3) [25% \| RP +18,0 \| #4440] |
| Late e mesa final | fundo (mais de 45bb) | 5,0% [14% \| RP +5,2 \| #7660] | 8,7% [18% \| RP +7,2 \| #3915]<br>12,3% [19% \| RP +2,9 \| #3690] | 13,1% [29% \| RP +20,8 \| #5893]<br>14,1% [29% \| RP +20,4 \| #7738] |

## PKO (Bounty 50%)

Call do BTN por fase, faixa de stack e relação com o opener.

| Fase | BTN | BTN cobre | Similar | Coberto |
|---|---|---|---|---|
| Early | shallow (até 25bb) | 0,4% (+10,8) [13% \| RP -8,3 \| #9909] | 6,3% (+6,3) [18% \| RP +0,7 \| #5574] | 5,2% (+8,3) [19% \| RP +0,3 \| #6045] |
| Early | médio (25 a 45bb) | 18,6% (+2,9) [20% \| RP -3,5 \| #9688]<br>16,8% (+4,0) [13% \| RP -10,9 \| #8083] | 14,8% [18% \| RP +0,3 \| #10239] | 17,7% [29% \| RP +1,1 \| #6073] |
| Early | fundo (mais de 45bb) | 28,7% [20% \| RP -6,3 \| #10483]<br>23,7% [18% \| RP -7,1 \| #6138] | 15,5% [23% \| RP -2,7 \| #6755] | 33,4% [38% \| RP +1,6 \| #33]<br>10,5% [19% \| RP +6,6 \| #25] |
| Mid | shallow (até 25bb) | 2,5% (+2,7) [15% \| RP -1,0 \| #10433] | 4,3% (+6,0) [19% \| RP +4,5 \| #3255] | 0,8% (+6,9) [18% \| RP +3,1 \| #6809] |
| Mid | médio (25 a 45bb) | 9,1% (+2,5) [15% \| RP -4,9 \| #87] | 12,1% [20% \| RP +7,1 \| #7003] | 19,1% [20% \| RP +4,1 \| #6346] |
| Mid | fundo (mais de 45bb) | 26,3% (+5,3) [16% \| RP -6,4 \| #7218] | 26,7% [23% \| RP -2,4 \| #9122] | 17,5% [24% \| RP +1,5 \| #5353] |
| Bubble | shallow (até 25bb) | 3,3% (+1,8) [11% \| RP +1,8 \| #3226] | 2,4% [12% \| RP -0,8 \| #10147] | 1,5% (+4,3) [16% \| RP +9,5 \| #7028] |
| Bubble | médio (25 a 45bb) | 12,4% [11% \| RP -5,6 \| #10344] | 18,8% [18% \| RP -0,9 \| #4845] | 15,4% [33% \| RP +6,8 \| #8634] |
| Bubble | fundo (mais de 45bb) | 13,3% [9% \| RP -5,5 \| #9243] | 16,3% [19% \| RP +2,4 \| #6084] | — |
| Late e mesa final | shallow (até 25bb) | 2,2% (+8,6) [12% \| RP -3,9 \| #6317] | 7,0% (+13,0) [19% \| RP +0,6 \| #5698] | 5,1% (+8,8) [24% \| RP +3,9 \| #4049] |
| Late e mesa final | médio (25 a 45bb) | 8,8% [12% \| RP -0,2 \| #4843] | 25,5% [18% \| RP -3,5 \| #10262] | 6,8% [19% \| RP +13,9 \| #5427] |
| Late e mesa final | fundo (mais de 45bb) | 17,9% [20% \| RP -3,2 \| #7916] | 11,9% [19% \| RP +8,1 \| #8932] | 21,8% [42% \| RP +14,5 \| #7637] |

## Médias por faixa e tipo

Call médio do BTN (todas as relações e fases juntas) e a média do all-in.

| Tipo | Faixa | Cenários | Call médio | All-in médio | 3bet médio |
|---|---|---|---|---|---|
| Vanilla | shallow (até 25bb) | 14 | 2,7% | 6,9% | 1,7% |
| Vanilla | médio (25 a 45bb) | 17 | 10,0% | 0,8% | 6,1% |
| Vanilla | fundo (mais de 45bb) | 13 | 13,9% | 0,3% | 7,0% |
| PKO (Bounty 50%) | shallow (até 25bb) | 12 | 3,4% | 6,5% | 1,8% |
| PKO (Bounty 50%) | médio (25 a 45bb) | 13 | 15,1% | 0,7% | 4,4% |
| PKO (Bounty 50%) | fundo (mais de 45bb) | 13 | 20,3% | 0,4% | 5,9% |

## Call médio por fase e tipo (BTN médio e fundo, 25bb ou mais)

| Tipo | Fase | Cenários | Call médio |
|---|---|---|---|
| Vanilla | Early | 10 | 13,0% |
| Vanilla | Mid | 6 | 11,3% |
| Vanilla | Bubble | 5 | 13,2% |
| Vanilla | Late e mesa final | 9 | 9,6% |
| PKO (Bounty 50%) | Early | 9 | 20,0% |
| PKO (Bounty 50%) | Mid | 6 | 18,5% |
| PKO (Bounty 50%) | Bubble | 5 | 15,2% |
| PKO (Bounty 50%) | Late e mesa final | 6 | 15,4% |

## Efeito do RP (BTN com mais de 25bb)

| Tipo | RP do BTN contra o opener | Cenários | Call médio |
|---|---|---|---|
| Vanilla | 0 a +5 | 19 | 12,1% |
| Vanilla | acima de +5 | 11 | 11,0% |
| PKO (Bounty 50%) | abaixo de 0 | 14 | 18,7% |
| PKO (Bounty 50%) | 0 a +5 | 6 | 19,8% |
| PKO (Bounty 50%) | acima de +5 | 6 | 13,1% |

## Efeito do % de open (BTN com mais de 25bb)

| Tipo | Open % do opener | Cenários | Call médio |
|---|---|---|---|
| Vanilla | até 15% | 5 | 9,8% |
| Vanilla | 15% a 20% | 14 | 12,4% |
| Vanilla | 20% a 25% | 5 | 9,0% |
| Vanilla | acima de 25% | 6 | 14,0% |
| PKO (Bounty 50%) | até 15% | 4 | 12,8% |
| PKO (Bounty 50%) | 15% a 20% | 11 | 16,6% |
| PKO (Bounty 50%) | 20% a 25% | 7 | 19,6% |
| PKO (Bounty 50%) | acima de 25% | 4 | 22,1% |

## Efeito da relação de stack (BTN com mais de 25bb)

| Tipo | Relação | Cenários | Call médio |
|---|---|---|---|
| Vanilla | cobre | 11 | 10,4% |
| Vanilla | similar | 9 | 12,7% |
| Vanilla | coberto | 10 | 12,3% |
| PKO (Bounty 50%) | cobre | 10 | 17,6% |
| PKO (Bounty 50%) | similar | 8 | 17,7% |
| PKO (Bounty 50%) | coberto | 8 | 17,8% |

## Células sem dado

- **Vanilla:** Bubble, fundo (mais de 45bb), similar; Bubble, fundo (mais de 45bb), coberto
- **PKO (Bounty 50%):** Bubble, fundo (mais de 45bb), coberto

## Árvores descartadas

- **Vanilla:** #6596 (CO abre RAISE 3 (3bb)); #8022 (todas as posições abrem RAISE 3); #5064 (quase todas as posições abrem RAISE 3 (UTG1 9,7bb com open de 4,8% mais all-in de 14,6%)); #7422 (mesa de 9 jogadores com opens em RAISE 3); #8021 (todas as posições abrem RAISE 3 (menos o BTN, que abre 2,5)); #6132 (MP abre RAISE 3); #7655 (MP abre RAISE 3)
- **PKO (Bounty 50%):** #3486 (quase todas as posições abrem RAISE 3); #9659 (MP abre RAISE 3); #5888 (mesa de 7 jogadores (sem SB)); #4763 (MP abre RAISE 3); #3615 (mesa de 7 jogadores (sem SB)); #5758 (sem a posição do BTN na mesa; a leitura caiu em outro nó); #6148 (MP abre RAISE 3); #5166 (MP abre RAISE 3); #8497 (MP abre RAISE 3); #7802 (navegação não chegou ao nó do BTN contra o open (cartões fora de posição))

## Totais

- 79 árvores e 82 cenários (Vanilla: 44; PKO: 38).

## Leituras da amostra (inferência, não regra)

> Escritas em 03/11/2026 sobre os dados atuais. Cada célula tem em geral uma árvore, então valem como indicação. Se os JSONs mudarem, releia antes de usar.

1. **Shallow (até 25bb):** o BTN quase não paga (call médio de 2,7% no Vanilla e 3,4% no PKO) e dá all-in em 6% a 7% das mãos, em média. Nenhuma árvore mostrou call largo com stack curto, nem no PKO.
2. **Médio e fundo:** o call médio é de 10,0% (médio) e 13,9% (fundo) no Vanilla, e de 15,1% e 20,3% no PKO. O PKO fica 5 a 6 pontos acima.
3. **Fase:** o call cai do Early para o Late e a mesa final, de 13,0% para 9,6% no Vanilla e de 20,0% para 15,4% no PKO (BTN com mais de 25bb). A Bubble fica no meio (13,2% no Vanilla, 15,2% no PKO).
4. **RP:** no PKO, com RP acima de +5 o call médio é de 13,1%, contra cerca de 19% com RP menor. No Vanilla o RP quase não separou (12,1% com RP de 0 a +5 contra 11,0% acima de +5), e não há árvore Vanilla com RP negativo.
5. **% de open:** no PKO o call sobe junto com o open do opener, de 12,8% (open até 15%) para 22,1% (open acima de 25%). No Vanilla a ordem não é monótona (9,8%, 12,4%, 9,0%, 14,0%), com poucas árvores por faixa.
6. **Relação de stack:** no Vanilla o BTN que cobre o opener paga um pouco menos (10,4%) que o similar e o coberto (12,7% e 12,3%). No PKO a relação não mostrou efeito (17,6%, 17,7% e 17,8%).
7. **Buracos que não achei no solver:** com mesa de 8 ou 9 jogadores e open diferente de 3bb não apareceu árvore de Bubble com BTN acima de 45bb nas relações similar e coberto (Vanilla) nem coberto (PKO).
