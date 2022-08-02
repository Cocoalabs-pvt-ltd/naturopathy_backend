const express = require("express");
const router = express.Router();
const CampaignControllers = require("../controllers/CampaignControllers");

router.post(
  "/doctors/:doctorId/create-campaign",
  CampaignControllers.create_campaign
);
router.post(
  "/doctors/:doctorId/campaigns/:campaignId",
  CampaignControllers.save_campaign_on_doctor_doc
);
