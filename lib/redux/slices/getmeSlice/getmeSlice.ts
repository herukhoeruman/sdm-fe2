import { createSlice } from "@reduxjs/toolkit";
import { fetchGetme } from "./thunks";

interface UserData {
  id: number;
  username: string;
  email: string;
  nama: string;
  jabatan: string;
  divisi: string;
  roles: string[];
}

interface GetmeState {
  data: UserData | null;
  loading: boolean;
  error: string | null;
}

const initialState: GetmeState = {
  data: null,
  loading: false,
  error: null,
};

export const getmeSlice = createSlice({
  name: "getme",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetme.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGetme.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchGetme.rejected, (state, action) => {
        state.loading = false;
        state.error = "Error fetching data.";
      });
  },
});
