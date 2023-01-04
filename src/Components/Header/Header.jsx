import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoggedHeader from '../LoggedHeader/LoggedHeader';
import UnloggedHeader from '../UnloggedHeader/UnloggedHeader';
import { useUserContext } from '../../Providers/LoggedUserProvider';
import './Header.css';

const Header = () => {
    
    const user = useUserContext();

    return (
      
    <div className='headerDesign'>
            <h1 className='titleDesign'>Compos</h1>
            {user === null ? (
                <UnloggedHeader/>
            ) : (
                <LoggedHeader/>
            )}
            

    </div>

    );
}

export default Header;