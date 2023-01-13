import React from 'react';
import { Button } from 'antd';
import './Create.css';
import ElementList from '../../Components/ElementList/ElementList';
import Blackboard from '../../Components/Blackboard/Blackboard';



const Create = () => {
    return(
    <div>
        <ElementList/>
        <Blackboard/>
    </div>
    )
}

export default Create;