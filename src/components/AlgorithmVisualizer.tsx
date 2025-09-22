// src/components/AlgorithmVisualizer.tsx
import { useMemo, useState } from 'react'

type Phase = 'choose-mid' | 'show-mid' | 'done'
type Status = 'searching' | 'found' | 'not-found'

function genSorted(len: number, maxVal = 50) {
  const arr = Array.from({ length: len }, () => Math.floor(Math.random() * maxVal) + 1)
  arr.sort((a, b) => a - b) // 允許重複，跟示意圖一致
  return arr
}

export default function AlgorithmVisualizer() {
  // ---- 可調參數 ----
  const [len, setLen] = useState<number>(15) // 你也可改成 10 以符合課堂需求
const [arr, setArr] = useState<number[]>(() => genSorted(15))
const [target, setTarget] = useState<number>(() => {
  const a = genSorted(15)
  return a[Math.floor(Math.random() * a.length)]
})


  // ---- 二分狀態 ----
  const [low, setLow] = useState<number>(0)
  const [high, setHigh] = useState<number>(arr.length - 1)
  const [mid, setMid] = useState<number | null>(null)
  const [phase, setPhase] = useState<Phase>('choose-mid')
  const [status, setStatus] = useState<Status>('searching')
  const [steps, setSteps] = useState<number>(0)

  // 重置但維持同一份資料與目標
  function reset() {
    setLow(0)
    setHigh(arr.length - 1)
    setMid(null)
    setPhase('choose-mid')
    setStatus('searching')
    setSteps(0)
  }

  // 重新隨機一組資料
  function randomizeData(nextLen = len) {
	  const a = genSorted(nextLen)
	  setArr(a)
	  setLen(nextLen)

	  // ✅ 這裡改成隨機挑一個當目標
	  const idx = Math.floor(Math.random() * a.length)
	  setTarget(a[idx])

	  // 重置搜尋狀態
	  setLow(0)
	  setHigh(a.length - 1)
	  setMid(null)
	  setPhase('choose-mid')
	  setStatus('searching')
	  setSteps(0)
	}


  // 從陣列抽一個當目標（一定找得到）
  function pickTargetFromArray() {
    const idx = Math.floor(Math.random() * arr.length)
    setTarget(arr[idx])
    reset()
  }

  // 來自 algorithm-visualizer 的節奏：先亮 mid，再縮範圍
  function nextStep() {
    if (status !== 'searching') return

    // 先檢查已經無解
    if (low > high) {
      setStatus('not-found')
      setPhase('done')
      return
    }

    if (phase === 'choose-mid') {
      const m = Math.floor((low + high) / 2)
      setMid(m)
      setPhase('show-mid')    // 只改顯示，不立刻縮範圍
      setSteps(s => s + 1)
      return
    }

    if (phase === 'show-mid' && mid !== null) {
      const v = arr[mid]
      if (v === target) {
        setStatus('found')
        setPhase('done')      // 綠色顯示 mid
        setSteps(s => s + 1)
        return
      }
      if (v < target) {
        // 縮到右半邊
        setLow(mid + 1)       // 這一步讓左半變灰
      } else {
        // 縮到左半邊
        setHigh(mid - 1)      // 這一步讓右半變灰
      }
      // 下一輪
      setMid(null)
      setPhase('choose-mid')
      setSteps(s => s + 1)
      // 這裡不立即檢查 low>high，讓畫面先顯示縮範圍（灰），下一步再處理無解
      return
    }
  }

  // 顏色對應
  function colorForIndex(i: number) {
    if (phase === 'done') {
      if (status === 'found' && i === mid) return 'bg-green-500'
      if (i < low || i > high) return 'bg-gray-400'
      return 'bg-blue-500'
    }
    if (i < low || i > high) return 'bg-gray-400' // 排除範圍灰
    if (i === mid) return 'bg-pink-500'           // 當前 mid 粉
    return 'bg-blue-500'                          // 搜尋區域藍
  }

  const minVal = useMemo(() => Math.min(...arr), [arr])
  const maxVal = useMemo(() => Math.max(...arr), [arr])
  const scale = (v: number) => {
    // 把值映射到合理高度（避免太矮）
    const minH = 20
    const maxH = 200
    if (maxVal === minVal) return maxH
    return Math.round(minH + (v - minVal) * (maxH - minH) / (maxVal - minVal))
  }

  return (
    <div className="space-y-6">
      {/* 控制列 */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">數量</span>
          <select
            value={len}
            onChange={(e) => randomizeData(parseInt(e.target.value))}
            className="input w-24"
          >
            {[10, 12, 15, 18].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>

        <button className="btn" onClick={() => randomizeData(len)}>🎲 隨機資料</button>

        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">目標</span>
          <input
            type="number"
            value={target}
            onChange={(e) => {
              setTarget(Number(e.target.value))
              reset()
            }}
            className="input w-28"
          />
          <button className="btn" onClick={pickTargetFromArray}>🎯 從陣列抽一個</button>
        </div>

        <button className="btn" onClick={reset}>🧹 重置</button>
        <button className="btn btn-primary" onClick={nextStep} disabled={status !== 'searching'}>
          ⏭ 下一步
        </button>

        <div className="ml-auto text-sm text-slate-600">
          步數: <span className="font-semibold">{steps}</span>　
          範圍: <span className="font-mono">[{low}, {high}]</span>　
          狀態: <span className="font-semibold">
            {status === 'searching' && '搜尋中'}
            {status === 'found' && '找到'}
            {status === 'not-found' && '找不到'}
          </span>
        </div>
      </div>

      {/* ChartTracer（上） */}
      <div className="card p-4">
        <div className="text-xs mb-2 text-slate-500">ChartTracer</div>
        <div className="flex items-end gap-2 h-60 bg-slate-950/60 p-4 rounded">
          {arr.map((v, i) => (
            <div
              key={i}
              className={`${colorForIndex(i)} w-6 rounded-t flex items-end justify-center text-[10px] text-white`}
              style={{ height: `${scale(v)}px` }}
              title={`index ${i}, value ${v}`}
            >
              {/* 顯示數值在柱頂端可改為絕對定位，這裡簡化 */}
              <span className="mb-1">{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Array1DTracer（下） */}
      <div className="card p-4">
        <div className="text-xs mb-2 text-slate-500">Array1DTracer</div>
        <div className="flex flex-col items-center gap-2">
          {/* index 列 */}
          <div className="flex gap-1 text-[11px] text-slate-400">
            {arr.map((_, i) => (
              <div key={i} className="w-8 text-center">{i}</div>
            ))}
          </div>
          {/* 值列 */}
          <div className="flex gap-1">
            {arr.map((v, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded flex items-center justify-center text-xs text-white ${colorForIndex(i)}`}
              >
                {v}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 說明 */}
      <p className="text-xs text-slate-500">
        藍＝搜尋範圍、灰＝已排除、粉＝當前 mid、綠＝找到；每輪採兩步：先顯示 mid，再縮範圍。
      </p>
    </div>
  )
}
