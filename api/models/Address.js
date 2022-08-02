const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const addressSchema = new Schema({
  _id: Schema.Types.ObjectId,
  houseName: String,
  streetName: String,
  districtName: String,
  stateName: String,
  pincode: Number,
  phoneNumber: Number,
});

const Address = mongoose.model("Address", addressSchema);

export default Address;
