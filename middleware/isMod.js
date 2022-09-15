const jsonWebToken = require("jsonwebtoken");
const User = require("../models/user.model");

const isMod = async (req, res, next) => {
  console.log(req.headers.authorization)
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({ message: "No token found!" });
    }
    token = token.replace("Bearer ", "");
    const userToken = jsonWebToken.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findOne({ username: userToken.username })
    console.log(user);
    if (user.role !== "moderator") {
      return res.status(400).json({ message: "must be a moderator to proceed" });
    }
    req.user = user;
    // try to check role with existing auth route - if not, make new one
    console.log(user)
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
  next();
};


module.exports = isMod;
