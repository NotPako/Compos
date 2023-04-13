import React from 'react';
import { Input, Button } from 'antd';
import { useState } from 'react';
import './LoginCard.css';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { checkCredentials } from '../../Services/UserManagement';
import { useChangeUserContext } from '../../Providers/LoggedUserProvider';
import { useNavigate } from 'react-router-dom';

const LoginCard = () => {
	const navigate = useNavigate();

	const [user, setUser] = useState({
		username: '',
		password: '',
		instrument: '',
	});

	const [errMsg, setErrMsg] = useState('');

	const { userChange } = useChangeUserContext();

	const inputHandler = (e) => {
		setErrMsg('');

		setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
	};

	const logMe = async () => {
		var res = await checkCredentials(user.username, user.password);

		if (res) {
			//The user exists, logging the user in...

			console.log('logged in');
			userChange(user);
			console.log('usuario que se loggea', user);

			navigate('/mycompos');
		} else {
			//The user doesn't exist, sending error message
			setErrMsg(
				"Unnable to login, password is wrong or username doesn't exist :("
			);
		}
	};

	return (
		<div className='loginCardDesign'>
			<div className='loginHeaderDesign'>
				<h1 style={{ color: 'white' }}>Login</h1>
			</div>
			<div className='loginBodyDesign'>
				<Input
					size='large'
					name='username'
					className='fieldDesign'
					placeholder='Username'
					onChange={(e) => inputHandler(e)}
					prefix={<UserOutlined />}
				></Input>
				<br />
				<br />
				<Input
					size='large'
					name='password'
					type='password'
					className='fieldDesign'
					placeholder='Password'
					onChange={(e) => inputHandler(e)}
					prefix={<LockOutlined />}
				></Input>
			</div>
			<br />
			<div className='loginFooterDesign'>
				<Button onClick={() => logMe()}>Log in</Button>
				<div className='errorMsg'>{errMsg}</div>
			</div>
		</div>
	);
};

export default LoginCard;
