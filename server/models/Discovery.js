const mongoose = require('mongoose');

const DiscoverySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    inputs: {
        names: [String],
        surnames: [String],
        orikiFragments: String,
        languages: [String],
        familyStories: String,
        knownTowns: [String]
    },
    analysisResult: {
        likelyEthnicGroups: [{
            group: String,
            confidence: Number, // 0-100
            reasoning: String
        }],
        possibleTowns: [String],
        suggestedOrikis: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Oriki'
        }]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Discovery', DiscoverySchema);
