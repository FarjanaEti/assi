import { NavLink, Outlet } from "react-router-dom";
import { FaCoins, FaHome, FaTasks, FaUser, FaUtensils } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { MdAssuredWorkload } from "react-icons/md";
import DashTop from "../Pages/Dashboard/DashTop";
import useRole from "../hooks/useRole";

const Dashboard = () => {
    const [role] = useRole(); 
   console.log(role)
   //const role="Buyer"
  
   if (role === undefined) {
    return <div>Loading...</div>;
}

    return (
        <div className="flex flex-col">
              <div className=" py-8">
                {/* Dashboard Content */}
               <DashTop></DashTop>
            </div>   
            <div className="flex">
            <div className="w-64 min-h-screen px-8 border bg-orange-400 text-white">
                <ul className="menu p-4">
                    {role === "admin" ? (
                        <>
                        <li>
                                <NavLink to="/dashboard/adminHome">
                                    <FaHome></FaHome>
                                    Admin Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/users">
                                    <FaUser></FaUser>
                                    Manage Users</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageTask">
                                    <FaTasks></FaTasks>
                                    Manage Task</NavLink>
                            </li>
                        </>
                    ) : role === "Worker" ? (
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
                                <NavLink to="/dashboard/bookings">
                                <FaMoneyCheckDollar />
                                   Withdrawals</NavLink>
                            </li>
                       </>
                    ) : role === "Buyer" ? (
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
        </div>
    );
};

export default Dashboard;
