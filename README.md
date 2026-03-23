# 📊 Compliance Task Tracker - Full Stack Assignment

A specialized dashboard designed for **LedgersCFO** to manage and track compliance tasks (GST, Income Tax, Audit, etc.) across multiple client entities.

---

## 🚀 Live Links
- **Frontend (Vercel):** [https://compliance-tracker-alpha.vercel.app/]  
- **Backend API (Render):** [https://compliance-tracker-api-llbw.onrender.com/api]

---

## 🛠️ Tech Stack
**Frontend**
- React.js
- Vite
- Tailwind CSS
- Axios
- Lucide-React

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB Atlas

**Deployment**
- Vercel (Frontend)
- Render (Backend)

---

## ✨ Features
- **Client Management:** Add and view different business entities (Private Ltd, LLP, Individual)
- **Task Dashboard:** Track compliance status for selected clients
- **Real-time Updates:** Mark tasks as *Completed* with instant DB sync
- **Overdue Highlighting:** Pending tasks past due date are marked in red
- **Responsive Design:** Works across all screen sizes

---

## 📝 Tradeoffs and Assumptions

### Assumptions
- **Data Integrity:** Company names are treated as unique identifiers (MVP simplification)
- **Timezone:** Uses user's local system time for overdue calculations
- **Workflow:** Linear lifecycle → `Pending → Completed`

### Tradeoffs
- **State Management:** Could have used React Hooks instead of Redux/Zustand for simplicity and speed
- **Security:** API is public (for demo). In production → JWT auth + CORS restrictions
- **UI Framework:** Tailwind CSS chosen for flexibility and lightweight design
- **Database:** MongoDB used for schema flexibility (varied compliance data)

---

## ⚙️ Installation & Local Setup

### 1. Clone Repository
```bash
git clone [https://github.com/Ajay-sen/compliance-tracker/]
```

### 2. Setup Backend
```bash
cd server
npm install
```

Create a `.env` file:
```
MONGO_URI=your_mongodb_connection_string
```

Run server:
```bash
node index.js
```

---

### 3. Setup Frontend
```bash
cd client
npm install
```

Create a `.env` file:
```
VITE_API_URL=http://localhost:5000/api
```

Run frontend:
```bash
npm run dev
```

---

## 📌 Notes
- This project is built as an MVP for compliance tracking.
- Designed for scalability with future enhancements like authentication, role-based access, and notifications.

---