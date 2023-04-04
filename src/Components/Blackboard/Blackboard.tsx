import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Blackboard.css';
import Card from 'antd/es/card/Card';

interface Props {
	partsList: typeof Card[];
}

const Blackboard: React.FC<Props> = ({ partsList }) => {
	return (
		<div>
			<DragDropContext>
				<Droppable droppableId='droppable'>
					{(provided) => (
						<div
							ref={provided.innerRef}
							{...provided.droppableProps}
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
