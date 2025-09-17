import { useState } from 'react'
import RandomGuessGame from './components/RandomGuessGame'
import BinarySearchDemo from './components/BinarySearchDemo'

const RANGE_PRESETS = [100, 1000, 10000]

// 簽名圖元件（不要 default）
function SignatureWatermark() {
  return (
    <img
      src="/signature.png"
      alt="signature watermark"
      className="pointer-events-none select-none fixed right-6 bottom-6 h-12 md:h-16 opacity-20 rotate-[-8deg]"
      aria-hidden
      draggable={false}
    />
  )
}

export default function App() {
  const [maxSel, setMaxSel] = useState<number>(1000) // 預設 1–1000
  const MIN = 1
  const MAX = maxSel

  return (
    <div className="container-nice py-10">
      {/* 頁首 */}
      <header className="mb-10">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            猜數字小遊戲 <span className="badge ml-2">亂猜 vs. 二分法</span>
          </h1>

          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-600">範圍</label>
            <select
              value={maxSel}
              onChange={(e) => setMaxSel(parseInt(e.target.value))}
              className="input w-36"
            >
              {RANGE_PRESETS.map(v => (
                <option key={v} value={v}>
                  {MIN}–{v}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="mt-3 text-base text-slate-600">
          透過兩種方法的即時對比，讓學生直覺理解「為什麼二分搜尋更快」。可切換範圍觀察步數差異（理論上限 ≈ ⌈log₂(N)⌉）。
        </p>
      </header>

      {/* 主內容 */}
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        <section className="card min-h-[420px]">
          <RandomGuessGame min={MIN} max={MAX} />
        </section>
        <section className="card min-h-[420px]">
          <BinarySearchDemo min={MIN} max={MAX} />
        </section>
      </main>

      {/* 頁尾 */}
      <footer className="mt-12 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Guess Number Demo · Built with React + Tailwind
      </footer>

      {/* 固定右下角簽名圖 */}
      <SignatureWatermark />
    </div>
  )
}
