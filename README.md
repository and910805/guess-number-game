# Guess Number Game — Pretty UI (React + Vite + Tailwind)

兩種方法對比：**亂猜** vs **二分法**。包含動畫化數線，展示範圍如何一步步縮小。

## Quick Start

```bash
npm install
npm run dev
```

> 若 `tailwindcss` 尚未生效，請確認 `postcss.config.js`、`tailwind.config.js` 與 `src/index.css` 均存在且被載入。

## 結構
- `RandomGuessGame.tsx`：學生自行輸入數字，體驗亂猜次數多。
- `BinarySearchDemo.tsx`：自動逐步二分搜尋，附**數線動畫**與步驟紀錄。
- `NumberLine.tsx`：可重用的數線元件（顯示 left/right 與 mid 標記）。

## 可調參數
- 目前範圍固定 `1–100`，可在 `NumberLine` 與元件內自行調整。
- 動畫節奏：`BinarySearchDemo.tsx` 中 `setTimeout(..., 800)` 控制每步間隔。
