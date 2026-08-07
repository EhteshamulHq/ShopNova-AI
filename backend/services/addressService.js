/**
 * ===========================================================
 * Address Service
 * ===========================================================
 */

const Address = require("../models/Address");
const AppError = require("../utils/AppError");

/**
 * ===========================================================
 * Add Address
 * ===========================================================
 */

const addAddress = async (userId, data) => {
  const count = await Address.countDocuments({ user: userId });

  // First address becomes default automatically
  if (count === 0) {
    data.isDefault = true;
  }

  // If user explicitly sets this as default
  if (data.isDefault) {
    await Address.updateMany(
      { user: userId },
      { $set: { isDefault: false } }
    );
  }

  const address = await Address.create({
    ...data,
    user: userId,
  });

  return address;
};

/**
 * ===========================================================
 * Get All Addresses
 * ===========================================================
 */

const getAddresses = async (userId) => {
  return await Address.find({ user: userId }).sort({
    isDefault: -1,
    createdAt: -1,
  });
};

/**
 * ===========================================================
 * Get Address By ID
 * ===========================================================
 */

const getAddressById = async (userId, addressId) => {
  const address = await Address.findOne({
    _id: addressId,
    user: userId,
  });

  if (!address) {
    throw new AppError("Address not found.", 404);
  }

  return address;
};

/**
 * ===========================================================
 * Update Address
 * ===========================================================
 */

const updateAddress = async (userId, addressId, data) => {
  const address = await Address.findOne({
    _id: addressId,
    user: userId,
  });

  if (!address) {
    throw new AppError("Address not found.", 404);
  }

  if (data.isDefault) {
    await Address.updateMany(
      { user: userId },
      { $set: { isDefault: false } }
    );
  }

  Object.assign(address, data);

  await address.save();

  return address;
};

/**
 * ===========================================================
 * Delete Address
 * ===========================================================
 */

const deleteAddress = async (userId, addressId) => {
  const address = await Address.findOne({
    _id: addressId,
    user: userId,
  });

  if (!address) {
    throw new AppError("Address not found.", 404);
  }

  const wasDefault = address.isDefault;

  await address.deleteOne();

  // If deleted address was default, make another one default
  if (wasDefault) {
    const nextAddress = await Address.findOne({
      user: userId,
    }).sort({ createdAt: 1 });

    if (nextAddress) {
      nextAddress.isDefault = true;
      await nextAddress.save();
    }
  }
};

/**
 * ===========================================================
 * Set Default Address
 * ===========================================================
 */

const setDefaultAddress = async (userId, addressId) => {
  const address = await Address.findOne({
    _id: addressId,
    user: userId,
  });

  if (!address) {
    throw new AppError("Address not found.", 404);
  }

  await Address.updateMany(
    { user: userId },
    { $set: { isDefault: false } }
  );

  address.isDefault = true;

  await address.save();

  return address;
};

module.exports = {
  addAddress,
  getAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};