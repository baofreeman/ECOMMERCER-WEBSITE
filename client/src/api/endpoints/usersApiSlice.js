/**
 * Manage users in the Admin panel:
 * - Fetch all users
 * - Delete users
 */

import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../slices/apiSlice";

// Create an adapter for user entities
const userAdapter = createEntityAdapter({
  selectId: (user) => user?._id,
});

const initialState = userAdapter.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all users with admin role
    getUsers: builder.query({
      query: () => ({
        url: `/user/all-user`,
        validateStatus: (res, result) => {
          return res.status === 200 && !result.isError;
        },
      }),
      transformResponse: (res) => {
        // Transform response into normalized data
        return userAdapter.setAll(initialState, res);
      },
      providesTags: (result) => {
        // Return tags for cache invalidation and refetching
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else {
          return [{ type: "User", id: "LIST" }];
        }
      },
    }),

    updateUser: builder.mutation({
      query: (body) => ({
        url: "/user/update-user",
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg?._id }],
    }),

    // Delete a user with admin role
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/user/delete-user/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg?._id }],
    }),
  }),
});

// Export hooks for using in components
export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = userApiSlice;

// Selectors
const selectUserResult = userApiSlice.endpoints.getUsers.select();
const selectUserData = createSelector(
  selectUserResult,
  (userResult) => userResult.data
);

// Export selectors for accessing user data
export const { selectAll: selectAllUsers } = userAdapter.getSelectors(
  (state) => selectUserData(state) ?? initialState
);
