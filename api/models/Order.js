const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  _id: Schema.Types.ObjectId,
  address: {
    type: Schema.Types.ObjectId,
    ref: "Address",
  },
  quantity: Number,
  totalPrice: Number,
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
