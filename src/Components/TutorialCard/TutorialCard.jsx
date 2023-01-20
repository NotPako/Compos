import React from 'react'
import './TutorialCard.css';

const TutorialCard = ({title, description, video}) => {

    return(
        <div>
            <h1 className='titleTutDesign'>{title}</h1>
            <div style={{display:'flex', flexDirection:'row'}}>
            <p className='textTutDesign'>{description}</p>
            <video className='videoDesign' src={video} loop={true} autoPlay={true}></video>
            </div>
        </div>
    )
}

export default TutorialCard;