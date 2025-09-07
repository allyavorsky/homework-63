require("dotenv").config();

const express = require("express");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    },
  })
);

app.get("/", (req, res) => {
  res.send("<h1>Сервер Express. Сесії налаштовано.</h1>");
});

app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
});
