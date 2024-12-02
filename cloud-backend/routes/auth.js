const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const {
  registerUser,
  loginUser,
  verifyCode
} = require('../controllers/authControllers')

const router = express.Router();


router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/verify-code', verifyCode);

// Dashboard route with authMiddleware to ensure JWT token is verified
router.get('/home', authMiddleware, (req, res) => {
  res.json({ message: `Welcome, user ${req.user.id}` });
});

module.exports = router;
