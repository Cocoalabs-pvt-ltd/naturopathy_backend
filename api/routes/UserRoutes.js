const express = require("express");
const UserControllers = require("../controllers/UserControllers");
const checkAuth = require("../middleware/check_auth");
const router = express.Router();

/**
 * 1) Route to view the user details
 * 2) Route to patch the user details
 * 3) Route to get all user appointment details
 * 4) Route to get the details of an appointment using id
 * 5) Route to get all orders
 * 6) Route to get the order details of one order using id
 * 7) Route to get all the joined campaign details
 * 8) Route to get the joined campaign details by id
 */

router.get("/user/:userId", checkAuth, UserControllers.get_user_details);
router.patch(
  "/user/:userId/details",
  checkAuth,
  UserControllers.store_user_details
);
router.get(
  "/user/:userId/appointments",
  UserControllers.get_all_user_appointment_details
);
router.get(
  "/user/:userId/appointments/:appointmentId",
  UserControllers.get_user_appointment_details
);
router.get("/user/:userId/orders", UserControllers.get_all_order_details);
router.get("/user/:userId/orders/:orderId", UserControllers.get_order_details);
router.get(
  "/user/:userId/joinedCampaigns",
  UserControllers.get_all_joined_campaigns
);
router.get(
  "/user/:userId/joinedCampaigns/:joinedCampaignId",
  UserControllers.get_joined_campaign_details
);

module.exports = router;
