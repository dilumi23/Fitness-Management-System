const express = require("express");
const cors = require("cors");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const { json } = require("express");
let Packages = require("../../models/Packages");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./packageImages");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("invalid file format"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.use(cors());

router.get("/", async (req, res) => {
  Packages.find()
    .then((Packages) => res.json(Packages))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/", async (req, res) => {
  var data = req.body;

  try {
    let package = new Packages({
      ImgPath: data.PackageImageURL,
      PackageName: data.PackageName,
      PackagePrice: data.PackagePrice,
      PackageDescriprion: data.PackageDescriprion,
      PackagePeriod:data.PackagePeriod
    });
    await package.save();
    res.json(package);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/", async (req, res) => {
  Packages.find()
    .then((Packages) => res.json(Packages))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  Packages.findById(id)
    .then((Packages) => res.json(Packages))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.put("/:id",async (req, res) => {
  var data = req.body;
    try {
      let package = {
        ImgPath: data.PackageImageURL,
        PackageName: data.PackageName,
        PackagePrice: data.PackagePrice,
        PackageDescriprion: data.PackageDescriprion,
        PackagePeriod:data.PackagePeriod
      };
      let id = req.params.id;
      await Packages.findByIdAndUpdate({ _id: id }, package);
      res.json(package);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }

});

router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  Packages.findByIdAndDelete(id)
    .then((Packages) => res.json(Packages))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
