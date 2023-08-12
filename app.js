const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const cors = require("cors");
const MongoStore = require("connect-mongo");
require('./service');
require("dotenv").config();
const { SESSION_SECRET_WORD, SESSION_KEY, DB } = process.env;
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
    secret: SESSION_SECRET_WORD,
    key: SESSION_KEY,
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    },
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: DB,
      autoRemove: 'native'
    })
  }),
);

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
