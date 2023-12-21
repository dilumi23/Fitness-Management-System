const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema(
  {
    userProfile: {
      type: String,
      //required: true,
    },
    OrderID: {
      type: String,
      //required: true,
    },
    items: {
      type: String,
      //required: true,
    },
    amount: {
      type: String,
      //required: true,
    },
    firstName: {
      type: String,
      //required: true,
    },
    lastName: {
      type: String,
      //required: true,
    },
    email: {
      type: String,
      //required: true,
    },
    phone: {
      type: String,
      //required: true,
    },
    address: {
      type: String,
      //required: true,
    },
    paymentStatus: {
      type: String,
      //required: true,
    },
  },
  {
    timestamps: true, //it will automatically create fields when it wasa created or modified
  }
);

const Payment = mongoose.model("Payment", PaymentSchema);
module.exports = Payment;
