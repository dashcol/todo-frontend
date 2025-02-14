import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "../redux.reducers.todo";
import { authReducer } from "../redux.login";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { notesReducer } from "../redux.reducers.notes";

const persistConfig = {
  key: "root",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    notesReducer,
    todoReducer,
    authReducer: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

const persistor = persistStore(store);

export { store, persistor };
