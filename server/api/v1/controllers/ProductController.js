const mongoose = require("mongoose");
const ProductModal = require("../models/Product");

const cloudinary = require("../config/cloudinary");
const cloudinaryImageUploadMethod = require("../middleware/cloudinaryMethod");

class ProductController {
  async getProducts(req, res) {
    try {
      const { page } = req.query;
      const limit = 8;
      const currentPage = page ? parseInt(page, 10) : 1;
      const skip = (currentPage - 1) * limit;

      const total = await ProductModal.countDocuments();
      const totalPages = Math.ceil(total / limit);

      let products;
      if (page === undefined) {
        // If no page parameter is provided, fetch all products
        products = await ProductModal.find();
      } else {
        // Fetch products with pagination
        products = await ProductModal.find().skip(skip).limit(limit);
      }

      return res.status(200).json({ products, totalPages });
    } catch (error) {
      // Log and handle errors
      console.error("Error fetching products:", error);
      return res.status(500).json({ message: "Lỗi server" });
    }
  }

  // POST /v1/product/:category
  async getProductsCategory(req, res) {
    try {
      const { category } = req.params;
      const { page } = req.query;
      const limit = 8;
      const skip = (page - 1) * limit;

      const query = { category };

      const products = await ProductModal.find(query).skip(skip).limit(limit);
      if (!products) {
        return res.status(400).json({ message: "Không có dữ liệu" });
      }
      return res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products by slug:", error);
      return res.status(500).json({ message: "Lỗi server" });
    }
  }

  // POST /v1/product/create-product
  async createProduct(req, res) {
    try {
      const { name, description, category, subCategory, stock } = req.body;

      if ((!name || !description || !category || !subCategory, stock)) {
        return res.status(401).json({ message: "Không có dữ liệu" });
      }
      const newProduct = new ProductModal({
        ...req.body,
        subCategory: JSON.parse(subCategory),
      });

      const urls = [];
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newPath = await cloudinaryImageUploadMethod(
          path,
          `clothes/products/${req.body.name}`
        );
        urls.push(newPath);
      }
      newProduct.productImg = urls;

      const saveProduct = await ProductModal.create(newProduct);
      if (!saveProduct) {
        return res.status(401).json({ message: "Dữ liệu không chính xác" });
      } else {
        res.status(200).json({ message: `${name} đã được tạo thành công` });
      }
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Lỗi server",
      });
    }
  }

  // PATCH /v1/product/update-product
  async updateProduct(req, res) {
    try {
      const { id, name, description, category } = req.body;
      if (!id || !name || !description || !category) {
        return res.status(401).json({ message: "Không có dữ liệu" });
      }
      const product = await ProductModal.findOneAndUpdate(
        { _id: id },
        req.body
      );
      if (product) {
        return res
          .status(200)
          .json({ message: `${name} đã cập nhật thành công` });
      } else {
        return res.status(401).json({ message: "Không thể cập nhật" });
      }
    } catch (error) {
      res.status(500).json({
        status: "failed",
        message: "Lỗi server",
      });
    }
  }

  // DELETE /v1/product/delete-product
  async deleteProduct(req, res) {
    try {
      const { productId } = req.params;
      if (!productId) {
        return res.status(401).json({ message: "Không có dữ liệu" });
      }

      const product = await ProductModal.findOne({ _id: productId });
      const pathImgId = product.productImg.flatMap(({ id }) => id);

      // Delete image cloundinary
      const deleteImg = await Promise.all([
        await cloudinary.api.delete_resources(pathImgId, (err) => {
          if (err)
            return res.status(401).json({ message: "Hình ảnh không thể xóa" });
        }),
        await cloudinary.api.delete_folder(
          `clothes/products/${product.name}`,
          (err) => {
            if (err)
              return res.status(401).json({ message: "Thư mục không thể xóa" });
          }
        ),
      ]);

      // Delete item mongodb
      const deleteProduct = await ProductModal.deleteOne({ _id: productId });
      if (!deleteImg && !deleteProduct) {
        return res.status(401).json({ message: "Dữ liệu không thể xóa" });
      } else {
        res.status(200).json({ message: `${product.name} đã xóa thành công` });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({ message: "Lỗi server" });
    }
  }

  // GET v1/variants/:itemId
  async getVariants(req, res) {
    try {
      const { itemId } = req.params;
      if (!itemId) {
        return res.status(400).json({ message: "Không có dữ liệu" });
      } else {
        const product = await ProductModal.aggregate([
          { $unwind: "$subCategory" },
          { $unwind: "$subCategory.model" },
          { $unwind: "$subCategory.model.skus" },
          {
            $match: {
              "subCategory.model.skus._id": new mongoose.Types.ObjectId(itemId),
            },
          },
        ]);
        if (product) {
          return res.status(200).json(product);
        } else {
          return res.status(401).json({ message: "Không có dữ liệu" });
        }
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({ message: "Lỗi server" });
    }
  }

  // GET v1/product/traits
  async getFilterProducts(req, res) {
    try {
      console.log(req.params);
      const { tag, color, size, page } = req.query;
      const { category } = req.params;
      const limit = 8;
      const currentPage = page ? parseInt(page, 10) : 1;
      const skip = (currentPage - 1) * limit;
      // Build the query object
      let query = {};
      if (category) query.categorySlug = category;
      if (tag) query["subCategory.tagSlug"] = tag;
      if (color) query["subCategory.model.colorSlug"] = color;
      if (size) query["subCategory.model.skus.size"] = size;

      // Fetch products and total count in parallel
      const [products, totalProducts] = await Promise.all([
        ProductModal.find(query).skip(skip).limit(limit),
        ProductModal.countDocuments(query),
      ]);

      if (!products || products.length === 0) {
        return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
      }

      const totalPages = Math.ceil(totalProducts / limit);

      res.status(200).json({ products, totalPages });
    } catch (error) {
      console.error("Error fetching products:", error);
      return res.status(500).json({ message: "Lỗi server" });
    }
  }

  // GET v1/product/search/:key
  async searchProduct(req, res) {
    const { key } = req.params;

    if (!key) {
      return res.status(400).json({ message: "Vui lòng nhập tìm kiếm" });
    }

    try {
      // Perform the search using regex for case-insensitive matching
      const results = await ProductModal.find({
        name: { $regex: key, $options: "i" }, // 'i' for case-insensitive search
      });

      if (results.length === 0) {
        return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
      }

      res.status(200).json(results);
    } catch (error) {
      console.error("Error searching products:", error);
      return res.status(500).json({ message: "Lỗi server" });
    }
  }
}

module.exports = new ProductController();
