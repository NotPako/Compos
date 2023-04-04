import { React, useState, useEffect } from 'react';
import ElementList from '../../Components/ElementList/ElementList';
import { useLocation } from 'react-router-dom';
import Blackboard from '../../Components/Blackboard/Blackboard';
import { CloseOutlined } from '@ant-design/icons';
import { getCompoById } from '../../Services/CompoManagement';
import { Card } from 'antd';
import { motion } from 'framer-motion';
import './EditMode.css';

const EditMode = () => {
	const [partsBlack, setPartsBlack] = useState([]);
	const location = useLocation();
	const id = location.state;
	const [list, setList] = useState([]);
	const [whiteList, setWhiteList] = useState([]);
	const [compo, setCompo] = useState('');

	const handleDeleteCard = (index) => {
		console.log(index);
		const newArray = [...partsBlack];
		newArray.splice(index, 1);
		setPartsBlack(newArray);
		console.log(partsBlack);
	};

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
			<Blackboard partsList={Object.entries(partsBlack)} />
		</motion.div>
	);
};

export default EditMode;
