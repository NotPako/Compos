import React from 'react';
import { motion } from 'framer-motion';
import ComposTable from '../../Components/ComposTable/ComposTable';
import './Explore.css';

const Explore = () => {

    return(
        <motion.div initial={{opacity:0}}
        animate={{opacity: 1}}
        exit={{opacity:0}}>

            <h1 className='titleTutDesign'> New this week</h1>
            <ComposTable isMine='false' thisWeek='true'/>
            <h1 className='titleTutDesign'>Global</h1>
            <ComposTable isMine='false' thisWeek='false'/>
            
        </motion.div>
    )
}

export default Explore;