require("dotenv").config();
const express = require("express");
const session = require("express-session");

const passport = require("passport");

const app = express();
const PORT = process.env.PORT || 3000;

const users = [];

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

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find((u) => u.id === id);
  done(null, user);
});

app.get("/", (req, res) => {
  res.send("<h1>Сервер Express. Passport підключено.</h1>");
});

app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
});
