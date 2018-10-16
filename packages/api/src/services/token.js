import jwt from 'jsonwebtoken';

const { JWT_SECRET } = require('../../config');

function generate(payload, expiresIn = '1d') {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, JWT_SECRET, { expiresIn }, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
}

function decode(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
      }
      resolve(decoded);
    });
  });
}

module.exports = {
  generate,
  decode,
};
