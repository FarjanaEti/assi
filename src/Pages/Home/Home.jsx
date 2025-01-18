import React from 'react';
import Banner from './Banner';
import { Helmet } from 'react-helmet-async';
import Testimonials from './Teastimonials';
import Footer from '../../Shared/Footer';

const Home = () => {
   return (
      <div>
      <Helmet>
            <title>Earnify| Home</title>
      </Helmet>
     <Banner></Banner>    
     <Testimonials></Testimonials>   
     <Footer></Footer>                             
     </div>
                              );
};

export default Home;