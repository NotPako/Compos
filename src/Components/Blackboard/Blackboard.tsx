import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Blackboard.css';
import Card from 'antd/es/card/Card';

interface Props {
	partsList: typeof Card[];
}

const Blackboard: React.FC<Props> = ({ partsList }, style) => {
	return (
		<div
			style={style}
			className='pizarraDesign'
		>
			<DragDropContext onDragEnd={(result) => console.log(result)}>
				<Droppable
					droppableId='droppable'
					direction='horizontal'
				>
					{(provided) => (
						<div
							ref={provided.innerRef}
							{...provided.droppableProps}
							style={{ display: 'flex', width: 'auto', flexWrap: 'wrap' }}
						>
							{partsList.map((part, index) => (
								<Draggable
									key={index}
									draggableId={index.toString()}
									index={index}
								>
									{(provided) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
										>
											{part}
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	);
};

export default Blackboard;
