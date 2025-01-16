import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { FaCoins, FaHome, FaTasks, FaUser, FaUtensils } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { MdAssuredWorkload } from "react-icons/md";

const Dashboard = () => {
    const [ isLoading] = useAdmin(); // Get role and loading state
   const role="buyer"
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-xl font-semibold">Loading Role...</p>
            </div>
        );
    }

    return (
        <div >
              <div className="flex-1 py-8">
                {/* Dashboard Content */}
                <Outlet></Outlet>
            </div>                 
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
                    ) : role === "worker" ? (
                       <>
                       <li>
                                <NavLink to="/dashboard/adminHome">
                                    <FaHome></FaHome>
                                    Worker Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addItems">
                                    <FaTasks></FaTasks>
                                    Task List</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageItems">
                                <MdAssuredWorkload />
                                   My submission</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/bookings">
                                <FaMoneyCheckDollar />
                                   Withdrawals</NavLink>
                            </li>
                       </>
                    ) : role === "buyer" ? (
                       <>
                       <li>
                                <NavLink to="/dashboard/adminHome">
                                    <FaHome></FaHome>
                                   Buyer Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/addItems">
                                    <FaUtensils></FaUtensils>
                                    Add New task</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageItems">
                                    <FaTasks></FaTasks>
                                    My Task</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/bookings">
                                    <FaCoins></FaCoins>
                                    Purchase Coin</NavLink>
                            </li>
                            
                       </>
                    ) : (
                        <li>Default Navigation</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
