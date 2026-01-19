const EthnicGroup = require('../models/EthnicGroup');
const Town = require('../models/Town');
const Oriki = require('../models/Oriki');
const Discovery = require('../models/Discovery');

// @desc    Search everything (Groups, Towns, Oriki)
// @route   GET /api/discovery/search
// @access  Public
exports.search = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) return res.status(400).json({ message: 'Search query required' });

        const regex = new RegExp(q, 'i');

        const ethnicGroups = await EthnicGroup.find({
            $or: [{ name: regex }, { history: regex }, { region: regex }]
        }).select('name description region image');

        const towns = await Town.find({
            $or: [{ name: regex }, { state: regex }, { history: regex }]
        }).select('name state ethnicGroup image');

        const orikis = await Oriki.find({
            $or: [{ title: regex }, { content: regex }, { associatedSurnames: regex }]
        }).select('title ethnicGroup tags');

        res.json({ ethnicGroups, towns, orikis });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all Ethnic Groups
// @route   GET /api/discovery/ethnic-groups
// @access  Public
exports.getEthnicGroups = async (req, res) => {
    try {
        const groups = await EthnicGroup.find();
        res.json(groups);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Single Ethnic Group
// @route   GET /api/discovery/ethnic-groups/:id
// @access  Public
exports.getEthnicGroupById = async (req, res) => {
    try {
        const group = await EthnicGroup.findById(req.params.id);
        if (!group) return res.status(404).json({ message: 'Group not found' });
        res.json(group);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Towns
// @route   GET /api/discovery/towns
// @access  Public
exports.getTowns = async (req, res) => {
    try {
        const towns = await Town.find().populate('ethnicGroup', 'name');
        res.json(towns);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Run Intelligence Engine
// @route   POST /api/discovery/inference
// @access  Public (or Private)
exports.runInference = async (req, res) => {
    try {
        const { surnames, orikiFragments, languages, familyStories, knownTowns } = req.body;

        // 1. Scoring Logic Initialization
        let scores = {}; // { "Yoruba": 10, "Igbo": 5 }
        let reasoning = {}; // { "Yoruba": ["Surname matches..."] }

        // 2. Surname Analysis (Mock Logic - would use large DB in prod)
        if (surnames && surnames.length > 0) {
            for (const name of surnames) {
                const lowerName = name.toLowerCase();
                // Simple heuristic examples
                if (lowerName.startsWith('ade') || lowerName.startsWith('ola')) {
                    scores['Yoruba'] = (scores['Yoruba'] || 0) + 10;
                    reasoning['Yoruba'] = [...(reasoning['Yoruba'] || []), `Surname '${name}' has Yoruba linguistic roots (Ade/Ola).`];
                } else if (lowerName.startsWith('chukwu') || lowerName.startsWith('nne')) {
                    scores['Igbo'] = (scores['Igbo'] || 0) + 10;
                    reasoning['Igbo'] = [...(reasoning['Igbo'] || []), `Surname '${name}' has Igbo linguistic roots.`];
                } else if (lowerName.startsWith('dan') || lowerName.endsWith('u')) {
                    // Very rough heuristic for Hausa/Fulani
                    scores['Hausa-Fulani'] = (scores['Hausa-Fulani'] || 0) + 5;
                    reasoning['Hausa-Fulani'] = [...(reasoning['Hausa-Fulani'] || []), `Surname structure suggests Northern origin.`];
                }
            }
        }

        // 3. Language Matching
        if (languages && languages.length > 0) {
            for (const lang of languages) {
                // Find ethnic groups that speak this language
                const group = await EthnicGroup.findOne({ "language.name": new RegExp(lang, 'i') });
                if (group) {
                    scores[group.name] = (scores[group.name] || 0) + 15; // High weight
                    reasoning[group.name] = [...(reasoning[group.name] || []), `Language match: ${lang}.`];
                }
            }
        }

        // 4. Oriki Matching
        if (orikiFragments) {
            // naive keyword match
            const matchingOriki = await Oriki.find({ content: new RegExp(orikiFragments, 'i') }).populate('ethnicGroup');
            matchingOriki.forEach(o => {
                if (o.ethnicGroup) {
                    scores[o.ethnicGroup.name] = (scores[o.ethnicGroup.name] || 0) + 20;
                    reasoning[o.ethnicGroup.name] = [...(reasoning[o.ethnicGroup.name] || []), `Matched Oriki fragment found in ${o.title}.`];
                }
            });
        }

        // 5. Build Results
        const results = Object.keys(scores).map(key => ({
            group: key,
            confidence: Math.min(scores[key], 100), // Cap at 100
            reasoning: reasoning[key].join(' ')
        })).sort((a, b) => b.confidence - a.confidence);

        // 6. Save Discovery object if user provided enough info
        const discovery = await Discovery.create({
            user: req.user ? req.user.id : null,
            inputs: req.body,
            analysisResult: {
                likelyEthnicGroups: results,
                possibleTowns: [] // TODO: Add logic for towns
            }
        });

        res.json(discovery);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
