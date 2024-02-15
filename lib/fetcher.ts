"use client";

import axios from "axios";

export const getData = async (url: string, params?: string) => {
  const token = sessionStorage.getItem("token");
  return await axios.get(`${process.env.NEXT_PUBLIC_API}${url}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const postData = async (url: string, params?: string) => {
  const token = sessionStorage.getItem("token");
  return await axios.post(`${process.env.NEXT_PUBLIC_API}${url}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

// export const fetcher = async (url: string, token: string): Promise<any> => {
//   try {
//     const response = await axios.get(url, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return response.data;
//   } catch (error: any) {
//     throw error.response.data;
//   }
// };

// export const fetcher = async (url: string) => {
//   try {
//     const response = await fetch(url, {
//       method: "GET", // Include credentials in cross-origin requests
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//       },
//     });

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.log(error);
//     window.location.href = "/";
//   }
// };

// export async function postData(url, payload, formData) {
//   try {
//     const { token } = localStorage.getItem("auth")
//       ? JSON.parse(localStorage.getItem("auth"))
//       : {};

//     return await axios.post(${config.api_host}${url}, payload, {
//       headers: {
//         Authorization: Bearer ${token},
//         "Content-Type": formData ? "multipart/form-data" : "application/json",
//       },
//     });
//   } catch (err) {
//     return handleError(err);
//   }
// }

// export async function putData(url, payload) {
//   try {
//     const { token } = localStorage.getItem("auth")
//       ? JSON.parse(localStorage.getItem("auth"))
//       : {};

//     return await axios.put(${config.api_host}${url}, payload, {
//       headers: {
//         Authorization: Bearer ${token},
//       },
//     });
//   } catch (err) {
//     return handleError(err);
//   }
// }

// export async function deleteData(url) {
//   try {
//     const { token } = localStorage.getItem("auth")
//       ? JSON.parse(localStorage.getItem("auth"))
//       : {};

//     return await axios.delete(${config.api_host}${url}, {
//       headers: {
//         Authorization: Bearer ${token},
//       },
//     });
//   } catch (err) {
//     return handleError(err);
//   }
// }
