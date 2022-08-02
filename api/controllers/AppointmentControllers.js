const mongoose = require("mongoose");
const Appointment = require("../models/Appointment");
const User = require("../models/User");
const Doctor = require("../models/Doctor");
// Function to store appointment details on User's doc

const store_appointment_details = (req, res, next) => {
  const userId = req.params.userId;
  const doctorId = req.params.doctorId;
  const appointmentDate = req.body.appointmentDate;
  const appointmentTime = req.body.appointmentTime;
  const modeOfAppointment = req.body.modeOfAppointment;

  const appointment = new Appointment({
    _id: mongoose.Types.ObjectId,
    doctorId: doctorId,
    userId: userId,
    appointmentDate: appointmentDate,
    appointmentTime: appointmentTime,
    modeOfAppointment: modeOfAppointment,
  });

  appointment
    .save()
    .then((appointment) => {
      res.status(200).json({
        message: "Appointment created",
        appointment: appointment,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

// Function to store the appointment details on user's doc

const store_appointment_details_user = (req, res, body) => {
  const userId = req.params.userId;
  const appointmentId = req.params.appointmentId;

  User.findByIdAndUpdate(userId)
    .then((user) => {
      const userAppointment = user.appointments[0].push(appointmentId);

      userAppointment
        .save()
        .then((appointment) => {
          res.status(201).json({
            message: "Appointment saved",
            result: appointment,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ error: err });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

// Function to store the appointment details on doctor's doc

const store_appointment_details_doctor = (req, res, next) => {
  const doctorId = req.params.doctorId;
  const appointmentId = req.params.appointmentId;

  Doctor.findById(doctorId)
    .then((doctor) => {
      const newAppointment = doctor.appointments[0].push(appointmentId);

      newAppointment
        .save()
        .then((appointment) => {
          res.status(201).json({
            message: "Appointment saved",
            result: appointment,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            error: err,
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

module.exports = {
  store_appointment_details,
  store_appointment_details_doctor,
  store_appointment_details_user,
};
