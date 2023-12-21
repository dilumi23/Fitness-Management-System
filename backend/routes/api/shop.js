const express = require("express");
const fileUpload = require("express-fileupload");
const router = require("express").Router();
let Item = require("../../models/ShopItem");

//For Image Uploading
const path = require("path"); //for seting path
const dirPath = path.join(
  __dirname,
  "../../../frontend/fitness-club/public/uploads/shop"
); //for seting path

const app = express();
const cors = require("cors");
router.use(cors());

app.use(fileUpload()); //for image uploading

// @route         GET /shop
// @description   get Shop Items
// @access        Private
router.get("/", async (req, res) => {
  Item.find()
    .then((items) => {
      res.json(items);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//@route  GET api/shop/:id
//@desc   Get one Item from the database
//@access Private

router.get("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json("Error: " + err));
});

//@route  POST api/shop/additems
//@desc   Add Items into the database
//@access Private
//to protect auth add as the second parameter

router.post("/additems", async (req, res) => {
  const ItemName = req.body.ItemName;
  const ItemPrice = req.body.ItemPrice;
  const ItemDescriprion = req.body.ItemDescriprion;
  const ItemImage = req.body.ItemImage;

  const newItem = new Item({
    ItemName,
    ItemPrice,
    ItemDescriprion,
    ItemImage,
  });

  //Save Data into the mongo database

  newItem
    .save()
    .then(() => res.json("Item Added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

//@route  DELETE api/shop/remove
//@desc  Delete Item
//@access Private


router.delete("/removeItem/:id", async (req, res) => {
  try {
    //GET remove index
    Item.findByIdAndDelete(req.params.id)
      .then(() => {
        res.json("Item Deleted");
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route  Update api/shop/update
//@desc  update Item
//@access Private


router.post("/updateItem/:id", async (req, res) => {
  try {
    //if there is no image
    if (req.body.ItemImage == null) {
      Item.findById(req.params.id)
        .then((item) => {
          item.ItemName = req.body.ItemName;
          item.ItemPrice = req.body.ItemPrice;
          item.ItemDescriprion = req.body.ItemDescriprion;

          item
            .save()
            .then(() => res.json("Item updated!"))
            .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
    }
    //if there is a image
    else {
      Item.findOneAndUpdate(req.params.id)
        .then((item) => {
          item.ItemName = req.body.ItemName;
          item.ItemPrice = req.body.ItemPrice;
          item.ItemDescriprion = req.body.ItemDescriprion;
          item.ItemImage = req.body.ItemImage;

          item
            .save()
            .then(() => res.json("Item updated!"))
            .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
