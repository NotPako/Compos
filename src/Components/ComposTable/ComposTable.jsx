import React, { useState, useEffect } from 'react';
import { Table, Input, Cascader, Popconfirm, Empty, Checkbox} from 'antd';
import { getCompos, deleteCompo, makePublic } from '../../Services/CompoManagement';
import { DeleteOutlined } from '@ant-design/icons';
import { SearchOutlined, RobotOutlined } from '@ant-design/icons';
import { useUserContext } from '../../Providers/LoggedUserProvider';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './ComposTable.css';

const ComposTable = ({ isMine, thisWeek}) => {
  const [dataSource, setDataSource] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [instrCasc, setInstrCasc] = useState('');
  const { user } = useUserContext();
  const navigate = useNavigate();

  const search = (data) => {
    if (instrCasc === '') {
      return data.filter((item) =>
        item.title.toLowerCase().startsWith(searchText)
      );
    } else {
      const firsData = data.filter((item) =>
        item.title.toLowerCase().startsWith(searchText)
      );
      return firsData.filter((item) => item.instrument.startsWith(instrCasc));
    }
  };

  const goToView = (element) => {
    navigate('/viewMode', { state: `${element.id}` });
  };

  const goToEdit = (element) => {
    navigate('/editMode', { state: `${element.id}` });
  };

  const onPublicChange = (record) => (event) => {
	if (event.target.checked) {
	  makePublic(record.id, true)
	  // Perform any other actions you want when the checkbox is checked
	} else {
		makePublic(record.id, false)
	}

	
  };

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  useEffect(() => {
    if (isMine === 'true') {
      getCompos(user.username)
        .then((res) => {
          setDataSource(res);
          console.log(res);
        })
        .catch((error) => console.log(error));
    } else {
      if (thisWeek === 'false') {
        getCompos()
          .then((res) => {
            setDataSource(res);
            console.log(res);
          })
          .catch((error) => console.log(error));
      } else if (thisWeek === 'true') {
        getCompos()
          .then((res) => {
            setDataSource(res);
          })
          .catch((error) => console.log(error));
      }
    }
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'title',
      key: 'name',
      render: (text, record) => (
        <label
          key={text}
          className='labeLink'
          onClick={() => {
            if (isMine === 'false') {
              goToView(record);
            } else {
              goToEdit(record);
            }
          }}
        >
          {text}
        </label>
      ),
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Created in',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Instrument',
      dataIndex: 'instrument',
      key: 'instrument',
    },
	{
		title: isMine === 'true' ? 'Share with the world' : '',
		render: isMine === 'true' ? (record) => (<Checkbox defaultChecked={record.public} onChange={onPublicChange(record)}/>): () => {<></>; },
	},
    {
      title: '',
      render: isMine === 'true' ? (text, record) => (
        <Popconfirm
          title='Sure to delete?'
          onConfirm={() => handleDeleteRow(record)}
        >
          <DeleteOutlined className='deleteButton' />
        </Popconfirm>
      ) : () => {
        <></>;
      },
    },
	
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
    },
  ];

  const handleDeleteRow = (element) => {
    deleteCompo(element.id)
      .then(() => {
        // Update the table data after successful deletion
        getCompos(user.username)
          .then((res) => {
            setDataSource(res);
            console.log(res);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  const customLocale = {
    emptyText: (
      <Empty
        image={<RobotOutlined style={{ fontSize: '48px' }} />}
        imageStyle={{ height: 60 }}
        description={
          <span>
            You still haven't created any compo yet,{' '}
            <Link to='/createnew'>Start composing!</Link>
          </span>
        }
      />
    ),
  };

  return (
    <div className='tableContDesign'>
      <div className='filterBarDesign'>
        <Input
          style={{ width: '20rem' }}
          placeholder='Search by name'
          onChange={(e) => {
            setSearchText(e.target.value.toLowerCase());
            search(dataSource);
          }}
          value={searchText}
          prefix={<SearchOutlined />}
        ></Input>
        <Cascader
          style={{ marginLeft: '40rem' }}
          options={options}
          onChange={(value) =>
            value === undefined ? setInstrCasc('') : setInstrCasc(value[0])
          }
          placeholder='Filter by instrument'
        />
      </div>

      <Table
        columns={columns}
        dataSource={search(dataSource)}
        locale={customLocale}
      />
    </div>
  );
};

export default ComposTable;
