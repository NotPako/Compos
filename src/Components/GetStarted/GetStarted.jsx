import React from 'react';
import './GetStarted.css';
import headImage from '../../Resources/FotoLandingPage.jpg';
import { Button } from 'antd/es/radio';

const GetStarted = () => {
    return(
        <div className='parent'>
            <img className='imageHeader' alt= '' src={headImage}>    
            </img>
            <div className='esloganDesign'>The simpliest way to build structures</div>
            <Button type="primary" shape='round' style={{zIndex:10, position:'absolute', top:'500px', right:'100px'}}>Get started</Button>
            
        </div>

    )
}

export default GetStarted;