# Retomada da Prática (site)

Atualizado em 11/11/2026. Leia este arquivo no início de uma tarefa na Prática, em vez de ler `docs/site/Pratica.md` inteiro. Atualize no fim da sessão.

---

## 1. O que a área tem hoje

Sete temas, só do flop (Probe Turn também tem o turn). Visual e botões padrão estão em `docs/site/Pratica.md` ("Padrão dos temas da Prática").

| Tema | Módulo | Página | Dados |
|---|---|---|---|
| Bet vs Missed C-Bet | 15 | `pratica.tsx` | `prat15.ts` |
| Probe Turn | 14 | `pratica-probe.tsx` | `prat14.ts` |
| C-Bet IP Short Stack | 01 | `pratica-cbet.tsx` | `prat01.ts` |
| C-Bet IP 40bb | 02 | `pratica-cbet40.tsx` | `prat02.ts` |
| BB raised pot vs SB | 17 | `pratica-bb.tsx` | `prat17.ts` |
| C-Bet OOP 40bb | 05 | `pratica-oop.tsx` | `prat05.ts` |
| 3Bet Pot do BB | 08 | `pratica-3bet.tsx` | `prat08.ts`, `ranges3bet.ts` |

## 2. Arquivos principais (`app/src/`)

- Páginas: `pages/pratica*.tsx`. Dados: `data/prat*.ts`.
- Componentes: `components/poker/` (`mesa.tsx`, `resposta.tsx`, `cards.tsx`, `resultado-final.tsx`, `relatar-erro.tsx`).
- Sessões e relatos: `lib/poker.ts`, `lib/relatos.ts`.

## 3. Pendências conhecidas

Fonte: seção "Pendências" de `docs/site/Pratica.md`.

- Dúvidas para o coach do módulo 01 (second pair no split, trincas no check, B40 no A high) e do módulo 02 (boards de exemplo do conectado e do low seco, AA e KK no low carregado).
- Second barrel do módulo 02 (e o turn depois de check-check do módulo 01), em tema separado.
- Pilotos dos módulos 14 e 17 (registrado assim no doc original).
- Dobrado no Bet vs Missed: a teoria precisa decidir entre a tabela e a anotação do coach de 03/11/2026.
- 3Bet Pot do BB: ficaram de fora o turn, o SB, o IP e as mãos que a aula não deixa claras (teoria, Pendências 05 a 15 do módulo 08).

## 4. Por onde começar

- Tema novo: `docs/Pratica-Novo-Tema.md` (roteiro) e o tema mais parecido em `pages/pratica-*.tsx`.
- Ajuste em tema existente: só a página e o `prat*.ts` dele, e o parágrafo do tema em `docs/site/Pratica.md`.
- Regra de teoria muda por correção do coach ou solver, não pelo código da Prática.
