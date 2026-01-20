const axios = require('axios');

const API_URL = 'http://localhost:5000/api';
let adminToken, userToken;
let contentId, requestId;

const runVerification = async () => {
    console.log('--- STARTING ORIKI VERIFICATION ---');

    // 1. Register Admin
    try {
        console.log('\n1. Registering/Logging in Admin...');
        // Note: In a real app, you can't register as 'admin' directly usually, but for this test environment check if I allowed it in User model default or if verify script needs to hack it.
        // Actually User model has default 'user'. I need to manually update the user to admin in DB or have a seed.
        // For this test, I will assume I can register a user, then maybe I need to use a seed.
        // Let's try to register a user and see.

        // Actually, for the sake of this test script, assuming the server is running, I'll register a user and then maybe the server needs to be running.
        // I'll skip "creation" of admin if I can't easily do it via API without a specific "admin code".
        // Let's try to register a normal user first.

        const timestamp = Date.now();
        const userEmail = `oriki_user_${timestamp}@test.com`;
        const adminEmail = `oriki_admin_${timestamp}@test.com`;

        // Register User
        await axios.post(`${API_URL}/auth/register`, {
            name: 'Test User',
            email: userEmail,
            password: 'password123',
            confirmPassword: 'password123'
        });

        // Login User
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: userEmail,
            password: 'password123'
        });
        userToken = loginRes.data.token;
        console.log('User Logged In. Token acquired.');

        // Register "Admin" (Mocking: In real life I'd flip the bit in DB. Here I might fail if I can't make admin. 
        // I'll use the userToken for "User Submission" tests first.

        // 2. User Submit Content
        console.log('\n2. User Submitting Content...');
        const submitRes = await axios.post(`${API_URL}/user/submit`, {
            title: 'My Family Oriki',
            body: 'This is a test submission.',
            type: 'story',
            category: 'Heritage',
            tags: 'Personal, Oriki',
            mediaUrl: 'http://test.com/img.jpg'
        }, { headers: { Authorization: `Bearer ${userToken}` } });

        contentId = submitRes.data.data._id;
        console.log(`Content Submitted. ID: ${contentId}, Status: ${submitRes.data.data.status}`);
        if (submitRes.data.data.status !== 'pending') throw new Error('User content should be pending');

        // 3. User Make Request
        console.log('\n3. User Making Request...');
        const reqRes = await axios.post(`${API_URL}/user/request`, {
            topic: 'Research Abeokuta',
            details: 'I want to know about the rocks.',
            type: 'research'
        }, { headers: { Authorization: `Bearer ${userToken}` } });
        requestId = reqRes.data.data._id;
        console.log(`Request Submitted. ID: ${requestId}`);

        // 4. Search (Should NOT find the pending content)
        console.log('\n4. Search Testing (Should verify pending is hidden)...');
        const searchRes = await axios.get(`${API_URL}/content/search?q=Family`);
        const found = searchRes.data.data.find(c => c._id === contentId);
        if (found) console.error('ERROR: Pending content was found in search!');
        else console.log('Success: Pending content is hidden.');

    } catch (error) {
        console.error('Verification Failed:', error.response ? error.response.data : error.message);
    }

    console.log('\n--- VERIFICATION FINISHED ---');
};

runVerification();
