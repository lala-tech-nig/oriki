const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        text: true // For search
    },
    body: {
        type: String,
        required: [true, 'Please add content body'],
    },
    type: {
        type: String,
        enum: ['history', 'culture', 'story', 'language', 'heritage'],
        required: true
    },
    category: {
        type: String,
        required: true,
        index: true
    },
    media: [{
        type: {
            type: String, // 'video', 'audio', 'image'
            enum: ['video', 'audio', 'image']
        },
        url: String,
        caption: String,
        public_id: String // For Cloudinary
    }],
    tags: [{
        type: String,
        trim: true,
        index: true
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['published', 'pending', 'draft', 'rejected'],
        default: 'published' // Admin uploads default to published, user uploads default to pending
    },
    isPremium: {
        type: Boolean,
        default: true
    },
    views: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Create text index for smart search
contentSchema.index({ title: 'text', body: 'text', tags: 'text' });

module.exports = mongoose.model('Content', contentSchema);
