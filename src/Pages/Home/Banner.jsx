import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import img2 from '../../assets/home/b-5.png';
import img1 from '../../assets/home/b-2.gif';
import img3 from '../../assets/home/b-1.jpg';
import img4 from '../../assets/home/b-3.png';
import SectionTitle from '../../Component/SectionTitle';

const Banner = () => {
    return (
        <Carousel
        autoPlay={true}     
            interval={3000}     
            infiniteLoop={true}
            
            showStatus={false}  >
            <div>
            <div className="absolute  inset-0 flex items-center justify-center">
                    <SectionTitle 
                    subHeading={"Start Earning Today"}
                    heading={"Complete simple tasks and get paid,Your journey to easy earnings starts now"}  />
                </div>             
                <img src={img1} />
            </div>
           
            <div >  
            <div className="absolute  inset-0 flex items-center justify-center">
                    <SectionTitle 
                    subHeading={"Job Opportunities at Your Fingertips"}
                    heading={"Get access to thousands of tasks and jobs you can complete to earn money"}  />
                </div>                           
                <img src={img4} />
            </div>
            <div >
            <div className="absolute  inset-0 flex items-center justify-center">
                    <SectionTitle 
                    subHeading={"Be Your Own Boss"}
                    heading={"Choose the tasks you want to complete and start earning money today"}  />
                </div>             
                <img src={img3} />
            </div>
        </Carousel>
    );
};

export default Banner;