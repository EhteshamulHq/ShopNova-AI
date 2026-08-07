const asyncHandler =
require("../utils/asyncHandler");

const reportService =
require("../services/reportService");

const getSalesReport =
asyncHandler(async (req, res) => {

  const data =
    await reportService.getSalesReport();

  res.json({
    success: true,
    data,
  });

});

const getUserReport =
asyncHandler(async (req, res) => {

  const data =
    await reportService.getUserReport();

  res.json({
    success: true,
    data,
  });

});

module.exports = {
  getSalesReport,
  getUserReport,
};