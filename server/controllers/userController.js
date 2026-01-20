const Content = require('../models/Content');
const Request = require('../models/Request');

// @desc    Submit Content (Story/History)
// @route   POST /api/user/submit
// @access  Private
exports.submitContent = async (req, res) => {
    try {
        const { title, body, type, category, tags, media } = req.body;

        const content = await Content.create({
            title,
            body,
            type,
            category,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            media: media || [],
            author: req.user._id,
            status: 'pending', // Default for users
            isPremium: true
        });

        res.status(201).json({
            success: true,
            message: 'Content submitted for review',
            data: content
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Make Special Request
// @route   POST /api/user/request
// @access  Private
exports.makeRequest = async (req, res) => {
    try {
        const { topic, details, type } = req.body;

        const request = await Request.create({
            user: req.user._id,
            topic,
            details,
            type
        });

        res.status(201).json({
            success: true,
            message: 'Request submitted successfully',
            data: request
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// @desc    Get My Requests
// @route   GET /api/user/requests
// @access  Private
exports.getMyRequests = async (req, res) => {
    try {
        const requests = await Request.find({ user: req.user._id }).sort({ createdAt: -1 });
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
