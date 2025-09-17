


# 🎮 猜數字小遊戲 (Guess Number Game)

[![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38b2ac?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Build](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/and910805/guess-number-game/actions)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-222222?logo=githubpages&logoColor=white)](https://and910805.github.io/guess-number-game/)

一個用 **React + Vite + TailwindCSS** 製作的互動小遊戲，透過 **亂猜 vs. 二分法** 的對比，讓學生直覺理解「為什麼二分搜尋更快」。

🔗 **Demo 網站**  
👉 [https://and910805.github.io/guess-number-game/](https://and910805.github.io/guess-number-game/)

---

## ✨ 功能特色
- 🎲 **亂猜模式**：輸入隨機數字，體驗效率差異。  
- ⚡ **二分法模式**：逐步顯示搜尋過程，可手動「下一步」或自動播放。  
- 📊 **範圍切換**：支援 `1–100`、`1–1000`、`1–10000`。  
- 🖼️ **簽名 / Logo**：可自訂個人簽名或 Logo 顯示。  
- 🎨 **美觀 UI**：使用 TailwindCSS 強化介面。  

---

## 🧭 分支說明
- `main`：主要程式碼分支（React + Vite + Tailwind 專案）。  
- `gh-pages`：由 `npm run deploy` 自動生成，存放打包後的靜態網站，供 GitHub Pages 使用。  
- `mainer`：舊的初始化分支（建議改用 `main`，或可刪除以保持乾淨）。  

---

## 🚀 開發與啟動

### 環境需求
- Node.js 18+
- npm 9+ 或 pnpm/yarn

### 安裝
```bash
# 安裝依賴
npm install
```

### 開發模式

```bash
npm run dev
```

預設網址：[http://localhost:5173](http://localhost:5173)

### 打包

```bash
npm run build
```

### 本地預覽

```bash
npm run preview
```

---

## 🌐 部署到 GitHub Pages

此專案已內建 `gh-pages` 套件，執行以下指令即可自動部署：

```bash
npm run deploy
```

這會將 `dist/` 推送到 `gh-pages` 分支，並可透過 GitHub Pages 開啟。

---

## 📂 專案結構

```
guess-number-game/
├── public/             # 靜態檔案 (logo, 簽名圖)
├── src/
│   ├── components/     # 遊戲元件
│   │   ├── RandomGuessGame.tsx
│   │   └── BinarySearchDemo.tsx
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

---

## 📝 License

MIT © 2025 [Kuanlin](https://github.com/and910805)

```

