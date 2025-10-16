
const express = require('express');
const router = express.Router();
const { 
  updateLocation, 
  updatePreferences, 
  getProfile 
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/profile', protect, getProfile);
router.put('/location', protect, updateLocation);
router.put('/preferences', protect, updatePreferences);
module.exports = router;