const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MealSchema = new Schema({
  MealName: {
    type: String,
    required: true,
  },
});

const Meal = mongoose.model("meal", MealSchema);
module.exports = Meal;
