const mongoose = require('mongoose');

const OrikiSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String, // Original text
        required: true
    },
    englishTranslation: String,
    audioUrl: String,
    ethnicGroup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EthnicGroup'
    },
    town: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Town'
    },
    associatedSurnames: [String], // Surnames that this Oriki is often recited for
    tags: [String]
});

module.exports = mongoose.model('Oriki', OrikiSchema);
