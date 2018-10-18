const { invalidToken, expiredToken } = require('../../../constants/ERR_MSGS');
const tokenService = require('../../services/token');

function isAuthenticated(req, res, next) {
  const token = req.headers.Authorization || req.query.token
        || req.cookies.token || req.body.token;
  if (!token) {
    res.status(400).json({ error: invalidToken });
  } else {
    tokenService.decode(token)
      .then((decoded) => {
        req.decoded = decoded;
        next();
      })
      .catch(e => res.status(400).json({
        error: e.name === 'TokenExpiredError' ? expiredToken : invalidToken,
      }));
  }
}

module.exports = isAuthenticated;
