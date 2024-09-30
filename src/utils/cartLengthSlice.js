import { createSlice } from "@reduxjs/toolkit";

const cartLengthSlice=createSlice({
    
    name:"cartLength",
    initialState:{
        length:0
    },
    reducers:{
        updateCartLength:(state,action)=>{
            if(action.payload.length==0){
                state.length=0
                return
            }
            const length=action.payload.reduce((acc,item)=>{
                return acc+item.quantity
            },0)

            state.length=length
        }
    }

})
export const {updateCartLength}=cartLengthSlice.actions
export default cartLengthSlice.reducer