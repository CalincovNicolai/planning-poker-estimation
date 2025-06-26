# 🃏 Planning Poker Estimation Tool

A real-time collaborative tool for estimating task complexity using Planning Poker. Built with **React**, **WebSocket**, **Zustand**, and **Tailwind CSS**.

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

---

## 🚀 Features

- ✅ Join or create a room by name
- ✅ Real-time updates with WebSocket sync
- ✅ Participant tracking with presence
- ✅ Customizable story point cards: `1, 2, 3, 5, 8, 13, ?, ☕`
- ✅ Room-based vote reset
- ✅ Votes are hidden until all users vote
- ✅ Responsive layout (mobile + desktop)
- ✅ Clean animations with Framer Motion
- ✅ Session-based vote persistence on refresh page
- ✅ Timer per round (reset + early end)
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

## 🌐 Live Demo

- **Frontend (Vercel)**: [Planning Poker Estimation Tool](https://planning-poker-estimation.vercel.app)
- **Backend (WebSocket on Render)**: `wss://planning-poker-estimation.onrender.com`

> ⚠️ The frontend uses `VITE_BACKEND_WS_URL` to connect to the deployed backend.

---

## 🚀 How to Use the App

1. **Open the frontend**:  
   [Planning Poker Estimation Tool](https://planning-poker-estimation.vercel.app)

2. **Enter your name** and an optional Room ID.
    - If no Room ID is entered, a new one is generated.
    - Share the Room URL with teammates to join the same session.

3. **Vote using cards**:
    - Hidden until all participants have voted.
    - Shows ✅ (voted) or ❌ (waiting) for each participant.

4. **Timer**:
    - A 60-second timer starts each round.
    - Ends early if all users have voted.

5. **Reset Round**:
    - Click “Reset Voting Round” to clear votes and restart the timer.

6. **Refresh-safe**:
    - Your vote and session persist across refreshes.
