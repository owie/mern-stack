const jwt = require('jsonwebtoken');
const config = require('../config');
const { JWT_SECRET } = config;

const auth = (req, res, next) => {
  const token  = req.header('x-auth-token');

  // check token
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // validate token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Add user from payload
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Token invalid' })
  }
  
}

module.exports = auth;