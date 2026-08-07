const asyncHandler = require("../utils/asyncHandler");

const searchService = require("../services/searchService");

const globalSearch = asyncHandler(async (req, res) => {

  const { keyword } = req.query;

  const data =
    await searchService.globalSearch(keyword);

  res.json({
    success: true,
    data,
  });

});

module.exports = {
  globalSearch,
};