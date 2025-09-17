import { useEffect, useMemo, useRef, useState } from 'react'
import { NumberLine } from './NumberLine'

type Snapshot = { left: number; right: number; mid: number; log: string }

function buildSnapshots(target: number, min = 1, max = 1000): Snapshot[] {
  let left = min
  let right = max
  const shots: Snapshot[] = []
  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (mid === target) {
      shots.push({ left: mid, right: mid, mid, log: `🎉 找到了！數字是 ${mid}` })
      break
    } else if (mid < target) {
      shots.push({ left, right, mid, log: `${mid} 太小 → 範圍改成 ${mid + 1}-${right}` })
      left = mid + 1
    } else {
      shots.push({ left, right, mid, log: `${mid} 太大 → 範圍改成 ${left}-${mid - 1}` })
      right = mid - 1
    }
  }
  return shots
}

interface Props {
  min?: number
  max?: number
}

export default function BinarySearchDemo({ min = 1, max = 1000 }: Props) {
  const [seed, setSeed] = useState(0)
  const target = useMemo(() => Math.floor(Math.random() * (max - min + 1)) + min, [seed, min, max])
  const shots = useMemo(() => buildSnapshots(target, min, max), [target, min, max])

  const [left, setLeft] = useState(min)
  const [right, setRight] = useState(max)
  const [mid, setMid] = useState<number | undefined>(undefined)
  const [logs, setLogs] = useState<string[]>([])
  const [stepIndex, setStepIndex] = useState(-1)
  const [running, setRunning] = useState(false)
  const timer = useRef<number | null>(null)

  const totalSteps = shots.length
  const currentStep = stepIndex + 1

  // 當範圍改變時，重置狀態
  useEffect(() => {
    if (timer.current) {
      window.clearTimeout(timer.current)
      timer.current = null
    }
    setSeed(s => s + 1)
    setLeft(min); setRight(max); setMid(undefined)
    setLogs([])
    setStepIndex(-1)
    setRunning(false)
  }, [min, max])

  const applyStep = (i: number) => {
    const s = shots[i]
    setLeft(s.left)
    setRight(s.right)
    setMid(s.mid)
    setLogs(prev => [...prev, `第 ${i + 1} 步：猜 ${s.mid}`, s.log])
    setStepIndex(i)
  }

  const handleNext = () => {
    if (running) return
    if (stepIndex >= totalSteps - 1) return
    const next = stepIndex + 1
    applyStep(next)
  }

  const toggleAuto = () => {
    if (running) {
      if (timer.current) window.clearTimeout(timer.current)
      timer.current = null
      setRunning(false)
      return
    }
    setRunning(true)
    const tick = () => {
      if (stepIndex >= totalSteps - 1) {
        setRunning(false)
        timer.current = null
        return
      }
      const next = stepIndex + 1
      applyStep(next)
      timer.current = window.setTimeout(tick, 800)
    }
    timer.current = window.setTimeout(tick, 300)
  }

  const reset = () => {
    if (timer.current) {
      window.clearTimeout(timer.current)
      timer.current = null
    }
    setSeed(s => s + 1)
    setLeft(min); setRight(max); setMid(undefined)
    setLogs([])
    setStepIndex(-1)
    setRunning(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-lg md:text-xl font-bold">二分法模式</h2>
        <span className="text-xs text-slate-500">（目標數字隨機產生，範圍 {min}–{max}）</span>
      </div>
      <p className="text-sm text-slate-600 mb-4">
        可「手動下一步」或「自動播放」，並顯示目前進度。
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        <button onClick={toggleAuto} className="btn btn-secondary">
          {running ? '暫停' : '自動播放'}
        </button>
        <button onClick={handleNext} className="btn btn-primary" disabled={running || stepIndex >= totalSteps - 1}>
          下一步
        </button>
        <button onClick={reset} className="btn btn-ghost">重來</button>
        <span className="ml-auto text-sm text-slate-600">
          進度：<span className="font-semibold">{Math.max(0, currentStep)}</span> / {totalSteps} 步
        </span>
      </div>

      <NumberLine left={left} right={right} mid={mid} min={min} max={max} />

      <ul className="mt-4 space-y-1 max-h-44 overflow-auto pr-1">
        {logs.map((s, i) => (
          <li key={i} className="text-sm">{s}</li>
        ))}
      </ul>
    </div>
  )
}
