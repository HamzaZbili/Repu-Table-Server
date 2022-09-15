const router = require("express").Router();
const Eatery = require('../../models/eatery.model');
const Review = require("../../models/review.model");
const isAuth = require("../../middleware/isAuth");

router.get("/", async (req, res, next) => {
    try {
        const eateries = await Eatery.find({isReputable: 'repu-table'})
        res.status(200).json(eateries);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const eateries = await Eatery.find(
            {isReputable: 'repu-table',
             _id: req.params.id})
        res.status(200).json(eateries);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.post("/:id", isAuth, async (req, res, next) => {
    try {
        const newReview = await Review.create({
            author: req.user.id,
            eatery: req.params.id,
            rating: req.body.rating,
            content: req.body.content
        })
        res.status(200).json(newReview);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.get("/reviews/:id", async (req, res, next) => {
    try {
        const findReviews = await Review.find(
            {eatery: req.params.id})
        res.status(200).json(findReviews);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = router;