const { UserRefreshClient } = require('google-auth-library');
const creds = require('./google-oauth.json');

async function testOAuth() {
    console.log("1. Authenticating with OAuth...");

    const client = new UserRefreshClient(
        creds.client_id,
        creds.client_secret,
        creds.refresh_token
    );

    try {
        const res = await client.getAccessToken();
        const token = res.token;
        console.log("   ✅ Auth Successful. Token obtained.");

        // Folder Name
        const folderName = "TEST_OAUTH_Mike05_3015451133_20871";
        const parentId = creds.parent_folder_id;

        console.log("2. Creating Subfolder '" + folderName + "' in " + parentId + "...");

        const meta = {
            name: folderName,
            mimeType: "application/vnd.google-apps.folder",
            parents: [parentId]
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
                name: "TEST_IMG_OAUTH.gif",
                parents: [subFolderId]
            }) +
            delimiter +
            "Content-Type: image/gif\r\n" +
            "Content-Transfer-Encoding: base64\r\n" +
            "\r\n" +
            base64Image +
            close_delim;

        const uploadRes = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': `multipart/related; boundary=${boundary}`
            },
            body: multipartRequestBody
        });

        const uploadJson = await uploadRes.json();

        if (uploadJson.error) {
            console.error("❌ Upload Error:", JSON.stringify(uploadJson.error, null, 2));
        } else {
            console.log("✅ Upload Successful! ID:", uploadJson.id);
            console.log("   Name:", uploadJson.name);

            // Check Public Permission
            console.log("4. Setting Public Permission...");
            const permRes = await fetch(`https://www.googleapis.com/drive/v3/files/${uploadJson.id}/permissions`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: 'reader', type: 'anyone' })
            });
            const permJson = await permRes.json();
            if (permJson.error) {
                console.error("   ❌ Permission Error:", permJson.error.message);
            } else {
                console.log("   ✅ Permission Set: Anyone can read");
            }
        }

    } catch (e) {
        console.error("❌ Crash:", e);
    }
}

testOAuth();
