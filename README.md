# 🛒 E-Commerce Fullstack Design

A full-stack e-commerce **design prototype** built with **React**, **Node.js/Express**, and **Supabase** — deployed live on Vercel (frontend) and Railway (backend).

> ⚠️ **Note:** This is a design/demo project with basic frontend & backend functionality and a limited access control system. Sessions are not fully maintained. For production use, upgrades are needed in data integrity, authentication, session management, and access control.

🌐 **Live Demo:** [e-commerce-fullstack-design-blush.vercel.app](https://e-commerce-fullstack-design-blush.vercel.app)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Current Scope & Limitations](#current-scope--limitations)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Pages & Routes](#pages--routes)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Environment Variables](#environment-variables)
- [Local Development Setup](#local-development-setup)
- [Deployment](#deployment)
- [Future Upgrades Needed](#future-upgrades-needed)

---

## Overview

This is a demonstration e-commerce platform where users can browse products, search and filter by category, manage a shopping cart, and register/login with basic JWT authentication. Admins have a dedicated panel to add, edit, and delete products. Built as a design project to showcase fullstack development skills.

---

## Current Scope & Limitations

| Area | Current State |
|------|--------------|
| Authentication | Basic JWT — no refresh tokens, no session expiry handling |
| Access Control | Role check (`user` / `admin`) — limited, not fully enforced on frontend |
| Sessions | Not fully maintained — token stored in localStorage only |
| Data Integrity | No database-level constraints or transactions |
| Input Validation | Minimal — no thorough server-side validation |
| Error Handling | Basic try/catch — not production-grade |
| Security | No rate limiting, no HTTPS enforcement, no CSRF protection |

> This project is intended as a **design prototype**. A production system would require significant upgrades in all areas above.

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
- 🔑 Admin-only protected route (`/admin`)
- ➕ Add new products
- ✏️ Edit existing products
- 🗑️ Delete products
- 📋 View all products in a management table

### Technical Features
- ✅ JWT-based auth with role field (`user` / `admin`)
- ✅ Password hashing with bcryptjs
- ✅ Persistent cart in Supabase (logged-in) or localStorage (guest)
- ✅ React Router v7 client-side navigation
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
├── frontend/                        # React + Vite app
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   │   └── AdminPanel.jsx   # Product management (admin only)
│   │   │   ├── Home.jsx             # Landing page
│   │   │   ├── ProductListing.jsx   # All products with search & filter
│   │   │   ├── ProductDetails.jsx   # Single product + related items
│   │   │   ├── Cart.jsx             # Shopping cart & checkout summary
│   │   │   ├── Login.jsx            # Login form
│   │   │   └── Signup.jsx           # Registration form
│   │   ├── App.jsx                  # Routes definition
│   │   └── main.jsx
│   ├── vercel.json
│   └── package.json
│
└── backend/                         # Node.js + Express API
    ├── config/
    │   └── supabase.js              # Supabase client
    ├── controllers/
    │   ├── authController.js        # Register & Login logic
    │   └── productController.js     # CRUD product logic
    ├── middleware/
    │   └── authMiddleware.js        # JWT protect + adminOnly
    ├── routes/
    │   ├── authRoutes.js
    │   ├── productRoutes.js
    │   └── cartRoutes.js
    ├── server.js
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
| POST | `/api/auth/login` | Login and receive JWT token |

### Products — `/api/products`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/products` | Public | Get all products (`?search=` & `?category=` supported) |
| GET | `/api/products/:id` | Public | Get single product |
| POST | `/api/products` | Admin | Create product |
| PUT | `/api/products/:id` | Admin | Update product |
| DELETE | `/api/products/:id` | Admin | Delete product |

### Cart — `/api/cart`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get user's cart |
| POST | `/api/cart` | Add item to cart |
| PATCH | `/api/cart/:id` | Update item quantity |
| DELETE | `/api/cart/:id` | Remove single item |
| DELETE | `/api/cart` | Clear entire cart |

> All cart routes require `Authorization: Bearer <token>` header.

---

## Database Schema

### `users`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| name | text | Full name |
| email | text | Unique |
| password | text | bcrypt hashed |
| role | text | `user` or `admin` |

### `products`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| name | text | Product name |
| price | numeric | Price in USD |
| category | text | e.g. Electronics, Clothes |
| image | text | Image URL |
| featured | boolean | Show on home page |
| discount | numeric | Discount % |

### `cart`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| user_id | uuid | FK → users.id |
| product_id | uuid | FK → products.id |
| quantity | integer | Item count |

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

---

## Local Development Setup

### Prerequisites
- Node.js v18+
- Supabase account and project

### 1. Clone the repo
```bash
git clone https://github.com/AAbdullahRajput/E-Commerce-Fullstack-Design.git
cd ecommerece-fullstack-design
```

### 2. Backend
```bash
cd backend
npm install
# create .env with variables above
npm run dev
# runs on http://localhost:5000
```

### 3. Frontend
```bash
cd frontend
npm install
# create .env with VITE_API_URL=http://localhost:5000
npm run dev
# runs on http://localhost:5173
```

---

## Deployment

### Backend → Railway
1. Push to GitHub
2. Create Railway project → deploy from repo
3. Add env vars: `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `JWT_SECRET`

### Frontend → Vercel
1. Import repo on Vercel, set root directory to `frontend`
2. Add env var: `VITE_API_URL=https://your-railway-url.railway.app`
3. Auto-deploys on every push to `main`

---

## Future Upgrades Needed

For production readiness, the following improvements are recommended:

- **Authentication:** Add refresh tokens, token blacklisting on logout, and proper session expiry
- **Access Control:** Enforce role checks on the frontend via protected route components
- **Input Validation:** Server-side validation with `Joi` or `express-validator`
- **Data Integrity:** Database-level constraints, foreign key enforcement, and transactions
- **Security:** Rate limiting (`express-rate-limit`), helmet.js headers, CSRF protection
- **Error Handling:** Centralized error handler with proper HTTP status codes
- **Orders:** Proper checkout flow with order history tracking
- **Payments:** Payment gateway integration (e.g. Stripe)
- **Image Uploads:** File upload support via Supabase Storage instead of URL-only

---

## Author

**Abdullah Rajput**
- GitHub: [@AAbdullahRajput](https://github.com/AAbdullahRajput)

---

## License

This project is open source and available under the [MIT License](LICENSE).
