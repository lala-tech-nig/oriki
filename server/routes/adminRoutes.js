const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const {
    uploadContent,
    getAllContent,
    updateContentStatus,
    getRequests,
    updateRequestStatus
} = require('../controllers/adminController');

const router = express.Router();

// All routes are protected and require admin/superadmin role
router.use(protect);
router.use(authorize('admin', 'superadmin'));

router.route('/content')
    .post(uploadContent)
    .get(getAllContent);

router.route('/content/:id/status')
    .put(updateContentStatus);

router.route('/requests')
    .get(getRequests);

router.route('/requests/:id')
    .put(updateRequestStatus);

module.exports = router;
