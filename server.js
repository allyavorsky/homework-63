require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");

const bcrypt = require("bcrypt");

const app = express();
const PORT = process.env.PORT || 3000;

const users = [];

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return res.status(400).send("Користувач з таким email вже існує");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now().toString(),
      email: email,
      password: hashedPassword,
    };

    users.push(newUser);

    console.log("Зареєстровані користувачі:", users);

    res.status(201).send("Користувача успішно зареєстровано");
  } catch (error) {
    res.status(500).send("Помилка на сервері");
  }
});

app.get("/", (req, res) => {
  res.send("<h1>Сервер Express. Готовий до реєстрації.</h1>");
});

app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
});
