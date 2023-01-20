import React from 'react';
import RegisterCard from '../../Components/RegisterCard/RegisterCard';
import './Register.css';
import { motion } from 'framer-motion';

const Register = () => {
    return(
        <motion.div initial={{opacity:0}}
        animate={{opacity: 1}}
        exit={{opacity:0}} className="backgroundDesign">
        <RegisterCard/>
        </motion.div>
    )
}

export default Register;