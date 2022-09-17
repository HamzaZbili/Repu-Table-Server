const router = require('express').Router()
const User = require("../../models/user.model")
const isSuper = require("../../middleware/isSuper.js");

// lists all users on website - must be moderator
router.get("/", isSuper ,async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(400).send(error.message);
  }
  });

//selects one user based on ID - must be website moderator
router.get("/:id", isSuper, async(req,res,next) => {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
})

router.patch("/:id", isSuper, async(req,res,next) => {
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

router.delete("/:id", isSuper, async(req,res,next) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id})
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
})
  
module.exports = router;