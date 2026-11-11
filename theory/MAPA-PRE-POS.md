# Mapa da teoria — Pré-flop e Pós-flop

> Divide os módulos de `theory/` entre três chats de teoria e define como eles se ligam. Leia junto com `theory/CLAUDE.md`.

---

# Os chats

| Chat | Papel | O que edita |
|---|---|---|
| **MAIN CHAT TEORIA** | Coordena a teoria. Mantém este mapa, as regras e os índices. Resolve conflitos entre PRÉ e PÓS. | `theory/CLAUDE.md`, `theory/README.md`, `theory/MAPA-PRE-POS.md`, `theory/_TEMPLATE/`. Cria módulo novo e decide de que lado ele fica. |
| **Chat PRÉ-FLOP** | Estratégia antes do flop. | Só os módulos PRÉ (abaixo) e `theory/tools/pko/`. |
| **Chat PÓS-FLOP** | Estratégia do flop ao river. | Só os módulos PÓS (abaixo). |

Fora da teoria:

- **main chat** (do projeto): estrutura geral do repositório (`docs/00-Architecture/`).
- **Chat STATS**: `coaching/stats/` (HUD, leaks, evolução). Stats nunca mudam regra sozinhos.

---

# Módulos por chat

## PRÉ-FLOP

| Módulo | Escopo |
|---|---|
| 12 Reta Final | 3bet, shove vs open, flat, squeeze, open, blind war e 3-handed na reta final |
| 13 ICM e Risk Premium | RP, quem cobre quem, open, defesa e blind war conforme a fase |
| 16 PKO | BTN contra 1 open em PKO 50% |
| Futuros: RFI / open jam, 3bet, squeeze, defesa de BB | Fonte primária: solver (Preflop Academy, GTOWizard) |

Os módulos 12 e 13 continuam sendo lidos juntos (ver `theory/CLAUDE.md`).

## PÓS-FLOP

| Módulo | Escopo |
|---|---|
| 01 C-Bet IP Short Stack | Flop IP, 20bb |
| 02 C-Bet IP 40bb | Flop IP, 40bb |
| 03 Second Barrel IP | Turn IP |
| 04 Third Barrel e Vs Third Barrel | River |
| 05 C-Bet OOP 40bb | Flop e turn OOP |
| 06 XR Short | Check-raise, 20bb |
| 07 XR Deep | Check-raise, 40bb |
| 08 3Bet Pot | Pós-flop em pote 3betado |
| 09 Bet-Check-Bet | River após bet-check |
| 10 Multiway Pot | Pós-flop a 3 |
| 11 Value Bet Masterclass | Transversal: sizing e valor |
| 14 Probe Turn | BB no turn após check-check |
| 15 Bet vs Missed C-Bet | Flop IP quando o agressor dá check |
| 18 XC e Play River | BB no river após check-call no flop e check-check no turn |

---

# Pontes (onde PRÉ e PÓS se ligam)

| Ponte | Lado dono | O outro lado precisa saber |
|---|---|---|
| **08 3Bet Pot** | PÓS | Os ranges de 3bet e de call de 3bet vêm do PRÉ (hoje: módulo 12; futuros módulos de 3bet). |
| **10 Multiway** | PÓS | O pote nasce de um flat pré-flop (EP abre, BTN e BB pagam). Mudanças de flat no PRÉ afetam a frequência desse spot. |
| **12 Reta Final, Parte 9 (Regras 28 a 30)** | PRÉ | São regras de pós-flop da reta final (sizes, mão forte aposta). Referência cruzada com o módulo 11. |
| **13 RP em todas as streets (Regra 2)** | PRÉ | O RP também encurta calls pós-flop. Cruzamento com 05, 06, 07, 08 e 11 ainda marcado como inferência. |
| **16 PKO** | PRÉ | Calls mais largos no BTN geram potes que o pós-flop em PKO ainda não cobre. |
| **15 Bet vs Missed / 14 Probe Turn** | PÓS | Dependem do range de open e de flat (posição do opener muda a classificação do board, Regra 16 do 15). |

---

# Regras de passagem

1. **Cada chat edita só os módulos do seu lado.** Arquivos comuns ficam com o MAIN CHAT TEORIA.
2. **Mudança que toca uma ponte:** quem mudou registra um item em `06-Pendencias.md` do módulo do outro lado, com o título `Ponte PRÉ→PÓS:` ou `Ponte PÓS→PRÉ:`, dizendo o que mudou, em que módulo e em qual versão. Não edita o módulo do outro lado.
3. **Referência cruzada:** cada lado pode citar o módulo do outro (por exemplo "ver módulo 12, Regra 14"), sem copiar o conteúdo.
4. **Conflito entre os lados** (por exemplo, um range de 3bet do PRÉ que não bate com o que o 08 assume): registrar nas Pendências dos dois módulos e levar ao MAIN CHAT TEORIA, que decide com base na ordem de prioridade das fontes.
5. **Módulo novo:** é criado pelo MAIN CHAT TEORIA a partir do `_TEMPLATE`, já colocado num dos lados deste mapa. Depois o chat do lado assume.
6. **Branch e PR separados por chat.** Prefixo de branch: `theory/pre-...`, `theory/pos-...` ou `theory/main-...`.
7. **Stats, HUD e leaks** não entram em nenhum dos dois: são do chat STATS.
8. **Economia de contexto (todos os chats):** nunca reler a teoria inteira (custa ~400k tokens). Para pergunta de conteúdo, rodar `graphify query "..."` primeiro e ler só os trechos apontados. Ler um módulo por vez e só os arquivos que vão ser editados. Varredura de muitos arquivos vai para um subagente. Ao fechar um bloco de trabalho, commitar e começar uma sessão nova.
9. **Arquivo de retomada por chat:** o MAIN usa `theory/retomada-main-teoria.md`; o PRÉ usa `theory/tools/pko/retomada-pko.md` para o PKO. Cada chat atualiza o seu no fim da sessão.

---

# Mensagens iniciais

Se o `graphify` não estiver instalado na sessão (ambiente na nuvem): `uv tool install graphifyy` e `export PATH="$HOME/.local/bin:$PATH"`.

## MAIN CHAT TEORIA

```
MAIN CHAT TEORIA do Poker Knowledge Base. Sou Lucas; respostas diretas, em português, com termos de poker em inglês.
Leia só `theory/CLAUDE.md`, `theory/MAPA-PRE-POS.md` e `theory/retomada-main-teoria.md`. Não releia os módulos inteiros: use `graphify query` e leia só o que for preciso.
Hoje quero: [tarefa].
```

## Chat PRÉ-FLOP

```
Chat PRÉ-FLOP da teoria do Poker Knowledge Base. Sou Lucas; respostas diretas, em português, com termos de poker em inglês.
Leia primeiro `theory/CLAUDE.md` e `theory/MAPA-PRE-POS.md` e siga as regras deles.
Você edita só os módulos PRÉ (12, 13, 16 e futuros de RFI, 3bet e squeeze) e `theory/tools/pko/`.
Não leia a teoria inteira: use `graphify query` e leia só os arquivos do módulo de hoje que forem necessários.
Pontes com o PÓS: 08, 10, 12 Parte 9, 13 Regra 2, 16, 14 e 15. Se mudar algo que toca uma ponte, registre em `06-Pendencias.md` do módulo PÓS com o título "Ponte PRÉ→PÓS:".
Arquivos comuns (CLAUDE.md, README.md, mapa, _TEMPLATE) são do MAIN CHAT TEORIA. Stats, HUD e leaks são do chat STATS.
Hoje quero trabalhar no módulo: [nome do módulo / aula nova].
```

## Chat PÓS-FLOP

```
Chat PÓS-FLOP da teoria do Poker Knowledge Base. Sou Lucas; respostas diretas, em português, com termos de poker em inglês.
Leia primeiro `theory/CLAUDE.md` e `theory/MAPA-PRE-POS.md` e siga as regras deles.
Você edita só os módulos PÓS (01 a 11, 14 e 15).
Não leia a teoria inteira: use `graphify query` e leia só os arquivos do módulo de hoje que forem necessários.
Pontes com o PRÉ: 08, 10, 12 Parte 9, 13 Regra 2, 16, 14 e 15. Se mudar algo que toca uma ponte, registre em `06-Pendencias.md` do módulo PRÉ com o título "Ponte PÓS→PRÉ:".
Arquivos comuns (CLAUDE.md, README.md, mapa, _TEMPLATE) são do MAIN CHAT TEORIA. Stats, HUD e leaks são do chat STATS.
Hoje quero trabalhar no módulo: [nome do módulo / aula nova].
```

<!-- graphify-links:start -->

---

## Ligações

_Gerado a partir do grafo do graphify. Não editar à mão: é sobrescrito na próxima geração._

**Pasta:** [[theory/README|theory]]

**Mesma pasta:** [[theory/CLAUDE|CLAUDE]] · [[theory/retomada-main-teoria|retomada-main-teoria]]

**Módulos citados no texto:** [[theory/11-Value-Bet-Masterclass/README|11-Value-Bet-Masterclass]] · [[theory/12-RETA-FINAL/README|12-RETA-FINAL]]

<!-- graphify-links:end -->
