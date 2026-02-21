import nodemailer from 'nodemailer';

const SMTP_EMAIL = process.env.SMTP_EMAIL;
const APP_PASSWORD = process.env.APP_PASSWORD;

if (!SMTP_EMAIL || !APP_PASSWORD) {
    console.error("Missing SMTP_EMAIL or APP_PASSWORD in environment variables.");
}

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: SMTP_EMAIL,
        pass: APP_PASSWORD,
    },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
    try {
        const info = await transporter.sendMail({
            from: `"Lithia Auto" <${SMTP_EMAIL}>`,
            to,
            subject,
            html,
        });
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error };
    }
};
