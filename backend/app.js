require("dotenv").config();

const express = require("express");
//Conectar a mongoose
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");

const { createUser, login } = require("./controllers/users");

const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorHandler");

const { userValidation, loginValidation } = require("./utils/validation");

const userRoutes = require("./routes/users");
const cardRoutes = require("./routes/cards");

const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();

app.use(express.json());

app.use(cors());
app.options("*", cors());

app.use(requestLogger);

// Establecer puerto
const { PORT = 3000 } = process.env;

//Conexión base de datos Mongo
mongoose
  .connect("mongodb://127.0.0.1:27017/aroundb")
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error de conexión:", err));

// Rutas públicas
app.post("/signup", userValidation, createUser);
app.post("/signin", loginValidation, login);

// Todas las rutas siguientes requieren autorización
app.use(auth);

//Montaje de rutas
app.use("/users", userRoutes);
app.use("/cards", cardRoutes);

//Error 404 para rutas inexistentes
app.use((req, res) => {
  res.status(404).json({
    message: "Requested resource not found",
  });
});

// Celebrate
app.use(errors());

// Error Logger
app.use(errorLogger);

// Middleware de errores propio
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`);
});
