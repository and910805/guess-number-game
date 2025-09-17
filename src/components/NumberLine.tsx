import React from 'react'

interface Props {
  left: number
  right: number
  mid?: number
  min?: number
  max?: number
}

function niceStep(range: number) {
  // choose a "nice" step close to range/10 (1, 2, 5 * 10^k)
  const raw = range / 10
  const power = Math.pow(10, Math.floor(Math.log10(raw)))
  const n = raw / power
  let step
  if (n < 1.5) step = 1 * power
  else if (n < 3.5) step = 2 * power
  else if (n < 7.5) step = 5 * power
  else step = 10 * power
  return step
}

export function NumberLine({ left, right, mid, min = 1, max = 1000 }: Props) {
  const range = max - min
  const leftPct = ((left - min) / range) * 100
  const rightPct = ((right - min) / range) * 100
  const midPct = mid !== undefined ? ((mid - min) / range) * 100 : undefined

  const step = niceStep(range)
  const ticks: number[] = []
  const start = Math.ceil(min / step) * step
  for (let v = start; v <= max; v += step) ticks.push(v)

  return (
    <div className="mt-4">
      <div className="relative h-3 w-full rounded-full bg-slate-200 overflow-hidden">
        {/* active range */}
        <div
          className="absolute inset-y-0 bg-gradient-to-r from-indigo-400 to-indigo-600 transition-all duration-500"
          style={{ left: `${leftPct}%`, width: `${Math.max(0, rightPct - leftPct)}%` }}
        />
        {/* mid marker */}
        {midPct !== undefined && (
          <div
            className="absolute -top-1 bottom-0 w-[2px] bg-white shadow-[0_0_0_1.5px_#1f2937] transition-all duration-500"
            style={{ left: `${midPct}%` }}
            aria-hidden
          />
        )}
      </div>
      {/* tick labels */}
      <div className="relative mt-2 h-5">
        <div className="absolute left-0 -top-0.5 text-[10px] text-slate-500">{min}</div>
        <div className="absolute right-0 -top-0.5 text-[10px] text-slate-500">{max}</div>
        {ticks.map((t) => {
          const pct = ((t - min) / range) * 100
          return (
            <div key={t} className="absolute -translate-x-1/2 flex flex-col items-center" style={{ left: `${pct}%` }}>
              <div className="w-[1px] h-2 bg-slate-300" />
              <div className="text-[9px] text-slate-500 mt-0.5">{t}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
