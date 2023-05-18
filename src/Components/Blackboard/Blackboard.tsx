import React, { ReactNode, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Blackboard.css';
import Card from 'antd/es/card/Card';
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas';
import { Button } from 'antd';

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

	const downloadIt = () => {

		const blackboard = document.getElementById('blackboard') as HTMLElement;
		

  // Convert the container element to a canvas using html2canvas
  const width = blackboard.offsetWidth;
  const height = blackboard.offsetHeight;

  // Calculate the aspect ratio
  const aspectRatio = width / height;

  // Convert the container element to a canvas using html2canvas
  html2canvas(blackboard).then((canvas) => {
	// Create a new jsPDF instance
	const pdf = new jsPDF();

	// Get the canvas data as an image URL
	const imageData = canvas.toDataURL('image/png');

	// Calculate the height based on the aspect ratio
	const pdfHeight = pdf.internal.pageSize.getWidth() * (1 / aspectRatio);

	// Add the image to the PDF while maintaining aspect ratio
	pdf.addImage(imageData, 'PNG', 10, 10, pdf.internal.pageSize.getWidth() - 20, pdfHeight);

	// Save the PDF file
	pdf.save('myPDF.pdf');
	});
}

	return (
		<>
		<div
			style={style}
			className='pizarraDesign'
			id='blackboard'
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
											style={{marginTop:'2rem'}}
										>
											{card as unknown as ReactNode}
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
					<Button
					onClick={() => downloadIt()}
					size='large'
					style={{ position: 'fixed', bottom: '20px', right: '160px' }}
				>
				 Download in PDF
				</Button>
				</>
	);
};

export default Blackboard;
