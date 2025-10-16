
const Alert = require('../models/Alert');
const { generateFakeFeed } = require('../utils/fakeFeedGenerator');

// @route   GET /api/stream/live
// @desc    Get live misinformation feed
// @access  Private
const getLiveFeed = async (req, res) => {
  try {
    const { limit = 20, location } = req.query;

    // In production, this would query real alerts from database
    // For now, generate fake data
    const feed = generateFakeFeed(parseInt(limit));

    // Filter by location if provided
    let filteredFeed = feed;
    if (location) {
      filteredFeed = feed.filter(item => 
        item.location?.country?.toLowerCase().includes(location.toLowerCase()) ||
        item.location?.city?.toLowerCase().includes(location.toLowerCase())
      );
    }

    res.json({
      success: true,
      count: filteredFeed.length,
      data: filteredFeed
    });
  } catch (error) {
    console.error('Get live feed error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @route   GET /api/stream/alerts/:id
// @desc    Get specific alert details
// @access  Private
const getAlertById = async (req, res) => {
  try {
    // In production, fetch from database
    const mockAlert = {
      _id: req.params.id,
      source: 'Twitter',
      claim: 'Detailed information about the alert',
      status: 'verified',
      category: 'Health',
      verifiedBy: 'WHO',
      timestamp: new Date(),
      evidenceLinks: [
        'https://who.int/news',
        'https://cdc.gov/updates'
      ]
    };

    res.json(mockAlert);
  } catch (error) {
    console.error('Get alert error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getLiveFeed, getAlertById };