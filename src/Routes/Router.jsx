import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import JoinAsEmployee from "../Pages/JoinForms/JoinAsEmployee";
import JoinAsHR from "../Pages/JoinForms/JoinAsHR";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "joinAsEmployee",
        element: <JoinAsEmployee></JoinAsEmployee>,
      },
      {
        path: "joinAsHR",
        element: <JoinAsHR></JoinAsHR>,
      },
    ],
  },
]);

export default Router;
