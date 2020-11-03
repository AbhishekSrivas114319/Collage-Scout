const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shopId: {
    type: ObjectID,
    require: true,
  },
  consumerId: {
    type: String,
    require: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isaccepted: {
    type: Boolean,
    required: true,
    default: false,
  },
  isComplete: {
    type: Boolean,
    required: true,
    default: false,
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: { type: Date, expires: "1d", default: Date.now },
});

module.exports = mongoose.model("otp", otpSchema);
