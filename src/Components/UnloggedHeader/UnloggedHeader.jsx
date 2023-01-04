import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../Providers/LoggedUserProvider';
import './UnloggedHeader.css';
const UnloggedHeader = () => {

    let navigate = useNavigate();
    const user = useUserContext();
    
    return(
        <div className='linksDesign'>
        <div className="linkDesign" onClick={()=>setTimeout(()=>{navigate("/")},250)}>Home</div>
        <div className="linkDesign" onClick={()=>setTimeout(()=>{navigate("/explore")},250)}>Explore</div>
        <div className="linkDesign" onClick={()=>setTimeout(()=>{navigate("/aboutus")},250)}>About us</div>
        <div className="logButDesign" onClick={()=>setTimeout(()=>{navigate("/login")},250)}>Login</div>
        <div className='barreta'> | </div>
        <div className="logButDesign" onClick={()=>setTimeout(()=>{navigate("/signup")},250)}>Sign up</div>
       
        
    </div>
        )
}

export default UnloggedHeader;