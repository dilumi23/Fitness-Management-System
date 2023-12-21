const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FeedbackSchema = new Schema(
  {
    GymAppearance: { type: String },

    ActivitiesQuality: { type: String },

    QualityOfStaff: { type: String },

    Overall: { type: String },
  },
  {
    timestamps: true, //it will automatically create fields when it is created or modified
  }
);

const Feedback = mongoose.model("Feedback", FeedbackSchema);

module.exports = Feedback;
