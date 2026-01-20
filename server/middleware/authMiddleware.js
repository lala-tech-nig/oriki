const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        req.user = await User.findById(decoded.id);
        next();
    } catch (err) {
        return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
    }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user.role || !roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                error: `User role ${req.user.role} is not authorized to access this route`
            });
        }
        next();
    };
};

// Check if user has active subscription
exports.checkSubscription = (req, res, next) => {
    // Admins/Superadmins bypass subscription check
    if (req.user.role === 'admin' || req.user.role === 'superadmin') {
        return next();
    }

    if (req.user.subscriptionStatus === 'active') {
        return next();
    }

    // Optional: Check expiry date if using that logic
    // if (req.user.subscriptionExpiry && req.user.subscriptionExpiry > Date.now()) { return next(); }

    return res.status(403).json({
        success: false,
        error: 'Subscription required to access this content',
        requiresSubscription: true
    });
};
