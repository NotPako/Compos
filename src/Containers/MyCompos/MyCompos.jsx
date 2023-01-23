import React from 'react';
import ComposTable from '../../Components/ComposTable/ComposTable';
import {motion} from 'framer-motion'

const MyCompos = () => {
    return(
        <motion.div initial={{opacity:0}}
        animate={{opacity: 1}}
        exit={{opacity:0}}>
            <ComposTable/>
        </motion.div>
    )
}

export default MyCompos;