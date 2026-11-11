import type { CSSProperties } from "react"
import { Flame, Spade } from "lucide-react"
import { Cards, RngPlate } from "@/components/poker/cards"
import { cn } from "@/lib/utils"

export type Pos = "UTG" | "UTG1" | "LJ" | "HJ" | "CO" | "BTN" | "SB" | "BB"
export type Opener = "HJ" | "CO"

// Ordem de ação no pré-flop.
const ORDEM: Pos[] = ["UTG", "UTG1", "LJ", "HJ", "CO", "BTN", "SB", "BB"]

// [x, y, x no celular], em % da mesa. Os assentos ficam sobre a borda do oval,
// que vai de 6% a 94% na horizontal e de 12% a 88% na vertical.
const POS_TELA: Record<Pos, [x: number, y: number, xCelular: number]> = {
  BTN: [50, 88, 50],
  SB: [18, 88, 17],
  BB: [6, 50, 7],
  UTG: [26, 12, 24],
  UTG1: [50, 12, 50],
  LJ: [74, 12, 76],
  HJ: [94, 50, 93],
  CO: [82, 88, 91],
}

const STACK = 40
const ABERTURA = 2
// Pote single raised em que SB e BB deram fold: abertura, call e os blinds mortos.
export const POTE_BB = ABERTURA * 2 + 0.5 + 1
export const STACK_EFETIVO = STACK - ABERTURA

export function tamanhoBB(fracao: number): string {
  return (Math.round(POTE_BB * fracao * 10) / 10).toString()
}

// Lugares da mesa em ordem de rotação, começando no assento de baixo.
const LUGARES: Pos[] = ["BTN", "SB", "BB", "UTG", "UTG1", "LJ", "HJ", "CO"]

// No Probe Turn e no C-Bet IP o herói senta embaixo e as demais posições giram junto.
function lugarDe(pos: Pos, heroPos: Pos, gira: boolean): Pos {
  if (!gira) return pos
  const k =
    (ORDEM.indexOf(pos) - ORDEM.indexOf(heroPos) + ORDEM.length) % ORDEM.length
  return LUGARES[k]
}

// Mesa genérica dos temas novos: herói e vilão em qualquer posição, com stacks, pote
// e o texto da ação do vilão definidos pela questão.
export interface MesaGen {
  heroPos: Pos
  vilaoPos: Pos
  stack: number
  stackHero?: number
  stackVilao?: number
  // null esconde o pote (a aula não dá o valor).
  pote: number | null
  // Esconde os stacks nos assentos.
  semStack?: boolean
  rotuloVilao: string
  // Vazio quando o vilão ainda não agiu.
  acaoVilao: string
}

function stackNaMesa(
  pos: Pos,
  opener: Pos,
  probe: boolean,
  cbet: boolean,
  heroPos: Pos,
  stackCbet: number,
  gen?: MesaGen
): number {
  if (gen) {
    if (pos === gen.heroPos) return gen.stackHero ?? gen.stack
    if (pos === gen.vilaoPos) return gen.stackVilao ?? gen.stack
    if (pos === "SB") return gen.stack - 0.5
    if (pos === "BB") return gen.stack - 1
    return gen.stack
  }
  // C-bet IP: o herói abriu 2 e o BB pagou. O SB pagou o blind morto de 0,5.
  if (cbet) {
    if (pos === heroPos || pos === "BB") return stackCbet - ABERTURA
    return pos === "SB" ? stackCbet - 0.5 : stackCbet
  }
  if (pos === opener || pos === "BTN") return STACK_EFETIVO
  if (probe && pos === "BB") return STACK_EFETIVO
  if (pos === "SB") return STACK - 0.5
  if (pos === "BB") return STACK - 1
  return STACK
}

function Ficha({
  nome,
  stack,
  acao,
  destaque,
}: {
  nome: string
  stack?: number
  acao: string
  destaque?: "abriu" | "vez"
}) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center gap-1.5 rounded-md border py-0.5 pr-0.5 pl-2 text-xs",
        destaque === "vez" && "border-primary",
        destaque === "abriu" && "border-b50"
      )}
    >
      <span className="text-muted-foreground">
        {nome}
        {stack !== undefined && (
          <b className="ml-1 font-bold text-foreground">{stack}</b>
        )}
      </span>
      <span
        className={cn(
          "rounded px-2 py-0.5 font-medium",
          destaque === "abriu"
            ? "bg-b50 text-[#1a0907]"
            : destaque === "vez"
              ? "text-primary"
              : "bg-muted text-muted-foreground"
        )}
      >
        {acao}
      </span>
    </span>
  )
}

export function BarraAcoes({
  opener,
  agora,
}: {
  opener: Opener
  agora: string
}) {
  // Folds seguidos viram uma ficha só, para a barra caber numa linha curta.
  const fichas: {
    nome: string
    stack?: number
    acao: string
    destaque?: "abriu"
  }[] = []
  let folds: Pos[] = []
  const fechaFolds = () => {
    if (folds.length === 0) return
    const nome =
      folds.length === 1 ? folds[0] : `${folds[0]} a ${folds[folds.length - 1]}`
    fichas.push({ nome, acao: "Fold" })
    folds = []
  }
  for (const p of ORDEM) {
    if (p === opener) {
      fechaFolds()
      fichas.push({
        nome: p,
        stack: STACK,
        acao: `Raise ${ABERTURA}`,
        destaque: "abriu",
      })
    } else if (p === "BTN") {
      fechaFolds()
      fichas.push({ nome: p, stack: STACK, acao: "Call" })
    } else folds.push(p)
  }
  fechaFolds()
  return (
    <div
      className="flex flex-wrap items-center gap-1.5"
      aria-label="Ações até aqui"
    >
      {fichas.map((f) => (
        <Ficha key={f.nome} {...f} />
      ))}
      <span className="px-1 text-xs text-muted-foreground">Flop</span>
      <Ficha nome={opener} stack={STACK_EFETIVO} acao="Check" />
      <Ficha nome="BTN" stack={STACK_EFETIVO} acao={agora} destaque="vez" />
    </div>
  )
}

function Assento({
  pos,
  opener,
  heroPos,
  probe,
  cbet,
  stackCbet,
  gen,
}: {
  pos: Pos
  opener: Pos
  heroPos: Pos
  probe: boolean
  cbet: boolean
  stackCbet: number
  gen?: MesaGen
}) {
  const [x, y, xm] = POS_TELA[lugarDe(pos, heroPos, probe || cbet || !!gen)]
  const heroi = pos === heroPos
  const abriu = pos === opener
  const noPote = heroi || abriu
  return (
    <div
      className={cn(
        "absolute left-(--xm) flex flex-col items-center sm:left-(--x)",
        !noPote && "opacity-30"
      )}
      style={
        {
          "--x": `${x}%`,
          "--xm": `${xm}%`,
          top: `${y}%`,
          transform: "translate(-50%, -50%)",
        } as CSSProperties
      }
    >
      <div
        className={cn(
          "grid size-(--s) place-content-center rounded-full border-2 bg-card text-center leading-tight",
          heroi && "border-primary",
          abriu &&
            "border-b50 shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-b50)_25%,transparent)]",
          !noPote && "border-border"
        )}
      >
        <span className="text-[clamp(0.6rem,1.35vw,0.95rem)] font-bold">
          {pos}
        </span>
        {!gen?.semStack && (
          <span className="text-[clamp(0.58rem,1.2vw,0.85rem)] text-muted-foreground tabular-nums">
            {stackNaMesa(pos, opener, probe, cbet, heroPos, stackCbet, gen)}
          </span>
        )}
      </div>
      {abriu && (
        <span
          className={cn(
            "absolute flex flex-col items-center gap-0.5 whitespace-nowrap",
            y > 70
              ? "bottom-full mb-1 flex-col-reverse"
              : y < 30
                ? "top-1/2 left-full ml-2 -translate-y-1/2 items-start"
                : "top-full mt-1"
          )}
        >
          <span className="rounded-full bg-b50 px-2 py-0.5 text-[clamp(0.6rem,1.05vw,0.78rem)] font-bold text-[#1a0907]">
            {gen ? gen.rotuloVilao : `${cbet ? "Pagou" : "Abriu"} ${ABERTURA}`}
          </span>
          {(!gen || gen.acaoVilao) && (
            <span className="rounded-full bg-secondary px-2 py-0.5 text-[clamp(0.6rem,1.05vw,0.78rem)] font-medium">
              {gen ? gen.acaoVilao : "Check"}
            </span>
          )}
        </span>
      )}
      {pos === "BTN" && (
        <span
          aria-label="Botão do dealer"
          className="absolute top-0 right-full mr-1 grid size-5 place-items-center rounded-full bg-white text-[11px] font-bold text-black"
        >
          D
        </span>
      )}
    </div>
  )
}

export function Mesa({
  opener,
  board,
  hero,
  roll,
  mao,
  total,
  sequencia,
  probe = false,
  cbet = false,
  heroCbet = "BTN",
  stackCbet = 20,
  gen,
}: {
  opener: Opener
  board: string[]
  hero: string[]
  roll?: number
  mao: number
  total: number
  sequencia: number
  // Probe Turn: o herói está no BB e o BTN abriu e deu check.
  probe?: boolean
  // C-bet IP short stack: o herói abriu do BTN e o BB pagou, com 20bb.
  cbet?: boolean
  // Posição do herói no C-Bet IP (HJ, CO ou BTN) e o stack inicial de todos.
  heroCbet?: Pos
  stackCbet?: number
  gen?: MesaGen
}) {
  const vilao: Pos = gen ? gen.vilaoPos : probe ? "BTN" : cbet ? "BB" : opener
  const heroPos: Pos = gen
    ? gen.heroPos
    : probe
      ? "BB"
      : cbet
        ? heroCbet
        : "BTN"
  const estilo = { "--s": "clamp(40px, 7.2vw, 66px)" } as CSSProperties
  return (
    <div className="mx-auto w-full max-w-[880px]" style={estilo}>
      <div className="mb-2 flex items-center justify-between">
        {roll !== undefined ? (
          <RngPlate
            value={roll}
            className="min-w-0 border-[3px] px-3 py-0.5 text-[clamp(1.4rem,3vw,2rem)]"
          />
        ) : (
          <span />
        )}
        <div className="flex items-center gap-4 text-sm text-muted-foreground tabular-nums">
          <span className="flex items-center gap-1.5" title="Acertos seguidos">
            <Flame className="size-4" aria-hidden="true" />
            {sequencia}
          </span>
          <span
            className="flex items-center gap-1.5"
            title="Progresso do treino"
          >
            <Spade className="size-4" aria-hidden="true" />
            {mao} / {total}
          </span>
        </div>
      </div>

      <div
        className="relative mb-5 aspect-[1.25/1] w-full sm:aspect-[2.2/1]"
        role="group"
        aria-label={`Mesa: herói no ${heroPos} contra ${vilao}${gen ? (gen.pote === null ? "" : `, pote de ${gen.pote} bb`) : `, pote de ${probe || cbet ? 4.5 : POTE_BB} bb`}`}
      >
        <div
          className="absolute inset-x-[6%] inset-y-[12%] rounded-[999px] border-2 border-felt-line bg-felt/50"
          aria-hidden="true"
        />

        {ORDEM.map((p) => (
          <Assento
            key={p}
            pos={p}
            opener={vilao}
            heroPos={heroPos}
            probe={probe}
            cbet={cbet}
            stackCbet={stackCbet}
            gen={gen}
          />
        ))}

        <div className="absolute top-[47%] left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5">
          <Cards codes={board} size="mesa" />
          {gen?.pote !== null && (
            <p className="text-center text-[clamp(0.75rem,1.6vw,1.05rem)] leading-tight">
              <span className="text-muted-foreground">Pote </span>
              <b className="tabular-nums">
                {gen ? gen.pote : probe || cbet ? 4.5 : POTE_BB} bb
              </b>
            </p>
          )}
        </div>

        <div
          className={cn(
            "absolute -translate-y-1/2",
            "top-[88%] left-[calc(50%+var(--s)/2+8px)]"
          )}
        >
          <Cards codes={hero} size="mesaHero" />
        </div>
      </div>
    </div>
  )
}
