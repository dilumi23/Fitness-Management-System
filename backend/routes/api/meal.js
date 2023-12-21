const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Meal = require("../../models/Meal");
const cors = require("cors");

router.use(cors());

//@route  get api/instructor/workout/
//@desc   fetch Workout into the database
//@access Public
//to protect auth add as the second parameter


router.get("/", async (req, res) => {
  Meal.find()
    .then((meal) => res.json(meal))
    .catch((err) => res.status(400).json("Error: " + err));
});

//@route  POST api/instructor/workout/
//@desc   Add Workout into the database
//@access Private
//to protect auth add as the second parameter

router.post("/", (req, res) => {
  const MealName = req.body.MealName;

  const newMeal = new Meal({ MealName });

  //Save Data into the mongo database

  newMeal
    .save()
    .then(() => res.json("Meal Added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//@route  DELETE api/instructor/meal
//@desc  Delete Meal
//@access Private


router.delete("/", async (req, res) => {
  try {
    //Remove Workout
    await Meal.findOneAndRemove({ _id: req.body.id });

    res.json({ msg: "Meal Deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
