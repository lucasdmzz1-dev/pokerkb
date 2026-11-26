# Regras Consolidadas — BB Raised Pot vs SB

> Módulo 17. Regras numeradas. Fonte: aula de 31/10/2026 e tabelas do coach, salvo quando indicado. Prioridade neste módulo: fala da aula, IMG2, IMG1, TXT.

---

# Regra 1 — O size acompanha o thin value

Thin value é uma escala: B25 é o máximo, B40 o intermediário e B70 o mínimo. Quanto menos thin value o board dá, maior o size e menor a frequência de aposta. Regra de bolso: com thin value, B25; sem thin value, B70; o que sobrar, B40.

---

# Regra 2 — Triple broadway e low conectado: B70

Não há faixa intermediária. O range de BB é polarizado e não permite frequência alta nesses boards.

---

# Regra 3 — Sequência e low desconectado: B40

Board com sequência e low desconectado ficam em B40. Exceção: triple broadway e low conectado ficam em B70, mesmo com sequência.

---

# Regra 4 — High card: depende de quantas cartas o SB defende

Duas cartas abaixo do 8: B25. Duas de valor 8 ou mais: B40. O 8-4-2 é B40 por exceção explícita da aula, e o T-7-4 também é B40 (ver `06-Pendencias.md`, itens 11 e 12).

---

# Regra 5 — Flush draw pode simplificar a divisão

Mãos com carta do naipe apostam mais, e mãos sem a carta dão check. Simplificação da aula, não regra exata. Sem flush draw, um RNG de 0 a 50 serve.

---

# Regra 6 — Divisão no B70

Overpair e top pair forte: 75%. Dois pares, top pairs e melhores draws: 50%. O restante: 25%. Underpairs: 0%. Second pair entra em 25%.

---

# Regra 7 — Top set em frequência baixa

No B70, o top set vai no menor bucket possível, porque bloqueia as mãos que pagam. Os outros sets ficam em 50% ou 75%, conforme o spot. Em board favorável, com size menor, o top set pode subir.

---

# Regra 8 — Monotone: B25, split em três buckets

Buckets de 25%, 50% e 75%, frequência geral de cerca de 50%. Second pair em 25%, de preferência com carta do naipe. O mesmo split vale para qualquer monotone. (Corrige a versão 1.0, que dava B70 ou B40.)

---

# Regra 9 — Dobrado

Dobrado seco: B25, range. Dobrado conectado: B25, com split de 50% geral e 75% para trinca, full e quadra. (Corrige a versão 1.0, que dava B40 para o dobrado conectado.)

---

# Regra 10 — Turn segue a lógica do flop

O size do turn depende de quantos top pairs você quer apostar. Ver Regras 14 e 15.

---

# Regra 11 — Semi-conectado com flush draw: B70

Q-8-7, J-7-6 e K-9-8, todos com flush draw. Muita mudança de nuts.

---

# Regra 12 — Dois broadways sem sequência: B40

K-J-4. O 4 não é defendido, então há mais thin value que no triple broadway.

---

# Regra 13 — A high

Seco: B25, range (100%). Carregado (por exemplo A-Q-3 com flush draw): B25, split. A-Q-9 seria B40 em teoria, mas usa-se B25.

---

# Regra 14 — Turn depois de flop em check-check

O size do turn é sempre alto. B70 no mínimo quando você quer apostar todos os top pairs, e B100 ou mais quando quer apostar só top pair com bom kicker.

---

# Regra 15 — Turn depois de flop apostado

Blank: geométrico. Carta que conecta: tende a B70. Flush com carta alta: tende a B40. Flush com carta baixa: tende a B70. Certeza média a baixa.

---

# Regra 16 — Execução com RNG

Bucket de 75% aposta de 0 a 75 e dá check de 76 em diante. A mesma lógica vale para 50% e 25%.

---

# Regra 17 — Tabelas de split B25 e B40

B25: 100% OP e sets (menos top set); 75% dois pares, top set, TP e bons draws; 50% all. B40: 75% OP, sets, dois pares, TP forte e FDs; 50% TPs e melhores draws; 25% all; 0% underpair.

---

# Regra 18 — Stacks

Para 40bb deep. Por ora vale a mesma estratégia em outros stacks; ajustes pontuais para 20bb ou menos virão em aula futura.

---

# Regra 19 — Pré-flop opcional

Splitar as offs de borda baixa em 50/50, ou colocar em 100% o lixo de 2x a 4x. A frequência agregada fica igual.

---

# Regra 20 — Quanto mais conecta, pior

T-7-4 é B40, T-7-5 "piora um pouco" e T-8-5 com flush draw é B70.

---

# Regra 21 — O range off do SB define o size (02/11/2026)

**Faça:** pense no range de limp-call do SB, principalmente na parte offsuit, que ele defende de 8x para cima.

- Seguida que o SB tem offsuit: B40 (Q-J-8, J-T-8).
- Seguida em board low, onde ele não tem a seguida offsuit: B70 (9-7-5, T-8-5).

**Por quê:** onde ele acerta mais, não dá para apostar em frequência alta, e o size varia entre o médio e o muito alto. **[Coach]**

---

# Regra 22 — Altas e baixas no board (02/11/2026)

**Faça:**

- Duas cartas altas e uma baixa: B40 (K-J-4, Q-9-4, Q-9-2).
- Duas cartas altas com a terceira conectando mais: B70 (K-Q-8, Q-9-7).
- Uma carta alta e duas baixas, abaixo do 8x: B25, muito thin value (Q-6-3, T-4-2, J-4-2).

**Por quê:** o SB quase não defende 7x offsuit ou menos, então o board dá muito thin value. **[Coach]**

---

# Regra 23 — Nos boards de B70, a prioridade são as mãos vulneráveis (02/11/2026)

**Faça:** no B70 aposte em 75% os dois pares, o overpair e o top pair forte. A trinca vai em 25%.

**Por quê:** apostando muito alto o vilão folda muito mais, e a trinca, por bloquear pares, não ganha em colocar dinheiro em frequência alta. As mãos fortes e vulneráveis para as próximas streets passam a ser a prioridade. **[Yago]**

---

# Regra 24 — Pocket pairs (02/11/2026)

**Faça:** classifique o pocket pair pela posição no board. Acima de todas as cartas é overpair. Entre a primeira e a segunda, segundo par. Entre a segunda e a terceira, terceiro par. Abaixo de todas, underpair.

**Exemplo:** no J-9-6, TT é segundo par, 77 é terceiro par e 55 é underpair. **[Autor]**

---

# Regra 25 — Boards de B70 com flush draw (02/11/2026)

**Faça:** use o split B70 no low conectado (9-7-5, T-8-5) e no semi conectado com flush draw (Q-T-7, Q-8-7, J-7-6, K-9-8). **[Autor]**

# Regra 26 — Cartas abaixo e acima do 8 (04/11/2026)

**Faça:** em board seco ou com cartas abaixo do 8, aposte thin value. Com duas cartas acima do 8, não use B25: vá para B40 ou B70.

**Por quê:** o SB acerta menos par nas cartas baixas, tem menos mão para continuar, e você tira valor de forma mais efetiva. Com duas cartas acima do 8 ele interage mais com o board, com mais draws diretos e mais pares, e isso piora bastante a sua aposta de thin value. **[Áudio do coach, a confirmar]**

---

# Regra 27 — O flush draw é o segundo critério do size (04/11/2026)

**Faça:** olhe o flush draw depois da categoria do board.

- Board sem flush draw: você realiza mais equity, e tem mais mãos com backdoor flush draw.
- Board com flush draw: se você aposta muito, realiza menos equity, porque parte das mãos que você enfrenta são flush draws.

**Por quê:** em alguns boards específicos o flush draw decide se o size sobe ou não. **[Áudio do coach, a confirmar]**

---

# Regra 28 — Pouca interação mantém o B40 com flush draw (04/11/2026)

**Faça:**

- Com menos interação (por exemplo, o 4 trocado por um 3 ou um 2), o B40 continua valendo mesmo com flush draw.
- Com vários draws diretos e flush draw no mesmo board, ele dificilmente fica em B40: trate como semi conectado, com B70 ou check.

**Por quê:** quando as equities mudam muito, as mãos de valor querem cobrar o máximo, e quem não realiza tão bem não tem incentivo de dar thin value. **[Áudio do coach, a confirmar]**

# Regra 29 — T-8-4 (04/11/2026)

**Faça:** com flush draw, B70. Sem flush draw, B40 (leitura da resposta do autor, a confirmar). Se o 4 for um 3 ou um 2 (T-8-3, T-8-2), o B40 volta, mesmo com flush draw.

**Por quê:** o 4 conecta mais com o T e o 8 do que o 3 e o 2, então há mais interação. **[Coach, via autor]**

---

# Regra 30 — Dois straight draws mais flush draw (04/11/2026)

**Faça:** quando o board junta dois straight draws com flush draw, trate como B70. Dificilmente ele deixa de se encaixar em B70.

**Por quê:** as equities mudam muito, e as mãos de valor querem cobrar o máximo. Essa regra concretiza a Regra 28. **[Coach, via autor]**

# Regra principal do módulo

Ao escolher o size, pergunte primeiro quanto thin value o board dá para este range de SB. O resto segue dessa resposta.

---

# Notas

- As Regras 4, 15 e 20 têm pontos abertos em `06-Pendencias.md`.
