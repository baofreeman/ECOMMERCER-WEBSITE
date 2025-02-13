/**
 * Used createAsyncThunk and Axios.
 * Call API Province.
 * Find District based on provinceId params.
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Call API Provinces
export const fetchProvince = createAsyncThunk(
  "country/fetchProvince",
  async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}country/provinces`
      );
      return res.data; // Result
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

// Call API Districts based on provinceId
export const fetchDistrict = createAsyncThunk(
  "country/fetchDistrict",
  async (provinceId) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}country/districts/${provinceId}`,
        {
          params: { provinceId }, // Pass provinceId as query parameter
        }
      );
      return res.data; // Result
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

// CreateSlice
const countrySlice = createSlice({
  name: "country",
  initialState: {
    province: [],
    district: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProvince.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProvince.fulfilled, (state, action) => {
        state.province = action.payload || [];
        state.loading = false;
      })
      .addCase(fetchProvince.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchDistrict.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDistrict.fulfilled, (state, action) => {
        state.district = action.payload || [];
        state.loading = false;
      })
      .addCase(fetchDistrict.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

const getProvince = (state) => state.country.province;
const getDistrict = (state) => state.country.district;
const getLoading = (state) => state.country.loading;
const getError = (state) => state.country.error;

export { getProvince, getDistrict, getLoading, getError };
export default countrySlice.reducer;
