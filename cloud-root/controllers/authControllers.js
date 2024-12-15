const bcrypt = require('bcryptjs');
const PreUser = require('../models/PreUser');
const User = require('../models/User');
const EmailVerification = require('../Helpers/EmailVerification')
const JwtGenrator = require('../cloud/Helpers/JwtGenerator');
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
    const verificationCode = EmailVerification.generateVerificationCode();
    const emailSent = await EmailVerification.sendEmailByA(email, verificationCode);
    if (!emailSent) {
        return res.status(500).json({ error: 'Failed to send verification email' });
    }
    const preUser = await PreUser.create({ email, password: hashedPassword, verificationCode });
    res.status(201).json({ message: 'Verification email sent. Please check your inbox.', user : {email : preUser.email}});
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
}


const loginUser = async (req, res) => {
    const encryptedCredentials = req.body;
    console.log(encryptedCredentials)
    let loginUser = Crypto.decryptSymEncryption(encryptedCredentials.encyptedCredentials);
    console.log(loginUser)
    const email = loginUser.email;
    const hashedPassword = loginUser.password;
  
    if (!email || !hashedPassword) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
  
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  
      const isMatch = hashedPassword == user.password;
      if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
      
      const token = JwtGenrator.generateJwtToken(user.id, user.email);
      res.json({ message: 'Login successful', token : token, user : {email : user.email} });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Login failed' });
    }
  }

const verifyCode = async (req, res) => {
  const encryptedCredentials = req.body;
  let credenatials = Crypto.decryptSymEncryption(encryptedCredentials.encryptedCredentials);
  let email = credenatials.email;
  let verificationCode = credenatials.verificationCode;
  if (!email || !verificationCode) {
      return res.status(400).json({ error: 'Email and verification code are required' });
  }

  try {
      const preUser = await PreUser.findOne({ where: { email } });
      if (!preUser) return res.status(400).json({ error: 'PreUser not found' });
      if (preUser.verificationCode !== verificationCode) {
          return res.status(400).json({ error: 'Invalid verification code' });
      }
      const user = await User.create({
          email: preUser.email,
          password: preUser.password,
      });

      await PreUser.destroy({ where: { email } });

      const token = JwtGenrator.generateJwtToken(user.id, user.email);
  
      res.status(200).json({ message: 'Registration complete', token, user : {email : email}});
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Verification failed' });
  }
};

const homeAccess = async (req, res) => {
  const user = req.user;
  const email = user.email;
  if( user.id == null || user.email == null) return res.status(400).json({error : "invalid credetials"})
  try{
      const currentUser = await User.findOne({ where: { email } });
      if (!currentUser) return res.status(400).json({ error: 'User not found' });
      const token = JwtGenrator.generateJwtToken(currentUser.id, currentUser.email);
      res.status(200).json({ message: 'Done', token, user : {email : email}});
  } catch(e) {
    console.error(error);
    res.status(500).json({error : "verification failed"})
  }
}


module.exports = {
    registerUser,
    loginUser,
    verifyCode,
    homeAccess
}