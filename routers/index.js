const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Endpoint : Login & Register
router.post("/register", authController.register);
router.post("/login");

module.exports = router;
