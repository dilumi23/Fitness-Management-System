const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const UserSchema = new Schema({

    inTime: {
        type: String,
    },
    outTime: {
        type: String,
    },
   
});

module.exports = mongoose.model("Time", UserSchema);