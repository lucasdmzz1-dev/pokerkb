# Retomada da Análise (site)

Atualizado em 11/11/2026. Leia este arquivo no início de uma tarefa na Análise, em vez de ler `docs/site/Analise.md` inteiro. Atualize no fim da sessão.

---

## 1. O que a área tem hoje

`pages/analise.tsx` com quatro abas: Leaks do mês (prints e stats do HUD, 169 stats, geração de leaks pelas metas, filtros por divisão da teoria), Comparação (mês a mês, stats fixadas), Painel semanal (semanas, ciclos anteriores, comparar períodos) e Treino. Também há "Meus dados" (exportar e importar) e a página `/#/admin`. Detalhe de cada aba: `docs/site/Analise.md`.

## 2. Arquivos principais (`app/src/`)

- Página: `pages/analise.tsx`; admin: `pages/admin.tsx`.
- Abas e telas: `components/analise/` (`hud.tsx`, `leaks.tsx`, `leitor.tsx`, `meus-dados.tsx`, `painel.tsx`, `prints.tsx`, `secao.tsx`).
- Dados e regras: `lib/hud.ts`, `lib/analise.ts`, `lib/painel.ts`, `lib/prints.ts`, `lib/leitura.ts`, `lib/backup.ts`.
- Conta e sincronização: `lib/nuvem.ts`, `lib/sync.ts`, `lib/usuario.ts`.
- Chaves de dados (`pkb:*`): tabela em `docs/Site-Poker-KB.md`.

## 3. Pendências conhecidas

Sem pendência registrada para a Análise em `docs/Site-Poker-KB.md`, `docs/Pendencias-Teoria-Site.md` ou `docs/Pratica-Novo-Tema.md`. Stats, HUD e leaks de jogador não entram no repositório (dados ficam na conta de cada pessoa); o material de coaching fica em `coaching/stats/` (`retomada-stats.md`).

## 4. Por onde começar

- Fluxo do mês: "Fluxo mensal" em `docs/Site-Poker-KB.md`.
- Mudança numa aba: o componente dela em `components/analise/` e o `lib/` que ela usa.
- Regras de cor e meta das stats: "Regras de exibição das stats" em `docs/site/Analise.md` e `lib/hud.ts`.
- Conta, SQL e admin: `docs/site/Supabase.md`.
