const mongoose = require('mongoose');
const Card = require('../models/card');

const ERROR_CODE = 500;
const ERROR_NOT_FOUND = 404;
const ERROR_WRONG_DATA = 400;

const creatCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(ERROR_WRONG_DATA).send({ message: 'Переданы некорректные данные' });
        return;
      }
      res.status(ERROR_CODE).send({ message: 'Произошла ошибка на сервере' });
    });
};

const getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.status(200).send(cards))
    .catch(() => {
      res.status(ERROR_CODE).send({ message: 'Произошла ошибка на сервере' });
    });
};

const deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId).orFail(new Error('NotFound'))
    .then(() => res.status(200).send({ status: 'deleted' }))
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(ERROR_NOT_FOUND).send({ message: 'Запрашиваемая карточка не найдена' });
        return;
      }
      if (err instanceof mongoose.Error.CastError) {
        res.status(ERROR_WRONG_DATA).send({ message: 'Некорректный формат id' });
        return;
      }
      res.status(ERROR_CODE).send({ message: 'Произошла ошибка на сервере' });
    });
};

const setCardLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail(new Error('NotFound'))
    .populate(['owner', 'likes'])
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(ERROR_NOT_FOUND).send({ message: 'Запрашиваемая карточка не найдена' });
        return;
      }
      if (err instanceof mongoose.Error.CastError) {
        res.status(ERROR_WRONG_DATA).send({ message: 'Некорректный формат id' });
        return;
      }
      res.status(ERROR_CODE).send({ message: 'Произошла ошибка на сервере' });
    });
};

const removeCardLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail(new Error('NotFound'))
    .populate(['owner', 'likes'])
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'NotFound') {
        res.status(ERROR_NOT_FOUND).send({ message: 'Запрашиваемая карточка не найдена' });
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
  creatCard, getCards, deleteCardById, setCardLike, removeCardLike,
};
