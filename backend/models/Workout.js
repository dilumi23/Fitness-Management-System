

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  WorkoutName: {
    type: String,
    required: true,
  },
});

const Workout = mongoose.model("workout", WorkoutSchema);
module.exports = Workout;
