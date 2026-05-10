const nodemailer = require('nodemailer');

const sendOTP = async (email, otp) => {
  // During development, log the OTP in the console
  console.log(`\n================================`);
  console.log(`DEVELOPMENT MODE: OTP for ${email} is: ${otp}`);
  console.log(`================================\n`);

  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('Email credentials not provided, skipping actual email send.');
      return;
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail', // or any other service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'QuickService - Your OTP Verification Code',
      text: `Your OTP for QuickService registration is: ${otp}. It will expire in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`OTP email successfully sent to ${email}`);
  } catch (error) {
    console.error('Error sending OTP email:', error);
  }
};

module.exports = { sendOTP };
