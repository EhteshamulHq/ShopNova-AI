/**
 * ===========================================================
 * Analytics Service
 * ===========================================================
 */

const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");
const Category = require("../models/Category");
const Brand = require("../models/Brand");


/**
 * ===========================================================
 * Sales Analytics
 * ===========================================================
 */

const getSalesAnalytics = async () => {

  const sales = await Order.aggregate([

    {
      $match: {
        paymentStatus: "Paid",
      },
    },

    {
      $group: {

        _id: {
          year: {
            $year: "$createdAt",
          },
          month: {
            $month: "$createdAt",
          },
        },

        totalOrders: {
          $sum: 1,
        },

        totalRevenue: {
          $sum: "$totalAmount",
        },

      },
    },

    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },

  ]);

  return sales;

};

/**
 * ===========================================================
 * Revenue Analytics
 * ===========================================================
 */

const getRevenueAnalytics = async () => {

  const revenue = await Order.aggregate([

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
        averageOrderValue: {
          $avg: "$totalAmount",
        },
      },
    },

  ]);

  return revenue[0] || {
    totalRevenue: 0,
    averageOrderValue: 0,
  };

};

/**
 * ===========================================================
 * User Analytics
 * ===========================================================
 */

const getUserAnalytics = async () => {

  const totalUsers = await User.countDocuments();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const newUsersToday = await User.countDocuments({
    createdAt: {
      $gte: today,
    },
  });

  const firstDayOfMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );

  const newUsersThisMonth = await User.countDocuments({
    createdAt: {
      $gte: firstDayOfMonth,
    },
  });

  return {
    totalUsers,
    newUsersToday,
    newUsersThisMonth,
  };

};

/**
 * ===========================================================
 * Product Analytics
 * ===========================================================
 */

const getProductAnalytics = async () => {

  const totalProducts = await Product.countDocuments();

  const activeProducts = await Product.countDocuments({
    isActive: true,
  });

  const outOfStockProducts = await Product.countDocuments({
    stock: 0,
  });

  const lowStockProducts = await Product.countDocuments({
    stock: {
      $gt: 0,
      $lte: 10,
    },
  });

  const featuredProducts = await Product.countDocuments({
    isFeatured: true,
  });

  return {
    totalProducts,
    activeProducts,
    outOfStockProducts,
    lowStockProducts,
    featuredProducts,
  };

};

/**
 * ===========================================================
 * Category Analytics
 * ===========================================================
 */

const getCategoryAnalytics = async () => {

  const totalCategories = await Category.countDocuments();

  const activeCategories = await Category.countDocuments({
    isActive: true,
  });

  const categoryWiseProducts = await Product.aggregate([
    {
      $group: {
        _id: "$category",
        totalProducts: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        totalProducts: -1,
      },
    },
  ]);

  return {
    totalCategories,
    activeCategories,
    categoryWiseProducts,
  };

};

/**
 * ===========================================================
 * Brand Analytics
 * ===========================================================
 */

const getBrandAnalytics = async () => {

  const totalBrands = await Brand.countDocuments();

  const activeBrands = await Brand.countDocuments({
    isActive: true,
  });

  const brandWiseProducts = await Product.aggregate([
    {
      $group: {
        _id: "$brand",
        totalProducts: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        totalProducts: -1,
      },
    },
  ]);

  return {
    totalBrands,
    activeBrands,
    brandWiseProducts,
  };

};

/**
 * ===========================================================
 * Order Analytics
 * ===========================================================
 */

const getOrderAnalytics = async () => {

  const totalOrders = await Order.countDocuments();

  const pendingOrders = await Order.countDocuments({
    orderStatus: "Pending",
  });

  const processingOrders = await Order.countDocuments({
    orderStatus: "Processing",
  });

  const shippedOrders = await Order.countDocuments({
    orderStatus: "Shipped",
  });

  const deliveredOrders = await Order.countDocuments({
    orderStatus: "Delivered",
  });

  const cancelledOrders = await Order.countDocuments({
    orderStatus: "Cancelled",
  });

  return {
    totalOrders,
    pendingOrders,
    processingOrders,
    shippedOrders,
    deliveredOrders,
    cancelledOrders,
  };

};

/**
 * ===========================================================
 * Date Range Analytics
 * ===========================================================
 */

const getDateRangeAnalytics = async (startDate, endDate) => {

  const analytics = await Order.aggregate([

    {
      $match: {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
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

  return analytics[0] || {
    totalOrders: 0,
    totalRevenue: 0,
  };

};

/**
 * ===========================================================
 * Dashboard Charts API
 * ===========================================================
 */

const getDashboardCharts = async () => {

  const monthlyRevenue = await Order.aggregate([
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
        revenue: {
          $sum: "$totalAmount",
        },
        orders: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        "_id.month": 1,
      },
    },
  ]);

  const orderStatus = await Order.aggregate([
    {
      $group: {
        _id: "$orderStatus",
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  const paymentStatus = await Order.aggregate([
    {
      $group: {
        _id: "$paymentStatus",
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  return {
    monthlyRevenue,
    orderStatus,
    paymentStatus,
  };

};

/**
 * ===========================================================
 * Export Analytics
 * ===========================================================
 */

const exportAnalytics = async () => {

  const orders = await Order.find()
    .populate("user", "name email")
    .sort({
      createdAt: -1,
    });

  return orders;

};

module.exports = {
  getSalesAnalytics,
  getRevenueAnalytics,
  getUserAnalytics,
  getProductAnalytics,
  getCategoryAnalytics,
  getBrandAnalytics,
  getOrderAnalytics,
  getDateRangeAnalytics,
    getDashboardCharts,
};