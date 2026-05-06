# 🚀 TradeGuru Market

AI-powered trading dashboard with **React (Frontend)** and **Python API (Backend)**.

---

## 📁 Project Structure

```
AI-MARKET-MAIN/
│
├── silly-ocelot-burst-main/   # Frontend (React + Vite)
├── backend/                  # Backend (Python API)
```

---

# 🖥️ Frontend Setup (React + Vite)

## 🔹 Step 1: Go to frontend folder

```bash
cd silly-ocelot-burst-main
```

## 🔹 Step 2: Install dependencies

```bash
npm install
```

## 🔹 Step 3: Run frontend

```bash
npm run dev
```

👉 Frontend runs at:

```
http://localhost:5173
```

---

# ⚙️ Backend Setup (Python API)

## 🔹 Step 1: Go to backend folder

```bash
cd backend
```

## 🔹 Step 2: Create virtual environment

```bash
python -m venv venv
```

## 🔹 Step 3: Activate environment

### Windows:

```bash
venv\Scripts\activate
```

### Mac/Linux:

```bash
source venv/bin/activate
```

## 🔹 Step 4: Install requirements

```bash
pip install -r requirements.txt
```

## 🔹 Step 5: Run backend

```bash
python app.py
```

👉 Backend runs at:

```
http://localhost:5000
```

---

# 🔑 Environment Variables

Create a `.env` file in backend folder:

```
GROQ_API_KEY=your_api_key_here
```

⚠️ Do NOT upload `.env` to GitHub

---

# 🌐 Deployment

## Frontend (Vercel)

* Set Root Directory → `silly-ocelot-burst-main`
* Build Command → `npm run build`
* Output → `dist`

## Backend

Use:

* Render / Railway / Python hosting

---

# 🧠 Features

* 📊 AI trading signals
* 📰 Market news
* 🤖 Chat assistant
* 📈 Sentiment analysis

---

# ⚠️ Important Rules

* Never push `.env`
* Never push API keys
* Use `.gitignore`

---

# 👨‍💻 Author

Manveer
