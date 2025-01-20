import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const TaskDetails = () => {
     const { id } = useParams();   
     const axiosPublic=useAxiosPublic()                        
  const {user}=useContext(AuthContext)
  const [task, setTask] = useState();
  console.log(task)
  const [submission, setSubmission] = useState("");
   
   useEffect(() => {
    const idTask = async () => {
      try {
        const response = await fetch(`http://localhost:5000/tasks/${id}`);
        const data = await response.json();
        setTask(data);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    idTask();
  }, [id]);
  
  const handleSubmit = async (e) => {
     try{                        
    e.preventDefault();
    const submittedData = {
    task_id: task._id,
    task_title: task.task_title,
    payable_amount: task.payable_amount,
    submission_details: submission,
    submission_info: task.submission_info,
    worker_email: user.email, 
    worker_name: user.displayName,
    buyer_name: task.name,
    buyer_email: task.email,
    submitted_date: new Date().toISOString(),
    status: "pending",
  };
  console.log(submittedData)
  
    // Save the submission to the database
    const res = await axiosPublic.post("/submission", submittedData);
               if (res.data.insertedId) {
                  // reset();
                   Swal.fire({
                       position: "top-end",
                       icon: "success",
                       title: "Task submitted successfully.",
                       showConfirmButton: false,
                       timer: 1500,
                   });
                  
               }
           } catch (error) {
               console.error("Error signing up user:", error);
               Swal.fire({
                   icon: "error",
                   title: "Oops...",
                   text: error.message || "Something went wrong. Please try again.",
               });
           }
  };

   return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Task Details</h1>

      {task ? (
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <img
            src={task.task_image_url}
            alt="Task"
            className="w-full h-48 object-cover rounded mb-4"
          />
          <h2 className="text-lg font-semibold mb-2">{task.task_title}</h2>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Task Details:</span> {task.task_details}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Description:</span> {task.task_detail}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Submission Info:</span>{" "}
            {task.submission_info}
          </p>
          <p className="mt-2">
            <span className="font-medium">Required Workers:</span>{" "}
            {task.required_workers}
          </p>
          <p>
            <span className="font-medium">Payable Amount:</span> $
            {task.payable_amount}
          </p>
          <p>
            <span className="font-medium">Completion Date:</span>{" "}
            {task.completion_date}
          </p>

          <form className="mt-4" 
          onSubmit={handleSubmit}
          >
            <textarea
              className="w-full border rounded-md p-2 mb-3"
              rows="4"
              placeholder="Enter submission details"
             value={submission}
              onChange={(e) => setSubmission(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <p>Loading task details...</p> // Fallback if task is undefined
      )}
    </div>
  );
};

export default TaskDetails;
