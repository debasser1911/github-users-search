import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter } from "react-router-dom";
import UserSearchPage from "./pages/UserSearchPage";
import UserPage from "./pages/UserPage";
import { RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserSearchPage />,
  },
  {
    path: "user/:userLogin",
    element: <UserPage />,
  },
]);

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById("root")
);
