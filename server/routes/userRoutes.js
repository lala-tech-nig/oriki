const express = require('express');
const router = express.Router();
const { submitContent, makeRequest, getMyRequests } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/submit', submitContent);
router.post('/request', makeRequest);
router.get('/requests/my', getMyRequests);

module.exports = router;
