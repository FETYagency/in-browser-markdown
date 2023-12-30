import { configureStore } from "@reduxjs/toolkit";
import documentsSlice from "./features/documents";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist-indexeddb-storage";
import { thunk } from "redux-thunk";
const persistConfig = {
  key: "root",
  storage: storage("myDB"),
};
const persistedReducer = persistReducer(persistConfig, documentsSlice);
export const store = configureStore({
  reducer: {
    documents: persistedReducer,
  },
  middleware: (getDefaultMiddleware) => [thunk],
});
export const persistor = persistStore(store);
