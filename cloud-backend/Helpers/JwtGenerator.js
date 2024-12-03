const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

class JwtGenrator {
    static generateJwtToken(id, email) {
        return jwt.sign(
            { id, email }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        )
    }
}



module.exports = JwtGenrator;
