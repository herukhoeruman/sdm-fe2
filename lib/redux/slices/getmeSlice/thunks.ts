import axios from "axios";
import { createAppAsyncThunk } from "@/lib/redux/createAppAsyncThunk";

export const fetchGetme = createAppAsyncThunk("user/fetchGetme", async () => {
  const token = sessionStorage.getItem("token");
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/api/auth/getme`,
      {
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.log(error.message);
    window.location.href = "/?error=tokenExpired";
  }
});
