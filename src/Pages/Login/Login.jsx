import {  useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../Provider/AuthProvider';
import SocialLogin from '../socialLogin/SocialLogin';
import lotiieLogin from '../../assets/Animation - 1733900171268.json'
import Lottie from 'lottie-react';


const Login = () => {
    console.log(useContext(AuthContext));
    const [disabled, setDisabled] = useState(true);
    const { signIn } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
         if (!email || !password) {
        Swal.fire({
            title: 'Validation Error',
            text: 'Email and Password are required!',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
        return;
    }
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: 'User Login Successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                navigate(from, { replace: true });
            })
    }

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        }
        else {
            setDisabled(true)
        }
    }

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
                        <p className='font-semibold text-2xl my-3'>LogIn Here</p>
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
                                <label  className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleValidateCaptcha}  type="text" name="captcha" placeholder="type the captcha above" className="input input-bordered" />

                            </div>
                            <div className="form-control mt-6">
                              {/* To DO---- disabled={disabled} */}
                                <input  className="btn btn-primary" type="submit" value="Login" />
                            </div>
                        </form>
                        <p><small className='ml-10'>New Here? <Link to="/signup">Create an account</Link> </small></p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;