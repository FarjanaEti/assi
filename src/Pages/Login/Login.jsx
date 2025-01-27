import { useContext, useEffect, useState } from "react";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from "react-simple-captcha";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Provider/AuthProvider";
import lotiieLogin from "../../assets/Animation - 1733900171268.json";
import Lottie from "lottie-react";
import { FaGoogle } from "react-icons/fa";
import useCart from "../../hooks/useCart";

const Login = () => {
    const [disabled, setDisabled] = useState(true);
    const { signIn, googleSignIn } = useContext(AuthContext);
    const [user] = useCart();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    // Role-based navigation after user data is loaded
    useEffect(() => {
        
        if (user && user[0]?.role) {
            const role = user[0]?.role;
            if (role === "admin") {
                navigate("/dashboard/adminHome");
            } else if (role === "buyer") {
                navigate("/dashboard/buyerHome");
            } else if (role === "worker") {
                navigate("/dashboard/workerHome");
            } else {
                navigate(from); 
            }
        }
    }, [user, navigate, from]);

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        if (!email || !password) {
            Swal.fire({
                title: "Validation Error",
                text: "Email and Password are required!",
                icon: "warning",
                confirmButtonText: "OK",
            });
            return;
        }

        signIn(email, password)
            .then((result) => {
                console.log("User Signed In:", result.user);
                Swal.fire({
                    title: "User Login Successful.",
                    showClass: { popup: "animate__animated animate__fadeInDown" },
                    hideClass: { popup: "animate__animated animate__fadeOutUp" },
                });
            })
            .catch((error) => {
                console.error(error);
                Swal.fire({
                    title: "Login Error",
                    text: error.message,
                    icon: "error",
                    confirmButtonText: "OK",
                });
            });
    };

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        setDisabled(!validateCaptcha(user_captcha_value));
    };

    const handleGoogleLogIn = () => {
        googleSignIn()
            .then((res) => {
                console.log("Google User:", res.user);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User logged in successfully.",
                    showConfirmButton: false,
                    timer: 1000,
                });
     const userRole = res.user?.role || 'worker'; 

      // Role-based navigation after Google login
      if (userRole === "admin") {
        navigate("/dashboard/adminHome");
      } else if (userRole === "worker") {
        navigate("/dashboard/workerHome");
      } else {
        navigate("/dashboard/buyerHome"); 
      }
            })
            .catch((err) => {
                console.error("Google Login Error:", err);
                Swal.fire({
                    title: "Google Login Failed",
                    text: err.message,
                    icon: "error",
                    confirmButtonText: "OK",
                });
            });
    };

    return (
        <>
            <Helmet>
                <title>Earnify | Login</title>
            </Helmet>
            <div className="hero pt-20 min-h-screen bg-base-200">
                <div className="hero-content flex-col md:flex-row-reverse">
                    <div className="text-center lg:text-left w-96">
                        <Lottie animationData={lotiieLogin}></Lottie>
                    </div>
                    <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <p className="font-semibold text-2xl my-3">LogIn Here</p>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input
                                    onBlur={handleValidateCaptcha}
                                    type="text"
                                    name="captcha"
                                    placeholder="type the captcha above"
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="form-control mt-6">
                                <input
                                 disabled={disabled} className="btn btn-primary" type="submit" value="Login" />
                            </div>
                        </form>
                        <div>
                            <button onClick={handleGoogleLogIn} className="btn ml-7 mb-3">
                                <FaGoogle></FaGoogle> LogIn With Google
                            </button>
                            <p>
                                <small className="ml-10">
                                    New Here? <Link to="/signup">Create an account</Link>
                                </small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
