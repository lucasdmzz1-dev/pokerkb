import json,sys,os
# uso: python add.py "#id@OP" tipo fase btn opener_bb open_pct relacao rp fold call raise allin  (código lido de stdin)
k,tipo,fase,btn,ob,op,rel,rp,fo,ca,ra,al=sys.argv[1:13]
cod=sys.stdin.read().strip()
d=json.load(open('grades-meta-extra.json',encoding='utf-8'))
d[k]={"tipo":tipo,"fase":fase,"btn_bb":float(btn),"opener_bb":float(ob),"open_pct":float(op),"relacao":rel,"rp":float(rp),"fold":float(fo),"call":float(ca),"raise":float(ra),"allin":float(al)}
if os.environ.get("J"): d[k]["jogadores_bounty"]=os.environ["J"]
json.dump(d,open('grades-meta-extra.json','w',encoding='utf-8'),ensure_ascii=False,indent=1)
open('grades-raw.txt','a',encoding='utf-8').write(f"{k} {ca}/{ra}/{al} {cod}\n")
