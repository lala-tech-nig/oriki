const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors'); // Optional but helpful if installed, otherwise remove
const EthnicGroup = require('./models/EthnicGroup');
const Town = require('./models/Town');
const Oriki = require('./models/Oriki');
const User = require('./models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/heritage_db');

const seedUsers = [
    {
        name: 'Admin User',
        email: 'admin@heritage.com',
        password: 'password123',
        role: 'admin'
    },
    {
        name: 'Research Lead',
        email: 'researcher@heritage.com',
        password: 'password123',
        role: 'researcher'
    }
];

const seedGroups = [
    {
        name: 'Yoruba',
        description: 'One of the three largest ethnic groups in Nigeria, concentrated in the southwestern part of the country.',
        region: ['South West', 'Kwara', 'Kogi', 'Edo'],
        history: 'The Yoruba people have a rich history dating back to the Ife civilization...',
        language: {
            name: 'Yoruba',
            samplePhrase: 'E ku owuro (Good morning)',
        },
        culturalPractices: ['Naming Ceremonies', 'Respect for Elders'],
        festivals: [{ name: 'Olojo Festival', description: 'Celebrates creation and the Ooni of Ife', month: 'October' }],
        location: { type: 'Point', coordinates: [4.55, 7.5] } // Approx center
    },
    {
        name: 'Igbo',
        description: 'An ethnic group native to the present-day south-central and southeastern Nigeria.',
        region: ['South East', 'Delta', 'Rivers'],
        history: 'The Igbo people are known for their decentralized political systems...',
        language: {
            name: 'Igbo',
            samplePhrase: 'Ututu oma (Good morning)',
        },
        culturalPractices: ['New Yam Festival', 'Kola Nut Tradition'],
        festivals: [{ name: 'Iri Ji', description: 'New Yam Festival', month: 'August' }],
        location: { type: 'Point', coordinates: [7.0, 5.5] }
    }
];

const importData = async () => {
    try {
        await User.deleteMany();
        await EthnicGroup.deleteMany();
        await Town.deleteMany();
        await Oriki.deleteMany();

        const createdUsers = await User.create(seedUsers);
        const createdGroups = await EthnicGroup.create(seedGroups);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await EthnicGroup.deleteMany();
        await Town.deleteMany();
        await Oriki.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
