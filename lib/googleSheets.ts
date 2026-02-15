import { GoogleSpreadsheet } from 'google-spreadsheet';
import { UserRefreshClient, GoogleAuth } from 'google-auth-library';
import fs from 'fs';
import path from 'path';

// Config
const SPREADSHEET_ID = "1ihkfuvqEaNmsz0ksyw3EOJKB6tz_43cbyVGEMS-AYyQ"; // ABJ Quotes
const SHEET_TITLE = "QUOTE RAW DATA";

// Credential Loading
// Priority 1: Service Account (Unbreakable)
// Priority 2: Env Vars (User Auth)
// Priority 3: google-oauth.json (User Auth - Dev/Test)

let serviceAccountCreds: any = null;
let userCreds: any = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    parent_folder_id: process.env.GOOGLE_PARENT_FOLDER_ID
};

// Check for Service Account File
// Check for Service Account File
const serviceAccountPath = path.join(process.cwd(), 'service-account.json');
console.log("🔍 [DEBUG] Current Directory:", process.cwd());
console.log("🔍 [DEBUG] Looking for Key at:", serviceAccountPath);

if (fs.existsSync(serviceAccountPath)) {
    try {
        serviceAccountCreds = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));
        console.log("✅ [DEBUG] Service Account File FOUND and PARSED.");
    } catch (e) {
        console.error("❌ [DEBUG] Service Account File Invalid JSON:", e);
    }
} else {
    console.warn("⚠️ [DEBUG] Service Account File NOT FOUND at expected path.");
}

// Check for User Auth File if no Env Vars
if (!userCreds.client_id) {
    const oauthPath = path.join(process.cwd(), 'google-oauth.json');
    if (fs.existsSync(oauthPath)) {
        try {
            const fileContent = fs.readFileSync(oauthPath, 'utf-8');
            userCreds = JSON.parse(fileContent);
        } catch (e) {
            console.warn("⚠️ Invalid google-oauth.json");
        }
    }
}

// Parent Folder ID logic
const PARENT_FOLDER_ID = process.env.GOOGLE_PARENT_FOLDER_ID ||
    (serviceAccountCreds ? "1XBEQolgIN8R8RgVUj1XVIoOBw6ih7yff" : userCreds.parent_folder_id);
// Hardcoded fallback for SA if not in env, based on previous file content

// Helper: Get OAuth Client
async function getClient() {
    // 1. Service Account (Preferred)
    if (serviceAccountCreds) {
        console.log("🔑 [DEBUG] Attempting to authenticate with Service Account...");
        const auth = new GoogleAuth({
            keyFile: serviceAccountPath,
            scopes: [
                'https://www.googleapis.com/auth/spreadsheets',
                'https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/drive.file'
            ]
        });
        return await auth.getClient();
    } else {
        console.error("❌ [DEBUG] serviceAccountCreds is NULL. Cannot use Robot Account.");
    }


    // 2. User Refresh Client (Legacy / Dev)
    if (userCreds.client_id && userCreds.refresh_token) {
        console.log("⚠️ [DEBUG] Using Legacy Refresh Token (Service Account unavailable or disabled)");
        return new UserRefreshClient(
            userCreds.client_id,
            userCreds.client_secret,
            userCreds.refresh_token
        );
    }


    throw new Error("No valid Google Credentials found. Service Account missing or invalid.");
}

// Helper: Create Subfolder
async function createSubfolder(folderName: string, auth: any): Promise<string | null> {
    try {
        const tokenVal = await auth.getAccessToken();
        const token = tokenVal.token;

        const meta = {
            name: folderName,
            mimeType: "application/vnd.google-apps.folder",
            parents: [PARENT_FOLDER_ID]
        };

        const res = await fetch('https://www.googleapis.com/drive/v3/files', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(meta)
        });
        const json = await res.json();
        if (json.error) throw json.error;
        return json.id;
    } catch (e) {
        console.error("Folder Creation Error:", e);
        return null;
    }
}

// Helper: Upload Text File to Drive
async function uploadTextFile(content: string, filename: string, folderId: string, auth: any): Promise<void> {
    try {
        const tokenVal = await auth.getAccessToken();
        const token = tokenVal.token;

        const metadata = {
            name: filename,
            parents: [folderId],
            mimeType: 'text/plain'
        };

        const boundary = '-------314159265358979323846';
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delim = "\r\n--" + boundary + "--";

        const multipartRequestBody =
            delimiter +
            "Content-Type: application/json\r\n\r\n" +
            JSON.stringify(metadata) +
            delimiter +
            "Content-Type: text/plain\r\n" +
            "\r\n" +
            content +
            close_delim;

        await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': `multipart/related; boundary=${boundary}`
            },
            body: multipartRequestBody
        });

    } catch (e) {
        console.error("Text Upload Error:", e);
    }
}

// Helper: Upload to Google Drive (NOW using OAuth)
async function uploadToDrive(base64Data: string, filename: string, folderId: string, auth: any): Promise<string | null> {
    try {
        const tokenVal = await auth.getAccessToken();
        const token = tokenVal.token;

        const metadata = {
            name: "QUOTE_IMG_" + Date.now() + "_" + filename,
            parents: [folderId] // Upload to specific folder
        };

        // Multipart body
        const boundary = '-------314159265358979323846';
        const delimiter = "\r\n--" + boundary + "\r\n";
        const close_delim = "\r\n--" + boundary + "--";

        const contentType = base64Data.match(/data:(.*);base64/)?.[1] || 'application/octet-stream';
        // Remove header from base64 string
        const data = base64Data.includes("base64,") ? base64Data.split("base64,")[1] : base64Data;

        const multipartRequestBody =
            delimiter +
            "Content-Type: application/json\r\n\r\n" +
            JSON.stringify(metadata) +
            delimiter +
            "Content-Type: " + contentType + "\r\n" +
            "Content-Transfer-Encoding: base64\r\n" +
            "\r\n" +
            data +
            close_delim;

        const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': `multipart/related; boundary=${boundary}`
            },
            body: multipartRequestBody
        });

        const fileData = await res.json();
        if (fileData.error) throw fileData.error;

        // Make Public (so =IMAGE works)
        await fetch(`https://www.googleapis.com/drive/v3/files/${fileData.id}/permissions`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ role: 'reader', type: 'anyone' })
        });

        // Get View/Download Link
        const getRes = await fetch(`https://www.googleapis.com/drive/v3/files/${fileData.id}?fields=thumbnailLink,webContentLink`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const getJson = await getRes.json();

        return getJson.thumbnailLink || null;

    } catch (e) {
        console.error("Drive Upload Error:", e);
        return null;
    }
}


export async function appendToSheet(data: any) {
    try {
        const oauthClient = await getClient();

        // 1. Initialize Sheet with OAuth
        const doc = new GoogleSpreadsheet(SPREADSHEET_ID, oauthClient as any);

        // 2. Connect
        await doc.loadInfo();

        // 3. Get the First Sheet
        const sheet = doc.sheetsByIndex[0];

        // Rename to "QUOTE RAW DATA" if needed
        if (sheet.title !== 'QUOTE RAW DATA') {
            await sheet.updateProperties({ title: 'QUOTE RAW DATA' });
        }

        // 3a. Create Subfolder
        // Name format: ClientName_Phone_Zip
        const cleanName = (data.client.name || "Unknown").replace(/[^a-zA-Z0-9]/g, "");
        const cleanPhone = (data.client.phone || "NoPhone").replace(/[^0-9]/g, "");
        const folderName = `${cleanName}_${cleanPhone}_${data.client.zip || "00000"}`;

        // Use provided Parent ID or fall back to root if createSubfolder fails (logic handles it inside helper? no, helper returns ID)
        let targetFolderId = PARENT_FOLDER_ID;
        const subId = await createSubfolder(folderName, oauthClient);
        if (subId) {
            targetFolderId = subId;
        }

        // Lookup City from Zip
        let city = "";
        let state = "";
        let locationString = `${data.client.zip}`;

        try {
            const cityRes = await fetch(`http://api.zippopotam.us/us/${data.client.zip}`);
            if (cityRes.ok) {
                const cityData = await cityRes.json();
                if (cityData.places && cityData.places.length > 0) {
                    city = cityData.places[0]['place name'];
                    state = cityData.places[0]['state abbreviation'];
                    locationString = `${city}, ${state} ${data.client.zip}`;
                }
            }
        } catch (e) {
            console.error("City Lookup Failed:", e);
        }

        // 3b. Upload Details Text File
        const textContent = `
${cleanName}
${data.client.phone}
${locationString}
${data.fabric || "Not Selected"}
${data.client.desc}
Image quantity ${data.images ? data.images.length : 0}
`;
        await uploadTextFile(textContent, `${folderName}.txt`, targetFolderId, oauthClient);

        // 3c. Upload Images to Drive
        const imageUrls: string[] = [];
        for (const img of (data.images || [])) {
            const link = await uploadToDrive(img.base64, img.name, targetFolderId, oauthClient);
            if (link) imageUrls.push(link);
        }

        // 4. Prepare Row Data
        const rowData: any = {
            Date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
            Name: data.client.name,
            Phone: data.client.phone,
            City: city,
            State: state,
            Zip: data.client.zip,
            Description: `(${data.images ? data.images.length : 0} Photos) ${data.client.desc}`,
            Method: data.method,
            Fabric: data.fabric || 'None'
        };

        // Add Images to Columns (Image 1 ... Image 10) AND Image Links
        imageUrls.forEach((url, index) => {
            if (index < 10) {
                // Hack: replace s220 with s1600 for larger preview
                const largeUrl = url.replace(/=s\d+/, "=s1600");
                rowData[`Image ${index + 1}`] = `=IMAGE("${largeUrl}")`;
                rowData[`Image Link ${index + 1}`] = largeUrl; // RAW URL for Excel
            }
        });

        // Ensure headers exist if needed
        await sheet.loadHeaderRow();
        const headers = ['Date', 'Name', 'Phone', 'City', 'State', 'Zip', 'Description', 'Method', 'Fabric'];
        for (let i = 1; i <= 10; i++) {
            headers.push(`Image ${i}`);
            headers.push(`Image Link ${i}`);
        }

        // Update headers if there are new columns or length mismatch
        if (sheet.headerValues.length < headers.length || !sheet.headerValues.includes('Image Link 1')) {

            // CRITICAL FIX: Ensure the sheet has enough columns (Grid Resize)
            // Default new sheet is often 26 columns (A-Z). We now need ~29.
            if (sheet.columnCount < headers.length) {
                await sheet.resize({ rowCount: sheet.rowCount, columnCount: headers.length + 5 });
            }

            await sheet.setHeaderRow(headers);
        }

        await sheet.addRow(rowData);

        return {
            success: true,
            imageUrls,
            city,
            locationString
        };
    } catch (error: any) {
        console.error("Google Sheet Error:", error);
        return {
            success: false,
            imageUrls: [],
            error: error.message || JSON.stringify(error) // Capture error message
        };
    }
}
