import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../socialLogin/SocialLogin";
import Lottie from "lottie-react";
import lottieAnimation from "../../assets/Animation - 1733851369003.json";
import { FaGoogle } from "react-icons/fa";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            // Upload the image into Imagebb
            const imageFile = { image: data.photoURL[0] }; // Assuming photoURL is the file input
            let uploadedImageUrl = "";

            if (imageFile) {
                const res = await axiosPublic.post(image_hosting_api, imageFile, {
                    headers: { "content-type": "multipart/form-data" },
                });
                if (res.data.success) {
                    uploadedImageUrl = res.data.data.display_url;
                } else {
                    throw new Error("Image upload failed");
                }
            }

            const result = await createUser(data.email, data.password);
            const loggedUser = result.user;

            await updateUserProfile(data.name, uploadedImageUrl || data.photoURL); // Use uploaded image URL if successful

            const userInfo = {
                name: data.name,
                email: data.email,
                url: uploadedImageUrl || data.photoURL, // Use uploaded image URL or original photo URL
                role: data.role,
                coin: data.role === "worker" ? 10 : 50,
            };

            const res = await axiosPublic.post("/users", userInfo);
            if (res.data.insertedId) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User created successfully.",
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate("/login");
            }
        } catch (error) {
            console.error("Error signing up user:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message || "Something went wrong. Please try again.",
            });
        }
    };

    //google signup
    const handleGoogleLogin = () => {
        googleSignIn()
          .then((res) => {
            const user = res.user;
            if (!user?.email || !user?.displayName) {
              throw new Error('Missing essential user data from Google login');
            }
    
            const userInfo = {
              email: user?.email,
              name: user?.displayName,
              photoURL: user?.photoURL || 'default-image-url',  // Default fallback
              role: 'worker',  
              coin: 50,         
            };
    
            console.log('Sending user data to backend:', userInfo);
    
            axiosPublic
              .post('/users', userInfo)
              .then((res) => {
                console.log('User data stored:', res.data);
                navigate('/login');
              })
              .catch((error) => {
                console.error('Error storing user data:', error);
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: error.response?.data?.message || error.message,
                });
              });
          })
          .catch((err) => {
            console.error('Google login failed:', err);
            Swal.fire({
              icon: 'error',
              title: 'Google Login Failed',
              text: err.message || 'Something went wrong with Google sign-in.',
            });
          });
    };
    

    return (
        <>
            <Helmet>
                <title>Earnify | Sign Up</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200 pt-20">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left h-96 md:w-[500px]">
                        <Lottie animationData={lottieAnimation} loop autoplay />
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <h2 className="text-2xl font-semibold my-3">Register Here</h2>
                            
                            {/* Name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("name", { required: "Name is required" })}
                                    placeholder="Name"
                                    className="input input-bordered"
                                />
                                {errors.name && <span className="text-red-600">{errors.name.message}</span>}
                            </div>

                            {/* Photo URL (Upload Image) */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Profile Image (Upload to ImageBB)</span>
                                </label>
                                <input
                                    type="file"
                                    {...register("photoURL", { required: "Profile image is required" })}
                                    className="file-input w-full max-w-xs"
                                />
                                {errors.photoURL && <span className="text-red-600">{errors.photoURL.message}</span>}
                            </div>

                            {/* Email */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    {...register("email", { required: "Email is required" })}
                                    placeholder="Email"
                                    className="input input-bordered"
                                />
                                {errors.email && <span className="text-red-600">{errors.email.message}</span>}
                            </div>

                            {/* Password */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Password must be at least 6 characters" },
                                        maxLength: { value: 20, message: "Password must be less than 20 characters" },
                                        pattern: {
                                            value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                                            message:
                                                "Password must include uppercase, lowercase, number, and special character",
                                        },
                                    })}
                                    placeholder="Password"
                                    className="input input-bordered"
                                />
                                {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                            </div>

                            {/* Role */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Select Role</span>
                                </label>
                                <select
                                    {...register("role", { required: "Role is required" })}
                                    className="select select-bordered"
                                >
                                    <option value="worker">Worker</option>
                                    <option value="buyer">Buyer</option>
                                </select>
                                {errors.role && <span className="text-red-600">{errors.role.message}</span>}
                            </div>

                            {/* Submit Button */}
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">
                                    Register
                                </button>
                            </div>
                        </form>

                        <div className="divider">OR</div>

                        <div className="card-body">
                            <button onClick={handleGoogleLogin} className="btn btn-outline btn-primary">
                                <FaGoogle className="mr-2" />
                                Sign up with Google
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;