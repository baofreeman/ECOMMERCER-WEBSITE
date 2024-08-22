const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: [
      {
        tag: { type: String },
        model: [
          {
            color: {
              type: String,
              required: true,
            },
            skus: [
              {
                size: { type: String, required: true },
                sku: { type: String, required: true },
                price: {
                  type: Number,
                  required: true,
                },
              },
            ],
          },
        ],
      },
    ],
    productImg: {
      type: Array,
      required: true,
    },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
