import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Logs from './pages/Logs';
import Users from './pages/Users';
import Notifications from './pages/Notifications';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Register from './pages/Register';
import { Box } from '@mui/material';

// ✅ Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Box sx={{ display: 'flex' }}>
        {isAuthenticated && <Sidebar />}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: 3,
          }}
        >
          <Routes>
            {/* 🔁 Redirect / based on login */}
            <Route path="/" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} />} />
            <Route path="/login" element={<Login />} />

            {/* ✅ Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/inventory"
              element={
                <ProtectedRoute>
                  <Inventory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/logs"
              element={
                <ProtectedRoute>
                  <Logs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
