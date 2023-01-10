import React, { useEffect } from 'react';
import { useState } from 'react';
import { LoadingOutlined, UserOutlined , PlusOutlined, EditOutlined} from '@ant-design/icons';
import { message, Upload } from 'antd';
import './ProfileCard.css';
import { Avatar, Form, Input, Button } from 'antd';
import { useUserContext } from '../../Providers/LoggedUserProvider';
import { getUserData } from '../../Services/UserManagement';


const ProfileCard = () => {
    

const user = useUserContext();

  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const [pictureUrl, setPictureUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {

    if(userInfo === ""){
    
    getUserData(user).then(
      res => (setUserInfo(res))
    ).catch(error => console.log(error))
    console.log(userInfo)
    } else {
      console.log(userInfo)
    }
    
    
  
  }, [userInfo])

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

 

    
    return(
      <div className='profileCardDesign'>
        <div className='leftSideDesign'>
          <Avatar  icon={imageUrl === "" ? <UserOutlined/> : {}} size={230}/>
          <Upload>
          <Button icon={<EditOutlined />}>Edit</Button>
          </Upload>
          <h1>{userInfo.username}</h1>
          
        </div>
        <div className='rightSideDesign'>
          <p>Email: {userInfo.email}</p>
          <p>Instrument: {userInfo.instrument}</p>

        </div>
        
      </div>
    );
      
    }


export default ProfileCard;