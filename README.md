# Apex Motors | Luxury Car Dealership

A modern web application for a luxury car dealership, built with Next.js, Prisma, and TailwindCSS.

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd machine
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file based on the example:
```bash
cp .env.example .env
```
Ensure your `.env` contains:
```
DATABASE_URL="file:./dev.db"
```

### 4. Database Setup
Initialize the database and seed it with initial data:
```bash
# Run migrations
npx prisma migrate dev --name init

# Seed the database (adds cars)
npm run seed
```

### 5. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📦 Deployment to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   git init
   ```

2. **Add files**:
   ```bash
   git add .
   ```

3. **Commit**:
   ```bash
   git commit -m "Initial commit"
   ```

4. **Push**:
   ```bash
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

## 🛠 Tech Stack
- **Framework**: Next.js 15
- **Database**: SQLite (via Prisma)
- **Styling**: TailwindCSS
- **UI Components**: Shadcn UI
