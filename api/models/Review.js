const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  rating: Number,
  content: String,
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
