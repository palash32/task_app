const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  sign: (userId) => {
    const secret = process.env.JWT_SECRET_KEY;
    const expiresIn = '1h'; 
    const token = jwt.sign({ userId }, secret, { expiresIn });
    return token;
  },
  verify: (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  },
};
