import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./screen/Home";
import NotFound from "./screen/NotFound";

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
]);
