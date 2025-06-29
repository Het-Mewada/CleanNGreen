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
    from: '"Eco-Sphere-Official"',
    to: email,
    subject: 'Your Verification Code',
    text: `Your EcoSphere verification code is: ${otp}\n\nThis code will expire in 5 minutes.`,
    html: `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
            background-color: #f5f7fa;
            margin: 0;
            padding: 0;
            color: #333;
            line-height: 1.6;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
        .header {
            background: linear-gradient(135deg, #6e48aa 0%, #9d50bb 100%);
            padding: 30px;
            text-align: center;
            color: white;
        }
        .logo-text {
            font-size: 28px;
            font-weight: 700;
            margin: 0;
            letter-spacing: -0.5px;
        }
        .content {
            padding: 30px;
        }
        h1 {
            color: #2c3e50;
            margin-top: 0;
            font-weight: 600;
            font-size: 24px;
        }
        .otp-container {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 25px;
            text-align: center;
            margin: 30px 0;
            border: 1px solid #e9ecef;
        }
        .otp-code {
            font-size: 36px;
            letter-spacing: 5px;
            color: #6e48aa;
            font-weight: 700;
            margin: 20px 0;
            font-family: monospace;
        }
        .footer {
            background: #f5f7fa;
            padding: 25px;
            text-align: center;
            font-size: 13px;
            color: #7f8c8d;
            border-top: 1px solid #e9ecef;
        }
        .button {
            display: inline-block;
            padding: 12px 28px;
            background: linear-gradient(135deg, #6e48aa 0%, #9d50bb 100%);
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
            margin: 20px 0;
            box-shadow: 0 2px 8px rgba(110, 72, 170, 0.2);
        }
        .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, #e9ecef, transparent);
            margin: 25px 0;
        }
        .highlight-box {
            background-color: #f0f4ff;
            border-left: 4px solid #6e48aa;
            padding: 15px;
            margin: 20px 0;
            border-radius: 0 6px 6px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="logo-text">Ecosphere</h1>
        </div>
        
        <div class="content">
            <h1>Verify Your Email Address</h1>
            <p>Thank you for joining Ecosphere! To complete your registration, please enter the following verification code in your application:</p>
            
            <div class="otp-container">
                <p style="margin-bottom: 5px; color: #6c757d;">Your one-time verification code:</p>
                <div class="otp-code">${otp}</div>
                <p style="margin-top: 5px; color: #6c757d; font-size: 14px;">This code will expire in 5 minutes.</p>
            </div>
            
            <div class="highlight-box">
                <strong>Tip:</strong> For security reasons, never share this code with anyone, including Ecosphere support staff.
            </div>
            
            <p>If you didn't request this code, please ignore this email or contact our support team if you have any questions.</p>
            
            <div class="divider"></div>
            
            <p>Welcome to the future of technology,<br>
            <strong>The Ecosphere Team</strong></p>
        </div>
        
        <div class="footer">
            <p>© 2023 Ecosphere Technologies. All rights reserved.</p>
            <p>123 Tech Avenue, Innovation City, IC 10001</p>
            <p>
                <a href="https://eco-sphere-official.netlify.app" style="color: #6e48aa; text-decoration: none; margin: 0 10px;">Website</a> 
                <a href="https://eco-sphere-official.netlify.app/help-form" style="color: #6e48aa; text-decoration: none; margin: 0 10px;">Contact Us</a>
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



export const sendAccountDeletionEmail = async (email, userName, action) => {
  const isCancel = action === "cancel";

  const subject = isCancel
    ? "Account Deletion Request Cancelled"
    : "Account Deletion Requested";

  const text = isCancel
    ? `Hi ${userName || ''},\n\nYour request to delete your EcoSphere account has been successfully cancelled. Your account remains active and no data has been removed.\n\nIf you have any questions or concerns, please contact our support team.\n\nThanks,\nEcosphere Team`
    : `Hi ${userName || ''},\n\nWe have received a request to delete your EcoSphere account.\n\nIf you did not request this, please contact our support team immediately.\n\nYour data will be permanently deleted in 7 days.\n\nThanks,\nEcosphere Team`;

  const html = `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      background-color: #f5f7fa;
      margin: 0;
      padding: 0;
      color: #333;
      line-height: 1.6;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
    .header {
      background: linear-gradient(135deg, #d63031 0%, #e17055 100%);
      padding: 30px;
      text-align: center;
      color: white;
    }
    .logo-text {
      font-size: 28px;
      font-weight: 700;
      margin: 0;
      letter-spacing: -0.5px;
    }
    .content {
      padding: 30px;
    }
    h1 {
      color: #2c3e50;
      margin-top: 0;
      font-weight: 600;
      font-size: 24px;
    }
    .warning-box {
      background: #fff8e6;
      border-left: 4px solid #ffc107;
      padding: 18px;
      margin: 25px 0;
      border-radius: 0 6px 6px 0;
    }
    .footer {
      background: #f5f7fa;
      padding: 25px;
      text-align: center;
      font-size: 13px;
      color: #7f8c8d;
      border-top: 1px solid #e9ecef;
    }
    .button {
      display: inline-block;
      padding: 14px 28px;
      background: #d63031;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 500;
      margin: 25px 0;
      transition: background-color 0.2s;
    }
    .button:hover {
      background: #c0392b;
    }
    .divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, #e9ecef, transparent);
      margin: 30px 0;
    }
    .highlight {
      color: #d63031;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="logo-text">Ecosphere</h1>
    </div>
    
    <div class="content">
      <h1>${isCancel ? "Account Deletion Cancelled" : "Account Deletion Requested"}</h1>
      <p>Hi ${userName || 'User'},</p>
      
      <p>
        ${isCancel
          ? "Your request to delete your Ecosphere account has been successfully <strong class='highlight'>cancelled</strong>. Your account remains active and no data has been deleted."
          : "We've received a request to <strong class='highlight'>permanently delete</strong> your Ecosphere account."
        }
      </p>

      ${isCancel
        ? ""
        : `<div class="warning-box">
            <strong>Important:</strong> Your account and all associated data will be <strong>permanently deleted in 7 days</strong> unless you cancel this request.
          </div>
          
          <p>If you didn't initiate this request, please secure your account immediately:</p>
          <a href="https://eco-sphere-official.netlify.app/profile" class="button">Cancel Deletion Request</a>
          
          <p>For security reasons, if you suspect unauthorized access to your account, please change your password immediately and contact our support team.</p>`
      }

      <div class="divider"></div>
      
      <p>Thank you for being part of Ecosphere.</p>
      <p><strong>The Ecosphere Team</strong></p>
    </div>
    
    <div class="footer">
      <p>© 2023 Ecosphere Technologies. All rights reserved.</p>
      <p>123 Tech Avenue, Innovation City, IC 10001</p>
      <p>
        <a href="https://eco-sphere-official.netlify.app" style="color: #d63031; text-decoration: none; margin: 0 10px;">Website</a> 
        <a href="https://eco-sphere-official.netlify.app/help-form" style="color: #d63031; text-decoration: none; margin: 0 10px;">Contact Support</a>
      </p>
    </div>
  </div>
</body>
</html>`;

  const mailOptions = {
    from: '"EcoShpereOfficial" <no-reply@eco-sphere-official.com>',
    to: email,
    subject,
    text,
    html,
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
    from: '"Ecosphere"',
    to: email,
    subject: 'Thanks for Subscribing to Ecosphere Newsletter!',
    text: `Hi there ,\n\nThanks for subscribing to the Ecosphere Newsletter!\n\nWe’re excited to have you on board. Expect the latest updates on tech, innovation, and everything Ecosphere directly in your inbox.\n\nStay tuned!\n\n– The Ecosphere Team`,
    html: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      background-color: #f5f7fa;
      margin: 0;
      padding: 0;
      color: #333;
      line-height: 1.6;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
    .header {
      background: linear-gradient(135deg, #6e48aa 0%, #9d50bb 100%);
      padding: 40px 30px;
      text-align: center;
      color: white;
    }
    .logo-text {
      font-size: 32px;
      font-weight: 700;
      margin: 0;
      letter-spacing: -0.5px;
    }
    .content {
      padding: 40px;
      text-align: center;
    }
    h1 {
      color: #2c3e50;
      margin-top: 0;
      font-weight: 600;
      font-size: 28px;
      margin-bottom: 25px;
    }
    p {
      font-size: 16px;
      margin-bottom: 20px;
      color: #4a5568;
    }
    .footer {
      background: #f5f7fa;
      padding: 25px;
      text-align: center;
      font-size: 13px;
      color: #7f8c8d;
      border-top: 1px solid #e9ecef;
    }
    .button {
      display: inline-block;
      padding: 14px 32px;
      background: linear-gradient(135deg, #6e48aa 0%, #9d50bb 100%);
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      margin: 30px 0;
      transition: transform 0.2s, box-shadow 0.2s;
      box-shadow: 0 4px 12px rgba(110, 72, 170, 0.2);
    }
    .button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(110, 72, 170, 0.3);
    }
    .divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(110, 72, 170, 0.2), transparent);
      margin: 30px 0;
    }
    .highlight {
      color: #6e48aa;
      font-weight: 600;
    }
    .welcome-icon {
      font-size: 48px;
      color: #6e48aa;
      margin-bottom: 20px;
      display: inline-block;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="logo-text">Ecosphere</h1>
    </div>
    
    <div class="content">
      <h1>Welcome to Ecosphere News!</h1>
      <p>Hi <span class="highlight">${userName || 'User'}</span>,</p>
      <p>Thank you for subscribing to our newsletter. We're absolutely <span class="highlight">thrilled</span> to have you join our community of tech enthusiasts and innovators!</p>
      <p>As a subscriber, you'll be the first to receive:</p>
      <p>• Exclusive tech trends and insights<br>
         • Early access to new features<br>
         • Special offers and announcements<br>
         • Thought leadership in future technologies</p>
            
      <div class="divider"></div>
      
      <p>We're committed to bringing you valuable content that inspires and informs.</p>
      <p>Stay curious,<br><strong>The Ecosphere Team</strong></p>
    </div>
    
    <div class="footer">
      <p>© 2023 Ecosphere Technologies. All rights reserved.</p>
      <p>123 Tech Avenue, Innovation City, IC 10001</p>
      <p>
        <a href="https://eco-sphere-official.netlify.app" style="color: #6e48aa; text-decoration: none; margin: 0 10px;">Website</a> 
        <a href="https://eco-sphere-official.netlify.app/help" style="color: #6e48aa; text-decoration: none; margin: 0 10px;">Contact Us</a>
        <a href="https://eco-sphere-official.netlify.app/#newsLetter" style="color: #6e48aa; text-decoration: none; margin: 0 10px;">Unsubscribe</a>
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


export const resetPassEmail = async (to, link) => {
  await transporter.sendMail({
    from: '"EcoSphere"',
    to,
    subject: 'Reset Your Password',
    html: `<p>Click <a href="${link}">here</a> to reset your password. This link expires in 10 minutes.</p>`,
  });
  console.log("Email sent")
};
