import React from 'react';
import './AboutUs.css';
import { motion } from 'framer-motion';

const AboutUs = () => {
    return(
        < motion.div initial={{opacity:0}}
        animate={{opacity: 1}}
        exit={{opacity:0}} className='aboutusDesign'>
            <h1 className="textTitleDesign">What motivates Compos</h1>
            <p className='textDesign'>At Compos, we believe that creating music should be accessible to everyone. 
                That's why we've developed a revolutionary platform that makes it easy for musicians of all skill levels and genres to write, edit, and share their music. 
                Our platform offers a user-friendly interface and powerful tools that make it simple to create professional-sounding compositions. With us, you can easily 
                compose and arrange your music, collaborate with others, and even share your creations with the world. Whether you're a seasoned pro or just starting out, 
                our platform is the perfect tool to help you bring your musical ideas to life. We are excited to be a part of your musical journey, and we can't wait to hear 
                the amazing compositions that you create with our platform.

                </p>
            <p className='textDesign'>

            At Compos, we also understand the importance of being able to recreate existing music. Our platform includes features that make it easy for cover musicians 
                to write out the structure of existing songs, so they can accurately perform and record their own versions. The platform also allows cover musicians to share 
                their arrangements with other musicians, making it easy for bands and cover groups to collaborate and perfect their performances. With Compos, cover musicians 
                have the tools they need to elevate their craft and take their performances to the next level.
            </p>

            <h1 className="textTitleDesign">Our team</h1>
            <p className='textDesign'>
                At this moment, our team consists in only one person, our founder, creator, developer, and the one that is also writing this. Myself. So, if you feel you could bring some light
                and improvement to this react application, feel free to contact in the email located in the footer of this page.
            </p>
            <h1 className="textTitleDesign">Why compos</h1>
            <p className='textDesign'>
                
            </p>
        </motion.div>
    )
}

export default AboutUs;