const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  //@desc gym package
 
  package: {
    type: String,
  },
  packagePeriod: {
    type: String,
  },

  subscriptionDate: {
    type: String,
  },

  currentWeight: {
    type: String,
  },

  currentHeight: {
    type: String,
  },
  //@desc assigned instructor
  instructor: { type: String },
  //@desc workout plan
  workoutplan: [
    {
      exercise: { type: String },
    },
  ],
  //@desc meal plan
  mealplan: [
    {
      meal: { type: String },
    },
  ],
  //@desc daily meal list

  dailymeallist: [
    {
      mealName: { type: String },
      calories: { type: String },
      proteins: { type: String },
      fat: { type: String },
      date: { type: Date },
    },
  ],

  //@desc completed workout list
  //@author Dilumi
  completedWorkoutList: [
    {
      weight: { type: String },
      height: { type: String },
      exercise: { type: String },
      time: { type: String },
      calories: { type: String },
      date: { type: Date },
    },
  ],
  time: [
    {
      inTime: {
        type: String,
      },
      outTime: {
        type: String,
      },
      date: {
        type: String,
      },
    },
  ],
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
