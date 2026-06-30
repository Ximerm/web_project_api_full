const Card = require("../models/card");

// GET - Devuelve todas las tarjetas
const getCards = (req, res, next) => {
  Card.find({})
    .sort({ createdAt: -1 })
    .then((cards) => {
      console.log(
        cards.map((card) => ({
          name: card.name,
          createdAt: card.createdAt,
        })),
      );

      res.send(cards);
    })
    .catch(next);
};

// POST - Crea una nueva tarjeta
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.statusCode = 400;
        err.message = "Invalid card data";
      }

      return next(err);
    });
};

// DELETE - Elimina una tarjeta por Id
const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      const error = new Error("Card not found");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        const error = new Error("You are not authorized to delete this card");
        error.statusCode = 403;
        return next(error);
      }
      return Card.findByIdAndDelete(req.params.cardId).then(() =>
        res.send({ message: "Card deleted" }),
      );
    })
    .catch((err) => {
      if (err.name === "CastError") {
        err.statusCode = 400;
        err.message = "Invalid card id";
      }

      return next(err);
    });
};

// PUT -/cards/:cardId/likes — Dar like a una tarjeta
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error("Card not found");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        err.statusCode = 400;
        err.message = "Invalid card id";
      }

      return next(err);
    });
};

// DELETE LIKE /cards/:cardId/likes — Dar unlike a una tarjeta
const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error("Card not found");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        err.statusCode = 400;
        err.message = "Invalid card id";
      }

      return next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
