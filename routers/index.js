const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const bookingController = require("../controllers/bookingController");
const { authentication } = require("../middlewares/authHandler");

// Endpoint : Login & Register
router.post("/register", authController.register);
router.post("/login", authController.login);

// Endpoint : Booking Hotel Room
router.use(authentication);
router.post("/booking/:room_id", bookingController.order);
router.put("/cancelBooking/:order_id", bookingController.cancelOrder);

module.exports = router;
