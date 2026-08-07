/**
 * ===========================================================
 * Address Controller
 * ===========================================================
 */

const asyncHandler = require("../utils/asyncHandler");
const addressService = require("../services/addressService");

/**
 * ===========================================================
 * Add Address
 * POST /api/address
 * ===========================================================
 */
const addAddress = asyncHandler(async (req, res) => {
  const address = await addressService.addAddress(
    req.user._id,
    req.body
  );

  return res.status(201).json({
    success: true,
    message: "Address added successfully.",
    data: address,
  });
});

/**
 * ===========================================================
 * Get All Addresses
 * GET /api/address
 * ===========================================================
 */
const getAddresses = asyncHandler(async (req, res) => {
  const addresses = await addressService.getAddresses(req.user._id);

  return res.status(200).json({
    success: true,
    data: addresses,
  });
});

/**
 * ===========================================================
 * Get Address By ID
 * GET /api/address/:id
 * ===========================================================
 */
const getAddressById = asyncHandler(async (req, res) => {
  const address = await addressService.getAddressById(
    req.user._id,
    req.params.id
  );

  return res.status(200).json({
    success: true,
    data: address,
  });
});

/**
 * ===========================================================
 * Update Address
 * PUT /api/address/:id
 * ===========================================================
 */
const updateAddress = asyncHandler(async (req, res) => {
  const address = await addressService.updateAddress(
    req.user._id,
    req.params.id,
    req.body
  );

  return res.status(200).json({
    success: true,
    message: "Address updated successfully.",
    data: address,
  });
});

/**
 * ===========================================================
 * Delete Address
 * DELETE /api/address/:id
 * ===========================================================
 */
const deleteAddress = asyncHandler(async (req, res) => {
  await addressService.deleteAddress(
    req.user._id,
    req.params.id
  );

  return res.status(200).json({
    success: true,
    message: "Address deleted successfully.",
  });
});

/**
 * ===========================================================
 * Set Default Address
 * PATCH /api/address/default/:id
 * ===========================================================
 */
const setDefaultAddress = asyncHandler(async (req, res) => {
  const address = await addressService.setDefaultAddress(
    req.user._id,
    req.params.id
  );

  return res.status(200).json({
    success: true,
    message: "Default address updated successfully.",
    data: address,
  });
});

module.exports = {
  addAddress,
  getAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};