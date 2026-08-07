const express = require("express");

const router = express.Router();

const searchController =
require("../controllers/searchController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

router.get(
  "/",
  protect,
  authorize("admin"),
  searchController.globalSearch
);

module.exports = router;