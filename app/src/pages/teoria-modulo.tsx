import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import { PageHeader } from "@/components/page-header"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Cards, PlayingCard, RngStrip } from "@/components/poker/cards"
import {
  BoardExemplo,
  Etiqueta,
  Exemplo,
  Exemplos,
  Faixa,
  Intro,
  ITEM,
  Lista,
  ListaPassos,
  Nota,
  RotuloBoard,
  Secao,
  Secoes,
  TextoAcao,
  TextoMini,
  TituloMini,
  useAcento,
  Videos,
  Voltar,
} from "@/components/teoria/blocos"
import { IcmRanges } from "@/components/teoria/icm-ranges"
import { MesaTeoria } from "@/components/teoria/mesa-teoria"
import { SituacoesMesa } from "@/components/teoria/situacoes-mesa"
import { Rico } from "@/components/teoria/rico"
import { moduloPorSlug } from "@/data/teoria/registro"
import type {
  AbaT,
  AcaoT,
  CorAcao,
  CorEtiqueta,
  Etiq,
  MaoEx,
  SecaoT,
} from "@/data/teoria/tipos"
import { KEYS, writeJSON } from "@/lib/storage"
import { cn } from "@/lib/utils"

const COR_ETIQUETA: Record<CorEtiqueta, string> = {
  claro: "bg-b25",
  vermelho: "bg-b50",
  verde: "bg-primary",
  branco: "bg-foreground",
  amarelo: "bg-amber-300",
}

const COR_ACAO: Record<CorAcao, string> = {
  verde: "text-primary",
  branco: "text-foreground",
  vermelho: "text-b50",
  amarelo: "text-amber-300",
}

// A cor da ação sai do nome, para ficar igual em todos os módulos:
// valor em verde, bluff em amarelo, check e call em branco, check-raise em vermelho.
function corDaAcao(a: AcaoT): CorAcao {
  const n = a.nome.toLowerCase()
  if (/check-raise|^xr/.test(n)) return "vermelho"
  if (/fold/.test(n)) return "vermelho"
  if (/bluff|blefe/.test(n)) return "amarelo"
  if (/^check|call|paga/.test(n)) return "branco"
  if (/valor|value|^bet|aposta|3bet|4bet|shove/.test(n)) return "verde"
  return a.cor
}

function Etq({ e }: { e: Etiq }) {
  return <Etiqueta className={COR_ETIQUETA[e.cor]}>{e.texto}</Etiqueta>
}

function ListaMaos({ maos }: { maos: MaoEx[] }) {
  return (
    <Exemplos>
      {maos.map((m) => (
        <Exemplo key={m.nome} cartas={m.cartas} nome={m.nome} />
      ))}
    </Exemplos>
  )
}

// Decisão do herói no fim do replay: cada ação centralizada, com o selo ONLY
// quando ela é a única linha além do fold.
function AcoesDecisao({ acoes }: { acoes: AcaoT[] }) {
  return (
    <div className="grid gap-4">
      {acoes.map((a) => (
        <div
          key={a.nome}
          className="flex flex-col items-center gap-3 border-t pt-4 text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span
              className={cn(
                "text-2xl font-bold uppercase",
                COR_ACAO[corDaAcao(a)]
              )}
            >
              {a.nome}
            </span>
            {a.only && (
              <span className="rounded-full border border-foreground/40 px-2.5 py-0.5 text-sm font-bold tracking-wide uppercase">
                Only
              </span>
            )}
          </div>
          {a.only && (
            <p className="text-base font-semibold text-muted-foreground uppercase">
              {a.only}
            </p>
          )}
          {a.texto && (
            <p className="max-w-[60ch] text-lg leading-relaxed text-foreground/90">
              <Rico>{a.texto}</Rico>
            </p>
          )}
          {a.maos && a.maos.length > 0 && (
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-4">
              {a.maos.map((m) => (
                <Exemplo
                  key={m.nome + m.cartas.join("")}
                  cartas={m.cartas}
                  nome={m.nome}
                />
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}

function Acoes({ acoes }: { acoes: AcaoT[] }) {
  return (
    <>
      {acoes.map((a) => (
        <div
          key={a.nome}
          className="grid gap-2 border-t py-3 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-x-4"
        >
          <span
            className={cn(
              "text-lg font-bold uppercase",
              COR_ACAO[corDaAcao(a)]
            )}
          >
            {a.nome}
          </span>
          <div className="grid gap-3">
            {a.texto && <TextoAcao texto={a.texto} />}
            {a.maos && a.maos.length > 0 && <ListaMaos maos={a.maos} />}
          </div>
        </div>
      ))}
    </>
  )
}

function Abas({ abas }: { abas: AbaT[] }) {
  const [id, setId] = useState(abas[0].id)
  const aba = abas.find((a) => a.id === id) ?? abas[0]
  // No replay da mesa (Multiway) tudo fica centralizado, inclusive o "Como pensar".
  const replay = aba.blocos.every((b) => b.mesa)

  return (
    <>
      <ToggleGroup
        type="single"
        value={aba.id}
        onValueChange={(v) => v && setId(v)}
        className="mb-6 flex w-full flex-wrap justify-center gap-2.5"
        aria-label="Escolha o caso"
      >
        {abas.map((a) => (
          <ToggleGroupItem
            key={a.id}
            value={a.id}
            className={cn(ITEM, "h-11 px-5 text-base")}
          >
            {a.nome}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <Card className="rounded-[22px]">
        <CardContent className="grid gap-10 p-5 sm:p-7">
          <p
            className={cn(
              "max-w-[64ch] rounded-xl bg-primary/10 p-4 font-serif text-lg leading-relaxed",
              replay && "mx-auto text-center"
            )}
            aria-live="polite"
          >
            <strong className="mb-1 block text-sm font-bold tracking-wide text-primary uppercase">
              Como pensar
            </strong>
            <Rico>{aba.criterio}</Rico>
          </p>
          {replay ? (
            <SituacoesMesa
              key={aba.id}
              blocos={aba.blocos}
              renderAcoes={(acoes) => <AcoesDecisao acoes={acoes} />}
            />
          ) : (
            aba.blocos.map((b, i) => (
              <div
                key={b.grupo ?? b.rotulo ?? i}
                className={cn(
                  "grid gap-8",
                  b.cartas && "md:grid-cols-[minmax(0,320px)_minmax(0,1fr)]"
                )}
              >
                {b.mesa && b.grupo && (
                  <p className="text-center text-xl font-bold uppercase">
                    {b.grupo}
                  </p>
                )}
                {b.mesa && <MesaTeoria mesa={b.mesa} />}
                {b.cartas && (
                  <div className="flex flex-col items-start gap-4">
                    <Cards
                      codes={b.cartas}
                      size={b.cartas.length > 3 ? "md" : "lg"}
                    />
                    {b.turn && (
                      <div className="flex items-center gap-3">
                        <PlayingCard code={b.turn} size="lg" />
                        <RotuloBoard>turn</RotuloBoard>
                      </div>
                    )}
                    {b.rotulo && <RotuloBoard>{b.rotulo}</RotuloBoard>}
                    {b.etiqueta && <Etq e={b.etiqueta} />}
                  </div>
                )}
                <div>
                  {b.grupo && !b.mesa && (
                    <p className="pb-2 text-lg font-bold">{b.grupo}</p>
                  )}
                  {b.faixas?.map((f) => (
                    <Faixa key={`${f.p}-${f.texto}`} p={f.p}>
                      <div className="grid gap-3">
                        <TextoAcao texto={f.texto} />
                        {f.maos && f.maos.length > 0 && (
                          <ListaMaos maos={f.maos} />
                        )}
                      </div>
                    </Faixa>
                  ))}
                  {b.acoes && <Acoes acoes={b.acoes} />}
                </div>
              </div>
            ))
          )}
          {aba.nota && <Nota className="-mt-4">{aba.nota}</Nota>}
        </CardContent>
      </Card>
    </>
  )
}

function Rng() {
  const [freq, setFreq] = useState(75)
  return (
    <>
      <ToggleGroup
        type="single"
        value={String(freq)}
        onValueChange={(v) => v && setFreq(Number(v))}
        className="flex flex-wrap justify-center gap-2"
        aria-label="Frequência da mão"
      >
        {[100, 75, 50, 25].map((p) => (
          <ToggleGroupItem key={p} value={String(p)} className={ITEM}>
            {p}%
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <RngStrip bucket={freq} />
    </>
  )
}

function tomDoTitulo(t: string) {
  if (/erro|vazamento/i.test(t)) return "negativo"
  if (/regras? de bolso/i.test(t)) return "positivo"
  return "neutro"
}

function Conteudo({ s }: { s: SecaoT }) {
  const acento = useAcento()
  switch (s.tipo) {
    case "lista":
      return (
        <>
          {s.intro && <Intro>{s.intro}</Intro>}
          {s.titulo === "Em 30 segundos" ? (
            <ListaPassos itens={s.itens} board={s.board} />
          ) : (
            <Lista
              itens={s.itens}
              board={s.board}
              tom={s.tom ?? tomDoTitulo(s.titulo)}
            />
          )}
        </>
      )
    case "cartoes":
      return (
        <>
          {s.intro && <Intro>{s.intro}</Intro>}
          <div
            className={cn(
              "grid gap-3",
              s.colunas === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
            )}
          >
            {s.itens.map((c) => (
              <Card key={c.titulo} className={cn("gap-3 rounded-[14px] p-5")}>
                <span
                  className={cn("h-1 w-10 rounded-full", acento.barra)}
                  aria-hidden
                />
                <div className="flex items-center gap-3">
                  {c.etiqueta && <Etq e={c.etiqueta} />}
                  <TituloMini className={cn("uppercase", acento.texto)}>
                    {c.titulo}
                  </TituloMini>
                </div>
                {c.cartas && (
                  <BoardExemplo
                    board={{ cartas: c.cartas, turn: c.turn }}
                    size="sm"
                    centro={false}
                  />
                )}
                {c.texto && (
                  <TextoMini>
                    <Rico>{c.texto}</Rico>
                  </TextoMini>
                )}
                {c.textos && (
                  <ul
                    className={cn(
                      "grid list-disc gap-2 pl-5 text-lg text-muted-foreground",
                      acento.marca
                    )}
                  >
                    {c.textos.map((t) => (
                      <li key={t}>
                        <Rico>{t}</Rico>
                      </li>
                    ))}
                  </ul>
                )}
                {c.maos && c.maos.length > 0 && <ListaMaos maos={c.maos} />}
              </Card>
            ))}
          </div>
        </>
      )
    case "abas":
      return (
        <>
          {s.intro && <Intro>{s.intro}</Intro>}
          <Abas abas={s.abas} />
        </>
      )
    case "boards":
      return (
        <>
          {s.intro && <Intro>{s.intro}</Intro>}
          <div className="grid [grid-template-columns:repeat(auto-fill,minmax(250px,1fr))] gap-3">
            {s.itens.map((b) => (
              <Card
                key={b.cartas.join("") + b.nome}
                className="gap-3 rounded-[14px] p-5"
              >
                <Cards codes={b.cartas} size="sm" />
                <div className="flex items-center gap-2">
                  {b.etiqueta && <Etq e={b.etiqueta} />}
                  <TituloMini>{b.nome}</TituloMini>
                </div>
                {b.nota && (
                  <TextoMini>
                    <Rico>{b.nota}</Rico>
                  </TextoMini>
                )}
              </Card>
            ))}
          </div>
        </>
      )
    case "icm-ranges":
      return (
        <>
          {s.intro && <Intro>{s.intro}</Intro>}
          <IcmRanges />
        </>
      )
    case "rng":
      return (
        <>
          <Intro>
            {s.intro ??
              "Cada mão tem uma frequência de aposta. O número do RNG (1 a 100) decide: até a frequência da mão, você aposta. Depois, dá check."}
          </Intro>
          <Rng />
          {s.nota && <Nota className="mt-3">{s.nota}</Nota>}
        </>
      )
  }
}

export default function TeoriaModulo() {
  const { slug } = useParams()
  const mod = slug ? moduloPorSlug[slug] : undefined

  useEffect(() => {
    if (!mod) return
    writeJSON(KEYS.last, {
      to: `/teoria/${mod.slug}`,
      label: `${mod.nome} · Teoria`,
      verbo: "Continuar",
    })
  }, [mod])

  if (!mod) return <Navigate to="/teoria" replace />

  return (
    <main>
      <PageHeader
        title={mod.nome}
        lead={mod.spot.toUpperCase()}
        topo={<Voltar />}
      >
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {mod.tags.map((t) => (
            <Badge key={t} variant="outline">
              {t}
            </Badge>
          ))}
        </div>
        {mod.videos && <Videos videos={mod.videos} titulo={mod.nome} />}
      </PageHeader>
      <Secoes>
        {mod.secoes.map((s) => (
          <Secao key={s.titulo} titulo={s.titulo}>
            <Conteudo s={s} />
          </Secao>
        ))}
      </Secoes>
    </main>
  )
}
