# Roots.ng - Heritage & Ancestry Discovery Platform

Roots.ng is a comprehensive platform designed to help the African diaspora, specifically Nigerians, reconnect with their ancestral roots through technology, oral history, and community.

## 🚀 Features

- **Public Discovery**: Search ethnic groups, towns, and oríkì without login.
- **Ancestry Intelligence Engine**: "I Know Little" wizard that infers heritage from names, language fragments, and stories.
- **Rich Identification**: Detailed pages for tribes/ethnic groups with history, festivals, and language samples.
- **User Profiles**: Save discoveries, build family trees (placeholder), and manage your journey.
- **Admin Dashboard**: Content moderation and platform analytics.

## 🛠 Tech Stack

- **Frontend**: Next.js 14+ (App Router), Tailwind CSS, Framer Motion.
- **Backend**: Node.js, Express, MongoDB (Mongoose).
- **Authentication**: JWT, bcryptjs.
- **Design**: Modern, cultural-themed aesthetic with Tailwind.

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB (running locally or URI)

### 1. Backend Setup
```bash
cd server
npm install
# Create .env file (see .env.example)
npm run dev
# Seed the database (Important for initial data)
npm run seed
```
Server runs on `http://localhost:5000`.

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```
Client runs on `http://localhost:3000`.

## 🧪 Testing the Platform
1. **Explore**: Go to `/explore` to browse ethnic groups.
2. **Intelligence Engine**: Go to `/identity-engine` to try the inference wizard.
3. **Login/Register**: Create an account to access the Dashboard.
4. **Admin**: Accounts with `role: 'admin'` can access `/admin`. (See `seeder.js` for default admin credentials: `admin@heritage.com` / `password123`).

## 🌍 Deployment
- **Frontend**: Deploy to Vercel (zero config).
- **Backend**: Deploy to Render, Railway, or Heroku. Ensure `MONGO_URI` is set.

## 📄 License
MIT
