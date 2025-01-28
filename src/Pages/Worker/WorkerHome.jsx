import React from 'react';
import useTask from '../../hooks/useTask';
import useSubmission from '../../hooks/useSubmission';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../hooks/useAuth';

const WorkerHome = () => {
    const {user}=useAuth()
    const [tasks]=useTask();
    const {submission}=useSubmission()

    //all total
    const PendingSub = submission.filter(sub => sub.status === "pending").length;
    const earning = submission.filter(sub => sub.status === "approved")
        .reduce((sum, sub) => sum + sub.payable_amount, 0);
        const userSubmission = submission.filter((t) => t.
        worker_email === user.email);
        const approve = userSubmission.filter(sub => sub.status === "approved");
        console.log(userSubmission,approve)
     return (                         
  <div className="p-4">
     <Helmet>
                    <title>Earnify | DashBoard | Worker Home</title>
                </Helmet>
            <h2 className="text-xl font-bold mb-4">Worker Dashboard</h2>

            {/* Header */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-100 p-4 rounded">
                    <h3 className="text-lg font-semibold">Total submission</h3>
                    <p className="text-2xl">{approve.length}</p>
                </div>
                    <div className="bg-yellow-100 p-4 rounded">     
                    <h3 className="text-lg font-semibold">Total Pending submission</h3>
                    <p className="text-2xl">{PendingSub}</p>
                </div>
               
                <div className="bg-green-100 p-4 rounded">
                    <h3 className="text-lg font-semibold">Total Earning</h3>
                    <p className="text-2xl">${earning}</p>
                </div>
            </div>

            {/* Approve Table */}
            <h3 className="text-lg font-semibold mb-2">Approved approves</h3>
            <table className="table-auto w-full bg-white rounded shadow">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2">Task Title</th>
                        <th className="px-4 py-2">Payable Amount</th>
                        <th className="px-4 py-2">Buyer Name</th>
                        <th className="px-4 py-2">Status</th>
                    </tr>
                </thead>
                 <tbody>
                    {approve.map((approve, index) => (
                        <tr key={index} className="border">
                            <td className="px-10 border py-2">{approve.task_title}</td>
                            <td className="px-10 border py-2">${approve.payable_amount}</td>
                            <td className="px-10 border py-2">{approve.buyer_name}</td>
                            <td className="px-10 border py-2">{approve.status}</td>
                        </tr>
                    ))}
                </tbody> 
            </table>
        </div>
     );
};

export default WorkerHome;