# 🛒 E-Commerce REST API

🚀 **Live Demo:** [https://e-commerceapi-8q7r.onrender.com/](https://e-commerceapi-8q7r.onrender.com/)

A full-featured e-commerce backend API built with Node.js, Express, and MongoDB. This API provides complete functionality for managing products, users, orders, and reviews with secure authentication and role-based access control.

## ✨ Features
- 🔐 JWT Authentication with HTTP-only cookies
- 👥 Role-based authorization (Admin/User)
- 🛍️ Product CRUD with image upload
- ⭐ Review system with ratings
- 📦 Order management
- 🔒 Password hashing with bcrypt
- ✅ Input validation & error handling
- 🗂️ MongoDB with Mongoose ODM
- 📊 Request logging with Morgan
- ⚡ Async error handling

## 🛠️ Tech Stack
- **Runtime:** Node.js (v14+)
- **Framework:** Express.js (v4+)
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT + bcrypt
- **Utilities:** 
  - `cookie-parser` - Cookie handling
  - `morgan` - HTTP request logging
  - `express-async-errors` - Async error handling

## 📁 Project Structure
```
E-CommerceAPI/
├── config/
│   └── database.js
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Order.js
│   └── Review.js
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   ├── orderController.js
│   └── reviewController.js
├── routes/
│   ├── auth.js
│   ├── products.js
│   ├── orders.js
│   └── reviews.js
├── middleware/
│   ├── authentication.js
│   └── authorization.js
├── .env
├── server.js
└── README.md
```

## 📚 API Endpoints

### Authentication
| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| POST | /api/v1/auth/register | Register new user | Public |
| POST | /api/v1/auth/login | Login user | Public |
| GET | /api/v1/auth/logout | Logout user | Private |
| GET | /api/v1/auth/me | Get current user | Private |

### Products
| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| GET | /api/v1/products | Get all products | Public |
| GET | /api/v1/products/:id | Get single product | Public |
| POST | /api/v1/products | Create product | Admin |
| PUT | /api/v1/products/:id | Update product | Admin |
| DELETE | /api/v1/products/:id | Delete product | Admin |

### Orders
| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| GET | /api/v1/orders | Get user's orders | Private |
| GET | /api/v1/orders/:id | Get order details | Private |
| POST | /api/v1/orders | Create order | Private |
| PUT | /api/v1/orders/:id | Update order status | Admin |
| DELETE | /api/v1/orders/:id | Cancel order | Private |

### Reviews
| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| GET | /api/v1/reviews | Get all reviews | Public |
| GET | /api/v1/reviews/:productId | Get product reviews | Public |
| POST | /api/v1/reviews | Create review | Private |
| PUT | /api/v1/reviews/:id | Update review | Private |
| DELETE | /api/v1/reviews/:id | Delete review | Private |

## 🚀 Installation

### Prerequisites
- Node.js v14 or higher
- npm v6 or higher
- MongoDB Atlas account or local MongoDB installation

### Steps
```bash
# Clone the repository
git clone https://github.com/Sinehandev/E-CommerceAPI.git
cd E-CommerceAPI

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start the server
npm start
```

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce

# JWT Configuration
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_LIFETIME=7d

# Image Upload (optional)
MAX_FILE_SIZE=5242880
```

### Variable Descriptions
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for signing JWT tokens (use a strong key!)
- `JWT_LIFETIME` - Token expiration time

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The API will be available at `http://localhost:5000`

## 📝 Example API Requests

### Register User
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePassword123!"
  }'
```

### Login User
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePassword123!"
  }'
```

### Get All Products
```bash
curl http://localhost:5000/api/v1/products
```

### Create Product (Admin Only)
```bash
curl -X POST http://localhost:5000/api/v1/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Product Name",
    "price": 99.99,
    "description": "Product description",
    "category": "Electronics"
  }'
```

### Create Order
```bash
curl -X POST http://localhost:5000/api/v1/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "items": [
      {"productId": "product_id_1", "quantity": 2},
      {"productId": "product_id_2", "quantity": 1}
    ]
  }'
```

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (user/admin),
  createdAt: Date,
  updatedAt: Date
}
```

### Product Model
```javascript
{
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  stock: Number,
  rating: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model
```javascript
{
  userId: ObjectId,
  items: [{productId, quantity, price}],
  totalPrice: Number,
  status: String (pending/shipped/delivered),
  createdAt: Date,
  updatedAt: Date
}
```

### Review Model
```javascript
{
  productId: ObjectId,
  userId: ObjectId,
  rating: Number (1-5),
  comment: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔒 Authentication Flow

1. User registers with email and password
2. Password is hashed using bcrypt
3. User logs in with credentials
4. Server returns JWT token in HTTP-only cookie
5. Client includes token in Authorization header for protected routes
6. Server verifies token and grants access

## ❌ Error Handling

The API returns standardized error responses:

```javascript
{
  success: false,
  message: "Error description",
  statusCode: 400
}
```

### Common Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Server Error

## 🧪 Testing

To test the API, you can use:
- **Postman** - Import the API collection
- **cURL** - Command line requests (examples above)
- **Thunder Client** - VS Code extension

## 🚢 Deployment

### Deployed on Render ✅
This project is successfully deployed on [Render](https://render.com/):
- **Live URL:** [https://e-commerceapi-8q7r.onrender.com/](https://e-commerceapi-8q7r.onrender.com/)

### Deploy Your Own to Render

1. **Create a Render Account**
   - Sign up at [render.com](https://render.com/)
   - Connect your GitHub account

2. **Create a New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the E-CommerceAPI repo

3. **Configure the Service**
   - **Name:** `e-commerceapi` (or your preferred name)
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

4. **Add Environment Variables**
   - Go to "Environment" tab
   - Add the following variables:
     ```
     PORT=5000
     NODE_ENV=production
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     JWT_LIFETIME=7d
     ```

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy your app
   - Your API will be live at the provided URL

### Alternative Deployment Options

**Deploy to DigitalOcean:**
```bash
# Follow DigitalOcean App Platform documentation
# Set environment variables in the platform dashboard
```

**Deploy Locally with Docker:**
```bash
docker build -t e-commerce-api .
docker run -p 5000:5000 e-commerce-api
```

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Sinehandev**
- GitHub: [@Sinehandev](https://github.com/Sinehandev)

## 📞 Support

For issues and questions:
- Open an issue on [GitHub Issues](https://github.com/Sinehandev/E-CommerceAPI/issues)
- Contact via email or GitHub profile

---

**Made with ❤️ by Sinehandev**
