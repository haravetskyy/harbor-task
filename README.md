# Harbor Task <img src="./apps/web/app/favicon.ico" alt="Logo" width="30" style="vertical-align: middle;" align="right">

A full-stack project consisting of a **frontend** (Next.js + shadcn/ui), a **backend** (Nest.js), and a **PostgreSQL** database.

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

The project requires environment variables to function properly. To assist you, `.env.example` files are provided in the following directories:

- `apps/web/`
- `apps/api/`
- `/`

These files serve as templates, listing all necessary variables. You need to copy them to their respective `.env` files and fill them with valid data specific to your setup.

---

### **3. Install Dependencies**

Install all required Node.js packages for both the frontend and backend:

```bash
pnpm install
```

---

### **4. Run All Essential Scripts**

You need to execute these scripts to ensure everything works correctly.

#### **4.1. Start the Development Database**

```bash
pnpm db:dev:up
```

This script initializes and starts the development database.

#### **4.2. Apply Prisma Migrations**

```bash
pnpm prisma:dev:deploy
```

This command applies the Prisma migrations to the database.

#### **4.3. Generate Prisma Client**

```bash
pnpm prisma:generate
```

This script generates the Prisma client based on the Prisma schema.

#### **4.4. (Optional) Seed Data**

```bash
pnpm data:seed
```

If you want to generate some initial data, run this command.

---

### **5. Start the Application**

```bash
pnpm dev
```

Finally, you are good to go :)
