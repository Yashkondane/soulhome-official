"use server"

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(email: string, name: string) {
    if (!process.env.RESEND_API_KEY) {
        console.warn("Skipping Welcome Email: RESEND_API_KEY not found in environment variables.");
        return;
    }

    try {
        await resend.emails.send({
            from: 'Soul Home <hello@soulhomelove.com>',
            to: email,
            subject: 'Welcome to Soul Home ✨',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                    <h1 style="color: #6d28d9;">Welcome, ${name}!</h1>
                    <p style="font-size: 16px; line-height: 1.6;">We're so happy to have you join our community at Soul Home. Your journey to inner peace and resource discovery begins now.</p>
                    <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h2 style="font-size: 18px; margin-top: 0;">What's Next?</h2>
                        <ul style="padding-left: 20px;">
                            <li style="margin-bottom: 10px;">Explore the <strong>Resource Library</strong> for meditations and guides.</li>
                            <li style="margin-bottom: 10px;">Visit your <strong>Dashboard</strong> to see your downloads.</li>
                            <li style="margin-bottom: 10px;">Connect with our community.</li>
                        </ul>
                    </div>
                    <a href="https://soulhomelove.com/dashboard/resources" style="display: inline-block; background: #6d28d9; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">Browse Resources</a>
                    <p style="margin-top: 40px; font-size: 14px; color: #666;">If you have any questions, just reply to this email!</p>
                </div>
            `
        });
        console.log(`Welcome email sent to ${email}`);
    } catch (error) {
        console.error("Error sending welcome email:", error);
    }
}

export async function sendCancellationEmail(email: string, name: string, periodEnd: string) {
    if (!process.env.RESEND_API_KEY) {
        console.warn("Skipping Cancellation Email: RESEND_API_KEY not found.");
        return;
    }

    try {
        await resend.emails.send({
            from: 'Soul Home <hello@soulhomelove.com>',
            to: email,
            subject: 'Subscription Cancellation Confirmed',
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                    <h1 style="color: #4b5563;">Subscription Cancelled</h1>
                    <p style="font-size: 16px; line-height: 1.6;">Hello ${name},</p>
                    <p style="font-size: 16px; line-height: 1.6;">This email confirms that your subscription to Soul Home has been cancelled as requested.</p>
                    <p style="font-size: 16px; font-weight: bold; color: #ef4444;">You will retain full access to all resources until ${periodEnd}.</p>
                    <p style="font-size: 16px; line-height: 1.6;">After this date, no further charges will be made. If you ever want to rejoin us, we'll be here with open arms!</p>
                    <a href="https://soulhomelove.com/dashboard/settings" style="display: inline-block; border: 1px solid #6d28d9; color: #6d28d9; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: bold;">View My Settings</a>
                </div>
            `
        });
        console.log(`Cancellation email sent to ${email}`);
    } catch (error) {
        console.error("Error sending cancellation email:", error);
    }
}
