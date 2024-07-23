// import useSWR from "swr";

// // Fungsi fetcher dengan bearer token
// const fetcher = (url: string, token: string) =>
//   fetch(url, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   }).then((res) => res.json());

// // Custom hook dengan token
// function useData<T>(url: string, token: string) {
//   const { data, error, isLoading } = useSWR<T>([url, token], ([url, token]) =>
//     fetcher(url, token)
//   );

//   return {
//     data,
//     error,
//     isLoading,
//   };
// }

// export default useData;
