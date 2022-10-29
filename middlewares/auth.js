const jwt = require('jsonwebtoken');
const { AuthorizationError } = require('../errors');
const { SECRET_KEY } = require('../utils/constants');

const auth = (req, res, next) => {
  /* const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', ''); */
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
