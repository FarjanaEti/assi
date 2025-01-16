import React from 'react';
import Banner from './Banner';
import { Helmet } from 'react-helmet-async';
import Testimonials from './Teastimonials';

const Home = () => {
   return (
      <div>
      <Helmet>
            <title>Earnify| Home</title>
      </Helmet>
     <Banner></Banner>    
     <Testimonials></Testimonials>                                
     </div>
                              );
};

export default Home;