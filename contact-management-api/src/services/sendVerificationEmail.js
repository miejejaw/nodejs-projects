import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, 
    pass: process.env.EMAIL_PASSWORD 
  }
});

const sendVerificationEmail = async (email, verificationToken) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Verify Your Email',
    html: `<p>Please click <a href="http://localhost:8800/api/auth/verify-email/${verificationToken}">here</a> to verify your email address.</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully.');
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};

export default sendVerificationEmail;
