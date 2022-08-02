const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  speciality: String,
  email: String,
  phoneNumber: String,
  password: String,
  registrationNo: Number,
  registrationYear: Number,
  location: String,
  qualification: String,
  college: String,
  passingYear: Date,
  imageUrl: String,
  appointments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
  campaign: [
    {
      type: Schema.Types.ObjectId,
      ref: "Campaign",
    },
  ],
  treatmentHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: "TreatmentHistory",
    },
  ],
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
