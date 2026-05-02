// import axios from "axios";


// export const axiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
//   withCredentials: true,
// });

// axiosInstance.interceptors.response.use(
  //   (res) => res,
  //   async (error) => {
    //     const originalRequest = error.config;

    //     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       !originalRequest.url.includes("/refresh-access-token")
//     ) {
  //       originalRequest._retry = true;

//       try {
  //         await axiosInstance.post("/api/user/refresh-access-token");
  //         return axiosInstance(originalRequest);
  //       } catch (err) {
//         console.log("Refresh failed → logout user");
//       }
//     }

//     return Promise.reject(error);
//   }
// );

import axios from "axios";
const isProduction = process.env.NODE_ENV === "production";

export const axiosInstance = axios.create({
  baseURL: isProduction
    ? "/"                                        // prod → go through Next.js proxy
    : process.env.NEXT_PUBLIC_API_BASE_URL,      // local → hit Render/localhost directly
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/refresh-access-token")
    ) {
      originalRequest._retry = true;

      try {
        await axiosInstance.post("/api/user/refresh-access-token");
        return axiosInstance(originalRequest);
      } catch (err) {
        console.log("Refresh failed → logout user");
      }
    }

    return Promise.reject(error);
  }
);