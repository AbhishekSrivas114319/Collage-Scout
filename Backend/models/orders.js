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
  itemId:{
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
  orderStatus: {
    type: String,
    required: true,
    default:"pending",
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: { type: Date, expires: "7d", default: Date.now },
},{timestamps: true});

module.exports = mongoose.model("orders", orderSchema);
