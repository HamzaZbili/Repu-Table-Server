require("dotenv/config");
require("../db/index");
const User = require("../models/user.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Eatery = require("../models/eatery.model");
const Review = require("../models/review.model")
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
    areaCode: 33,
    phoneNumber: 7987654321,
  },
  {
    username: "Rachel",
    password: saltedPassword,
    email: "rmnaismith@me.com",
    role: "super",
    areaCode: 33,
    phoneNumber: 7987654321,
  },
  {
    username: "IronMike",
    password: saltedPassword,
    email: "boxing@email.com",
    role: "moderator",
    areaCode: 33,
    phoneNumber: 6123456789,
  },
  {
    username: "Ali",
    password: saltedPassword,
    email: "muhammad@email.com",
    role: "moderator",
    areaCode: 33,
    phoneNumber: 6987654321,
  },
  {
    username: "eatery1",
    password: saltedPassword,
    email: "test1@email.com",
    role: 'eateryAccount',
    areaCode: 33,
    phoneNumber: 6897654321,
  },
  {
    username: "eatery2",
    password: saltedPassword,
    email: "test2@email.com",
    role: 'eateryAccount',
    areaCode: 33,
    phoneNumber: 6897654321,
  },
  {
    username: "eatery3",
    password: saltedPassword,
    email: "test3@email.com",
    role: 'eateryAccount',
    areaCode: 33,
    phoneNumber: 6897654321,
  },
  {
    username: "eatery4",
    password: saltedPassword,
    email: "test4@email.com",
    role: 'eateryAccount',
    areaCode: 33,
    phoneNumber: 6897654321,
  },
  {
    username: "eatery5",
    password: saltedPassword,
    email: "test5@email.com",
    role: 'eateryAccount',
    areaCode: 33,
    phoneNumber: 6897654321,
  },
  {
    username: "test6",
    password: saltedPassword,
    email: "test6@email.com",
    role: 'eateryAccount',
    areaCode: 33,
    phoneNumber: 6897654321,
  },
  {
    username: "eatery7",
    password: saltedPassword,
    email: "test7@email.com",
    role: 'eateryAccount',
    areaCode: 33,
    phoneNumber: 6897654321,
  },
  {
    username: "eatery8",
    password: saltedPassword,
    email: "test8@email.com",
    role: 'eateryAccount',
    areaCode: 33,
    phoneNumber: 6897654321,
  },
  {
    username: "user1",
    password: saltedPassword,
    email: "test9@email.com",
    areaCode: 33,
    phoneNumber: 6897654321,
  },
  {
    username: "user2",
    password: saltedPassword,
    email: "test10@email.com",
    areaCode: 33,
    phoneNumber: 6897654321,
  },
  {
    username: "user3",
    password: saltedPassword,
    email: "test11@email.com",
    areaCode: 33,
    phoneNumber: 6897654321,
  },
  {
    username: "user4",
    password: saltedPassword,
    email: "test12@email.com",
    areaCode: 33,
    phoneNumber: 6897654321,
  },
  {
    username: "user5",
    password: saltedPassword,
    email: "test13@email.com",
    areaCode: 33,
    phoneNumber: 6897654321,
  },
  {
    username: "user6",
    password: saltedPassword,
    email: "test14@email.com",
    areaCode: 33,
    phoneNumber: 6897654321,
  },
  {
    username: "user7",
    password: saltedPassword,
    email: "test15@email.com",
    areaCode: 33,
    phoneNumber: 6897654321,
  },
  {
    username: "user8",
    password: saltedPassword,
    email: "test16@email.com",
    areaCode: 33,
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
