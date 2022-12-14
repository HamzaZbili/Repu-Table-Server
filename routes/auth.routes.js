const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jsonWebToken = require("jsonwebtoken");
const salt = 10;
const isAuthenticated = require("../middleware/isAuth");

router.post("/signup", async (req, res, next) => {
  const { username, email, password, phoneNumber, role } = req.body;
  if (!password || !username) {
    return res
      .status(400)
      .json({ message: "Please provide a password and username." });
  }
  try {
    const foundUser = await User.findOne({ $or: [{ username }, { email }] });
    if (foundUser) {
      console.log("username or email already taken");
      return res
        .status(400)
        .send({ message: "username or email already in use" });
    }

    const generatedSalt = await bcrypt.genSalt(salt);
    const hashedPassword = await bcrypt.hash(password, generatedSalt);

    const newUser = {
      username,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    };
    const createdUser = await User.create(newUser);
    res.status(201).json(createdUser);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  console.log("test");
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Please provide username and password" });
  }
  try {
    const foundUser = await User.findOne({ username }).select("password");
    if (!foundUser) {
      return res.status(400).json({ message: "wrong credentials" });
    }
    const matchingPassword = bcrypt.compareSync(password, foundUser.password);
    if (!matchingPassword) {
      return res.status(400).json({ message: "wrong credentials" });
    }
    const payload = { username };
    const token = jsonWebToken.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/me", isAuthenticated, (req, res, next) => {
  // console.log("req payload", req.payload);
  res.status(200).json(req.user);
});

module.exports = router;
