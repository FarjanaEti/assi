import React, { useState } from "react";
import useTask from "../../hooks/useTask";
import useSubmission from "../../hooks/useSubmission";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const BuyerHome = () => {
  const [task] = useTask();
  const [submission, refetch] = useSubmission();
  //console.log(refetch)
  const axiosSecure = useAxiosSecure();
  const [modal, setModal] = useState(null);

  //approve status
  const handleApprove = async (submission) => {
      try {
        const { data } = await axiosSecure.patch(`/submission/${submission._id}`, {
          status: "approved",
        });
    
        if (data.modifiedCount > 0) {
           Swal.fire({
              position: "top-end",
               icon: "success",
               title: "Approved by buyer.",
               showConfirmButton: false,
               timer: 1500,
             });
             refetch(); // Refetch the submissions to update the UI
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
      <h1 className="text-2xl font-bold mb-4">Buyer Dashboard</h1>

      {/* Heading */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-blue-100 rounded shadow">
          <h2 className="font-semibold">Total Tasks</h2>
          <p>{task.length}</p>
        </div>
        <div className="p-4 bg-green-100 rounded shadow">
          <h2 className="font-semibold">Pending Tasks</h2>
          <p>
            {task.reduce(
              (total, task) => total + (task.required_workers || 0),
              0
            )}
          </p>
        </div>
        <div className="p-4 bg-yellow-100 rounded shadow">
          <h2 className="font-semibold">Total Payment</h2>
          <button className="bg-gray-500 text-white px-4 py-2 rounded">
            Payment Info (Coming Soon)
          </button>
        </div>
      </div>

      {/* Table */}
      <h2 className="text-xl font-semibold mb-4">
        Task Submissions: {submission.length}
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
        <tbody>
          {submission.map((sub) =>
            sub.status === "pending" ? (
              <tr key={sub.id} className="border">
                <td className="px-10 border py-2">{sub.worker_name}</td>
                <td className="px-10 border py-2">{sub.task_title}</td>
                <td className="px-10 border py-2">${sub.payable_amount}</td>
                <td className="px-10 border py-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => setModal(sub)}
                  >
                    View Submission
                  </button>
                </td>
                <td className="px-10 py-2">
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
