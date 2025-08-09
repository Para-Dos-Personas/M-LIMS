#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 LIMS Inventory Manager Setup');
console.log('===============================\n');

// Check if backend .env exists
const backendEnvPath = path.join(__dirname, 'backend', 'secret.env');
if (!fs.existsSync(backendEnvPath)) {
  console.log('📝 Creating backend environment file...');
  const backendEnvExample = path.join(__dirname, 'backend', 'secret.env.example');
  if (fs.existsSync(backendEnvExample)) {
    fs.copyFileSync(backendEnvExample, backendEnvPath);
    console.log('✅ Backend environment file created from example');
    console.log('⚠️  Please update backend/secret.env with your actual database credentials');
  } else {
    console.log('❌ Backend environment example file not found');
  }
} else {
  console.log('✅ Backend environment file already exists');
}

// Check if frontend .env exists
const frontendEnvPath = path.join(__dirname, 'frontend', '.env');
if (!fs.existsSync(frontendEnvPath)) {
  console.log('📝 Creating frontend environment file...');
  const frontendEnvContent = `REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENV=development
`;
  fs.writeFileSync(frontendEnvPath, frontendEnvContent);
  console.log('✅ Frontend environment file created');
} else {
  console.log('✅ Frontend environment file already exists');
}

console.log('\n📋 Next Steps:');
console.log('1. Update backend/secret.env with your PostgreSQL credentials');
console.log('2. Create a PostgreSQL database named "lims"');
console.log('3. Install dependencies:');
console.log('   cd backend && npm install');
console.log('   cd ../frontend && npm install');
console.log('4. Start the servers:');
console.log('   Backend: cd backend && npm run dev');
console.log('   Frontend: cd frontend && npm start');
console.log('\n📖 See SETUP_GUIDE.md for detailed instructions');
