import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../Providers/LoggedUserProvider';
import './UnloggedHeader.css';
const UnloggedHeader = () => {

    let navigate = useNavigate();
    const user = useUserContext();
    const currUrl = window.location.pathname;
    
    return(
        <div className='linksDesign'>
        <div className={currUrl === '/' ? 'linkSelectedDesign' : 'linkDesign'} onClick={()=>setTimeout(()=>{navigate("/")},250)}>Home</div>
        <div className={currUrl === '/explore' ? 'linkSelectedDesign' : 'linkDesign'} onClick={()=>setTimeout(()=>{navigate("/explore")},250)}>Explore</div>
        <div className={currUrl === '/aboutus' ? 'linkSelectedDesign' : 'linkDesign'} onClick={()=>setTimeout(()=>{navigate("/aboutus")},250)}>About us</div>
        <div className="logButDesign" onClick={()=>setTimeout(()=>{navigate("/login")},250)}>Login</div>
        <div className='barreta'> | </div>
        <div className="signDesign" onClick={()=>setTimeout(()=>{navigate("/signup")},250)}>Sign up</div>
       
        
    </div>
        )
}

export default UnloggedHeader;