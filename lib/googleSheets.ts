import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Config variables
const SPREADSHEET_ID = '1W4iHoBmlb-8o1ug_-DAWv7wSvHfHRdnU8fjmLdOf9vc';
const SHEET_TITLE = 'Project Board'; // We will create/find this tab

export async function appendToSheet(data: any) {
    try {
        // 1. Load Credentials from Environment (Safest way)
        if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
            throw new Error('Missing Google Credentials in .env');
        }

        const serviceAccountAuth = new JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);

        // 2. Connect
        await doc.loadInfo();

        // 3. Get or Create Sheet
        let sheet = doc.sheetsByTitle[SHEET_TITLE];
        if (!sheet) {
            sheet = await doc.addSheet({ headerValues: ['Date', 'Name', 'Phone', 'Zip', 'Description', 'Method', 'Images', 'Fabric'] });
            await sheet.updateProperties({ title: SHEET_TITLE });
        }

        // 4. Add Row
        await sheet.addRow({
            Date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
            Name: data.client.name,
            Phone: data.client.phone,
            Zip: data.client.zip,
            Description: data.client.desc,
            Method: data.method,
            Images: data.images.join(', '), // Comma separated list of filenames
            Fabric: data.fabric || 'None'
        });

        return true;
    } catch (error) {
        console.error("Google Sheet Error:", error);
        return false;
    }
}
