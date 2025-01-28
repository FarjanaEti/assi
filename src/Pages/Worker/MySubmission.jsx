import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";

const MySubmissions = () => {
  const { user } = useContext(AuthContext);
  const [submissions, setSubmissions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Fetch all submissions initially
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch(
          `https://assignment-12-server-beta-one.vercel.app/submission?email=${user.email}`
        );
        const data = await response.json();
        setSubmissions(data);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };

    if (user?.email) {
      fetchSubmissions();
    }
  }, [user?.email]);

  // Calculate pagination
  const totalItems = submissions.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSubmissions = submissions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-5">
      <Helmet>
        <title>Earnify | DashBoard | Worker Home</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-4">My Submissions</h1>
      {currentSubmissions.length > 0 ? (
        <>
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 p-2">Task Title</th>
                <th className="border border-gray-200 p-2">Submission Details</th>
                <th className="border border-gray-200 p-2">Payable Amount</th>
                <th className="border border-gray-200 p-2">Status</th>
                <th className="border border-gray-200 p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {currentSubmissions.map((submission) => (
                <tr key={submission._id}>
                  <td className="border border-gray-200 p-2">
                    {submission.task_title}
                  </td>
                  <td className="border border-gray-200 p-2">
                    {submission.submission_details}
                  </td>
                  <td className="border border-gray-200 p-2">
                    ${submission.payable_amount}
                  </td>
                  <td
                    className={`border border-gray-200 p-2 font-medium ${
                      submission.status === "pending"
                        ? "text-yellow-500"
                        : submission.status === "approved"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {submission.status}
                  </td>
                  <td className="border border-gray-200 p-2">
                    {new Date(submission.submitted_date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="pagination flex justify-center mt-4 space-x-2">
            <button
              className={`px-4 py-2 border rounded ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page}
                className={`px-4 py-2 border rounded ${
                  currentPage === page + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => handlePageChange(page + 1)}
              >
                {page + 1}
              </button>
            ))}
            <button
              className={`px-4 py-2 border rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="border px-2 py-1 rounded"
            >
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
        </>
      ) : (
        <p>No submissions found.</p>
      )}
    </div>
  );
};

export default MySubmissions;
