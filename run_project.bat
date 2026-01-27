@echo off
echo Starting Diabetic Retinopathy Reference Project...

:: Check if node_modules exists in frontend
if not exist "frontend\node_modules" (
    echo Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
)

echo Starting Backend...
start "Backend" cmd /k "python backend/app.py"

echo Starting Frontend...
cd frontend
start "Frontend" cmd /k "npm run dev"

echo Both services started!
