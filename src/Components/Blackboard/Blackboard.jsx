import React from 'react';
import './Blackboard.css';
import Draggable from "react-draggable";
import PopUp from '../PopUp/PopUp';
import {useState} from 'react';


const Blackboard = ({partsList}) => {


    
    return(
    
        <div className='pizarraDesign'>
        {partsList.map((part, index) => (
          <div key={index}>{part}</div>
        ))}
      </div>

      
    );
}

export default Blackboard;