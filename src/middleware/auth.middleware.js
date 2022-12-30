const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return err;
    }
    return decoded;
  });
};
class Authenticated {
  static async isAuthenticated(req, res, next) {
    const bearer = req.headers.authorization;
    let authData = null;
    if (typeof bearer !== 'undefined') {
      const bearerToken = bearer.split(' ')[1];
      req.token = bearerToken;
      const { name } = verifyToken(req.token);
      if (name === 'JsonWebTokenError') {
        return res.status(409).json({
          message: 'Unauthorized, invalid token',
        });
      }

      if (name === 'TokenExpiredError') {
        return res.status(409).json({
          message:
            'Unauthorized, Token has expired signin again to get new token',
        });
      }
      req.userdata = verifyToken(req.token);
      return next();
    }
    return res.status(403).json({
      message:
        'You can not proceed without setting authorization token',
    });
  }
}

module.exports = Authenticated;
