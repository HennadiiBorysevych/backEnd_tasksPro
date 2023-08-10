const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
require('./service');
//const FileStore = require("session-file-store")(session);
require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const authRouter = require("./routes/api/auth");

const usersRouter = require("./routes/api/users");

const boardsRouter = require("./routes/api/boards");
const columnsRouter = require("./routes/api/columns");
const cardsRouter = require("./routes/api//cards");

const dragAndDropRouter = require("./routes/api/dragAndDrop");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(morgan(formatsLogger));
app.use(cors());

app.use(express.json());

app.use(
  session({
    secret: 'secret-word',
    key: 'session-key',
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    },
    saveUninitialized: false,
    resave: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/auth", authRouter);

app.use("/api/users", usersRouter);

app.use("/api/boards", boardsRouter);
app.use("/api/columns", columnsRouter);
app.use("/api/cards", cardsRouter);

app.use("/api/drag", dragAndDropRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.use((error, req, res, next) => {
  const { status = 500, message = "Server error" } = error;
  res.status(status).json({ message });
});

module.exports = app;
