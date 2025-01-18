# **Harbor Task**

A full-stack project consisting of a **frontend** (Vite + React), a **backend** (Nest.js), and a **PostgreSQL** database.

---

## **Getting Started**

### **Prerequisites**

Ensure you have the following installed:

- **Node.js** (v18 or later)
- **pnpm**
- **Docker** and **Docker Compose**

---

### **1. Clone the Repository**

```bash
git clone https://github.com/haravetskyy/harbor-task.git
cd harbor-task
```

---

### **2. Configure Environment Variables**

Environment variables are required for the project. You can generate example `.env` files using the `Makefile`. Two options are available:

#### **Option 1: Generate Ready-to-Use `.env` Files**

This option is great for most cases:

```bash
./script.sh create-env
```

#### **Option 2: Generate Example `.env` Templates**

If you have other projects running and need custom ports, use this option:

```bash
./script.sh create-env-example
```

You will need to customize the following files:

- `frontend/.env`
- `backend/.env`
- `root/.env`

---

### **3. Install Dependencies**

Install all required Node.js packages for both the frontend and backend:

```bash
./script.sh install
```

---

### **4. Start the Application**

This command will start the application, including a database running in a Docker container and some pre-generated data:

```bash
./script.sh start
```

---

### **5. Access the Application**

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:3000](http://localhost:3000)

> **Note**: These ports are correct if you generated the Ready-to-Use `.env` files. If you generated `.env.example` files, you will need to provide your own ports.
