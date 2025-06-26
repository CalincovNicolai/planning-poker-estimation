# 🃏 Planning Poker Estimation Tool

A real-time collaborative tool for estimating task complexity using Planning Poker. Built with **React**, **WebSocket**, **Zustand**, and **Tailwind CSS**.

---

## 🚀 Features

- ✅ Join or create a room by name
- ✅ Real-time updates with WebSocket sync
- ✅ Customizable story point cards: `1, 2, 3, 5, 8, 13, ?, ☕`
- ✅ Votes are hidden until all users vote
- ✅ Responsive layout (mobile + desktop)
- ✅ Clean animations with Framer Motion
- ✅ Session-based vote persistence on refresh page
- ✅ Room lifecycle management (join, leave, reset)

---

## 🔐 Room & Session Behavior

- Users can join with a name and optional Room ID (or generate one). 
- Each session stores your name, ID, and vote. 
- Refreshing the page preserves your vote and user info. 
- Leaving the room removes your presence from the participant list.

---

## ⚙️ Room Management Logic

- Votes reset when a new participant joins. 
- Timer starts automatically when a round begins. 
- If all participants vote early, the timer ends immediately. 
- Votes are revealed when everyone has voted.

---

## 🧩 Tech Stack

| Tool        | Purpose                      |
|-------------|------------------------------|
| React       | UI framework                 |
| Zustand     | Global state management      |
| WebSocket   | Real-time communication      |
| Tailwind CSS| Utility-first styling        |
| Framer Motion | Animations & transitions  |
| TypeScript  | Type safety and structure    |

---

## 📦 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/CalincovNicolai/planning-poker-estimation.git
cd planning-poker-estimation
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the backend WebSocket server

```bash
node server/index.js
```


### 4. Start the React frontend

```bash
npm run dev
```
