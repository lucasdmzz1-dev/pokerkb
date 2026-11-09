# Gera dados/call-open-btn-grades.json e grades-btn.html a partir de dados/grades-raw.txt.
# Uso (na raiz do repositório):
#   python -I theory/tools/call-open/gerar-grades.py
# grades-raw.txt: uma linha por cenário "#id[@OPENER] call/raise/allin(total) código" (sem @, o opener é MP). Código: 169 mãos na ordem do solver
# (AA, AKs, AQs, ..., linha a linha), cada mão com 6 hex (call, raise, all-in em %); "." = mão 100% fold;
# "~n~" (n em base 36) = n mãos 100% fold seguidas. Fold = 100 - call - raise - all-in.
import json, os, re

aqui = os.path.dirname(os.path.abspath(__file__))
dados = os.path.join(aqui, "dados")
R = "AKQJT98765432"
MAOS = [(R[i] + R[i]) if i == j else (R[i] + R[j] + "s") if j > i else (R[j] + R[i] + "o")
        for i in range(13) for j in range(13)]

def decodifica(cod):
    maos, i = [], 0
    while i < len(cod):
        c = cod[i]
        if c == ".":
            maos.append((0, 0, 0)); i += 1
        elif c == "~":
            j = cod.index("~", i + 1)
            maos += [(0, 0, 0)] * int(cod[i + 1:j], 36); i = j + 1
        else:
            h = cod[i:i + 6]
            maos.append((int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16))); i += 6
    assert len(maos) == 169, len(maos)
    return maos

# metadados vindos dos JSONs de resumo (só o opener MP de cada árvore)
meta = {}
for nome in ("call-open-btn-vanilla.json", "call-open-btn-pko.json"):
    with open(os.path.join(dados, nome), encoding="utf-8") as f:
        for a in json.load(f)["arvores"]:
            for c in a["cenarios"]:
                btn = a["stacks_bb"]["BTN"] if "stacks_bb" in a else a["jogadores"]["BTN"][0]
                meta[(a["arvore"], c["opener"])] = (a, c, btn)

with open(os.path.join(dados, "grades-meta-extra.json"), encoding="utf-8") as f:
    extra = json.load(f)
with open(os.path.join(dados, "grades-pct-left.json"), encoding="utf-8") as f:
    pct_left = json.load(f)  # % de field left lido na biblioteca; escopo do estudo: 20% ou mais (abaixo disso muda muito)
excluidas = []
cenarios = []
with open(os.path.join(dados, "grades-raw.txt"), encoding="utf-8") as f:
    for linha in f:
        if not linha.strip():
            continue
        chave, tot, cod = linha.split()
        id_, _, op = chave.partition("@")
        chave = id_ + "@" + (op or "MP")
        if chave in extra:  # árvore lida depois do resumo: metadados em grades-meta-extra.json
            e = extra[chave]
            a = {"arvore": id_, "tipo": "Bounty 50%" if e["tipo"] == "PKO" else "Vanilla", "fase": e["fase"]}
            c = dict(e, opener=op or "MP", rp_btn_vs_opener=e["rp"])
            btn = e["btn_bb"]
        else:
            a, c, btn = meta[(id_, op or "MP")]
        pl = pct_left.get(id_)
        if pl is None:
            pl = a.get("pct_field_left")
        if pl is not None and pl < 20:
            excluidas.append(id_ + "@" + (op or "MP") + " (" + str(pl) + "%)")
            continue
        m = decodifica(cod)
        w = [6 if len(x) == 2 else 4 if x.endswith("s") else 12 for x in MAOS]
        calc = [round(sum(wi * mi[k] for wi, mi in zip(w, m)) / 1326, 1) for k in range(3)]
        if c.get("raise_total"):  # árvore com mais de um size de 3bet: a grade separa só a primeira cor; comparo 3bet + all-in
            assert abs(calc[0] - c["call"]) <= 0.3 and abs(calc[1] + calc[2] - c["raise"] - c["allin"]) <= 0.4, (id_, calc, c)
        else:
            assert abs(calc[0] - c["call"]) <= 0.2 and abs(calc[1] - c["raise"]) <= 0.2, (id_, calc, c)
        obs = None
        if abs(calc[2] - (c.get("allin", 0) or 0)) > 0.5:
            obs = None if c.get("raise_total") else f"o resumo registra all-in {c.get('allin', 0) or 0}%, mas a grade tem {calc[2]}% (o cabeçalho do solver não fecha 100% sem ele); vale a grade"
        cenarios.append({
            "arvore": id_, "tipo": "PKO" if a["tipo"].startswith("Bounty") else "Vanilla", "fase": a["fase"],
            "faixa": "curto" if btn < 33 else "médio" if btn < 45 else "deep", "btn_bb": btn, "pct_left": pl,
            "opener": c["opener"], "opener_bb": c["opener_bb"], "open_pct": c["open_pct"],
            "relacao": c["relacao"], "rp": c["rp_btn_vs_opener"],
            "resumo": {"fold": c["fold"], "call": c["call"], "raise": c["raise"], "allin": calc[2] if obs else (c.get("allin", 0) or 0)}, "obs": obs, "origem": c.get("origem"), "erro_treino": c.get("erro_treino"), "jogadores_bounty": c.get("jogadores_bounty"),
            "call": [x[0] for x in m], "raise": [x[1] for x in m], "allin": [x[2] for x in m],
        })

saida = {
    "_nota": "Grades 13x13 do BTN contra 1 open (opener indicado em cada cenário), solver do 4BET Trainer (HRC Library), lidas em "
             "03/11/2026. Escopo: Early e Mid com 20% ou mais do field left (abaixo disso o spot muda muito e fica para outro estudo). Cada mão: % de call, 3bet (raise) e all-in; fold = 100 - soma. Ordem das mãos = ordem do "
             "solver (AA, AKs, AQs, ..., linha a linha). Conferidas contra os totais de call-open-btn-*.json (média "
             "ponderada por combos, tolerância 0,2).",
    "maos": MAOS, "cenarios": cenarios,
}
with open(os.path.join(dados, "call-open-btn-grades.json"), "w", encoding="utf-8") as f:
    json.dump(saida, f, ensure_ascii=False, separators=(",", ":"))

with open(os.path.join(aqui, "grades-btn.template.html"), encoding="utf-8") as f:
    html = f.read()
html = html.replace("/*DADOS*/null", json.dumps(saida, ensure_ascii=False, separators=(",", ":")))
with open(os.path.join(aqui, "grades-btn.html"), "w", encoding="utf-8") as f:
    f.write(html)


print(len(cenarios), "cenários; fora do escopo (<20% do field):", ", ".join(excluidas))
