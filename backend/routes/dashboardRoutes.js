/**
 * ===========================================================
 * Dashboard Routes
 * ===========================================================
 */

const express = require("express");

const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

router.get(
  "/",
  protect,
  authorize("admin"),
  dashboardController.getDashboardStats
);

module.exports = router;