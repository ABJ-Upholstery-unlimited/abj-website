const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const fs = require('fs');
const path = require('path');

// Load .env.local manually since we aren't in Next.js
const envPath = path.resolve(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
const creds = require('./google-key.json');

async function testConnection() {
    console.log("1. Loading Credentials from JSON...");
    const sheetId = '1ihkfuvqEaNmsz0ksyw3EOJKB6tz_43cbyVGEMS-AYyQ'; // ABJ Quotes

    try {
        console.log("2. Connecting to Google...");
        const serviceAccountAuth = new JWT({
            email: creds.client_email,
            key: creds.private_key,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);
        await doc.loadInfo();
        console.log(`   ✅ Connected to Sheet: ${doc.title}`);

        console.log("3. Adding Test Row...");
        const sheet = doc.sheetsByIndex[0];

        // Ensure Header
        await sheet.loadHeaderRow();
        if (sheet.headerValues.length === 0) {
            await sheet.setHeaderRow(['Date', 'Name', 'Phone', 'Zip', 'Description', 'Method', 'Images']);
        }

        const testRow = {
            Date: new Date().toLocaleString(),
            Name: "Test JSON Auth",
            Phone: "555-0000",
            Zip: "20871",
            Description: "Testing from JSON key file",
            Method: "Debug",
            Images: "none"
        };
        await sheet.addRow(testRow);
        console.log("   ✅ Row Added Successfully!");

    } catch (error) {
        if (error.response) {
            console.error(`   Status: ${error.response.status}`);
            console.error(`   Text: ${error.response.statusText}`);
            console.error(`   Data: ${JSON.stringify(error.response.data)}`);
        } else {
            console.error("   Message:", error.message);
        }
    }
}

testConnection();
