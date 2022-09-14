require("dotenv/config");
require("../db/index");
const User = require("../models/User.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Eatery = require("../models/eatery.model");
const salt = 10;
let password = "password";
const generatedSalt = bcrypt.genSaltSync(salt);
const saltedPassword = bcrypt.hashSync(password, generatedSalt);

const usersSeed = [
  {
    username: "Hamza",
    password: saltedPassword,
    email: "hamza.zbili.92@gmail.com",
    role: "admin"
  },
  {
    username: "Rachel",
    password: saltedPassword,
    email: "rmnaismith@me.com",
    areaCode: 33,
    phoneNumber: 7987654321,
  },
  {
    username: "IronMike",
    password: saltedPassword,
    email: "boxing@email.com",
    areaCode: 33,
    phoneNumber: 6123456789,
  },
  {
    username: "Ali",
    password: saltedPassword,
    email: "muhammad@email.com",
    areaCode: 33,
    phoneNumber: 6987654321,
  },
  {
    username: "ButterBean",
    password: saltedPassword,
    email: "butter@email.com",
    areaCode: 33,
    phoneNumber: 6897654321,
  },
];

(async function () {
  await Eatery.deleteMany();
  await User.deleteMany();
  
  const users = await User.create(usersSeed);

  console.log(users);
  process.exit();
})();
