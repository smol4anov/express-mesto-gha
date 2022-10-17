const usersRouter = require('express').Router();
const {
  creatUser, getUsers, getUserById, updateUserById, updateUserAvatar,
} = require('../controllers/users');

usersRouter.get('/', getUsers);

usersRouter.post('/', creatUser);

usersRouter.get('/:userId', getUserById);

usersRouter.patch('/me', updateUserById);

usersRouter.patch('/me/avatar', updateUserAvatar);

module.exports = usersRouter;
