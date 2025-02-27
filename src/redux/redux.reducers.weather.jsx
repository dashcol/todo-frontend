import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "https://13.61.181.126:3000";

const INITIAL_STATE = {
  isloading: false,
  weather: null,
  error: null,
};

export const WeatherAsyncThunk = createAsyncThunk(
  "weather/fetchweather",
  async (city, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.authReducer.token;
      const response = await fetch(`${API_URL}/api/weather?city=${city}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(WeatherAsyncThunk.pending, (state) => {
        state.isloading = true;
        state.error = null;
      })
      .addCase(WeatherAsyncThunk.fulfilled, (state, action) => {
        state.isloading = false;
        state.weather = action.payload;
        state.error = null;
      })
      .addCase(WeatherAsyncThunk.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.payload;
      });
  },
});

export const weatherReducer = weatherSlice.reducer;
export const weatherActions = weatherSlice.actions;
