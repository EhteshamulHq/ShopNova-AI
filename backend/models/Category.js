/**
 * ===========================================================
 * Category Model
 * ===========================================================
 * Supports:
 * - Parent Categories
 * - Nested Categories
 * - SEO Slug
 * - Active / Inactive Status
 * ===========================================================
 */

const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required."],
      trim: true,
      unique: true,
      maxlength: 100,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    description: {
      type: String,
      default: "",
      maxlength: 500,
    },

    image: {
      url: {
        type: String,
        default: "",
      },

      publicId: {
        type: String,
        default: "",
      },
    },

    /**
     * Parent Category
     * Example:
     * Electronics
     *    ├── Mobiles
     *    ├── Laptops
     */

    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
      index: true,
    },

    displayOrder: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      index: true,
    },

    seoTitle: {
      type: String,
      default: "",
      maxlength: 70,
    },

    seoDescription: {
      type: String,
      default: "",
      maxlength: 160,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/**
 * Compound Index
 */

categorySchema.index({
  parentCategory: 1,
  status: 1,
});

module.exports = mongoose.model(
  "Category",
  categorySchema
);