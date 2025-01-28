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
      {/* Main container */}
      <div className="w-full px-6 xl:flex text-center items-center justify-between">
        
        {/* Left Text Section */}
        <div className="text-container mr-6 text-cyan-300 xl:text-white w-full xl:w-1/2">
          <h1 className="text-3xl font-bold my-4">Find Your Dream Micro-Job in Earnify</h1>
          <p className="my-4">
            A micro job refers to a small, short-term task or assignment that is typically completed online in exchange for a small payment. These tasks are often simple, requiring minimal skills, and can be completed quickly.
          </p>
          {/* Search Bar */}
          <div className="search-bar md:flex bg-white py-2   rounded shadow-md w-full max-w-4xl mx-auto">
            <select className="dropdown bg-gray-200 text-gray-700 px-3 py-2 rounded-l-md focus:outline-none">
              <option value="all">All Categories</option>
              <option value="it">Data Entry and Processing</option>
              <option value="healthcare">Online Surveys and Market Research</option>
              <option value="finance">Writing and Editing</option>
              <option value="finance">Content Moderation and Tagging</option>
              <option value="finance">Graphic Design and Creative Tasks</option>
              <option value="finance">Testing and Quality Assurance</option>
              <option value="finance">Social Media and Marketing Tasks</option>
            </select>
            <input
              type="text"
              placeholder="Search for jobs..."
              className="search-input flex-grow px-1 py-2 border-none focus:outline-none"
            />
            <button className="search-button bg-cyan-300 text-white px-4 py-2 rounded-r-md hover:bg-blue-600">
              Search
            </button>
          </div>
        </div>

        {/* Lottie Animation (Hidden on medium and above screens) */}
        <div className="hidden md:block w-full xl:w-1/2 text-center mt-10 xl:mt-0">
          <Lottie className="xl:h-72 md:h-56 h-44 mx-auto" animationData={lottieAnimation} loop autoplay />
        </div>
      </div>
    </div>
  );
};

export default FindJob;
