---
tags:
  - modulo/08-3bet-pot
  - spot/3bp
  - posicao/ip
  - posicao/oop
  - street/flop
  - street/turn
  - stack/short
  - stack/deep
  - tipo/videoaulas
---

# 3BET POT — VIDEOAULAS E TRANSCRIÇÕES


# OBJETIVO

Consolidar todo o conteúdo apresentado nas aulas de 3BET POT.

O material deve respeitar a separação:

- 3BET POT OOP
- 3BET POT IP
- SHORT STACK
- DEEP STACK


Nunca misturar estratégias entre árvores diferentes.


---

# ORGANIZAÇÃO DAS AULAS


# 01 — 3BET POT OOP


## Conceitos principais

A estratégia OOP é baseada em:

- Menor realização de equity;
- Necessidade de proteção;
- Construção de ranges de aposta e defesa;
- Escolha correta de sizings.


O jogador fora de posição precisa considerar:

- Interação dos ranges;
- Dinâmica do board;
- Possibilidade de futuras streets.


---

# SHORT STACK


## Conceito principal

SPR baixo.

Características:

- Menos espaço pós-flop;
- Mais simplificação;
- Maior facilidade de colocar stack no pote;
- Maior valor de mãos feitas.


A estratégia prioriza:

- Pressão imediata;
- Extração de valor;
- Negação de equidade.


---

# DEEP STACK


## Conceito principal

SPR alto.

Características:

- Mais decisões futuras;
- Maior importância de cobertura de board;
- Maior necessidade de construção de range.


A estratégia prioriza:

- Construção de pote;
- Controle de variância;
- Preservação de ranges para múltiplas streets.


---


# 02 — 3BET POT IP


## Conceitos principais


A estratégia IP possui diferenças fundamentais porque o jogador:

- Possui posição;
- Realiza melhor sua equidade;
- Controla melhor o pote;
- Consegue pressionar ranges específicos.


A estratégia IP não deve utilizar a árvore OOP.


---

# SHORT STACK


## Conceito principal

SPR baixo + posição.


Características:

- Mais simplificação;
- Mais facilidade de pressionar;
- Menor necessidade de proteger contra múltiplas streets.


---

# DEEP STACK


## Conceito principal

SPR alto + posição.


Características:

- Mais construção estratégica;
- Mais importância de cobertura;
- Mais possibilidades futuras.


---

# AULA — 3BET POT DO BB, POSTFLOP 1 (09/11/2026)

> Fonte: transcrição automática (.txt e .srt) e o vídeo da aula. A transcrição troca nomes e naipes (confunde Ás, all-in e naipes), então o que entra aqui foi cruzado com a guideline que o instrutor recita no fim e com os frames do replayer. O que ficou duvidoso está em `06-Pendencias.md`.

## Por que separar BB e SB

O range do SB é linear. O do BB é mais polarizado, e isso reduz a frequência média de aposta e a realização de equity fora de posição. Tratar os dois no mesmo bolo faz o post-flop sair errado.

## O pré-flop define o post-flop (contexto da aula anterior)

- **Até 30bb:** o 3-bet é muito polarizado. A mão acaba muito no pré-flop, e, quando chega ao flop, qualquer par já vale colocar o stack. Mãos off jogáveis entram (K4o, K3o, K2o, A2o, A3o, Q6o, T6o).
- **De 30 a 60bb:** o range precisa de cobertura de board (T6, T7, T8, J7, J8, Q8, K9 e A2 off). Mãos muito ruins (Q2, J4) saem, porque o EV pós-flop cai quando o rival paga.
- **60bb ou mais:** o 3-bet é linear, com muitos suited (67s, 87s, T9s, JTs, KQs), buscando cobertura de board e mãos que chegam ao nuts.
- **Exploit:** 3-betar mais do que a teoria pede, porque o field abre demais e folda muito. Vale até o meio do torneio. Na reta final e contra rival equilibrado, o ajuste é menor.

## Parte 1 — Short stack

**Ideia central:** com SPR baixo, o jogo tem menos streets e qualquer par já tem equity para o stack. O instrutor monta o plano em três perguntas, nessa ordem: como extrair o máximo do valor, quais bluffs acompanham esse size, e o que fazer com o check.

**Os três pilares do size:**

- **B25 (range bet):** vantagem absoluta. O rival tem pouca interação com o board, o valor não precisa de proteção e há muito auto-fold.
- **B40 (split):** o range é relativamente fraco e o valor não precisa de proteção.
- **All-in (split):** o valor grita por proteção, e o range não perde valor ao colocar tudo.

**Boards:** seco, monotone e dobrado são B25. Carregado sem sequência é B40. Com sequência é all-in. No monotone, a aula simplifica: muitas mãos suited do rival ficam com um naipe só, e o BB aposta o range pequeno.

**Exemplo 1 — J♠ T♦ 7♦ (replayer: BB com A♠ 7♣, BB deu 3-bet de 6,5bb, pote de 14,5bb, 19,6bb atrás).** O debate começa em B25, B40 e all-in, e termina no all-in. Ninguém folda J-x, T-x nem 7-x com redraw contra o all-in, então o valor não perde nada ao ir all-in e já não precisa fazer size. O bluff acompanha: equity direta, com duas pontas, flush draw e overs com broca.

- A-J sem o naipe do board: all-in (desbloqueia os draws e toma call de pior).
- A-J com o naipe do board (flush draw mais top pair): check-shove.
- Overpairs (como Q-Q): check-shove.
- T-T (trinca do meio): check-call. Bloqueia os T que pagam.
- A♠9♠ (broca, overcard e BDFD): all-in.
- Mãos de valor de showdown sem draw (A-K, A-Q off): check-call, com cuidado em board com sequência.
- Mãos como K-6 off sem o naipe: check-fold.

Por que dar check com o valor forte: trincas bloqueiam quem paga e não precisam de proteção, então vão para o check-call e dão free card. Dois pares em SPR baixo são bons para slow play. Quanto mais vulnerável é a mão que deu check, mais ela vai para o check-shove.

**Exemplo 2 — J♣ 4♥ 9♥ (replayer: BB com A♦ Q♠, 21,5bb atrás, pote de 19,3bb).** Board carregado sem sequência. O B25 não serve (muita interação e muda o nuts), o all-in não serve (o valor não precisa de tanta proteção) e o B70 equivale ao all-in. Sobra o B40, em split.

- Valor: top pairs e os primeiros overpairs. J-J e 9-9 não entram, porque são trincas e vão para o check-call.
- Bluff: só mãos com BDFD + BDST. K♥5, K♥6, K♥3, K♥2 e A♥5 apostam. K5 off e A♣5 off não têm backdoor e dão check-fold.
- Combo draws (A♥K♥, A♥Q♥): check-shove (check-call também funciona).
- Pares que não são top pair e qualquer draw: check-call. Dois pares em board sem sequência: slow play.
- Se o instrutor errar para um lado, o aluno fica com um padrão simples: bet-call.

**Exemplo 3 — 4♥ J♠ 6♠ (replayer: BB com A♠ K♠, 23,2bb atrás, pote de 13bb).** Board seco para o BB: o rival tem pouca interação e o range do BB é muito mais forte. Não precisa splitar: B25 em todo o range.

**Resumo da parte 1:** seco, monotone e dobrado em B25. Carregado em B40 com split. Sequência em all-in com split, exceto o 6-5-4 e o 5-4-3.

## Parte 2 — Deep stack

**Ideia central:** as três divisões continuam, mas o SPR alto muda as propriedades. Em um board com sequência, o all-in deixa de servir. O board muda muito para as próximas streets, e o BB aposta menos mãos e perde ação quando vem uma carta que muda o nuts.

**Exemplo 4 — J-T-7 deep (o mesmo board do exemplo 1).** Vira split B40. Valor: sequência, trincas, overpairs, top pairs com kicker extra (J-9, J-T) e top pair top kicker. Bluff: equity direta. Check-call: top set, sequência com flush draw, qualquer par, draws diretos, A-K e A-Q com redraw. Check-raise: sequência sem o naipe do board, trincas que não bloqueiam o top pair e combo draws, em size muito alto.

**Exemplo 5 — 2♠ 8♥ 9♠ (replayer: BB com K♦ K♠, 3-bet de 7bb, pote de 15,5bb).** Tx e 98x com flush draw: B70 em split. O K-K aposta (com ou sem o naipe do board). Quanto mais deep, mais B70. Quanto mais raso, mais B40.

**Boards e sizes citados:**

| Board | Size |
|---|---|
| K-9-7 | B40 |
| K-8-2, Q-7-3, A-9-4 | B25 |
| T-9-8, K-9-8, Q-9-8, 8-7-6 | B40 |
| 9-8-2 com flush draw, J-7-2 com flush draw | B70 |
| 5-5-2 | B25 |

**Sizes mais altos pedem mãos mais fortes.** No B70 o rival paga um preço pior e folda mais, então só apostam as melhores mãos de valor e os bluffs com mais equity. As mãos médias e fracas de valor ficam para o check.

**SPR e o size.** Com SPR 3, se o rival pode foldar K-T para o all-in, a melhor estratégia vira size. Um B40 deixa o SPR em 1 no turn, e o BB extrai mais das mãos intermediárias.

**Cobertor curto.** Fora de posição não dá para esticar para os dois lados. Toda vez que o BB dá check com uma mão que queria apostar, ele perde EV. Por isso as mãos boas que dão check precisam ter um plano (check-call ou check-shove) e não vão para fold.

**Check-raise.** A trinca que dá check-raise nunca é a que bloqueia o top pair. O check-raise com overpair é exceção em board com sequência.

# PRINCÍPIOS EXTRAÍDOS DAS AULAS


# 01 — POSIÇÃO ALTERA O OBJETIVO DA APOSTA


## IP

A estratégia busca principalmente:

- Pressionar pares;
- Realizar equity;
- Controlar o pote.


## OOP

A estratégia busca:

- Pressionar pares;
- Pressionar draws;
- Proteger o range.


---

# 02 — STACK ALTERA A COMPOSIÇÃO DO RANGE


## SHORT STACK

Características:

- Mais polarização;
- Mais foco em mãos fortes;
- Mais valor imediato da equidade.


## DEEP STACK

Características:

- Mais mãos com potencial futuro;
- Mais importância de suiteds;
- Mais cobertura de board.


---

# 03 — CONSTRUÇÃO DE BLEFES


Os blefes devem possuir:


- Equidade;
- Draws;
- Backdoors;
- Possibilidade de melhorar.


Não utilizar apenas blockers.


Mãos sem potencial futuro não devem ser transformadas em blefes automaticamente.


---

# 04 — GUIDELINE X SOLVER


As aulas reforçam a separação:


## GUIDELINE

Responsável por:

- Estratégia prática;
- Regras gerais;
- Escolha inicial de size.


## SOLVER

Responsável por:

- Frequências;
- Misturas;
- Ajustes específicos.


---

# EXEMPLOS DAS AULAS


Os exemplos devem ser registrados seguindo:


## SPOT


Posição:

Stack:

Board:

Linha pré-flop:

Decisão:


## ANÁLISE


Estratégia:

Size:

Split:

Motivo:


## CONCLUSÃO


Regra aprendida:

Aplicação futura:


---

# TRANSCRIÇÕES


Todas as transcrições devem manter:

- Terminologia original;
- Explicações do instrutor;
- Exemplos utilizados;
- Observações importantes.


Em caso de conflito:

Registrar em:

`06-Pendencias.md`

<!-- graphify-links:start -->

---

## Ligações

_Gerado a partir do grafo do graphify. Não editar à mão: é sobrescrito na próxima geração._

**Pasta:** [[theory/08-3BET-POT/README|theory/08-3BET-POT]]

**Mesma pasta:** [[theory/08-3BET-POT/08 - 3BET POT GUIDELINE|01-Guideline]] · [[theory/08-3BET-POT/03-Solver|03-Solver]] · [[theory/08-3BET-POT/04-Exercicios|04-Exercicios]] · [[theory/08-3BET-POT/05-Regras-Consolidadas|05-Regras-Consolidadas]] · [[theory/08-3BET-POT/06-Pendencias|06-Pendencias]] · [[theory/08-3BET-POT/07-Changelog|07-Changelog]] · [[theory/08-3BET-POT/08-Referencias|08-Referencias]] · [[theory/08-3BET-POT/09-Decisoes|09-Decisoes]]

<!-- graphify-links:end -->
