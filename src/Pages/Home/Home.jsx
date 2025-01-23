import React from 'react';
import Banner from './Banner';
import { Helmet } from 'react-helmet-async';
import Testimonials from './Teastimonials';
import Footer from '../../Shared/Footer';
import TopWorker from './TopWorker';
import FindJob from './FindJob';
import Work from './Work';
import How_it_work from './How_it_work';

const Home = () => {
   return (
      <div>
      <Helmet>
            <title>Earnify| Home</title>
      </Helmet>
     <Banner></Banner>   
     <How_it_work></How_it_work>
     <TopWorker></TopWorker> 
     <FindJob></FindJob>
     <Work></Work>
     <Testimonials></Testimonials>   
     <Footer></Footer>                             
     </div>
                              );
};

export default Home;