import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "https://13.61.181.126:3000";

const INITIAL_STATE = {
  todos: [],
};

export const getAsyncThunk = createAsyncThunk(
  "todo/fetchTodos",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.authReducer.token;

    try {
      const response = await fetch(`${API_URL}/api/todos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
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
  "todo/psotTodo",
  async (todoObject, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.authReducer.token;
    try {
      const response = await fetch(`${API_URL}/api/todos/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify(todoObject),
      });
      const data = await response.json();

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const toggleAsyncThunk = createAsyncThunk(
  "todo/toggleTodo",
  async (id, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.authReducer.token;

      const response = await fetch(`${API_URL}/api/todos/toggle/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteAsyncThunk = createAsyncThunk(
  "todos/deleteTodo",
  async (id, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.authReducer.token;
    const response = await fetch(`${API_URL}/api/todos/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });
    const data = await response.json();
    return data;
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState: INITIAL_STATE,
  reducers: {
    add: (state, action) => {
      state.todos.push({
        todo: action.payload,
        completed: false,
        userName: "Admin",
        createdOn: new Date().toISOString(),
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAsyncThunk.fulfilled, (state, action) => {
        state.todos = action.payload;
      })

      .addCase(postAsyncThunk.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(toggleAsyncThunk.fulfilled, (state, action) => {
        const toggledTodo = action.payload;
        const index = state.todos.findIndex(
          (todo) => todo._id === toggledTodo._id
        );
        if (index !== -1) {
          state.todos[index] = toggledTodo;
        }
      })
      .addCase(deleteAsyncThunk.fulfilled, (state, action) => {
        state.todos = action.payload;
      });
  },
});

export const todoReducer = todoSlice.reducer;
export const todoAction = todoSlice.actions;
export const todoSelector = (state) => state.todoReducer.todos;
