import { configureStore } from "@reduxjs/toolkit";
import documentsSlice from "./features/documents";
const store = configureStore({
  reducer: {
    documents: documentsSlice,
  },
});
export default store;
