import React from 'react';
import useTask from '../../hooks/useTask';
import useCart from '../../hooks/useCart';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const TaskList = () => {
        const [tasks]=useTask() 
        const [user]=useCart() 
        console.log(user)
        const validTasks = tasks.filter((task) => task.required_workers > 0);
       
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
       <Helmet>
                      <title>Earnify | DashBoard | Tasklist</title>
                  </Helmet>
      {validTasks.map((task) => (
        <div
          key={task._id}
          className="card bg-base-100 shadow-xl border border-gray-200"
        >
          <div className="card-body">
            <h2 className="card-title text-lg font-bold">{task.task_title}</h2>
            <p className="text-gray-600">
              <span className="font-semibold">Buyer:{task.name}</span> 
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Completion Date:</span> {task.completion_date}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Payable Amount:</span> ${task.payable_amount}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Required Worker:</span> {task.required_workers}
            </p>
            <div className="card-actions mt-4">
            <Link to={`/dashboard/tasks/${task._id}`}> <button
                  className="btn btn-accent" >
                  View Details
                </button></Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  
};

export default TaskList;