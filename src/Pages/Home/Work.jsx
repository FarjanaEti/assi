import React from "react";
import { FaBriefcase, FaBell, FaDollarSign, FaWifi, FaShieldAlt } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { motion } from "motion/react";
import { easeOut } from 'motion';


const features = [
  {
    icon: FaBriefcase,
    title: "Explore Micro-Jobs",
    description: "Find and complete small tasks from anywhere to earn money on your schedule.",
  },
  {
    icon: FaBell,
    title: "Stay Updated",
    description: "Get instant notifications for new tasks and never miss an earning opportunity.",
  },
  {
    icon: FaDollarSign,
    title: "Track Your Earnings",
    description: "Keep a close eye on your balance and withdraw your earnings whenever you want.",
  },
  {
    icon: FaWifi,
    title: "Work Offline",
    description: "Accept tasks, work offline, and submit them when you're back online.",
  },
  {
    icon: FaShieldAlt,
    title: "Secure Payments",
    description: "All payments are processed securely, ensuring a worry-free experience.",
  },
  {
    icon: BiSupport,
    title: "Reliable Support",
    description: "Get dedicated support to assist you with any queries or issues you face.",
  },
];

const Workplace = () => {
  return (
    <div className="bg-gray-100 mt-10 py-16 px-6 text-center">
     
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Earn Through Micro-Jobs</h1>
           
      <p className="text-lg text-gray-600 mb-12">
        Discover a simple and flexible way to earn money by completing small tasks online or offline.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 transform transition-transform hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="text-4xl text-orange-500 mb-4">
              <feature.icon />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workplace;
