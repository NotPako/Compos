import React from 'react';
import './ElementList.css';
import PopUp from '../PopUp/PopUp';
import {useState} from 'react';
import Draggable from "react-draggable";



const ElementList = () => {

    let elements = [{name: 'intro', length:'8 comp'}, 
    {name:'estribillo', length:'8 comp'}];
    
    const [buttonPopup, setButtonPopup] = useState(false);

    const [disableMode, setDisableMode] = useState(false);

    const [list, setList] = useState(elements);

    const [part, setPart] = useState({
        name: "",
        length: 0
    })


    const [partList, setPartList] = useState([]);

    function createPart (name) {
        setPartList(partList.concat(<Draggable>{name}</Draggable>))
    }

    


    const handleChange = (e) => {
        setPart(prevState => ({ ...prevState, [e.target.name]: e.target.value}));
        

    };

   

    const addPart = () => {
        const newList = list.concat([part]);
        setButtonPopup(false);
        setList(newList);
        setDisableMode(false);
    }

    

    function addNewPart(){
      setButtonPopup(true);
      setDisableMode(true);
    }

    return(


        <div className='listDesign'>
        
                <button id='newElement' onClick={() => addNewPart()}>
                    New part
                </button>

                <PopUp trigger={buttonPopup} setTrigger={setButtonPopup} doIt={addPart}>
                    <div>
                        <h3>Add a name</h3>
                        <input type="text" placeholder="Ex. Intro" name="name" onChange={(e) => {handleChange(e)}}></input>
                    </div>
                    <div>
                        <h3>How many bars?</h3>
                        <input type="number" name="length" onChange={(e) => {handleChange(e)}}></input>
                    </div>
                </PopUp>
                

            
            <br></br>
                <ul>
                    {list.map((element) => 
                    <div key={element.name} onClick={() => setPartList(partList.concat(<Draggable><div className="elDraggable">{element.name}</div></Draggable>))} className="elementsDesign">{element.name}</div>)}
                </ul>

            <br></br>

            {partList}
        
        </div>

    );
}

export default ElementList;