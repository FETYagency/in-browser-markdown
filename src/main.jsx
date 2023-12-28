import React from "react";
import ReactDOM from "react-dom/client";
import { Await, createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import "./index.css";
import Editor from "./routes/editor";
import store from "./services/sotre/store";
import { Provider } from "react-redux";
import { fetchDocuments } from "./services/sotre/features/documents";
import { action as drawerAction } from "./routes/root";
const ROUTES = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    action: drawerAction,
    children: [
      {
        path: "/:docId",
        element: <Editor />,
        action: drawerAction,
      },
    ],
  },
]);

async function start() {
  const { worker } = await import("./services/mocks/browser");
  return worker.start();
}
start().then(() => {
  store.dispatch(fetchDocuments());
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={ROUTES} />
      </Provider>
    </React.StrictMode>,
  );
});
