const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { NODE_ENV, JWT_SECRET } = process.env;

const secret = NODE_ENV === "production" ? JWT_SECRET : "super-secret-key";

//GET - Devuelve todos los usuarios
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

//GET - Devuelve usuario por Id
const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        return next(error);
      }

      return res.send(user);
    })
    .catch(next);
};

// GET /users/me - Obtener el usuario actual
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        return next(error);
      }

      return res.send(user);
    })
    .catch(next);
};

//POST /signup - Crea un nuevo usuario
const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      return User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      });
    })
    .then((user) => {
      return res.status(201).send({
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.statusCode = 400;
        err.message = "Invalid user data";
        return next(err);
      }

      if (err.code === 11000) {
        err.statusCode = 409;
        err.message = "Email already exists";
        return next(err);
      }

      return next(err);
    });
};

//POST /singin - Login - Iniciar sesión
const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        const error = new Error("Incorrect email or password");
        error.statusCode = 401;
        return next(error);
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          const error = new Error("Incorrect email or password");
          error.statusCode = 401;
          return next(error);
        }

        const token = jwt.sign({ _id: user._id }, secret, {
          expiresIn: "7d",
        });

        return res.send({ token });
      });
    })
    .catch(next);
};

// PATCH /users/me - Actualizar perfil
const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.statusCode = 400;
        err.message = "Invalid user data";
      }

      return next(err);
    });
};

// PATCH /users/me/avatar - Actualizar avatar
const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.statusCode = 400;
        err.message = "Invalid avatar URL";
      }

      return next(err);
    });
};

module.exports = {
  getUsers,
  getUserById,
  getCurrentUser,
  createUser,
  login,
  updateProfile,
  updateAvatar,
};
