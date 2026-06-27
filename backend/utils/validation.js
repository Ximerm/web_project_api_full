const { celebrate, Joi, Segments } = require("celebrate");
const validator = require("validator");

// Validación personalizada para URLs
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }

  return helpers.error("string.uri");
};

// Validación para ObjectId de MongoDB
const objectIdPattern = /^[0-9a-fA-F]{24}$/;

// POST /signup
const userValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// POST /signin
const loginValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// PATCH /users/me
const updateProfileValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

// PATCH /users/me/avatar
const updateAvatarValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  }),
});

// POST /cards
const createCardValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL),
  }),
});

// GET /users/:userId
const userIdValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().required().pattern(objectIdPattern),
  }),
});

// DELETE /cards/:cardId
// PUT /cards/:cardId/likes
// DELETE /cards/:cardId/likes
const cardIdValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().required().pattern(objectIdPattern),
  }),
});

module.exports = {
  userValidation,
  loginValidation,
  updateProfileValidation,
  updateAvatarValidation,
  createCardValidation,
  userIdValidation,
  cardIdValidation,
};
