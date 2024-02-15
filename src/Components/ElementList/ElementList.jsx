import React from 'react';
import './ElementList.css';
import PopUp from '../PopUp/PopUp';
import { useState } from 'react';
import { Button, Input, Card, notification, Cascader, message } from 'antd';
import {
	DeleteOutlined,
	CloseOutlined,
	SmileOutlined,
	SaveOutlined,
	EyeOutlined,
	EditOutlined,
	DownloadOutlined,
	PlusOutlined
} from '@ant-design/icons';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GithubPicker } from 'react-color';
import { autoSave } from '../../Services/CompoManagement';
import { useUserContext } from '../../Providers/LoggedUserProvider';
import { getUserData } from '../../Services/UserManagement';
import SheetMusic from '../SheetMusic/SheetMusic';



const { TextArea } = Input;

const ElementList = ({
	partsBlack,
	setPartsBlack,
	startingParts,
	id,
	title,
	style,
}) => {
	let DrumPreset = [
		{ name: 'Intro', length: '8', color: 'red', description: '' },
		{ name: 'Chorus', length: '16', color: 'yellow', description: '' },
		{ name: 'Verse', length: '8', color: 'green', description: '' },
		{
			name: 'Break',
			length: '2',
			color: 'purple',
			description: '',
		},
	];

	let JazzPreset = [
		{ name: 'Intro', length: '8', color: 'red', description: '' },
		{ name: 'Chorus', length: '16', color: 'yellow', description: '' },
		{ name: 'Verse', length: '8', color: 'green', description: '' },
		{
			name: 'Break',
			length: '2',
			color: 'purple',
			description: '',
		},
	];

	const [buttonPopup, setButtonPopup] = useState(false);
	const [timeSign, setTimeSign] = useState('4/4')
	const [startingPopup, setStartingPopup] = useState(false);
	const [watchClose, setWatchClose] = useState(false);
	const [compTitle, setCompTitle] = useState('New compo');
	const [editMode, setEditMode] = useState(false);
	const [cardColor, setCardColor] = useState('');
	const [preset, setPreset] = useState('');
	const [api, contextHolder] = notification.useNotification();
	const [messageApi, contextSaveHolder] = message.useMessage();
	const [userInfo, setUserInfo] = useState('');
	const [existId, setExistId] = useState('');
	const [partList, setPartList] = useState([]);
	const [notiOpened, setNotiOpened] = useState('');
	const [list, setList] = useState([]);
	const [part, setPart] = useState({
		name: '',
		length: 0,
		color: 'white',
		description: '',
		easyscore: ''
	});
	const [cardInfo, setCardInfo] = useState({
		name: '',
		length: 0,
		color: '',
		description: '',
		easyscore: ''
	})
	const {user} = useUserContext();

	let navigate = useNavigate();

	let variables = { DrumPreset, JazzPreset};
	const openNotification = () => {
		setNotiOpened('true');
		api.open({
			message: 'Remember to save your compo',
			description:
				'Use the button in the right low corner to save the state of your compo, otherwise it will be lost',
			icon: (
				<SmileOutlined
					style={{
						color: '#108ee9',
					}}
				/>
			),
		});
	};

	const options = [
		{
			value: 'DrumPreset',
			label: 'Drummer classic',
		},
		{
			value: 'JazzPreset',
			label: 'Jazz Arrangement',
		},
	];

	const GoAway = () => {
		navigate('../mycompos');
	};

	useEffect(() => {
		if (typeof startingParts === 'undefined' && notiOpened === '') {
			setStartingPopup(true);
			openNotification();
		} else {
			if (list.length === 0) {
				setList(startingParts);
				setExistId(id);
				setCompTitle(title);
			}
		}
	}, [startingParts]);

	useEffect(() => {
		if (userInfo === '') {
			getUserData(user)
				.then((res) => setUserInfo(res))
				.catch((error) => console.log(error));
		} else {
		}
	}, [userInfo]);

	useEffect(() => {

	}, [timeSign])

	const handleChange = (e, isItColor, isItEasyScore) => {
		if (isItColor) {
			setCardColor(e.hex);
			setPart((prevState) => ({ ...prevState, color: e.hex }));
		} else if (isItEasyScore) {
			setPart((prevState) => ({ ...prevState, easyscore: e }));
			console.log(part, 'la part')
		} else {
			setPart((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
		}
	};

	const handleChangeName = (e) => {
		setCompTitle(e.target.value);
	};


	
	const addPart = () => {
		const newList = list.concat([part]);
		setButtonPopup(false);
		setList(newList);
	};

	const checkTitleEmpty = () => {
		if (compTitle !== '') {
			setEditMode(false);
		} else {
		}
	};

	const inputHandler = (e) => {
		setCompTitle(e.target.value);
	};

	function addNewPart() {
		setButtonPopup(true);
	}

	function giveItName() {
		setStartingPopup(false);
	}

	//The purpose of this one is avoid bugs when deleting
	const handleDeleteClick = (event, index) => {
		event.stopPropagation();
		deletePart(index);
	};

	const success = () => {
		messageApi.open({
			type: 'success',
			content: 'Compo saved succesfully',
		});
	};

	//This deletes cards in elementList
	const deletePart = (index) => {
		const newArray = [...list];
		newArray.splice(index, 1);
		setList(newArray);
	};

	//This is responsible for deleting cards in the blackboard
	const handleDeleteCard = (index) => {
		const newArray = [...partsBlack];
		newArray.splice(index, 1);
		setPartsBlack(newArray);
	};

	//This function gets executed when clicking in the eye of the card
	const watchThisCard = (card) => {
		setWatchClose(true);
		setCardInfo({name: card.name,
			description: card.description,
			color: card.color,
			length: card.length,
			easyscore: card.easyscore
		})
		console.log(cardInfo)
	}

	

	//This is executed once you click on the card in element list
	const displayIt = (element) => {
		setPartList(
			partList.concat(
				<Card
					data-testid='partlisttest'
					style={{
						backgroundColor: `${element.color}`,
						width: `${parseInt(element.length) + 4}rem`,
					}}
					title={element.name}
				></Card>
			)
		);
		setPartsBlack(
			partsBlack.concat(
				<Card
					data-testid='parttest'
					className='cardDesign'
					style={{
						backgroundColor: `${element.color}`,
						width: `${parseInt(element.length) + 4}rem`,
						height:'8rem',
						marginTop:'2rem'
					}}
					title={element.name}

				>
					<div style={{ float: 'right' }}>
						{' '}
						<EyeOutlined
							className='watchCardDesign'
							style={{marginRight:'2rem'}}
							onClick={() => watchThisCard(element)}
						
						/>
						<CloseOutlined
							onClick={() => handleDeleteCard(partsBlack.length)}
							className='closeCardDesign'
						/>
					</div>
				</Card>
			)
		);
	};

	function getElementFromWhiteList(name) {

		const matchedElement = list.find((element) => element.name === name);
	  
		return matchedElement;
	  }

	const saveCompo = async () => {
		const date = new Date();
		const author = user.username;
		const whiteList = list.map((element) => ({
			name: element.name,
			color: element.color,
			length: element.length,
			description: element.description,
			easyscore: element.easyscore,
		}));
		const blackList = partsBlack.map((element) => {
			console.log('Processing element:', element);
		  
			return {
			  name: element.props.title,
			  length: element.props.style.width,
			  color: element.props.style.backgroundColor,
			  description: getElementFromWhiteList(element.props.title).description,
			  easyscore: getElementFromWhiteList(element.props.title).easyscore
			};
		  });
		const title = compTitle;
		const instrument = userInfo.instrument;
		//If it doesn't have an Id, it saves it in the hook
		if (existId === '') {
			await autoSave(
				title,
				author,
				date.toLocaleDateString(),
				whiteList,
				blackList,
				instrument,
				existId
			).then((res) => {
				setExistId(res);
			});
		} else {
			//if it already has an Id, it just executes the function and the petition changes in the service
			await autoSave(
				title,
				author,
				date.toLocaleDateString(),
				whiteList,
				blackList,
				instrument,
				existId
			);
		}
		console.log(blackList);
		success();
	};

	const loadPreset = () => {
		if (preset !== '') {
			console.log(preset);
			setList(variables[preset]);
		} else {
			//Does nothing if no preset is selected
		}
	};

	const onChangePreset = (value) => {
		setPreset(value[0]);
	};
	function decreaseByFour(inputString) {
		// Remove "rem" part and convert the remaining string to a number
		const number = parseInt(inputString);
	  
		// Decrease the number by 4
		const decreasedNumber = number - 4;
	  
		// Return the decreased number as a string
		return decreasedNumber.toString();
	  }

	

	

	return (
		<>
			{contextHolder}
			{contextSaveHolder}
			<div
				className='listDesign'
				style={style}
			>
				{editMode ? (
					<Input
						defaultValue={compTitle}
						onChange={(e) => inputHandler(e)}
						style={{
							marginLeft: '2rem',
							marginTop: '1.5rem',
							marginBottom: '1rem',
							width: '200px',
						}}
						onBlur={() => checkTitleEmpty()}
					/>
				) : (
					<h2
						style={{ color: 'white', marginLeft: '2rem' }}
						onClick={() => setEditMode(true)}
					>
						{compTitle}
					</h2>
				)}

				<Button
					style={{ width: '12rem' }}
					id='newElement'
					onClick={() => addNewPart()}
				>
					New part
				</Button>
				<div className='presetSelectorDesign'>
					<Cascader
						options={options}
						onChange={onChangePreset}
						placeholder='Or select one preset'
					></Cascader>
					<Button onClick={() => loadPreset()}>Load preset</Button>
				</div>

				<PopUp
					trigger={buttonPopup}
					setTrigger={setButtonPopup}
					doIt={addPart}
				>
					<div style={{display:'flex'}}>
					<div>
						<h3>Add a name</h3>
						<Input
							type='text'
							placeholder='Ex. Intro'
							name='name'
							onChange={(e) => {
								handleChange(e);
							}}
						></Input>
					
						<h3>How many bars?</h3>
						<Input
							type='number'
							name='length'
							onChange={(e) => {
								handleChange(e);
							}}
						></Input>
					
						<h3>Select a color</h3>
						<p>{cardColor}</p>
						<GithubPicker
							color='white'
							onChange={(e) => handleChange(e, true)}
						/>
					</div>
					<div style={{marginLeft:'2rem', display:'flex', flexDirection:'column'}}>
					<h3>Give it a description</h3>
						<TextArea
							type='text'
							placeholder='Ex. Intro'
							name='description'
							onChange={(e) => {
								handleChange(e);
							}}
							rows={4}
							style={{width:'20rem'}}
							
						></TextArea>
						<div style={{marginTop:'2rem'}}>
						<SheetMusic timeSign={timeSign} onChange={(e) => handleChange(e, false, true)} />
						
						</div>
					</div>
					
					</div>
				</PopUp>
				<PopUp
					newComp={true}
					trigger={startingPopup}
					setTrigger={setStartingPopup}
					doIt={giveItName}
					goAway={GoAway}
				>
					<div>
						<h3>Start with a name for your compo</h3>
						<Input
							type='text'
							placeholder='New composition'
							name='name'
							style={{width:'40%'}}
							onChange={(e) => {
								handleChangeName(e);
							}}
						></Input>
					</div>
				</PopUp>
				<PopUp
				trigger={watchClose}
				setTrigger={setWatchClose}
				watchIt={true}
				>
					<div className='frame' style={{display:'flex', flexDirection:'column', borderColor:`${cardInfo.color}`}}>
						<div style={{fontWeight:'bold', marginBottom:'1rem', display:'flex'}}>
							{cardInfo.name}
							<text style={{marginLeft:'2rem'}}>
								Bars: <text style={{fontWeight:'initial'}}>{cardInfo.length}</text>
							</text>
						</div>
						<div>
							{cardInfo.description}
							<SheetMusic onlySheet={true} thisSheet={cardInfo.easyscore}/>
						</div>
					</div>

				</PopUp>

				<br></br>
				<ul className='whiteListDesign'>
					{list.map((element, index) => (
						<div
							key={element.name}
							onClick={() => displayIt(element)}
							className='elementsDesign'
						>
							<Card
								style={{
									marginBottom: '1rem',
									width: '10rem',
									height:'10rem',
									backgroundColor: `${element.color}`,
								}}
								title={element.name}
							>
								<p style={{fontWeight:'bold'}}>Length: <text style={{fontWeight:'initial'}}>{element.length}</text></p>
								<p>
									<DeleteOutlined
										onClick={(e) => handleDeleteClick(e, index)}
										className='deleteDesign'
									/>
									<EditOutlined
										className='editDesign'
									
									/>
								</p>
							</Card>
						</div>
					))}
				</ul>

				<br></br>
			</div>

			<Button
				onClick={() => saveCompo()}
				size='large'
				style={{ position: 'fixed', bottom: '20px', right: '20px' }}
			>
				<SaveOutlined /> Save state
			</Button>
		</>
	);
};

export default ElementList;
