import React, { useState } from 'react';
import useTask from '../../hooks/useTask';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { Helmet } from 'react-helmet-async';

const BuyerTask = () => {
    const [task, loading, refetch] = useTask();
    console.log(task)
    const [updateTask, setUpdateTask] = useState(null)
   const axiosSecure=useAxiosSecure();
   const axiosPublic=useAxiosPublic();
    if (loading) {
      return <p>Loading tasks...</p>;
    }
    
    const handleUpdateTask = async (update) => {
        try {
            const upRes = await axiosPublic.put(`/tasks/${update._id}`, {
                task_title: update.task_title,
                task_details: update.task_details,
                submission_details: update.submission_details,
            });

            if (upRes.data.modifiedCount > 0) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your Task updated successfully!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                refetch(); 
                closeUpdateTaskModal();
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: " Can't update",
                text: error.response?.data?.message || "Something went wrong!",
            });
        }
    };
    const openUpdateTaskModal = (task) => {
        setUpdateTask(task); // Set the task to be edited
      };
    
      const closeUpdateTaskModal = () => {
        setUpdateTask(null); // Clear the edit state
      };

    const handleDeleteTask=(task)=>{
        console.log(task)
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axiosSecure.delete(`/tasks/${task._id}`);
                    // console.log(res.data);
                    if (res.data.deletedCount > 0) {
                        // refetch to update the ui
                        refetch();
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `Task has been deleted`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
    
    
                }
            });
    
}
    return (
        <div className="p-4">
           <Helmet>
                <title>Earnify | DashBoard | Buyer Task</title>
            </Helmet>
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">My Tasks</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left text-sm md:text-base">
                <th className="border border-gray-300 px-2 md:px-4 py-2">Task Name</th>
                <th className="border border-gray-300 px-2 md:px-4 py-2">Image</th>
                <th className="border border-gray-300 px-2 md:px-4 py-2">Deadline</th>
                 <th className="border border-gray-300 px-2 md:px-4 py-2">
                 Number of workers</th> 
                <th className="border border-gray-300 px-2 md:px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {task.map((task) => (
                <tr key={task.id} className="hover:bg-gray-100 text-sm md:text-base">
              <td className="border border-gray-300 px-2 md:px-4 py-2">{task.task_title}</td>
                  <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-20 h-12">
                                                    <img src={task.task_image_url} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                  <td className="border border-gray-300 px-2 md:px-4 py-2">
                    {new Date(task.
completion_date).toLocaleString()}
                  </td>
                  <td className="border border-gray-300 px-2 md:px-4 py-2">{task.required_workers}</td>

                  <td className="border border-gray-300 px-2 md:px-4 py-2 flex flex-col md:flex-row gap-2">
                    <button
                      className="px-2 md:px-4 py-1 md:py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => openUpdateTaskModal(task)}
                    >
                      Update
                    </button>
                    <button
                      className="px-2 md:px-4 py-1 md:py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleDeleteTask(task)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* modal */}
        {updateTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-2">Edit Task</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateTask(updateTask);
              }}
            >
              <input
                type="text"
                className="border px-2 py-1 w-full mb-2"
                placeholder="Task Title"
                value={updateTask.task_title}
                onChange={(e) =>
                  setUpdateTask({ ...updateTask, task_title: e.target.value })
                }
              />
              <textarea
                className="border px-2 py-1 w-full mb-2"
                placeholder="Task Details"
                value={updateTask.task_details}
                onChange={(e) =>
                  setUpdateTask({ ...updateTask, task_details: e.target.value })
                }
              />
              <textarea
                className="border px-2 py-1 w-full mb-2"
                placeholder="Submission Details"
                value={updateTask. submission_details}
                onChange={(e) =>
                  setUpdateTask({ ...updateTask,  submission_details: e.target.value })
                }
              />
              {/* <input
                type="datetime-local"
                className="border px-2 py-1 w-full mb-2"
                value={new Date(updateTask.deadline).toISOString().slice(0, 16)}
                onChange={(e) =>
                  setUpdateTask({
                    ...updateTask,
                    deadline: new Date(e.target.value).toISOString(),
                  })
                }
              /> */}
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                  onClick={closeUpdateTaskModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
       
      </div>
      
      );
};

export default BuyerTask;