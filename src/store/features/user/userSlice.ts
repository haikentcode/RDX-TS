import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "./userAPI";
import { RootState } from "../../app/store";

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface GEO {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo?: GEO;
}

export interface User {
  name: string;
  username: string;
  email: string;
  address?: Address;
  phone: string;
  website: string;
  company?: Company;
}

export interface usersState {
  users: User[] | undefined;
  status: "idle" | "loading" | "failed";
}

const initialState: usersState = {
  users: undefined,
  status: "idle",
};

export const userAsync = createAsyncThunk("user/fetchUser", async () => {
  const response = await fetchUser();
  return response.data;
});

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = action.payload;
      })
      .addCase(userAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectUser = (state: RootState) => state.users.users;

export default userSlice.reducer;
