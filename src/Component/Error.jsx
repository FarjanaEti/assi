import React from 'react';
import { NavLink } from 'react-router';

const Error = () => {
 return (
 <div className='text-center text-2xl font-semibold text-red-600 mt-20'>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p> 
    <NavLink to='/'>  <button className='btn btn-error mt-4'>Go to home page</button>  </NavLink>                                                                                  
</div>
   );
};

export default Error;
// Featured Micro-Jobs – Showcase popular or high-paying micro-jobs to attract users.
// Sales Promotion / Special Offers – If applicable, display any ongoing promotions or referral bonuses.
// Newsletter Signup – Encourage users to subscribe for job updates and promotions


