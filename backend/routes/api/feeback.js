const express = require("express");
const router = require("express").Router();
let Feedback = require("../../models/Feedback");

const app = express();
const cors = require("cors");
router.use(cors());

// @route         GET /fitnessUpdate
// @description   get Feedbacks
// @access        Public
router.get("/", async (req, res) => {
  Feedback.find()
    .then((feedbacks) => {
      res.json(feedbacks);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//@route  POST api/fitnessUpdate
//@desc   Add Feedbacks into the database
//@access Private
//to protect auth add as the second parameter

router.post("/", async (req, res) => {
  const {
    radioFeedbackOne,
    radioFeedbackTwo,
    radioFeedbackThree,
    radioFeedbackFour,
  } = req.body;

  const newFeedback = new Feedback({
    GymAppearance: radioFeedbackOne,
    ActivitiesQuality: radioFeedbackTwo,
    QualityOfStaff: radioFeedbackThree,
    Overall: radioFeedbackFour,
  });

  //Save Data into the mongo database

  newFeedback
    .save()
    .then(() => res.json("Feedback Added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
