import React from 'react';
import useCart from '../../hooks/useCart';
import { MdEmail } from 'react-icons/md';
import { FaPhoneAlt } from 'react-icons/fa';
import { CiLocationOn } from 'react-icons/ci';
import { motion } from 'framer-motion';

const Profile = () => {
  const [userData] = useCart();
  const user = userData[0];
  console.log(user);

  return (
    <div className="max-w-md mx-auto mt-10">
      <motion.div
        className="relative rounded-2xl overflow-hidden shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div
          className="h-96 bg-cover bg-center"
          style={{
            backgroundImage: `url(${user.url || "https://i.ibb.co/sdvYSDjg/DALL-E-2025-02-05-02-51-40-A-professional-Git-Hub-profile-banner-featuring-a-circular-profile-image.webp"})`
          }}
        >
          <div className="absolute bottom-0 left-0 text-center w-full bg-gradient-to-t from-black to-transparent p-4 text-white">
            <h2 className="text-3xl font-bold">{user.name}</h2>
            <p className="text-xl justify-center flex items-center gap-2">
              <MdEmail className="text-blue-400" /> {user.email}
            </p>
            <p className="text-xl justify-center flex items-center gap-2">
              <FaPhoneAlt className="text-green-400" /> 17456256789
            </p>
            <p className="text-xl justify-center flex items-center gap-2">
              <CiLocationOn className="text-red-400" /> Dhaka, Bangladesh
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
