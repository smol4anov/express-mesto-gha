const mongoose = require('mongoose');
const User = require('../models/user');

const ERROR_CODE = 500;
const ERROR_NOT_FOUND = 404;
const ERROR_WRONG_DATA = 400;

const creatUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(ERROR_WRONG_DATA).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(ERROR_CODE).send({ message: 'Произошла ошибка на сервере' });
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => {
      res.status(ERROR_CODE).send({ message: 'Произошла ошибка на сервере' });
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.userId).orFail(new Error('NotFound'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(ERROR_NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден' });
        return;
      }
      if (err instanceof mongoose.Error.CastError) {
        res.status(ERROR_WRONG_DATA).send({ message: 'Некорректный формат id' });
        return;
      }
      res.status(ERROR_CODE).send({ message: 'Произошла ошибка на сервере' });
    });
};

const updateUserById = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  ).orFail(new Error('NotFound'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(ERROR_WRONG_DATA).send({ message: 'Переданы некорректные данные' });
        return;
      }
      if (err.message === 'NotFound') {
        res.status(ERROR_NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден' });
        return;
      }
      if (err instanceof mongoose.Error.CastError) {
        res.status(ERROR_WRONG_DATA).send({ message: 'Некорректный формат id' });
        return;
      }
      res.status(ERROR_CODE).send({ message: 'Произошла ошибка на сервере' });
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  ).orFail(new Error('NotFound'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(ERROR_WRONG_DATA).send({ message: 'Переданы некорректные данные' });
        return;
      }
      if (err.message === 'NotFound') {
        res.status(ERROR_NOT_FOUND).send({ message: 'Запрашиваемый пользователь не найден' });
        return;
      }
      if (err instanceof mongoose.Error.CastError) {
        res.status(ERROR_WRONG_DATA).send({ message: 'Некорректный формат id' });
        return;
      }
      res.status(ERROR_CODE).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports = {
  creatUser, getUsers, getUserById, updateUserById, updateUserAvatar,
};
