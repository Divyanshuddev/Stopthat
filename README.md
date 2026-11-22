# 🛑 StopThat! — Custom Protest Signboard & Social Sharing Platform

[![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?style=flat&logo=vercel)](https://vercel.com)
[![Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=flat&logo=render)](https://render.com)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat&logo=react)](https://react.dev)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4+-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com)

> **Raise your personal protest signboard and say NO to things you hate — from pointless 1-hour meetings to 4-minute voice notes. Design, customize, and share directly to WhatsApp, Instagram, and X (Twitter)!**

---

## 💡 About The Project

**StopThat!** is an interactive, full-stack web application built with **React** and **FastAPI** that lets anyone create hilarious, relatable, and authentic roadside protest signboards. Whether you are tired of unpaid overtime, awkward wedding inquiries, or people walking four-abreast on the sidewalk, StopThat! turns your everyday frustrations into shareable protest art.

Crafted with a sleek **glassmorphic UI**, fiery ambient backlight aura, authentic highway signage geometry, and 1-click social media exports.

---

## ✨ Features

### 🪧 Authentic Signboard Shapes
* **🛑 Roadside Stop Sign (Octagon)**: Authentic MUTCD 8-sided highway sign with double crisp white borders, mounting rivets, and galvanized steel post.
* **⚠️ Roadside Caution Sign (Diamond)**: 45° rotated hazard-amber diamond with regulatory black double borders.
* **🪧 Vintage Industrial Warning Plate**: Inspired by classic tin enamel warning signs, featuring a matte black top header, vibrant **Red Oval / Ellipse**, and heavy condensed black lettering.
* **📱 Glass Social Post Card**: Ultra-modern frosted glass social card with ambient aura backlight, avatar circle, and live like counter.

### 🎛️ Real-Time Responsive Editor
* **Header Presets + Custom Input**: Choose from defaults (`STOP`, `I QUIT`, `WARNING`, `NO MORE`, `CAN WE PLEASE`, `NEVER AGAIN`) or type any custom protest header.
* **Dynamic Responsive Typography**: Text dynamically calculates optimal font sizing and line wrapping based on character count and sign geometry — short slogans render massive and punchy, while long explanations scale down cleanly without clipping.
* **🎲 Random Alias Generator**: Automatically assigns humorous, relatable aliases (e.g. *"Alex (Exhausted Bestie)"*, *"Casey (Battery at 2%)"*, *"Quiet Quitter"*) with a 1-click re-roll dice button.
* **💀 Skull Confetti**: Clicking **Shuffle** triggers a custom floating skull face (`💀`) particle burst.
* **☀️/🌙 Theme Switcher**: Toggle seamlessly between dark frosted glass and a modern pearl-slate light theme.

### 📲 1-Click Multi-Platform Social Sharing
* **WhatsApp**: 1-Click direct chat share with formatted quote and shareable link.
* **X (Twitter)**: Instant Tweet intent with pre-filled punchy text, hashtags, and signboard URL.
* **Instagram**: 1-Click caption copier and high-resolution PNG image download ready for Stories and Feed.
* **Download PNG**: High-resolution 2.5x retina image export using `html-to-image`.
* **Copy Link**: 1-click shareable URL with automatic parameter persistence (`?sign=<id>`).

### 🌍 Community Wall
* Discover real protest signs submitted by users worldwide.
* Sort by **Trending** or **Latest**, upvote ("Agree! ❤️"), or remix any sign directly into the studio.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti, HTML-to-Image |
| **Backend** | FastAPI, Python 3.11+, Uvicorn, Pydantic, Python-Multipart |
| **Deployment** | **Vercel** (Frontend SPA) + **Render** (FastAPI Web Service) |

---

## 🚀 Quick Start (Local Development)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/stopthat-signboard.git
cd stopthat-signboard
```

### 2. Backend Setup (FastAPI)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
API runs on `http://localhost:8000` (Interactive docs at `http://localhost:8000/docs`).

### 3. Frontend Setup (React + Vite)
In a new terminal:
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🌐 Production Deployment

* **Backend on Render**:
  * Set Root Directory to `backend`
  * Build Command: `pip install -r requirements.txt`
  * Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
* **Frontend on Vercel**:
  * Set Root Directory to `frontend`
  * Add Environment Variable: `VITE_API_BASE_URL=https://your-backend.onrender.com`

*Detailed step-by-step instructions can be found in [DEPLOYMENT.md](DEPLOYMENT.md).*

---

## 📄 License

MIT License — Feel free to customize, remix, and stop doing things you hate!
