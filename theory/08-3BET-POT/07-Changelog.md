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
  - tipo/changelog
---

# 07-CHANGELOG.md

# 3BET POT — CHANGELOG


# OBJETIVO

Registrar a evolução do módulo 3BET POT durante o processo de estudo, revisão e consolidação.


Este arquivo deve registrar:

- Alterações realizadas;
- Correções de entendimento;
- Novas conclusões;
- Atualizações após análise de solver;
- Ajustes de documentação.


---

# VERSÃO 1.1 (09/11/2026)

Fonte: aula "3bet pot do BB — Postflop 1" (transcrição automática e vídeo). Conteúdo novo, sem remover nada do que existia.

- Guideline: seção "Guideline da aula do BB", com short e deep, as três estratégias e os splits (valor, bluff, check-call, check-raise e check-fold).
- VideoAulas: seção da aula, com os exemplos do replayer e a lógica de escolha do size.
- Solver: relatório do GTO Wizard mostrado na aula.
- Exercícios: sete exercícios da aula, conferidos carta a carta.
- Regras Consolidadas: Regras 1 a 14 da aula do BB.
- Pendências: itens 05 a 15 (stacks, overpair, exceção do 6-5-4, seco no deep, ponte para o PRÉ-FLOP, SB e IP, turn).
- Decisões: Decisões 08 a 11 (a 11 é o middle stack como mistura, esclarecimento do autor).
- Referências: a aula entra como fonte (videoaula).
- Flashcards: 12 cartões da aula.

---

# VERSÃO 1.0


## Estrutura inicial criada


Adicionado:


- Arquitetura do módulo;
- Separação entre 3BET POT OOP e 3BET POT IP;
- Separação entre Short Stack e Deep Stack;
- Estrutura de documentação.


---

# VERSÃO 1.1


## Consolidação inicial do Guideline


Adicionado:


- Estratégias de Flop OOP Short Stack;
- Estratégias de Flop OOP Deep Stack;
- Estratégias de Turn;
- Sizes principais;
- Splits de range.


---

# VERSÃO 1.2


## Correções de estrutura


Alterado:


- Separação correta entre IP e OOP;
- Remoção de mistura entre estratégias;
- Organização conforme arquitetura da Poker Knowledge Base.


---

# VERSÃO 1.3


## Revisão de conceitos


Adicionado:


- Diferenças entre Short Stack e Deep Stack;
- Importância da posição;
- Construção de blefes com equidade;
- Importância de backdoors.


---

# VERSÃO 1.4


Data: 28/10/2026

Alteração: ordem de prioridade das fontes padronizada na ordem geral do `theory/CLAUDE.md`.

Motivo: a ordem do módulo estava invertida (correções por último).

Fonte: decisão do autor do KB.

Impacto no módulo: `08-Referencias.md` e `09-Decisoes.md` atualizados; divergência 01 das Pendências resolvida. Nenhuma regra de estratégia mudou.


---

# VERSÃO ATUAL


## Consolidado


- Estrutura do módulo definida;
- Guideline organizado;
- Arquitetura criada;
- Regras fundamentais estabelecidas.


## Em andamento


- Consolidação completa das aulas;
- Inserção dos exemplos;
- Validação dos spots no solver;
- Exercícios finais.


---

# HISTÓRICO DE DECISÕES IMPORTANTES


## Separação IP x OOP


Decisão:

Nunca utilizar estratégia de uma posição em outra.


Motivo:

As estratégias possuem objetivos e construções de range diferentes.


---

## Separação Short x Deep


Decisão:

Manter árvores independentes.


Motivo:

SPR altera construção de range, sizing e linhas futuras.


---

# FORMATO DE ATUALIZAÇÃO


Toda nova alteração deve conter:


Data:

Alteração:

Motivo:

Fonte:

Impacto no módulo:

<!-- graphify-links:start -->

---

## Ligações

_Gerado a partir do grafo do graphify. Não editar à mão: é sobrescrito na próxima geração._

**Pasta:** [[theory/08-3BET-POT/README|theory/08-3BET-POT]]

**Mesma pasta:** [[theory/08-3BET-POT/08 - 3BET POT GUIDELINE|01-Guideline]] · [[theory/08-3BET-POT/02-VideoAulas|02-VideoAulas]] · [[theory/08-3BET-POT/03-Solver|03-Solver]] · [[theory/08-3BET-POT/04-Exercicios|04-Exercicios]] · [[theory/08-3BET-POT/05-Regras-Consolidadas|05-Regras-Consolidadas]] · [[theory/08-3BET-POT/06-Pendencias|06-Pendencias]] · [[theory/08-3BET-POT/08-Referencias|08-Referencias]] · [[theory/08-3BET-POT/09-Decisoes|09-Decisoes]]

<!-- graphify-links:end -->
