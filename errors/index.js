const NotFoundError = require('./NotFoundError');
const AuthorizationError = require('./AuthorizationError');
const ForbiddenError = require('./ForbiddenError');
const ConflictError = require('./ConflictError');
const ValidationError = require('./ValidationError');

module.exports = {
  NotFoundError, AuthorizationError, ForbiddenError, ConflictError, ValidationError,
};
