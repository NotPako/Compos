import React from 'react';
import './Blackboard.css';
import { Button } from 'antd/es/radio';



const Blackboard = ({partsList}) => {


    
    return(
    <div>
        <div className='pizarraDesign'>
        {partsList.map((part, index) => (
          <div key={index}>{part}</div>
        ))}
      </div>
      <Button size='large' style={{position:'fixed', bottom:'20px', right:'20px'}}>Save state</Button>
      </div>

      
    );
}

export default Blackboard;