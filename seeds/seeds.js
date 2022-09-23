require("dotenv/config");
require("../db/index");
const User = require("../models/user.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Eatery = require("../models/eatery.model");
const Review = require("../models/review.model");
const salt = 10;
let password = "password";
const generatedSalt = bcrypt.genSaltSync(salt);
const saltedPassword = bcrypt.hashSync(password, generatedSalt);

const usersSeed = [
  {
    username: "Hamza",
    password: saltedPassword,
    email: "hamza.zbili.92@gmail.com",
    role: "super",
    phoneNumber: 7987654321,
  },
  {
    username: "Rachel",
    password: saltedPassword,
    email: "rmnaismith@me.com",
    role: "super",
    phoneNumber: 7987654321,
  },
  {
    username: "Robin",
    password: saltedPassword,
    email: "boxing@email.com",
    role: "moderator",
    phoneNumber: 6123456789,
  },
  {
    username: "Haroun",
    password: saltedPassword,
    email: "muhammad@email.com",
    role: "moderator",
    phoneNumber: 6987654321,
  },
  {
    username: "Florian",
    password: saltedPassword,
    email: "test1@email.com",
    role: "moderator",
    phoneNumber: 6897654321,
  },
  {
    username: "Meryem",
    password: saltedPassword,
    email: "test2@email.com",
    role: "eateryAccount",
    phoneNumber: 6897654321,
  },
  {
    username: "Julien",
    password: saltedPassword,
    email: "test3@email.com",
    role: "eateryAccount",
    phoneNumber: 6897654321,
  },
  {
    username: "Aymeric",
    password: saltedPassword,
    email: "test4@email.com",
    role: "eateryAccount",
    phoneNumber: 6897654321,
  },
  {
    username: "Igor",
    password: saltedPassword,
    email: "test5@email.com",
    role: "eateryAccount",
    phoneNumber: 6897654321,
  },
  {
    username: "Marko",
    password: saltedPassword,
    email: "test6@email.com",
    role: "eateryAccount",
    phoneNumber: 6897654321,
  },
  {
    username: "Kash",
    password: saltedPassword,
    email: "test7@email.com",
    role: "eateryAccount",
    phoneNumber: 6897654321,
  },
  {
    username: "Valery",
    password: saltedPassword,
    email: "test8@email.com",
    role: "eateryAccount",
    phoneNumber: 6897654321,
  },
  {
    username: "Sebastien",
    password: saltedPassword,
    email: "test9@email.com",
    phoneNumber: 6897654321,
  },
  {
    username: "Laurant",
    password: saltedPassword,
    email: "test10@email.com",
    phoneNumber: 6897654321,
  },
  {
    username: "Walid",
    password: saltedPassword,
    email: "test11@email.com",
    phoneNumber: 6897654321,
  },
  {
    username: "Marly",
    password: saltedPassword,
    email: "test12@email.com",
    phoneNumber: 6897654321,
  },
  {
    username: "Charlotte",
    password: saltedPassword,
    email: "test13@email.com",

    phoneNumber: 6897654321,
  },
  {
    username: "Yuan",
    password: saltedPassword,
    email: "test14@email.com",
    phoneNumber: 6897654321,
  },
  {
    username: "Benjamin",
    password: saltedPassword,
    email: "test15@email.com",
    phoneNumber: 6897654321,
  },
  {
    username: "Guillaume",
    password: saltedPassword,
    email: "test16@email.com",
    phoneNumber: 6897654321,
  },
];

(async function () {
  await Review.deleteMany();
  await Eatery.deleteMany();
  await User.deleteMany();
  const users = await User.create(usersSeed);
  process.exit();
})();
