import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import queryString from "query-string";

const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL,
    credentials: "include",
    paramsSerializer: (params) => queryString.stringify(params),
  }),
  tagTypes: ["Auth", "User", "Order", "UNKNOWN_ERROR", "UNAUTHORIZED"],
  endpoints: () => ({}),
});

const productSlice = createApi({
  reducerPath: "productSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL,
    credentials: "include",
    paramsSerializer: (params) => queryString.stringify(params),
  }),
  tagTypes: ["Product", "Search", "Variant"],
  endpoints: () => ({}),
});

export { apiSlice, productSlice };
