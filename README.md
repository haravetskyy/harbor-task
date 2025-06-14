# Harbor Task <img src="./apps/web/app/favicon.ico" alt="Logo" width="30" style="vertical-align: middle;" align="right">

A full-stack project consisting of a **frontend** (Next.js + shadcn/ui), a **backend** (Nest.js), a **PostgreSQL** database, and an optional **Electron desktop application**.

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
- `apps/api`
- `apps/desktop`
- `/`

These files serve as templates, listing all necessary variables. You need to copy them to their respective `.env` files and fill them with valid data specific to your setup.

---

### **3. Install Dependencies**

Install all required Node.js packages for both the frontend and backend:

```bash
pnpm install
```

> [!NOTE]
> The Electron app (`apps/desktop`) uses `npm` instead of `pnpm` due to compatibility issues with hoisting.

---

### **4. Setup and Build the Electron App**

Before starting the full development environment, make sure the Electron app is properly prepared:

### 4.1: Delete node_modules inside apps/desktop (important for avoiding hoist issues)

```bash
rm -rf apps/desktop/node_modules
```

### 4.2: Install dependencies inside the Electron project using npm

```bash
cd apps/desktop
npm install
```

### 4.3: Build the Electron project

```bash
npm run build
```

### 4.4: Go back to root

```bash
cd -
```

---

### **5. Run All Essential Scripts**

You need to execute these scripts to ensure everything works correctly.

#### **5.1. Start the Development Database**

```bash
pnpm db:dev:up
```

This script initializes and starts the development database.

#### **5.2. Apply Prisma Migrations**

```bash
pnpm prisma:dev:deploy
```

This command applies the Prisma migrations to the database.

#### **5.3. Generate Prisma Client**

```bash
pnpm prisma:generate
```

This script generates the Prisma client based on the Prisma schema.

#### **5.4. (Optional) Seed Data**

```bash
pnpm data:seed
```

If you want to generate some initial data, run this command.

---

### **6. Start the Application**

```bash
pnpm dev
```

This will start the web frontend, backend API, and any other services needed for development.

---

Now you are good to go :)
