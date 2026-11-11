---
paths:
  - "app/src/**"
---

# Página de teoria no site (padrão)

Todo módulo que ganha página no site segue este padrão. O modelo mais completo é a página genérica (`pages/teoria-modulo.tsx`) com os módulos 01 a 13; o Multiway (m10) mostra o replay animado e o ICM (m13) a comparação de ranges. Um módulo por vez, e o merge é do dono.

**Arquivos** (em `app/src/`): módulo novo é um arquivo em `data/teoria/modulos/mNN.ts` (tipos em `data/teoria/tipos.ts`), e o `tema` precisa ser igual ao nome do cartão em `pages/teoria-index.tsx`. Os módulos 14, 15 e 17 têm página própria (`pages/teoria-NN.tsx`) e usam os mesmos blocos de `components/teoria/blocos.tsx`.

**Ordem da página:**

1. Cabeçalho com o spot e as tags. Aulas do YouTube em `videos` (lista; com mais de uma aparecem abas e um link para abrir no YouTube). Se o vídeo tiver restrição de idade, o embed não toca: avise o dono.
2. "Em 30 segundos": passo a passo, um ponto por vez, com "Ver tudo de uma vez" (também nos módulos 14, 15 e 17).
3. Contexto do módulo e "Como escolher o size": cartões com o size em etiqueta e o título em maiúsculas.
4. O núcleo, em abas (`ToggleGroup`, nomes em maiúsculas): cada aba abre com "Como pensar" e traz o board à esquerda e as faixas ou ações à direita.
5. Erros mais comuns (itens em vermelho com ✕), regras de bolso (itens em verde com ✓). Sem fonte na página: a origem fica nos arquivos de `theory/`.

**Visual:**

- Títulos de seção centralizados, cada um numa cor (azul, amarelo, rosa e branco, em ordem). Verde e vermelho só significam positivo e negativo.
- Escala de risco: branco, amarelo e vermelho (5%, 10% e 15% no ICM). Etiquetas aceitam `branco` e `amarelo`.
- Texto com destaque: `**negrito**`, `{v|verde}`, `{r|vermelho}` e `{a|amarelo}`. Sizes, porcentagens, stacks, posições, mãos e "nunca"/"sempre" ganham destaque sozinhos.
- Itens de lista sempre no formato "Título curto: detalhe." O título aparece em maiúsculas com ponto final, e o detalhe começa com maiúscula. Não coloque a frase inteira no título.
- Ações com cor pelo nome: valor em verde, bluff em amarelo, check e call em branco, check-raise e fold em vermelho. O texto da ação tem sempre o mesmo peso.
- Exemplos sempre que der: board (com turn e river quando a regra fala deles) e um par de cartas por grupo de mãos, conferido carta a carta com o board. Use primeiro os exemplos da aula (exercícios, VideoAulas, flashcards); sem exemplo na base, monte um a partir da guideline e marque o board como ilustrativo.
- Situações com vários jogadores usam a mesa no formato do replayer (`mesa` no bloco, componente `MesaTeoria`). Com `historia` (pré-flop, `mostra: "flop"`, ações e pote a cada passo), a aba vira um replay animado: uma situação por vez em abas numeradas, a mão passa ação por ação com a linha do tempo embaixo, e o quadro "Sua decisão" só aparece quando a ação chega no herói (`SituacoesMesa`). Nomes das situações no formato "Nome curto: descrição", sem repetir nomes dentro da mesma aba.
- "Sua decisão": ação centralizada, nome grande na cor da ação. Linha pura (a ação ou fold) leva `only` com a frase do que sai, como "Check-raise ou fold, sem check-call", e mostra o selo ONLY.
- Centralizado: títulos de seção, intro, abas de escolha (maiores, `h-11`), quadro "Como pensar", abas de vídeo e situações.
- Cabeçalho: o spot em maiúsculas e o botão discreto "‹ Teoria" no topo.
- Termos da aula, sem inventar expressões. Termos de poker em inglês (leak, miss value, value bet). BTN, nunca BU. Não transforme o caso de uma mão em regra geral.
- Seção `icm-ranges` compara os ranges do solver com 25% e 16% do field left (dados em `data/teoria/icm-ranges.ts`, da base em `theory/13-ICM/03-Solver-Ranges.html`).
- Módulos fora do site (PKO e pré-flop) ficam em `data/teoria/arquivo/`, fora do registro, e continuam na base.

**Módulo genérico:** um arquivo em `app/src/data/teoria/modulos/mNN.ts` basta, o registro pega sozinho (ver `registro.ts`).

**Exemplos com cartas:**

- Para cada tipo de mão (TP, SP, dois pares, draws, o restante), um par de cartas pequenas com o nome embaixo, centralizado. Cada ação ou faixa é independente: lista com `flex-wrap`, itens de largura fixa, sem colunas compartilhadas entre ações.
- Ações em maiúsculas e em cores: BET (verde), CHECK-CALL (branco) e CHECK-RAISE (vermelho).
- Quando uma faixa tem subgrupos (como seco e carregado no dobrado), cada subgrupo vira um bloco separado, com o board e o nome em negrito.
- As mãos vêm da fonte. Se for preciso criar exemplos, confira carta a carta com o board, marque como ilustrativos e pergunte ao dono quando faltar a mão de uma faixa. Não invente.

**Texto:** português, minúsculas no meio da frase, tema escuro com acento verde. Títulos de cartão em maiúsculas.

**Antes de entregar:** `prettier`, `tsc -b` em `app/`, conferir no navegador, commit e PR para `main`.
