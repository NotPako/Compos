import React, {useState, useEffect} from 'react'
import { Table, Input, Cascader, Popconfirm} from 'antd';
import { getCompos, deleteCompo } from '../../Services/CompoManagement';
import { DeleteOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import { useUserContext } from '../../Providers/LoggedUserProvider';

import './ComposTable.css';

const ComposTable = ({isMine, thisWeek}) => {

    const [dataSource, setDataSource] = useState([]);
    const [searchText, setSearchText] = useState("");
    const user = useUserContext();

    const search = (data) => {
        return data.filter((item) => item.title.toLowerCase().startsWith(searchText));
    }
    
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    useEffect(() => {

        if(isMine === 'true'){
            getCompos(user.username).then(
              res => {
                setDataSource(res);
                console.log(res);
              }
            ).catch(error => console.log(error))
        } else {
            if(thisWeek === 'false'){
            getCompos().then(
                res => {
                  setDataSource(res);
                  console.log(res);
                }
              ).catch(error => console.log(error))
            } else if(thisWeek === 'true'){
                getCompos().then(
                    res => {
                    const filteredWeek = res.filter((item) => {
                        const itemDate = new Date(item.date);
                        return itemDate >= oneWeekAgo;
                    })
                      setDataSource(filteredWeek);
                      console.log(res);
                    }
                  ).catch(error => console.log(error))
            }
        }
            
        
      
      }, [])

     

    const columns = [{
        title: 'Name',
        dataIndex: 'title',
        key:'name'
    },
    {
        title: 'Author',
        dataIndex:'author',
        key:'author'
    },
    {
        title: 'Created in',
        dataIndex: 'date',
        key:'date',
    },
    {
        title: 'Instrument',
        dataIndex: 'instrument',
        key: 'instrument'
    },
    {
        title: '',
        render: isMine === 'true' ? (text, record) => (
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDeleteRow(record)}>
                <DeleteOutlined className='deleteButton'/>
            </Popconfirm>
        
        ) : () => {
            <></>
        }
        
    }
];

const options = [
    {
      value: 'Pianist',
      label: 'Pianist',
      
    },
    {
        value: 'Drummer',
        label: 'Drummer',
    },
    {
        value: 'Guitarrist',
        label: 'Guitarrist',
    },
    {
        value: 'Singer',
        label: 'Singer',
    },
    {
        value: 'Trombone',
        label: 'Trombone',
    }
]

const handleDeleteRow = (element) => {
    
    deleteCompo(element.id);
    getCompos(user.username).then(
        res => {
          setDataSource(res);
          console.log(res);
        }
      ).catch(error => console.log(error))
}


    
  return (
    <div className='tableContDesign'>
        <div className='filterBarDesign'>
        <Input style={{width:'20rem'}}placeholder='Search by name' onChange={(e) => setSearchText(e.target.value.toLowerCase())} value={searchText} prefix={<SearchOutlined/>}></Input>
        <Cascader style={{marginLeft:'40rem'}}options={options} placeholder="Filter by instrument"/>
        </div>
        
        <Table columns={columns} dataSource={search(dataSource)}/>
    </div>
  )
}

export default ComposTable