const { JWT } = require('google-auth-library');
const creds = require('./google-key.json');

const PARENT_FOLDER_ID = "1XBEQolgIN8R8RgVUj1XVIoOBw6ih7yff";

async function testDrive() {
    console.log("1. Authenticating...");
    const client = new JWT({
        email: creds.client_email,
        key: creds.private_key,
        scopes: ['https://www.googleapis.com/auth/drive'],
    });

    try {
        const tokenVal = await client.getAccessToken();
        const token = tokenVal.token;
        console.log("   ✅ Auth Successful");

        const folderName = "Test Mike05_3015451133_20871";
        console.log("2. Creating Subfolder '" + folderName + "' in " + PARENT_FOLDER_ID + "...");
        const meta = {
            name: folderName,
            mimeType: "application/vnd.google-apps.folder",
            parents: [PARENT_FOLDER_ID]
        };

        const folderRes = await fetch('https://www.googleapis.com/drive/v3/files', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(meta)
        });

        const folderJson = await folderRes.json();

        if (folderJson.error) {
            console.error("❌ Folder Creation Error:", JSON.stringify(folderJson.error, null, 2));
            return;
        }

        console.log("✅ Folder Created! ID:", folderJson.id);
        const subFolderId = folderJson.id;

        console.log("3. Uploading Image to New Folder...");
        const boundary = '-------314159265358979323846';
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delim = "\r\n--" + boundary + "--";

        // 1x1 Pixel GIF Base64
        const base64Image = "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

        const multipartRequestBody =
            delimiter +
            "Content-Type: application/json\r\n\r\n" +
            JSON.stringify({
                name: "TEST_IMG_IN_SUBFOLDER.gif",
                parents: [subFolderId]
            }) +
            delimiter +
            "Content-Type: image/gif\r\n" +
            "Content-Transfer-Encoding: base64\r\n" +
            "\r\n" +
            base64Image +
            close_delim;

        const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': `multipart/related; boundary=${boundary}`
            },
            body: multipartRequestBody
        });

        const json = await res.json();

        if (json.error) {
            console.error("❌ Upload Error:", JSON.stringify(json.error, null, 2));
        } else {
            console.log("✅ Upload Successful! ID:", json.id);
            console.log("   Name:", json.name);

            // Cleanup? No, let user see it as proof.
        }

    } catch (e) {
        console.error("❌ Crash:", e);
    }
}

testDrive();
