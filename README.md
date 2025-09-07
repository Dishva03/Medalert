# 🩺 MEDALERT – Smart Medicine Reminder System

Medalert is a web-based platform that helps patients manage their medication schedule with proper timing and dosage.  
This project consists of two main modules:

- **`medalert-backend/`** → The main backend server (API, database, authentication).  
- **`medalert-assist/`** → The assistant module that helps with reminders, notifications, and smart features.  

---

## 📂 Project Structure
MEDALERT/
│── medalert-backend/ # Node.js backend (API & Database)
│── medalert-assist/ # Assistant module (Reminders & Notifications)
│── README.md # Project documentation
---

## ⚙️ 1. Setup Instructions

### 🔹 Clone the Repository
```bash
git clone https://github.com/Dishva03/Medalert.git
cd Medalert
🔹 Install Dependencies
Backend (medalert-backend)
cd medalert-backend
npm install

Assistant (medalert-assist)
cd ../medalert-assist
npm install🔹 Environment Setup

In medalert-backend/, create a .env file based on .env.example.
Example:

PORT=5000
DATABASE_URL=mongodb://localhost:27017/medalert
JWT_SECRET=your_secret_key🚀 2. Running the Project
Start Backend
cd medalert-backend
npm run dev

Start Assistant
cd medalert-assist
npm run dev
Both modules will now be running locally.
📡 API Endpoints (Backend)

Some key routes available from the backend:

🔑 Auth

POST /auth/register → Register new user

POST /auth/login → Login user

💊 Medication

POST /medications → Add medication

GET /medications → List medications

⏰ Reminders

POST /reminders → Create reminder

GET /reminders → Fetch reminders
---

✅ This file is **ready-to-use** — just save it as `README.md` in the **root of your repo** (`MEDALERT/`).  
