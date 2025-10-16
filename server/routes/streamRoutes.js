
const express = require('express');
const router = express.Router();
const { getLiveFeed, getAlertById } = require('../controllers/streamController');
const { protect } = require('../middleware/authMiddleware');

router.get('/live', protect, getLiveFeed);
router.get('/alerts/:id', protect, getAlertById);

module.exports = router;