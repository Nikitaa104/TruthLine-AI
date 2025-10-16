🌐 TruthLens - Real-Time Crisis Misinformation Detector
<img width="406" height="608" alt="image" src="https://github.com/user-attachments/assets/a4b7ce38-6da6-4469-a9db-e6c92bc50fca" />
<img width="1264" height="607" alt="image" src="https://github.com/user-attachments/assets/3bf923b1-fb42-4eb7-9ae0-cea0af67c41a" />

TruthLens is a full-stack MERN (MongoDB, Express, React, Node.js) application that detects and verifies misinformation in real-time during crisis situations. It provides users with verified facts, identifies false claims, and delivers multilingual alerts.

🎯 Features
✅ Real-Time Misinformation Detection - Live feed of verified/unverified claims
✅ JWT Authentication - Secure signup and login system with bcrypt password hashing
✅ WebSocket Real-Time Updates - Socket.io powered live notifications
✅ Location-Based Alerts - Personalized misinformation feed based on user location
✅ Multi-Language Support - Interface available in EN, HI, FR, ES, DE, AR
✅ User Preferences - Customize trusted sources, notifications, and language
✅ Fact-Check Timeline - View verification history and credibility scores
✅ Responsive Design - Mobile-friendly UI with Tailwind CSS
✅ Interactive Dashboard - Beautiful glassmorphism UI with live updates
✅ Protected Routes - Authentication middleware for secure access

📋 Prerequisites
Before you begin, ensure you have:

Node.js (v16 or higher) - Download
npm or yarn - Comes with Node.js
MongoDB (local or cloud) - Download or Atlas
Git - Download
Code Editor - VS Code recommended - Download


🚀 Quick Start
1. Clone or Extract Project
bash# If from GitHub
git clone <your-repository-url>
cd truthlens

# If from ZIP
unzip truthlens.zip
cd truthlens
2. Setup Backend
bashcd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Update with your configuration
See .env.example for all required variables.
3. Setup Frontend
bashcd client

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Update with your configuration
See .env.example for all required variables.
4. Start MongoDB
Local MongoDB:
bash# Windows
mongod

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
Or use MongoDB Atlas (Cloud):

Create account at https://www.mongodb.com/cloud/atlas
Get connection string
Add to server/.env:

envMONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/truthlens
5. Run Both Servers
Terminal 1 - Backend (from server folder):
bashnpm run dev
You should see:
✅ MongoDB Connected: localhost
🚀 Server running on port 5000
📡 Socket.io ready for real-time updates
Terminal 2 - Frontend (from client folder):
bashnpm run dev
You should see:
VITE v4.4.9  ready in 500 ms
➜  Local:   http://localhost:5173/
6. Open in Browser
Navigate to: http://localhost:5173

📁 Project Structure
TruthLens/
│
├── server/                    # Backend (Node.js + Express)
│   ├── config/
│   │   └── db.js             # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js # Authentication logic
│   │   ├── userController.js # User profile & preferences
│   │   └── streamController.js # Live feed management
│   ├── middleware/
│   │   └── authMiddleware.js # JWT protection
│   ├── models/
│   │   ├── User.js           # User schema
│   │   └── Alert.js          # Alert/misinformation schema
│   ├── routes/
│   │   ├── authRoutes.js     # Auth endpoints
│   │   ├── userRoutes.js     # User endpoints
│   │   └── streamRoutes.js   # Stream endpoints
│   ├── utils/
│   │   └── fakeFeedGenerator.js # Mock data generator
│   ├── .env                  # Environment variables
│   ├── .env.example          # Example env file
│   ├── package.json          # Dependencies
│   └── server.js             # Entry point
│
├── client/                   # Frontend (React + Vite)
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js      # API configuration
│   │   ├── components/
│   │   │   └── common/
│   │   │       └── PrivateRoute.jsx # Protected routes
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Auth state management
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SetLocationPage.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── SettingsPage.jsx
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── userService.js
│   │   │   └── streamService.js
│   │   ├── socket/
│   │   │   └── socket.js    # WebSocket client
│   │   ├── App.jsx          # Main component
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Tailwind styles
│   ├── .env                 # Environment variables
│   ├── .env.example         # Example env file
│   ├── package.json         # Dependencies
│   ├── vite.config.js       # Vite configuration
│   ├── tailwind.config.js   # Tailwind configuration
│   └── index.html           # HTML template
│
└── README.md                # This file

🔌 API Endpoints
Authentication
MethodEndpointDescriptionAuthPOST/api/auth/signupRegister new user❌POST/api/auth/loginLogin user, get JWT❌GET/api/auth/meGet current user✅
User Management
MethodEndpointDescriptionAuthGET/api/user/profileGet user profile✅PUT/api/user/locationUpdate user location✅PUT/api/user/preferencesUpdate preferences✅
Stream/Feed
MethodEndpointDescriptionAuthGET/api/stream/liveGet live misinformation feed✅GET/api/stream/alerts/:idGet specific alert details✅
Health Check
MethodEndpointDescriptionGET/healthAPI health status
WebSocket Events
EventDirectionDataDescriptioninitialFeedServer → ClientArray of alertsInitial feed on connectionnewUpdateServer → ClientAlert objectNew alert in real-timeconnectClient ← Server-Connection establisheddisconnectClient ← Server-Connection lost

🔐 Environment Variables
Backend (server/.env.example)
env# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=your_mongodb_uri

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_minimum_32_characters

# Client Configuration
CLIENT_URL=http://localhost:5173
Frontend (client/.env.example)
env# API Configuration
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
Important: Never commit .env files to version control. Use .env.example as a template for configuration.

🧪 User Flow

Landing Page - User sees TruthLens intro
Sign Up - Create account with name, email, password
Set Location - Select city/region for personalized alerts
Dashboard - View live misinformation feed with verification status
Settings - Customize language, notifications, trusted sources
Real-Time Updates - Receive instant alerts via WebSocket


🔑 Key Technologies
Frontend

React 18 - UI library
Vite - Lightning-fast build tool
React Router - Page navigation
Tailwind CSS - Styling
Axios - HTTP client
Socket.io Client - Real-time communication
Lucide React - Icon library

Backend

Node.js - JavaScript runtime
Express.js - Web framework
MongoDB - NoSQL database
Mongoose - ODM for MongoDB
JWT - Authentication tokens
bcryptjs - Password hashing
Socket.io - Real-time WebSocket
CORS - Cross-origin requests

DevTools

Vite - Frontend bundler
Tailwind CSS - Utility-first CSS
PostCSS - CSS processing
Autoprefixer - Browser compatibility


🐛 Troubleshooting
MongoDB Connection Error
MongoServerError: connect ECONNREFUSED
Fix:
bash# Start MongoDB
mongod                    # Windows/Mac/Linux

# OR use MongoDB Atlas (cloud)
# Update MONGODB_URI in server/.env
Port Already in Use
Error: listen EADDRINUSE: address already in use :::5000
Fix:
bash# Change PORT in server/.env to 5001
PORT=5001

# Update frontend .env
VITE_API_URL=http://localhost:5001/api
VITE_SOCKET_URL=http://localhost:5001
CORS Error
Access to XMLHttpRequest blocked by CORS policy
Fix:

Make sure CLIENT_URL in server/.env matches your frontend URL
Frontend .env has correct VITE_API_URL

"Cannot find module" Error
Fix:
bash# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
Tailwind Styles Not Working
Fix:
bash# Restart frontend after modifying config
npm run dev

# Or clear cache
npm install
npm run dev
API Calls Failing (500 Error)
Check backend terminal for error messages
Common causes:

Missing environment variables in .env
JWT_SECRET too short (must be 32+ characters)
MongoDB not connected
Authentication middleware issue


📚 API Examples
Signup
bashcurl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
Response:
json{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
Login
bashcurl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
Update Location (Protected)
bashcurl -X PUT http://localhost:5000/api/user/location \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "city": "Mumbai",
    "country": "India"
  }'
Get Live Feed (Protected)
bashcurl -X GET http://localhost:5000/api/stream/live?limit=20 \
  -H "Authorization: Bearer <token>"

🚀 Deployment
Deploy Frontend (Vercel)
bashcd client

# Build
npm run build

# Push to GitHub
git add .
git commit -m "Deploy TruthLens frontend"
git push origin main

# Connect to Vercel and deploy
# vercel.com → Import Project → Select GitHub repo
Deploy Backend (Heroku/Render)
bashcd server

# Create Procfile
echo "web: node server.js" > Procfile

# Push to GitHub
git add .
git commit -m "Deploy TruthLens backend"
git push origin main

# Deploy on Heroku/Render/Railway
Environment Variables for Production
env# Backend
NODE_ENV=production
MONGODB_URI=<your-production-mongodb-uri>
JWT_SECRET=<your-secure-jwt-secret>
CLIENT_URL=<your-production-frontend-url>

# Frontend
VITE_API_URL=<your-production-api-url>/api
VITE_SOCKET_URL=<your-production-api-url>
Important: Use strong, unique secrets in production. Never commit sensitive data to version control.

📊 Mock Data Generator
The application includes a fake data generator for testing:
File: server/utils/fakeFeedGenerator.js
Generates mock alerts with:

Random sources (Twitter, Facebook, News, etc.)
Random categories (Health, Disaster, Politics, etc.)
Verified/Misinformation status
Random locations
Auto-updating every 10 seconds

To modify, edit fakeFeedGenerator.js and restart the server.

🔮 Future Features

 Integration with real fact-checking APIs (Google Fact Check, Snopes)
 AI/ML model for automatic misinformation detection
 Push notifications via Firebase Cloud Messaging
 Advanced search and filtering
 User reputation/credibility system
 Social sharing features
 Mobile app (React Native)
 Email verification
 Password reset functionality
 Two-factor authentication
 Admin dashboard
 Analytics and reporting


🤝 Contributing
Contributions are welcome! Please follow these steps:

Fork the repository
Create feature branch (git checkout -b feature/AmazingFeature)
Commit changes (git commit -m 'Add AmazingFeature')
Push to branch (git push origin feature/AmazingFeature)
Open Pull Request


📄 License
This project is licensed under the MIT License - see LICENSE file for details.

👨‍💻 Author
Nikita Pandey

GitHub: @Nikitaa104
Email: pandeynikita190@gmail.com


📞 Support
For support, open an issue on GitHub or contact the project maintainers.

🙏 Acknowledgments

Tailwind CSS - For beautiful utility-first styling
Socket.io - For real-time WebSocket communication
MongoDB - For flexible NoSQL database
React - For powerful UI library
Node.js - For reliable backend runtime


📖 Documentation

React Documentation
Express.js Guide
MongoDB Manual
Tailwind CSS Docs
Socket.io Documentation


Made with ❤️ using MERN Stack
╔═══════════════════════════════════════════════════════════╗
║                     TruthLens v1.0.0                      ║
║          Real-Time Crisis Misinformation Detector         ║
║                  Stay Informed. Stay Accurate.            ║
╚═══════════════════════════════════════════════════════════╝
