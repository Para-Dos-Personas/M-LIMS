// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import ProtectedLayout from './components/ProtectedLayout';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Logs from './pages/Logs';
import Users from './pages/Users';
import Notifications from './pages/Notifications';
import Login from './pages/Login';
import Register from './pages/Register';
import AddComponent from './pages/AddComponent';
import { NotificationProvider } from './contexts/NotificationContext';


// A simple guard that redirects to /login if no token
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <NotificationProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected layout + nested routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ProtectedLayout />
              </ProtectedRoute>
            }
          >
            {/* Redirect base "/" to /dashboard */}
            <Route index element={<Navigate to="dashboard" replace />} />

            {/* All child routes now render inside ProtectedLayout's <Outlet /> */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="add-component" element={<AddComponent />} />
            <Route path="logs" element={<Logs />} />
            <Route path="users" element={<Users />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>

          {/* Catch-all: redirect unknown URLs */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </NotificationProvider>
    </Router>
  );
}

export default App;