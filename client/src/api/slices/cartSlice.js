/**
 * Cart storage.
 * Calculate the total products added to the cart.
 * Calculate total amount based on total products.
 * Add products based on user selected variations.
 * Dercement product quantity based on attributes.
 * The exact filter retrieves the correct products the user has selected based on Index for each SKU.
 */

import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// CartState
const initialState = {
  cartItems: [],
  cartTotalAmount: 0,
  cartTotalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add product in cart
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        // Find product based on Index. Filter product Id and Sku.
        (item) =>
          item._id === action.payload._id &&
          item.subCategory?.model?.skus?._id ===
            action.payload?.subCategory?.model?.skus._id
      );

      if (itemIndex >= 0) {
        // If product in cart.
        state.cartItems[itemIndex].qty += 1; // Quantity + 1
        state.cartItems = [...state.cartItems];
        state.cartTotalQuantity += 1; // Total quantity = Total quantity current in cart + 1
        state.cartTotalAmount +=
          action.payload?.subCategory?.model?.skus?.price; // Total price = Total price current + product price based on Sku.
      } else {
        let newItem = { ...action.payload, qty: 1 }; // If product isn't in cart. Add new Product based on Sku. Quantity + 1
        state.cartItems = [...state.cartItems, newItem];
        state.cartTotalQuantity += 1; // Total quantity = Total quantity current in cart + 1
        state.cartTotalAmount +=
          action.payload?.subCategory?.model?.skus?.price; // Total price = Total price current in cart + product price based on Sku.
      }
      toast.success("Thêm vào giỏ hàng thành công");
    },

    // Decrement product in cart
    decrToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        // Find product based on Index. Filter product Id and Sku.
        (item) =>
          item._id === action.payload?._id &&
          item.subCategory.model.skus._id ===
            action.payload?.subCategory?.model?.skus?._id
      );
      if (itemIndex >= 0 && state.cartItems[itemIndex].qty > 1) {
        // If product in cart. Dercement prouduct based on Sku.
        state.cartItems[itemIndex].qty -= 1; // Quantity - 1
        state.cartTotalQuantity -= 1; // Total quantity = Total quantity current in cart - 1
        state.cartTotalAmount -=
          state.cartItems[itemIndex]?.subCategory?.model?.skus?.price; // Total price = Total price current in cart - product price based on Sku.
        toast.warn("Xoá số lượng thành công");
      }
    },

    // Delete product in cart
    deleteCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        // Find product based on Index. Filter product Id and Sku.
        (item) =>
          item._id === action.payload._id &&
          item.subCategory?.model?.skus._id ===
            action.payload?.subCategory?.model?.skus?._id
      );
      if (itemIndex >= 0) {
        // If product in cart
        state.cartTotalQuantity -= state.cartItems[itemIndex]?.qty || 0; // Total quantity = Total quantity current - Total quantity of product in cart.
        state.cartTotalAmount -=
          state.cartItems[itemIndex]?.subCategory?.model?.skus?.price *
          state.cartItems[itemIndex]?.qty; // Total price = Total price current - Total price of product in cart * Total quantity of product in cart.
        state.cartItems.splice(itemIndex, 1); // Delete product in cart.
        toast.error("Xoá sản phẩm thành công");
      }
    },

    // Reset Cart
    resetCart: (state, action) => {
      // Reset Cart State
      state.cartItems = [];
      state.cartTotalAmount = 0;
      state.cartTotalQuantity = 0;
    },
  },
});
export const { addToCart, decrToCart, deleteCart, resetCart } =
  cartSlice.actions;
export const selectCartItem = (state) => state.cart.cartItems;
export const selectTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectTotalQuantity = (state) => state.cart.cartTotalQuantity;
export default cartSlice.reducer;
