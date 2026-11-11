## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- When graphify-out/graph.json exists, run `graphify query "<question>"` before your first grep, search or source-file read for a codebase question, and put this rule in every subagent prompt that explores code. Read raw files only for lines the graph or an earlier read already located. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
- A committed graphify-out/graph.json is rewritten whole on every build, so a large diff to it in a pull request is expected. Do not flag it as churn or suggest skipping the graph rebuild or its hooks.

## Site

O site visual da base fica em `app/`. Veja `docs/Site-Poker-KB.md` (índice) para rodar, chaves de dados e o fluxo mensal; o detalhe de cada área fica em `docs/site/`.

## Economia de limite

- Resposta curta: resultado primeiro, sem recapitular o pedido nem repetir o que está nos arquivos. Sem resumo longo no fim.
- Leia só o que a tarefa pede, por trecho (offset e limit). Não releia arquivo já lido na conversa.
- Uma tarefa por chat. Tarefa nova e sem relação: sugira abrir um chat novo em vez de continuar num chat longo.
- Print do navegador só em mudança visual, e um só. Para conferir texto e estrutura, use leitura da página.
- Trabalho mecânico vai para agente barato: `kb-busca` (achar), `kb-checagem` (prettier e tsc), `kb-site` e `kb-teoria` (tarefa bem definida de uma área), `pko-stats`.
- Skills de design e animação só rodam quando o dono digita `/nome` (impeccable, ui-ux-pro-max, animate etc.).

## Onde começar

| Trabalho | Leia primeiro |
| --- | --- |
| Módulo de teoria | `theory/CLAUDE.md` e só o módulo do dia |
| Coordenação da teoria | `theory/retomada-main-teoria.md` |
| Site: Teoria | `docs/site/Teoria.md`; o padrão da página carrega sozinho em `app/src/` |
| Site: Prática | `docs/site/retomada-pratica.md` |
| Site: Análise | `docs/site/retomada-analise.md` |
| Site: Supabase, publicação, admin | `docs/site/Supabase.md` |
| Site: rodar, chaves de dados | `docs/Site-Poker-KB.md` (índice) |
| Prática de módulo novo | `docs/Pratica-Novo-Tema.md` |
| PKO e stats | agente `pko-stats` |
