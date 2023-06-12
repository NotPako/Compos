import React from 'react';
import Blackboard from '../../Components/Blackboard/Blackboard.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCompoById } from '../../Services/CompoManagement';
import { Card, Button } from 'antd';
import './ViewMode.css';

const ViewMode = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const id = location.state;
	const [list, setList] = useState([]);
	const [compo, setCompo] = useState('');
	const [blackList, setBlackList] = useState([]);

	//This useEffect is executed until the blackList hook gets rendered
	useEffect(() => {
		if (blackList.length === 0) {
			async function fetchData() {
				const element = await getCompoById(id);
				setCompo(element);
				setList(element.blackList);
				setBlackList(
					list.map((element) => (
						<Card
							style={{
								backgroundColor: `${element.color}`,
								width: `${parseInt(element.length) + 4}rem`,
								height:'8rem',
								marginTop: '2rem'
							}}
							title={element.name}
						/>
					))
				);
			}
			fetchData();
		}
	}, [blackList]);

	return (
		<div style={{ display: 'flex', flexDirection: 'column'}}>
			<h1 className='titulComp'>{compo.title}</h1>
			<Blackboard
				partsList={blackList}
				notDraggable
				whiteList={['']}
			/>
			<Button
				style={{ position: 'fixed', bottom: '20px', right: '20px' }}
				onClick={() => navigate('/explore')}
			>
				Back to the explorer
			</Button>
		</div>
	);
};

export default ViewMode;
