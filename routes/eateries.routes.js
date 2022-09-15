const router = require("express").Router();
const Eatery = require('../models/eatery.model')

router.get("/", async (req, res, next) => {
  try {
    const eateries = await Eatery.find();

    res.status(200).json(eateries);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;