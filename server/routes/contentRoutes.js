const express = require('express');
const { protect, checkSubscription } = require('../middleware/authMiddleware');
const { searchContent, getContentById } = require('../controllers/searchController');

const router = express.Router();

// Public / Semi-public routes
router.get('/search', searchContent); // Search handles its own filtering

// Premium Content (Subscription Required)
// Protected Routes
router.use(protect);
router.get('/:id', checkSubscription, getContentById);

module.exports = router;
