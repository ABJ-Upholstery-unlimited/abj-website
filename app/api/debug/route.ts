import { NextResponse } from 'next/server';

export async function GET() {
    const vars = {
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? "✅ Present" : "❌ Missing",
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? "✅ Present" : "❌ Missing",
        GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN ? "✅ Present" : "❌ Missing",
        GOOGLE_PARENT_FOLDER_ID: process.env.GOOGLE_PARENT_FOLDER_ID ? "✅ Present" : "❌ Missing",
        EMAIL_USER: process.env.EMAIL_USER ? "✅ Present" : "❌ Missing",
        EMAIL_PASS: process.env.EMAIL_PASS ? "✅ Present" : "❌ Missing",
        TIMESTAMP: new Date().toISOString()
    };

    return NextResponse.json(vars);
}
