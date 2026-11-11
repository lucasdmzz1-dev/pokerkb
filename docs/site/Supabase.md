# Site do Poker KB: Supabase, publicação e administração

Contas, SQL, variáveis de ambiente, publicação, administração e aprovação. Índice geral: `docs/Site-Poker-KB.md`.

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

## Pendências

- Rodar o SQL da tabela `relatos_erro` (fim de `docs/Supabase-Poker-KB.sql`) no SQL Editor do Supabase. Sem isso, o botão "Relatar erro" salva só no aparelho de quem relata.
