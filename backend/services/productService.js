/**
 * ===========================================================
 * Product Service
 * ===========================================================
 * Responsibilities:
 * 1. Create Product
 * 2. Update Product
 * 3. Delete Product
 * 4. Get Product Details
 * 5. Product Listing with Search, Filter & Pagination
 * ===========================================================
 */

// ==========================================================
// Import Models
// ==========================================================
const Product = require("../models/Product");
const Category = require("../models/Category");
const Brand = require("../models/Brand");

// ==========================================================
// Import Packages
// ==========================================================
const slugify = require("slugify");

// ==========================================================
// Import Utilities
// ==========================================================
const AppError = require("../utils/AppError");
const { uploadImage } = require("../utils/cloudinaryUpload");

/**
 * ===========================================================
 * Create Product
 * ===========================================================
 */

const createProduct = async (productData, files = []) => {

  // ========================================================
  // Validate Category
  // ========================================================
  const category = await Category.findById(productData.category);

  if (!category) {
    throw new AppError("Category not found.", 404);
  }

  // ========================================================
  // Validate Brand
  // ========================================================
  const brand = await Brand.findById(productData.brand);

  if (!brand) {
    throw new AppError("Brand not found.", 404);
  }

  // ========================================================
  // Generate Slug
  // ========================================================
  productData.slug = slugify(productData.name, {
    lower: true,
    strict: true,
    trim: true,
  });

  // ========================================================
  // Check Duplicate Product Name
  // ========================================================
  const existingSlug = await Product.findOne({
    slug: productData.slug,
  });

  if (existingSlug) {
    throw new AppError(
      "Product already exists.",
      409
    );
  }

  // ========================================================
  // Check Duplicate SKU
  // ========================================================
  const existingSku = await Product.findOne({
    sku: productData.sku,
  });

  if (existingSku) {
    throw new AppError(
      "SKU already exists.",
      409
    );
  }

  // ========================================================
  // Upload Product Images
  // ========================================================
  const images = [];

  if (files.length > 0) {

    for (const file of files) {

      const uploaded = await uploadImage(
        file.buffer,
        "shopnova/products"
      );

      images.push({
        url: uploaded.secure_url,
        publicId: uploaded.public_id,
        alt: productData.name,
      });

    }

  }

  productData.images = images;

  // ========================================================
  // Create Product
  // ========================================================
  const product = await Product.create(productData);

  // ========================================================
  // Return Product with Populated References
  // ========================================================
  return await Product.findById(product._id)
    .populate("category", "name slug")
    .populate("brand", "name slug");
};
/**
 * ===========================================================
 * Update Product
 * ===========================================================
 */

const updateProduct = async (
  id,
  updateData,
  files = []
) => {

  // ========================================================
  // Check Product Exists
  // ========================================================
  const existingProduct = await Product.findById(id);

  if (!existingProduct) {
    throw new AppError("Product not found.", 404);
  }

  // ========================================================
  // Validate Category
  // ========================================================
  if (updateData.category) {

    const category = await Category.findById(
      updateData.category
    );

    if (!category) {
      throw new AppError("Category not found.", 404);
    }
  }

  // ========================================================
  // Validate Brand
  // ========================================================
  if (updateData.brand) {

    const brand = await Brand.findById(
      updateData.brand
    );

    if (!brand) {
      throw new AppError("Brand not found.", 404);
    }
  }

  // ========================================================
  // Update Slug If Name Changes
  // ========================================================
  if (updateData.name) {

    updateData.slug = slugify(updateData.name, {
      lower: true,
      strict: true,
      trim: true,
    });

    const existingSlug = await Product.findOne({
      slug: updateData.slug,
      _id: { $ne: id },
    });

    if (existingSlug) {
      throw new AppError(
        "Product with this name already exists.",
        409
      );
    }
  }

  // ========================================================
  // Check Duplicate SKU
  // ========================================================
  if (updateData.sku) {

    const existingSku = await Product.findOne({
      sku: updateData.sku,
      _id: { $ne: id },
    });

    if (existingSku) {
      throw new AppError(
        "SKU already exists.",
        409
      );
    }
  }

  // ========================================================
  // Upload New Images (Optional)
  // ========================================================
  if (files.length > 0) {

    const images = [];

    for (const file of files) {

      const uploaded = await uploadImage(
        file.buffer,
        "shopnova/products"
      );

      images.push({
        url: uploaded.secure_url,
        publicId: uploaded.public_id,
        alt: updateData.name || existingProduct.name,
      });
    }

    updateData.images = images;
  }

  // ========================================================
  // Update Product
  // ========================================================
  const updatedProduct =
    await Product.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("category", "name slug")
      .populate("brand", "name slug");

  return updatedProduct;
};

/**
 * ===========================================================
 * Delete Product
 * ===========================================================
 */

const deleteProduct = async (id) => {

  // ========================================================
  // Find Product
  // ========================================================
  const product = await Product.findById(id);

  if (!product) {
    throw new AppError("Product not found.", 404);
  }

  // ========================================================
  // Delete Images From Cloudinary
  // ========================================================
  /*
  if (product.images && product.images.length > 0) {

    for (const image of product.images) {

      if (image.publicId) {
        await deleteImage(image.publicId);
      }

    }

  }
  */

  // ========================================================
  // Delete Product From Database
  // ========================================================
  await Product.findByIdAndDelete(id);

  return {
    success: true,
    message: "Product deleted successfully.",
  };

};

/**
 * ===========================================================
 * Get Product By ID
 * ===========================================================
 */

const getProductById = async (id) => {

  const product = await Product.findById(id)
    .populate("category", "name slug")
    .populate("brand", "name slug");

  if (!product) {
    throw new AppError("Product not found.", 404);
  }

  return product;

};

/**
 * ===========================================================
 * Get Product By Slug
 * ===========================================================
 */

const getProductBySlug = async (slug) => {

  const product = await Product.findOne({ slug })
    .populate("category", "name slug")
    .populate("brand", "name slug");

  if (!product) {
    throw new AppError("Product not found.", 404);
  }

  return product;

};

/**
 * ===========================================================
 * Get Products
 * ===========================================================
 */

const getProducts = async (query) => {

  // ========================================================
  // Pagination
  // ========================================================
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.max(Number(query.limit) || 10, 1);

  const skip = (page - 1) * limit;

  // ========================================================
  // Build Filter Object
  // ========================================================
  const filter = {};

  // Category Filter
  if (query.category) {
    filter.category = query.category;
  }

  // Brand Filter
  if (query.brand) {
    filter.brand = query.brand;
  }

  // Product Status
  if (query.status) {
    filter.status = query.status;
  } else {
    filter.status = "active";
  }

  // Stock Filter
  if (query.inStock === "true") {
    filter.stock = { $gt: 0 };
  }

  // Price Filter
  if (query.minPrice || query.maxPrice) {

    filter.price = {};

    if (query.minPrice) {
      filter.price.$gte = Number(query.minPrice);
    }

    if (query.maxPrice) {
      filter.price.$lte = Number(query.maxPrice);
    }

  }

  // Search by Product Name
  if (query.search) {

    filter.name = {
      $regex: query.search,
      $options: "i",
    };

  }

  // ========================================================
  // Sorting
  // ========================================================
  const sort = {};

  switch (query.sort) {

    case "priceAsc":
      sort.price = 1;
      break;

    case "priceDesc":
      sort.price = -1;
      break;

    case "rating":
      sort.averageRating = -1;
      break;

    case "oldest":
      sort.createdAt = 1;
      break;

    case "nameAsc":
      sort.name = 1;
      break;

    case "nameDesc":
      sort.name = -1;
      break;

    case "newest":
    default:
      sort.createdAt = -1;

  }

  // ========================================================
  // Fetch Products & Count
  // ========================================================
  const [products, totalProducts] = await Promise.all([

    Product.find(filter)
      .populate("category", "name slug")
      .populate("brand", "name slug")
      .sort(sort)
      .skip(skip)
      .limit(limit),

    Product.countDocuments(filter),

  ]);

  // ========================================================
  // Return Result
  // ========================================================
  return {

    products,

    pagination: {
      totalProducts,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      limit,
      hasNextPage: page < Math.ceil(totalProducts / limit),
      hasPrevPage: page > 1,
    },

  };

};

/**
 * ===========================================================
 * Export Services
 * ===========================================================
 */

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProductBySlug,
  getProducts,
};