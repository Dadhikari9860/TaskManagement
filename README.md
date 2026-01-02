🚀 Task Manager Application

A full-stack Task Manager built with Laravel 12 (API) and React + Tailwind CSS, featuring authentication with Laravel Sanctum.

⚙️ Backend Setup (Laravel 12 API)
📋 Requirements

PHP ≥ 8.2

Composer

MySQL (XAMPP recommended)

Laravel 12

📌 Installation Steps
cd backend
cp .env.example .env
composer install
php artisan key:generate
🔧 Configure .env

Update your backend/.env file:

APP_URL=http://127.0.0.1:8000

DB_DATABASE=task_manager
DB_USERNAME=root
DB_PASSWORD=
🔐 Install Sanctum & Run Migrations
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
🌱 Seed Admin User
php artisan db:seed

Admin Credentials

Email: admin@example.com

Password: admin12345

▶️ Run Backend Server
php artisan serve

API Base URL:

http://127.0.0.1:8000/api
📡 API Endpoints
🔐 Authentication
Method	Endpoint
POST	/api/register
POST	/api/login
GET	/api/me
POST	/api/logout
📝 Tasks (Protected)
Method	Endpoint
GET	/api/tasks
POST	/api/tasks
GET	/api/tasks/{id}
PUT	/api/tasks/{id}
DELETE	/api/tasks/{id}
🎨 Frontend Setup (React + Tailwind CSS)
📋 Requirements

Node.js ≥ 18

npm

📌 Installation Steps
cd frontend
npm install
🔧 Configure .env

Create frontend/.env file:

VITE_API_URL=http://127.0.0.1:8000

⚠️ Restart Vite after creating or updating .env

▶️ Run Frontend
npm run dev

Frontend URL:

http://localhost:5173
👤 Admin Login (Frontend)

Email: admin@gmail.com

Password: admin12345

✅ Notes

Make sure MySQL is running before migrating.

API routes are protected using Laravel Sanctum.

Frontend communicates with backend via REST API.