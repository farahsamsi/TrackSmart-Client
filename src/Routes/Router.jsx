import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home";
import JoinAsEmployee from "../Pages/JoinForms/JoinAsEmployee";
import JoinAsHR from "../Pages/JoinForms/JoinAsHR";
import Login from "../Pages/JoinForms/Login";
import Register from "../Pages/JoinForms/Register";
import ErrorPage from "../SharedComponents/ErrorPage";
import AllUsers from "../Pages/Admin/allUsers";
import Payment from "../Pages/Payment/Payment";
import ProfilePage from "../SharedComponents/ProfilePage";
import PrivateRoute from "./PrivateRoute";
import AddEmployee from "../Pages/HRpages/AddEmployee";
import MyEmployees from "../Pages/HRpages/MyEmployees";
import IncreaseLimit from "../Pages/HRpages/IncreaseLimit";
import MyTeam from "../Pages/EmployeePages/MyTeam";
import AddAsset from "../Pages/HRpages/AddAsset";
import AllAsset from "../Pages/HRpages/AllAsset";
import ReqAsset from "../Pages/EmployeePages/ReqAsset";
import MyAssets from "../Pages/EmployeePages/MyAssets";
import AllRequests from "../Pages/HRpages/AllRequests";
import ApprovalDoc from "../Pages/EmployeePages/ApprovalDoc/ApprovalDoc";

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
        path: "payment",
        element: <Payment></Payment>,
      },

      // private routes
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <ProfilePage></ProfilePage>
          </PrivateRoute>
        ),
      },

      // Employee routes
      {
        path: "myTeam",
        element: (
          <PrivateRoute>
            <MyTeam></MyTeam>
          </PrivateRoute>
        ),
      },
      {
        path: "assets",
        element: (
          <PrivateRoute>
            <ReqAsset></ReqAsset>
          </PrivateRoute>
        ),
      },
      {
        path: "myAssets",
        element: (
          <PrivateRoute>
            <MyAssets></MyAssets>
          </PrivateRoute>
        ),
      },
      {
        path: "approvalDoc/:id",
        element: (
          <PrivateRoute>
            <ApprovalDoc></ApprovalDoc>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/reqAsset/${params.id}`),
      },

      // HR routes
      {
        path: "addEmployee",
        element: (
          <PrivateRoute>
            <AddEmployee></AddEmployee>
          </PrivateRoute>
        ),
      },
      {
        path: "myEmployee",
        element: (
          <PrivateRoute>
            <MyEmployees></MyEmployees>
          </PrivateRoute>
        ),
      },
      {
        path: "increaseLimit",
        element: (
          <PrivateRoute>
            <IncreaseLimit></IncreaseLimit>
          </PrivateRoute>
        ),
      },
      {
        path: "addAsset",
        element: (
          <PrivateRoute>
            <AddAsset></AddAsset>
          </PrivateRoute>
        ),
      },
      {
        path: "allAsset",
        element: (
          <PrivateRoute>
            <AllAsset></AllAsset>
          </PrivateRoute>
        ),
      },
      {
        path: "allRequest",
        element: (
          <PrivateRoute>
            <AllRequests></AllRequests>
          </PrivateRoute>
        ),
      },

      // admin routes
      // TODO: secure these
      {
        path: "allUsers",
        element: <AllUsers></AllUsers>,
      },
    ],
  },
]);

export default Router;
