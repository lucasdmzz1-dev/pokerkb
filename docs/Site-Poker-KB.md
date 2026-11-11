# Site do Poker KB

Site visual da base, na pasta `app/`. Tem três áreas: Teoria, Prática e Análise. Tema escuro com acento verde.
Detalhes por área (leia só a da tarefa):

- Teoria: `docs/site/Teoria.md`
- Prática: `docs/site/Pratica.md` (retomada: `docs/site/retomada-pratica.md`)
- Análise: `docs/site/Analise.md` (retomada: `docs/site/retomada-analise.md`)
- Supabase, publicação, administração e aprovação: `docs/site/Supabase.md`

## Como rodar

```bash
cd app
npm install
npm run dev
```

O site usa HashRouter e `base: "./"`, então o build em `app/dist` abre de qualquer pasta.

## Stack

Vite, React 19, TypeScript estrito, Tailwind v4, shadcn/ui, react-router-dom, lucide-react. Fontes Schibsted Grotesk e Source Serif 4. As cores ficam em `app/src/index.css` (bloco `.dark`, paleta grafite, acento `#8ff0a8`).

## Onde os dados ficam

Os dados são locais do navegador de cada pessoa, não do repositório. O site começa vazio: o código só tem as definições e as metas das stats. Em Análise → "Meus dados" dá para exportar e importar tudo em um arquivo (a chave da API e os prints não entram).

| Dado | Chave |
| --- | --- |
| Último treino, sessões | `pkb:last`, `pkb:sessions` |
| Leaks | `pkb:leaks` |
| Painel | `pkb:painel2` |
| Stats do HUD, fixadas, tolerância | `pkb:hud`, `pkb:hud-fixadas`, `pkb:hud-tol` |
| Chave da API (leitura dos prints) | `pkb:api-key` |
| Prints (imagens) | IndexedDB `pkb-prints` |

Arquivos principais de dados: `lib/hud.ts`, `lib/analise.ts`, `lib/painel.ts`, `lib/poker.ts`.

## Fluxo mensal

1. Receber os prints do HUD do mês e colocar em Leaks do mês.
2. Pedir ao Claude para extrair os números (vão para `lib/hud.ts` ou para "Editar valores").
3. Conferir as cores, fixar com a estrela o que quer acompanhar e abrir a Comparação.
