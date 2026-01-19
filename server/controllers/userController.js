const User = require('../models/User');

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        // Heritage Profile Updates
        if (req.body.heritageProfile) {
            user.heritageProfile = { ...user.heritageProfile, ...req.body.heritageProfile };
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            heritageProfile: updatedUser.heritageProfile
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
