import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaTasks } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useCart from "../../hooks/useCart";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const AddTask = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [cart] = useCart();
  const [userCoin, setUserCoin] = useState(cart[0]?.coin || 0);

  const onSubmit = async (data) => {
    const totalPay = data.required_workers * data.payable_amount;

    if (totalPay > userCoin) {
      Swal.fire({
        icon: "error",
        title: "Not Enough Coins",
        text: "You don't have enough coins. Please purchase coins.",
      });
      return;
    }

    // Upload the image into Imagebb
    const imageFile = { image: data.task_image[0] };
    try {
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: { "content-type": "multipart/form-data" },
      });
      if (res.data.success) {
        const taskData = {
          task_title: data.task_title,
          task_detail: data.task_detail,
          required_workers: parseInt(data.required_workers),
          payable_amount: parseFloat(data.payable_amount),
          completion_date: data.completion_date,
          submission_info: data.submission_info,
          task_image_url: res.data.data.display_url,
          email:cart[0].email,
          name:cart[0].name,
          total_payment: totalPay,
        };
      console.log(taskData)
        // Save task to database
        const taskRes = await axiosSecure.post("/tasks", taskData);
        
        console.log(taskRes.data);
        if (taskRes.data.success) {
          
          Swal.fire({
            icon: "success",
            title: "Task Added",
            text: `Task "${data.task_title}" has been added successfully.`,
          });
          //const remainingCoin = userCoin - totalPay;
          setUserCoin(prevCoin => prevCoin - totalPay);
          reset();
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Image Upload Failed",
        text: "Could not upload the image. Please try again.",
      });
    }
  };

  return (
    <div className="ml-2">
       <Helmet>
                      <title>Earnify | DashBoard | AddTask</title>
                  </Helmet>
      
      <div className="p-2 bg-blue-100 rounded shadow">
        <p className="text-3xl text-center">Add New Task</p>
      <p className="text-center mb-4">Available Coins: {userCoin}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text">Task Title</span>
          </label>
          <input
            type="text"
            placeholder="Task Title"
            {...register("task_title", { required: true })}
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text">Task Details</span>
          </label>
          <textarea
            placeholder="Task Detail"
            {...register("task_detail", { required: true })}
            className="textarea textarea-bordered h-20"
          />
        </div>
        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text">Required Workers</span>
          </label>
          <input
            type="number"
            placeholder="Number of Workers"
            {...register("required_workers", { required: true })}
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text">Payable Amount (Each Worker)</span>
          </label>
          <input
            type="number"
            placeholder="Payable Amount"
            {...register("payable_amount", { required: true })}
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text">Completion Date</span>
          </label>
          <input
            type="date"
            {...register("completion_date", { required: true })}
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text">Like screenshot</span>
          </label>
          <input
            type="text"
            placeholder="Submission Info"
            {...register("submission_info", { required: true })}
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text">Task Image</span>
          </label>
          <input
            type="file"
            {...register("task_image", { required: true })}
            className="file-input w-full max-w-xs"
          />
        </div>
        <button type="submit" className="btn">
          Add Task <FaTasks className="ml-4" />
        </button>
      </form>
    </div>
  );
};

export default AddTask;
