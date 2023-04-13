import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Blackboard.css';
import Card from 'antd/es/card/Card';

interface Props {
	partsList: typeof Card[];
	notDraggable: boolean;
	setPartsBlack: React.Dispatch<React.SetStateAction<typeof Card[]>>;
}

const Blackboard: React.FC<Props> = (
	{ partsList, notDraggable, setPartsBlack },
	style
) => {
	const [cards, setCards] = useState(partsList);

	useEffect(() => {
		console.log(partsList);
		setCards(partsList);
	}, [partsList]);

	const handleDragEnd = (result) => {
		if (!result.destination) {
			return;
		}

		const newCards = Array.from(cards);
		const [reorderedItem] = newCards.splice(result.source.index, 1);
		newCards.splice(result.destination.index, 0, reorderedItem);
		console.log(partsList);
		console.log(cards);
		setCards(newCards);
		setPartsBlack(newCards);
	};

	return (
		<div
			style={style}
			className='pizarraDesign'
		>
			<DragDropContext onDragEnd={handleDragEnd}>
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
							{cards.map((card, index) => (
								<Draggable
									key={index}
									draggableId={index.toString()}
									index={index}
									isDragDisabled={notDraggable}
								>
									{(provided) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
										>
											{card}
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
