const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: mongoose.Types.ObjectId,
  name: String,
  email: String,
  password: String,
  phoneNumber: Number,
  gender: String,
  dateOfBirth: Date,
  height: Number,
  weight: Number,
  location: String,
  haveAllergies: Boolean,
  allergies: [String],
  takesMedication: Boolean,
  nameOfMedication: String,
  hadInjuries: String,
  hadChronicIllnesses: String,
  hadHospitalized: String,
  hadSurgeries: String,
  surgery: String,
  familyHealth: String,
  occupation: String,
  workout: String,
  appointments: {
    type: Schema.Types.ObjectId,
    ref: "Appointment",
  },
  orders: {
    type: Schema.Types.ObjectId,
    ref: "Order",
  },
  joinedCampaigns: {
    type: Schema.Types.ObjectId,
    ref: "Campaign",
  },
  purchasedPackages: {
    type: Schema.Types.ObjectId,
    ref: "Package",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
