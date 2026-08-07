/**
 * ===========================================================
 * Global Search Service
 * ===========================================================
 */

const Product = require("../models/Product");
const Category = require("../models/Category");
const Brand = require("../models/Brand");
const User = require("../models/User");
const Order = require("../models/Order");

const globalSearch = async (keyword) => {

  const regex = new RegExp(keyword, "i");

  const [
    products,
    categories,
    brands,
    users,
    orders,
  ] = await Promise.all([

    Product.find({ name: regex }).limit(10),

    Category.find({ name: regex }).limit(10),

    Brand.find({ name: regex }).limit(10),

    User.find({
      $or: [
        { name: regex },
        { email: regex },
      ],
    }).limit(10),

    Order.find({
      orderNumber: regex,
    }).limit(10),

  ]);

  return {
    products,
    categories,
    brands,
    users,
    orders,
  };

};

module.exports = {
  globalSearch,
};