const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Mock Environment setup for standalone test
const envPath = path.resolve(__dirname, '.env.local');
const envConfig = require('dotenv').config({ path: envPath }).parsed || {};

// Manual Override if dotenv fails or for safety
const EMAIL_USER = envConfig.EMAIL_USER;
const EMAIL_PASS = envConfig.EMAIL_PASS || 'lmwd seav vupz olhm'; // Fallback to provided code

console.log("1. Config:");
console.log("   User:", EMAIL_USER);
console.log("   Pass:", EMAIL_PASS ? "********" : "MISSING");

async function testEmail() {
    if (!EMAIL_USER || !EMAIL_PASS) {
        console.error("❌ Credentials missing!");
        return;
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS.replace(/ /g, ''),
        },
    });

    try {
        console.log("2. Sending Test Email...");
        const info = await transporter.sendMail({
            from: `"ABJ Test Bot" <${EMAIL_USER}>`,
            to: EMAIL_USER,
            subject: "🚀 ABJ Website Notification Test",
            html: "<h1>It Works!</h1><p>Your website can now send you emails.</p>",
        });

        console.log("✅ Message sent: %s", info.messageId);
    } catch (error) {
        console.error("❌ Error sending email:", error);
    }
}

testEmail();
