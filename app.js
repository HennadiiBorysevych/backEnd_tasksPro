const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
// const helmetCSP = require("helmet-csp");

const swaggerUi = require("swagger-ui-express");
// const NodeCashe = require('node-cache');

// const cashe = new NodeCashe();

const swaggerDocument = require("./swagger.json");

const authRouter = require("./routes/api/auth");
const usersRouter = require("./routes/api/users");
const boardsRouter = require("./routes/api/boards");
const columnsRouter = require("./routes/api/columns");
const cardsRouter = require("./routes/api//cards");

const { SESSION_SECRET_WORD, SESSION_KEY, DB } = process.env;

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// app.use(
//   helmetCSP({
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: [
//         "'self'",
//         "'unsafe-inline'",
//         "'unsafe-eval'",
//         "https://hennadiiborysevych.github.io",
//       ],
//     },
//   })
// );

// Для кешування шрифтів. Встановлено максимльний термін зберігання в кешу - 1 рік
app.use(
  "/fonts",
  express.static(__dirname + "src/assets/fonts", { maxAge: 31557600000 })
);
// Для кешування контентних картинок. Встановлено максимльний термін зберігання в кешу - 1 рік
app.use(
  "/images/welcomeAndPlant",
  express.static(__dirname + "src/assets/images/welcomeAndPlant", {
    maxAge: 31557600000,
  })
);
// Для кешування міні-картинок бекграунду дошок. Встановлено максимльний термін зберігання в кешу - 1 рік
app.use(
  "/images/backgroundIcons",
  express.static(__dirname + "src/assets/images/backgroundIcons", {
    maxAge: 31557600000,
  })
);

app.use(morgan(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: SESSION_SECRET_WORD,
    key: SESSION_KEY,
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 8 * 60 * 60 * 1000,
    },
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: DB,
      autoRemove: "native",
    }),
  })
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/boards", boardsRouter);
app.use("/api/columns", columnsRouter);
app.use("/api/cards", cardsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.use((error, req, res, next) => {
  const { status = 500, message = "Server error" } = error;
  res.status(status).json({ message });
});

module.exports = app;
