# Site do Poker KB: Análise

Área Análise do site. Índice geral, como rodar e chaves de dados: `docs/Site-Poker-KB.md`.

## O que tem

- **Análise** (`pages/analise.tsx`), em quatro abas:
  - **Leaks do mês**: abre em "Prints e stats do HUD" (prints do mês e as 169 stats por seção). O botão "Ver os leaks do mês" leva à lista de leaks, separada em pré-flop e pós-flop.
    - O botão "Gerar N leaks pelas metas" cria um leak para cada stat fora da meta (vermelhas; amarelas se marcar a opção). Stats sem meta numérica ou com amostra pequena ficam de fora. Os números das stats entram de três jeitos: "Ler os prints com o Claude" (chave da API sua, guardada só no navegador em `pkb:api-key`, chamada direta à API; mostra quantas stats leu antes de aplicar), pelo Claude no chat ou por "Editar valores". O campo "Mês dos prints" aceita um mês novo, como outubro.
    - Dentro de Pré-flop e Pós-flop dá para filtrar os leaks pelas divisões da teoria (SRP como agressor, 3bet pot, Blind war etc.). A divisão é inferida pela stat e pode ser trocada em cada leak. O filtro "Mais críticas" mostra os 3 de maior desvio da fase (e da divisão escolhida).
  - **Comparação**: stats do HUD mês a mês e leaks, com as stats fixadas (estrela) primeiro.
  - **Painel semanal**: semanas, meses e comparação de períodos, com botão para salvar a semana e abrir a próxima.
    - As métricas semanais são os leaks do mês marcados em Leaks do mês (pré-flop e pós-flop) e levados com "Levar selecionados para o painel semanal" ou escolhidos em "Adicionar leaks do mês ao painel". "Encerrar o mês e começar outro" guarda as métricas e as semanas em "Ciclos anteriores" (nada é apagado, e dá para comparar em Comparar períodos) e abre um ciclo vazio para os leaks do mês seguinte. Leaks que continuam voltam na atualização mensal e entram de novo.
  - **Treino**: resultado do treino.

## Regras de exibição das stats

- O valor fica verde no alvo, amarelo perto da meta e vermelho longe. A tolerância de "perto" é por stat (padrão 2 pontos), editável em "Editar valores".
- A quantidade de mãos aparece pequena ao lado do nome da stat.
- Textos em minúsculas no meio da frase. Meses em `rotuloMes` (minúsculo) e `capitalizar` só quando o texto começa com eles.
