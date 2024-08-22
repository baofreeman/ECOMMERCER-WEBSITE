/**
 * Create Redux store with slices for cart, auth, country, sidebar, API, products, orders, users.
 */

import { configureStore } from "@reduxjs/toolkit";
import {
  apiSlice,
  productSlice,
  sidebarSlice,
  cartSlice,
  countrySlice,
} from "./index";

const store = configureStore({
  reducer: {
    // Slices for different features of the application
    [productSlice.reducerPath]: productSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    sidebar: sidebarSlice,
    cart: cartSlice,
    country: countrySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      // Middleware for handling API and product-related state
      apiSlice.middleware,
      productSlice.middleware,
    ]),
  devTools: process.env.NODE_ENV !== "production", // Enable devTools only in development
});

export default store;
