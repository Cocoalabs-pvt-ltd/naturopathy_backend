const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  imageUrl: String,
  price: String,
  rating: Number,
  description: String,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
