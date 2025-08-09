\<div align="center"\>

# LIMS Inventory Manager

# IT IS CURRENTLY ONLINE IN THIS WEBSITE - https://lims-inventory-manager.vercel.app/

**A comprehensive Laboratory Information Management System for efficient inventory tracking and management**

[](https://opensource.org/licenses/MIT)
[](https://nodejs.org/)
[](https://reactjs.org/)
[](https://www.postgresql.org/)

[Features](#features) • [Quick Start](#quick-start) • [Documentation](#api-documentation) • [Contributing](#contributing)

\</div\>

-----

## Table of Contents

  - [Overview](#overview)
  - [Architecture & Technology Choices](#architecture--technology-choices)
  - [Features](#features)
  - [Technology Stack](#technology-stack)
  - [Quick Start](#quick-start)
  - [User Role Access](#user-role-access)
  - [Screenshots & Demonstrations](#screenshots--demonstrations)
  - [API Documentation](#api-documentation)
  - [Database Schema](#database-schema)
  - [Known Limitations & Future Improvements](#known-limitations--future-improvements)
  - [Deployment](#deployment)
  - [Contributing](#contributing)
  - [License](#license)

-----

## Overview

LIMS Inventory Manager is a comprehensive full-stack web application specifically designed for laboratory inventory management. Built with modern web technologies, it provides an intuitive interface for tracking electronic components, managing stock levels, and maintaining detailed transaction logs with real-time notifications and analytics.

### Project Purpose

This system addresses the critical need for efficient inventory management in laboratory environments, particularly for electronic components used in research and development. It eliminates manual tracking errors, provides real-time stock visibility, and ensures proper audit trails for all inventory movements.

### Key Benefits

  - **Secure Authentication** - JWT-based authentication with role-based access control
  - **Real-time Analytics** - Dashboard with charts and low stock alerts
  - **Comprehensive Logging** - Complete audit trail for all inventory movements
  - **Modern UI** - Responsive Material-UI design for desktop and mobile
  - **Cloud Ready** - PostgreSQL database with Railway hosting support
  - **Automated Notifications** - Proactive alerts for low stock and old inventory
  - **Customizable Thresholds** - Per-item critical stock level configuration

-----

## Architecture & Technology Choices

### System Architecture

The application follows a **three-tier architecture**:

1.  **Presentation Layer (Frontend)**

      - React 18 with functional components and hooks
      - Material-UI for consistent, professional UI components
      - Context API for global state management (notifications, authentication)
      - React Router for client-side routing and protected routes

2.  **Business Logic Layer (Backend)**

      - Node.js with Express.js framework for RESTful API
      - JWT middleware for authentication and authorization
      - Scheduled background services using node-cron
      - Modular service architecture for business logic separation

3.  **Data Layer (Database)**

      - PostgreSQL for robust relational data storage
      - Sequelize ORM for database abstraction and migrations
      - Foreign key relationships ensuring data integrity
      - Indexed queries for optimal performance

### Technology Justification

**Frontend Technologies:**

  - **React**: Chosen for its component-based architecture, excellent ecosystem, and strong community support
  - **Material-UI**: Provides professional, accessible UI components that ensure consistency and reduce development time
  - **Context API**: Lightweight state management solution perfect for authentication and notification states

**Backend Technologies:**

  - **Node.js/Express**: JavaScript full-stack enables code reusability and faster development cycles
  - **JWT**: Stateless authentication ideal for scalable web applications
  - **Sequelize**: Provides database abstraction, migration support, and protection against SQL injection

**Database Choice:**

  - **PostgreSQL**: Enterprise-grade reliability, excellent JSON support, and strong ACID compliance for inventory data integrity

-----

## Features

### Authentication & Security

  - **JWT Authentication** - Secure token-based login system
  - **Role-based Access Control** - Admin and User roles with different permissions
  - **Password Hashing** - bcrypt encryption for secure password storage
  - **Protected Routes** - Secure API endpoints and frontend routes

### Inventory Management

  - **Add Components** - Comprehensive component details (name, manufacturer, part number, description, quantity, location, unit price, datasheet link, category)
  - **Customizable Thresholds** - Set individual critical stock levels per component
  - **Edit Components** - Update any component details including thresholds
  - **Search & Filter** - Find components by name, part number, category, location, or quantity range
  - **Real-time Updates** - Instant reflection of changes across all views

### Dashboard & Analytics

  - **Inward/Outward Charts** - Visual representation of stock movements by month
  - **Critical Low Stock Alerts** - Items below custom thresholds with severity indicators:
    > **CRITICAL**: 0 units
    > **WARNING**: ≤30% of threshold or ≤3 units
    > **LOW**: ≤ threshold but \> warning level
  - **Old Stock Tracking** - Items older than 6 months
  - **Monthly Statistics** - Total quantities and component counts

### Notification System

  - **Real-time Notifications** - Automated alerts for critical inventory conditions
  - **Low Stock Alerts** - Notifications when items fall below their critical thresholds
  - **Old Stock Alerts** - Notifications for items with no outward movement in 3+ months
  - **Notification Bell** - Visual indicator in sidebar with unread count
  - **Notification Center** - Dedicated page for managing all alerts with:
      - Filter by type (All, Unread, Low Stock, Old Stock)
      - Mark as read/unread functionality
      - Delete notifications
      - Severity-based color coding
  - **Automated Scheduling** - Background checks every 2 hours for new alerts
  - **Admin Controls** - Manual trigger for notification checks

### Transaction Logging

  - **Log Stock Movements** - Track all inward (add) and outward (remove) transactions
  - **Detailed Logging** - Record reason, project, quantity, user, and timestamp
  - **Global Log View** - View all transactions across all components
  - **Component-specific Logs** - View transaction history for individual items
  - **Audit Trail** - Complete history of all inventory changes

### User Experience

  - **Material-UI Design** - Clean, modern interface with consistent styling
  - **Responsive Layout** - Optimized for desktop, tablet, and mobile devices
  - **Single Sidebar Navigation** - Streamlined navigation with logout functionality
  - **Loading States** - Visual feedback during API calls
  - **Error Handling** - User-friendly error messages and validation
  - **Color-coded Alerts** - Visual indicators for different severity levels
  - **Context-aware UI** - Dynamic content based on user roles and permissions

-----

## Technology Stack

### Frontend

| Technology      | Version | Purpose                  |
| --------------- | ------- | ------------------------ |
| **React** | 18+     | UI framework with hooks  |
| **Material-UI** | Latest  | Component library        |
| **React Router**| 6+      | Client-side routing      |
| **Axios** | Latest  | HTTP client              |
| **Recharts** | Latest  | Data visualization       |

### Backend

| Technology      | Version | Purpose                  |
| --------------- | ------- | ------------------------ |
| **Node.js** | 18+     | JavaScript runtime       |
| **Express.js** | 4+      | Web framework            |
| **Sequelize** | 6+      | Database ORM             |
| **PostgreSQL** | 13+     | Primary database         |
| **JWT** | Latest  | Authentication           |
| **bcrypt** | Latest  | Password hashing         |
| **node-cron** | Latest  | Scheduled tasks          |
| **CORS** | Latest  | Cross-origin requests    |

### Infrastructure

| Service   | Purpose            |
| --------- | ------------------ |
| **Railway** | Database hosting   |
| **GitHub** | Version control    |
| **npm** | Package management |

-----

## Quick Start

### Prerequisites

  - **Node.js** (v18 or higher)
  - **npm** or **yarn**
  - **PostgreSQL** database (or Railway account)

### 1\. Clone the Repository

```bash
git clone https://github.com/AllenPrabu/LIMS-Inventory-Manager.git
cd LIMS-Inventory-Manager
```

### 2\. Backend Setup

```bash
cd backend
npm install
```


### 3\. Environment Configuration

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
### (Optional — Restore from `schema.sql`)

download the file from `backend/db/schema.sql`, then:

1. Make sure PostgreSQL is running and a database exists (e.g., named `lims`):
   ```bash
   createdb -U postgres lims
   ```
2. Run the following command to load the schema:
    ```
    psql -U postgres -d lims -f backend/db/schema.sql
    ```


Create `backend/secret.env` from `backend/secret.env.example`:


### 4\. Frontend Setup

```bash
cd ../frontend
npm install
```

Create `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:5000
```

### 5\. Start the Application

```bash
# Terminal 1: Start backend
cd backend
npm start

# Terminal 2: Start frontend
cd frontend
npm start
```

The application will be available at:

  - **Frontend**: `http://localhost:3000`
  - **Backend API**: `http://localhost:5000`
  - **Health Check**: `http://localhost:5000/health`

### 6\. Seed Sample Data (Optional)

Visit `http://localhost:5000/seed` in your browser to populate the database with sample data from the A-1 Launchpad component list (28 components across 14 categories).

-----

## User Role Access

### Default Login Credentials

After seeding the database, you can access the application with these credentials:

#### Admin Account

  - **Username**: `testadmin`
  - **Password**: `admin`
  - **Capabilities**: Full system access including user management and manual notification triggers

#### Regular User Account

  - **Username**: `testuser`
  - **Password**: `testuser`
  - **Capabilities**: Inventory management, logs, dashboard, and notifications

### Role-Based Features

#### Admin Role Features:

  - **User Management**: Create, edit, and delete user accounts
  - **System Configuration**: Access to system-wide settings
  - **Manual Notification Triggers**: Force notification checks outside scheduled intervals
  - **Full Inventory Access**: All standard inventory management features
  - **Advanced Analytics**: Access to detailed system metrics and reports

#### User Role Features:

  - **Inventory Management**: Add, edit, and delete components
  - **Transaction Logging**: Record inward and outward stock movements
  - **Dashboard Access**: View analytics, charts, and critical alerts
  - **Notification Center**: Receive and manage low stock and old stock alerts
  - **Search and Filtering**: Advanced component search capabilities

### Creating New User Accounts

1.  **Admin Registration**: Only existing admins can create new admin accounts
2.  **User Registration**: New users can self-register through the registration page
3.  **Role Assignment**: Admins can modify user roles through the user management interface

### Security Features by Role

  - **Session Management**: All users have secure JWT-based sessions
  - **Route Protection**: Role-based access control prevents unauthorized access
  - **Data Isolation**: Users can only access data they're authorized to view
  - **Audit Trails**: All actions are logged with user attribution

-----

## Usage Guide

### Getting Started

1.  **Register** a new account or **Login** with existing credentials
2.  **Admin users** have access to user management and notification controls
3.  **All users** can manage inventory, view logs, and receive notifications

### User Roles

  - **Admin**: Full access to all features including user management and manual notification triggers
  - **User**: Access to inventory management, logs, dashboard, and notifications

### Managing Inventory

1.  **Add Components**: Navigate to Inventory → Add Component
      - Fill in component details including custom critical threshold
      - Select from 14 predefined categories
      - Set location and pricing information
2.  **Edit Components**: Use the Edit button in the inventory table
      - Update any component details including thresholds
      - Changes reflect immediately across the system
3.  **Log Movements**: Use Log Movement for inward/outward transactions
      - **Inward**: Adding stock (purchases, returns)
      - **Outward**: Removing stock (usage, sales, waste)
      - Include reason and project information
4.  **Monitor Dashboard**: Check critical alerts and analytics

### Dashboard Features

  - **Critical Low Stock**: Items below their custom thresholds with color-coded severity
  - **Monthly Charts**: Visual representation of stock movements
  - **Old Stock**: Items older than 6 months without outward movement
  - **Statistics**: Total quantities and component counts

### Notification Management

1.  **Bell Icon**: Shows unread notification count in sidebar
2.  **Notification Center**: Access via Notifications page
      - Filter notifications by type and status
      - Mark notifications as read or delete them
      - View detailed component information
3.  **Automated Alerts**: System automatically checks every 2 hours for:
      - Low stock conditions
      - Old stock (3+ months without outward movement)

-----

## Screenshots & Demonstrations

### Application Screenshots

#### Dashboard Overview

<img src="https://raw.githubusercontent.com/AllenPrabu/LIMS-Inventory-Manager/main/docs/screenshots/Dashboard.gif" alt="Dashboard Demo" width="800"/>

*Interactive dashboard showing inventory statistics, low stock alerts, and monthly movement charts with real-time data*

#### Inventory Management

<img src="https://raw.githubusercontent.com/AllenPrabu/LIMS-Inventory-Manager/main/docs/screenshots/Inventory.gif" alt="Inventory Demo" width="800"/>

*Complete inventory view with search, filter, and component management capabilities*

#### Transaction Logging

<img src="https://raw.githubusercontent.com/AllenPrabu/LIMS-Inventory-Manager/main/docs/screenshots/Logs.gif" alt="Logs Demo" width="800"/>

*Comprehensive logging system showing all inward and outward stock movements with detailed audit trails*

#### Notification System

<img src="https://raw.githubusercontent.com/AllenPrabu/LIMS-Inventory-Manager/main/docs/screenshots/Notification.gif" alt="Notification Demo" width="800"/>

*Real-time notification center displaying low stock and old stock alerts with management options*

#### User Management

<img src="https://raw.githubusercontent.com/AllenPrabu/LIMS-Inventory-Manager/main/docs/screenshots/Users.gif" alt="Users Demo" width="800"/>

*Administrative user management interface with role assignment and user creation capabilities*

### Key Functionality Demonstrations

#### Responsive Design

The application is fully responsive and works seamlessly across different screen sizes:

  - **Desktop**: Full-featured interface with sidebar navigation
  - **Tablet**: Optimized layout with collapsible sidebar
  - **Mobile**: Touch-friendly interface with bottom navigation

#### Dashboard Features

  - **Real-time Charts**: Interactive charts showing monthly inward/outward movements
  - **Critical Alerts**: Color-coded low stock warnings with severity indicators
  - **Quick Statistics**: Total components, quantities, and movement summaries

#### Notification System

  - **Bell Icon**: Shows unread notification count in the sidebar
  - **Notification Center**: Comprehensive notification management with filtering
  - **Real-time Updates**: Automatic notification polling every 5 minutes
  - **Severity Levels**: Critical, High, Medium, and Low priority notifications

#### Inventory Management

  - **Search & Filter**: Advanced filtering by category, location, and stock levels
  - **Bulk Operations**: Edit multiple components efficiently
  - **Custom Thresholds**: Set individual critical stock levels per component
  - **Audit Trail**: Complete transaction history for each component

### User Experience Highlights

#### Authentication Flow

  - Secure login/registration with form validation
  - Role-based redirection to appropriate dashboard
  - Session management with automatic token refresh

#### Mobile Responsiveness

  - Touch-optimized interface elements
  - Swipe gestures for navigation
  - Responsive data tables with horizontal scrolling
  - Mobile-friendly modal dialogs and forms

#### Performance Features

  - Lazy loading for large component lists
  - Optimistic UI updates for better perceived performance
  - Efficient data fetching with pagination
  - Client-side caching for frequently accessed data

-----

## API Documentation

### Authentication Endpoints

| Method | Endpoint         | Description      |
| ------ | ---------------- | ---------------- |
| `POST` | `/auth/register` | Register new user|
| `POST` | `/auth/login`    | User login       |
| `GET`  | `/auth/profile`  | Get user profile |

### Component Endpoints

| Method   | Endpoint                 | Description         |
| -------- | ------------------------ | ------------------- |
| `GET`    | `/api/components`        | Get all components  |
| `POST`   | `/api/components`        | Create new component|
| `GET`    | `/api/components/:id`    | Get component by ID |
| `PUT`    | `/api/components/:id`    | Update component    |
| `DELETE` | `/api/components/:id`    | Delete component    |
| `POST`   | `/api/components/:id/logs` | Add log entry       |
| `GET`    | `/api/components/:id/logs` | Get component logs  |

### Dashboard Endpoints

| Method | Endpoint                   | Description            |
| ------ | -------------------------- | ---------------------- |
| `GET`  | `/api/dashboard/low-stock` | Get low stock items    |
| `GET`  | `/api/dashboard/old-stock` | Get old stock items    |
| `GET`  | `/api/dashboard/inward`    | Get inward statistics  |
| `GET`  | `/api/dashboard/outward`   | Get outward statistics |

### Log Endpoints

| Method | Endpoint               | Description        |
| ------ | ---------------------- | ------------------ |
| `GET`  | `/api/logs`            | Get all logs       |
| `GET`  | `/api/logs/paginated`  | Get paginated logs |

### Notification Endpoints

| Method | Endpoint                         | Description                  |
| ------ | -------------------------------- | ---------------------------- |
| `GET`  | `/api/notifications`             | Get user notifications       |
| `POST` | `/api/notifications/mark-read`   | Mark notifications as read   |
| `POST` | `/api/notifications/delete`      | Delete notifications         |
| `GET`  | `/api/notifications/counts`      | Get notification counts      |
| `POST` | `/api/notifications/trigger-checks` | Manual trigger (Admin only)|

-----

## Database Schema

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

### Notifications Table

```sql
CREATE TABLE "Notifications" (
  id SERIAL PRIMARY KEY,
  type ENUM('low_stock', 'old_stock') NOT NULL,
  message TEXT NOT NULL,
  componentId INTEGER REFERENCES "Components"(id),
  userId INTEGER REFERENCES "Users"(id),
  isRead BOOLEAN DEFAULT false,
  severity ENUM('critical', 'high', 'medium', 'low') DEFAULT 'medium',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

-----

## Known Limitations & Future Improvements

### Current Limitations

#### Technical Limitations

  - **Database Scaling**: Current setup optimized for small to medium-sized inventories (up to 10,000 components)
  - **File Upload**: No support for bulk component import via CSV/Excel files
  - **Image Storage**: Component images are stored as URLs only, no local file upload capability
  - **Offline Support**: No offline functionality; requires constant internet connection
  - **Mobile App**: Web-based only, no native mobile applications available

#### Functional Limitations

  - **Barcode Integration**: No barcode scanning capability for quick component identification
  - **Multi-location Support**: Single location tracking per component only
  - **Supplier Management**: Basic supplier information without purchase order integration
  - **Reporting**: Limited to basic analytics; no advanced reporting or export features
  - **Multi-language**: English language only, no internationalization support

#### User Experience Limitations

  - **Bulk Operations**: Limited bulk editing capabilities for multiple components
  - **Advanced Search**: Basic search functionality without complex query building
  - **Customization**: Fixed UI theme and layout options
  - **Integration**: No third-party system integrations (ERP, procurement systems)

### Planned Future Improvements

#### Short-term Enhancements (Next 3 months)

  - **Bulk Import/Export**: CSV and Excel file support for component data
  - **Advanced Reporting**: PDF reports with customizable templates
  - **Barcode Support**: QR code generation and scanning capabilities
  - **Enhanced Search**: Advanced filters and search operators
  - **UI Themes**: Dark mode and customizable color schemes

#### Medium-term Features (3-6 months)

  - **Mobile Applications**: Native iOS and Android apps with offline sync
  - **Multi-location Support**: Track components across multiple storage locations
  - **Supplier Integration**: Purchase order management and supplier catalogs
  - **API Webhooks**: Real-time notifications to external systems
  - **Advanced Analytics**: Predictive analytics for inventory optimization

#### Long-term Vision (6+ months)

  - **AI-Powered Insights**: Machine learning for demand forecasting
  - **IoT Integration**: Smart shelf monitoring with weight sensors
  - **Blockchain Tracking**: Immutable audit trails for critical components
  - **Multi-tenant Architecture**: Support for multiple organizations
  - **Enterprise Features**: SSO, LDAP integration, and advanced security

### Performance Considerations

#### Current Performance

  - **Response Time**: Average API response time \< 200ms for typical operations
  - **Concurrent Users**: Tested with up to 50 concurrent users
  - **Database Queries**: Optimized with proper indexing and query optimization
  - **Frontend Loading**: Initial page load \< 3 seconds on standard broadband

#### Scalability Plans

  - **Database Optimization**: Query optimization and connection pooling
  - **Caching Strategy**: Redis implementation for frequently accessed data
  - **CDN Integration**: Static asset delivery optimization
  - **Microservices**: Gradual migration to microservices architecture

### Contributing to Improvements

We welcome contributions to address these limitations\! Priority areas for community contributions:

1.  **Bulk Import/Export Functionality**
2.  **Advanced Search and Filtering**
3.  **Mobile Responsiveness Improvements**
4.  **Additional Chart Types and Analytics**
5.  **Internationalization Support**

See our [Contributing Guide](https://www.google.com/search?q=CONTRIBUTING.md) for details on how to contribute to these improvements.

-----

## Deployment

### Vercel Deployment (Recommended)

#### Prerequisites

  - GitHub account
  - Vercel account (free)
  - Railway account for PostgreSQL database

#### Step 1: Deploy Backend to Vercel

1.  **Push to GitHub**: Ensure your code is pushed to GitHub

2.  **Import to Vercel**:

      - Go to [vercel.com](https://vercel.com) and sign in
      - Click "New Project" and import your GitHub repository
      - Select the `backend` folder as the root directory
      - Vercel will automatically detect it as a Node.js project

3.  **Configure Environment Variables** in Vercel dashboard:

    ```
    NODE_ENV=production
    DB_NAME=your_railway_db_name
    DB_USER=your_railway_db_user
    DB_PASSWORD=your_railway_db_password
    DB_HOST=your_railway_db_host
    DB_PORT=5432
    JWT_SECRET=your_super_secret_jwt_key
    FRONTEND_URL=https://your-frontend-domain.vercel.app
    ```

4.  **Deploy**: Click "Deploy" and wait for deployment to complete

#### Step 2: Deploy Frontend to Vercel

1.  **Create New Project**: Import the same GitHub repository again
2.  **Select Frontend**: Choose the `frontend` folder as root directory
3.  **Configure Environment Variables**:
    ```
    REACT_APP_API_URL=https://your-backend-domain.vercel.app
    ```
4.  **Deploy**: Click "Deploy"

#### Step 3: Update CORS Settings

After both deployments, update your backend environment variables:

```
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### Alternative: Single Vercel Deployment

You can also deploy as a monorepo:

1.  **Vercel Configuration**: Use the root `vercel.json` (already created)
2.  **Environment Variables**: Set all variables in Vercel dashboard
3.  **Build Settings**:
      - Build Command: `npm run build`
      - Output Directory: `frontend/build`

### Railway Database Setup

1.  Create a PostgreSQL database on Railway
2.  Copy the connection details
3.  Add them to your Vercel environment variables

### Manual Deployment

1.  Set up PostgreSQL database
2.  Configure environment variables
3.  Run database migrations
4.  Deploy backend to your server
5.  Deploy frontend to static hosting

### Environment Variables

| Variable       | Description                       | Required |
| -------------- | --------------------------------- | -------- |
| `PORT`         | Backend server port               | Yes      |
| `DB_NAME`      | Database name                     | Yes      |
| `DB_USER`      | Database username                 | Yes      |
| `DB_PASSWORD`  | Database password                 | Yes      |
| `DB_HOST`      | Database host                     | Yes      |
| `DB_PORT`      | Database port                     | Yes      |
| `JWT_SECRET`   | JWT signing secret                | Yes      |
| `FRONTEND_URL` | Frontend URL for CORS             | Yes      |
| `NODE_ENV`     | Environment (development/production) | Yes      |

-----

## Contributing

We welcome contributions\! Please see our [Contributing Guide](https://www.google.com/search?q=CONTRIBUTING.md) for details.

### Quick Contribution Steps

1.  Fork the repository
2.  Create a feature branch (`git checkout -b feature/amazing-feature`)
3.  Commit your changes (`git commit -m 'Add amazing feature'`)
4.  Push to the branch (`git push origin feature/amazing-feature`)
5.  Open a Pull Request

-----

## Support

  - **Issues**: [GitHub Issues](https://github.com/AllenPrabu/LIMS-Inventory-Manager/issues)
  - **Discussions**: [GitHub Discussions](https://github.com/AllenPrabu/LIMS-Inventory-Manager/discussions)
  - **Documentation**: [Wiki](https://github.com/AllenPrabu/LIMS-Inventory-Manager/wiki)

-----

## License

This project is licensed under the MIT License - see the [LICENSE](https://www.google.com/search?q=LICENSE) file for details.

-----

## Acknowledgments

  - **Material-UI** for the beautiful UI components
  - **Sequelize** for the excellent ORM
  - **Railway** for the database hosting
  - **React Community** for the amazing ecosystem

-----

\<div align="center"\>

**Built for efficient laboratory inventory management**

[](https://github.com/AllenPrabu/LIMS-Inventory-Manager/stargazers)
[](https://github.com/AllenPrabu/LIMS-Inventory-Manager/network/members)
[](https://github.com/AllenPrabu/LIMS-Inventory-Manager/issues)

\</div\>