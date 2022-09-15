const router = require('express').Router()
const Eatery = require("../../models/eatery.model")
const isMod = require("../../middleware/isMod.js");

router.get("/", isMod, async (req, res, next) => {
  try {
    const allEateries = await Eatery.find();
    res.status(200).json(allEateries);
  } catch (error) {
    res.status(400).send(error.message);
  }
  });

  router.get("/pending", isMod, async (req, res, next) => {
    try {
      const allEateries = await Eatery.find({isReputable: "pending"});
      res.status(200).json(allEateries);
    } catch (error) {
      res.status(400).send(error.message);
    }
    });

  


  
  
  module.exports = router;