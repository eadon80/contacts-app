import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts, updateContacts, deleteContact, selectContacts } from './listSlice';

import { Table, Button } from 'antd';
import { HeartOutlined, HeartFilled, CloseCircleFilled } from '@ant-design/icons';
import styles from './List.module.css';



export default () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const dispatch = useDispatch();
    const contacts = useSelector(selectContacts);
    const history = useHistory();

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys);
        },
    };

    const makeFavorite = (id, isFavorite) => {
        dispatch(updateContacts(id, isFavorite));
    };
    
    const deleteUser = (id) => {
        dispatch(deleteContact(id));
    };
    
    const makeFavoriteSelected = () => {
        selectedRowKeys.forEach(id => {
            dispatch(updateContacts(id, true));
        });
    };

    const deleteUserSelected = () => {
        selectedRowKeys.forEach(id => {
            dispatch(deleteContact(id));
        });
    };
    
    const columns = [
        {
            title: 'First name',
            dataIndex: 'first_name',
        },
        {
            title: 'Last name',
            dataIndex: 'last_name',
        },
        {
            title: 'Make favorite',
            width: 200,
            align: 'center',
            render: (item) => 
                <div
                    className={styles.rose}
                    onClick={(e) => makeFavorite(item.id, !item.favorite)}
                >
                    {item.favorite ? <HeartFilled /> : <HeartOutlined />}
                </div>
        },
        {
            title: 'Delete', 
            width: 100,
            align: 'center',
            render: (item) =>
                <div
                    className={styles.red}
                    onClick={(e) => deleteUser(item.id)}
                >
                    <CloseCircleFilled />
                </div>
        }
    ];

    useEffect(() => {
        dispatch(fetchContacts());
    }, []);

    return (
        <React.Fragment>
            <Table
                onRow={record => {
                    return {
                        onDoubleClick: (e) => {
                            history.push(`/list/${record.id}`);
                        }
                    }
                }}
                rowSelection={rowSelection}
                dataSource={Object.values(contacts.data)}
                columns={columns}
                rowKey={record => record.id}
            />
            <Button disabled={!selectedRowKeys.length} onClick={makeFavoriteSelected}>
                <HeartFilled /> Make favorite selected
            </Button>
            <Button disabled={!selectedRowKeys.length} onClick={deleteUserSelected}>
                <CloseCircleFilled /> Delete selected
            </Button>
        </React.Fragment>
    )
}