import React from 'react';
import useTask from '../../hooks/useTask';

const RecentJob = () => {
   const [task] = useTask();
     const works = task
  .sort((a, b) => new Date(b.completion_date) - new Date(a.completion_date))
  .slice(0, 6);
   console.log(works)
  return (
    <section className='py-8 mt-20 bg-gray-100'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center my-6'>Recent Jobs</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {works.map((job) => (
            <div key={job.id} className='bg-white rounded-lg shadow-lg p-4'>
              <img src={job.task_image_url} alt={job.task_title} className='w-full h-48 object-cover rounded-t-lg' />
              <h3 className='text-xl font-semibold mt-4'>{job.task_title}</h3>
              <p className='text-gray-600'>{job.task_detail}</p>
              <p className='mt-2'><strong>Pay:</strong> ${job.payable_amount}</p>
              <p><strong>Required Workers:</strong> {job.required_workers}</p>
              <p><strong>Completion Date:</strong> {job.completion_date}</p>
              <p className='text-sm text-gray-500 mt-2'>Posted by: {job.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentJob;