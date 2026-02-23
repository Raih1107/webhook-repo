
# DevStream v2.0 | Real-Time GitHub Event Monitor

A full-stack, event-driven application that captures GitHub repository actions (Pushes, Merges) via Webhooks and displays them on a live, auto-polling dashboard.

## 🚀 Live Demo

* **Frontend Dashboard:** `https://webhook-repo-1-xaxc.onrender.com`
* **API Health/Latest Events:** `https://webhook-repo-hsjg.onrender.com/webhook/latest`
* **Action Repository:** `https://github.com/Raih1107/action-repo` (Push a commit here to trigger the live dashboard!)

---

## 🛠 Tech Stack

* **Frontend:** React.js, Vite, TanStack Query, Framer Motion.
* **Backend:** Python, Flask, Gunicorn (WSGI Server).
* **Database:** MongoDB Atlas (NoSQL storage for event history).
* **Deployment:** Render (Web Services & Static Sites).
* **Automation:** GitHub Webhooks & Cron-job.org.

---

## 🏗 System Architecture

The application follows a decoupled monorepo architecture.

1. **Event Trigger:** A developer pushes code to the `action-repo`.
2. **Webhook Delivery:** GitHub sends a `POST` request with JSON data to the Flask backend.
3. **Data Persistence:** The Flask backend parses the payload and stores the timestamp, author, and action type in MongoDB.
4. **Client Polling:** The React frontend polls the `/webhook/latest` endpoint every 15 seconds to fetch new updates.
5. **UI Update:** The dashboard dynamically updates to show the most recent repository activity.

---

## 🔧 Technical Challenges & Solutions

### 1. The CORS "Preflight" Hurdle

**Challenge:** Initially, the frontend displayed an "Error connecting to API" because the browser blocked requests from the frontend domain to the backend domain.
**Solution:** I configured `flask-cors` to allow cross-origin resource sharing specifically for the production environment using `CORS(app, resources={r"/*": {"origins": "*"}})`. This allowed the React app to securely poll data from the Flask server.

### 2. Render Free-Tier Latency (Cold Starts)

**Challenge:** Render's free tier spins down services after 15 minutes of inactivity, causing a 50-second delay for the first request.
**Solution:** I implemented a "Keep-Alive" system using `cron-job.org`. Every 10 minutes, an external pinger hits the `/webhook/latest` endpoint, ensuring the server remains "warm" and responsive for recruiters.

---

## 📂 Project Structure

```text
/
├── backend/
│   ├── app/
│   │   ├── webhook/       # Routes for receiving/sending data
│   │   ├── extensions.py  # PyMongo initialization
│   │   └── __init__.py    # App factory & CORS config
│   ├── requirements.txt   # Gunicorn, Flask, PyMongo, etc.
│   └── run.py
└── frontend/
    ├── src/
    │   ├── components/    # Dashboard UI components
    │   └── App.jsx        # Polling logic (15s intervals)
    └── vite.config.js     # Build configurations

```

---

## ⚙️ Installation & Setup

### Backend

1. Create a `.env` file with your `MONGO_URI`.
2. Install dependencies: `pip install -r requirements.txt`.
3. Run locally: `python run.py`.

### Frontend

1. Create a `.env` file with `VITE_API_URL=http://localhost:5000`.
2. Install dependencies: `npm install`.
3. Run locally: `npm run dev`.

### Webhook

* **Payload URL:** `https://webhook-repo-hsjg.onrender.com/webhook/receiver`
* **Content Type:** `application/json`
* **Events:** Just the `push` event.

---

## 📝 Assignment Requirements Checklist

* [✅] Flask Webhook to receive GitHub `POST` requests.
* [✅] MongoDB integration to store actions.
* [✅] React frontend to display data.
* [✅] Auto-polling every 15 seconds.
* [✅] Production deployment on Render.
* [✅] Full walkthrough video of code and UI.

