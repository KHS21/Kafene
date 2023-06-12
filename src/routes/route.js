import { createBrowserRouter } from "react-router-dom";
import Home from "../components/loginPage/home";
import Order from "../components/order";

export const ROUTES = createBrowserRouter([
  {
    path: "/",
    element: <Home />,

    // path: "/order",
    // element: <Order />,
  },
]);
