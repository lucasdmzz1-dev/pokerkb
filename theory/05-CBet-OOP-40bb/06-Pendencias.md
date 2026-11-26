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

**Falta saber (coach):** a qual textura do guideline (A HIGH, BBX, K-Q high, J-T high, high ou low com sequência) cada um desses pertence. Os pareados precisam de uma tabela própria.

**Status:** aberta.

---

# 9. Posições dos exemplos

Os exemplos do coach trazem posições diferentes das do módulo (MP contra HJ, EP contra CO, HJ contra CO). O treino usa sempre o BTN como vilão, com o herói no EP ou no CO.

**Falta saber (coach):** se a tabela de estratégia vale para essas outras posições.

**Status:** aberta.

<!-- graphify-links:start -->

---

## Ligações

_Gerado a partir do grafo do graphify. Não editar à mão: é sobrescrito na próxima geração._

**Pasta:** [[theory/05-CBet-OOP-40bb/README|theory/05-CBet-OOP-40bb]]

**Mesma pasta:** [[theory/05-CBet-OOP-40bb/05 - CBET OOP 40BB GUIDELINE|01-Guideline]] · [[theory/05-CBet-OOP-40bb/02-VideoAulas|02-VideoAulas]] · [[theory/05-CBet-OOP-40bb/03-Solver|03-Solver]] · [[theory/05-CBet-OOP-40bb/04-Exercicios|04-Exercicios]] · [[theory/05-CBet-OOP-40bb/05-Regras-Consolidadas|05-Regras-Consolidadas]] · [[theory/05-CBet-OOP-40bb/07-Changelog|07-Changelog]] · [[theory/05-CBet-OOP-40bb/08-Referencias|08-Referencias]] · [[theory/05-CBet-OOP-40bb/09-Decisoes|09-Decisoes]]

<!-- graphify-links:end -->
