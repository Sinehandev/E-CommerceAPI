# 🛒 E-Commerce REST API

A full-featured e-commerce backend API built with Node.js, Express, and MongoDB.

## Features
- 🔐 JWT Authentication with HTTP-only cookies
- 👥 Role-based authorization (Admin/User)
- 🛍️ Product CRUD with image upload
- ⭐ Review system with ratings
- 📦 Order management
- 🔒 Password hashing with bcrypt
- ✅ Input validation & error handling

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Auth:** JWT + bcrypt
- **Other:** cookie-parser, morgan, express-async-errors

## API Endpoints
| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| POST | /api/v1/auth/register | Register user | Public |
| POST | /api/v1/auth/login | Login user | Public |
| GET | /api/v1/auth/logout | Logout user | Private |

## Installation
\```bash
git clone https://github.com/Sinehandev/E-CommerceAPI.git
cd e-commerce-api
npm install
\```

## Environment Variables
Create a `.env` file:
\```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
JWT_LIFETIME=1d
\```

## Run
\```bash
npm start
