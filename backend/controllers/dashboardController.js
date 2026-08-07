/**
 * ===========================================================
 * Dashboard Controller
 * ===========================================================
 */

const asyncHandler = require("../utils/asyncHandler");

const dashboardService = require("../services/dashboardService");

/**
 * ===========================================================
 * Dashboard Stats
 * ===========================================================
 */

const getDashboardStats = asyncHandler(async (req, res) => {

  const stats =
    await dashboardService.getDashboardStats();

  return res.status(200).json({
    success: true,
    data: stats,
  });

});

module.exports = {
  getDashboardStats,
};