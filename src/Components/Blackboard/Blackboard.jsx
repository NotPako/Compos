import React, { ReactNode, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Blackboard.css';
import Card from 'antd/es/card/Card';
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas';
import { Button } from 'antd';
import { useLocation } from 'react-router-dom';
import { getCompoById } from '../../Services/CompoManagement';



const Blackboard = (
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
		const blackboard = document.getElementById('blackboard');
		const descriptionList = document.getElementById('elementDescriptions');
	  
		const width = blackboard.offsetWidth;
		const height = blackboard.offsetHeight;
		const aspectRatio = width / height;
	  
		html2canvas(blackboard).then((canvas) => {
		  const pdf = new jsPDF();
		  const imageData = canvas.toDataURL('image/png');
		  const pdfHeight = pdf.internal.pageSize.getWidth() * (1 / aspectRatio);
	  
		  pdf.text(comp.title, 8, 8);
		  pdf.addImage(imageData, 'PNG', 15, 15, pdf.internal.pageSize.getWidth() - 20, pdfHeight);
	  
		  pdf.addPage();
	  
		  // Add the descriptionList to the PDF
		  if (descriptionList) {
			html2canvas(descriptionList).then((descCanvas) => {
			  const descData = descCanvas.toDataURL('image/png');
			  const descAspectRatio = descCanvas.width / descCanvas.height;
			  const descWidth = pdf.internal.pageSize.getWidth() - 190; // Adjust the margins as needed
			  const descHeight = descWidth * (1 / descAspectRatio);
	  
			  pdf.addImage(descData, 'PNG', 15, 15, descWidth, descHeight);
	  
			  pdf.save(`${comp.title}.pdf`);
			});
		  } else {
			pdf.save(`${comp.title}.pdf`);
		  }
		});
	  };
	  
	

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

				<div id='elementDescriptions'>
				{whiteList.map((card) => (
				<div style={{display:'flex', flexDirection:'row', visibility:'hidden'}}>
					<Card title={card.name} style={{backgroundColor: `${card.color}`, marginTop:'2rem'}}>
					</Card>

					<div style={{marginLeft:'8rem'}}>
					{card.length}
						{card.description}
				
					</div>

						

	
				</div>
				))}
			</div>
				</>
	);
};

export default Blackboard;
