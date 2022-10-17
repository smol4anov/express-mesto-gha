const cardsRouter = require('express').Router();
const {
  creatCard, getCards, deleteCardById, setCardLike, removeCardLike,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);

cardsRouter.post('/', creatCard);

cardsRouter.delete('/:cardId', deleteCardById);

cardsRouter.put('/:cardId/likes', setCardLike);

cardsRouter.delete('/:cardId/likes', removeCardLike);

module.exports = cardsRouter;
