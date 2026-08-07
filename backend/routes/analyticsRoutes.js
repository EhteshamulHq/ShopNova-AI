/**
 * ===========================================================
 * Analytics Routes
 * ===========================================================
 */

const express = require("express");

const router = express.Router();

const analyticsController = require("../controllers/analyticsController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

router.get(
  "/sales",
  protect,
  authorize("admin"),
  analyticsController.getSalesAnalytics
);

router.get(
  "/revenue",
  protect,
  authorize("admin"),
  analyticsController.getRevenueAnalytics
);

router.get(
  "/users",
  protect,
  authorize("admin"),
  analyticsController.getUserAnalytics
);

router.get(
  "/products",
  protect,
  authorize("admin"),
  analyticsController.getProductAnalytics
);

router.get(
  "/categories",
  protect,
  authorize("admin"),
  analyticsController.getCategoryAnalytics
);

router.get(
  "/brands",
  protect,
  authorize("admin"),
  analyticsController.getBrandAnalytics
);

router.get(
  "/orders",
  protect,
  authorize("admin"),
  analyticsController.getOrderAnalytics
);

router.get(
  "/date-range",
  protect,
  authorize("admin"),
  analyticsController.getDateRangeAnalytics
);

router.get(
  "/dashboard",
  protect,
  authorize("admin"),
  analyticsController.getDashboardCharts
);

router.get(
  "/export",
  protect,
  authorize("admin"),
  analyticsController.exportAnalytics
);

module.exports = router;