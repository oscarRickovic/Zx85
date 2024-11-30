const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; 

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Ensure token is split and the JWT is extracted correctly
    req.user = decoded; 
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;
