import { createSlice } from "@reduxjs/toolkit";

const categoryListSlice=createSlice({
    name:"categoryList",
    initialState:{
        categoryList:null
    },
    reducers:{
        setCategoryList:(state,action)=>{
            state.categoryList=action.payload
        }
    }


})
export const {setCategoryList}=categoryListSlice.actions;
export default categoryListSlice.reducer;
