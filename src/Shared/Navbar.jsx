import { Link } from "react-router-dom";
import { useContext } from "react";
import { GiTakeMyMoney } from "react-icons/gi";
import { AuthContext } from "../Provider/AuthProvider";
import 'animate.css';
import useCart from "../hooks/useCart";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);   
    const [users] = useCart();
    console.log(user);
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    };

    const navOptions = (
        <>
            <li className="inline-block mx-2"><Link to="/">Home</Link></li>  
            <li className="inline-block mx-2"><Link to="/api">API</Link></li>  
            {user && <li className="inline-block mx-2"><Link to="/dashboard">Dashboard</Link></li>} 
            {user && (
                <li className="inline-block mx-2">
                    <Link>
                        Available Coin: <span className="font-bold">{users[0]?.coin || 0}</span>
                    </Link>
                </li>
            )}
            {user ? (
                <li className="inline-block mx-2">
                    <button onClick={handleLogOut} className="">LogOut</button>
                </li>
            ) : (
                <>
                    <li className="inline-block mx-2"><Link to="/login">LogIn</Link></li>
                    <li className="inline-block mx-2"><Link to="/signup">SignUp</Link></li>
                </>
            )}
        </>
    );

    return (
        <div className="navbar max-w-screen-xl rounded-3xl bg-transparent fixed z-10 bg-opacity-30 bg-black shadow-sm md:px-10">
        {/* Navbar Start */}
        <div className="navbar-start">
            <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </label>
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-cyan-300 rounded-box w-52">
                    {navOptions}
                </ul>
            </div>
            <Link to={'/'} className="btn btn-ghost normal-case text-xl">
                <GiTakeMyMoney className="text-yellow-500 text-2xl" />
                <span className="animate__animated animate__pulse animate__infinite animate__delay-1s text-3xl">Earnify</span>
            </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
            <ul className="flex space-x-4">{navOptions}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end">
            {user ? (
                <img
                    src={user.
                        photoURL
                         || "https://picsum.photos/150"}
                    alt="user"
                    className="w-12 mr-1 h-10 rounded-full border"
                />
            ) : null}
            <Link className="btn-ghost mr-2" to={'https://github.com/'}>Join as Developer</Link>
        </div>
    </div>
      );
};

export default Navbar;
