import axios from "axios";
import { useEffect,useState } from "react"
import Swal from "sweetalert2";

const useCategories=()=>{
   const[data,setData]=useState(null)
     useEffect(()=>{
          getData();
     },[])

     const getData=async()=>{
          try{
               const response=await axios.get("https://dummyjson.com/products/categories")
               console.log(response.data)
               setData(response.data)
          }
          catch(err){
              Swal.fire({
                 title: "Error",
                 text: "Failed to fetch categories",
                 icon: "error",
                 timer: 2000,
                 showConfirmButton: false,
                 timerProgressBar: true,
                 position: "top-end",
                 backdrop: `rgba(0,0,0,0.3)`
              })
          }
     }
    return data
}

export default useCategories