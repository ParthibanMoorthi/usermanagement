import { createAsyncThunk } from "@reduxjs/toolkit";
import { login as loginService } from "../../api/authService";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const token = await loginService(email, password);
      localStorage.setItem("token", token);
      return token;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
