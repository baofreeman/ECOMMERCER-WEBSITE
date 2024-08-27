/**
 * Authentication
 * Register account
 * Login account
 * Verify account with Email
 * Reset password with Email
 * Change password
 * Get profile
 * Logout account
 * Access token and Refresh token with backend
 */

import { apiSlice } from "../slices/apiSlice";

// Invalidate tag mutation
const invalidatesTags = (result) => (result ? ["UNAUTHORIZED"] : []);

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Register
    registerUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...credentials },
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags,
    }),

    // Verify Email
    verifyEmail: builder.mutation({
      query: (credentials) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: { ...credentials },
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: (result) => {
        return result ? ["UNAUTHORIZED"] : [];
      },
    }),

    // Reset password after send Email
    resetPasswordLink: builder.mutation({
      query: (credentials) => ({
        url: "/auth/reset-password-link",
        method: "POST",
        body: { ...credentials },
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags,
    }),

    // Reset password
    resetPassword: builder.mutation({
      query: (data) => {
        const { id, token, ...values } = data;
        const actualData = { ...values };
        return {
          url: `/auth/reset-password/${id}/${token}`,
          method: "POST",
          body: { ...actualData },
          headers: { "Content-Type": "application/json" },
        };
      },
      invalidatesTags,
    }),

    // Login
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags,
    }),

    // GET Profile
    getUser: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
        credentials: "include",
      }),
      providesTags: (result, error) => {
        return result
          ? [{ type: "Auth", id: result?.user?._id }]
          : error?.status === 401
          ? ["UNAUTHORIZED"]
          : ["UNKNOWN_ERROR"];
      },
    }),

    // Change password
    changePassword: builder.mutation({
      query: (credentials) => ({
        url: "/auth/change-password",
        method: "POST",
        body: { ...credentials },
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags,
    }),

    // Logout
    logoutUser: builder.mutation({
      query: () => {
        return {
          url: "/auth/logout",
          method: "POST",
          body: {},
          credentials: "include",
        };
      },
      invalidatesTags,
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useVerifyEmailMutation,
  useGetUserQuery,
  useLogoutUserMutation,
  useChangePasswordMutation,
  useResetPasswordLinkMutation,
  useResetPasswordMutation,
} = authApiSlice;
