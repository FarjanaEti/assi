import React, { useState } from "react";
import useTask from "../../hooks/useTask";
//import useSubmission from "../../hooks/useSubmission";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useUsers from "../../hooks/useUsers";
import useSubmission from "../../hooks/useSubmission";
import useAuth from "../../hooks/useAuth";


const BuyerHome = () => {
  const [task] = useTask();
  const {user}=useAuth();
  const [users]=useUsers()
  const {submission, refetch} = useSubmission();
  const axiosSecure = useAxiosSecure();
  const [modal, setModal] = useState(null);

  //total task
  const userTask = task.filter((t) => t.
    email === user.email);

 //total pay
  const totalPayment = submission.reduce((total, sub) => {
    return sub.status === "approved" ? total + sub.payable_amount : total;
  }, 0);
  //approve status
  const handleApprove = async (submission) => {
    console.log(submission)
    try {
      const { data } = await axiosSecure.patch(`/submission/${submission._id}`, {
        status: "approved",
      });
  
      if (data.modifiedCount > 0) {
        const worker = users.find(user => user.email === submission.worker_email);
      
        if (worker) {
          const WorkerCoin = (worker.coin || 0) + submission.payable_amount;
    
          console.log(WorkerCoin)
          // Update worker coins in the backend
          const coinUpdate = await axiosSecure.patch(`/user/coin/${worker._id}`, {
            coin: WorkerCoin,
          });
         
          if (coinUpdate.data.modifiedCount > 0) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Task approved and worker's coins updated.",
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          } else {
            console.error("Failed to update worker's coins in the backend.");
          }
        } else {
          console.error("Worker not found in the user list.");
        }
      }
    } catch (error) {
      console.error("Error approving submission:", error);
    }
    };
    
  //reject status
  const handleReject = async (submission) => {
      console.log(submission)
      try {
        const { data } = await axiosSecure.patch(`/submission/reject/${submission._id}`, {
          taskId: submission.task_id, 
        });
    
        if (data.modifiedCount > 0) {
            Swal.fire({
                  position: "top-end",
                   icon: "success",
                   title: "Rejected by buyer.",
                   showConfirmButton: false,
                   timer: 1500,
                 });
          refetch(); 
        }
      } catch (error) {
        console.error("Error rejecting submission:", error);
      }
    };
    

  return (
    <div className="container mx-auto p-4">
       <Helmet>
                      <title>Earnify | DashBoard |Buyer Home</title>
                  </Helmet>
      <h1 className="text-2xl font-bold mb-4">Buyer Dashboard</h1>

      {/* Heading */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-blue-100 rounded shadow">
          <h2 className="font-semibold">Total Tasks</h2>
          <p>{userTask.length}</p>
        </div>
        <div className="p-4 bg-green-100 rounded shadow">
          <h2 className="font-semibold">Pending Tasks</h2>
          <p>
            {userTask.reduce(
              (total, task) => total + (task.required_workers || 0),
              0
            )}
          </p>
        </div>
        <div className="p-4 bg-yellow-100 rounded shadow">
          <h2 className="font-semibold">Total Payment</h2>
          <p>${totalPayment.toFixed(2)}</p>
        </div>
      </div>

      {/* Table */}
      <h2 className="text-xl font-semibold mb-4">
        Task Submissions
      </h2>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="md:px-2 py-2">Worker Name</th>
            <th className="md:px-2 py-2">Task Title </th>
            <th className="md:px-4 py-2">Payable Amount</th>
            <th className="px-4 py-2">Details</th>
            <th className="md:px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {submission.map((sub) =>
            sub.status === "pending" ? (
              <tr key={sub.id} className="border">
                <td className=" border py-2">{sub.worker_name}</td>
                <td className="px-2 md:px-10 border py-2">{sub.task_title}</td>
                <td className="px-2 md:px-10 border py-2">${sub.payable_amount}</td>
                <td className="px-2 md:px-10 border py-2">
                  <button
                    className="bg-blue-500 text-white px-2 md:py-1 rounded mr-2"
                    onClick={() => setModal(sub)}
                  >
                    View Submission
                  </button>
                </td>
                <td className="px-2 md:px-10 py-2">
                  <button
                    className="bg-green-500 text-white px-4 py-1 rounded mr-2"
                    onClick={() => handleApprove(sub)}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-1 rounded"
                    onClick={() => handleReject(sub)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Submission Details</h2>
            <p>
              <strong>Task Title:</strong> {modal.task_title}
            </p>
            <p>
              <strong>Worker Name:</strong> {modal.worker_name}
            </p>
            <p>
              <strong>Payable Amount:</strong> ${modal.payable_amount}
            </p>
            <p>
              <strong>Status:</strong> {modal.status}
            </p>
            <p>
              <strong>Details:</strong> {modal.submission_details}
            </p>
            <div className="mt-4 text-right">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setModal(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerHome;
