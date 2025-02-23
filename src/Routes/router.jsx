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
import Payment from "../Pages/Buyer/Payment";
import PrivateRout from "./PrivateRoute";
import AdminRout from "./AdminRout";
import { History } from "swiper/modules";
import Withdraw from "../Pages/Worker/Withdraw";
import Error from "../Component/Error";
import Api from "../Component/Api";
import Profile from "../Pages/Home/Profile";



  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<Error></Error>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/api',
            element: <Api></Api>
        },
        {
         path:'/signup',
         element:<SignUp></SignUp>
        },
        {
          path:'/login',
          element:<Login></Login>
        },
        
      ]
    },
    {
      path:'dashboard',
      element:<PrivateRout><Dashboard></Dashboard></PrivateRout> ,
      children: [
        {
        path:'payment',
        element:<Payment></Payment>
        },
        {
          path:'profile',
          element:<Profile></Profile>
        },
        //Admin
        {
       path:'adminHome',
       element:<AdminRout><AdminHome></AdminHome></AdminRout>
        },
        {
         path:'allUsers',
         element:<AdminRout><AllUsers></AllUsers></AdminRout> 
        },
        {
        path:'allTask',
        element: <AdminRout><AllTask></AllTask></AdminRout>
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
        {
          path:'history',
          element:<History></History>
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
        },
        {
          path:'withdraw',
          element:<Withdraw></Withdraw>
        }
    ],
    
    },
    
  ]);