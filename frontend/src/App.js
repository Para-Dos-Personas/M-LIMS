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
import WarehouseManagement from './pages/WarehouseManagement';

import { NotificationProvider } from './contexts/NotificationContext';
import { WarehouseProvider } from './contexts/WarehouseContext';

// Guard: redirect to /login if not authenticated
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <NotificationProvider>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected */}
          <Route
            path="/"
            element={
              <WarehouseProvider>
                <ProtectedRoute>
                  <ProtectedLayout />
                </ProtectedRoute>
              </WarehouseProvider>
            }
          >
            {/* Default → /dashboard */}
            <Route index element={<Navigate to="dashboard" replace />} />

            {/* App pages */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="add-component" element={<AddComponent />} />
            <Route path="logs" element={<Logs />} />
            <Route path="users" element={<Users />} />
            <Route path="notifications" element={<Notifications />} />
            
            {/* Warehouse Management */}
            <Route path="warehouses" element={<WarehouseManagement />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </NotificationProvider>
    </Router>
  );
}

export default App;