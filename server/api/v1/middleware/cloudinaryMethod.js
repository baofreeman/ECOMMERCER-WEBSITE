const cloudinary = require("cloudinary").v2;

const cloudinaryImageUploadMethod = async (file, folder) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(file, { folder }, (error, result) => {
      if (error) {
        return result
          .status(401)
          .json({ success: false, message: error.message });
      }
      resolve({
        url:
          process.env.NODE_ENV === "development"
            ? result.url
            : result.secure_url,
        id: result.public_id,
        folder: result.folder,
      });
    });
  });
};

module.exports = cloudinaryImageUploadMethod;
