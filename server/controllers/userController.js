
const User = require('../models/User');

// @route   PUT /api/user/location
// @desc    Update user location
// @access  Private
const updateLocation = async (req, res) => {
  try {
    const { city, country, coordinates } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.location = {
      city: city || user.location?.city,
      country: country || user.location?.country,
      coordinates: coordinates || user.location?.coordinates
    };

    await user.save();

    res.json({
      message: 'Location updated successfully',
      location: user.location
    });
  } catch (error) {
    console.error('Update location error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @route   PUT /api/user/preferences
// @desc    Update user preferences
// @access  Private
const updatePreferences = async (req, res) => {
  try {
    const { language, notifications, sources } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (language) user.preferences.language = language;
    if (notifications !== undefined) user.preferences.notifications = notifications;
    if (sources) user.preferences.sources = sources;

    await user.save();

    res.json({
      message: 'Preferences updated successfully',
      preferences: user.preferences
    });
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @route   GET /api/user/profile
// @desc    Get user profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { updateLocation, updatePreferences, getProfile };