import React from 'react'
import LoginCard from '../../Components/LoginCard/LoginCard';
import './Login.css';
import { motion } from 'framer-motion';
const Login = () => {
    return(
        <motion.div initial={{opacity:0}}
        animate={{opacity: 1}}
        exit={{opacity:0}} className="backgroundDesignLogin">
            <LoginCard/>
        </motion.div>
    )
}

export default Login;