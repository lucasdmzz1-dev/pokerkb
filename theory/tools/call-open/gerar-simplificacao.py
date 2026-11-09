# Gera simplificacao-btn.html a partir de dados/call-open-btn-grades.json.
# Uso (na raiz do repositório):
#   python -I theory/tools/call-open/gerar-simplificacao.py
# Método: separa Vanilla e PKO e, em cada um, BTN curto (19 a 32bb), médio (33 a 44bb) e deep (45bb ou mais). No PKO deep há ainda o grupo
# "RP até -2% ou opener de 35% ou mais" (5 dos 6 cenários). Posição "i" = opener inicial (UTG, UTG1, MP, LJ), "c" = opener CO ou HJ. Por mão e por grupo guarda a média, o mínimo e o
# máximo de continuar (call + 3bet + all-in) entre as árvores do grupo e a parte de 3bet.
import json, os

aqui = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(aqui, "dados", "call-open-btn-grades.json"), encoding="utf-8") as f:
    d = json.load(f)
M, C = d["maos"], d["cenarios"]
W = [6 if len(h) == 2 else 4 if h[2:] == "s" else 12 for h in M]

def tot(c):
    return sum((a + b + e) * w for a, b, e, w in zip(c["call"], c["raise"], c["allin"], W)) / 1326

G = {}
for pos, f_pos in (("i", lambda c: c["opener"] in ("UTG", "UTG1", "MP", "LJ")), ("c", lambda c: c["opener"] in ("CO", "HJ"))):
    for t, tn in (("V", "Vanilla"), ("P", "PKO")):
        for f, fn in (("c", "curto"), ("m", "médio"), ("f", "deep")):
            cs = [c for c in C if f_pos(c) and c["tipo"] == tn and c["faixa"] == fn]
            if cs:
                G[pos + t + f] = cs
        px = [c for c in G.get(pos + "Pf", []) if c["rp"] <= -2 or c["open_pct"] >= 35]
        if t == "P" and px:
            G[pos + "Px"] = px

saida = {"maos": M, "g": {}}
for k, cs in G.items():
    t = [tot(c) for c in cs]
    hs = []
    for i in range(169):
        v = [c["call"][i] + c["raise"][i] + c["allin"][i] for c in cs]
        tb = sum(c["raise"][i] + c["allin"][i] for c in cs)
        hs.append([round(sum(v) / len(v)), min(v), max(v), round(100 * tb / sum(v)) if sum(v) else 0])
    saida["g"][k] = {"n": len(cs), "tot": [round(min(t)), round(sum(t) / len(t)), round(max(t))], "h": hs,
                     "arv": [c["arvore"] + ("@" + c["opener"] if c["opener"] != "MP" else "") for c in cs]}
with open(os.path.join(aqui, "simplificacao-btn.template.html"), encoding="utf-8") as f:
    html = f.read()
html = html.replace("/*DADOS*/null", json.dumps(saida, ensure_ascii=False, separators=(",", ":")))
with open(os.path.join(aqui, "simplificacao-btn.html"), "w", encoding="utf-8") as f:
    f.write(html)
print({k: (v["n"], v["tot"]) for k, v in saida["g"].items()})
