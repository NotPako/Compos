import React from 'react';
import './Create.css';
import ElementList from '../../Components/ElementList/ElementList';
import Blackboard from '../../Components/Blackboard/Blackboard.jsx';
import { useState } from 'react';
import { motion } from 'framer-motion';

const Create = () => {
	const [partsBlack, setPartsBlack] = useState([]);
	console.log(partsBlack, 'del create');

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
			/>
			<Blackboard
				partsList={partsBlack}
				setPartsBlack={setPartsBlack}
				whiteList={['']}
			/>
		</motion.div>
	);
};

export default Create;
