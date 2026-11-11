---
tags:
  - modulo/18-xc-play-river
  - spot/srp
  - posicao/oop
  - street/river
  - linha/xc-xx-play
  - tipo/modulo
---

# XC e Play River

**Flashcards:** [[theory/18-XC-Play-River/18 - XC PLAY RIVER FLASHCARDS|18 - XC PLAY RIVER FLASHCARDS]]

## Módulo 18 — XC e Play River

---

# Contexto

Fase:
Qualquer fase. Os exemplos são em chip EV. Em linhas de range capado, os sizes quase não mudam na reta final.

Stack:
Os replayers da aula vão de 18bb a mais de 100bb efetivos. O size alto muda com o SPR (pot, all-in ou overbet).

Formato:
Pote single raised heads-up, BTN contra BB.

Spot:
O BTN abre e o BB paga. O BB dá check-call no flop, o turn termina em check-check e o BB age primeiro no river. A aula chama a linha de XC-XX-B.

Posições:
Hero no BB, fora de posição. O vilão é o BTN, em posição.

Relações:
- Módulo 09 (Bet Check Bet): a mesma linha vista do lado do agressor, também com range capado. O instrutor chama as duas aulas de complementares.
- Módulo 14 (Probe Turn): outra linha em que o BB ataca um range capado.
- Módulo 04 (Third Barrel e vs Third Barrel): a linha contínua, em que o bluffcatcher precisa bloquear valor.
- Módulo 11 (Value Bet Masterclass): size acompanha a largura do range de valor.

Fonte:

- Aula "XC play river" (transcrição `.txt`, legenda `.srt` e vídeo, fora do repositório).
- TXT "Jogando do BB na linha XC-XX-B", que o instrutor mostra na tela no fim da aula.

---

# Objetivo

Decidir o river do BB depois de check-call no flop e check-check no turn: quais mãos apostam e em qual size, quais dão check-call, quais dão check-fold e quais dão check-raise.

---

# Conceito Central

Quando o BTN aposta o flop e dá check no turn, o range dele fica capado: sai quase todo o topo (top pair forte, dois pares, trincas). Sobram valor médio e give-up.

Isso muda duas coisas para o BB:

1. **Novo grupo de nuts.** O top pair do BB, mesmo com kicker ruim, passa a ser o nuts e vai para o size alto. O second pair vira mão de valor e aposta no size baixo.
2. **Bluffcatcher por desbloqueio.** Contra range capado, a mão que paga não precisa bloquear o valor do vilão, porque ele quase não tem valor. Ela precisa desbloquear o que ele blefa. Por isso pares fracos com kicker baixo pagam, e pares com kicker alto foldam.

---

# Estrutura

| Arquivo | Conteúdo |
|---|---|
| `18 - XC PLAY RIVER GUIDELINE.md` | Estratégia por tipo de runout |
| `02-VideoAulas.md` | Conceitos e as seis mãos da aula |
| `03-Solver.md` | Sem dado de solver capturado |
| `04-Exercicios.md` | As seis mãos e exercícios de conceito |
| `05-Regras-Consolidadas.md` | Regras finais |
| `06-Pendencias.md` | O que falta |
| `07-Changelog.md` | Histórico de versões |
| `08-Referencias.md` | Fontes e prioridade |
| `09-Decisoes.md` | Decisões de estrutura |

---

# Resultado esperado

Parar de dar check com top pair e second pair no river dessa linha, usar dois sizes (um baixo e um alto) e pagar o bet do BTN com os pares que desbloqueiam os bluffs dele.

---

# Status

Versão 1.0. Tem guideline, aula, regras e exercícios. Faltam solver, a bateria de mãos da aula e a linha do BTN (bet-check-bet, módulo 09).
