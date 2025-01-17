import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import JoinAsEmployee from "../Pages/JoinForms/JoinAsEmployee";
import JoinAsHR from "../Pages/JoinForms/JoinAsHR";
import Login from "../Pages/JoinForms/Login";
import Register from "../Pages/JoinForms/Register";
import ErrorPage from "../SharedComponents/ErrorPage";
import AllUsers from "../Pages/Admin/allUsers";

const Router = createBrowserRouter([
  {
    errorElement: <ErrorPage></ErrorPage>,
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
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "allUsers",
        element: <AllUsers></AllUsers>,
      },
    ],
  },
]);

export default Router;
