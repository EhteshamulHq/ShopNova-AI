/**
 * ===========================================================
 * Multer Configuration
 * ===========================================================
 */

const multer = require("multer");

/**
 * Store file in memory
 */

const storage = multer.memoryStorage();

/**
 * Image File Filter
 */

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/avif",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    return cb(null, true);
  }

  cb(new Error("Only image files are allowed."), false);
};

const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

module.exports = upload;