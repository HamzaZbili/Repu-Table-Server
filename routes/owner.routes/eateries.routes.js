const router = require("express").Router();
const Eatery = require("../../models/eatery.model");
const isAuth = require("../../middleware/isauth");
const fileUploader = require("../../config/cloudinary.config");

// owner views all their restaurants
router.get("/my/all", isAuth, async (req, res, next) => {
  try {
    const eateries = await Eatery.find({ owner: req.user.id });
    res.status(200).json(eateries);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// owner views single restaurant
router.get("/my/:id", isAuth, async (req, res, next) => {
  try {
    const eateries = await Eatery.findOne({
      owner: req.user.id,
      _id: req.params.id,
    });
    res.status(200).json(eateries);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//sends application to beome a repu-table
router.patch(
  "/my/:id",
  isAuth,
  fileUploader.single("image"),
  async (req, res, next) => {
    try {
      const { noteToUs } = req.body;
      console.log("file", req.file);
      console.log("filepath", req.file.path);

      const eatery = await Eatery.findOneAndUpdate(
        { owner: req.user.id, _id: req.params.id },
        {
          proofOfLivingWage: req.file.path,
          noteToUs: noteToUs,
          isReputable: "pending",
        },
        { new: true }
      );

      res.status(200).json(eatery);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

// owner posts new restaurant with form
router.post("/my/new", isAuth, async (req, res, next) => {
  const {
    businessName,
    cuisine,
    description,
    address,
    photo,
    website,
    email,
    phoneNumber,
  } = req.body;
  try {
    const newEatery = await Eatery.create({
      businessName: businessName,
      address: address,
      cuisine: cuisine,
      owner: req.user.id,
      description: description,
      photo: photo,
      website: website,
      email: email,
      phoneNumber: phoneNumber,
    });
    res.status(201).json(newEatery);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// owner views all their applications to be reviewed
router.get("/my/all/applications", isAuth, async (req, res, next) => {
  try {
    const eateries = await Eatery.find({
      owner: req.user.id,
      isReputable: "review",
    });
    res.status(200).json(eateries);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/my/delete/:id", isAuth, async (req, res, next) => {
  try {
    const deleteEatery = await Eatery.findOneAndDelete({ _id: req.params.id });
    res.status(204).json(deleteEatery);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
