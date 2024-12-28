import colors from 'colors';
import nodemailer from 'nodemailer';
import config from '../config';
import { errorLogger, logger } from '../shared/logger';
import { ISendEmail } from '../types/email';

const transporter = nodemailer.createTransport({
  host: config.email.smtp.host,
  port: Number(config.email.smtp.port),
  secure: false,
  auth: {
    user: config.email.smtp.auth.user,
    pass: config.email.smtp.auth.pass,
  },
});

if (config.env !== 'test') {
  transporter
    .verify()
    .then(() => logger.info(colors.cyan('📧  Connected to email server')))
    .catch(err =>
      logger.warn(
        'Unable to connect to email server. Make sure you have configured the SMTP options in .env'
      )
    );
}

const sendEmail = async (values: ISendEmail) => {
  try {
    const info = await transporter.sendMail({
      from: `"${config.email.from}`,
      to: values.to,
      subject: values.subject,
      html: values.html,
    });
    logger.info('Mail send successfully', info.accepted);
  } catch (error) {
    errorLogger.error('Email', error);
  }
};
const sendEmailVerification = async (to: string, otp: string) => {
  const subject = 'Hortspec - Account Verification Code';
  const html = `
 <body style="background-color: #f3f4f6; padding: 2rem; font-family: Arial, sans-serif; color: #333;">
  <div style="max-width: 30rem; margin: 0 auto; background-color: #ffffff; padding: 2rem; border-radius: 0.75rem; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15); text-align: center;">
    <img src="https://i.postimg.cc/Lszq6RYR/log-1.png" alt="Horticulture Specialist Logo" style="max-width: 90px; margin-bottom: 15px; border-radius: 50%">
    <h1 style="font-size: 1.75rem; font-weight: 700; margin-bottom: 1rem; color: #1f2937;">Welcome to Horticulture Specialist</h1>
    <p style="color: #4b5563; margin-bottom: 1.5rem;">Welcome to Horticulture Specialist. Thank you for joining Horticulture Specialist! Your account is almost ready</p>
    <div style="background: linear-gradient(135deg, #1CD64F, #A4E786); color: #ffffff; padding: 1rem; border-radius: 0.5rem; font-size: 2rem; font-weight: 800; letter-spacing: 0.1rem; margin-bottom: 1.5rem;">
      ${otp}
    </div>
    <p style="color: #4b5563; margin-bottom: 1.5rem;">Enter this code to verify your account.</p>
    <p style="color: #6b7280; font-size: 0.875rem; margin-top: 1.5rem;">If you did not request this verification, please ignore this email.</p>
    <p style="color: #6b7280; font-size: 0.875rem;">Thanks, The Hortspec Team</p>
    <p style="color: #ff0000; font-size: 0.85rem; margin-top: 1.5rem;">This code expires in <span id="timer">3:00</span> minutes.</p>
  </div>
</body>`;
  await sendEmail({ to, subject, html });
};

const sendResetPasswordEmail = async (to: string, otp: string) => {
  const subject = 'Hortspec - Password Reset Code';
  const html = `
  <body style="background-color: #f3f4f6; padding: 2rem; font-family: Arial, sans-serif; color: #333;">
  <div style="max-width: 30rem; margin: 0 auto; background-color: #ffffff; padding: 2rem; border-radius: 0.75rem; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15); text-align: center;">
    <img src="https://i.postimg.cc/Lszq6RYR/log-1.png" alt="Horticulture Specialist Logo" style="max-width: 90px; margin-bottom: 1.5rem;">
    <h1 style="font-size: 1.75rem; font-weight: 700; margin-bottom: 1rem; color: #1f2937;">Password Reset Request</h1>
    <p style="color: #4b5563; margin-bottom: 1.5rem;">You requested a password reset for your account. Use the code below to reset your password:</p>
    <div style="background: linear-gradient(135deg, #1CD64F, #A4E786); color: #ffffff; padding: 1rem; border-radius: 0.5rem; font-size: 2rem; font-weight: 500; letter-spacing: 0.1rem; margin-bottom: 1.5rem;">
      ${otp}
    </div>
    <p style="color: #d6471c; margin-bottom: 1.5rem;">Enter this code to reset your password. This code is valid for 3 minutes.</p>
    <p style="color: #6b7280; font-size: 0.875rem; margin-top: 1.5rem;">If you did not request a password reset, please ignore this email.</p>
  </div>
</body>
`;
  await sendEmail({ to, subject, html });
};
const sendContactUsEmail = async (allData: {
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
}) => {
  const subject = 'Hortspec - Contact Us';
  const html = `
  <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background-color: #f3f4f6; color: #333;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 40px; border-radius: 12px; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);">
      <!-- Header Section -->
      <div style="text-align: center; margin-bottom: 20px;">
       <img src="https://i.postimg.cc/Lszq6RYR/log-1.png" alt="Horticulture Specialist Logo" style="max-width: 90px; margin-bottom: 15px; border-radius: 50%">
        <h1 style="font-size: 1.75rem; color: #0056b3; font-weight: 700; margin: 0;">Contact Us Submission</h1>
      </div>

      <!-- Message Header -->
      <div style="background: linear-gradient(135deg, #1CD64F, #A4E786); padding: 20px; border-radius: 10px; color: #ffffff; margin-top: 30px;">
        <h2 style="font-size: 1.5rem; margin: 0; text-align: center;">New Message from ${allData.fullName}</h2>
      </div>

      <!-- Message Content -->
      <div style="padding: 25px 0;">
        <p style="font-size: 1.125rem; line-height: 1.8; margin-bottom: 20px;">
          <strong style="color: #0056b3; font-weight: 600;"><i style="margin-right: 8px;">📧</i>Email Address:</strong> ${allData.email}
        </p>
        <p style="font-size: 1.125rem; line-height: 1.8; margin-bottom: 20px;">
          <strong style="color: #0056b3; font-weight: 600;"><i style="margin-right: 8px;">📱</i>Phone Number:</strong> ${allData.phoneNumber}
        </p>
        <p style="font-size: 1.125rem; line-height: 1.8; margin-bottom: 25px;">
          <strong style="color: #0056b3; font-weight: 600;"><i style="margin-right: 8px;">💬</i>Message:</strong> ${allData.message}
        </p>
      </div>

      <!-- Footer Section -->
      <div style="text-align: center; padding: 20px; background-color: #f9fafb; border-radius: 8px; margin-top: 40px;">
        <p style="font-size: 0.875rem; color: #555;">
          This email was sent from the "Contact Us" form on the <strong style="color: #0056b3;">Hortspec</strong> website. 
        </p>
      </div>
    </div>
  </body>`;

  await sendEmail({
    to: config.email.from as string,
    subject,
    html: html,
  });
};

export {
  sendContactUsEmail,
  sendEmail,
  sendEmailVerification,
  sendResetPasswordEmail,
};
