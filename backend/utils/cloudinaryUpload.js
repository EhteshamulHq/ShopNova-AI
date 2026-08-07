/**
 * ===========================================================
 * Cloudinary Upload Utility
 * ===========================================================
 */

const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");

/**
 * Upload Single Image
 */

const uploadImage = (buffer, folder = "shopnova") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

/**
 * Delete Image
 */

const deleteImage = async (publicId) => {
  return cloudinary.uploader.destroy(publicId);
};

module.exports = {
  uploadImage,
  deleteImage,
};