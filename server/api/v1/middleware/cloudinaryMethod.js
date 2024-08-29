const cloudinary = require("cloudinary").v2;

const cloudinaryImageUploadMethod = async (file, folder) => {
  const urlProtocol = process.env.CLOUDINARY_URL_PROTOCOL || "https";

  return new Promise((resolve) => {
    cloudinary.uploader.upload(file, { folder }, (error, result) => {
      if (error) {
        return result
          .status(401)
          .json({ success: false, message: error.message });
      }
      const url = result.secure_url.replace(/^https:/, `${urlProtocol}:`);
      resolve({
        url,
        id: result.public_id,
        folder: result.folder,
      });
    });
  });
};

module.exports = cloudinaryImageUploadMethod;
