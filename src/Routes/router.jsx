import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/Login/SignUp";
import Login from "../Pages/Login/Login";
import Dashboard from "../Layout/Dashboard";
import DashTop from "../Pages/Dashboard/DashTop";



  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
         path:'/signup',
         element:<SignUp></SignUp>
        },
        {
          path:'/login',
          element:<Login></Login>
        }
      ]
    },
    {
      path:'dashboard',
      element:<Dashboard></Dashboard>,
      children: [
        {
            index: true, 
            element: <DashTop></DashTop>,
        },
        {
            path: "dashTop",
            element: <DashTop></DashTop>,
        },
    ],
    }
  ]);