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
  - tipo/videoaulas
---

# VideoAulas — C-Bet OOP

## Módulo — SRP OOP C-Bet Flop

---

# Contexto da Aula

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

# Objetivo da Aula

Construir uma estratégia de C-Bet fora de posição entendendo:

- Quando apostar.
- Quando criar split.
- Como proteger o check.
- Como selecionar mãos dentro do range de bet.
- Como adaptar a estratégia conforme a textura do board.

---

# Conceito Principal

A grande diferença do C-Bet OOP é que não temos a vantagem de posição.

Por isso:

Não basta possuir mãos fortes.

Precisamos pensar em como o range inteiro será construído.

---

# Desvantagens de jogar OOP (nota da aula, 25/11/2026)

- **Menos controle do pote:** o IP escolhe o tipo de mão e o size da aposta. OOP não controla o size nem a frequência de aposta que enfrenta.
- **Menos equity realizada:** OOP chega menos vezes ao showdown. O IP realiza equity dando check no flop ou no turn e pressiona a parte média e fraca do nosso range.
- **Mais difícil de pressionar:** o IP seleciona melhor o grupo de mãos que continua. O c-bet e o second barrel OOP precisam ser voltados para equity: no flop, draws e mãos com backdoors, e no turn, draws diretos.
- **Mais sujeito a erro:** uma estratégia linear no flop abre buracos no turn e no river (bet no flop e check no turn, por exemplo). Check range no flop ganha menos fichas, não gera fold equity e joga potes maiores, e precisaria ser compensado com muito mais check-raise. Linhas extremas OOP não trazem benefício claro e custam EV.

---

# Aula de revisão CO contra BTN (25/11/2026)

A aula revisa o C-Bet OOP do CO contra o BTN. As regras e os boards estão na guideline (seção "Atualização da aula de revisão") e nas Regras 19 a 21. Em resumo:

- O CO abre um range amplo, com muita mão fraca que erra o flop, então a frequência de bet cai (cerca de 25%, contra cerca de 50% no EP). Por isso existe o Split 25%.
- O C-Bet OOP é uma estratégia simplificada por naipes, que o coach ainda joga e defende. Vai migrar para uma linguagem de frequência (buckets) e randomizador, mas a estratégia por naipes dá frequências muito parecidas. A parte 2 da revisão deve vir em janeiro.
- Mudança desta revisão: conectados consecutivos (987, 765, 654, T98) viram check range, junto com o monotone.
- MDA do field (apoio, não regra): o field aposta cerca de 50% contra o miss, perto do solver, mas não ajusta por posição. O recreativo usa size baixo de bet no flop e no turn, e dá muito fold ao probe. Contra recreativo, o size de até 70% ganha mais com valor, e os sizes baixos (25% a 40%) servem de bluff.
- Em potes em que o IP dá check back, o range dele fica capado, e o probe do OOP ganha valor.

---

# Range de Bet e Range de Check

A aula reforça que o check faz parte da estratégia.

O range de check precisa conter:

- Mãos capazes de continuar.
- Mãos com showdown value.
- Mãos fortes para proteção.
- Mãos que realizam equity.

O objetivo é evitar que o adversário consiga atacar todo nosso range de check.

---

# Diferença EP vs BTN e CO vs BTN

A aula trabalha os dois cenários separadamente.

---

# EP vs BTN

Características:

- Range de abertura mais forte.
- Maior concentração de mãos fortes.
- Maior liberdade para apostar em determinadas texturas.

---

# CO vs BTN

Características:

- Range mais amplo.
- Maior necessidade de proteção.
- Mais situações utilizando Split 25%.

---

# Construção dos Splits

A aula apresenta que os splits não são aleatórios.

Eles são construídos através de:

- Força da mão.
- Naipe.
- Backdoors.
- Capacidade de continuar.
- Necessidade de proteção.

---

# Split Range

O Split Range distribui uma grande parte do range entre:

- Bet.
- Check.

A composição envolve:

## Top Pairs

Divisão dos Top Pairs.

Critério:

Usar os naipes que possuem interação com o board.

---

## Second Pairs

Também existe divisão.

Algumas continuam apostando.

Outras permanecem no check para realizar equity.

---

## Draws

A escolha dos draws considera:

- Força.
- Backdoors.
- Blockers.
- Capacidade de continuar.

---

# Split 25%

A aula mostra que alguns boards possuem uma estratégia mais restrita.

Nesse caso:

Apenas uma parte específica do range aposta.

---

# Critério dos Top Pairs no Split 25%

Entram:

- Parte off com naipe do Flush Draw.
- Parte suited com BDFD.

Em boards rainbow:

Utilizamos mãos sem o naipe do board.

---

# Draws no Split 25%

Entram:

- 2 pontas.
- Brocas.

Com preferência para mãos que possuem o naipe do board.

---

# Boards Low

Um dos pontos mais trabalhados.

A estratégia muda conforme:

- Low conectado.
- Low desconectado.

---

# Low conectado

Exemplo:

Boards onde muitas mãos possuem interação.

A estratégia utiliza size menor.

Motivo:

O board muda muito nas próximas streets.

---

# Low desconectado

Permite maior pressão.

Motivos:

- Valor precisa proteger.
- Mãos fortes conseguem extrair mais.

---

# Top Pair

A aula reforça:

Top Pair não é uma categoria única.

A decisão depende de:

- Kicker.
- Naipe.
- Textura.
- Necessidade de proteção.

---

# Second Pair

Segue uma lógica semelhante.

Alguns Second Pairs:

- Apostam por valor/proteção.

Outros:

- Permanecem no check.

---

# Trincas

A aula trabalha que mãos muito fortes também podem entrar no check.

Motivo:

Proteger o range de check.

---

# Draws

Nem todo draw é automaticamente bet.

A pergunta principal:

"Essa mão quer construir pote ou realizar equity?"

---

# Blockers

Os blockers aparecem principalmente na seleção de bluffs.

Não basta ter pouca equity.

Precisamos escolher mãos que:

- Reduzem continuações adversárias.
- Aumentam a eficiência do bluff.

---

# Conclusão da Aula

A estratégia C-Bet OOP é baseada em construção de ranges.

O objetivo final:

Ter um range de bet forte e um range de check protegido.

A melhor estratégia não é apostar mais.

É construir melhor.

<!-- graphify-links:start -->

---

## Ligações

_Gerado a partir do grafo do graphify. Não editar à mão: é sobrescrito na próxima geração._

**Pasta:** [[theory/05-CBet-OOP-40bb/README|theory/05-CBet-OOP-40bb]]

**Mesma pasta:** [[theory/05-CBet-OOP-40bb/05 - CBET OOP 40BB GUIDELINE|01-Guideline]] · [[theory/05-CBet-OOP-40bb/03-Solver|03-Solver]] · [[theory/05-CBet-OOP-40bb/04-Exercicios|04-Exercicios]] · [[theory/05-CBet-OOP-40bb/05-Regras-Consolidadas|05-Regras-Consolidadas]] · [[theory/05-CBet-OOP-40bb/06-Pendencias|06-Pendencias]] · [[theory/05-CBet-OOP-40bb/07-Changelog|07-Changelog]] · [[theory/05-CBet-OOP-40bb/08-Referencias|08-Referencias]] · [[theory/05-CBet-OOP-40bb/09-Decisoes|09-Decisoes]]

**Outros módulos:**

- [[theory/06-XR-SHORT/06 - XR SHORT GUIDELINE|06-XR-SHORT · 01-Guideline]]

<!-- graphify-links:end -->
