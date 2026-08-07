/**
 * ===========================================================
 * Product Routes
 * ===========================================================
 */

const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");
const upload = require("../middleware/upload");
const validateRequest = require("../middleware/validateRequest");

const {
  createProductValidator,
  updateProductValidator,
} = require("../validators/productValidator");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

/**
 * ===========================================================
 * Public Routes
 * ===========================================================
 */

// Get all products
router.get("/", productController.getProducts);

// Get product by slug
router.get("/slug/:slug", productController.getProductBySlug);

// Get product by ID
router.get("/:id", productController.getProductById);

/**
 * ===========================================================
 * Admin Routes
 * ===========================================================
 */

// Create Product
router.post(
  "/",
  protect,
  authorize("admin"),
  upload.array("images", 10),
  createProductValidator,
  validateRequest,
  productController.createProduct
);

// Update Product
router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateProductValidator,
  validateRequest,
  productController.updateProduct
);

// Delete Product
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  productController.deleteProduct
);

module.exports = router;