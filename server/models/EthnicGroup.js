const mongoose = require('mongoose');

const EthnicGroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    region: {
        type: [String], // e.g. ["South West", "Kwara"]
        required: true
    },
    history: {
        type: String,
        required: true
    },
    language: {
        name: String,
        samplePhrase: String,
        audioUrl: String
    },
    culturalPractices: [String],
    festivals: [{
        name: String,
        description: String,
        month: String
    }],
    location: {
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
    },
    images: [String],
    verified: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('EthnicGroup', EthnicGroupSchema);
