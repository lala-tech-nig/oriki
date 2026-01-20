const Content = require('../models/Content');
const Request = require('../models/Request');

// @desc    Upload new content (Admin/SuperAdmin)
// @route   POST /api/admin/content
// @access  Private (Admin)
exports.uploadContent = async (req, res) => {
    try {
        const { title, body, type, category, tags, media, isPremium } = req.body;

        const content = await Content.create({
            title,
            body,
            type,
            category,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            media: media || [], // Expecting array of objects from frontend (or handled via multer separately)
            isPremium: isPremium !== undefined ? isPremium : true,
            author: req.user._id,
            status: 'published' // Admin uploads are auto-published
        });

        res.status(201).json({
            success: true,
            data: content
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Get all content (Admin view - includes pending/draft)
// @route   GET /api/admin/content
// @access  Private (Admin)
exports.getAllContent = async (req, res) => {
    try {
        const content = await Content.find().sort({ createdAt: -1 }).populate('author', 'name email');
        res.status(200).json({
            success: true,
            count: content.length,
            data: content
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Approve/Reject Content
// @route   PUT /api/admin/content/:id/status
// @access  Private (Admin)
exports.updateContentStatus = async (req, res) => {
    try {
        const { status } = req.body; // published, rejected
        const content = await Content.findById(req.params.id);

        if (!content) {
            return res.status(404).json({ success: false, error: 'Content not found' });
        }

        content.status = status;
        await content.save();

        res.status(200).json({
            success: true,
            data: content
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Get all pending user requests
// @route   GET /api/admin/requests
// @access  Private (Admin)
exports.getRequests = async (req, res) => {
    try {
        const requests = await Request.find().sort({ createdAt: -1 }).populate('user', 'name email');
        res.status(200).json({
            success: true,
            count: requests.length,
            data: requests
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Update Request Status
// @route   PUT /api/admin/requests/:id
// @access  Private (Admin)
exports.updateRequestStatus = async (req, res) => {
    try {
        const { status, adminResponse } = req.body;
        const request = await Request.findById(req.params.id);

        if (!request) {
            return res.status(404).json({ success: false, error: 'Request not found' });
        }

        request.status = status || request.status;
        if (adminResponse) request.adminResponse = adminResponse;

        await request.save();

        res.status(200).json({
            success: true,
            data: request
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
