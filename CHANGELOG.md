# Changelog

All notable changes to LIMS Inventory Manager will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Enhanced dashboard with customizable critical thresholds
- Improved transaction logging system
- Better error handling and user feedback
- Comprehensive API documentation

### Changed
- Restructured project documentation
- Improved README with detailed setup instructions
- Enhanced UI/UX with Material-UI components

### Fixed
- Log movement functionality
- Dashboard data loading issues
- Authentication token handling

## [1.0.0] - 2024-08-09

### Added
- **Core Features**
  - User authentication and authorization (JWT)
  - Role-based access control (Admin/User)
  - Component inventory management
  - Customizable critical thresholds per component
  - Transaction logging (inward/outward)
  - Dashboard with analytics and charts
  - Search and filter functionality
  - Responsive Material-UI interface

- **Technical Features**
  - React 18 frontend with hooks
  - Node.js/Express backend
  - PostgreSQL database with Sequelize ORM
  - JWT authentication with bcrypt password hashing
  - CORS configuration for secure cross-origin requests
  - Environment-based configuration
  - Comprehensive error handling

- **Database Features**
  - Components table with all inventory details
  - ComponentLogs table for transaction history
  - Users table for authentication
  - Proper foreign key relationships
  - Timestamp tracking for all records

- **UI/UX Features**
  - Modern Material-UI design
  - Single sidebar navigation
  - Loading states and error messages
  - Color-coded severity indicators
  - Responsive design for mobile/desktop
  - Real-time data updates

### Security
- JWT token-based authentication
- Password hashing with bcrypt
- Role-based authorization
- Input validation and sanitization
- CORS protection
- Environment variable configuration

### Documentation
- Comprehensive README with setup instructions
- API endpoint documentation
- Database schema documentation
- Contributing guidelines
- License file

---

## Version History

- **v1.0.0**: Initial release with core inventory management features
- **Unreleased**: Enhanced features and improvements

## Migration Guide

### From v0.x to v1.0.0
- Database schema has been updated with new fields
- Authentication system has been completely overhauled
- API endpoints have been restructured
- Please refer to the setup guide for fresh installation

---

For detailed information about each release, please refer to the [GitHub releases page](https://github.com/AllenPrabu/LIMS-Inventory-Manager/releases).
