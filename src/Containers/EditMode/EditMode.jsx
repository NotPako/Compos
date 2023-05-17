import { React, useState, useEffect } from 'react';
import ElementList from '../../Components/ElementList/ElementList';
import { useLocation } from 'react-router-dom';
import Blackboard from '../../Components/Blackboard/Blackboard.tsx';
import { CloseOutlined, EyeOutlined } from '@ant-design/icons';
import { getCompoById } from '../../Services/CompoManagement';
import { Card } from 'antd';
import { motion } from 'framer-motion';
import './EditMode.css';
import PopUp from '../../Components/PopUp/PopUp';

const EditMode = () => {
	const [partsBlack, setPartsBlack] = useState([]);
	const location = useLocation();
	const id = location.state;
	const [list, setList] = useState([]);
	const [whiteList, setWhiteList] = useState([]);
	const [compo, setCompo] = useState('');
	const [watchClose, setWatchClose] = useState(false);
	const [cardInfo, setCardInfo] = useState({
		name: '',
		length: 0,
		color: '',
		description: ''
	})

	const handleDeleteCard = (index) => {
		console.log(index);
		const newArray = [...partsBlack];
		newArray.splice(index, 1);
		setPartsBlack(newArray);
		console.log(partsBlack);
	};

	const watchThisCard = (card) => {
		setWatchClose(true);
		setCardInfo({name: card.name,
			description: card.description,
			color: card.color,
			length: card.length,
		})
	}

	function decreaseByFour(inputString) {
		// Remove "rem" part and convert the remaining string to a number
		const number = parseInt(inputString);
	  
		// Decrease the number by 4
		const decreasedNumber = number - 4;
	  
		// Return the decreased number as a string
		return decreasedNumber.toString();
	  }
	  


	useEffect(() => {
		if (partsBlack.length === 0 || whiteList.length === 0) {
			async function fetchData() {
				const element = await getCompoById(id);
				setCompo(element);
				setWhiteList(element.list);
				setList(element.blackList);
				setPartsBlack(
					list.map((element) => (
						<Card
							className='cardDesign'
							style={{
								backgroundColor: `${element.color}`,
								width: `${parseInt(element.length) + 1}rem`,
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
					))
				);
			}
			fetchData();
		}
	}, [compo]);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className='createDesign'
		>
			<ElementList
				partsBlack={partsBlack}
				setPartsBlack={setPartsBlack}
				startingParts={whiteList}
				id={id}
				title={compo.title}
			/>
			<Blackboard
				partsList={partsBlack}
				setPartsBlack={setPartsBlack}
			/>
			<PopUp
				trigger={watchClose}
				setTrigger={setWatchClose}
				watchIt={true}
				>
					<div className='frame' style={{display:'flex', flexDirection:'column', borderColor:`${cardInfo.color}`}}>
						<div style={{fontWeight:'bold', marginBottom:'1rem', display:'flex'}}>
							{cardInfo.name}
							<text style={{marginLeft:'2rem'}}>
								Bars: <text style={{fontWeight:'initial'}}>{decreaseByFour(cardInfo.length)}</text>
							</text>
						</div>
						<div>
							{cardInfo.description}
						</div>
					</div>

				</PopUp>
		</motion.div>
	);
};

export default EditMode;
