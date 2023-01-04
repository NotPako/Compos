import React from 'react';
import './PopUp.css';
import {Popover2} from '@blueprintjs/popover2'
import ElementList from '../ElementList/ElementList';




const PopUp = (props) => {

    return (props.trigger) ? (
       <div className="popup">
        <div className="popup-inner">
            <button className="close-btn" onClick={() => props.setTrigger(false)}>
                Cancel
            </button>
            <button className="add-btn" onClick={ 
                props.doIt
                }>
                Add
            </button>
            {props.children}
        </div>
       </div>
    ) : "";

}

export default PopUp;