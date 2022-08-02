const express = require("express");
const AppointmentControllers = require("../controllers/AppointmentControllers");
const router = express.Router();

router.post("/appointments", AppointmentControllers.store_appointment_details);
router.post(
  "/user/:userId/appointments",
  AppointmentControllers.store_appointment_details_user
);
router.post(
  "/doctor/:doctorId/appointments",
  AppointmentControllers.store_appointment_details_user
);

module.exports = router;
