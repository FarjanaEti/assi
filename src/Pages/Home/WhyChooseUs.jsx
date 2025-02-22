import React from 'react';
import { MdAccessTime, MdAttachMoney, MdAssignment, MdSecurity } from 'react-icons/md';

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      title: 'Flexible Work Hours',
      description: 'Work whenever you want, from wherever you are.',
      icon: MdAccessTime,
    },
    {
      id: 2,
      title: 'Earn Extra Income',
      description: 'Complete simple tasks and earn money easily.',
      icon: MdAttachMoney,
    },
    {
      id: 3,
      title: 'Diverse Tasks',
      description: 'Choose from a variety of tasks that suit your skills.',
      icon: MdAssignment,
    },
    {
      id: 4,
      title: 'Secure Payments',
      description: 'Get paid securely through our trusted payment methods.',
      icon: MdSecurity,
    }
  ];

  return (
    <section className='pb-8 bg-white'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-6'>Why Choose Us</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {features.map((feature) => (
            <div key={feature.id} className='bg-gray-100 rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300 ease-in-out'>
              <div className='text-4xl text-blue-500 mb-2'>
                <feature.icon />
              </div>
              <h3 className='text-xl font-semibold'>{feature.title}</h3>
              <p className='text-gray-600'>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
