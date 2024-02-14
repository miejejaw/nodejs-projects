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

const sendEmail = async (email, subject, htmlContent) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    html: htmlContent
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('email sent successfully.');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export default sendEmail;
