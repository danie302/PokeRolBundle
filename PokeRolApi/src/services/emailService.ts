import nodemailer from 'nodemailer';

// Email configuration from environment variables
const port = parseInt(process.env.EMAIL_PORT || '587');
const emailConfig = {
    host: process.env.EMAIL_HOST,
    port,
    secure: port === 465, // true for 465 (SSL), false for 587 (STARTTLS)
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
};

// Create reusable transporter
let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
    if (!transporter) {
        if (!emailConfig.host || !emailConfig.auth.user || !emailConfig.auth.pass) {
            throw new Error('Email configuration is missing. Please check your environment variables.');
        }
        transporter = nodemailer.createTransport(emailConfig);
    }
    return transporter;
}

/**
 * Send a password reset email to the user
 * @param email - Recipient email address
 * @param resetToken - Password reset token
 * @throws Error if email sending fails
 */
export async function sendPasswordResetEmail(email: string, resetToken: string): Promise<void> {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const resetLink = `${frontendUrl}/reset-password?token=${resetToken}`;
    const fromEmail = process.env.EMAIL_FROM || 'noreply@pokerol.com';

    const mailOptions = {
        from: fromEmail,
        to: email,
        subject: 'Reset Your PokeRol Password',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Reset Your PokeRol Password</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    .container {
                        background-color: #f9f9f9;
                        border-radius: 8px;
                        padding: 30px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 30px;
                    }
                    .logo {
                        font-size: 28px;
                        font-weight: bold;
                        color: #FF5350;
                    }
                    .button {
                        display: inline-block;
                        background-color: #FF5350;
                        color: white;
                        padding: 12px 30px;
                        text-decoration: none;
                        border-radius: 5px;
                        margin: 20px 0;
                        font-weight: bold;
                    }
                    .button:hover {
                        background-color: #e64845;
                    }
                    .warning {
                        color: #666;
                        font-size: 14px;
                        margin-top: 20px;
                        padding-top: 20px;
                        border-top: 1px solid #ddd;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 30px;
                        font-size: 12px;
                        color: #999;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <div class="logo">PokeRol</div>
                    </div>

                    <p>Hello,</p>

                    <p>We received a request to reset your password for your PokeRol account. Click the button below to create a new password:</p>

                    <div style="text-align: center;">
                        <a href="${resetLink}" class="button">Reset Password</a>
                    </div>

                    <p>Or copy and paste this link into your browser:</p>
                    <p style="word-break: break-all; color: #666; font-size: 12px;">${resetLink}</p>

                    <div class="warning">
                        <p><strong>Important:</strong></p>
                        <ul>
                            <li>This link will expire in 1 hour</li>
                            <li>If you didn't request this password reset, you can safely ignore this email</li>
                            <li>Your password will remain unchanged</li>
                        </ul>
                    </div>

                    <div class="footer">
                        <p>© 2026 PokeRol. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `,
        text: `
            Reset Your PokeRol Password

            Hello,

            We received a request to reset your password for your PokeRol account. Click the link below to create a new password:

            ${resetLink}

            Or copy and paste this link into your browser:
            ${resetLink}

            Important:
            - This link will expire in 1 hour
            - If you didn't request this password reset, you can safely ignore this email
            - Your password will remain unchanged

            © 2026 PokeRol. All rights reserved.
        `,
    };

    try {
        const info = await getTransporter().sendMail(mailOptions);
        console.log(`Password reset email sent to ${email}: ${info.messageId}`);
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error('Failed to send password reset email. Please try again later.');
    }
}

/**
 * Verify email configuration
 * @throws Error if email configuration is invalid
 */
export function verifyEmailConfig(): void {
    if (!emailConfig.host || !emailConfig.auth.user || !emailConfig.auth.pass) {
        throw new Error('Email configuration is missing. Please check EMAIL_HOST, EMAIL_USER, and EMAIL_PASSWORD environment variables.');
    }
}
