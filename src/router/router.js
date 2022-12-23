import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import routes from "./routes";

import NotFound from "../screen/NotFound";
import SignUp from "../screen/SignUp";
import Login from "../screen/Login";
import Home from "../screen/Home";
import Auth from "../screen/Auth";

export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
    errorElement: <NotFound />,
  },
  {
    path: "auth",
    element: <Auth />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
  },
]);
