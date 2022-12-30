import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import routes from "./routes";

import NotFound from "../screen/NotFound";
import SignUp from "../screen/SignUp";
import Home from "../screen/Home";

export default createBrowserRouter([
  {
    path: routes.home,
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "signUp",
        element: <SignUp />,
      },
    ],
    errorElement: <NotFound />,
  },
]);
