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
    <div className="coin-packages grid grid-cols-2 gap-6">
      {packages.map((pkg, index) => (
        <div key={index} className="card p-6 border rounded shadow-lg">
          <h2 className="text-xl font-bold">{pkg.coins} Coins</h2>
          <p className="text-gray-600">${pkg.price}</p>
          <Link to="/dashboard/payment">
          <button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Buy Now
          </button>
          </Link>
         
        </div>
      ))}
    </div>
  );
};

export default Purchase;
