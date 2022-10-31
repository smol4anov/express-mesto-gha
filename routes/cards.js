const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  creatCard, getCards, deleteCardById, setCardLike, removeCardLike,
} = require('../controllers/cards');
const { rexExpUrl } = require('../utils/constants');

cardsRouter.get('/', getCards);

cardsRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(rexExpUrl),
  }),
}), creatCard);

cardsRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), deleteCardById);

cardsRouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), setCardLike);

cardsRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), removeCardLike);

module.exports = cardsRouter;
