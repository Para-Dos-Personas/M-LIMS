# Contributing to LIMS Inventory Manager

Thank you for your interest in contributing to LIMS Inventory Manager! This document provides guidelines and information for contributors.

## How to Contribute

### 1. Fork the Repository
1. Go to [LIMS Inventory Manager](https://github.com/AllenPrabu/LIMS-Inventory-Manager)
2. Click the "Fork" button in the top right
3. Clone your forked repository locally

### 2. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 3. Make Your Changes
- Follow the coding standards (see below)
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass

### 4. Commit Your Changes
```bash
git add .
git commit -m "feat: add new inventory tracking feature"
```

### 5. Push and Create a Pull Request
```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with a clear description of your changes.

## Pull Request Guidelines

### Before Submitting
- [ ] Code follows the project's style guidelines
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] No console errors or warnings
- [ ] Feature works on both desktop and mobile

### Pull Request Template
```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Refactoring

## Testing
- [ ] Tested locally
- [ ] All existing tests pass
- [ ] New tests added for new functionality

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where necessary
- [ ] I have made corresponding changes to documentation
```

## Coding Standards

### JavaScript/React
- Use ES6+ features
- Prefer functional components with hooks
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Follow the existing code style

### CSS/Styling
- Use Material-UI components when possible
- Follow the existing color scheme and spacing
- Ensure responsive design
- Use consistent naming conventions

### Backend/Node.js
- Use async/await instead of callbacks
- Add proper error handling
- Validate all inputs
- Use meaningful variable names
- Add comments for complex logic

## Testing

### Frontend Testing
- Test all user interactions
- Ensure responsive design works
- Test error handling
- Verify accessibility features

### Backend Testing
- Test all API endpoints
- Verify authentication and authorization
- Test error scenarios
- Ensure data validation works

## Documentation

When adding new features:
- Update the README.md if needed
- Add JSDoc comments for new functions
- Update API documentation
- Add usage examples

## Reporting Bugs

### Bug Report Template
```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Environment
- OS: [e.g. Windows 10, macOS]
- Browser: [e.g. Chrome, Firefox]
- Version: [e.g. 1.0.0]

## Additional Information
Any other context, screenshots, or logs
```

## Getting Started for Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/LIMS-Inventory-Manager.git
   cd LIMS-Inventory-Manager
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   cp secret.env.example secret.env
   # Edit secret.env with your database credentials
   npm start
   ```

3. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   echo "REACT_APP_API_URL=http://localhost:5000" > .env
   npm start
   ```

4. **Run tests**
   ```bash
   # Backend tests
   cd backend && npm test
   
   # Frontend tests
   cd frontend && npm test
   ```

## Need Help?

- Check existing [Issues](https://github.com/AllenPrabu/LIMS-Inventory-Manager/issues)
- Create a new issue for bugs or feature requests
- Join our discussions for questions

## License

By contributing to LIMS Inventory Manager, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to LIMS Inventory Manager!
