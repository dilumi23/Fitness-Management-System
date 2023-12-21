const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Payment = require("../../models/Payment");

const app = express();
const cors = require("cors");
const { Router } = require("express");
router.use(cors());

// @route         GET /api/addpayment
// @description   get all orders
// @access        public
router.get("/", (req, res) => {
  Payment.find()
    .then((order) => {
      res.json(order);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// @route         GET /api/getItemPayments
// @description   get user payments according to item name
// @access        public
router.get("/getItemPayments", (req, res) => {
  Payment.find()
    .then((order) => {
      res.json(order);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//get details of a single instructor
router.post("/:id", (req, res) => {
  Payment.findOne({ OrderID: req.params.id })
    .then((order) => res.json(order))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/complete/:id", (req, res) => {
  Payment.findByIdAndUpdate(req.params.id)
    .then((payment) => {
      payment.paymentStatus = "completed";

      payment
        .save()
        .then(() => res.json("Payment Status updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// @route         POST /api/addpayment
// @description   add user payment
// @access        public
router.post("/", (req, res) => {
  const {
    userProfile,
    OrderID,
    items,
    amount,
    firstName,
    lastName,
    email,
    phone,
    address,
  } = req.body;

  const paymentStatus = "incompleted";

  const newAddPayment = new Payment({
    userProfile,
    OrderID,
    items,
    amount,
    firstName,
    lastName,
    email,
    phone,
    address,
    paymentStatus,
  });

  newAddPayment
    .save()
    .then(() => res.json("Add Payment Success"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
