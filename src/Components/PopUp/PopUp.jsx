import React from 'react';
import './PopUp.css';
import {Popover2} from '@blueprintjs/popover2'
import ElementList from '../ElementList/ElementList';
import Button from 'antd';
import { useNavigate } from 'react-router-dom';




const PopUp = (props) => {

   

    return (props.trigger) ? (
       <div className="popup">
        <div className="popup-inner">
            { props.newComp ? 
            (<>
            <button className="close-btn" onClick={props.goAway}>
                Cancel
            </button>
            <button className="add-btn" onClick={ 
                props.doIt
                }>
                Start
            </button>
            </>):  (
                <>
            <button className="close-btn" onClick={() => props.setTrigger(false)}>
                Cancel
            </button>
            <button className="add-btn" onClick={ 
                props.doIt
                }>
                Add
            </button> </>) }
           
            {props.children}
        </div>
       </div>
    ) : "";

}

export default PopUp;