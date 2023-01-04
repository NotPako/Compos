import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoggedHeader from '../LoggedHeader/LoggedHeader';
import UnloggedHeader from '../UnloggedHeader/UnloggedHeader';
import { useUserContext } from '../../Providers/LoggedUserProvider';
import './Header.css';
import { useEffect } from 'react';

const Header = () => {
    
    

    return (
      
    <div className='headerDesign'>
            <h1 className='titleDesign'>Compos</h1>
           
                <UnloggedHeader/>
           
            

    </div>

    );
}

export default Header;