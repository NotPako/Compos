import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useChangeUserContext, useUserContext } from '../../Providers/LoggedUserProvider';
import { Button, Dropdown, Space } from 'antd';
import { Avatar } from 'antd';
import {UserOutlined} from '@ant-design/icons';
import './LoggedHeader.css';
import { useEffect } from 'react';



const LoggedHeader = () => {

    const items = [
        {
          key: '1',
          label: (
            <label className='dropLinkDesign' onClick={() => navigate("/profile")}>
                Edit profile
            </label>
          ),
        },
        {
          key: '2',
          label: (
            <label className='dropLinkDesign' onClick={() => signOut()}>
              Sign out
            </label>
          ),
        },
      ];
    const navigate = useNavigate();
    const user = useUserContext();
    const userChange = useChangeUserContext();
    const currUrl = window.location.pathname;

    const signOut = () => {
        userChange(null);
        setTimeout(()=>{navigate("/")},250);

    }

    
    return(
        <div className='linksDesign'>
        <div className={currUrl === '/userHome' ? 'linkSelectedDesign' : 'linkDesign'} onClick={()=>setTimeout(()=>{navigate("/userHome")},250)}>Home</div>
        <div className={currUrl === '/mycompos' ? 'linkSelectedDesign' : 'linkDesign'} onClick={()=>setTimeout(()=>{navigate("/mycompos")},250)}>My Compos</div>
        <div className={currUrl === '/createnew' ? 'linkSelectedDesign' : 'linkDesign'} onClick={()=>setTimeout(()=>{navigate("/createnew")},250)}>Create New</div>
        <div className={currUrl === '/explore' ? 'linkSelectedDesign' : 'linkDesign'} onClick={()=>setTimeout(()=>{navigate("/explore")},250)}>Explore</div>
        
            <Dropdown
            menu={{
            items,
            }}
            placement="bottom"
        >
            <Avatar className="avatarDesign" size="large" icon={<UserOutlined/>}></Avatar>
        </Dropdown>
            
        

        
    </div>
    )
}

export default LoggedHeader;