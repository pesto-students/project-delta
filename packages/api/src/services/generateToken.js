const jwt = require('jsonwebtoken');

const generate = user => Promise.resolve(jwt.sign({ email: user.email }, process.env.JWT_SECRET));

module.exports = { generate };
