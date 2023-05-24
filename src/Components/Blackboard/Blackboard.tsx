import React, { ReactNode, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Blackboard.css';
import Card from 'antd/es/card/Card';
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas';
import { Button } from 'antd';
import { useLocation } from 'react-router-dom';
import { getCompoById } from '../../Services/CompoManagement';

interface Props {
	partsList: typeof Card[];
	whiteList: typeof Card[];
	notDraggable: boolean;
	setPartsBlack: React.Dispatch<React.SetStateAction<typeof Card[]>>;
}

const Blackboard: React.FC<Props> = (
	{ partsList, notDraggable, setPartsBlack, whiteList },
	style
) => {
	const [cards, setCards] = useState(partsList);
	const [white, setWhite] = useState(whiteList);
	const [comp, setComp] = useState(Object);
	const location = useLocation();
	const id = location.state;

	async function getCompo() {
		const element = await getCompoById(id);
		setComp(element);
	}
	


	useEffect(() => {
		setCards(partsList);
		setWhite(whiteList);
		getCompo()
	}, [partsList, whiteList]);

	

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

	pdf.text(comp.title, 8, 8)

	// Add the image to the PDF while maintaining aspect ratio
	pdf.addImage(imageData, 'PNG', 15, 15, pdf.internal.pageSize.getWidth() - 20, pdfHeight);

	pdf.addPage()

	// Save the PDF file
	pdf.save(`${comp.title}.pdf`);

	console.log(white, 'les blanques')
	console.log(cards, 'les negres')
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
					<Button
					onClick={() => downloadIt()}
					size='large'
					style={{ position: 'fixed', bottom: '20px', right: '180px' }}
				>
				 Download in PDF
				</Button>
				</>
	);
};

export default Blackboard;
