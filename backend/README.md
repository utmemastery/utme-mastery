# UTME Mastery Backend API

A robust, scalable backend API for the UTME Mastery platform - a world-class UTME preparation application.

## 🚀 Features

- **JWT Authentication** - Secure user registration and login
- **Prisma ORM** - Type-safe database operations with PostgreSQL
- **Rate Limiting** - Protection against abuse
- **Security Middleware** - Helmet, CORS, and input validation
- **Comprehensive Error Handling** - Graceful error responses
- **Scalable Architecture** - Ready for high user volumes

## 🛠️ Tech Stack

- **Node.js** with Express.js
- **PostgreSQL** database
- **Prisma** ORM
- **JWT** for authentication
- **bcrypt** for password hashing
- **Helmet** for security headers
- **CORS** for cross-origin requests
- **Rate limiting** for API protection

## 📋 Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/utme_mastery"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"

# Server Configuration
PORT=5000
NODE_ENV="development"

# CORS Configuration
CORS_ORIGIN="http://localhost:3000"

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 3. Database Setup
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Or run migrations (if using migrations)
npm run db:migrate
```

### 4. Start Development Server
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── src/
│   ├── app.js                 # Main Express application setup
│   ├── controllers/           # HTTP request handlers
│   │   └── authController.js
│   ├── services/             # Business logic layer
│   │   └── authService.js
│   ├── routes/               # API route definitions
│   │   └── auth.js
│   ├── middleware/           # Custom middleware
│   │   └── auth.js
│   └── utils/               # Utility functions
│       └── validation.js
├── config/
│   └── database.js          # Prisma client configuration
├── prisma/
│   └── schema.prisma        # Database schema
├── server.js                # Server entry point
└── package.json
```

## 🔐 API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "username",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Get User Profile
```http
GET /api/auth/profile
Authorization: Bearer <token>
```

#### Update User Profile
```http
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Smith"
}
```

### Health Check
```http
GET /health
```

## 🔧 Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio
- `npm run db:seed` - Seed database with sample data

## 🛡️ Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt with 12 salt rounds
- **Rate Limiting** - Protection against brute force attacks
- **Input Validation** - Comprehensive request validation
- **CORS Protection** - Controlled cross-origin access
- **Security Headers** - Helmet middleware for security headers
- **Error Handling** - Secure error responses

## 📊 Database Schema

The application uses a comprehensive Prisma schema with models for:

- **Users** - Authentication and profiles
- **Subjects & Topics** - UTME syllabus structure
- **Questions** - Question bank with various types
- **Flashcards** - Spaced repetition system
- **Study Sessions** - Learning analytics
- **Progress Tracking** - User learning progress
- **Mock Exams** - Full UTME simulations
- **Study Groups** - Collaborative learning
- **Notifications** - User engagement
- **Achievements** - Gamification system

## 🚀 Deployment

### Environment Variables
Ensure all required environment variables are set in production:

```env
DATABASE_URL="postgresql://user:password@host:port/database"
JWT_SECRET="your-production-secret-key"
NODE_ENV="production"
PORT=5000
```

### Database Migration
```bash
npm run db:migrate
```

### Start Production Server
```bash
npm start
```

## 🔍 Monitoring & Logging

- Request logging for all API calls
- Error logging with stack traces
- Database query logging in development
- Graceful shutdown handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ for UTME students worldwide** 