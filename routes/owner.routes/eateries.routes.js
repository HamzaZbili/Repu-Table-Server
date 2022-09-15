const router = require("express").Router();
const Eatery = require('../../models/eatery.model')
const isAuth = require("../../middleware/isAuth")

router.get("/", isAuth, async (req, res, next) => {
  try {
    const eateries = await Eatery.find({owner: req.user.id});
    res.status(200).json(eateries);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/:id", isAuth, async (req, res, next) => {
  try {
    const eateries = await Eatery.findOne(
      {owner: req.user.id,
       _id: req.params.id});
    res.status(200).json(eateries);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


router.patch("/:id", isAuth, async (req, res, next) => {
  console.log("test")
  try {
    const {proofOfLivingWage }= req.body
    const eatery = await Eatery.findOneAndUpdate(
      {owner: req.user.id,
       _id: req.params.id},
       {proofOfLivingWage: proofOfLivingWage,
        declaration: true,
        isReputable: 'pending'},
       {new: true});
    res.status(200).json(eatery);
  } catch (error) {
    res.status(400).send(error.message);
  }
})

module.exports = router;