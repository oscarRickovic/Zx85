const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const {
  registerUser,
  loginUser,
  verifyCode,
  homeAccess
} = require('../controllers/authControllers')

const router = express.Router();


router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/verify-code', verifyCode);

router.get('/home', authMiddleware, homeAccess);

module.exports = router;
