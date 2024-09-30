import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { setSearchableProducts } from "../utils/searchableProductsSlice";

const useProducts = () => {
  const { category } = useSelector((store) => store.category);
  const dispatch=useDispatch()

  const [data, setData] = useState(null);
  console.log(category)
  useEffect(() => {
    if (!category) {
      getData();
    }
    else{
       getDataCategoryWise(); 
    }
  }, [category]);
  const getData = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/products?limit=30&skip=0");
      console.log(response);
      if (response.status == 200) {
        setData(response.data.products);
        // load the data to redux for search purose
        dispatch(setSearchableProducts(response.data.products))

      } else {
        Swal.fire({
          title: "Error!",
          text: "Something went wronng",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };
  const getDataCategoryWise=async()=>{
    try{
           const response=await axios.get("https://dummyjson.com/products/category/"+category);
           console.log(response);
      if (response.status == 200) {
        setData(response.data.products);
      } else {
        Swal.fire({
          title: "Error!",
          text: "Something went wronng",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    }
    catch(err){
     console.log(err)
     Swal.fire({
         title: "Error!",
         text: "Something went wrong",
         icon: "error",
         confirmButtonText: "Try Again",
     })
    }
  }

  return data;
};
export default useProducts;
