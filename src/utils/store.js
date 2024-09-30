import { configureStore } from "@reduxjs/toolkit";
import showCategorySlice from "./showCategorySlice";
import categoryListSlice from "./categoryListSlice.js";
import categorySlice from "./categorySlice.js";
import cartSlice from "./cartSlice.js";
import searchableProductsSlice from "./searchableProductsSlice.js";
import cartLengthSlice from "./cartLengthSlice.js";

const store=configureStore({
    reducer: {
        showCategory:showCategorySlice,
        categoryList:categoryListSlice,
        category:categorySlice,
        cart:cartSlice,
        searchableProducts:searchableProductsSlice,
        cartLength:cartLengthSlice// Define your reducers here
    }
})

export default store;