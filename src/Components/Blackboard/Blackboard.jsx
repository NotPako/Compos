import React from 'react';
import './Blackboard.css';




const Blackboard = ({partsList}) => {


    
    return(
    <div>
        <div className='pizarraDesign'>
        {partsList.map((part, index) => (
          <div key={index}>{part}</div>
        ))}
      </div>
      </div>

      
    );
}

export default Blackboard;