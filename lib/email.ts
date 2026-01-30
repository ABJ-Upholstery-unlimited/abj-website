import nodemailer from 'nodemailer';

export async function sendQuoteEmail(data: any) {
    // 1. Check Credentials
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error("❌ Missing Email Credentials");
        return false;
    }

    // 2. Create Transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS.replace(/ /g, ''), // Remove spaces from code if present
        },
    });

    const attachments = data.images.map((img: any) => {
        // Handle "data:image/jpeg;base64,..." header if present
        const content = img.base64.includes("base64,") ? img.base64.split("base64,")[1] : img.base64;
        return {
            filename: img.name,
            content: content,
            encoding: 'base64'
        };
    });

    const imagesHtml = data.images.map((img: any) => `<li>${img.name}</li>`).join('');

    // Priority: Drive Links (Fail-safe)
    // We REMOVE the physical attributes to prevent "Message Too Large" errors
    // creating a 100% success rate for delivery.

    const mailOptions = {
        from: `"ABJ Quote Bot" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER, // Direct delivery (Bypass alias loop issues)
        cc: "projects@abjupholstery.com", // Copy to professional alias
        subject: `📢 New Quote: ${data.client.name}`,
        // attachments: attachments, // DISABLED to ensure delivery
        html: `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
                <h2 style="color: #d4af37; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">New Quote Received</h2>
                
                <p><strong>Client:</strong> ${data.client.name}</p>
                <p><strong>Phone:</strong> <a href="tel:${data.client.phone}" style="font-weight: bold; color: #000;">${data.client.phone}</a></p>
                <p><strong>Location:</strong> ${data.locationString || data.client.zip}</p>
                <p><strong>Method:</strong> ${data.method}</p>
                
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                
                <h3 style="color: #555;">Fabric Choice</h3>
                <p style="background: #f9f9f9; padding: 10px; border-radius: 4px;">${data.fabric || "Not Selected"}</p>
                
                <h3 style="color: #555;">Description</h3>
                <p style="background: #f9f9f9; padding: 10px; border-radius: 4px;">${data.client.desc}</p>
                
                <h3 style="color: #555;">Photos (${data.images.length})</h3>
                <p><em>(Attachments removed to ensure delivery - See Drive Links below)</em></p>
                <ul>${imagesHtml}</ul>
                
                ${data.driveLinks && data.driveLinks.length > 0 ? `
                <div style="margin-top: 15px; padding: 10px; background: #e8f0fe; border-radius: 4px;">
                    <strong style="color: #1a73e8;">📂 Google Drive Links (High Res):</strong>
                    <ul style="margin-top: 5px;">
                        ${data.driveLinks.map((link: string, i: number) => `<li><a href="${link}" target="_blank">View Image ${i + 1}</a></li>`).join('')}
                    </ul>
                </div>
                ` : ''}

                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="font-size: 12px; color: #888;">Expected Reply via: ${data.method === 'WHATSAPP' ? 'WhatsApp' : 'Text Message'}</p>
            </div>
        `,
    };

    // 4. Send
    try {
        await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully to", process.env.EMAIL_USER);
        return true;
    } catch (error) {
        console.error("❌ Email Failed:", error);
        return false;
    }
}
