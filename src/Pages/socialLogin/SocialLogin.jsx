import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);

        const userInfo = {
          email: user?.email,
          name: user?.displayName,
          role: 'worker', 
          coin: 50,
        };
        axiosPublic
          .post('/users', userInfo)
          .then((res) => {
            console.log(res.data);
            navigate('/login'); 
          })
          .catch((error) => {
            console.error('Error storing user data:', error);
          });
      })
      .catch((error) => {
        console.error('Google sign-in failed:', error);
      });
  };

  return (
    <div className="p-8">
      <div className="divider"></div>
      <div>
        <button onClick={handleGoogleSignIn} className="btn">
          <FaGoogle className="mr-2" />
          Google
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
