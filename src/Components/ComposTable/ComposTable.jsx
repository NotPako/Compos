import React from 'react'
import { Table, Input, Cascader} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './ComposTable.css';

const ComposTable = () => {

    const columns = [{
        title: 'Name',
        dataIndex: 'name',
        key:'name'
    },
    {
        title: 'Author',
        dataIndex:'author',
        key:'author'
    },
    {
        title: 'Created in',
        dataIndex: 'createdIn',
        key:'createdIn',
    },
    {
        title: 'Instrument',
        dataIndex: 'instrument',
        key: 'instrument'
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
    
  return (
    <div className='tableContDesign'>
        <div className='filterBarDesign'>
        <Input style={{width:'20rem'}}placeholder='Search by name' prefix={<SearchOutlined/>}></Input>
        <Cascader style={{marginLeft:'40rem'}}options={options} placeholder="Filter by instrument"/>
        </div>
        
        <Table columns={columns}/>
    </div>
  )
}

export default ComposTable