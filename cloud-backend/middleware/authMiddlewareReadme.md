## `authmiddleware.js`

This file contains the authentication middleware used to verify JWT tokens in requests. It checks for the presence of a token in the `Authorization` header, verifies the token, and allows access to protected routes if the token is valid.

### Key Functions:
1. **`authMiddleware`**:
   - Extracts the token from the `Authorization` header.
   - If no token is provided, it returns a `401` error with the message "Access denied."
   - If a token is provided, it attempts to decode it using the secret key (`JWT_SECRET`).
   - If the token is valid, it adds the decoded user information to the request (`req.user`).
   - If the token is invalid, it returns a `400` error with the message "Invalid token."

### How It Works:
- The middleware is typically used in routes that require user authentication.
- If the token is valid, the next middleware or route handler will be called. If the token is invalid or missing, an error response will be returned.

### Example Usage:

```javascript
const authMiddleware = require('./middleware/authmiddleware');

router.get('/protected-route', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});
