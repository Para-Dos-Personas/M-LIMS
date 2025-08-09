<div align="center">

# 🏭 LIMS Inventory Manager

**A comprehensive Laboratory Information Management System for efficient inventory tracking and management**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13+-blue.svg)](https://www.postgresql.org/)

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Quick Start](#-quick-start)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Overview

LIMS Inventory Manager is a full-stack web application designed for laboratory inventory management. It provides a modern, user-friendly interface for tracking electronic components, managing stock levels, and maintaining detailed transaction logs.

### Key Benefits
- **🔐 Secure Authentication** - JWT-based authentication with role-based access control
- **📊 Real-time Analytics** - Dashboard with charts and low stock alerts
- **📝 Comprehensive Logging** - Complete audit trail for all inventory movements
- **🎨 Modern UI** - Responsive Material-UI design for desktop and mobile
- **☁️ Cloud Ready** - PostgreSQL database with Railway hosting support

## ✨ Features

### 🔐 Authentication & Security
- **JWT Authentication** - Secure token-based login system
- **Role-based Access Control** - Admin and User roles with different permissions
- **Password Hashing** - bcrypt encryption for secure password storage
- **Protected Routes** - Secure API endpoints and frontend routes

### 📦 Inventory Management
- **Add Components** - Comprehensive component details (name, manufacturer, part number, description, quantity, location, unit price, datasheet link, category)
- **Customizable Thresholds** - Set individual critical stock levels per component
- **Edit Components** - Update any component details including thresholds
- **Search & Filter** - Find components by name, part number, category, location, or quantity range
- **Real-time Updates** - Instant reflection of changes across all views

### 📊 Dashboard & Analytics
- **Inward/Outward Charts** - Visual representation of stock movements by month
- **Critical Low Stock Alerts** - Items below custom thresholds with severity indicators:
  - 🔴 **CRITICAL**: 0 units
  - 🟠 **WARNING**: ≤30% of threshold or ≤3 units  
  - 🔵 **LOW**: ≤ threshold but > warning level
- **Old Stock Tracking** - Items older than 6 months
- **Monthly Statistics** - Total quantities and component counts

### 📝 Transaction Logging
- **Log Stock Movements** - Track all inward (add) and outward (remove) transactions
- **Detailed Logging** - Record reason, project, quantity, user, and timestamp
- **Global Log View** - View all transactions across all components
- **Component-specific Logs** - View transaction history for individual items
- **Audit Trail** - Complete history of all inventory changes

### 🎨 User Experience
- **Material-UI Design** - Clean, modern interface with consistent styling
- **Responsive Layout** - Optimized for desktop, tablet, and mobile devices
- **Single Sidebar Navigation** - Streamlined navigation with logout functionality
- **Loading States** - Visual feedback during API calls
- **Error Handling** - User-friendly error messages and validation
- **Color-coded Alerts** - Visual indicators for different severity levels

## 🛠️ Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18+ | UI framework with hooks |
| **Material-UI** | Latest | Component library |
| **React Router** | 6+ | Client-side routing |
| **Axios** | Latest | HTTP client |
| **Recharts** | Latest | Data visualization |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | JavaScript runtime |
| **Express.js** | 4+ | Web framework |
| **Sequelize** | 6+ | Database ORM |
| **PostgreSQL** | 13+ | Primary database |
| **JWT** | Latest | Authentication |
| **bcrypt** | Latest | Password hashing |

### Infrastructure
| Service | Purpose |
|---------|---------|
| **Railway** | Database hosting |
| **GitHub** | Version control |
| **npm** | Package management |

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** database (or Railway account)

### 1. Clone the Repository
```bash
git clone https://github.com/AllenPrabu/LIMS-Inventory-Manager.git
cd LIMS-Inventory-Manager
```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Environment Configuration
Create `backend/secret.env` from `backend/secret.env.example`:
```env
PORT=5000
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=your_database_host
DB_PORT=5432
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### 4. Frontend Setup
```bash
cd ../frontend
npm install
```

Create `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000
```

### 5. Start the Application
```bash
# Terminal 1: Start backend
cd backend
npm start

# Terminal 2: Start frontend
cd frontend
npm start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

### 6. Seed Sample Data (Optional)
Visit `http://localhost:5000/seed` in your browser to populate the database with sample data.

## 📖 Usage Guide

### 🔐 Getting Started
1. **Register** a new account or **Login** with existing credentials
2. **Admin users** have access to user management
3. **All users** can manage inventory and view logs

### 📦 Managing Inventory
1. **Add Components**: Navigate to Inventory → Add Component
2. **Edit Components**: Use the Edit button in the inventory table
3. **Log Movements**: Use Log Movement for inward/outward transactions
4. **Monitor Dashboard**: Check critical alerts and analytics

### 📊 Dashboard Features
- **Critical Low Stock**: Items below their custom thresholds
- **Monthly Charts**: Visual representation of stock movements
- **Old Stock**: Items older than 6 months
- **Statistics**: Total quantities and component counts

## 🔧 API Documentation

### Authentication Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | Register new user |
| `POST` | `/auth/login` | User login |
| `GET` | `/auth/profile` | Get user profile |

### Component Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/components` | Get all components |
| `POST` | `/api/components` | Create new component |
| `GET` | `/api/components/:id` | Get component by ID |
| `PUT` | `/api/components/:id` | Update component |
| `DELETE` | `/api/components/:id` | Delete component |
| `POST` | `/api/components/:id/logs` | Add log entry |
| `GET` | `/api/components/:id/logs` | Get component logs |

### Dashboard Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/dashboard/low-stock` | Get low stock items |
| `GET` | `/api/dashboard/old-stock` | Get old stock items |
| `GET` | `/api/dashboard/inward` | Get inward statistics |
| `GET` | `/api/dashboard/outward` | Get outward statistics |

### Log Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/logs` | Get all logs |
| `GET` | `/api/logs/paginated` | Get paginated logs |

## 🗄️ Database Schema

### Components Table
```sql
CREATE TABLE "Components" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  manufacturer VARCHAR(255),
  partNumber VARCHAR(255),
  description TEXT,
  quantity INTEGER DEFAULT 0,
  location VARCHAR(255),
  unitPrice DECIMAL(10,2),
  datasheetLink VARCHAR(500),
  category VARCHAR(255),
  criticalThreshold INTEGER DEFAULT 10,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### ComponentLogs Table
```sql
CREATE TABLE "ComponentLogs" (
  id SERIAL PRIMARY KEY,
  changeType VARCHAR(50) NOT NULL, -- 'inward' or 'outward'
  quantity INTEGER NOT NULL,
  reason TEXT,
  project VARCHAR(255),
  userId INTEGER REFERENCES "Users"(id),
  componentId INTEGER REFERENCES "Components"(id),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Users Table
```sql
CREATE TABLE "Users" (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'User',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🚀 Deployment

### Railway Deployment (Recommended)
1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on git push

### Manual Deployment
1. Set up PostgreSQL database
2. Configure environment variables
3. Run database migrations
4. Deploy backend to your server
5. Deploy frontend to static hosting

### Environment Variables
| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Backend server port | Yes |
| `DB_NAME` | Database name | Yes |
| `DB_USER` | Database username | Yes |
| `DB_PASSWORD` | Database password | Yes |
| `DB_HOST` | Database host | Yes |
| `DB_PORT` | Database port | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `FRONTEND_URL` | Frontend URL for CORS | Yes |
| `NODE_ENV` | Environment (development/production) | Yes |

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Contribution Steps
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/AllenPrabu/LIMS-Inventory-Manager/issues)
- **Discussions**: [GitHub Discussions](https://github.com/AllenPrabu/LIMS-Inventory-Manager/discussions)
- **Documentation**: [Wiki](https://github.com/AllenPrabu/LIMS-Inventory-Manager/wiki)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Material-UI** for the beautiful UI components
- **Sequelize** for the excellent ORM
- **Railway** for the database hosting
- **React Community** for the amazing ecosystem

---

<div align="center">

**Built with ❤️ for efficient laboratory inventory management**

[![GitHub stars](https://img.shields.io/github/stars/AllenPrabu/LIMS-Inventory-Manager?style=social)](https://github.com/AllenPrabu/LIMS-Inventory-Manager/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/AllenPrabu/LIMS-Inventory-Manager?style=social)](https://github.com/AllenPrabu/LIMS-Inventory-Manager/network/members)
[![GitHub issues](https://img.shields.io/github/issues/AllenPrabu/LIMS-Inventory-Manager)](https://github.com/AllenPrabu/LIMS-Inventory-Manager/issues)

</div>