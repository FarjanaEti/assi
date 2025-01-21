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
import TaskDetails from "../Pages/Worker/TaskDetails";
import MySubmissions from "../Pages/Worker/MySubmission";
import WorkerHome from "../Pages/Worker/WorkerHome";
import AdminHome from "../Pages/Admin/AdminHome";
import AllUsers from "../Pages/Admin/AllUsers";
import AllTask from "../Pages/Admin/AllTask";



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
        //Admin
        {
       path:'adminHome',
       element:<AdminHome></AdminHome>
        },
        {
         path:'allUsers',
         element:<AllUsers></AllUsers>
        },
        {
        path:'allTask',
        element:<AllTask></AllTask>
        },
       //Buyer
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
        //worker
        {
       path:'workerHome',
       element:<WorkerHome></WorkerHome>
        },
        {
          path:'taskList',
          element:<TaskList></TaskList>
        },
        {
          path:'tasks/:id',
          element:<TaskDetails></TaskDetails>
        },
        {
          path:'mySubmission',
          element:<MySubmissions></MySubmissions>
        }
    ],
    }
  ]);