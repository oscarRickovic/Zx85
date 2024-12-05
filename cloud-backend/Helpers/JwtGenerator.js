const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

class JwtGenrator {
    static generateJwtToken(id, email) {
        return jwt.sign(
            { id, email }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        )
    }
}



module.exports = JwtGenrator;
