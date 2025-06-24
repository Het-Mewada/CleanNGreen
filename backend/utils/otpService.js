import nodemailer from 'nodemailer';
import otpGenerator from 'otp-generator';
import dotenv from 'dotenv';

dotenv.config()

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendOTP = async (email) => {
  const otp = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false
  });

  const mailOptions = {
    from: '"FusionX"',
    to: email,
    subject: 'Your Verification Code',
    text: `Your FusionX verification code is: ${otp}\n\nThis code will expire in 5 minutes.`,
    html: `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f7fa;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #6e48aa 0%, #9d50bb 100%);
            padding: 30px;
            text-align: center;
        }
        .logo {
            width: 180px;
            margin-bottom: 20px;
        }
        .content {
            padding: 30px;
        }
        h1 {
            color: #2c3e50;
            margin-top: 0;
            font-weight: 600;
        }
        .otp-container {
            background: #f8f9fa;
            border-radius: 6px;
            padding: 20px;
            text-align: center;
            margin: 25px 0;
            border: 1px dashed #ddd;
        }
        .otp-code {
            font-size: 32px;
            letter-spacing: 5px;
            color: #6e48aa;
            font-weight: 700;
            margin: 15px 0;
        }
        .footer {
            background: #f5f7fa;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #7f8c8d;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background: linear-gradient(135deg, #6e48aa 0%, #9d50bb 100%);
            color: white;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 500;
            margin: 15px 0;
        }
        .tech-image {
            width: 100%;
            max-height: 200px;
            object-fit: cover;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <!-- Replace with your actual logo URL -->
            <img src="https://fusionxinvest.com/wp-content/uploads/2024/06/FusionXlogo@2x.png" alt="FusionX" class="logo">
        </div>
        
        <div class="content">
            <!-- Futuristic tech image - replace with your actual image -->
            <img src="https://images.pexels.com/photos/8294605/pexels-photo-8294605.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="FusionX Technology" class="tech-image">
            
            <h1>Verify Your Email Address</h1>
            <p>Thank you for joining FusionX! To complete your registration, please enter the following verification code in your application:</p>
            
            <div class="otp-container">
                <p>Your one-time verification code:</p>
                <div class="otp-code">${otp}</div>
                <p>This code will expire in 5 minutes.</p>
            </div>
            
            <p>If you didn't request this code, please ignore this email or contact our support team if you have any questions.</p>
            
            <p>Welcome to the future of technology,<br>
            <strong>The FusionX Team</strong></p>
        </div>
        
        <div class="footer">
            <p>© 2023 FusionX Technologies. All rights reserved.</p>
            <p>123 Tech Avenue, Innovation City, IC 10001</p>
            <p>
                <a href="https://fusionx.example.com" style="color: #6e48aa; text-decoration: none;">Website</a> | 
                <a href="https://fusionx.example.com/privacy" style="color: #6e48aa; text-decoration: none;">Privacy Policy</a> | 
                <a href="https://fusionx.example.com/contact" style="color: #6e48aa; text-decoration: none;">Contact Us</a>
            </p>
        </div>
    </div>
</body>
</html>`
  };

  try {
    await transporter.sendMail(mailOptions);
    return otp;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw new Error('Failed to send OTP');
  }
};



export const sendAccountDeletionEmail = async (email, userName) => {
  const mailOptions = {
    from: '"FusionX"',
    to: email,
    subject: 'Account Deletion Requested',
    text: `Hi ${userName || ''},\n\nWe have received a request to delete your FusionX account.\n\nIf you did not request this, please contact our support team immediately.\n\nYour data will be permanently deleted in 7 days.\n\nThanks,\nFusionX Team`,
    html: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f5f7fa;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #d63031 0%, #e17055 100%);
      padding: 30px;
      text-align: center;
    }
    .logo {
      width: 180px;
      margin-bottom: 20px;
    }
    .content {
      padding: 30px;
    }
    h1 {
      color: #2c3e50;
      font-weight: 600;
    }
    .warning-box {
      background: #fff3cd;
      border: 1px solid #ffeeba;
      padding: 20px;
      margin: 20px 0;
      border-radius: 6px;
      color: #856404;
    }
    .footer {
      background: #f5f7fa;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #7f8c8d;
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      background: #d63031;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      font-weight: 500;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://fusionxinvest.com/wp-content/uploads/2024/06/FusionXlogo@2x.png" alt="FusionX" class="logo">
    </div>
    <div class="content">
      <h1>Account Deletion Requested</h1>
      <p>Hi ${userName || 'User'},</p>
      <p>We have received a request to delete your FusionX account.</p>

      <div class="warning-box">
        <strong>Note:</strong> Your account and all associated data will be <strong>permanently deleted in 7 days</strong>.
      </div>

      <p>If you did not request this, please click the button below to cancel the request or contact our support team immediately.</p>

      <a href="https://eco-sphere-official.netlify.app/profile" class="button">Cancel Account Deletion</a>

      <p>Thanks for being part of FusionX.</p>
      <p><strong>The FusionX Team</strong></p>
    </div>
    <div class="footer">
      <p>© 2023 FusionX Technologies. All rights reserved.</p>
      <p>123 Tech Avenue, Innovation City, IC 10001</p>
      <p>
        <a href="https://fusionx.example.com" style="color: #d63031; text-decoration: none;">Website</a> | 
        <a href="https://fusionx.example.com/privacy" style="color: #d63031; text-decoration: none;">Privacy Policy</a> | 
        <a href="https://fusionx.example.com/contact" style="color: #d63031; text-decoration: none;">Contact Us</a>
      </p>
    </div>
  </div>
</body>
</html>`
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending account deletion email:', error);
    throw new Error('Failed to send account deletion email');
  }
};



export const subscribeNewsletter = async (email, userName) => {
  const mailOptions = {
    from: '"FusionX"',
    to: email,
    subject: 'Thanks for Subscribing to FusionX Newsletter!',
    text: `Hi ${userName || 'there'},\n\nThanks for subscribing to the FusionX Newsletter!\n\nWe’re excited to have you on board. Expect the latest updates on tech, innovation, and everything FusionX directly in your inbox.\n\nStay tuned!\n\n– The FusionX Team`,
    html: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f5f7fa;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #6e48aa 0%, #9d50bb 100%);
      padding: 30px;
      text-align: center;
    }
    .logo {
      width: 180px;
      margin-bottom: 20px;
    }
    .content {
      padding: 30px;
      text-align: center;
    }
    h1 {
      color: #2c3e50;
      font-weight: 600;
    }
    p {
      font-size: 16px;
      line-height: 1.6;
    }
    .footer {
      background: #f5f7fa;
      padding: 20px;
      text-align: center;
      font-size: 12px;
      color: #7f8c8d;
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      background: linear-gradient(135deg, #6e48aa 0%, #9d50bb 100%);
      color: white;
      text-decoration: none;
      border-radius: 4px;
      font-weight: 500;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://fusionxinvest.com/wp-content/uploads/2024/06/FusionXlogo@2x.png" alt="FusionX" class="logo">
    </div>
    <div class="content">
      <h1>Welcome to FusionX News!</h1>
      <p>Hi ${userName || 'there'},</p>
      <p>Thanks for subscribing to our newsletter. We’re thrilled to have you on board!</p>
      <p>You’ll now be the first to hear about the latest tech trends, innovations, exclusive updates, and future-forward insights from FusionX.</p>
      <p style="margin-top: 30px;">Stay tuned,<br><strong>The FusionX Team</strong></p>
    </div>
    <div class="footer">
      <p>© 2023 FusionX Technologies. All rights reserved.</p>
      <p>123 Tech Avenue, Innovation City, IC 10001</p>
      <p>
        <a href="https://eco-sphere-official.netlify.app" style="color: #6e48aa; text-decoration: none;">Website</a> | 
        <a href="https://eco-sphere-official.netlify.app/help" style="color: #6e48aa; text-decoration: none;">Contact Us</a>
      </p>
    </div>
  </div>
</body>
</html>`
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending newsletter thank-you email:', error);
    throw new Error('Failed to send newsletter thank-you email');
  }
};

