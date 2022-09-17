const router = require('express').Router()
const Eatery = require("../../models/eatery.model")
const isMod = require("../../middleware/isMod.js");

// mod route to view all eateries despite isReputable Status
// general user cannot access this data
router.get("/", isMod, async (req, res, next) => {
  try {
    const allEateries = await Eatery.find();
    res.status(200).json(allEateries);
  } catch (error) {
    res.status(400).send(error.message);
  }
  });

  // mod route to view all pending applications
router.get("/pending", isMod, async (req, res, next) => {
  try {
    const allEateries = await Eatery.find({isReputable: "pending"});
    res.status(200).json(allEateries);
  } catch (error) {
    res.status(400).send(error.message);
  }
  });

// mod route to view eatery by ID
router.get("/:id", isMod, async (req,res,next) => {
  try {
    const eatery = await Eatery.findById(req.params.id)
    res.status(200).json(eatery);
  } catch (error) {
    res.status(400).send(error.message);
  }
})

// moderator can review application
//and update isReputable status
router.patch("/:id", isMod, async (req,res,next) => {
  try {
    const {applicationOutcome, moderatorNotes} = req.body
    console.log(applicationOutcome)
    const eatery = await Eatery.findOneAndUpdate(
      {_id: req.params.id},
      {isReputable: applicationOutcome,
        moderatorNotes: moderatorNotes},
      {new: true})
    res.status(200).json(eatery);
  } catch (error) {
    res.status(400).send(error.message);
  }
})

// allows moderator to remove eatery from database
router.delete("/:id", isMod, async (req,res,next) => {
  console.log('test')
  try {
    const eatery = await Eatery.findByIdAndDelete(req.params.id)
    res.status(204).json({message: "deletion successful"});
  } catch (error) {
    res.status(400).send(error.message);
  }
})

  


  
  
  module.exports = router;