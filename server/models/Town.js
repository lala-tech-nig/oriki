const mongoose = require('mongoose');

const TownSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    localGovernmentArea: String,
    state: {
        type: String,
        required: true
    },
    ethnicGroup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EthnicGroup'
    },
    history: {
        type: String, // Markdowns supported
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        }
    },
    traditionalRuler: {
        title: String,
        name: String,
        history: String
    },
    landmarks: [{
        name: String,
        description: String,
        imageUrl: String,
        location: {
            type: { type: String, enum: ['Point'] },
            coordinates: [Number]
        }
    }],
    images: [String],
    isVerified: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Town', TownSchema);
