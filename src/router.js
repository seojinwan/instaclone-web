import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./screen/Home";
import NotFound from "./screen/NotFound";
import SignUp from "./screen/SignUp";

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
    path: "/sign-up",
    element: <SignUp />,
  },
]);
