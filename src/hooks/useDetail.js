import axios from "axios";
import { useEffect, useState } from "react";

const useDetail=(id)=>{
   const[data,setData]=useState(null)
   useEffect(()=>{
      getData();
   },[id])
   const getData=async()=>{
    const response =await axios.get("https://dummyjson.com/products/"+id)
    console.log(response)
    setData(response.data)
   }
    return data;
}
export default useDetail