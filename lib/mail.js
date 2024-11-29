import nodemailer from "nodemailer";
// import * as handlebars from "handlebars";
// import { welcomeTemplate } from "./templates/welcome";

export async function sendVerificationMail(email, token) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;
  
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  const emailTemplate = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email - InternMate</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #F3F4F6;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 20px 0;
            background-color: #4F46E5;
            color: #ffffff;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            color: #333333;
            line-height: 1.6;
        }
        .verification-message {
            font-size: 20px;
            text-align: center;
            color: #4F46E5;
            margin-bottom: 20px;
        }
        .verification-box {
            background-color: #EEF2FF;
            border-left: 4px solid #4F46E5;
            margin: 20px 0;
            padding: 15px;
            text-align: center;
            border-radius: 4px;
        }
        .verification-code {
            font-size: 28px;
            letter-spacing: 4px;
            color: #4F46E5;
            font-weight: bold;
            margin: 15px 0;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #4F46E5;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            margin-top: 20px;
        }
        .footer {
            text-align: center;
            padding: 20px;
            background-color: #F3F4F6;
            color: #666666;
            font-size: 12px;
            border-radius: 0 0 8px 8px;
        }
        .footer a {
            color: #4F46E5;
            text-decoration: none;
        }
        .note {
            font-size: 14px;
            color: #666666;
            font-style: italic;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Verify Your Email - InternMate</h1>
        </div>
        
        <div class="content">
            <p class="verification-message">Please Verify Your Email</p>
            
            <p>Thank you for signing up for InternMate! To access your dashboard and start tracking your internship opportunities, we need to verify your email address.</p>

            <div class="verification-box">
                <p>Your verification code is:</p>
                <div class="verification-code">${token}</div>
                <p>Enter this code on the verification page to complete your registration.</p>
            </div>

            <center>
                <a href="https://internmate.vercel.app/auth/verify?token=${token}" class="button">
                    Verify Email Address
                </a>
            </center>

            <p class="note">This verification code will expire in 24 hours. If you didn’t sign up for InternMate, please ignore this email.</p>

            <p>Best regards,<br>
            The InternMate Team</p>
        </div>
        
        <div class="footer">
            <p>© 2024 InternMate. All rights reserved.</p>
            <p>Need help? <a href="https://internmate.vercel.app/support">Contact Support</a></p>
            <p><a href="https://internmate.vercel.app/privacy-policy">Privacy Policy</a> | <a href="https://internmate.vercel.app/terms">Terms of Service</a></p>
        </div>
    </div>
</body>
</html>
`;


  try {
    const testResult = await transport.verify();
    console.log('SMTP Connection verified:', testResult);
  } catch (error) {
    console.error('SMTP Connection failed:', error);
    return;
  }

  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to: email,
      subject: "Verify Your Email Address - Cosmetics",
      html: emailTemplate,
    });
    console.log('Email sent successfully:', sendResult);
    return sendResult;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}
export async function sendPasswordResetMail(email, token) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;
  const resetLink = `http://localhost:3000/new-password?token=${token}`;
  console.log(email, token);
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });
  try {
    const testResult = await transport.verify();
    console.log(testResult);
  } catch (error) {
    console.error({ error });
    return;
  }

  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to: email,
      subject: "reset your password",
      html: `<p>Click <a href='${resetLink}'>reset your password<a/></p>`,
    });
    console.log(sendResult);
  } catch (error) {
    console.log(error);
  }
}
export async function sendTwoFactorTokenMail(email, token) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;
  console.log(email, token);
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });
  try {
    const testResult = await transport.verify();
    console.log(testResult);
  } catch (error) {
    console.error({ error });
    return;
  }

  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to: email,
      subject: "reset your password",
      html: `<p>Your 2FA code
       ${token}</p>`,
    });
    console.log(sendResult);
  } catch (error) {
    console.log(error);
  }
}


export async function sendThankyouEmail(firstName, email, donationAmount, projectName) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;
  
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  const emailTemplate = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Your Impact - mendAfrica</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #EBCC48;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 10px 10px;
            background-color: #ffffff;
        }
        .header {
            text-align: center;
            padding: 15px 0;
            background-color: #f7cb08;
            color: #333333;
        }
        .impact-message {
            font-size: 24px;
            text-align: center;
            color: #EBCC48;
            padding: 10px 0;
        }
        .content {
            line-height: 1.6;
            color: #333333;
        }
        .highlight-box {
            background-color: #f9f6e5;
            border-left: 4px solid #EBCC48;
            margin: 20px 0;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #EBCC48;
            color: #333333;
            text-decoration: none;
            border-radius: 4px;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            padding: 20px;
            background-color: #f8f9fa;
            color: #666666;
            font-size: 12px;
        }
        .social-links {
            margin: 20px 0;
            text-align: center;
        }
        .social-links a {
            margin: 0 10px;
            color: #EBCC48;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Thank You, ${firstName}!</h1>
        </div>
        
        <div class="content">
            <p class="impact-message">Your Generosity is Changing Lives in Africa</p>
            
            <div class="highlight-box">
                <p>Your contribution to <strong>${projectName}</strong> is making a real difference. We're honored to have you as part of our community of change-makers.</p>
            </div>

            <p>Dear ${firstName},</p>
            
            <p>Thank you for your generous donation to mendAfrica. Your support is a powerful statement of your commitment to creating positive change in Africa. We're deeply grateful for your trust in our mission.</p>

            <p>Here's how your contribution will help:</p>
            <ul>
                <li>Direct impact on communities in need</li>
                <li>Support for sustainable development</li>
                <li>Empowerment of local initiatives</li>
            </ul>

            <center>
                <a href="https://cos.vercel.app/my-givings" class="button">Track Your Impact</a>
            </center>

            <p>We'll keep you updated on how your donation is making a difference. You're now part of a community that's actively shaping a better future for Africa.</p>

            <div class="social-links">
                Share your impact:
                <a href="[Twitter_Share_URL]">Twitter</a> |
                <a href="[Facebook_Share_URL]">Facebook</a> |
            </div>

            <p>With heartfelt gratitude,<br>
            The Cosmetics Team</p>
        </div>
        
        <div class="footer">
            <p>© 2024 Cosmetics. All rights reserved.</p>
            <p>Want to do more? <a href="[Donation_Page_URL]">View more projects</a></p>
            <p><a href="[Unsubscribe_Link]">Update email preferences</a> | <a href="[Privacy_Policy]">Privacy Policy</a></p>
        </div>
    </div>
</body>
</html>`;

  try {
    const testResult = await transport.verify();
    console.log('SMTP Connection verified:', testResult);
  } catch (error) {
    console.error('SMTP Connection failed:', error);
    return;
  }

  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to: email,
      subject: "Thank You for Impacting Africa! 🌍",
      html: emailTemplate,
    });
    console.log('Email sent successfully:', sendResult);
    return sendResult;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}
