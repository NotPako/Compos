import React from 'react';
import GetStarted from '../../Components/GetStarted/GetStarted';
import {motion} from "framer-motion";
import TutorialCard from '../../Components/TutorialCard/TutorialCard';
import videoCreatePart from '../../Resources/Videos/CreatePart.mov';
import videoPlacePart from '../../Resources/Videos/PlacePart.mov';
import videoChangeName from '../../Resources/Videos/RenameProject.mov';


const Home = () => {
    return(

<motion.div
    initial={{opacity:0}}
    animate={{opacity: 1}}
    exit={{opacity:0}}

>
    <GetStarted/>
    <TutorialCard title={'Create your own parts'} description={'You can create as many different parts as you need and customize them through 3 parameters: Name, length and color.'} video={videoCreatePart}/>
    <TutorialCard title={'Start arranging your structure'} description={"Once you have created all the different parts you can identify, it's time to order them as you like"} video={videoPlacePart}/>
    <TutorialCard title={'Change the name of your project'} description={"We know it's really hard to find the perfect name for your composition, here you can modify it anytime! Just click on the title and modify it!"} video={videoChangeName}/>
    </motion.div>
    )
}

export default Home;