# 🛒 E-Commerce Fullstack Design

A full-stack e-commerce web application built with **React**, **Node.js/Express**, and **Supabase** — deployed live on Vercel (frontend) and Railway (backend).

🌐 **Live Demo:** [e-commerce-fullstack-design-blush.vercel.app](https://e-commerce-fullstack-design-blush.vercel.app)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Pages & Routes](#pages--routes)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Environment Variables](#environment-variables)
- [Local Development Setup](#local-development-setup)
- [Deployment](#deployment)

---

## Overview

This is a complete e-commerce platform where users can browse products, search and filter by category, manage a shopping cart, and register/login with JWT authentication. Admins have a dedicated panel to add, edit, and delete products.

---

## Features

### User Features
- 🔐 Register & Login with JWT authentication
- 🏠 Home page with featured products, hero banner, and countdown timer
- 🔍 Search products by name
- 📂 Filter products by category
- 🛍️ View product details with related products
- 🛒 Add to cart, update quantity, remove items
- 💳 Coupon code support on cart
- 🧾 Order summary with discount calculation

### Admin Features
- 🔑 Admin-only protected route
- ➕ Add new products
- ✏️ Edit existing products
- 🗑️ Delete products
- 📋 View all products in a management table

### Technical Features
- ✅ JWT-based auth with role-based access (user / admin)
- ✅ Password hashing with bcryptjs
- ✅ Persistent cart stored in Supabase (logged-in users) or localStorage (guests)
- ✅ React Router v7 with client-side navigation
- ✅ Vercel rewrites for SPA routing
- ✅ Environment-aware dotenv (dev only)
- ✅ CORS enabled for cross-origin API calls

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 8, React Router DOM v7, Tailwind CSS v4, Axios |
| Backend | Node.js, Express 5 |
| Database | Supabase (PostgreSQL) |
| Auth | JWT (jsonwebtoken), bcryptjs |
| Frontend Hosting | Vercel |
| Backend Hosting | Railway |

---

## Project Structure

```
ecommerece-fullstack-design/
├── frontend/                   # React + Vite app
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src/
│   │   ├── assets/
│   │   │   └── hero.png
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   └── AdminPanel.jsx    # Product management (admin only)
│   │   │   ├── Home.jsx              # Landing page with featured products
│   │   │   ├── ProductListing.jsx    # All products with search & filter
│   │   │   ├── ProductDetails.jsx    # Single product + related items
│   │   │   ├── Cart.jsx              # Shopping cart & checkout summary
│   │   │   ├── Login.jsx             # Login form
│   │   │   └── Signup.jsx            # Registration form
│   │   ├── App.jsx                   # Routes definition
│   │   ├── main.jsx                  # React entry point
│   │   └── index.css                 # Global styles
│   ├── vercel.json                   # Vercel SPA rewrite config
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
└── backend/                    # Node.js + Express API
    ├── config/
    │   └── supabase.js               # Supabase client setup
    ├── controllers/
    │   ├── authController.js         # Register & Login logic
    │   └── productController.js      # CRUD product logic
    ├── middleware/
    │   └── authMiddleware.js         # JWT protect + adminOnly
    ├── routes/
    │   ├── authRoutes.js             # POST /register, POST /login
    │   ├── productRoutes.js          # GET/POST/PUT/DELETE /products
    │   └── cartRoutes.js             # Cart CRUD routes
    ├── server.js                     # Express app entry point
    └── package.json
```

---

## Pages & Routes

| Route | Page | Access |
|-------|------|--------|
| `/` | Login | Public |
| `/login` | Login | Public |
| `/signup` | Signup | Public |
| `/home` | Home | Public |
| `/products` | Product Listing | Public |
| `/products/:id` | Product Details | Public |
| `/cart` | Shopping Cart | Public (guest or auth) |
| `/admin` | Admin Panel | Admin only |

---

## API Endpoints

### Auth — `/api/auth`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and get JWT token |

### Products — `/api/products`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/products` | Public | Get all products (supports `?search=` and `?category=`) |
| GET | `/api/products/:id` | Public | Get single product by ID |
| POST | `/api/products` | Admin | Create new product |
| PUT | `/api/products/:id` | Admin | Update product |
| DELETE | `/api/products/:id` | Admin | Delete product |

### Cart — `/api/cart`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get current user's cart |
| POST | `/api/cart` | Add item to cart |
| PATCH | `/api/cart/:id` | Update item quantity |
| DELETE | `/api/cart/:id` | Remove single item |
| DELETE | `/api/cart` | Clear entire cart |

> All cart routes require `Authorization: Bearer <token>` header.

---

## Database Schema

### `users` table
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| name | text | Full name |
| email | text | Unique |
| password | text | bcrypt hashed |
| role | text | `user` or `admin` |

### `products` table
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| name | text | Product name |
| price | numeric | Price in USD |
| category | text | e.g. Electronics, Clothes |
| image | text | Image URL |
| featured | boolean | Show on home page |
| discount | numeric | Discount percentage |

### `cart` table
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| user_id | uuid | FK → users.id |
| product_id | uuid | FK → products.id |
| quantity | integer | Item quantity |

---

## Environment Variables

### Backend (`backend/.env`)
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_KEY=your_supabase_service_role_key
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:5000
```

> For production, set `VITE_API_URL` to your Railway backend URL in Vercel's environment variables.

---

## Local Development Setup

### Prerequisites
- Node.js v18+
- A [Supabase](https://supabase.com) account and project

### 1. Clone the repository
```bash
git clone https://github.com/AAbdullahRajput/E-Commerce-Fullstack-Design.git
cd ecommerece-fullstack-design
```

### 2. Setup the Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_service_key
JWT_SECRET=your_secret_key
PORT=5000
```

Start the backend:
```bash
npm run dev
# Server runs on http://localhost:5000
```

### 3. Setup the Frontend
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` folder:
```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:
```bash
npm run dev
# App runs on http://localhost:5173
```

---

## Deployment

### Backend → Railway
1. Push code to GitHub
2. Create a new Railway project → deploy from GitHub
3. Add environment variables: `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `JWT_SECRET`
4. Railway auto-deploys on every push

### Frontend → Vercel
1. Import GitHub repo on [vercel.com](https://vercel.com)
2. Set **Root Directory** to `frontend`
3. Add environment variable: `VITE_API_URL=https://your-railway-url.railway.app`
4. Vercel auto-deploys on every push to `main`

The `frontend/vercel.json` handles SPA routing:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## Author

**Abdullah Rajput**
- GitHub: [@AAbdullahRajput](https://github.com/AAbdullahRajput)

---

## License

This project is open source and available under the [MIT License](LICENSE).
