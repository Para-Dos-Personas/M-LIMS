# LIMS Inventory Manager - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp secret.env.example secret.env
   ```

4. **Configure environment variables in `secret.env`:**
   ```env
   PORT=5000
   DB_NAME=lims
   DB_USER=postgres
   DB_PASSWORD=your_actual_password
   DB_HOST=localhost
   JWT_SECRET=your_super_secret_jwt_key_here
   FRONTEND_URL=http://localhost:3000
   NODE_ENV=development
   ```

5. **Create PostgreSQL database:**
   ```sql
   CREATE DATABASE lims;
   ```

6. **Start the backend server:**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   # Create .env file in frontend directory
   echo "REACT_APP_API_URL=http://localhost:5000" > .env
   ```

4. **Start the frontend development server:**
   ```bash
   npm start
   ```

## 🔧 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /api/users/profile` - Get current user profile

### Components
- `GET /api/components` - Get all components
- `POST /api/components` - Create new component
- `GET /api/components/:id` - Get component by ID
- `PUT /api/components/:id` - Update component
- `DELETE /api/components/:id` - Delete component
- `POST /api/components/:id/logs` - Add component log
- `GET /api/components/:id/logs` - Get component logs

### Dashboard
- `GET /api/dashboard/inward?month=YYYY-MM` - Get inward statistics
- `GET /api/dashboard/outward?month=YYYY-MM` - Get outward statistics
- `GET /api/dashboard/low-stock` - Get low stock components
- `GET /api/dashboard/old-stock` - Get old stock components

### Users (Admin only)
- `GET /api/users` - Get all users

## 🔐 Authentication Flow

1. User registers/logs in via `/auth/register` or `/auth/login`
2. Backend returns JWT token and user data
3. Frontend stores token in localStorage
4. All subsequent API calls include token in Authorization header
5. Backend validates token using middleware

## 🛠️ Troubleshooting

### Common Issues

1. **Database Connection Error:**
   - Ensure PostgreSQL is running
   - Check database credentials in `secret.env`
   - Verify database exists

2. **CORS Errors:**
   - Backend CORS is configured for `http://localhost:3000`
   - Update `FRONTEND_URL` in backend `.env` if needed

3. **Authentication Errors:**
   - Check JWT_SECRET is set in backend `.env`
   - Verify token is being sent in Authorization header
   - Check token expiration (24 hours)

4. **API Endpoint Not Found:**
   - Ensure backend server is running on port 5000
   - Check API URL in frontend `.env`
   - Verify route paths match between frontend and backend

### Health Checks

- Backend: `http://localhost:5000/health`
- Frontend: `http://localhost:3000`

## 📁 Project Structure

```
LIMS-Inventory-Manager/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route handlers
│   ├── middleware/      # Authentication middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   └── index.js         # Main server file
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   └── utils/       # Utility functions
│   └── package.json
└── README.md
```

## 🔄 Development Workflow

1. Start backend server: `npm run dev` (in backend directory)
2. Start frontend server: `npm start` (in frontend directory)
3. Backend runs on `http://localhost:5000`
4. Frontend runs on `http://localhost:3000`
5. Frontend automatically proxies API calls to backend

## 🚀 Production Deployment

1. Set `NODE_ENV=production` in backend
2. Update CORS origin to production frontend URL
3. Use strong JWT_SECRET
4. Configure database for production
5. Build frontend: `npm run build`
6. Serve static files from backend or separate web server
