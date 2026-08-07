/**
 * ===========================================================
 * Report Service
 * ===========================================================
 */

const Order = require("../models/Order");
const User = require("../models/User");

const getSalesReport = async () => {

  const report = await Order.aggregate([
    {
      $match: {
        paymentStatus: "Paid",
      },
    },
    {
      $group: {
        _id: null,
        totalOrders: {
          $sum: 1,
        },
        totalRevenue: {
          $sum: "$totalAmount",
        },
      },
    },
  ]);

  return report[0] || {};
};

const getUserReport = async () => {

  return {
    totalUsers:
      await User.countDocuments(),
  };

};

module.exports = {
  getSalesReport,
  getUserReport,
};