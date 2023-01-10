import React from 'react';
import { useState } from 'react';
import { LoadingOutlined, UserOutlined , PlusOutlined} from '@ant-design/icons';
import { message, Upload } from 'antd';
import './ProfileCard.css';
import { Avatar, Form, Input, Button } from 'antd';
import { useUserContext } from '../../Providers/LoggedUserProvider';


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
  const [imageUrl, setImageUrl] = useState();

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

    
    return(
      <div className='profileCardDesign'>
      
        <Form
        form={form}
        name="profile"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="formDesign"
      >
         <Form.Item>
        
        <Upload name="avatar" listType="picture-card">
        {imageUrl ? (
        <img
          src={imageUrl}
          alt="avatar"
          style={{
            width: '100%',
          }}
        />
      ) : (
        uploadButton
      )}

        </Upload>
        </Form.Item>
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input size='large' style={{width: '15rem'}}/>
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password size='large' style={{width: '15rem'}}/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Profile
          </Button>
        </Form.Item>
      </Form>
      </div>
    );
      
    }


export default ProfileCard;