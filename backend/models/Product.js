/**
 * ===========================================================
 * Product Model
 * ===========================================================
 */

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required."],
      trim: true,
      maxlength: [150, "Product name cannot exceed 150 characters."],
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
      required: [true, "Description is required."],
      maxlength: 5000,
    },

    shortDescription: {
      type: String,
      maxlength: 300,
      default: "",
    },

    sku: {
      type: String,
      unique: true,
      uppercase: true,
      trim: true,
    },

    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
      index: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    images: [
      {
        url: {
          type: String,
          required: true,
        },

        publicId: {
          type: String,
          required: true,
        },

        alt: {
          type: String,
          default: "",
        },
      },
    ],

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discountPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    sold: {
      type: Number,
      default: 0,
    },

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: [
        "draft",
        "active",
        "inactive",
      ],
      default: "active",
      index: true,
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

productSchema.index({
  name: "text",
  description: "text",
});

/**
 * Compound Index
 */

productSchema.index({
  category: 1,
  brand: 1,
  price: 1,
});

module.exports = mongoose.model(
  "Product",
  productSchema
);