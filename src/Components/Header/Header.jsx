import React from 'react';
import LoggedHeader from '../LoggedHeader/LoggedHeader';
import UnloggedHeader from '../UnloggedHeader/UnloggedHeader';
import { useUserContext } from '../../Providers/LoggedUserProvider';
import './Header.css';
import Logo from '../../Resources/ComposLogo.png';



const Header = () => {
    
    const user = useUserContext();

   
  
  


    return (
      
    <div className='headerDesign'>
      
            <img className='titleDesign' alt='' src={Logo}></img>
            {user === null ? (
                <UnloggedHeader/>
            ) : (
                <LoggedHeader/>
            )}
            

    </div>

    );
}

export default Header;