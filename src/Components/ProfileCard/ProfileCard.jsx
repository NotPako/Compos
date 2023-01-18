import React, { useEffect } from 'react';
import { useState } from 'react';
import { LoadingOutlined, UserOutlined , PlusOutlined, EditOutlined, MailOutlined} from '@ant-design/icons';
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
  

  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        setImageUrl(info.file.response.url);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

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
          <Avatar className="avatarCardDesign" icon={imageUrl === "" ? <UserOutlined/> : {}} size={230}/>
          <Upload {...props}>
          <Button icon={<EditOutlined />}>Edit</Button>
          </Upload>
          <h1>{userInfo.username}</h1>
          
        </div>
        <div className='rightSideDesign'>
          <p className="mailDesign">
            <div><MailOutlined style={{color: "white"}}/></div>
            <div>{userInfo.email}</div>
          </p>
          <h2 style={{}}>{userInfo.instrument}</h2>

        </div>
        <Button className="saveProfDesign">Save profile</Button>
        
      </div>
    );
      
    }


export default ProfileCard;