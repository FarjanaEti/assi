import { useContext } from "react";
import { FaBell, FaCoins } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import { GiTakeMyMoney } from "react-icons/gi";
import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";



const DashTop = () => {
  const [cart] = useCart();                  

    return (
    <header className="flex items-center justify-between bg-gray-100 p-4 shadow">
      {/* Logo */}
      <div className="text-2xl font-bold text-gray-800">
      <Link to={'/'} className="btn btn-ghost normal-case text-xl">
                    <GiTakeMyMoney className="text-yellow-500"></GiTakeMyMoney>
                              Earnify 
                    </Link>
      </div>

        {/* User Info  */}
        {cart.map((user, index) => (
        <div key={index} className="flex items-center gap-6">
          {/*  Coins */}
          <div className=" items-center gap-2 text-gray-600">
            <FaCoins className="text-yellow-500  ml-3 text-xl" />
            <span className="font-semibold">{user.coin} Coins</span>
          </div>

          {/* User Info */}
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium text-gray-800">
              {user.role || "Unknown Role"}
            </span>
            <span className="text-sm text-gray-600">
              {user.name || "Anonymous"}
            </span>
          </div>

          {/* User profile */}
          <img
            src={user.url || "https://ibb.co.com/55JfK0L"} 
            alt="User"
            className="w-10 h-10 rounded-full border border-gray-300"
          />

          {/* Notification */}
          <button className="p-2 text-gray-700 hover:text-gray-900">
            <FaBell className="text-2xl" />
          </button>
        </div>
      ))}

     
    </header>
  );
};
    

export default DashTop;