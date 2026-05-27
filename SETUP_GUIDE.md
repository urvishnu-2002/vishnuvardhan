# Portfolio Backend & Admin Panel Setup Guide

## Project Structure Overview

```
portfolio/
├── backend/              (Express + MongoDB backend)
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── Project.js
│   │   └── Admin.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── projects.js
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   ├── .gitignore
│   └── README.md
└── frontend/
    └── src/
        ├── pages/
        │   └── vasudev/           (Admin Panel)
        │       ├── index.jsx
        │       ├── AdminContext.jsx
        │       ├── AdminLogin.jsx
        │       ├── ProjectManager.jsx
        │       ├── AdminLogin.css
        │       └── ProjectManager.css
        └── services/
            └── api.js            (API client)
```

## Setup Instructions

### 1. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Configure Environment Variables
Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```

Update `.env` with your MongoDB connection:
```env
MONGODB_URI=mongodb://localhost:27017/PortfolioDB
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/PortfolioDB

PORT=5000
NODE_ENV=development
JWT_SECRET=your_secure_jwt_secret_key_change_in_production
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123456
```

#### Start MongoDB
Make sure MongoDB is running:
```bash
# Windows
mongod

# macOS (if installed via Homebrew)
brew services start mongodb-community

# Or use MongoDB Atlas cloud
```

#### Initialize Admin Account
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

**Save the returned token** - you'll need it for testing.

#### Start Backend Server
```bash
# Development
npm run dev

# Production
npm start
```

The server runs on `http://localhost:5000`

### 2. Frontend Setup

#### Install Dependencies (if needed)
```bash
cd frontend
npm install
```

#### Start Frontend Development Server
```bash
npm run dev
```

The frontend runs on `http://localhost:5173`

### 3. Access the Admin Panel

Navigate to:
```
http://localhost:5173/admin
```

**Login Credentials:**
- Email: `admin@example.com`
- Password: `your_secure_password` (or whatever you created)

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication

Include JWT token in all protected requests:
```
Authorization: Bearer <your_jwt_token>
```

### Public Endpoints

#### Get All Published Projects
```
GET /projects
```
Response:
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "title": "Project Title",
      "category": "Category",
      "description": "...",
      "shortDescription": "...",
      "tags": ["React", "Node.js"],
      "link": "#",
      "featured": false,
      "status": "published",
      "order": 0,
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

#### Get Single Project
```
GET /projects/:id
```

#### Health Check
```
GET /health
```

### Admin Endpoints

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password"
}
```

Response:
```json
{
  "success": true,
  "token": "eyJhbGc...",
  "admin": {
    "id": "...",
    "email": "admin@example.com",
    "role": "super_admin"
  }
}
```

#### Register New Admin
```
POST /auth/register
Content-Type: application/json

{
  "email": "newadmin@example.com",
  "password": "password",
  "role": "admin"
}
```

#### Get Current Admin
```
GET /auth/me
Authorization: Bearer <token>
```

#### Get All Projects (Admin)
```
GET /projects/admin/all
Authorization: Bearer <token>
```

#### Create Project
```
POST /projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Project Title",
  "category": "Category Name",
  "description": "Full description",
  "shortDescription": "Short description",
  "tags": ["React", "Node.js", "MongoDB"],
  "link": "https://project.com",
  "featured": true,
  "status": "published",
  "order": 1
}
```

#### Update Project
```
PUT /projects/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "category": "Updated Category",
  ...
}
```

#### Delete Project
```
DELETE /projects/:id
Authorization: Bearer <token>
```

## Admin Panel Features

### Dashboard
- View all projects (published, draft, archived)
- Add new projects
- Edit existing projects
- Delete projects
- Filter by status
- Manage project order

### Project Management
- **Title**: Project name
- **Category**: Project category/type
- **Short Description**: 200 character max description
- **Full Description**: Detailed project description
- **Tags**: Technology stack (comma-separated)
- **Project Link**: External link to project
- **Status**: Draft, Published, or Archived
- **Display Order**: Control project display order
- **Featured**: Mark project as featured

## Frontend Integration

### Project Display
The Projects page now:
1. Attempts to fetch from backend API
2. Falls back to default hardcoded projects if backend is unavailable
3. Shows loading state while fetching
4. Auto-updates when you publish new projects from admin panel

### How to Add/Edit Projects
1. Go to `http://localhost:5173/admin`
2. Login with admin credentials
3. Click "Add New Project"
4. Fill in project details
5. Click "Create Project" or "Update Project"
6. Projects with status "published" will appear on the Projects page

## Troubleshooting

### Backend Connection Failed
- Ensure MongoDB is running
- Check `.env` file has correct `MONGODB_URI`
- Verify `CORS_ORIGIN` matches frontend URL
- Check backend server is running on port 5000

### Admin Login Not Working
- Verify admin account exists (check MongoDB)
- Ensure `JWT_SECRET` is set correctly
- Check browser console for error messages

### Projects Not Showing
- Verify projects have status: "published"
- Check network tab in browser console
- Ensure backend API is accessible on `http://localhost:5000/api/projects`

### CORS Errors
- Update `CORS_ORIGIN` in `.env` to match frontend URL
- Restart backend server after changing `.env`

## Database Schema

### Project Collection
```javascript
{
  title: String,              // Required
  category: String,           // Required
  description: String,        // Required, max 1000 chars
  shortDescription: String,   // Required, max 200 chars
  tags: [String],            // Optional
  link: String,              // Default: "#"
  image: String,             // Optional
  featured: Boolean,         // Default: false
  status: String,            // Enum: draft, published, archived
  order: Number,             // Default: 0
  createdAt: Date,           // Auto-generated
  updatedAt: Date            // Auto-generated
}
```

### Admin Collection
```javascript
{
  email: String,             // Unique, required
  password: String,          // Hashed, required
  role: String,              // Enum: admin, super_admin
  isActive: Boolean,         // Default: true
  lastLogin: Date,           // Tracked automatically
  createdAt: Date,           // Auto-generated
  updatedAt: Date            // Auto-generated
}
```

## Security Notes

- **JWT Secret**: Change `JWT_SECRET` in production
- **Password**: Use strong passwords for admin accounts
- **HTTPS**: Use HTTPS in production
- **Environment Variables**: Never commit `.env` to version control
- **Validation**: All inputs are validated on backend

## Next Steps

1. **Custom Styling**: Modify CSS files in `admin panel` directory
2. **Add More Fields**: Update Project schema in `backend/models/Project.js`
3. **Image Upload**: Implement multer middleware for image uploads
4. **Advanced Features**: Add filtering, search, pagination to admin panel
5. **Database Backup**: Set up regular MongoDB backups
6. **Deployment**: Deploy backend to service like Heroku, AWS, or DigitalOcean

## Support

For issues or questions, check:
1. Browser console for client-side errors
2. Backend terminal for server errors
3. MongoDB logs for database issues
4. Network tab in browser DevTools for API calls
