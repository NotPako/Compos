import React from 'react';
import { Button } from 'antd';
import './Create.css';
import ElementList from '../../Components/ElementList/ElementList';
import Blackboard from '../../Components/Blackboard/Blackboard';
import { useState } from 'react';



const Create = () => {

    const[partsBlack, setPartsBlack] = useState([]);

    return(
    <div>
        <ElementList partsBlack={partsBlack} setPartsBlack={setPartsBlack}/>
        <Blackboard partsList={Object.entries(partsBlack)}/>
    </div>
    )
}

export default Create;