const jwt = require('jsonwebtoken');
const { AuthorizationError } = require('../errors');
const { SECRET_KEY } = require('../utils/constants');

const auth = (req, res, next) => {
  let payload;

  try {
    payload = jwt.verify(req.cookies.jwt, SECRET_KEY);
  } catch (err) {
    return next(new AuthorizationError('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};

module.exports = { auth };
