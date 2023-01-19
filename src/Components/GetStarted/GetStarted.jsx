import React from 'react';
import './GetStarted.css';
import headImage from '../../Resources/FotoLandingPage.jpg';
import { Button } from 'antd/es/radio';
import { useNavigate } from 'react-router-dom';

const GetStarted = () => {

    let navigate = useNavigate();

    return(
        <div className='parent'>
            <img className='imageHeader' alt= '' src={headImage}>    
            </img>
            <div className='esloganDesign'>The simpliest way to build structures</div>
            <Button type="primary" shape='round' style={{zIndex:10, position:'absolute', top:'500px', right:'100px'}} 
            onClick={()=>setTimeout(()=>{navigate("/signup")},250)}>Get started</Button>
            
        </div>

    )
}

export default GetStarted;