const express = require("express");
const DoctorControllers = require("../controllers/DoctorControllers");
const router = express.Router();

router.get("/doctors", DoctorControllers.view_all_doctors);
router.get("/doctors/filter/", DoctorControllers.view_all_filtered_doctors);
router.get("/doctors/:doctorId", DoctorControllers.view_doctor_by_id);
router.post("/doctors/create", DoctorControllers.create_doctor_account);
router.get(
  "doctors/:doctorId/appointments",
  DoctorControllers.view_saved_appointments
);
router.get(
  "doctors/:doctorId/appointments/:appointmentId",
  DoctorControllers.view_appointments_by_id
);
router.get("doctors/:doctorId/campaigns", DoctorControllers.get_all_campaigns);
router.get(
  "doctors/:doctorId/campaigns/:campaignId",
  DoctorControllers.get_campaign_by_id
);
module.exports = router;
