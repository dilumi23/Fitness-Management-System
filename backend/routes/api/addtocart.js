const express = require("express");
const cors = require("cors");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Cart = require("../../models/Cart");
const User = require("../../models/User");
const { json } = require("express");

router.use(cors());

//active cart for user

router.post("/", auth, async (req, res) => {
  const { activated } = req.body;

  //build profile object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (activated) profileFields.activated = activated;

  try {
    let cart = await Cart.findOne({ user: req.user.id });

    if (cart) {
      //UPDATE
      cart = await Cart.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );

      return res.json(cart);
    }

    //Create
    cart = new Cart(profileFields);

    await cart.save();
    res.json(cart); //return the profile
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route  PUT  api/cart/addtocart
//@desc  Add items to cart list
//@access private


router.put("/addtocart", auth, async (req, res) => {
  const { ItemName, ItemPrice, ItemImage, quantity } = req.body;

  const newCartList = {
    ItemName,
    ItemPrice,
    ItemImage,
    quantity,
  };

  try {
    const cart = await Cart.findOne({ user: req.user.id });

    cart.cartList.unshift(newCartList);

    await cart.save();

    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route  GET api/cart/me
//@desc   Get current users cart
//@access Private
//to protect auth add as the second parameter
router.get("/me", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({
      user: req.user.id,
    }).populate("user", ["firstName", "lastName"]);

    if (!cart) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route  DELETE  api/profile/dailyexerciselist/:dailyexercise_id
//@desc  Add profile completed Workout
//@access private


router.delete("/cartlist/:itemid", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    //GET remove index

    const removeIndex = cart.cartList
      .map((item) => item.id)
      .indexOf(req.params.itemid);

    cart.cartList.splice(removeIndex, 1);

    await cart.save();

    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


//@route  DELETE /api/cart/:deleteid
//@desc  Delete Meal
//@access Private


router.delete("/:deleteid", async (req, res) => {
  try {
    //GET remove index
    Cart.findByIdAndDelete(req.params.deleteid)
      .then(() => {
        res.json("Cart Deleted");
      })
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
