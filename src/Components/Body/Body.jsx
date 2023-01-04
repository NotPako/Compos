import React from 'react';
import {Routes, Route} from 'react-router-dom';
import AboutUs from '../../Containers/AboutUs/AboutUs';
import Create from '../../Containers/Create/Create';
import Explore from '../../Containers/Explore/Explore';
import Home from '../../Containers/Home/Home';
import Login from '../../Containers/Login/Login';
import MyCompos from '../../Containers/MyCompos/MyCompos';
import Profile from '../../Containers/Profile/Profile';
import Register from '../../Containers/Register/Register';
import UserHome from '../../Containers/UserHome/UserHome';



const Body = () => {
    return(
        <>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/explore' element={<Explore/>}/>
            <Route path='/aboutus' element={<AboutUs/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Register/>}/>
            <Route path='/userHome' element={<UserHome/>}/>
            <Route path='/mycompos' element={<MyCompos/>}/>
            <Route path='/createnew' element={<Create/>}/>
            <Route path='/profile' element={<Profile/>}/>
            
        </Routes>
        </>
    )
}

export default Body;