const { google } = require('googleapis');
const readline = require('readline');

// Replace with your actual values
const CLIENT_ID = 'YOUR_CLIENT_ID_HERE';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET_HERE';
const REDIRECT_URI = 'https://ai-ivory-delta.vercel.app/api/youtube/callback';

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/youtube.upload'],
    prompt: 'consent'
});

console.log('🔗 Open this URL in your browser:');
console.log(authUrl);
console.log('\n📝 Authorize the app, then copy the "code" parameter from the URL.');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('\n✏️ Paste the code here: ', async (code) => {
    try {
        const { tokens } = await oauth2Client.getToken(code);
        console.log('\n✅ SUCCESS! Your Refresh Token is:');
        console.log('=====================================');
        console.log(tokens.refresh_token);
        console.log('=====================================');
        console.log('\n📋 Copy this token and add it to Vercel as: YOUTUBE_REFRESH_TOKEN');
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
    rl.close();
});
