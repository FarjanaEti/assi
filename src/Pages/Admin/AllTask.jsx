import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useTask from "../../hooks/useTask";



const AllTask = () => {
    const [tasks, , refetch] = useTask();
    const axiosSecure = useAxiosSecure();

    const handleDeleteTask = (item) => {
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
                const res = await axiosSecure.delete(`/tasks/${item._id}`);
                // console.log(res.data);
                if (res.data.deletedCount > 0) {
                    // refetch to update the ui
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${item.task_title} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }


            }
        });
    }

    return (
        <div>
          <div className="flex justify-evenly bg-violet-200">
                <h2 className="text-3xl">All Task</h2>
                <h2 className="text-3xl">Total Task: {tasks.length}</h2>
            </div> 
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead className="bg-cyan-100">
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Pay Amount</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tasks.map((item, index) => <tr key={item._id}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.task_image_url} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {item.task_title}
                                    </td>
                                    <td className="">${item.payable_amount}</td>
                                  
                                    <td>
                                        <button
                                            onClick={() => handleDeleteTask(item)}
                                            className="btn btn-ghost btn-lg">
                                            <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                        </button>
                                    </td>
                                </tr>)
                            }
                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllTask;