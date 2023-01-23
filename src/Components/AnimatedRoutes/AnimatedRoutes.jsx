import React from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import AboutUs from '../../Containers/AboutUs/AboutUs';
import Create from '../../Containers/Create/Create';
import Explore from '../../Containers/Explore/Explore';
import Home from '../../Containers/Home/Home';
import Login from '../../Containers/Login/Login';
import MyCompos from '../../Containers/MyCompos/MyCompos';
import Profile from '../../Containers/Profile/Profile';
import Register from '../../Containers/Register/Register';
import {AnimatePresence} from 'framer-motion';
import ViewMode from '../../Containers/ViewMode/ViewMode';


function AnimatedRoutes() {

  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
          
            <Route path='/' element={<Home/>}/>
            <Route path='/explore' element={<Explore/>}/>
            <Route path='/aboutus' element={<AboutUs/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Register/>}/>
            <Route path='/mycompos' element={<MyCompos/>}/>
            <Route path='/createnew' element={<Create/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/viewMode' element={<ViewMode/>}/>

        </Routes>
      </AnimatePresence>
  )
}

export default AnimatedRoutes