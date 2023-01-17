import React from 'react';
import './ElementList.css';
import PopUp from '../PopUp/PopUp';
import {useState} from 'react';
import {Button, Input, Card} from 'antd';
import {DeleteOutlined, CloseOutlined} from '@ant-design/icons';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GithubPicker } from 'react-color';



const ElementList = ({partsBlack, setPartsBlack}) => {

    let elements = [{name: 'intro', length:'8 comp', color:'white'}, 
    {name:'estribillo', length:'8 comp', color:'white'}];
    
    const [buttonPopup, setButtonPopup] = useState(false);
    const [startingPopup, setStartingPopup] = useState(false);
    const [disableMode, setDisableMode] = useState(false);
    const [compTitle, setCompTitle] = useState("New compo");
    const [editMode, setEditMode] = useState(false);
    const [projectName, setProjectName] = useState("");
    const [cardColor, setCardColor] = useState("");
    let navigate = useNavigate();

    const [list, setList] = useState(elements);

    const [part, setPart] = useState({
        name: "",
        length: 0,
        color: "white"
    })


    const [partList, setPartList] = useState([]);

    const GoAway = () => {
        navigate('../mycompos');
    }

    function createPart (name) {
        setPartList(partList.concat(<Card title={name}>{name}</Card>))
    }
    useEffect(() => {
        setStartingPopup(true);
    },[])
    


    const handleChange = (e, isItColor) => {
        if(isItColor){
            setCardColor(e.hex);
            setPart(prevState => ({...prevState, color: e.hex}))
        } else {
        setPart(prevState => ({ ...prevState, [e.target.name]: e.target.value}));
        }
        

    };

    const handleChangeName = (e) => {
        setProjectName(e.target.value);
        setCompTitle(e.target.value);
    };

   

    const addPart = () => {
        const newList = list.concat([part]);
        setButtonPopup(false);
        setList(newList);
        setDisableMode(false);
    }

    const inputHandler = (e) => {
        console.log(e.target.value);
        setCompTitle(e.target.value);

    }

    function addNewPart(){
      setButtonPopup(true);
      setDisableMode(true);
    }

    function giveItName(){
        console.log('algo');
        setStartingPopup(false);
        
    }

    const handleDeleteClick = (event, index) => {
        event.stopPropagation();
        deletePart(index);
    }

    const deletePart = (index) => {
        console.log("se borra");
        console.log(index);
        const newArray = [...list];
        newArray.splice(index, 1);
        setList(newArray);
    }

    const handleDeleteCard = (index) => {
        console.log(index);
        const newArray = [...partsBlack];
        newArray.splice(index, 1);
        setPartsBlack(newArray);
    }

    const displayIt = (element) => {
        setPartList(partList.concat(
            <Card style={{backgroundColor: `${element.color}`, width: `${parseInt(element.length) + 4}rem`}}title={element.name}></Card>));
        setPartsBlack(partsBlack.concat(
            <Card style={{backgroundColor: `${element.color}`, width: `${parseInt(element.length) + 4}rem`}}title={element.name}><CloseOutlined onClick={() => handleDeleteCard(partsBlack.length)}className='closeCardDesign'/></Card>
        ));
        
    }
   

    return(


        <div className='listDesign'>
            {editMode ? <Input defaultValue={compTitle} onChange={(e) => inputHandler(e)}style={{marginLeft:'2rem', marginTop:'1.5rem',marginBottom:'1rem', width:'200px'}}onBlur={() => setEditMode(false)}/> : 
            <h2 style={{color:'white', marginLeft:'2rem'}} onClick={() => setEditMode(true)}>{compTitle}</h2>}
            
                <Button style={{width:'12rem'}} id='newElement' onClick={() => addNewPart()}>
                    New part
                </Button>

                <PopUp trigger={buttonPopup} setTrigger={setButtonPopup} doIt={addPart}>
                    <div>
                        <h3>Add a name</h3>
                        <input type="text" placeholder="Ex. Intro" name="name" onChange={(e) => {handleChange(e)}}></input>
                    </div>
                    <div>
                        <h3>How many bars?</h3>
                        <input type="number" name="length" onChange={(e) => {handleChange(e)}}></input>
                    </div>
                    <div>
                        <h3>Select a color</h3>
                        <p>{cardColor}</p>
                    <GithubPicker color='white' onChange={(e) => handleChange(e, true)}/>
                    </div>
                   
                </PopUp>
                <PopUp newComp={true} trigger={startingPopup} setTrigger={setStartingPopup} doIt={giveItName} goAway={GoAway}>
                    <div>
                        <h3>Start with a name for your compo</h3>
                        <input type="text" placeholder="New composition" name="name" onChange={(e) => {handleChangeName(e)}}></input>
                    </div>
                    
                </PopUp>
                

            
            <br></br>
                <ul>
                    {list.map((element, index) => 
                    <div key={element.name} onClick={() => displayIt(element)} className="elementsDesign">
                        
                        <Card style={{marginBottom:'1rem', width:'15rem', backgroundColor: `${element.color}`,}}title={element.name}><p>Length: {element.length}</p><p><DeleteOutlined onClick={(e) => handleDeleteClick(e, index)}className='deleteDesign'/></p></Card></div>)}
                </ul>

            <br></br>

            
        
        </div>

    );
}

export default ElementList;