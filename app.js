const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const authRouter = require("./routes/api/auth");
// const usersRouter = require("./routes/api/users");
// const boardsRouter = require("./routes/api/boards");
// const columnsRouter = require("./routes/api/columns");
// const cardsRouter = require("./routes/api/cards");

require("dotenv").config();

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(morgan(formatsLogger));
app.use(cors());

app.use(express.json());

app.use("/api/auth", authRouter);
// app.use("/api/users", usersRouter);
// app.use("/api/boards", boardsRouter);
// app.use("/api/columns", columnsRouter);
// app.use("/api/cards", cardsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.use((error, req, res, next) => {
  const { status = 500, message = "Server error" } = error;
  res.status(status).json({ message });
});

module.exports = app;
