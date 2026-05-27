# Portfolio Backend

Express.js backend for portfolio management with MongoDB.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Update the `.env` file with:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure random string for JWT signing
- `PORT`: Server port (default: 5000)

### 3. MongoDB Setup

Make sure MongoDB is running. If using MongoDB Atlas:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

### 4. Initialize Admin Account

Run this curl command to create the first admin:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "your_secure_password",
    "role": "super_admin"
  }'
```

Save the returned token.

### 5. Start the Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Public Endpoints

- `GET /api/projects` - Get all published projects
- `GET /api/projects/:id` - Get single project
- `GET /api/health` - Health check

### Admin Endpoints (Require Authentication)

**Authentication:**
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register new admin
- `GET /api/auth/me` - Get current admin

**Projects:**
- `GET /api/projects/admin/all` - Get all projects (including unpublished)
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

## Authentication

Include JWT token in Authorization header:

```
Authorization: Bearer <token>
```

## Database Schema

### Project
- title (String, required)
- category (String, required)
- description (String, required)
- shortDescription (String, required)
- tags (Array)
- link (String)
- image (String)
- featured (Boolean)
- status (enum: draft, published, archived)
- order (Number)
- timestamps (createdAt, updatedAt)

### Admin
- email (String, unique, required)
- password (String, hashed)
- role (enum: admin, super_admin)
- isActive (Boolean)
- lastLogin (Date)
- timestamps
