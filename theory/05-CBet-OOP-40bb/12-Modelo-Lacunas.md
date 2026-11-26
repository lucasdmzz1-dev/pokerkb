---
tags:
  - modulo/05-cbet-oop-40bb
  - spot/srp
  - posicao/oop
  - street/flop
  - stack/40bb
  - tipo/modelo
---

# Modelo das lacunas — C-Bet OOP

## Módulo 05 — C-Bet OOP 40bb (só o flop)

> Modelo de tudo o que as fontes ainda não definem no módulo, para a Prática poder implementar. **Nada aqui é regra validada.** Cada item é uma proposta marcada como *(modelo)*, montada a partir do que as fontes dizem sobre mãos parecidas. As regras validadas estão em `05-Regras-Consolidadas.md`. Se o autor ou o coach confirmar um item, ele vira regra lá, com o número seguinte da lista, e sai daqui. Se contradisser, vale a fonte.

**Fontes usadas:** guideline e slides do coach, aula de revisão CO contra BTN (25/11/2026), correção do instrutor (nut flush draws), esclarecimentos do autor (Regras 14, 15 e 16) e as Pendências 7, 11, 12, 13, 16, 19, 20 e 21.

**Como cada item está escrito:** o problema, a fonte que sustenta o modelo, o modelo em forma de regra operacional, o critério técnico para a Prática e o que confirmar.

---

# 1. Check-fold (Pendência 7)

**Problema.** A Prática não tem a ação check-fold. Mão do range de abertura que não entra em nenhuma linha fica fora do treino.

**Fontes.** O autor: mão aberta que não se encaixa em nenhuma possibilidade é check-fold (Pendência 7). A aula: mão sem valor de showdown e sem equity dá check-fold (A6o, Q7s de ouro no J-6-2). Os underpairs ficam indiferentes entre check-call e check-fold (autor).

**Modelo.**

- *(modelo)* Check-fold é o que sobra: toda mão do range de abertura que não tem linha (bet, check-raise ou check-call) pelas regras do módulo.
- *(modelo)* Entram só as mãos sem par e sem draw, ou com draw sem equity (broca sem naipe do board em board rainbow, uma overcard com um só backdoor).
- *(modelo)* Mão com par, sequência feita ou draw forte que o módulo ainda não cobre não vira check-fold. Ela segue as regras dos itens 3 a 7 abaixo.

**Para a Prática.** Botão "Check-fold" na tela. Resposta certa quando `decidir` devolve `null` e a mão cai no critério acima. Hoje essas mãos são descartadas do treino. O "sem regra" pesa de cerca de 40% a mais de 80% dos combos abertos, conforme a textura, e só parte dele é check-fold (ver `11-Mapa-por-Textura.md`).

**Confirmar.** Se broca sem equity e overcard com um só backdoor entram no check-fold ou no check-call.

---

# 2. Backdoor de sequência — BDST (Pendência 21)

**Problema.** A aula pede BDFD e BDST juntos para apostar mão solta em board seco. A Prática só olha o BDFD.

**Fontes.** A aula: A5 de espadas no J-6-2 é check-raise (tem BDFD e BDST). T8 de espadas no J-high é check-raise e T8 de outros naipes aposta. Q7 de ouro e A6o no J-6-2 são check-fold.

**Modelo.**

- *(modelo)* A mão tem BDST quando as duas cartas dela e pelo menos uma carta do board cabem numa janela de 5 ranks seguidos. O ás vale 14 e 1. Faltam duas cartas para completar a sequência.
- *(modelo)* Teste com os exemplos da aula: A5 no J-6-2 tem BDST (A, 2 e 5 cabem na janela A-5). T8 no J-6-2 tem BDST (8, T e J cabem na janela 7-J). Q7 no J-6-2 não tem (Q, J e 7 não cabem em 5 ranks). A6 no J-6-2 não tem.
- *(modelo)* Em board seco, uma overcard com BDFD só aposta se também tem BDST. Em board com mais conectividade, o BDFD sozinho bastaria *(modelo)*.

**Para a Prática.** Função `temBDST(board, hero)` em `ler()` (janela de 5 ranks, ás nas duas pontas). Troca a regra "uma overcard com BDFD aposta" por "uma overcard com BDFD e BDST".

**Confirmar.** O exemplo A7 de ouro, que a aula diz que "já daria para apostar" no J-6-2, não tem BDST pela definição acima. Ou o ás conta como exceção (overcard com o nut BDFD), ou o coach falou de outro board. Os dois casos mudam o critério.

---

# 3. Top pair e second pair com um naipe do board (Pendência 12)

**Problema.** Top pair ou second pair com um naipe do board que não é do flush draw nem suited (A♠K♣ no A♥7♥2♣) fica sem regra. O second pair off com o naipe do flush draw também.

**Fontes.** A aula: em Split 25%, os top pairs que apostam são só os do naipe certo, e todos os outros AJ ficam no check (check-raise os melhores, check-call o resto). Second pair nunca aposta no Split 25%. A Regra 5: no Split Range, a metade que aposta usa os naipes do board.

**Modelo.**

- *(modelo)* Top pair que não é a parte que aposta vai para a metade que checa: check-call, e os 2 melhores pelo kicker de check-raise (Regra 15).
- *(modelo)* Second pair que não é suited com BDFD nem sem naipe do board vai para o check-call.
- *(modelo)* Em board rainbow, a regra para quem tem um naipe do board é a mesma: quem não aposta checa.

**Para a Prática.** Nos ramos de top pair e second pair, trocar o `return null` final por check-call (e check-raise para os 2 melhores top pairs). Isso tira esses combos do "sem regra".

**Confirmar.** Se a divisão do second pair no Split Range é por naipe (como a Prática faz) ou por kicker (como a Regra 8 diz).

---

# 4. Overpair do meio (Pendência 11)

**Problema.** Fora de board carregado, o overpair que não é o melhor nem o primeiro (KK no J-8-3) fica sem regra.

**Fontes.** A aula: o primeiro overpair aposta, o melhor vai de check-raise, e o do meio "fica na meiúca". O slide diz que as mãos fortes ficam no máximo em 50% de frequência.

**Modelo.**

- *(modelo)* Overpair do meio vai de check-call. É mão forte que protege o range de check (Regras 2 e 9), como o top set.
- *(modelo)* Em board carregado, o overpair do meio aposta (Regra 21, já validada).

**Para a Prática.** No ramo `overpair`, trocar o `return null` por check-call.

**Confirmar.** Se "meiúca" é check-call, uma mistura de bet e check-raise, ou outra coisa.

---

# 5. Sequência feita (seguidas) (Pendência 15, item 2)

**Problema.** Os slides põem metade das seguidas no bet por valor e a outra metade no check-raise. Nenhuma fonte diz qual metade.

**Fontes.** Os slides (Regras 16 e 17). As trincas seguem a mesma ideia: a pior aposta, a do meio dá check-raise, o top set dá check-call.

**Modelo.**

- *(modelo)* Pela força, no padrão das trincas: a sequência mais baixa (a de menor carta alta) aposta por valor, e a mais alta dá check-raise. Quando só há duas, aposta a pior e dá check-raise a melhor.

**Para a Prática.** Em `ler()`, a sequência feita já é detectada (`feita === "sequencia"`). Falta ordenar as sequências possíveis do board pela carta mais alta e dividir ao meio.

**Confirmar.** Se a divisão é por força (como no modelo) ou por naipe. Este é o item de menor confiança.

---

# 6. Par com draw e combo draw (Pendência 11)

**Problema.** Par com draw (top pair com broca, second pair com duas pontas) e flush draw com broca ficam sem regra. É o maior bloco do "sem regra" nos boards conectados (A-J-T e Q-T-9).

**Fontes.** A aula: draws diretos dão check-call; combo draws (flush draw com duas pontas) dão check-raise (já aplicado). Regra 10: a decisão do draw depende de equity, de continuar e de blockers.

**Modelo.**

- *(modelo)* Par com broca ou duas pontas segue a linha do par. O draw é redraw e não muda a linha.
- *(modelo)* Flush draw com broca segue a linha do flush draw (flush draw sem ás aposta, nut flush draw pelas faixas do instrutor).
- *(modelo)* Par com flush draw segue a linha do par.

**Para a Prática.** Retirar o `return null` de "par com draw" e de "flush draw com broca", deixando a regra do par ou do flush draw valer.

**Confirmar.** Se o par com duas pontas (second pair com OESD, por exemplo) sobe de linha, de check-call para check-raise por bluff.

---

# 7. Mãos sem par, sem draw e sem BDFD e BDST (Pendência 13)

**Problema.** É o maior bloco do "sem regra" nos boards secos. Não se sabe quais viram bluff de bet ou de check-raise.

**Fontes.** A aula: só aposta quem tem BDFD e BDST em board seco, e o check-raise bluff sai da mão com a carta do primeiro naipe do board. Quanto mais seco o board, mais polar o check-raise. Boards carregados não têm bluff de check-raise.

**Modelo.**

- *(modelo)* Bet por bluff: uma overcard com BDFD e BDST (já no item 2), duas pontas sem naipe do board e broca com o naipe do flush draw.
- *(modelo)* Check-raise por bluff em board seco: a mão com BDFD e BDST na carta do primeiro naipe do board (A5 de espadas no J-6-2). Em board carregado não há bluff de check-raise.
- *(modelo)* O resto vai para o check-fold (item 1).

**Para a Prática.** Em `decidir`, a regra de "uma overcard com BDFD" ganha o teste de BDST e uma variante de check-raise para o primeiro naipe do board em board seco (Low sem sequência, A high seco, J-T high, K-Q high).

**Confirmar.** Quais texturas contam como secas para o check-raise polar.

---

# 8. Board dobrado (Pendência 8 e 18)

**Problema.** A aula define o dobrado (JJ9) como B40 split range no CO. A Prática não tem textura de board dobrado, e `ler()` não trata o par no board.

**Fontes.** A aula (quiz, número 4). A tabela de solver: dobrado EP B40 a 65%, CO B70 teórico com adaptação B40 a 29%.

**Modelo.**

- *(modelo)* EP e CO contra BTN: B40 split range.
- *(modelo)* Classificar a mão pelas duas ranks distintas do board. Para o J-J-9, a rank alta é a do par (J) e a baixa é o 9. Top pair é par com o 9 ou o J do board (trinca com o J). Dois pares é J e 9 (full house).
- *(modelo)* A trinca (uma carta da rank do par) é mão de valor e entra como o top set do split. O resto segue as linhas do split range.

**Para a Prática.** Textura nova `dobrado` com boards como J-J-9 e Q-Q-7. `ler()` precisa tratar o board com carta repetida (hoje conta o set como par de bolso).

**Confirmar.** Todo o mapeamento de mãos no dobrado. É o item com menos fonte, e o coach ainda não detalhou.

---

# 9. Boards carregados e consecutivos (Regras 19 e 21)

**Problema.** O módulo não lista quais boards são "carregados" nem onde acaba o "consecutivo".

**Fontes.** A aula: J-9-8 é carregado. Consecutivo é 987, T98, 765, 654 e 543 (T-9-8 para baixo). Q-J-T segue o BBX. O 987 aposta mais que o 543. O 7-6-4 do guideline é "Low com seguida".

**Modelo.**

- *(modelo)* **Consecutivo:** três ranks seguidas com a carta alta de T a 4 (T-9-8, 9-8-7, 8-7-6, 7-6-5, 6-5-4, 5-4-3, 4-3-2). Check range. Q-J-T, J-T-9 e as com ás não entram.
- *(modelo)* **Carregado:** board com sequência não consecutiva (J-9-8, Q-T-9, 7-6-4, A-J-T). Todos os overpairs apostam e o check-raise não tem bluff.
- *(modelo)* **Seco:** o resto.

**Para a Prática.** Já aplicado em parte (T-9-8, 9-8-7, 7-6-5 e 6-5-4). Faltam 8-7-6, 5-4-3 e 4-3-2 no check range, e J-9-8 como board de exemplo de "High com sequência".

**Confirmar.** Se o consecutivo vai até o 4-3-2 (a aula confirma o 5-4-3 e o 4-3-2 numa pergunta de aluno) e se J-T-9 fica fora do check range.

---

# 10. Split 25%: pares de bolso (Pendência 15, item 1)

**Problema.** Os 2 melhores pockets pair acima do segundo par apostam no Split Range. No Split 25% a Prática os mantém no check-call, porque a nota não traz esse caso.

**Fontes.** A aula: no Split 25%, a frequência de bet das mãos de valor médio é muito baixa e o second pair nunca aposta. O autor: os 2 melhores apostam (Split Range).

**Modelo.**

- *(modelo)* No Split 25%, o melhor pocket pair acima do segundo par (1 só) aposta, e os demais dão check-call. É o mesmo critério do Split Range com a metade da frequência.

**Para a Prática.** No bloco dos pares de bolso, aceitar `split25` e limitar a 1 par.

**Confirmar.** Se o Split 25% tem 1 par, 2 pares ou nenhum.

---

# 11. Resumo: matriz completa de linhas

As linhas abaixo juntam as regras validadas (sem marca) e o modelo (*modelo*). É a base para a Prática fechar o "sem regra".

| Mão | Split Range | Split 25% |
|---|---|---|
| Melhor overpair | Check-raise | Check-raise |
| Primeiro overpair | Bet | Bet |
| Overpair do meio | Check-call *(modelo)* | Check-call *(modelo)* |
| Overpair em board carregado | Bet | Bet |
| Top set | Check-call | Check-call |
| Trinca do meio | Check-raise | Check-raise |
| Trinca baixa | Bet | Bet |
| Dois pares | Bet | Bet |
| Sequência feita | Bet ou check-raise por força *(modelo)* | Igual ao Split Range *(modelo)* |
| 2 melhores top pairs (parte que checa) | Check-raise | Check-raise |
| Top pair, parte que aposta | Bet | Bet |
| Top pair, outros | Check-call *(modelo para os que têm um naipe do board)* | Check-call |
| Second pair com BDFD | Bet | Check-call |
| Second pair, outros | Check-call *(modelo)* | Check-call |
| 2 melhores PP acima do segundo par | Bet | 1 PP bet, o resto check-call *(modelo)* |
| Demais pares de bolso | Check-call | Check-call |
| Third pair | Check-call | Check-call |
| Par com draw | Linha do par *(modelo)* | Linha do par *(modelo)* |
| Flush draw sem ás | Bet | Bet |
| Combo draw | Check-raise | Check-raise |
| Nut flush draw forte, médio e baixo | Check-call, bet e check-raise | Igual |
| Duas pontas sem naipe do board | Bet | Check-call |
| Draw com BDFD | Check-raise | Check-raise |
| Overcard com BDFD e BDST | Bet *(modelo, BDST)* | Bet *(modelo, BDST)* |
| BDFD e BDST no primeiro naipe do board, board seco | Check-raise *(modelo)* | Check-raise *(modelo)* |
| Sem par, sem draw e sem BDFD e BDST | Check-fold *(modelo)* | Check-fold *(modelo)* |

---

# Ordem sugerida na Prática

1. Itens 3, 4 e 6 (tiram combos do "sem regra" sem criar linha nova).
2. Item 2 (BDST) e item 7 (bluffs).
3. Item 1 (check-fold) e o botão.
4. Item 5 (sequência feita) e item 10 (Split 25%).
5. Item 8 (dobrado), que exige mexer em `ler()`.
6. Item 9 (texturas consecutivas que faltam).
