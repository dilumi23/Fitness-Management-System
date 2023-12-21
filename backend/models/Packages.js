const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PackageSchema = new Schema({

    PackageName: {
        type: String,
        //required: true,

    },
    PackagePrice: {
        type: String,
       // required: true,
    },
    PackageDescriprion: {
        type: String,
       // required: true,
    },
    PackagePeriod: {
        type: String,
       // required: true,
    },
    ImgPath: {
        type: String,
        //required: true,
    },

});

const Packages = mongoose.model("Packages", PackageSchema);
module.exports = Packages;