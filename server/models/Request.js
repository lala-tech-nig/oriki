const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    topic: {
        type: String,
        required: [true, 'Please add a topic'],
        trim: true
    },
    details: {
        type: String,
        required: [true, 'Please add details for your request']
    },
    type: {
        type: String,
        enum: ['research', 'content_request', 'correction', 'other'],
        default: 'research'
    },
    status: {
        type: String,
        enum: ['open', 'in_progress', 'completed', 'declined'],
        default: 'open'
    },
    adminResponse: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Request', requestSchema);
