import { createSlice } from "@reduxjs/toolkit";

const showCategorySlice = createSlice({
  name: 'showCategory',
  initialState: {
    showCategories: false,
  },
  reducers: {
    setShowCategories: (state) => {
      state.showCategories = !state.showCategories; // Directly mutating the state
    },
  },
});

export const { setShowCategories } = showCategorySlice.actions;

export default showCategorySlice.reducer;
