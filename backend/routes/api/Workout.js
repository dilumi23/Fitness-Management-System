const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Workout = require("../../models/Workout");
const cors = require("cors");

router.use(cors());

//@route  get api/instructor/workout/
//@desc   fetch Workout into the database
//@access Public
//to protect auth add as the second parameter


router.get("/", async (req, res) => {
  Workout.find()
    .then((workout) => res.json(workout))
    .catch((err) => res.status(400).json("Error: " + err));
});

//@route  POST api/instructor/workout/
//@desc   Add Workout into the database
//@access Private
//to protect auth add as the second parameter


router.post("/", (req, res) => {
  const WorkoutName = req.body.WorkoutName;

  const newWorkout = new Workout({ WorkoutName });

  //Save Data into the mongo database

  newWorkout
    .save()
    .then(() => res.json("Workout Added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//@route  DELETE api/instructor/workout
//@desc  Delete Workout
//@access Private


router.delete("/", async (req, res) => {
  try {
    //Remove Workout
    await Workout.findOneAndRemove({ _id: req.body.id });

    res.json({ msg: "Workout Deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
