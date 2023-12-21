const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  activated: {
    type: String,
  },
  cartList: [
    {
      ItemName: {
        type: String,
      },
      ItemPrice: {
        type: String,
      },

      ItemImage: {
        type: String,
      },
      quantity: {
        type: String,
      },
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
