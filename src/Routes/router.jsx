import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/Login/SignUp";
import Login from "../Pages/Login/Login";
import Dashboard from "../Layout/Dashboard";
import DashTop from "../Pages/Dashboard/DashTop";
import AddTask from "../Pages/Buyer/AddTask";
import BuyerTask from "../Pages/Buyer/BuyerTask";
import BuyerHome from "../Pages/Buyer/BuyerHome";
import Purchase from "../Pages/Buyer/Purchase";
import TaskList from "../Pages/Worker/TaskList";



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
          path:'buyerHome',
          element:<BuyerHome></BuyerHome>
        },
        {
          index: true, 
          element: <DashTop></DashTop>,
      },
        {
          path:'addTask',
          element:<AddTask></AddTask>
        },
        {
          path:'myTask',
          element:<BuyerTask></BuyerTask>
        },
        {
          path:'Purchase',
          element:<Purchase></Purchase>
        },
        {
          path:'taskList',
          element:<TaskList></TaskList>
        }
    ],
    }
  ]);