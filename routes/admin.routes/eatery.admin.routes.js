const router = require('express').Router()
const bcrypt = require('bcrypt')
const jsonWebToken = require('jsonwebtoken')
const salt = 10
// const isAuth = require(".././middleware/isAdmin.js")

router.get("/", (req, res, next) => {
    res.json("All good here");
  });
  
  
  module.exports = router;