import { motion } from "motion/react";
import { easeOut } from 'motion';

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="mx-auto text-purple-600 text-center md:w-4/12 ">
            <motion.h1 animate={{ color: ['#09122C', '#872341', '#EFB036'], x: 20  }}
              transition={{ duration: 2, delay: 1, ease: easeOut, repeat: Infinity }}>
              <p className="lg:text-3xl mb-2"> {subHeading} </p>
            <h3 className="lg:text-2xl uppercase border-y-4 py-4">{heading}</h3>
            </motion.h1>
            
        </div>
    );
};

export default SectionTitle;