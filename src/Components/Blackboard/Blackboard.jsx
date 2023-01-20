import React from 'react';
import './Blackboard.css';
import { Button } from 'antd/es/radio';
import {SaveOutlined} from '@ant-design/icons'



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