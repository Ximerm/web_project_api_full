const mongoose = require("mongoose");
const validator = require("validator");

//Validación datos de link

const urlRegex =
  /^(https?:\/\/)(www\.)?([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+)(?:\/[a-zA-Z0-9._~:/?%#\[\]@!$&'()*+,;=-]*)*#?$/;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Correo electrónico no válido",
    },
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Jacques Cousteau",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Explorador",
  },
  avatar: {
    type: String,
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
    validate: {
      validator(v) {
        return urlRegex.test(v);
      },
      message: "URL de avatar no válida",
    },
  },
});

module.exports = mongoose.model("user", userSchema);
