import React from 'react';
import Blackboard from '../../Components/Blackboard/Blackboard';
import { useLocation} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCompoById } from '../../Services/CompoManagement';

const ViewMode = () => {
    const location = useLocation();
    const id = location.state;
    const [list, setList] = useState([]);

    useEffect(() => {
        
        getCompoById(id).then(
            element => {setList(element.blackList);
            console.log(element.blackList)}
        )
    }, [])


 return (
   <></>

 )
}

export default ViewMode;