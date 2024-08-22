/**
 * Toggle sidebar right and left to reponsive layout.
 */

import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    isSidebarRight: true,
    isSidebarleft: true,
  },
  reducers: {
    setSidebarRight: (state, action) => {
      state.isSidebarRight = action.payload;
    },
    setSidebarLeft: (state, action) => {
      state.isSidebarleft = action.payload;
    },
  },
});

export const { setSidebarRight, setSidebarLeft } = sidebarSlice.actions;
export const selectSidebarRight = (state) => state.sidebar.isSidebarRight;
export const selectSidebarLeft = (state) => state.sidebar.isSidebarleft;

export default sidebarSlice.reducer;
