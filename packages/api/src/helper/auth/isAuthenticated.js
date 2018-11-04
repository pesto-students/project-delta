const { invalidToken, expiredToken } = require('../../../constants/ERR_MSGS');
const tokenService = require('../../services/token');
// Checks that the user who sent the request has a valid token
// If authenticated, the decoded token is made available to next middleware at req.decoded
// else, a 400 response is returned, and the next middleware is not called
function isAuthenticated(req, res, next) {
  const token = req.headers.authorization || req.query.token
    || req.cookies.token || req.body.token;
  if (!token) {
    res.status(401).json({ error: invalidToken });
  } else {
    tokenService.decode(token)
      .then((decoded) => {
        req.decoded = decoded;
        next();
      })
      .catch(e => res.status(401).json({
        error: e.name === 'TokenExpiredError' ? expiredToken : invalidToken,
      }));
  }
}

module.exports = { isAuthenticated };
