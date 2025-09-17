import { useEffect, useMemo, useState } from 'react'

interface Props {
  min?: number
  max?: number
}

export default function RandomGuessGame({ min = 1, max = 1000 }: Props) {
  const [seed, setSeed] = useState(0) // for reset
  const target = useMemo(() => Math.floor(Math.random() * (max - min + 1)) + min, [seed, min, max])
  const [guess, setGuess] = useState('')
  const [message, setMessage] = useState(`請輸入 ${min}–${max} 的數字！`)
  const [tries, setTries] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    // 當範圍改變時，自動重置一局
    setSeed(s => s + 1)
    setGuess('')
    setMessage(`請輸入 ${min}–${max} 的數字！`)
    setTries(0)
    setDone(false)
  }, [min, max])

  const handleGuess = () => {
    if (done) return
    const num = parseInt(guess)
    if (isNaN(num) || num < min || num > max) {
      setMessage(`請輸入 ${min}–${max} 的有效數字`)
      return
    }
    setTries(t => t + 1)

    if (num === target) {
      setMessage(`🎉 答對了！總共猜了 ${tries + 1} 次`)
      setDone(true)
    } else if (num < target) {
      setMessage('太小了！再試試看 ⬆️')
    } else {
      setMessage('太大了！再試試看 ⬇️')
    }
  }

  const reset = () => {
    setSeed(s => s + 1)
    setGuess('')
    setMessage(`請輸入 ${min}–${max} 的數字！`)
    setTries(0)
    setDone(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-lg md:text-xl font-bold mb-1">亂猜模式</h2>
        <span className="text-xs text-slate-500">{min}–{max}</span>
      </div>
      <p className="text-sm text-slate-600 mb-4">學生親自嘗試隨機猜，體會效率差。</p>

      <div className="flex items-center gap-2 mb-3">
        <input
          type="number"
          min={min}
          max={max}
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          className="input"
          placeholder="輸入數字"
          onKeyDown={(e) => e.key === 'Enter' && handleGuess()}
        />
        <button onClick={handleGuess} className="btn btn-primary">猜！</button>
        <button onClick={reset} className="btn btn-ghost">重來</button>
      </div>

      <p className="mb-1">{message}</p>
      <p className="text-sm text-slate-500">目前已經猜了 <span className="font-semibold">{tries}</span> 次</p>
    </div>
  )
}
