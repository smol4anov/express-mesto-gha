const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { AuthorizationError } = require('../errors');
const {
  defaultUserName,
  defaultUserAbout,
  defaultUserAvatar,
  rexExpUrl,
} = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: 'String',
    required: true,
    index: {
      unique: true,
    },
    validate: (value) => validator.isEmail(value),
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    default: defaultUserName,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    default: defaultUserAbout,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: defaultUserAvatar,
    validate: (value) => rexExpUrl.test(value),
  },
}, {
  versionKey: false,
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthorizationError('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthorizationError('Неправильные почта или пароль');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
