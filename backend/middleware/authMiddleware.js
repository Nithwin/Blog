const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  console.log('Authenticating user...'); // Log to verify if this is being called
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Ensure 'Authorization' header is being passed
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Attach user data to the request
    next();  // Pass control to the next middleware/handler
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateUser;
