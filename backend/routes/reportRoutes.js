const express = require("express");

const router = express.Router();

const reportController =
require("../controllers/reportController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

router.get(
  "/sales",
  protect,
  authorize("admin"),
  reportController.getSalesReport
);

router.get(
  "/users",
  protect,
  authorize("admin"),
  reportController.getUserReport
);

module.exports = router;