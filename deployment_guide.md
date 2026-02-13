# RetinaCore: End-to-End Deployment Roadmap

I have pushed the finalized project to GitHub. Below are the steps to get your web application live using **Railway** or **Render**.

## 1. 🌐 Your Repository Link
**[https://github.com/preetamvr1595/Diabetic_Retinopathy_Project](https://github.com/preetamvr1595/Diabetic_Retinopathy_Project)**

---

## 2. � Deployment on RAILWAY (Recommended)

Railway is excellent for speed. You will create **two services** in one project.

### Step A: Deploy the Backend
1.  Go to [Railway.app](https://railway.app/) and click **"New Project"** -> **"Deploy from GitHub"**.
2.  Select your repository.
3.  Once the service is created, go to **Settings** -> **General** -> **Root Directory** and set it to `/backend`.
4.  In **Variables**, add `PORT` with value `5000`.
5.  Railway will automatically detect `app.py` and deploy it.

### Step B: Deploy the Frontend
1.  In the same Railway project, click **"New"** -> **"GitHub Repo"** and select the same repository again.
2.  Go to **Settings** -> **General** -> **Root Directory** and set it to `/frontend`.
3.  In **Variables**, add `VITE_API_URL` and set it to your **Backend's URL** (found in the backend service settings).
4.  Railway will detect the React app and deploy it.

---

## 3. � Deployment on RENDER

We use a **Blueprint Deployment** for Render.

### Steps:
1.  Login to [Render.com](https://dashboard.render.com).
2.  Click **"New+"** -> **"Blueprint"**.
3.  Connect your repository and click **"Apply"**. Render uses the `render.yaml` file I created to set up both services automatically.

---

## 4. 🔑 About API Keys
-   **AI Analysis**: **No API Key required.** The AI brain is local (`backend/models`).
-   **Chatbot**: Uses clinical pre-sets. No key needed unless you upgrade to ChatGPT.

---

## 5. 📂 Checklist
-   **`render.yaml`**: Instructions for Render.
-   **`backend/requirements.txt`**: Libraries for the AI engine.
-   **`frontend/`**: The dashboard interface.

> [!TIP]
> After deployment, you will get a permanent URL (e.g., `retinacore.up.railway.app`). You can now perform eye analysis from anywhere in the world! 🩺✨🚀
