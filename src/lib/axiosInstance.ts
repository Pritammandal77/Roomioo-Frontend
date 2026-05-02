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

export const axiosInstance = axios.create({
  baseURL: typeof window === "undefined" 
    ? process.env.NEXT_PUBLIC_API_BASE_URL  // SSR — call Render directly
    : "/",                                   // Browser — go through Next.js proxy
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