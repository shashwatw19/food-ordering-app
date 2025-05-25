const emailVerficationTemplate = (otp: Number): string => {
    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Verify Your FoodZone Account</title>
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
    
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 20px;
                color: #f97316;  /* Changed to orange-500 */
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .cta {
                display: inline-block;
                padding: 10px 20px;
                background-color: #f97316;  /* Changed to orange-500 */
                color: #ffffff;
                text-decoration: none;
                border-radius: 8px;
                font-size: 16px;
                font-weight: bold;
                margin-top: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #666666;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
                color: #f97316;  /* Changed to orange-500 */
                font-size: 32px;
                padding: 15px;
                border: 2px dashed #f97316;  /* Changed to orange-500 */
                display: inline-block;
                border-radius: 8px;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <div class="message">Welcome to FoodZone! 🍕</div>
            <div class="body">
                <p>Hello Food Lover!</p>
                <p>We're thrilled to have you join our foodie family! To start exploring delicious meals, 
                please verify your account using this OTP:</p>
                <h2 class="highlight">${otp}</h2>
                <p>This verification code will expire in 5 minutes. If you didn't request this code, 
                you can safely ignore this email.</p>
                <p>Your food adventure begins here - get ready to discover amazing flavors!</p>
            </div>
            <div class="support">
                Questions about your order or need help? Contact our 24/7 support at 
                <a href="mailto:support@foodzone.com" style="color: #f97316;">support@foodzone.com</a>
            </div>
        </div>
    </body>
    </html>`;
}

export { emailVerficationTemplate }