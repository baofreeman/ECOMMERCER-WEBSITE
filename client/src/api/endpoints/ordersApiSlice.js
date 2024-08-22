/**
 * Add new Order based on CartState.
 * Get all order.
 */

import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../slices/apiSlice";

// Order Adapter
const orderAdapter = createEntityAdapter({
  selectId: (order) => order?._id,
});

// InitState Order
const initialState = orderAdapter.getInitialState();

// OrderSlice
export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrder: builder.query({
      // Get all orders.
      query: () => ({
        url: `/order/all-order`,
        validateStatus: (res, result) => {
          return res.status === 200 && !result.isError;
        },
      }),
      transformResponse: (res) => {
        return orderAdapter.setAll(initialState, res);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Order", id: "LIST" },
            ...result?.ids.map((id) => ({ type: "Order", id })),
          ];
        } else return [{ type: "Order", id: "LIST" }];
      },
    }),

    addOrder: builder.mutation({
      // Add new order based on CartState.
      query: (body) => {
        return {
          url: "/order/create-order",
          method: "POST",
          body: body,
          formData: true,
        };
      },
      invalidatesTags: [{ type: "Order", id: "LIST" }],
    }),
  }),
});

export const { useGetOrderQuery, useAddOrderMutation } = ordersApiSlice; // Used.

export const selectOrderResult = ordersApiSlice.endpoints.getOrder.select();

const selectOrderData = createSelector(selectOrderResult, (orderResult) => {
  return orderResult.data;
});

export const { selectAll: selectAllOrder } = orderAdapter.getSelectors(
  // Select get all orders.
  (state) => selectOrderData(state) ?? initialState
);
