const express = require("express");
const OrderControllers = require("../controllers/OrderControllers");
const router = express.Router();

router.post("orders/:addressId", OrderControllers.create_orders);

module.exports = router;
