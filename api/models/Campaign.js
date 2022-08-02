const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const campaignSchema = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  content: String,
  description: String,
  joinedPeople: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = Campaign;
