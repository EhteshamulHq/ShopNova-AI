/**
 * ===========================================================
 * Address Routes
 * ===========================================================
 */

const express = require("express");

const router = express.Router();

const addressController = require("../controllers/addressController");

const {
  addAddressValidator,
  updateAddressValidator,
  addressIdValidator,
} = require("../validators/addressValidator");

const validateRequest = require("../middleware/validateRequest");

const {
  protect,
} = require("../middleware/authMiddleware");

/**
 * ===========================================================
 * Address Routes
 * ===========================================================
 */

// Add Address
router.post(
  "/",
  protect,
  addAddressValidator,
  validateRequest,
  addressController.addAddress
);

// Get All Addresses
router.get(
  "/",
  protect,
  addressController.getAddresses
);

// Get Address By ID
router.get(
  "/:id",
  protect,
  addressIdValidator,
  validateRequest,
  addressController.getAddressById
);

// Update Address
router.put(
  "/:id",
  protect,
  updateAddressValidator,
  validateRequest,
  addressController.updateAddress
);

// Delete Address
router.delete(
  "/:id",
  protect,
  addressIdValidator,
  validateRequest,
  addressController.deleteAddress
);

// Set Default Address
router.patch(
  "/default/:id",
  protect,
  addressIdValidator,
  validateRequest,
  addressController.setDefaultAddress
);

module.exports = router;