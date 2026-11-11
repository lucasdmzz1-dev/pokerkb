# Como criar a prática de um módulo novo

Roteiro usado no Probe Turn (módulo 14) e no C-Bet IP Short Stack (módulo 01). Siga a ordem. Para o visual e os componentes, veja "Padrão dos temas da Prática" em `docs/site/Pratica.md`.

## 1. Ler a teoria do módulo

- Pasta `theory/NN-nome-do-modulo/`: guideline, regras consolidadas, solver, videoaulas, exercícios, flashcards, pendências e decisões.
- Dados da página de Teoria em `app/src/data/teoria/modulos/mNN.ts` (ou `modNN.ts`): têm o resumo, os boards de exemplo e o id do vídeo.
- Prioridade quando as fontes divergem (ela está em `08-Referencias.md`): instrutor, solver, aula, guideline, exercícios.

## 2. Achar e ler a transcrição da aula

- O repositório não guarda a transcrição. Ela fica na pasta Downloads do usuário, com nome parecido com `Cbet IP ShortStack (transcribed on ….txt)`. Procure também o `.srt` e o id do vídeo no `mNN.ts`.
- Leia a transcrição inteira, em pedaços (é um arquivo de uma linha só). É onde estão:
  - os exemplos de mãos que o instrutor usa;
  - a resolução das dúvidas, como o B25 contra o B40;
  - as correções do que o guideline diz de forma genérica.
- Ignore a conversa fora do assunto e as partes que são de outro módulo, como o jogo deep dentro da aula de short stack.

## 3. Definir o treino antes de escrever código

- Qual é a posição do herói, o que já aconteceu (ações até aqui), o stack e o pote.
- Quais ações o botão oferece, com as teclas.
- Quais tipos de board ou de turn existem e qual é a frequência de cada um.
- A mão do herói tem que ser uma mão que ele abre (ou defende) daquela posição: use `app/src/data/ranges.ts` (`abre`, `btnPaga`, `bbPaga`). Os ranges de lá vêm do Poker Academy (Charts, ChipEV, Regular, 40bb e BTN de 20bb, lidos em 02/11/2026) e contam como "abre" ou "paga" a mão com qualquer frequência dessa ação, mesmo baixa. A mão que o site manda 100% para outra ação (fold ou 3bet) fica de fora. O EP do módulo 05 é o EP2 do site (9 jogadores).
- Cada mão precisa vir de uma categoria que a teoria ou a transcrição cita de forma explícita. Não invente mão. Confira:
  - se a mão faz o que a classe diz (par, draw, backdoor, blocker);
  - se as cartas não repetem as do board.
- Quando a teoria deixar a dúvida em aberto, não decida sozinho: use uma mão que não dependa disso e liste a dúvida para o coach no relatório.
- Se o instrutor aceitar mais de uma ação (mix de sizes), guarde em `aceita`, e a tela mostra "também vale".

## 4. Arquivos

- `app/src/data/pratNN.ts`: boards, rótulos e a lista de situações (`id`, `tipo`, `hero`, `certa`, `aceita?`, `classe`, `porque`). `porque` fala em uma frase curta, em minúsculas.
- `app/src/pages/pratica-<tema>.tsx`: copie `pratica-cbet.tsx`, que é a menor, e troque os dados, as ações e a barra de ações.
- `app/src/components/poker/mesa.tsx`: se a posição do herói ou do vilão for outra, acrescente um modo (`probe`, `cbet`) em vez de criar outra mesa. O herói fica embaixo no centro, as foldadas apagadas e o dealer no BTN.
- `app/src/pages/pratica-probe.tsx`: acrescente o tema em `Tema` e em `SeletorTema`.
- `app/src/pages/pratica.tsx`: acrescente o tema no componente `Pratica`.
- Sessões: o `modulo` é o número do módulo e o `tipo` do item é o nome legível do board ou do turn (a Análise agrupa por esse texto).

## 5. Convenções

- Texto em português, em minúsculas no meio da frase, percentuais e tipo de board em negrito (use `destacar()` de `components/poker/destacar.tsx` nas frases de explicação: ele põe em negrito os percentuais e os sizes B25, B40 e B70).
- Título "CERTO" ou "ERRADO" centralizado. O A HIGH sempre em maiúsculas (use `nomeNaFrase`).
- Nomes dos temas em maiúsculas no seletor.
- Barra do RNG sem vermelho nem verde, para não lembrar acerto e erro.
- Reuse `BotaoResposta`, `CartaoResultado`, `ResultadoFinal` e `RelatarErro`. Não copie o visual.
- Ponha o `RelatarErro` ao lado do botão "Próxima mão", com o tema, o id da questão e o contexto (board, mão, resposta e ação certa).

## 6. Conferir antes de entregar

1. `node node_modules/prettier/bin/prettier.cjs --write <arquivos>` e `node node_modules/typescript/bin/tsc -b`, os dois dentro de `app/`.
2. Abrir o site (config `app` do `.claude/launch.json`) e conferir: a mesa sem sobreposição, um acerto, um erro (selos, contornos, card), a tela final e o botão de voltar.
3. `graphify update .`.
4. Commit em português, com `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`, usando `git commit -F arquivo`. Depois abra o PR para a `main`. O merge é do usuário.

## 7. Armadilhas

- Rode os comandos dentro de `app/`. Um `cd app` repetido falha em silêncio e o script seguinte não roda.
- Arquivos grandes: escreva com a ferramenta Write. Um heredoc grande no shell pode falhar e não aplicar nada.
- Se o `origin` mudou, o `sync_with_base_branch` recusa. Crie a branch a partir de `origin/main`.
- Arquivos do `graphify-out` conflitam sempre: aceite qualquer lado e rode `graphify update .`.

## 8. O que levar no relatório final

- O PR e o que foi testado no navegador.
- As dúvidas para o coach, com a fonte de cada uma.
- O que ficou de fora de propósito (por exemplo, a parte do turn depois de check-check na aula do módulo 01).
