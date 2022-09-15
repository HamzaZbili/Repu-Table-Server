const router = require('express').Router()
const Users = require("../../models/user.model")
const isMod = require("../../middleware/isMod.js")

router.get("/", isMod ,async (req, res, next) => {
  try {
    const allUsers = await Users.find();

    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).send(error.message);
  }
  });

// router.patch("/:id", async(req,res,next) => {

// })
  
module.exports = router;