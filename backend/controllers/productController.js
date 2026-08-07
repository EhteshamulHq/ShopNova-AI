/**
 * ===========================================================
 * Product Controller
 * ===========================================================
 */

const asyncHandler = require("../utils/asyncHandler");

const productService = require("../services/productService");

/**
 * ===========================================================
 * Create Product
 * POST /api/products
 * ===========================================================
 */

const createProduct = asyncHandler(async (req, res) => {
  const product =
await productService.createProduct(
    req.body,
    req.files
);

  return res.status(201).json({
    success: true,
    message: "Product created successfully.",
    data: product,
  });
});

/**
 * ===========================================================
 * Update Product
 * PUT /api/products/:id
 * ===========================================================
 */

const updateProduct = asyncHandler(async (req, res) => {
  const product = await productService.updateProduct(
    req.params.id,
    req.body,
    req.files
  );

  return res.status(200).json({
    success: true,
    message: "Product updated successfully.",
    data: product,
  });
});

/**
 * ===========================================================
 * Delete Product
 * DELETE /api/products/:id
 * ===========================================================
 */

const deleteProduct = asyncHandler(async (req, res) => {
  await productService.deleteProduct(req.params.id);

  return res.status(200).json({
    success: true,
    message: "Product deleted successfully.",
  });
});

/**
 * ===========================================================
 * Get Product By ID
 * GET /api/products/:id
 * ===========================================================
 */

const getProductById = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);

  return res.status(200).json({
    success: true,
    data: product,
  });
});

/**
 * ===========================================================
 * Get Product By Slug
 * GET /api/products/slug/:slug
 * ===========================================================
 */

const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await productService.getProductBySlug(
    req.params.slug
  );

  return res.status(200).json({
    success: true,
    data: product,
  });
});

/**
 * ===========================================================
 * Get All Products
 * GET /api/products
 * ===========================================================
 */

const getProducts = asyncHandler(async (req, res) => {
  const result = await productService.getProducts(req.query);

  return res.status(200).json({
    success: true,
    ...result,
  });
});

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProductBySlug,
  getProducts,
};