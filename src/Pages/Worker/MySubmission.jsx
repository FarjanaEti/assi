import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";


const MySubmissions = () => {
  const { user } = useContext(AuthContext);
  const [submissions, setSubmissions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalSubmissions, setTotalSubmissions] = useState(0);

  const numberOfPages = Math.ceil(totalSubmissions / itemsPerPage);

  useEffect(() => {
    const fetchSubmissions = async () => {

      try {
        //for paging
//         const response = await fetch(
//                               `http://localhost:5000/submission?email=${user.email}&page=${currentPage}&size=${itemsPerPage}`
//                             );
//                             const data = await response.json();
//                             setSubmissions(data.submissions);
//                             setTotalSubmissions(data.totalCount);                      
        const response = await fetch(
          `http://localhost:5000/submission?email=${user.email}`
        );
        const data = await response.json();
        setSubmissions(data);
       // setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };

    if (user?.email) {
      fetchSubmissions();
    }
  }, [user?.email, currentPage]);
  //To DOO
//   const handleItemsPerPage = (e) => {
//     const val = parseInt(e.target.value);
//     setItemsPerPage(val);
//     setCurrentPage(0);
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 0) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < numberOfPages - 1) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">My Submissions</h1>
      {submissions.length > 0 ? (
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
              {submissions.map((submission) => (
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
                    {new Date(submission.current_date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="pagination flex justify-center mt-4 space-x-2">
            <button
              className={`px-4 py-2 border rounded ${
                currentPage === 0
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              //onClick={handlePrevPage}
              disabled={currentPage === 0}
            >
              Prev
            </button>
            {[...Array(numberOfPages).keys()].map((page) => (
              <button
                key={page}
                className={`px-4 py-2 border rounded ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page + 1}
              </button>
            ))}
            <button
              className={`px-4 py-2 border rounded ${
                currentPage === numberOfPages - 1
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
             // onClick={handleNextPage}
              disabled={currentPage === numberOfPages - 1}
            >
              Next
            </button>
            <select
              value={itemsPerPage}
              //onChange={handleItemsPerPage}
              className="border px-2 py-1 rounded"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
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
