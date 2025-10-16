
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

let socket = null;

export const initSocket = (token) => {
  if (socket) return socket;

  socket = io(SOCKET_URL, {
    auth: {
      token: token
    },
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000
  });

  socket.on('connect', () => {
    console.log('✅ Socket connected:', socket.id);
  });

  socket.on('disconnect', () => {
    console.log('❌ Socket disconnected');
  });

  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const subscribeToUpdates = (callback) => {
  if (!socket) return;

  socket.on('initialFeed', (data) => {
    callback({ type: 'initial', data });
  });

  socket.on('newUpdate', (data) => {
    callback({ type: 'new', data });
  });
};

export const unsubscribeFromUpdates = () => {
  if (!socket) return;
  socket.off('initialFeed');
  socket.off('newUpdate');
};