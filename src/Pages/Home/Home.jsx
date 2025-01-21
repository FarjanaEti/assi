import React from 'react';
import Banner from './Banner';
import { Helmet } from 'react-helmet-async';
import Testimonials from './Teastimonials';
import Footer from '../../Shared/Footer';
import TopWorker from './TopWorker';
import FindJob from './FindJob';
import Work from './Work';

const Home = () => {
   return (
      <div>
      <Helmet>
            <title>Earnify| Home</title>
      </Helmet>
     <Banner></Banner>   
     <TopWorker></TopWorker> 
     <FindJob></FindJob>
     <Work></Work>
     <Testimonials></Testimonials>   
     <Footer></Footer>                             
     </div>
                              );
};

export default Home;