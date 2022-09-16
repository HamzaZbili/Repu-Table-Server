const router = require("express").Router();
const Eatery = require('../../models/eatery.model')
const isAuth = require("../../middleware/isauth")

// owner views all their restaurants
router.get("/my/all", isAuth, async (req, res, next) => {
  try {
    const eateries = await Eatery.find({owner: req.user.id});
    res.status(200).json(eateries);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// owner views single restaurant
router.get("/my/:id", isAuth, async (req, res, next) => {
  try {
    const eateries = await Eatery.findOne(
      {owner: req.user.id,
       _id: req.params.id});
    res.status(200).json(eateries);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//sends application to beome a repu-table
router.patch("/my/:id", isAuth, async (req, res, next) => {
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

// owner posts new restaurant with form
router.post("/my/new", isAuth, async (req, res, next) => {
  const {businessName,
    cuisine,
    priceGuide,
    description,
    address,
    photo,
    website,
    email,
    phoneNumber} = req.body
  try {
    const newEatery = await Eatery.create({
    businessName: businessName,
    address: address,
    cuisine: cuisine,
    priceGuide: priceGuide,
    owner: req.user.id,
    description: description,
    photo: photo,
    website: website,
    email: email,
    phoneNumber: phoneNumber
    })
    res.status(201).json(newEatery);
  } catch (error) {
    res.status(400).send(error.message);
  }
})

// owner views all their applications to be reviewed
router.get("/my/all/applications", isAuth, async (req, res, next) => {
  try {
    const eateries = await Eatery.find(
      {owner: req.user.id,
        isReputable: "review"});
    res.status(200).json(eateries);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;