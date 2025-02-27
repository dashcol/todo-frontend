import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "https://13.61.181.126:3000";

const INITAIL_STATE = {
  notes: [],
  loading: false,
  error: null,
};

export const getAsyncThunk = createAsyncThunk(
  "notes/fetchNotes",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.authReducer.token;
      const response = await fetch(`${API_URL}/api/notes`, {
        method: "GET",
        headers: { "Content-Type": "application/json", authorization: token },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const postAsyncThunk = createAsyncThunk(
  "notes/postNotes",
  async (note, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.authReducer.token;
      const response = await fetch(`${API_URL}/api/notes/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json", authorization: token },
        body: JSON.stringify(note),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteAsyncThunk = createAsyncThunk(
  "notes/deleteNote",
  async (id, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.authReducer.token;

      const response = await fetch(`${API_URL}/api/notes/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", authorization: token },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const notesSlice = createSlice({
  name: "notes",
  initialState: INITAIL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAsyncThunk.fulfilled, (state, action) => {
        state.notes = action.payload;
      })
      .addCase(postAsyncThunk.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(deleteAsyncThunk.fulfilled, (state, action) => {
        state.notes = action.payload;
      });
  },
});

export const notesSelector = (state) => state.notesReducer.notes;
export const notesReducer = notesSlice.reducer;
export const notesActions = notesSlice.actions;
