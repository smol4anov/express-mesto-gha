const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserById, updateUserById, updateUserAvatar, getSelfUser,
} = require('../controllers/users');
const { rexExpUrl } = require('../utils/constants');

usersRouter.get('/', getUsers);

usersRouter.get('/me', getSelfUser);

usersRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUserById);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUserById);

usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(rexExpUrl),
  }),
}), updateUserAvatar);

module.exports = usersRouter;
