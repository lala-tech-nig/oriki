const express = require('express');
const router = express.Router();
const { search, getEthnicGroups, getEthnicGroupById, getTowns, runInference } = require('../controllers/discoveryController');
const { protect } = require('../middleware/authMiddleware');

router.get('/search', search);
router.get('/ethnic-groups', getEthnicGroups);
router.get('/ethnic-groups/:id', getEthnicGroupById);
router.get('/towns', getTowns);

// Inference can be public or private. Usually public allowed for trial, saving requires login (handled in controller via req.user check if needed, or we can make it optional middleware)
// Here we make it optional protect or just check token if present. 
// For simplicity, we'll allow public access but if token header is present, middleware sets req.user.
// To do "optional" auth, we can write a middleware or just use protect if we want to FORCE login.
// The Logic in controller handles `req.user ?` so let's allow public access.
router.post('/inference', runInference);

module.exports = router;
