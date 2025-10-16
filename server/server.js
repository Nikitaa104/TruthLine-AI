
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const streamRoutes = require('./routes/streamRoutes');

// Load environment variables
dotenv.config();
console.log("JWT Secret:", process.env.JWT_SECRET ? "Loaded ✅" : "❌ Missing");


// Connect to MongoDB
connectDB();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/stream', streamRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'TruthLens API is running' });
});

// Socket.io real-time updates
const { generateFakeFeed } = require('./utils/fakeFeedGenerator');

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Send initial feed
  const initialFeed = generateFakeFeed(5);
  socket.emit('initialFeed', initialFeed);

  // Send updates every 10 seconds
  const interval = setInterval(() => {
    const update = generateFakeFeed(1)[0];
    socket.emit('newUpdate', update);
  }, 10000);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    clearInterval(interval);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Socket.io ready for real-time updates`);
});

