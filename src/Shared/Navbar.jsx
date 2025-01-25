import { Link } from "react-router-dom";
 import { useContext } from "react";
import { GiTakeMyMoney } from "react-icons/gi";
import { AuthContext } from "../Provider/AuthProvider";
import 'animate.css';
import useCart from "../hooks/useCart";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);   
    const [users]=useCart()
    console.log(user)
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }
    const navOptions = <>
    <li><Link to="/">Home</Link></li>  
    {user && <li><Link to="/dashboard">Dashboard</Link></li>} 
    {user && <li><Link>Available Coin:
    
    
     <span className="font-bold">{users[0]?.coin || 0}</span></Link></li>} 
    {
        user ?  
            <button onClick={handleLogOut} className="">LogOut</button>
             : (
            <>
                <li><Link to="/login">LogIn</Link></li>
                <li><Link to="/signup">SignUp</Link></li>
            </>
        )
    }
</>;

    return (
        <>
            <div className="navbar fixed z-10 bg-opacity-30 max-w-screen-xl bg-black text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <Link to={'/'} className="btn btn-ghost normal-case text-xl">
                    <GiTakeMyMoney className="text-yellow-500  text-2xl"></GiTakeMyMoney>
                               <span className="animate__animated animate__pulse animate__infinite animate__delay-1s text-3xl">Earnify</span>
                    </Link>
                    
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    {/* User Profile Image */}
                    {user? <img
              src={user.url ||  "https://picsum.photos/150"}
              alt="user"
              className="w-12 h-10 rounded-full border"
            /> : <></> }
                <Link className="btn" to={'https://github.com/'}>Join as Developer</Link>
                  
                </div>
            </div>
        </>
    );
};

export default Navbar;