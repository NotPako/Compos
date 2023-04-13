import React, { useEffect } from 'react';
import { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Dropdown, message } from 'antd';
import { useChangeUserContext } from '../../Providers/LoggedUserProvider';
import './ProfileCard.css';
import { Avatar, Form, Input, Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../Providers/LoggedUserProvider';
import { deleteMyAccount, getUserData } from '../../Services/UserManagement';
import avatar1 from '../../Resources/guitarAvatar.jpg';
import avatar2 from '../../Resources/bateriaAvatar.jpg';
import avatar3 from '../../Resources/singerAvatar.jpg';
import avatar4 from '../../Resources/pianoAvatar.jpeg';
import { errorCheck } from '../../Services/Validate';
import { updateProfile } from '../../Services/UserManagement';

const ProfileCard = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();
	const { userChange } = useChangeUserContext();
	const [messageApi, contextHolder] = message.useMessage();

	const success = () => {
		messageApi.open({
			type: 'success',
			content: 'Profile saved correctly',
		});
	};

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
				<div
					style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
				>
					<Avatar
						size={100}
						onClick={() => setImageUrl(avatar1)}
						src={avatar1}
					></Avatar>
				</div>
			),
		},
		{
			key: '2',
			label: (
				<div
					style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
				>
					<Avatar
						size={100}
						onClick={() => setImageUrl(avatar2)}
						src={avatar2}
					></Avatar>
				</div>
			),
		},
		{
			key: '3',
			label: (
				<div
					style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
				>
					<Avatar
						size={100}
						onClick={() => setImageUrl(avatar3)}
						src={avatar3}
					></Avatar>
				</div>
			),
		},
		{
			key: '4',
			label: (
				<div
					style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
				>
					<Avatar
						size={100}
						onClick={() => setImageUrl(avatar4)}
						src={avatar4}
					></Avatar>
				</div>
			),
		},
	];

	const { user } = useUserContext();
	const { setProfilePicture } = useChangeUserContext();

	const [userInfo, setUserInfo] = useState('');
	const [imageUrl, setImageUrl] = useState();
	const [errorMessage, setErrorMessage] = useState('');
	const [userError, setUserError] = useState({
		usernameError: '',
		emailError: '',
		passwordError: '',
		password2Error: '',
	});
	const [userUpdate, setUserUpdate] = useState({
		username: '',
		email: '',
		password: '',
		password2: '',
	});

	useEffect(() => {
		if (userInfo === '') {
			getUserData(user)
				.then((res) => {
					setUserInfo(res);
					setImageUrl(res.avatar);
				})
				.catch((error) => console.log(error));
		} else {
			console.log(userInfo);
		}
	}, [userInfo, user]);

	const errorHandler = async (e) => {
		let error = '';

		error = await errorCheck(e.target.name, e.target.value, true);

		if (e.target.name === 'password2') {
			if (userUpdate.password2 !== '') {
				if (userUpdate.password !== userUpdate.password2) {
					error = 'Write the same password twice';
				}
			}
		}

		setUserError((prevState) => ({
			...prevState,
			[e.target.name + 'Error']: error,
		}));
	};

	const inputHandler = (e) => {
		setUserUpdate((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const confirmDelete = () => {
		showModal();
	};

	const deleteAccount = () => {
		deleteMyAccount(userInfo.username);
		userChange(null);
		navigate('/');
	};

	const saveProfile = () => {
		setProfilePicture(imageUrl);
		if (userError.emailError !== '') {
			setErrorMessage('Fix the errors above before updating your data');
		} else {
			if (userUpdate.email !== '') {
				updateProfile(user.username, userUpdate.email, 'email');
				success();
			} else {
			}
		}

		if (userError.passwordError !== '' && userError.password2Error !== '') {
			setErrorMessage('Fix the errors above before updating your data');
		} else {
			if (userUpdate.password !== '' && userUpdate.password2 !== '') {
				updateProfile(user.username, userUpdate.password, 'password');
				success();
			} else {
			}
		}

		updateProfile(user.username, imageUrl, 'avatar');
	};

	return (
		<div className='profileCardDesign'>
			{contextHolder}
			<Modal
				title="You're about to delete your account"
				okText='Delete'
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<p>Are you sure you want to delete the account?</p>
			</Modal>
			<div className='leftSideDesign'>
				<Avatar
					className='avatarCardDesign'
					src={imageUrl}
					size={230}
				/>
				<Dropdown
					menu={{ items }}
					placement='bottom'
				>
					<Button icon={<EditOutlined />}>Edit</Button>
				</Dropdown>

				<h1>{userInfo.username}</h1>
				<Button
					onClick={() => confirmDelete()}
					style={{ marginTop: '2rem' }}
					danger
				>
					Delete account
				</Button>
			</div>
			<div className='rightSideDesign'>
				<Form
					name='basic'
					labelCol={{ span: 10 }}
					wrapperCol={{ span: 16 }}
					style={{ maxWidth: 600 }}
					initialValues={{}}
					autoComplete='off'
					size='large'
				>
					<Form.Item
						label='Email'
						name='email'
					>
						<Input
							placeholder={userInfo.email}
							name='email'
							onBlur={(e) => errorHandler(e)}
							onChange={(e) => inputHandler(e)}
						/>
						<div className='errorMsg'>{userError.emailError}</div>
					</Form.Item>

					<Form.Item
						label=' New Password'
						name='passwordNew'
					>
						<Input.Password
							name='password'
							onBlur={(e) => errorHandler(e)}
							onChange={(e) => inputHandler(e)}
						/>
						<div className='errorMsg'>{userError.passwordError}</div>
					</Form.Item>
					<Form.Item
						label='Confirm Password'
						name='passwordNewConf'
					>
						<Input.Password
							name='password2'
							onBlur={(e) => errorHandler(e)}
							onChange={(e) => inputHandler(e)}
						/>
						<div className='errorMsg'>{userError.password2Error}</div>
					</Form.Item>
				</Form>
				<div className='errorMsg'>{errorMessage}</div>
			</div>
			<Button
				onClick={() => saveProfile()}
				className='saveProfDesign'
			>
				Save profile
			</Button>
		</div>
	);
};

export default ProfileCard;
