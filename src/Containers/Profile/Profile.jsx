import React from 'react';
import ProfileCard from '../../Components/ProfileCard/ProfileCard';
import { motion } from 'framer-motion';

const Profile = () => {
    return(
        <motion.div initial={{opacity:0}}
        animate={{opacity: 1}}
        exit={{opacity:0}} className='backgroundDesignLogin'>
            <ProfileCard/>
        </motion.div>
    )
}

export default Profile;