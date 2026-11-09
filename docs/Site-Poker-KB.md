# Site do Poker KB

Site visual da base, na pasta `app/`. Tem três áreas: Teoria, Prática e Análise. Tema escuro com acento verde.

## Como rodar

```bash
cd app
npm install
npm run dev
```

O site usa HashRouter e `base: "./"`, então o build em `app/dist` abre de qualquer pasta.

## Stack

Vite, React 19, TypeScript estrito, Tailwind v4, shadcn/ui, react-router-dom, lucide-react. Fontes Schibsted Grotesk e Source Serif 4. As cores ficam em `app/src/index.css` (bloco `.dark`, paleta grafite, acento `#8ff0a8`).

## O que tem em cada área

- **Teoria** (`pages/teoria-index.tsx`, `teoria-15.tsx`, `data/mod15.ts`): temas agrupados em Geral, Blind war, Flop, Turn, River e 3bet pot, sem numeração. Pré-flop e PKO não aparecem para os usuários: o módulo 16 fica arquivado em `data/teoria/arquivo/`.
- **Prática** (`pages/pratica.tsx`, `components/poker/mesa.tsx`): treino de bet vs missed com mesa, hero no BTN, opener entre CO e HJ, 40bb. O RNG sorteia de 1 a 100 (`randomInt`), com botões B25, B50 e check. O tema Probe Turn (módulo 14) fica em `pages/pratica-probe.tsx` e `data/prat14.ts`: você no BB, turn definido, ações check-call, check-raise e bets de 40, 70 e 100%.
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

## Contas dos jogadores (Supabase)

Com as variáveis de ambiente preenchidas, o site pede login (e-mail e senha) antes de abrir. Todos os jogadores veem as quatro áreas; o que cada um digita fica na conta dele (stats, leaks, painel, sessões do trainer) e só ele lê, pela regra de acesso da tabela. Sem as variáveis, o site abre sem login e guarda tudo no navegador.

1. Crie um projeto grátis em supabase.com.
2. No SQL Editor, rode `docs/Supabase-Poker-KB.sql`.
3. Em Authentication, decida se exige confirmar o e-mail (padrão: exige). Para um grupo pequeno, pode desligar em Providers → Email → Confirm email.
4. Em Project Settings → API, copie a URL e a chave `anon` (pública) para `app/.env.local`, no formato de `app/.env.example`. Nunca use a `service_role`.
5. Para publicar, configure as mesmas duas variáveis no serviço de hospedagem antes do build.

Login com o Google (opcional): crie um ID de cliente OAuth (tipo "Aplicativo da Web") no Google Cloud, com o URI de redirecionamento `https://<projeto>.supabase.co/auth/v1/callback`; em Supabase → Authentication → Sign In / Providers → Google, ligue e cole o ID e a chave secreta do cliente; em URL Configuration → Redirect URLs, acrescente o endereço do site e, para testar localmente, `http://localhost:5174/`; por fim, crie `VITE_LOGIN_GOOGLE=true` em `app/.env.local` e nas variáveis do repositório (o botão só aparece com isso).

Ao entrar, o que já está na conta vale; o que só existia no aparelho sobe. Ao sair, os dados do aparelho são apagados. A chave da API do Claude e os prints ficam só no aparelho. "Meus dados" na Análise continua exportando e importando um arquivo.

## Publicar no GitHub Pages

O workflow `.github/workflows/publicar-site.yml` constrói a pasta `app/` e publica a cada merge na main. Configuração única, no GitHub:

1. Settings → Pages → Source: GitHub Actions.
2. Settings → Secrets and variables → Actions → Variables: crie `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` (a chave pública `anon`).
3. Rode o workflow uma vez (Actions → Publicar site → Run workflow). O endereço aparece no fim da execução.
4. No Supabase, em Authentication → URL Configuration, ponha o endereço do site em Site URL.

Se o repositório virar privado, o GitHub Pages deixa de servir no plano gratuito. Nesse caso use o Netlify ou o Cloudflare Pages (aceitam repositório privado): o `netlify.toml` já tem o build (`pnpm build` em `app/`, saída `dist`); crie as duas variáveis do Supabase no painel do serviço e troque o Site URL no Supabase. Desligue o workflow do GitHub Pages para não falhar.

O repositório é público: não coloque dados pessoais nele. Os dados de cada jogador ficam só na conta dele.

## Administração (uso do site)

O site registra só qual área cada jogador abre (início, teoria, prática ou análise) e quando, sem conteúdo, na tabela `eventos`. A página `/#/admin` mostra, para administradores, uma linha por usuário: e-mail, como entra, cadastro, último login e última atividade, aberturas por área e contagens do que ele registrou (treinos, leaks, semanas). Os leaks, stats e painel de cada um não aparecem. O aviso aparece na tela de login.

Para ligar: rode `docs/Supabase-Admin.sql` no SQL Editor e inclua o seu usuário em `admins` (comando no fim do arquivo). Para outro administrador, repita o `insert` com o e-mail dele. Sem o SQL, o registro de uso falha em silêncio e a página mostra "só para administradores".

## Aprovação de contas

Quem cria conta (e-mail ou Google) fica em "Aguardando aprovação" e não vê o site até um administrador liberar em `/#/admin`, na coluna Acesso: **Aprovar** libera, **Aprovado · tirar** (com confirmação) tira o acesso depois. A regra vale no servidor: conta sem aprovação não grava dados nem uso. Quem tem o acesso tirado volta para a tela de espera na próxima vez que abrir o site. Um administrador não consegue tirar o próprio acesso.

Para ligar: rode `docs/Supabase-Aprovacao.sql` no SQL Editor depois dos outros dois. As contas que já existem entram aprovadas. Mergear este código sem rodar o SQL é seguro (a tela de espera não aparece), mas o botão de aprovar só funciona depois do SQL.

## Fluxo mensal

1. Receber os prints do HUD do mês e colocar em Leaks do mês.
2. Pedir ao Claude para extrair os números (vão para `lib/hud.ts` ou para "Editar valores").
3. Conferir as cores, fixar com a estrela o que quer acompanhar e abrir a Comparação.

## Pendências

- Dúvidas da teoria para o coach: tabuleiros intermediários, limite de low board, cartas do meio em dobrado.
- Pilotos dos módulos 14 e 17.
- Rodar o SQL da tabela `relatos_erro` (fim de `docs/Supabase-Poker-KB.sql`) no SQL Editor do Supabase. Sem isso, o botão "Relatar erro" salva só no aparelho de quem relata.
- Prática: dúvidas para o coach do módulo 01 (second pair no split, trincas no check, B40 no A high) e do módulo 02 (boards de exemplo do conectado e do low seco, AA e KK no low carregado).
- Bet vs Missed: os boards 10-7-3, 10-7-5, 8-3-2 e 8-7-2 são secos (exemplos do trainer do coach, 02/11/2026). Falta registrar isso no `12-Padroes.md` do módulo 15 (dúvida 1, boards intermediários).
- Prática: second barrel do módulo 02 (e o turn depois de check-check do módulo 01), em tema separado.

## Padrão dos temas da Prática

Passo a passo para criar um tema novo: `docs/Pratica-Novo-Tema.md`.

Todo tema novo da Prática usa os mesmos blocos, para ficar igual aos outros:

- `components/poker/resposta.tsx`: `BotaoResposta` + `estadoDe` (contorno verde com selo de check no botão certo, vermelho com X no errado escolhido, os outros apagados) e `CartaoResultado` (título "CERTO" ou "ERRADO" centralizado, borda grossa e brilho na cor do resultado).
- `components/poker/mesa.tsx`: a mesa com as 8 posições, as foldadas apagadas, o herói embaixo no centro e o dealer no BTN.
- `components/poker/cards.tsx`: `RngStrip` com `rng` é a barra que enche até o número sorteado (roxo na aposta, azul no check, sem vermelho). Sem `rng` é a barra da Teoria.
- O resultado do treino mostra o tipo de board que mais errou, o desempenho por tipo e o tipo de erro.
- `components/poker/resultado-final.tsx`: `ResultadoFinal`, a tela final padrão (nota, onde mais errou, desempenho por tipo e tipo de erro).
- `components/poker/relatar-erro.tsx`: botão "Relatar erro" no canto do card de resultado, com uma aba curta para contar o erro e enviar. Salva no aparelho (`pkb:relatos`) e, com conta, manda para a tabela `relatos_erro` (SQL em `docs/Supabase-Poker-KB.sql`; você lê os relatos pelo painel do Supabase).
- Botão "Parar treino" (ao lado do "Voltar à seleção"): fecha a sessão e mostra o resultado das mãos já respondidas.
- Botão "Voltar à seleção" no topo do jogo e seletor de tema na seleção (`SeletorTema`).
- Textos em minúsculas, percentuais e tipo de board em negrito.

Temas da Prática hoje: Bet vs Missed C-Bet (`pratica.tsx`; as questões extras saem das tabelas de bucket em `data/prat15.ts`), Probe Turn (`pratica-probe.tsx`, `data/prat14.ts`) C-Bet IP Short Stack (`pratica-cbet.tsx`, `data/prat01.ts`, mesa com `cbet`) e C-Bet IP 40bb (`pratica-cbet40.tsx`, `data/prat02.ts`, só o flop, herói no HJ, CO ou BTN) e BB raised pot vs SB (`pratica-bb.tsx`, `data/prat17.ts`, herói no BB em posição, bucket por RNG pelas tabelas de split B25, B40 e B70) e C-Bet OOP 40bb (`pratica-oop.tsx`, `data/prat05.ts`, só o flop, EP ou CO contra o BTN; a resposta de cada mão sai de regras que leem os naipes, em `decidir`).

Bet vs Missed, dobrado: o treino tem o tipo dobrado (`bucketDobrado` em `data/prat15.ts`, tudo em B25). Seco (K-K-2, J-3-3, 8-8-4 e 7-7-3): full e trinca em 75% e o restante em 50%, pela tabela do guideline. Carregado (K-K-J, J-J-9, A-A-J, Q-Q-T e J-J-T): full e trinca em 50% e o restante em 25%, pela anotação do coach de 03/11/2026 (J-J-9, "50% full trinca, 25% all"), que difere do "mãos com mais equity" da tabela da teoria: a teoria precisa decidir. O K-K-7 fica de fora, porque o subtipo seco dele é inferência.

BB raised pot vs SB: revisão pelas Regras 26 a 30 da teoria (áudios do coach de 04/11/2026). Os boards que já existiam não conflitam com elas (as exceções de A high, monotone e dobrado seguem o guideline, e o Q-J-8 com flush draw segue B40 por decisão explícita do coach). Entraram T-8-4 com flush draw (B70), T-8-4 sem flush draw (B40, leitura a confirmar) e T-8-3 e T-8-2 com flush draw (B40). A regra "dois straight draws mais flush draw é B70" não virou regra de código, porque a teoria não diz quantos draws bastam nem lista os boards.

3Bet Pot do BB (`pratica-3bet.tsx`, `data/prat08.ts`, `data/ranges3bet.ts`): só o flop, do BB que deu 3-bet contra o open do BTN, com a aula "3bet pot do BB" (09/11/2026) e o guideline do módulo 08. Seletor de stack (short 25bb com 3-bet de 6bb e deep 60bb com 3-bet de 8bb, pote de 12,5bb e 16,5bb) e de tipo de board. As mãos vêm do range de 3-bet do BB contra o BTN do Poker Academy (CE-Symmetric, Regular, com qualquer frequência de raise acima de zero; o all-in não conta). O range está em `ranges3bet.ts` para 25, 30, 40, 60 e 80bb, e a Prática usa 25 e 60. O deep é 60bb porque o autor disse que 80bb é raro. Short: seco, monotone e dobrado em B25 (range), carregado em split B40 e com sequência em split all-in. Deep: seco em B25, com sequência (e K-9-7) em split B40 e Tx e Jx com flush draw em split B70. Cada mão cai em bet, check-call, check-raise (check-shove no short) ou check-fold pelas regras da aula (`decidir`), e o que a aula mistura vira "também vale". O middle stack (30 a 60bb) é uma mistura e não tem tema próprio. Ficaram de fora o turn, o SB, o IP, o 6-5-4 e o 5-4-3 (exceção da aula) e as mãos que a transcrição não deixa claras (teoria, Pendências 05 a 15 do módulo 08).

Boards do C-Bet OOP: cada textura tem o board principal e, em `outros`, boards extras tirados do arquivo de exemplos do coach (CBET OOP EXEMPLOS): K-T-6 e Q-J-6 (BBX), Q-8-4, K-8-5 e K-6-4 (K-Q high), J-6-4 e J-8-3 (J-T high) e 7-6-5 (low com sequência). Ficaram de fora os que o coach não rotulou de forma clara (8-6-4, 6-5-2 "low", J-8-7 "high conectado") e os pareados. Nos seis temas, o resultado final tem "Jogar os erros de novo" (`refazerErros`, que reaproveita `comecar`).
