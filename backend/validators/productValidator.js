/**
 * ===========================================================
 * Product Validators
 * ===========================================================
 */

const { body } = require("express-validator");

/**
 * ===========================================================
 * Common Validators
 * ===========================================================
 */

const nameValidator = body("name")
  .trim()
  .notEmpty()
  .withMessage("Product name is required.")
  .isLength({ min: 3, max: 150 })
  .withMessage("Product name must be between 3 and 150 characters.");

const descriptionValidator = body("description")
  .trim()
  .notEmpty()
  .withMessage("Description is required.")
  .isLength({ min: 10, max: 5000 })
  .withMessage("Description must be between 10 and 5000 characters.");

const shortDescriptionValidator = body("shortDescription")
  .optional()
  .trim()
  .isLength({ max: 300 })
  .withMessage("Short description cannot exceed 300 characters.");

const skuValidator = body("sku")
  .trim()
  .notEmpty()
  .withMessage("SKU is required.")
  .isLength({ min: 3, max: 50 })
  .withMessage("SKU must be between 3 and 50 characters.");

const categoryValidator = body("category")
  .notEmpty()
  .withMessage("Category is required.")
  .isMongoId()
  .withMessage("Invalid category ID.");

const brandValidator = body("brand")
  .notEmpty()
  .withMessage("Brand is required.")
  .isMongoId()
  .withMessage("Invalid brand ID.");

const priceValidator = body("price")
  .notEmpty()
  .withMessage("Price is required.")
  .isFloat({ min: 0 })
  .withMessage("Price must be greater than or equal to 0.");

const discountPriceValidator = body("discountPrice")
  .optional()
  .isFloat({ min: 0 })
  .withMessage("Discount price must be greater than or equal to 0.");

const stockValidator = body("stock")
  .notEmpty()
  .withMessage("Stock is required.")
  .isInt({ min: 0 })
  .withMessage("Stock must be 0 or greater.");

const featuredValidator = body("featured")
  .optional()
  .isBoolean()
  .withMessage("Featured must be true or false.");

const statusValidator = body("status")
  .optional()
  .isIn(["draft", "active", "inactive"])
  .withMessage("Invalid product status.");



/**
 * ===========================================================
 * Create Product Validator
 * ===========================================================
 */

const createProductValidator = [
  nameValidator,
  descriptionValidator,
  shortDescriptionValidator,
  skuValidator,
  categoryValidator,
  brandValidator,
  priceValidator,
  discountPriceValidator,
  stockValidator,
  featuredValidator,
  statusValidator,
];

/**
 * ===========================================================
 * Update Product Validator
 * ===========================================================
 */

const updateProductValidator = [
  body("name").optional().trim().isLength({ min: 3, max: 150 }),
  body("description").optional().trim().isLength({ min: 10, max: 5000 }),
  body("shortDescription").optional().trim().isLength({ max: 300 }),
  body("sku").optional().trim().isLength({ min: 3, max: 50 }),
  body("category").optional().isMongoId(),
  body("brand").optional().isMongoId(),
  body("price").optional().isFloat({ min: 0 }),
  body("discountPrice").optional().isFloat({ min: 0 }),
  body("stock").optional().isInt({ min: 0 }),
  body("featured").optional().isBoolean(),
  body("status").optional().isIn(["draft", "active", "inactive"]),
  body("images").optional().isArray(),
];



module.exports = {
  createProductValidator,
  updateProductValidator,
};