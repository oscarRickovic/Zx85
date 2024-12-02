const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const PreUser = require('../models/PreUser');
const User = require('../models/User');

const {
  generateVerificationCode,
  sendEmailByA
} = require('../config/helper')

const JWT_SECRET = process.env.JWT_SECRET;


const registerUser = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
  
    try {
      // Check if email already exists in PreUser or User
      const existingPreUser = await PreUser.findOne({ where: { email } });
      const existingUser = await User.findOne({ where: { email } });
      if (existingPreUser || existingUser) return res.status(400).json({ error: 'Email already exists' });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationCode = generateVerificationCode();

      // Send verification email
      sendEmailByA(email, verificationCode);
      res.status(201).json({ message: 'Verification email sent. Please check your inbox.' });

      // Save PreUser
      const preUser = await PreUser.create({ email, password: hashedPassword, verificationCode });
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Registration failed' });
    }
  }

const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
  
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
  
      const token = jwt.sign({ id: user.id, email: user.email, password: user.password }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: 'Login successful', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Login failed' });
    }
  }

module.exports = {
    registerUser,
    loginUser
}