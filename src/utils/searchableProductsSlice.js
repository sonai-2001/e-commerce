import { createSlice } from "@reduxjs/toolkit";

const searchableProductsSlice=createSlice({
    name:"searchableProducts",
    initialState:{
        searchProducts:[]
    },
    reducers:{
          setSearchableProducts:(state,action)=>{
                  state.searchProducts=action.payload
          }
    }
})

export const {setSearchableProducts}=searchableProductsSlice.actions
export default searchableProductsSlice.reducer