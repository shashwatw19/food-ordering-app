function resetPasswordTemplate(resetPasswordToken: string): string {
    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Reset Your FoodZone Password</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
            .message {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 20px;
                color: #ff4d4d;
            }
            .reset-button {
                display: inline-block;
                padding: 12px 24px;
                background-color: #ff4d4d;
                color: #ffffff;
                text-decoration: none;
                border-radius: 8px;
                font-size: 16px;
                font-weight: bold;
                margin: 20px 0;
            }
            .footer {
                font-size: 14px;
                color: #666666;
                margin-top: 20px;
                border-top: 1px solid #eeeeee;
                padding-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="message">Reset Your FoodZone Password 🔐</div>
            <p>Hello Foodie!</p>
            <p>We received a request to reset the password for your FoodZone account. 
               Don't worry, we're here to help you get back to ordering your favorite dishes!</p>
            
            <a href="http://localhost:3000/resetpassword/${resetPasswordToken}" 
               class="reset-button">
               Reset Password
            </a>
            
            <p>This link will expire in 10 minutes for security reasons. 
               If you didn't request this password reset, you can safely ignore this email - 
               your current password will remain unchanged.</p>
            
            <div class="footer">
                <p>Need help? Contact our 24/7 support team at 
                   <a href="mailto:support@foodzone.com" style="color: #ff4d4d;">
                     support@foodzone.com
                   </a>
                </p>
                <p>Bon Appétit! 🍽️<br>The FoodZone Team</p>
            </div>
        </div>
    </body>
    </html>`
}

export { resetPasswordTemplate }