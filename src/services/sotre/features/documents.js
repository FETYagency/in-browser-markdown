import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { compareDesc } from "date-fns";

export const fetchDocuments = createAsyncThunk(
  "fetchDoocuments",
  async (persistedData) => {
    const enteties = Object.values(persistedData);
    let request;
    if (enteties.length > 0) {
      request = await fetch("/apiMocks/sync/documents", {
        method: "POST",
        body: JSON.stringify(enteties),
      });
    } else {
      request = await fetch("/apiMocks/documents", { method: "GET" });
    }
    const resp = await request.json();
    return resp;
  },
);
export const deleteDocument = createAsyncThunk(
  "deleteDocument",
  async ({ docId }) => {
    const request = await fetch(`/apiMocks/destroy/${docId}`, {
      method: "DELETE",
    });
    const resp = await request.text();
    return resp;
  },
);
export const updateDocument = createAsyncThunk(
  "updateDocument",
  async ({ name, docId: params, content }) => {
    const request = await fetch(`apiMocks/update/${params}`, {
      method: "PATCH",
      body: JSON.stringify({ name, content }),
    });
    const resp = await request.json();
    return resp;
  },
);
export const createDocument = createAsyncThunk("createDocument", async () => {
  const request = await fetch("/apiMocks/create/document", { method: "POST" });
  const resp = await request.json();
  return resp;
});

const normalization = createEntityAdapter({
  sortComparer: (a, b) => compareDesc(a.createdAt, b.createdAt),
});
let initialState = normalization.getInitialState({
  loader: "idle",
});
const documents = createSlice({
  name: "documents",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.loader = "pending";
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.loader = "success";
        normalization.upsertMany(state, action.payload);
      })
      .addCase(updateDocument.fulfilled, (state, action) => {
        normalization.upsertOne(state, action.payload);
      })
      .addCase(createDocument.fulfilled, (state, action) => {
        normalization.addOne(state, action.payload);
      })
      .addCase(deleteDocument.fulfilled, (state, action) => {
        normalization.removeOne(state, action.payload);
      });
  },
});
export default documents.reducer;
export const loaderStateSelector = (state) => state.documents.loader;
export const {
  selectAll: selectAllDocuments,
  selectById: selectDocumentById,
  selectIds: selectDocumentIds,
} = normalization.getSelectors((state) => state.documents);
