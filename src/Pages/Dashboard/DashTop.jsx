import { useContext } from "react";
import { FaBell, FaCoins } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import { GiTakeMyMoney } from "react-icons/gi";
import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";



const DashTop = () => {
  const [cart] = useCart(); 
  console.log(cart.length)                      
  const {user}=useContext(AuthContext);
  console.log(user)
    return (
    <header className="flex items-center justify-between bg-gray-100 p-4 shadow">
      {/* Logo */}
      <div className="text-2xl font-bold text-gray-800">
      <Link to={'/'} className="btn btn-ghost normal-case text-xl">
                    <GiTakeMyMoney className="text-yellow-500"></GiTakeMyMoney>
                              Earnify
                    </Link>
      </div>

      {/* User Info and Notifications */}
      <div className="flex items-center gap-6">
        {/* Available Coins */}
        <div className="flex items-center gap-2 text-gray-600">
          <FaCoins className="text-yellow-500 text-xl" />
          <span className="font-semibold"> Coins</span>
        </div>

        {/* User Info */}
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium text-gray-800">worker</span>
          <span className="text-sm text-gray-600">eti</span>
        </div>
        <img
          src={ '' }
          alt="User"
          className="w-10 h-10 rounded-full border border-gray-300"
        />

        {/* Notification Bell */}
        <button className="p-2 text-gray-700 hover:text-gray-900">
          <FaBell className="text-2xl" />
        </button>
      </div>
    </header>
  );
};
    

export default DashTop;