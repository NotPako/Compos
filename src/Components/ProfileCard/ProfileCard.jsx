import React, { useEffect } from 'react';
import { useState } from 'react';
import {EditOutlined} from '@ant-design/icons';
import { Dropdown } from 'antd';
import { useChangeUserContext} from '../../Providers/LoggedUserProvider';
import './ProfileCard.css';
import { Avatar, Form, Input, Button, Modal} from 'antd';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../Providers/LoggedUserProvider';
import { deleteMyAccount, getUserData } from '../../Services/UserManagement';
import avatar1 from '../../Resources/guitarAvatar.jpg';
import avatar2 from '../../Resources/bateriaAvatar.jpg';
import avatar3 from '../../Resources/singerAvatar.jpg';
import avatar4 from '../../Resources/pianoAvatar.jpeg'


const ProfileCard = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const userChange = useChangeUserContext();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    deleteAccount();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const items = [
    {
      key: '1',
      label: (
        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        <Avatar size={100} onClick={() => setImageUrl(avatar1)}  src={avatar1}></Avatar>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        <Avatar size={100} onClick={() => setImageUrl(avatar2)}  src={avatar2}></Avatar>
        </div>      ),
    },
    {
      key: '3',
      label: (
        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        <Avatar size={100} onClick={() => setImageUrl(avatar3)}  src={avatar3}></Avatar>
        </div>      ),
    },
    {
      key: '4',
      label: (
        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        <Avatar size={100} onClick={() => setImageUrl(avatar4)}  src={avatar4}></Avatar>
        </div>      ),
    }
  ];
    

const user = useUserContext();

  
  const [userInfo, setUserInfo] = useState("");
  const [imageUrl, setImageUrl] = useState();
  


  useEffect(() => {

    if(userInfo === ""){
    
    getUserData(user).then(
      res => (setUserInfo(res))
    ).catch(error => console.log(error))
    
    } else {
      console.log(userInfo)
    }
    
    
  
  }, [userInfo])

  const confirmDelete = () => {
    showModal();
  }

  const deleteAccount = () => {
    deleteMyAccount(userInfo.username);
    userChange(null);
    navigate('/');
  }

 

 

    
    return(
      <div className='profileCardDesign'>
        <Modal title="You're about to delete your account" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <p>Are you sure you want to delete the account?</p>
        </Modal>
        <div className='leftSideDesign'>
          <Avatar className="avatarCardDesign"  src={imageUrl} size={230}/>
          <Dropdown menu={{items}} placement='bottom'>
          <Button icon={<EditOutlined />}>Edit</Button>
          </Dropdown>
         
          <h1>{userInfo.username}</h1>
          <Button onClick={() => confirmDelete()}style={{marginTop:'2rem'}}danger>Delete account</Button>

          
          
        </div>
        <div className='rightSideDesign'>
        <Form
            name="basic"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ }}
            autoComplete="off"
            size='large'
        >
        <Form.Item
          label="Email"
          name="email"
        >
          <Input placeholder={userInfo.email}/>
        </Form.Item>

        <Form.Item
          label="Actual password"
          name="passwordAct"
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label=" New Password"
          name="passwordNew"
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="passwordNewConf"
        >
          <Input.Password />
        </Form.Item>
    </Form>

        </div>
        <Button className="saveProfDesign">Save profile</Button>
        
      </div>
    );
      
    }


export default ProfileCard;