/**
 * ===========================================================
 * Dashboard Service
 * ===========================================================
 */

const User = require("../models/User");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Brand = require("../models/Brand");
const Order = require("../models/Order");
const mongoose = require("mongoose");

/**
 * ===========================================================
 * Get Dashboard Stats
 * ===========================================================
 */

const getDashboardStats = async () => {

  const [
    totalUsers,
    totalProducts,
    totalCategories,
    totalBrands,
    totalOrders,
    pendingOrders,
deliveredOrders,
revenue,
  ] = await Promise.all([

    User.countDocuments(),

    Product.countDocuments(),

    Category.countDocuments(),

    Brand.countDocuments(),

    Order.countDocuments(),

    Order.countDocuments({
  orderStatus: "Pending",
}),

Order.countDocuments({
  orderStatus: "Delivered",
}),

Order.aggregate([
  {
    $match: {
      paymentStatus: "Paid",
    },
  },
  {
    $group: {
      _id: null,
      totalRevenue: {
        $sum: "$totalAmount",
      },
    },
  },
]),

  ]);

  return {

    totalUsers,

    totalProducts,

    totalCategories,

    totalBrands,

    totalOrders,
    pendingOrders,
    deliveredOrders,
    recentOrders,
    monthlySales,
    topProducts,

totalRevenue:
  revenue.length > 0
    ? revenue[0].totalRevenue
    : 0,
    

  };

  const topProducts =
  await Order.aggregate([
    {
      $unwind: "$items",
    },
    {
      $group: {
        _id: "$items.product",
        sold: {
          $sum: "$items.quantity",
        },
      },
    },
    {
      $sort: {
        sold: -1,
      },
    },
    {
      $limit: 5,
    },
  ]);


  const monthlySales =
  await Order.aggregate([
    {
      $match: {
        paymentStatus: "Paid",
      },
    },
    {
      $group: {
        _id: {
          month: {
            $month: "$createdAt",
          },
        },
        totalSales: {
          $sum: "$totalAmount",
        },
      },
    },
    {
      $sort: {
        "_id.month": 1,
      },
    },
  ]);

  const recentOrders = await Order.find()
  .sort({
    createdAt: -1,
  })
  .limit(5)
  .populate("user", "name email");

};

module.exports = {
  getDashboardStats,
};