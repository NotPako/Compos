import React from 'react';
import { Button } from 'antd';
import './Create.css'

const Create = () => {
    return(
    <div>
        <div className='partsBarDesign'>
            <h2 style={{color:'white'}}>New composition</h2>
            <br/>
            <Button>New Part</Button>

        </div>
    </div>
    )
}

export default Create;