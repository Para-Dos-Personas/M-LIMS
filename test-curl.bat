@echo off
echo Testing LIMS Dashboard API
echo =========================

echo.
echo 1. Seeding sample data...
curl -X POST http://localhost:5000/seed

echo.
echo 2. Registering test user...
curl -X POST http://localhost:5000/auth/register -H "Content-Type: application/json" -d "{\"username\":\"testuser2\",\"password\":\"password\",\"role\":\"User\"}"

echo.
echo 3. Logging in...
curl -X POST http://localhost:5000/auth/login -H "Content-Type: application/json" -d "{\"username\":\"testuser2\",\"password\":\"password\"}"

echo.
echo 4. Testing low stock endpoint (replace TOKEN with the token from step 3)...
echo curl -X GET http://localhost:5000/api/dashboard/low-stock -H "Authorization: Bearer TOKEN"

echo.
echo 5. Testing debug endpoint (replace TOKEN with the token from step 3)...
echo curl -X GET http://localhost:5000/api/dashboard/debug/components -H "Authorization: Bearer TOKEN"

echo.
echo Instructions:
echo 1. Copy the token from step 3
echo 2. Replace TOKEN in steps 4 and 5 with the actual token
echo 3. Run those commands to see the data
