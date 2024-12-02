const bcrypt = require('bcryptjs');
const PreUser = require('../models/PreUser');
const User = require('../models/User');

const {
  generateVerificationCode,
  sendEmailByA,
  generateJwtToken
} = require('../config/helper');

const Crypto  = require('../Helpers/Crypto');

const JWT_SECRET = process.env.JWT_SECRET;


const registerUser = async (req, res) => {
  const encryptedCredentials = req.body;
  console.log(encryptedCredentials)
  let user = Crypto.decryptSymEncryption(encryptedCredentials.encryptedCredentials);
  const email = user.email;
  const hashedPassword = user.password;
  if (!email || !hashedPassword) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const existingPreUser = await PreUser.findOne({ where: { email } });
    const existingUser = await User.findOne({ where: { email } });
    if (existingPreUser || existingUser) return res.status(400).json({ error: 'Email already exists' });

    const verificationCode = generateVerificationCode();

    // Send verification email and wait for it to complete
    const emailSent = await sendEmailByA(email, verificationCode);  // assuming sendEmailByA returns a promise
    console.log("Email Sent INFOS: ", emailSent);
    if (!emailSent) {
        return res.status(500).json({ error: 'Failed to send verification email' });
    }

    // Save PreUser data after sending email
    const preUser = await PreUser.create({ email, password: hashedPassword, verificationCode });

    res.status(201).json({ message: 'Verification email sent. Please check your inbox.' });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
}


const loginUser = async (req, res) => {
    const encryptedCredentials = req.body;
    console.log(encryptedCredentials)
    let loginUser = Crypto.decryptSymEncryption(encryptedCredentials.encryptedCredentials);
    const email = loginUser.email;
    const hashedPassword = loginUser.password;
  
    if (!email || !hashedPassword) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
  
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  
      const isMatch = await bcrypt.compare(hashedPassword, user.password);
      if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
      
      const token = generateJwtToken(user.id, user.email);
      res.json({ message: 'Login successful', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Login failed' });
    }
  }

const verifyCode = async (req, res) => {
  const encryptedCredentials = req.body;
  console.log(encryptedCredentials)
  let credenatials = Crypto.decryptSymEncryption(encryptedCredentials.encryptedCredentials);
  console.log(credenatials)
  let email = credenatials.email;
  let verificationCode = credenatials.verificationCode;
  if (!email || !verificationCode) {
      return res.status(400).json({ error: 'Email and verification code are required' });
  }

  try {
      // Find PreUser by email
      const preUser = await PreUser.findOne({ where: { email } });
      if (!preUser) return res.status(400).json({ error: 'PreUser not found' });

      // Check if verification code matches
      if (preUser.verificationCode !== verificationCode) {
          return res.status(400).json({ error: 'Invalid verification code' });
      }

      // Create User from PreUser data
      const user = await User.create({
          email: preUser.email,
          password: preUser.password, // Save the hashed password
      });

      // Delete PreUser after successful registration
      await PreUser.destroy({ where: { email } });

      // Generate JWT token
      const token = generateJwtToken(user.id, user.email);
  
      res.status(200).json({ message: 'Registration complete', token });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Verification failed' });
  }
};


module.exports = {
    registerUser,
    loginUser,
    verifyCode
}