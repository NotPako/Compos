import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useChangeUserContext, useUserContext } from '../../Providers/LoggedUserProvider';

const LoggedHeader = () => {

    const navigate = useNavigate();
    const user = useUserContext();
    const userChange = useChangeUserContext();

    const signOut = () => {
        userChange(null);
        setTimeout(()=>{navigate("/")},250);

    }

    return(
        <div className='linksDesign'>
        <div className="linkDesign" onClick={()=>setTimeout(()=>{navigate("/userHome")},250)}>Home</div>
        <div className="linkDesign" onClick={()=>setTimeout(()=>{navigate("/mycompos")},250)}>My Compos</div>
        <div className="linkDesign" onClick={()=>setTimeout(()=>{navigate("/createnew")},250)}>Create New</div>
        <div className="linkDesign" onClick={()=>setTimeout(()=>{navigate("/explore")},250)}>Explore</div>
        <div className="profileDesign">Hello, {user.username}</div>
        <div className="signOutDesign" onClick={signOut()}>Sign out</div>

        
    </div>
    )
}

export default LoggedHeader;