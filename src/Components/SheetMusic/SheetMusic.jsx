import React, { useEffect } from 'react';
import {Button, Input} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import Vex from 'vexflow';

const SheetMusic = () => {
  const handleButtonClick = () => {
    const VF = Vex.Flow;

    // Create an SVG renderer and attach it to a container
    const div = document.getElementById('sheet-music');
    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

    // Size the renderer
    renderer.resize(500, 200);

    // Create a new context
    const context = renderer.getContext();

    // Create a stave
    const stave = new VF.Stave(10, 0, 400);

    // Add a clef and time signature
    stave.addClef('treble').addTimeSignature('4/4');

    // Connect the stave to the rendering context
    stave.setContext(context).draw();

    // Create the notes
    const notes = [
      new VF.StaveNote({ keys: ['g/4'], duration: 'q' }),
      new VF.StaveNote({ keys: ['g/4'], duration: 'q' }),
      new VF.StaveNote({ keys: ['g/4'], duration: 'q' }),
      new VF.StaveNote({ keys: ['g/4'], duration: 'q' }),
    ];

    // Add the notes to a voice
    const voice = new VF.Voice().addTickables(notes);

    // Format and justify the notes within the stave
    const formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);

    // Render the voice onto the stave
    voice.draw(context, stave);
  };

  return(
    <>
    <div id="sheet-music"></div>
    <Button onClick={handleButtonClick}><PlusOutlined/>Add voice</Button>
    <Input placeholder='EasyNote' style={{marginLeft:'2rem', width:'200px'}}></Input>
    </>
  );
};

export default SheetMusic;
