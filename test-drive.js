const { GoogleAuth } = require('google-auth-library');
const fs = require('fs');
const path = require('path');

// CONFIG
const KEY_FILE = 'service-account.json';
const PARENT_FOLDER_ID = "1XBEQolgIN8R8RgVUj1XVIoOBw6ih7yff"; // QUICK_QUOTE verified ID

async function testDrive() {
    console.log("\n🧪 STARTING SERVICE ACCOUNT DIAGNOSTIC...\n");

    // 1. Check Key File
    const keyPath = path.join(process.cwd(), KEY_FILE);
    if (!fs.existsSync(keyPath)) {
        console.error("❌ CRITICAL ERROR: '" + KEY_FILE + "' not found in this folder!");
        console.error("   Current Folder: " + process.cwd());
        console.error("   Please move the JSON key file here.");
        return;
    }
    console.log("✅ Key File Found: " + KEY_FILE);

    // 2. Authenticate
    console.log("🔄 Authenticating...");
    try {
        const auth = new GoogleAuth({
            keyFile: keyPath,
            scopes: ['https://www.googleapis.com/auth/drive'],
        });
        const client = await auth.getClient();
        console.log("✅ Authentication Successful! (The Robot is awake)");

        // 3. Test Folder Access
        console.log("🔄 Testing Access to QUICK_QUOTE Folder...");
        const folderName = "TEST_ACCESS_" + Date.now();
        const meta = {
            name: folderName,
            mimeType: "application/vnd.google-apps.folder",
            parents: [PARENT_FOLDER_ID]
        };

        const res = await client.request({
            url: 'https://www.googleapis.com/drive/v3/files',
            method: 'POST',
            data: meta
        });

        console.log("✅ SUCCESS! Created Test Folder inside QUICK_QUOTE.");
        console.log("   Folder ID: " + res.data.id);
        console.log("\n🎉 GREAT NEWS: The Service Account is working perfectly.");
        console.log("   now you can restart 'npm run dev' and it will works.");

    } catch (e) {
        console.error("\n❌ AUTHENTICATION FAILED.");
        console.error("   Error details:", e.message);
        if (e.message.includes("invalid_grant")) {
            console.error("   Reason: The System Time might be wrong OR the Key is revoked.");
        }
        if (e.message.includes("insufficient permissions") || e.code === 403) {
            console.error("   Reason: The Robot does NOT have permission to view the folder.");
            console.error("   FIX: Share 'QUICK_QUOTE' with the robot email again.");
        }
        if (e.message.includes("File not found")) {
            console.error("   Reason: The Folder ID '1XBEQ...' does not exist or is invisible.");
        }
    }
}

testDrive();
