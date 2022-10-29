const mongoose = require('mongoose');
const Card = require('../models/card');
const { NotFoundError, ForbiddenError, ValidationError } = require('../errors');

const creatCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

const deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId).orFail(new NotFoundError('Запрашиваемая карточка не найдена'))
    .then((card) => {
      if (card.owner._id !== req.user) {
        throw new ForbiddenError('Нельзя удалить чужую карточку');
      }
      return Card.findByIdAndRemove(card._id);
    })
    .then(() => res.status(200).send({ status: 'deleted' }))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new NotFoundError('Некорректный формат id'));
        return;
      }
      next(err);
    });
};

const setCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail(new NotFoundError('Запрашиваемая карточка не найдена'))
    .populate(['owner', 'likes'])
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new NotFoundError('Некорректный формат id'));
        return;
      }
      next(err);
    });
};

const removeCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail(new NotFoundError('Запрашиваемая карточка не найдена'))
    .populate(['owner', 'likes'])
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new NotFoundError('Некорректный формат id'));
        return;
      }
      next(err);
    });
};

module.exports = {
  creatCard, getCards, deleteCardById, setCardLike, removeCardLike,
};
