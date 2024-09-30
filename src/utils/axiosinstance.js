import axios from "axios";

const axiosinstance = axios.create({
  baseURL: "https://wtsacademy.dedicateddevelopers.us/",
});

axiosinstance.interceptors.request.use(
  (config) => {
    const token = window.sessionStorage.getItem("token");
    if (token) {
        console.log("x-acess-token")
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);


export default axiosinstance;
export const fn = (pic) => {
    return (
      "https://wtsacademy.dedicateddevelopers.us/" +
      `uploads/user/profile_pic/${pic}`
    );
  };
