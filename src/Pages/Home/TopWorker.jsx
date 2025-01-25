import React from "react";
import useUsers from "../../hooks/useUsers";

const TopWorker = () => {
  const [users] = useUsers(); 
  const bestWorker = users
    .filter((user) => user.role === "worker") 
    .sort((a, b) => b.coin - a.coin)
    .slice(0, 6); 

  return (
    <div>  
       <div className='relative -mt-16 w-full h-72 flex items-center justify-center overflow-hidden'>
        <div className='absolute w-full h-14 rounded-2xl bg-cyan-200 rotate-3'></div>
        <div className='absolute w-full h-14 rounded-2xl bg-fuchsia-100 -rotate-3'></div>

        <div className='relative z-10 text-2xl text-center text-white'>
        <h1 className="text-black">Our Top 6 Workers</h1>
       
        </div>
      </div>                       
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bestWorker.map((worker) => (
                             
          <div
            key={worker._id}
            className="p-4 shadow-lg rounded-lg bg-cyan-100 text-center"
          >
            <img
              src={worker.url || "https://picsum.photos/150"}
              alt={worker.name}
              className="h-32 w-32 mx-auto rounded-full object-cover"
            />
            <h3 className="text-xl font-semibold mt-4">{worker.name}</h3>
            <h3 className=" font-semibold mt-2">{worker.email}</h3>
            <p className="text-gray-600 mt-2">
              Coins: <span className="font-bold">{worker.coin}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopWorker;
