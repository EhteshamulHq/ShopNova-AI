/**
 * ===========================================================
 * Brand Model
 * ===========================================================
 * Supports:
 * - Brand Name
 * - Slug
 * - Logo
 * - Website
 * - Description
 * - SEO
 * - Status
 * ===========================================================
 */

const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand name is required."],
      trim: true,
      unique: true,
      maxlength: [100, "Brand name cannot exceed 100 characters."],
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    logo: {
      url: {
        type: String,
        default: "",
      },

      publicId: {
        type: String,
        default: "",
      },
    },

    website: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
      maxlength: [1000, "Description cannot exceed 1000 characters."],
    },

    country: {
      type: String,
      default: "",
      trim: true,
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
 * Text Search Index
 */
brandSchema.index({
  name: "text",
  description: "text",
});

/**
 * Compound Index
 */
brandSchema.index({
  status: 1,
  name: 1,
});

module.exports = mongoose.model("Brand", brandSchema);