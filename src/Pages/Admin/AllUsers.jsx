import { useQuery } from "@tanstack/react-query";
//import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUsers from "../../hooks/useUsers";


const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [users,refetch]=useUsers();
    console.log(users)

  const handleChooseRole = (userId, newRole) => {
                            
  axiosSecure.patch(`/users/role/${userId}`, { role: newRole }) 
  .then((res) => {
        console.log(res.data)                      
       if (res.data.modifiedCount > 0) {
        refetch(); 
          Swal.fire({
          position: "top-end",
          icon: "success",
          title: `User role updated to ${newRole}!`,
          showConfirmButton: false,
          timer: 1500,
          });
       }
  })
                                  
  };

    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div>
            <div className="flex justify-evenly bg-violet-200">
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Users: {users.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead className="bg-cyan-100">
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Photo</th>
                            <th>Coin</th>
                            <th>Role</th>
                            <th className="text-center ">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td className="px-4 py-2">
                               <img
                                 src={user.url}
                                 alt="User"
                                 className="w-10 h-10 rounded-full"
                                  />
                                </td>
                                <td className="px-4 py-2">{user.coin}</td>
                                <td>{user.role}</td>                              
                                <td>
                                    <button
                                        onClick={() => handleDeleteUser(user)}
                                        className="btn btn-ghost btn-lg">
                                        <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                    </button>
                                    <select
                          className="border rounded px-2 py-1"
                         value={user.role}
                         onChange={(e) => handleChooseRole(user._id, e.target.value)}
                         >
                       <option value="admin">Admin</option>
                      <option value="buyer">Buyer</option>
                        <option value="worker">Worker</option>
                        </select>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;