import { Navigate, createBrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import View from "./pages/View";
import Info from "./pages/Info";

export default createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/register"} replace={true} />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/view",
    element: <View />,
  },
  {
    path: "/info",
    element: <Info />,
  },
  {
    path: "*",
    element: <Navigate to={"/register"} replace={true} />,
  },
]);
