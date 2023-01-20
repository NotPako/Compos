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
            <Button type="primary" shape='round' className='butDesign'
            onClick={()=>setTimeout(()=>{navigate("/signup")},250)}><div style={{marginTop:'8px'}}>Get started</div></Button>
            
        </div>

    )
}

export default GetStarted;