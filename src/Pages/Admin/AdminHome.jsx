import React from 'react';
import useTask from '../../hooks/useTask';
import useSubmission from '../../hooks/useSubmission';
import useUsers from '../../hooks/useUsers';

const AdminHome = () => {
    const [task]=useTask();
    const [submission]=useSubmission();
    const [users]=useUsers();     
    console.log(users)      
    
    //total
    const Workers = users.filter(user => user.role === "Worker").length;
    const Buyers = users.filter(user => user.role === "Buyer").length;
    const Coin = users.reduce((sum, user) => sum + user.coin, 0);
   // const totalPayments = withdrawRequests.reduce((sum, req) => sum + req.amount, 0);
 return (
  <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Home</h1>

      {/* Heading */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-blue-100 rounded shadow">
          <h2 className="font-semibold">Total Worker :{Workers}</h2>    
        </div>
        <div className="p-4 bg-green-100 rounded shadow">
          <h2 className="font-semibold">Total Buyer:{Buyers}</h2>
         
        </div>
        <div className="p-4 bg-yellow-100 rounded shadow">
          <h2 className="font-semibold">Total Coin: {Coin}</h2>
        </div>
        <div className="p-4 bg-teal-100 rounded shadow">
          <h2 className="font-semibold">Total Payment</h2>
        </div>
      </div>

      {/* Table */}
      <h2 className="text-xl font-semibold mb-4">
        Task Submissions: 
      </h2>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Worker Name</th>
            <th className="px-4 py-2">Task Title</th>
            <th className="px-4 py-2">Payable Amount</th>
            <th className="px-4 py-2">Details</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
       
      </table>
    </div>
  );
};

export default AdminHome;