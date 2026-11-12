# Gera resumo-call-open-btn.md a partir dos JSONs em dados/.
# Uso (na raiz do repositório):
#   python -I theory/tools/call-open/consolidar.py theory/tools/call-open/dados theory/tools/call-open/resumo-call-open-btn.md
# A seção "Leituras da amostra" no fim é texto escrito à mão sobre os dados de 03/11/2026: releia ao mudar os JSONs.
import json, sys
from statistics import mean

base = sys.argv[1]
saida = sys.argv[2]

def fmt(x, casas=1):
    return f"{x:.{casas}f}".replace(".", ",")

def carrega(nome):
    with open(f"{base}/{nome}", encoding="utf-8") as f:
        return json.load(f)

dados = {"Vanilla": carrega("call-open-btn-vanilla.json"), "PKO (Bounty 50%)": carrega("call-open-btn-pko.json")}

def grupo_fase(f):
    return {"Early": "Early", "Mid": "Mid", "Bubble": "Bubble"}.get(f, "Late e mesa final")

def faixa(bb):
    if bb <= 25:
        return "shallow (até 25bb)"
    if bb <= 45:
        return "médio (25 a 45bb)"
    return "fundo (mais de 45bb)"

FASES = ["Early", "Mid", "Bubble", "Late e mesa final"]
FAIXAS = ["shallow (até 25bb)", "médio (25 a 45bb)", "fundo (mais de 45bb)"]
RELS = ["cobre", "similar", "coberto"]

linhas = []  # todos os cenários achatados
for tipo, d in dados.items():
    for a in d["arvores"]:
        btn = a["stacks_bb"]["BTN"] if "stacks_bb" in a else a["jogadores"]["BTN"][0]
        for c in a["cenarios"]:
            linhas.append({
                "tipo": tipo, "arvore": a["arvore"], "fase_orig": a["fase"], "fase": grupo_fase(a["fase"]),
                "mesa": a["mesa"], "btn": btn, "faixa": faixa(btn), **c,
            })

out = []
w = out.append

w("# BTN contra 1 open — resumo consolidado (Vanilla e PKO)")
w("")
w("> Gerado por script a partir de `dados/call-open-btn-vanilla.json` e `dados/call-open-btn-pko.json`. Não edite as tabelas à mão: refaça a partir dos JSONs.")
w("")
w("## Como ler")
w("")
w("- **Fonte:** solver do 4BET Trainer (HRC Library), lido em 03/11/2026. Só mesas de 8 ou 9 jogadores e opens que não sejam RAISE 3 (RAISE 2 e 2,1 a 2,3 entram).")
w("- **Cenário:** o BTN contra o open de uma posição inicial (UTG1 a MP na maioria; algumas árvores trazem LJ, HJ e CO). O que importa é o **% de open** do opener, lido no nó dele antes de abrir; a posição é só informação.")
w("- **Faixa do BTN:** shallow até 25bb, médio de 25 a 45bb, fundo acima de 45bb.")
w("- **Relação:** opener ÷ BTN em stack. *Cobre* (o BTN cobre o opener) abaixo de 0,8; *similar* de 0,8 a 1,3; *coberto* acima de 1,3.")
w("- **Fase:** como a biblioteca classifica (Early, Mid, Bubble, Late). \"Late e mesa final\" junta Late, Semi FT e Mesa Final.")
w("- **Células:** `call% (+all-in%) [open% | RP | #árvore]`. Todas as porcentagens são do range do BTN. Sem all-in quando ele é 0.")
w("- **Amostra:** em geral uma árvore por célula. Os números dão tendência, não regra.")
w("")

def celula(items):
    if not items:
        return "—"
    partes = []
    for c in items:
        t = f"{fmt(c['call'])}%"
        if c.get("allin", 0) >= 0.5:
            t += f" (+{fmt(c['allin'])})"
        t += f" [{fmt(c['open_pct'],0)}% \\| RP {c['rp_btn_vs_opener']:+.1f}".replace(".", ",") + f" \\| {c['arvore']}]"
        partes.append(t)
    return "<br>".join(partes)

for tipo in dados:
    w(f"## {tipo}")
    w("")
    w("Call do BTN por fase, faixa de stack e relação com o opener.")
    w("")
    w("| Fase | BTN | BTN cobre | Similar | Coberto |")
    w("|---|---|---|---|---|")
    for fase in FASES:
        for fx in FAIXAS:
            cel = []
            for r in RELS:
                its = [c for c in linhas if c["tipo"] == tipo and c["fase"] == fase and c["faixa"] == fx and c["relacao"] == r]
                cel.append(celula(its))
            w(f"| {fase} | {fx} | " + " | ".join(cel) + " |")
    w("")

# médias
w("## Médias por faixa e tipo")
w("")
w("Call médio do BTN (todas as relações e fases juntas) e a média do all-in.")
w("")
w("| Tipo | Faixa | Cenários | Call médio | All-in médio | 3bet médio |")
w("|---|---|---|---|---|---|")
for tipo in dados:
    for fx in FAIXAS:
        its = [c for c in linhas if c["tipo"] == tipo and c["faixa"] == fx]
        if its:
            w(f"| {tipo} | {fx} | {len(its)} | {fmt(mean(c['call'] for c in its))}% | {fmt(mean(c.get('allin',0) for c in its))}% | {fmt(mean(c['raise'] for c in its))}% |")
w("")

w("## Call médio por fase e tipo (BTN médio e fundo, 25bb ou mais)")
w("")
w("| Tipo | Fase | Cenários | Call médio |")
w("|---|---|---|---|")
for tipo in dados:
    for fase in FASES:
        its = [c for c in linhas if c["tipo"] == tipo and c["fase"] == fase and c["btn"] > 25]
        if its:
            w(f"| {tipo} | {fase} | {len(its)} | {fmt(mean(c['call'] for c in its))}% |")
w("")

w("## Efeito do RP (BTN com mais de 25bb)")
w("")
w("| Tipo | RP do BTN contra o opener | Cenários | Call médio |")
w("|---|---|---|---|")
buckets = [("abaixo de 0", lambda x: x < 0), ("0 a +5", lambda x: 0 <= x <= 5), ("acima de +5", lambda x: x > 5)]
for tipo in dados:
    for nome, f in buckets:
        its = [c for c in linhas if c["tipo"] == tipo and c["btn"] > 25 and f(c["rp_btn_vs_opener"])]
        if its:
            w(f"| {tipo} | {nome} | {len(its)} | {fmt(mean(c['call'] for c in its))}% |")
w("")

w("## Efeito do % de open (BTN com mais de 25bb)")
w("")
w("| Tipo | Open % do opener | Cenários | Call médio |")
w("|---|---|---|---|")
ob = [("até 15%", lambda x: x <= 15), ("15% a 20%", lambda x: 15 < x <= 20), ("20% a 25%", lambda x: 20 < x <= 25), ("acima de 25%", lambda x: x > 25)]
for tipo in dados:
    for nome, f in ob:
        its = [c for c in linhas if c["tipo"] == tipo and c["btn"] > 25 and f(c["open_pct"])]
        if its:
            w(f"| {tipo} | {nome} | {len(its)} | {fmt(mean(c['call'] for c in its))}% |")
w("")

w("## Efeito da relação de stack (BTN com mais de 25bb)")
w("")
w("| Tipo | Relação | Cenários | Call médio |")
w("|---|---|---|---|")
for tipo in dados:
    for r in RELS:
        its = [c for c in linhas if c["tipo"] == tipo and c["btn"] > 25 and c["relacao"] == r]
        if its:
            w(f"| {tipo} | {r} | {len(its)} | {fmt(mean(c['call'] for c in its))}% |")
w("")

w("## Células sem dado")
w("")
for tipo in dados:
    falta = []
    for fase in FASES:
        for fx in FAIXAS:
            for r in RELS:
                if not any(c["tipo"] == tipo and c["fase"] == fase and c["faixa"] == fx and c["relacao"] == r for c in linhas):
                    falta.append(f"{fase}, {fx}, {r}")
    w(f"- **{tipo}:** " + ("; ".join(falta) if falta else "nenhuma"))
w("")

w("## Árvores descartadas")
w("")
for tipo, d in dados.items():
    w(f"- **{tipo}:** " + "; ".join(f"{k} ({v})" for k, v in d.get("_descartadas", {}).items()))
w("")

total = len(linhas)
n_arv = sum(len(d["arvores"]) for d in dados.values())
w("## Totais")
w("")
w(f"- {n_arv} árvores e {total} cenários (Vanilla: {sum(1 for c in linhas if c['tipo']=='Vanilla')}; PKO: {sum(1 for c in linhas if c['tipo']!='Vanilla')}).")
w("")

w("## Leituras da amostra (inferência, não regra)")
w("")
w("> Escritas em 03/11/2026 sobre os dados atuais. Cada célula tem em geral uma árvore, então valem como indicação. Se os JSONs mudarem, releia antes de usar.")
w("")
w("1. **Shallow (até 25bb):** o BTN quase não paga (call médio de 2,7% no Vanilla e 3,4% no PKO) e dá all-in em 6% a 7% das mãos, em média. Nenhuma árvore mostrou call largo com stack curto, nem no PKO.")
w("2. **Médio e fundo:** o call médio é de 10,0% (médio) e 13,9% (fundo) no Vanilla, e de 15,1% e 20,3% no PKO. O PKO fica 5 a 6 pontos acima.")
w("3. **Fase:** o call cai do Early para o Late e a mesa final, de 13,0% para 9,6% no Vanilla e de 20,0% para 15,4% no PKO (BTN com mais de 25bb). A Bubble fica no meio (13,2% no Vanilla, 15,2% no PKO).")
w("4. **RP:** no PKO, com RP acima de +5 o call médio é de 13,1%, contra cerca de 19% com RP menor. No Vanilla o RP quase não separou (12,1% com RP de 0 a +5 contra 11,0% acima de +5), e não há árvore Vanilla com RP negativo.")
w("5. **% de open:** no PKO o call sobe junto com o open do opener, de 12,8% (open até 15%) para 22,1% (open acima de 25%). No Vanilla a ordem não é monótona (9,8%, 12,4%, 9,0%, 14,0%), com poucas árvores por faixa.")
w("6. **Relação de stack:** no Vanilla o BTN que cobre o opener paga um pouco menos (10,4%) que o similar e o coberto (12,7% e 12,3%). No PKO a relação não mostrou efeito (17,6%, 17,7% e 17,8%).")
w("7. **Buracos que não achei no solver:** com mesa de 8 ou 9 jogadores e open diferente de 3bb não apareceu árvore de Bubble com BTN acima de 45bb nas relações similar e coberto (Vanilla) nem coberto (PKO).")
w("")

with open(saida, "w", encoding="utf-8") as f:
    f.write("\n".join(out))
print(total, n_arv)
