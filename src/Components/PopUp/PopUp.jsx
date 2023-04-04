import React from 'react';
import './PopUp.css';
import { Button } from 'antd';

const PopUp = (props) => {
	return props.trigger ? (
		<div className='popup'>
			<div className='popup-inner'>
				{props.newComp ? (
					<>
						<Button
							className='close-btn'
							onClick={props.goAway}
						>
							Cancel
						</Button>
						<Button
							className='add-btn'
							onClick={props.doIt}
						>
							Start
						</Button>
					</>
				) : (
					<>
						<Button
							className='close-btn'
							onClick={() => props.setTrigger(false)}
						>
							Cancel
						</Button>
						<Button
							className='add-btn'
							onClick={props.doIt}
						>
							Add
						</Button>{' '}
					</>
				)}

				{props.children}
			</div>
		</div>
	) : (
		''
	);
};

export default PopUp;
