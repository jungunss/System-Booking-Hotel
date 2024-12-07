const express = require("express");
const router = express.Router();
const { authentication } = require("../middlewares/authHandler");
const authController = require("../controllers/authController");
const bookingController = require("../controllers/bookingController");
const paymentController = require("../controllers/paymentController");
const errorHandlers = require("../middlewares/errorHandler");

// Endpoint : Login & Register
router.post("/register", authController.register);
router.post("/login", authController.login);

// Endpoint : Booking Systems
router.use(authentication);
router.post("/booking/:room_id", bookingController.createOrder);
router.put("/cancel-booking/:order_id", bookingController.cancelOrder);
router.put("/refund/:order_id", bookingController.refundOrder);

// Endpoint : Payment Systems
router.get("/orders", paymentController.orders);
router.post("/payment/:order_id", paymentController.midtransCreateTransaction);
router.put("/payment/:order_id/status", paymentController.updateOrderStatus);

// Error handler
router.use(errorHandlers);

module.exports = router;
