import React, { useState, useEffect } from 'react';
import {Button, Input} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import {Vex, EasyScore, System} from 'vexflow';

const SheetMusic = ({ onChange, onlySheet, thisSheet }) => {

  const [newVoice, setNewVoice] = useState('');

  useEffect(() => {
    if (onlySheet && thisSheet && thisSheet !== '') {
      setNewVoice(thisSheet);
    }
  }, [onlySheet, thisSheet]);

  useEffect(() => {
    if (onlySheet && newVoice !== '') {
      // Trigger your desired function here
      handleButtonClick()
    }
  }, [newVoice]);


  const handleInputChange = (e) => {
    const updatedValue = e.target.value;
    setNewVoice(updatedValue);
    onChange(updatedValue)
  }

  const handleButtonClick = () => {
    const { Factory } = Vex.Flow;

// Create a VexFlow renderer attached to the DIV element with id="output".
const vf = new Factory({ renderer: { elementId: 'sheet-music' } });
const score = vf.EasyScore();
const system = vf.System();

// Create a 4/4 treble stave and add two parallel voices.
system.addStave({
  voices: [
    // Top voice has 4 quarter notes with stems up.
    score.voice(score.notes(newVoice, { stem: 'up' })),

  ]
}).addClef('treble').addTimeSignature('4/4');

// Draw it!
vf.draw();
  };

  return(
    <>
    { onlySheet ? (
      <>
      </>
    ) : <>
            <Button onClick={handleButtonClick}><PlusOutlined/>Add sheet</Button>
      <Input placeholder='EasyNote' style={{marginLeft:'2rem', width:'200px'}} onChange={handleInputChange}></Input>
    </>
    }
    <div id="sheet-music"></div>
    </>
  );
};

export default SheetMusic;
