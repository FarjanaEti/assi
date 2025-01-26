import { div } from "motion/react-client";
import React from "react";
import { Link } from "react-router-dom";


const Purchase = () => {
  const packages = [
    { coins: 10, price: 1 },
    { coins: 150, price: 10 },
    { coins: 500, price: 20 },
    { coins: 1000, price: 35 },
  ];

  return (
    <div>
    <div className="p-4 bg-blue-100 rounded shadow ml-5 mb-3">
        <p className="text-3xl text-center">Purchases Coin</p>
      
      </div>
    <div className="coin-packages grid grid-cols-2 gap-6 ml-5">
      {packages.map((pkg, index) => (
        <div key={index} className="card p-6 border text-center rounded shadow-lg">
          <h2 className="text-xl font-bold">{pkg.coins} Coins</h2>
          <p className="text-gray-600">${pkg.price}</p>
          <Link to="/dashboard/payment" 
           state={{ price: pkg.price, coins: pkg.coins }}>
          <button
            className="mt-4 bg-cyan-100  py-2 px-4 rounded"
          >
            Buy Now
          </button>
          </Link>
         
        </div>
      ))}
    </div>
    </div>
  );
};

export default Purchase;
