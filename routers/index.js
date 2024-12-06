const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const bookingController = require("../controllers/bookingController");
const { authentication } = require("../middlewares/authHandler");

// Endpoint : Login & Register
router.post("/register", authController.register);
router.post("/login", authController.login);

// Endpoint : Booking Systems
router.use(authentication);
router.post("/booking/:room_id", bookingController.order);
router.put("/cancelBooking/:order_id", bookingController.cancelOrder);
router.put("/refund/:order_id", bookingController.refundOrder);

module.exports = router;
