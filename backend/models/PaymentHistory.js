const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PaymentHistorySchema = new Schema({
    status_code: {
    type: String,
  
  },
});

const PaymentHistory = mongoose.model("Paymenthistory", PaymentHistorySchema);
module.exports = PaymentHistory;
