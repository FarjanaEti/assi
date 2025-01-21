import React from "react";
import img2 from '../../assets/home/find-1.avif';
import Lottie from "lottie-react";
import lottieAnimation from "../../assets/Animation - 1737481120887.json";

const FindJob = () => {
  return (
    <div
      className="search-section bg-cover bg-center mt-20 h-[500px] flex items-center"
      style={{ backgroundImage: `url(${img2})` }}
    >
        <div>
                              
      </div>                      
      <div className="content-container   w-full px-6">
        {/* Left Text */}
        <div className="text-container mr-6 text-white">
          <h1 className="text-3xl font-bold my-4">Find Your Dream Micro-Job in Earnify</h1>
          <p className="my-4">A micro job refers to a small, short-term task or assignment that is typically completed online in exchange for a small payment. These tasks are often simple, requiring minimal skills, and can be completed quickly.</p>
        </div>

        {/* Search Bar */}
        <div className="search-bar flex bg-white p-2 rounded shadow-md w-full max-w-3xl">
          {/* Dropdown */}
          <select
            className="dropdown bg-gray-200 text-gray-700 px-3 py-2 rounded-l-md focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="it">Data Entry and Processing</option>
            <option value="healthcare">Online Surveys and Market Research</option>
            <option value="finance">Writing and Editing</option>
            <option value="finance">Content Moderation and Tagging</option>
            <option value="finance">Graphic Design and Creative Tasks</option>
            <option value="finance">Testing and Quality Assurance</option>
            <option value="finance">Social Media and Marketing Tasks</option>
            {/* Add more categories */}
          </select>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search for jobs..."
            className="search-input flex-grow px-4 py-2 border-none focus:outline-none"
          />

          {/* Search Button */}
          <button
            className="search-button bg-cyan-300 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>
      <div className="text-center mt-28 lg:text-left h-96 md:w-[500px]">
      <Lottie animationData={lottieAnimation} loop autoplay />
                    </div>

                 
    </div>
  );
};

export default FindJob;
