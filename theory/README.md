# Teoria — Poker Knowledge Base

**Atualizado em:** 28/10/2026

Teoria de torneio (ChipEV, foco em 20-40bb, formato Bounty/KO), um módulo por tema. As regras de trabalho estão em `theory/CLAUDE.md`, e a divisão entre os chats PRÉ e PÓS está em `theory/MAPA-PRE-POS.md`.

---

# Módulos

| Mód. | Pasta | Lado | Status |
|---|---|---|---|
| 01 | `01-CBet-IP-Short-Stack/` (C-Bet IP 20bb) | PÓS | Conteúdo ok; arquivos precisam de limpeza (duplicatas e restos `oaicite`) |
| 02 | `02-CBet-IP-40bb/` | PÓS | Tabelas por posição; faltam exercícios e decisões |
| 03 | `03-Second-Barrel-IP/` | PÓS | Completo; `README.md` vazio |
| 04 | `04-Third-Barrel-e-vs-Third-Barrel/` | PÓS | Completo (MDF); restos `oaicite`; ligar ao 11 |
| 05 | `05-CBet-OOP-40bb/` (inclui Second Barrel OOP) | PÓS | Flop completo; turn só com valor |
| 06 | `06-XR-SHORT/` | PÓS | Completo (usa "Lei NN") |
| 07 | `07-XR-DEEP/` | PÓS | Completo; pendências vazias |
| 08 | `08-3BET-POT/` | PÓS (ponte) | OOP ok; parte IP quase vazia |
| 09 | `09-BET-CHECK-BET/` | PÓS | Guideline e 6 exercícios; falta solver |
| 10 | `10-MULTIWAY-POT/` | PÓS (ponte) | Guideline bom; faltam solver e exercícios |
| 11 | `11-Value-Bet-Masterclass/` | PÓS (transversal) | 13 regras; faltam solver, exercícios e links com 01-10 |
| 12 | `12-RETA-FINAL/` | PRÉ | 31 regras, 50 exercícios; lido junto com o 13 |
| 13 | `13-ICM/` (ICM e Risk Premium) | PRÉ | 31 regras, 27 exercícios; telas pendentes |
| 14 | `14-Probe-Turn/` | PÓS | Finalizado |
| 15 | `15-Bet-vs-Missed/` | PÓS | Finalizado |
| 16 | `16-PKO/` | PRÉ | v1.2, regra v3 (170 mãos); arquivos de trabalho em `tools/pko/` |
| 18 | `18-XC-Play-River/` | PÓS | v1.0: guideline, aula, 17 regras e 11 exercícios; faltam solver e Prática |

O detalhe do que falta em cada módulo está no `06-Pendencias.md` dele e em `theory/retomada-main-teoria.md`.

---

# Outras pastas

- `_TEMPLATE/` — esqueleto de módulo (10 arquivos). Copie para criar um módulo novo.
- `tools/pko/` — estudo PKO em andamento (regra viva, mãos jogadas, árvores do solver).

---

# Padrão de módulo

`README.md`, `01-Guideline.md`, `02-VideoAulas.md`, `03-Solver.md`, `04-Exercicios.md`, `05-Regras-Consolidadas.md`, `06-Pendencias.md`, `07-Changelog.md`, `08-Referencias.md` e `09-Decisoes.md`. Função e convenções de cada um em `theory/CLAUDE.md`.

---

# Como colar uma aula nova

1. Abra o chat do lado do módulo (PRÉ ou PÓS) com a mensagem inicial de `theory/MAPA-PRE-POS.md`.
2. Diga o módulo de destino (ou peça um módulo novo ao MAIN CHAT TEORIA, que copia o `_TEMPLATE/`).
3. Cole a transcrição (.txt), a legenda (.srt) e, se houver, o guideline e as telas.
4. O chat segue "Como processar uma aula nova" do `theory/CLAUDE.md`, trabalha numa branch `theory/pre-...` ou `theory/pos-...` e abre um PR para revisão.

<!-- graphify-links:start -->

---

## Ligações

_Gerado a partir do grafo do graphify. Não editar à mão: é sobrescrito na próxima geração._

**Pasta:** [[README|Início]]

**Nesta pasta:**

- [[theory/01-CBet-IP-Short-Stack/README|01-CBet-IP-Short-Stack]]
- [[theory/02-CBet-IP-40bb/README|02-CBet-IP-40bb]]
- [[theory/03-Second-Barrel-IP/03 - SECOND BARREL IP GUIDELINE|03-Second-Barrel-IP]]
- [[theory/04-Third-Barrel-e-vs-Third-Barrel/README|04-Third-Barrel-e-vs-Third-Barrel]]
- [[theory/05-CBet-OOP-40bb/README|05-CBet-OOP-40bb]]
- [[theory/06-XR-SHORT/README|06-XR-SHORT]]
- [[theory/07-XR-DEEP/README|07-XR-DEEP]]
- [[theory/08-3BET-POT/README|08-3BET-POT]]
- [[theory/09-BET-CHECK-BET/README|09-BET-CHECK-BET]]
- [[theory/10-MULTIWAY-POT/README|10-MULTIWAY-POT]]
- [[theory/11-Value-Bet-Masterclass/README|11-Value-Bet-Masterclass]]
- [[theory/12-RETA-FINAL/README|12-RETA-FINAL]]
- [[theory/13-ICM/README|13-ICM]]
- [[theory/14-Probe-Turn/README|14-Probe-Turn]]
- [[theory/15-Bet-vs-Missed/README|15-Bet-vs-Missed]]
- [[theory/16-PKO/README|16-PKO]]
- [[theory/18-XC-Play-River/README|18-XC-Play-River]]
- [[theory/CLAUDE|CLAUDE]]
- [[theory/MAPA-PRE-POS|MAPA-PRE-POS]]
- [[theory/_TEMPLATE/01-Guideline|_TEMPLATE/01-Guideline]]
- [[theory/_TEMPLATE/02-VideoAulas|_TEMPLATE/02-VideoAulas]]
- [[theory/_TEMPLATE/03-Solver|_TEMPLATE/03-Solver]]
- [[theory/_TEMPLATE/04-Exercicios|_TEMPLATE/04-Exercicios]]
- [[theory/_TEMPLATE/05-Regras-Consolidadas|_TEMPLATE/05-Regras-Consolidadas]]
- [[theory/_TEMPLATE/06-Pendencias|_TEMPLATE/06-Pendencias]]
- [[theory/_TEMPLATE/07-Changelog|_TEMPLATE/07-Changelog]]
- [[theory/_TEMPLATE/08-Referencias|_TEMPLATE/08-Referencias]]
- [[theory/_TEMPLATE/09-Decisoes|_TEMPLATE/09-Decisoes]]
- [[theory/_TEMPLATE/README|_TEMPLATE/README]]
- [[theory/retomada-main-teoria|retomada-main-teoria]]
- [[theory/tools/pko/pko-arvores-dicionario|tools/pko/pko-arvores-dicionario]]
- [[theory/tools/pko/pko-conhecimento|tools/pko/pko-conhecimento]]
- [[theory/tools/pko/pko-maos-dicionario|tools/pko/pko-maos-dicionario]]
- [[theory/tools/pko/pko-solver-playbook|tools/pko/pko-solver-playbook]]
- [[theory/tools/pko/regras-vivas-pko-btn|tools/pko/regras-vivas-pko-btn]]
- [[theory/tools/pko/retomada-pko|tools/pko/retomada-pko]]

<!-- graphify-links:end -->
