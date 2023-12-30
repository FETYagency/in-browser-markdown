import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import "./index.css";
import Editor from "./routes/editor";
import { store, persistor } from "./services/sotre/store";
import { Provider } from "react-redux";
import { fetchDocuments } from "./services/sotre/features/documents";
import { action as drawerAction } from "./routes/root";
import { PersistGate } from "redux-persist/integration/react";
const ROUTES = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    action: drawerAction,
    children: [
      {
        path: "/:docId",
        element: <Editor />,
      },
    ],
  },
]);

async function start() {
  const { worker } = await import("./services/mocks/browser");
  return worker.start();
}
start().then(() => {
  const check = Object.values(store.getState().documents.entities).length > 0;
  const persistedData = check ? store.getState().documents.entities : {};
  store.dispatch(fetchDocuments(persistedData));
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={ROUTES} />
        </PersistGate>
      </Provider>
    </React.StrictMode>,
  );
});
