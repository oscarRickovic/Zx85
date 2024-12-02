const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Function to generate a random 6-digit number
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000); // Ensures a 6-digit number
};

const sendEmailByA = async (email, code) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_LOGIN,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Verification Service" <${process.env.SMTP_FROM_EMAIL}>`, // Verified sender
      to: email,
      subject: `Email Verification`,
      text: `Hello,\n\nYour verification code is: ${code}.\n\nThank you!`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

const generateJwtToken = (id, email) => {
  return jwt.sign(
    { id, email }, 
    process.env.JWT_SECRET, 
    { expiresIn: '1h' }
  )
}


module.exports = {
  sendEmailByA,
  generateVerificationCode,
  generateJwtToken
};