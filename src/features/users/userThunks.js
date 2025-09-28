import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://reqres.in/api/users";
const API_KEY = "reqres-free-v1"; 

const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
    "x-api-key": API_KEY,
  },
};

export const loadUsers = createAsyncThunk(
  "users/load",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API_URL, axiosConfig);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Failed to load users");
    }
  }
);

export const loadUserById = createAsyncThunk(
  "users/loadById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/${id}`, axiosConfig);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Failed to load user");
    }
  }
);

export const createUserThunk = createAsyncThunk(
  "users/create",
  async (newUser, { rejectWithValue }) => {
    try {
      const res = await axios.post(API_URL, newUser, axiosConfig);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Failed to create user");
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  "users/update",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, updates, axiosConfig);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Failed to update user");
    }
  }
);

export const deleteUserThunk = createAsyncThunk(
  "users/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`, axiosConfig);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Failed to delete user");
    }
  }
);
