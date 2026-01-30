// Force Rebuild
import { NextResponse } from 'next/server';
import { appendToSheet } from '@/lib/googleSheets';
import { sendQuoteEmail } from "@/lib/email";

export async function POST(request: Request) {
    try {
        const data = await request.json();

        console.log("📩 Received Quote:", data.client.name);

        // 1. Save to Google Sheets & Get Drive Links + City Data
        const sheetResult = await appendToSheet(data);
        const driveLinks = sheetResult.success ? sheetResult.imageUrls : [];
        const locationString = sheetResult.success ? sheetResult.locationString : data.client.zip;

        // 2. Send Email Notification
        // Pass the drive links and location to the email template
        await sendQuoteEmail({ ...data, driveLinks, locationString });

        if (sheetResult.success) {
            return NextResponse.json({ success: true, message: "Quote saved & Email sent" });
        } else {
            console.error("Failed to write to sheet");
            // We return 500 so the frontend knows something went wrong, 
            // even if email might have worked.
            return NextResponse.json({ success: false, error: "Database Error" }, { status: 500 });
        }

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
    }
}
