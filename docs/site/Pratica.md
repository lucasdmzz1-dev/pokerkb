# Site do Poker KB: Prática

Área Prática do site. Índice geral, como rodar e chaves de dados: `docs/Site-Poker-KB.md`.

## O que tem

- **Prática** (`pages/pratica.tsx`, `components/poker/mesa.tsx`): treino de bet vs missed com mesa, hero no BTN, opener entre CO e HJ, 40bb. O RNG sorteia de 1 a 100 (`randomInt`), com botões B25, B50 e check. O tema Probe Turn (módulo 14) fica em `pages/pratica-probe.tsx` e `data/prat14.ts`: você no BB, turn definido, ações check-call, check-raise e bets de 40, 70 e 100%.

## Pendências

- Pilotos dos módulos 14 e 17.
- Prática: dúvidas para o coach do módulo 01 (second pair no split, trincas no check, B40 no A high) e do módulo 02 (boards de exemplo do conectado e do low seco, AA e KK no low carregado).
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

3Bet Pot do BB, dificuldade: cada situação tem um nível (`nivelDe` em `data/prat08.ts`). Fáceis são o range bet de qualquer mão e o check-fold de mão sem nada, médias são par e trinca no check-call, e o resto é difícil. O pool sorteia poucas fáceis (1 por board), duas médias e três difíceis por categoria, e para cada mão difícil acrescenta a "gêmea": a mesma classe de mão (K5 off, A-J suited) com o naipe do board mudando a jogada. A opção "Só decisões difíceis" fica ligada por padrão. Nas difíceis, a cota depende da ação (`cotaDe`): 1 mão para check-call e check-fold, 4 para bet e all-in e 6 para check-raise, porque o check-call e o check-fold são a maioria do range e o aluno mais erra o bet e o check-raise. A gêmea só entra se um dos lados for bet ou check-raise. Cuidado com o check-fold: mão com draw, over ou par nunca desiste sem regra explícita. No short all-in, broca com duas overcards (A-T, A-K, A-Q) vai all-in como bluff "overs e broca" da aula, e mão sem par e sem draw com duas overcards, ou com um over e backdoor de flush, sai do treino (`duvidosa` em `decidir`). Para conferir, rode a auditoria dos check-folds do pool (nenhum pode ter draw, over duplo ou mão feita). Broca no short all-in: duas overcards vai all-in; com um over, só o ás com BDFD vai all-in (A♠9♠ da aula); broca com redraw de flush e o over que não é ás dá check-call, com o check-fold também valendo, porque o solver (8-7-6, Q♦4♠) deixa a mão indiferente. Ás-alta sem par e sem draw: com T, J, Q ou K dá check-call por valor de showdown (o solver chama o A-T no Q-8-6 em mais de 80%); com 2 a 5 o solver desiste e é check-fold; com 6 a 9 a aula não diz e a mão fica fora do treino. No short (25bb), o JTs (raise 23%, all-in 77%) e o A9o (raise 7%, all-in 74%) saíram do range de 3-bet por decisão do autor, porque quase sempre vão all-in e dificilmente chegam ao flop. O J-J, o A5o e o A4o continuam, apesar de também jammarem muito.

Boards do C-Bet OOP: cada textura tem o board principal e, em `outros`, boards extras tirados do arquivo de exemplos do coach (CBET OOP EXEMPLOS): K-T-6 e Q-J-6 (BBX), Q-8-4, K-8-5 e K-6-4 (K-Q high), J-6-4 e J-8-3 (J-T high) e 7-6-5 (low com sequência). Ficaram de fora os que o coach não rotulou de forma clara (8-6-4, 6-5-2 "low", J-8-7 "high conectado") e os pareados. Nos seis temas, o resultado final tem "Jogar os erros de novo" (`refazerErros`, que reaproveita `comecar`).
