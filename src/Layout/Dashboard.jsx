import { NavLink, Outlet } from "react-router-dom";
import { FaCoins, FaHome, FaTasks, FaUser, FaUtensils } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { MdAssuredWorkload } from "react-icons/md";
import DashTop from "../Pages/Dashboard/DashTop";
import useRole from "../hooks/useRole";
import { Helmet } from "react-helmet-async";
import History from "../Pages/Buyer/History";

const Dashboard = () => {
    const [role] = useRole(); 
    console.log(role)
  
   if (role === undefined) {
    return <div>Loading...</div>;
      }

    return (
        <div className="flex flex-col">
            <Helmet>
                <title>Earnify | DashBoard</title>
            </Helmet>
              <div className=" py-8">
                {/* Dashboard Content */}
               <DashTop></DashTop>
            </div>   
            <div className="lg:flex">
            <div className="lg:w-64 w-full lg:min-h-screen px-8 border bg-cyan-300 text-white">
                <ul className="menu p-4">
                    {role === "admin" ? (
                        <>
                        <li>
                                <NavLink to="/dashboard/adminHome">
                                    <FaHome></FaHome>
                                    Admin Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allUsers">
                                    <FaUser></FaUser>
                                    Manage Users</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allTask">
                                    <FaTasks></FaTasks>
                                    Manage Task</NavLink>
                            </li>
                            <li>
            <NavLink to="/dashboard/profile">
                <FaUser />
                Profile
            </NavLink>
        </li>
                        </>
                    ) : role === "worker" ? (
                       <>
                       <li>
                                <NavLink to="/dashboard/workerHome">
                                    <FaHome></FaHome>
                                    Worker Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/taskList">
                                    <FaTasks></FaTasks>
                                    Task List</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/mySubmission">
                                <MdAssuredWorkload />
                                   My submission</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/withdraw">
                                <FaMoneyCheckDollar />
                                   Withdrawals</NavLink>
                            </li>
                            <li>
            <NavLink to="/dashboard/profile">
                <FaUser />
                Profile
            </NavLink>
        </li>
                       </>
                    ) : role === "buyer" ? (
                       <>
                       <li>
                                <NavLink to="/dashboard/buyerHome">
                                    <FaHome></FaHome>
                                   Buyer Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addTask">
                                    <FaTasks></FaTasks>
                                    Add New task</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/myTask">
                                    <FaTasks></FaTasks>
                                    My Task</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/Purchase">
                                    <FaCoins></FaCoins>
                                    Purchase Coin</NavLink>
                            </li>
                            <li>
            <NavLink to="/dashboard/profile">
                <FaUser />
                Profile
            </NavLink>
        </li>
                       </>
                    ) : (
                        <li>Default Navigation</li>
                    )}
                </ul>
            </div>
            <div className="flex-1 py-8">
                
                <Outlet></Outlet>
            </div>
            </div>   
               {
                role === "buyer" ? <History></History>  :<></>
               } 
                     
        </div>
    );
};

export default Dashboard;
