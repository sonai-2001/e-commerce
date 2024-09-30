import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const useCart = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    if(!window.sessionStorage.getItem("token")){
      setData([])
      return
    }
    getData();
  }, []);

  const getData = async () => {
    try {
        const response= await axios.get("https://66edb44e380821644cddc1bf.mockapi.io/my-api/cart")
        console.log(response)
        const filtered=response.data.filter((cartItem,index)=>{
           return(
                cartItem.token==window.sessionStorage.getItem('token')

           )
        })
        setData(filtered)
        
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        showConfirmButton: true,
        confirmButtonText: "Try Again",
      });
    }
  };

  return data;
};
export default useCart;
