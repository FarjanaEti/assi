import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Shared/Navbar';

const Main = () => {
    return (
        <div className="w-full overflow-hidden">
          <Navbar />
          <div className="pt-16 px-5 overflow-hidden">
            <Outlet />
          </div>
        </div>
      );
};

export default Main;