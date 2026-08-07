/**
 * ===========================================================
 * Analytics Controller
 * ===========================================================
 */

const asyncHandler = require("../utils/asyncHandler");

const analyticsService = require("../services/analyticsService");

/**
 * ===========================================================
 * Sales Analytics
 * ===========================================================
 */

const getSalesAnalytics = asyncHandler(async (req, res) => {

  const data =
    await analyticsService.getSalesAnalytics();

  return res.status(200).json({

    success: true,

    data,

  });

});

/**
 * ===========================================================
 * Revenue Analytics
 * ===========================================================
 */

const getRevenueAnalytics = asyncHandler(async (req, res) => {

  const data =
    await analyticsService.getRevenueAnalytics();

  res.status(200).json({
    success: true,
    data,
  });

});

/**
 * ===========================================================
 * User Analytics
 * ===========================================================
 */

const getUserAnalytics = asyncHandler(async (req, res) => {

  const data =
    await analyticsService.getUserAnalytics();

  res.status(200).json({
    success: true,
    data,
  });

});

/**
 * ===========================================================
 * Product Analytics
 * ===========================================================
 */

const getProductAnalytics = asyncHandler(async (req, res) => {

  const data =
    await analyticsService.getProductAnalytics();

  res.status(200).json({
    success: true,
    data,
  });

});

/**
 * ===========================================================
 * Category Analytics
 * ===========================================================
 */

const getCategoryAnalytics = asyncHandler(async (req, res) => {

  const data =
    await analyticsService.getCategoryAnalytics();

  res.status(200).json({
    success: true,
    data,
  });

});

/**
 * ===========================================================
 * Brand Analytics
 * ===========================================================
 */

const getBrandAnalytics = asyncHandler(async (req, res) => {

  const data =
    await analyticsService.getBrandAnalytics();

  res.status(200).json({
    success: true,
    data,
  });

});

/**
 * ===========================================================
 * Order Analytics
 * ===========================================================
 */

const getOrderAnalytics = asyncHandler(async (req, res) => {

  const data =
    await analyticsService.getOrderAnalytics();

  res.status(200).json({
    success: true,
    data,
  });

});

/**
 * ===========================================================
 * Date Range Analytics
 * ===========================================================
 */

const getDateRangeAnalytics = asyncHandler(async (req, res) => {

  const { startDate, endDate } = req.query;

  const data =
    await analyticsService.getDateRangeAnalytics(
      startDate,
      endDate
    );

  res.status(200).json({
    success: true,
    data,
  });

});

/**
 * ===========================================================
 * Dashboard Charts
 * ===========================================================
 */

const getDashboardCharts = asyncHandler(async (req, res) => {

  const data =
    await analyticsService.getDashboardCharts();

  res.status(200).json({
    success: true,
    data,
  });

});

/**
 * ===========================================================
 * Export Analytics
 * ===========================================================
 */

const exportAnalytics = asyncHandler(async (req, res) => {

  const data =
    await analyticsService.exportAnalytics();

  res.status(200).json({
    success: true,
    data,
  });

});

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
  exportAnalytics,
};