import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useState } from "react";

const INITIAL_STATE = {
  isAuthenticated: false,
  user: null,
  token: null,
  error: null,
  loading: false,
};

export const userAsyncThunk = createAsyncThunk(
  "auth/login",
  async (userCredentials, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3000/api/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userAsyncThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(userAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(userAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;
export const authSelector = (state) => {
  return state.authReducer;
};
export const authActions = authSlice.actions;
export const userSelector = (state) => state.authReducer.user;
export const authErrorSelector = (state) => state.authReducer.error;
export const authTokenSelector = (state) => state.authReducer;
