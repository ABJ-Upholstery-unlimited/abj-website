import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // In a real app, this is where we would:
        // 1. Save to Google Sheets
        // 2. Trigger Twilio/WhatsApp API
        // 3. Send Email via Nodemailer

        console.log("----- NEW QUOTE RECEIVED -----");
        console.log("Client:", data.client);
        console.log("Method:", data.method); // 'SMS' or 'WHATSAPP'
        console.log("Images:", data.images.length);
        console.log("------------------------------");

        // Simulate Network Delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        return NextResponse.json({ success: true, message: "Quote received" });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to process" }, { status: 500 });
    }
}
