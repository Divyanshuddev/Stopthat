# Deployment Guide: Vercel (Frontend) & Render (Backend)

This project is fully configured to deploy the **Frontend on Vercel** and the **FastAPI Backend on Render**.

---

## Part 1: Deploy Backend on Render

1. Go to [Render Dashboard](https://dashboard.render.com/) and click **New +** > **Web Service**.
2. Connect your GitHub/GitLab repository.
3. Configure the service settings:
   - **Name**: `stopthat-backend` (or any name you choose)
   - **Region**: Choose the closest region (e.g., Frankfurt, Oregon, Singapore)
   - **Branch**: `main` (or your active branch)
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: `Free`
4. Click **Create Web Service**.
5. Once deployed, Render will provide a public URL, for example:
   ```
   https://stopthat-backend.onrender.com
   ```
6. **Verify the backend:** Open `https://stopthat-backend.onrender.com/` in your browser. You should see:
   ```json
   {
     "status": "online",
     "app": "StopThat! Signboard API",
     "version": "1.0.0",
     "health": "/api/health",
     "docs": "/docs"
   }
   ```

---

## Part 2: Deploy Frontend on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/) and click **Add New…** > **Project**.
2. Import your Git repository.
3. In the **Configure Project** screen:
   - **Project Name**: `stopthat-signboard` (or any name)
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click *Edit* and select **`frontend`**
   - **Build and Output Settings**: Default (`npm run build` and `dist`)
4. **Environment Variables**:
   Expand the **Environment Variables** section and add:
   - **Key**: `VITE_API_BASE_URL`
   - **Value**: `https://stopthat-backend.onrender.com` *(Use your exact Render URL from Part 1, without trailing slash)*
5. Click **Deploy**.
6. Vercel will build and deploy your project with a live URL (e.g., `https://stopthat-signboard.vercel.app`).

---

## Part 3: Verification & Test Checklist

- [ ] **Home Page Loads**: Open your Vercel URL — confirm the signboard, lighting aura, and templates display.
- [ ] **Create & Publish**: Enter a custom protest statement, pick an alias or click `🎲 Random`, and click **Download** or **Share**.
- [ ] **Community Wall (Feed)**: Click the **Feed** tab in the navbar to verify signboards load from your Render backend.
- [ ] **Like / Agree Count**: Click the heart button on any signboard; verify the agree counter increments.
- [ ] **Direct URL Sharing**: Copy a sign's link and open it in an incognito window; verify the sign loads via `?sign=<id>` without 404s.

---

## Local Development vs. Production

- **Local Dev**: When `VITE_API_BASE_URL` is unset, Vite's dev server proxies `/api` directly to `http://127.0.0.1:8000`.
- **Production (Vercel)**: All requests automatically route to `VITE_API_BASE_URL/api/...` with full cross-origin CORS support.
