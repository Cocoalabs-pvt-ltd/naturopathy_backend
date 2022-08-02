const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  _id: Schema.Types.ObjectId,
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  appointmentDate: Date,
  appointmentTime: Date,
  modeOfAppointment: String,
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
