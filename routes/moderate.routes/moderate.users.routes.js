const router = require('express').Router()
const Users = require("../../models/user.model")
const isMod = require("../../middleware/isMod.js");
const User = require('../../models/user.model');

// lists all users on website - must be moderator
router.get("/", isMod ,async (req, res, next) => {
  try {
    const allUsers = await Users.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).send(error.message);
  }
  });

//selects one user based on ID - must be website moderator
router.get("/:id", isMod, async(req,res,next) => {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
})

router.patch("/:id", isMod, async(req,res,next) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id},
      { role: req.body.role },
      { new: true })
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
})

router.delete("/:id", isMod, async(req,res,next) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id})
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
})
  
module.exports = router;