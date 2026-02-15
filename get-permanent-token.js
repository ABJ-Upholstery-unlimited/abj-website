const { OAuth2Client } = require('google-auth-library');
const fs = require('fs');
const readline = require('readline');
const path = require('path');
const http = require('http');
const url = require('url');

// 1. CONFIGURATION
// Load from .env.local
let CLIENT_ID = '';
let CLIENT_SECRET = '';

try {
    const envPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        envContent.split('\n').forEach(line => {
            if (line.startsWith('GOOGLE_CLIENT_ID=')) CLIENT_ID = line.split('=')[1].trim().replace(/"/g, '');
            if (line.startsWith('GOOGLE_CLIENT_SECRET=')) CLIENT_SECRET = line.split('=')[1].trim().replace(/"/g, '');
        });
    }
} catch (e) { console.error("Could not read .env.local"); }


if (!CLIENT_ID || !CLIENT_SECRET) {
    // FALLBACK: Try to use the ones found in google-oauth.json or hardcoded from previous discovery
    console.log("⚠️  Could not find in .env.local, checking google-oauth.json...");
    try {
        const oauthPath = path.join(process.cwd(), 'google-oauth.json');
        if (fs.existsSync(oauthPath)) {
            const oauth = JSON.parse(fs.readFileSync(oauthPath, 'utf8'));
            if (oauth.client_id) CLIENT_ID = oauth.client_id;
            if (oauth.client_secret) CLIENT_SECRET = oauth.client_secret;
        }
    } catch (e) {
        // ignore
    }
}

// Double fallback (Hardcoded from what I saw in your file)
if (!CLIENT_ID) CLIENT_ID = "YOUR_CLIENT_ID_HERE";
if (!CLIENT_SECRET) CLIENT_SECRET = "YOUR_CLIENT_SECRET_HERE";

if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error("❌ CRITICAL: Could not find GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET.");
    process.exit(1);
}

// 2. SETUP CLIENT
const redirectUri = 'http://localhost:3000'; // Make sure this is in your Google Cloud Console
const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, redirectUri);

// 3. GENERATE URL
const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline', // CRITICAL: This gives us the Refresh Token
    scope: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file'
    ],
    prompt: 'consent' // Forces re-consent to ensure we get a refresh token
});

console.log(`
╔══════════════════════════════════════════════════════════════╗
║           GENERATE PERMANENT GOOGLE TOKEN                    ║
╚══════════════════════════════════════════════════════════════╝

1. ⚠️  IMPORTANT PRE-STEP:
   Go to Google Cloud Console (https://console.cloud.google.com/)
   > APIs & Services > OAuth Consent Screen.
   > Click the button "PUBLISH APP" (It might ask to confirm).
   > This removes the "Testing" status which expires tokens in 7 days.
   > (You do NOT need to verify/submit for review, just set status to Production).

2. 🔗 CLICK THIS LINK TO LOGIN:
   ${authUrl}

3. 👉 AFTER LOGIN:
   - You might see a warning "Google hasn't verified this app".
   - Click "Advanced" -> "Go to Project (Unsafe)".
   - You will be redirected to localhost (likely a broken page).
   - CHECK THE URL BAR.
   - Look for: http://localhost:3000/?code=4/0AeaYSH...&scope=...
   - COPY THE VALUE between "code=" and "&scope".
   - (It starts with "4/...")

`);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('4. 📋 PASTE THE CODE HERE: ', async (code) => {
    try {
        // Decode URL component just in case
        const decodedCode = decodeURIComponent(code);

        const { tokens } = await oauth2Client.getToken(decodedCode);

        console.log("\n✅ SUCCESS! Token Generated.");

        if (tokens.refresh_token) {
            console.log("🔑 NEW Refresh Token:", tokens.refresh_token);

            // Update google-oauth.json
            const config = {
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                refresh_token: tokens.refresh_token,
                parent_folder_id: "1XBEQolgIN8R8RgVUj1XVIoOBw6ih7yff" // Hardcoded verified ID
            };

            fs.writeFileSync('google-oauth.json', JSON.stringify(config, null, 2));
            console.log("\n💾 SAVED to 'google-oauth.json'.");
            console.log("   The app will now use this Permanent Token.");
            console.log("   ⚠️  PLEASE DELETE 'service-account.json' TO AVOID CONFLICTS.");
        } else {
            console.warn("⚠️  WARNING: No Refresh Token received.");
            console.warn("   This implies you have already authorized this app and didn't revoke access.");
            console.warn("   Go to https://myaccount.google.com/permissions, remove the app, and try again.");
        }

    } catch (e) {
        console.error("\n❌ ERROR:", e.response ? e.response.data : e.message);
    }
    rl.close();
});
