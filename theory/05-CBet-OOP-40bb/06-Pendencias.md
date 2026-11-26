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
  - tipo/pendencias
---

# Pendências — C-Bet OOP

## Módulo — SRP OOP C-Bet Flop

---

# Pontos para complementar futuramente

---

# 1. Mais exercícios mão a mão

Adicionar todos os spots estudados em formato:

- Board.
- Posição.
- Mão.
- Decisão.
- Correção.
- Regra criada.

---

# 2. Mais exemplos de construção de splits

Adicionar exemplos específicos de:

- Top Pair.
- Second Pair.
- Trincas.
- Draws.
- Backdoors.

---

# 3. Gyazos completos

Adicionar todos os outputs de Solver utilizados durante o estudo.

---

# 4. Correções do instrutor

Toda correção nova deve atualizar:

- Exercícios.
- Regras Consolidadas.
- Changelog.

---

# 5. Separação futura por posição

Possível expansão:

- EP vs BTN.
- CO vs BTN.
- SB vs BB.

Mantendo sempre o contexto original.

---

# 6. Second Barrel OOP — completar o turn

O guideline cobre só o range de valor. Falta definir:

- Bluffs no turn.
- Semi-bluffs (draws que fazem barrel).
- Composição do range de check no turn.
- Exercícios mão a mão de turn.
- Gyazos de Solver do turn.
- Videoaula (seção ainda sem aula).

---

# 7. Check-fold (02/11/2026)

A Prática do módulo não tem a ação check-fold: só entram mãos com regra de check-call, check-raise ou bet (B25, B40, B70), e as outras são descartadas do treino.

**Regra do autor do KB:** mão que o herói abre e que não se encaixa em nenhuma das possibilidades é claramente check-fold.

**Indiferentes entre check-call e check-fold (autor):**

- Os underpairs (pocket pair abaixo do terceiro par) ficam indiferentes em várias situações.
- Exemplo do GTO Wizard (CO contra BTN, flop 9-8-4, 43,9bb), em frente à aposta do BTN: fold 46,4%, call 27,8% e raise 25,8%. O 33 e o 22 aparecem misturados entre call e fold, numa situação de 50% de stack restante.
- Com ICM maior os pares baixos já foldariam mais. O treino não modela ICM.

**Atualização (25/11/2026):** a aula de revisão confirmou: mão sem valor de showdown e sem equity dá check-fold (A6o, Q7s de ouro no J-6-2). Os pares baixos seguem no check-call no Split 25% (55, 44, 33 no J-6-2). Ver Pendência 21.

**Falta saber (coach):** quais mãos do range de abertura viram check-fold em cada textura e posição, e onde fica a fronteira dos pares baixos.

**Status:** aberta. O botão foi adiado a pedido do autor.

---

# 8. Boards do arquivo de exemplos do coach (02/11/2026)

O arquivo "CBET OOP EXEMPLOS" lista 16 mãos de exemplo, cada uma com o rótulo do coach e as posições. A Prática passou a usar os que tinham rótulo claro (Decisão 8). Os outros ficam sem textura definida:

- 864 rainbow (HJ contra BTN), rotulado só "low".
- 652 rainbow (MP contra HJ), rotulado só "low".
- J-8-7 com dois corações (CO contra BTN), rotulado "high card conectado com flush draw".
- 969 com duas espadas (EP contra CO), 332 rainbow (CO contra BTN) e A-A-8 com dois ouros: boards pareados, fora das texturas da tabela.
- 832 monotone de ouros (HJ contra CO): o monotone da tabela é do CO contra BTN.

**Atualização (25/11/2026):** a aula de revisão define o board dobrado (JJ9) como B40 split range no CO contra BTN, e os conectados consecutivos como check range (Regra 19). O 864 e o 652 do coach não são consecutivos, então seguem sem textura. Dobrado ainda não está na Prática.

**Falta saber (coach):** a qual textura do guideline (A HIGH, BBX, K-Q high, J-T high, high ou low com sequência) cada um desses pertence. Os pareados precisam de uma tabela própria.

**Status:** aberta.

---

# 9. Posições dos exemplos

Os exemplos do coach trazem posições diferentes das do módulo (MP contra HJ, EP contra CO, HJ contra CO). O treino usa sempre o BTN como vilão, com o herói no EP ou no CO.

**Falta saber (coach):** se a tabela de estratégia vale para essas outras posições.

**Status:** aberta.

---

# 10. Os melhores top pairs no check-raise (24/11/2026)

A Regra 15 vale só para o A high seco, nos dois spots, EP e CO contra BTN (os 2 melhores top pairs, AK e AQ, vão de check-raise). O autor confirmou o EP em 24/11/2026.

**Falta saber (autor):** se vale também para as outras texturas do Split Range (K-Q high, J-T high etc.). Nelas, o que conta como "2 melhores top pairs" depende do kicker.

**Atualização (25/11/2026):** o slide do coach lista "2 melhores top pairs" no XR por valor do split, sem limitar ao A high seco (Regra 17). Isso indica que vale em geral. Falta confirmar e aplicar nas outras texturas da Prática (Pendência 15, item 7).

**Status:** resolvida em 25/11/2026. Vale em todo board com split (Regra 15, aplicado na Prática).

---

# 11. Mãos feitas e combos sem regra (25/11/2026)

**Modelo proposto (25/11/2026):** todas as lacunas das Pendências 7, 8, 11, 12, 13, 15 (seguidas e PP no Split 25%), 18, 20 e 21 têm um modelo em `12-Modelo-Lacunas.md`. Os modelos são propostas marcadas como inferência, e nenhum é regra até o autor ou o coach confirmar.

Revisão do módulo contra a Prática (ver `10-Como-Jogar.md`). Estas mãos não têm linha definida e ficam fora do treino:

- Overpair do meio (KK no J-8-3). No 9-4-2, três classes de overpair ficam sem regra (JJ, QQ, KK).
- Sequência feita e flush feito.
- Par com draw (top pair com flush draw ou com draw de sequência, por exemplo).
- Flush draw com draw de sequência (combo draw).

**Falta saber (autor/coach):** a linha e a função (valor, bluff ou proteção) de cada uma.

**Atualização (25/11/2026):** os slides cobrem a sequência feita (metade bet, metade XR por valor, Pendência 15 item 2) e põem os draws com BDFD no check-raise por bluff. Overpair do meio, par com draw e combo draw seguem sem definição.

**Status:** aberta.

---

# 12. Top pair e second pair com um naipe do board (25/11/2026)

Top pair ou second pair que tem um naipe do board, mas não é suited nem o naipe do flush draw (por exemplo, A♠K♣ no A♥7♥2♣), fica sem regra. O second pair off com o naipe do flush draw também.

Há uma divergência de critério: a Regra 8 e a aula dizem que o second pair aposta pelo kicker e pela interação com o board, mas a Prática decide pelos naipes (backdoor flush draw aposta, sem naipe do board dá check-call).

**Falta saber (autor/coach):** a linha dessas mãos e qual critério vale para o second pair (kicker ou naipe).

**Status:** aberta.

---

# 13. Mãos sem par e sem draw, e os bluffs por linha (25/11/2026)

É o maior bloco sem regra nos boards secos, no K-Q high, no J-T high, nos lows e no monotone (nos boards conectados o buraco é de par com draw e sequência feita, Pendência 11). Exemplos: no A high seco (A♠ 7♦ 2♣), 104 dos 144 combos sem regra do EP e 244 dos 320 do CO são mãos sem par e sem draw. No Low sem sequência (9♠ 4♦ 2♣) são 149 dos 179 no EP e 246 dos 333 no CO. A tabela de todas as texturas está em `11-Mapa-por-Textura.md`. O que existe de bluff hoje:

- **Bet:** duas pontas sem naipe do board, broca com o naipe do flush draw, uma overcard com BDFD e o nut flush draw médio.
- **Check-raise:** flush draw sem ás, nut flush draw baixo e, no Split 25%, duas pontas e brocas com o naipe do flush draw.

Em board rainbow, o Split Range não tem nenhum check-raise bluff.

**Falta saber (autor/coach):**
- Quais mãos sem par e sem draw viram bet por bluff, quais viram check-raise por bluff e quais viram check-fold (liga com a Pendência 7).
- Duas pontas com o naipe do board no Split Range, duas pontas sem o naipe do board no Split 25%, brocas sem naipe e brocas em board rainbow.
- Se o check-raise por bluff em board rainbow existe no Split Range.

**Atualização (25/11/2026):** os slides dizem que o check-raise por bluff é de flush draws, draws com BDFD e uma high card mais BDFD + BDST, e que o bet por bluff é de duas pontas sem BDFD, brocas com BDFD, parte off bloqueando FD e BDFD + BDST (Regras 16 e 17). Isso responde em parte à lista acima: o bluff de check-raise em board rainbow vem dos draws com BDFD. Continua sem resposta o que fazer com as mãos sem par, sem draw e sem BDFD (check-fold, Pendência 7).

**Status:** aberta.

---

# 14. "Primeiro naipe do board para XR" (25/11/2026)

A guideline diz, no Split 25%, para usar "o primeiro naipe do board" no check-raise dos draws. A Prática lê isso como o naipe do flush draw (board de dois naipes).

**Falta saber (autor):** se a leitura está certa e qual é o naipe em board rainbow.

**Status:** resolvida em 25/11/2026 (Decisão 10). A leitura da Prática (naipe do flush draw, em board de dois naipes) é mantida, e é provisória.

---

# 15. Slides do coach × Prática: divergências (25/11/2026)

Os slides (Regras 16 e 17) e a Prática não batem em alguns pontos. Nada foi sobrescrito: a Prática segue como estava, e cada ponto abaixo espera decisão.

1. **"Melhores PP sobre o segundo par"** está em bet por valor. A Prática dá check-call para todo pocket pair abaixo do top pair. O autor esclareceu (25/11/2026) que PP = pocket pairs, acima do segundo par da mesa, e que os **2 melhores** apostam por valor. Resolvido no Split Range (Regra 16, aplicado na Prática, EP e CO). Falta saber se vale também no Split 25%, onde a Prática segue com check-call.
2. **Seguidas:** metade aposta por valor e a outra metade vai de check-raise por valor. A Prática não tem regra para sequência feita. Falta saber qual metade é qual.
3. **Duas pontas:** o slide diz "sem BDFD", e a nota e a Prática dizem "sem naipe do board". Pode ser a mesma coisa ou não.
4. **Brocas com BDFD:** o slide de bet por bluff põe brocas com BDFD no bet, e o de check-raise por bluff põe "draws com BDFD" no check-raise. A Prática usa a broca com o naipe do flush draw. Falta saber: broca com BDFD vai para bet ou para check-raise?
5. **Uma high card mais BDFD + BDST:** o slide põe no check-raise por bluff. A Prática põe "uma overcard com BDFD" no bet.
6. **Draws diretos no check-call:** o slide põe no check-call. A Prática deixa a maior parte dos draws sem regra.
7. **"2 melhores top pairs" no XR por valor** vale para o split em geral. A Prática só tem isso no A high seco (Pendência 10).

**Status:** resolvida em 26/11/2026. A Decisão 10 diz como cada divergência foi conciliada. Seguidas (item 2): o coach deixa a critério, e o autor usa RNG (1 a 50 check-raise, 51 a 100 aposta). A Prática mostra o RNG nas seguidas.

---

# 16. Boards carregados (25/11/2026)

O slide diz que, em boards carregados, apostamos todos os overpairs e o check-raise não tem a parte polar. Isso conflita com a Regra 14, em que o melhor overpair (AA) vai de check-raise por valor, e com o check-raise por bluff dos slides.

**Falta saber (coach/autor):** quais texturas são "carregadas" (A high conectado e High com sequência?) e se nelas o AA aposta e o check-raise fica só com valor. Até lá, vale a Regra 14 (esclarecimento do autor).

**Status:** resolvida em 25/11/2026. A aula de revisão confirmou (J-9-8: "os overpairs são muito mais direcionados ao bet"). A Regra 21 e a Decisão 11 valem, e a Prática aplica nas texturas com sequência (inferência do critério de "carregado"). A Regra 14 vale nos outros boards.

---

# 17. EP contra EP (25/11/2026)

O slide "Extra" diz que, em EP contra EP, o board low é check range. O módulo só cobre EP e CO contra BTN.

**Falta saber:** se entra um spot novo no módulo (e as outras texturas, que o slide não traz).

**Status:** resolvida em 25/11/2026 (Decisão 10): fica como nota da aula, fora das relações do módulo. A aula de revisão comenta que no EP os lows conectados (765) são check range, o que entrou na Regra 19.

---

# 18. Tabela de size e frequência da aula × guideline (25/11/2026)

A nota da aula "Cbet OOP 40bbs deep" traz os outputs do solver por textura (EP e CO contra BTN, com size e frequência de bet, tabela em `03-Solver.md`). Ela diverge da guideline em três pontos:

- **A high seco (A82r):** a aula traz B40 no EP e no CO (frequências de 43% e 21%), e a guideline traz B25.
- **BBX (KJ7r) no EP:** a aula traz B40 com frequência de 70%, e a guideline traz range bet em B25.
- **Monotone (K84m):** a aula traz B25 no EP e no CO (frequências de 39% e 18%), e a guideline traz "aleatório" no EP e check range no CO.

A tabela traz também o board dobrado (QQ7r), que não tem estratégia na guideline (ver Pendência 8).

Mantive a guideline e a Prática, que já foram corrigidas pelo autor e pelo coach. A tabela está registrada em `03-Solver.md` para comparação.

**Atualização (25/11/2026):** a aula de revisão do CO contra BTN fica com a guideline: A high seco é B25 split range, o monotone é check range e o BBX é B40 split 25% (os números do quiz da aula). O board dobrado (JJ9) é B40 split range no CO. Falta só o EP: BBX no EP (a tabela do solver traz B40 a 70%) e o monotone no EP.

**Falta saber (coach):** qual versão vale no EP para BBX e monotone.

**Status:** aberta.

---

# 19. Pocket pairs acima do segundo par: a aula contra o esclarecimento (25/11/2026)

O autor disse que os 2 melhores pocket pairs acima do segundo par apostam (QQ e JJ no K-8-4), e a Prática segue isso no Split Range. Na aula de revisão, o coach dá o exemplo oposto num board com J alto e 6 e 2: 10-10 e 9-9 no check-call, 8-8 e 7-7 no bet, "os que precisam de mais proteção apostam". A transcrição está truncada nesse trecho.

**Falta saber (autor/coach):** se os pares que apostam são os melhores ou os mais baixos do grupo. Até lá, vale o esclarecimento do autor.

**Status:** resolvida em 25/11/2026. O autor confirmou de novo que os 2 melhores apostam. O exemplo da aula (10-10 e 9-9 no check-call) fica como divergência registrada, e a Prática segue o autor.

---

# 20. Flush draws que não são de ás: bet ou check-raise (25/11/2026)

A guideline e os slides põem "flush draws" no check-raise por bluff, e a Prática dá check-raise a todo flush draw sem ás. Na aula, o coach manda apostar os flush draws que não são os melhores (K8, Q9, Q7, K7 de copas), porque não colorem mãos piores e fazem foldar mãos melhores. O check-raise fica com os flush draws de ás e os combo draws (A5 de copas com backdoor de sequência, T9 de copas). O nut flush draw com valor de showdown (AQ) dá check-call, o que bate com a correção do instrutor.

**Falta saber (autor/coach):** se a aula vale para o split padrão e para o Split 25%, e se a Prática deve mudar o flush draw sem ás para bet.

**Status:** resolvida em 25/11/2026. O autor decidiu mudar: flush draw sem ás aposta, e o combo draw (flush draw com duas pontas) vai de check-raise. Aplicado na Prática, no Split Range e no Split 25%. Os nut flush draws seguem a correção do instrutor (AK a AT check-call, A9 a A6 bet, A5 a A2 check-raise).

---

# 21. BDST na Prática e check-fold (25/11/2026)

A aula pede, em board seco, os dois critérios juntos (BDFD e BDST) para apostar uma mão solta (A5 de espadas no J-6-2). A Prática não modela o backdoor de sequência: "uma overcard com BDFD" aposta sem checar o BDST. Mão sem valor de showdown e sem equity dá check-fold (A6o, Q7s de ouro), o que confirma a regra do autor da Pendência 7.

**Falta saber:** o critério exato de BDST e se o botão de check-fold entra agora.

**Status:** aberta.

<!-- graphify-links:start -->

---

## Ligações

_Gerado a partir do grafo do graphify. Não editar à mão: é sobrescrito na próxima geração._

**Pasta:** [[theory/05-CBet-OOP-40bb/README|theory/05-CBet-OOP-40bb]]

**Mesma pasta:** [[theory/05-CBet-OOP-40bb/05 - CBET OOP 40BB GUIDELINE|01-Guideline]] · [[theory/05-CBet-OOP-40bb/02-VideoAulas|02-VideoAulas]] · [[theory/05-CBet-OOP-40bb/03-Solver|03-Solver]] · [[theory/05-CBet-OOP-40bb/04-Exercicios|04-Exercicios]] · [[theory/05-CBet-OOP-40bb/05-Regras-Consolidadas|05-Regras-Consolidadas]] · [[theory/05-CBet-OOP-40bb/07-Changelog|07-Changelog]] · [[theory/05-CBet-OOP-40bb/08-Referencias|08-Referencias]] · [[theory/05-CBet-OOP-40bb/09-Decisoes|09-Decisoes]]

<!-- graphify-links:end -->
