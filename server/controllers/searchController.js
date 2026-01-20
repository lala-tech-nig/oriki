const Content = require('../models/Content');

// @desc    Search Content
// @route   GET /api/search
// @access  Public (some fields restricted)
exports.searchContent = async (req, res) => {
    try {
        const { q, category, tag } = req.query;

        let query = { status: 'published' };

        if (q) {
            query.$text = { $search: q };
        }

        if (category) {
            query.category = category;
        }

        if (tag) {
            query.tags = tag;
        }

        const content = await Content.find(query)
            .select('title type category tags isPremium createdAt author') // Select minimal fields for list
            .sort({ createdAt: -1 });

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

// @desc    Get Content Details
// @route   GET /api/content/:id
// @access  Private (Subscription Check needed)
exports.getContentById = async (req, res) => {
    try {
        const content = await Content.findById(req.params.id).populate('author', 'name');

        if (!content) {
            return res.status(404).json({ success: false, error: 'Content not found' });
        }

        // Increase views
        content.views += 1;
        await content.save({ validateBeforeSave: false });

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
