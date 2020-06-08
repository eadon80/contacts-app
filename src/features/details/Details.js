import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleContact } from './detailsSlice';

import { Avatar, Descriptions } from 'antd';

export default ({id}) => {
    const dispatch = useDispatch();
    const contact = useSelector(({ details }) => {
        console.log(details);
        return details;
    });

    useEffect(() => {
        dispatch(fetchSingleContact(id));
    }, []);

    return (
        <div>
            
            <Descriptions title="User Info">
                <Descriptions.Item >
                    <Avatar size={100} src={contact.avatar} />
                </Descriptions.Item>
                <Descriptions.Item label="First Name">{contact.first_name}</Descriptions.Item>
                <Descriptions.Item label="Last Name">{contact.last_name}</Descriptions.Item>
                <Descriptions.Item label="Email">{contact.email}</Descriptions.Item>
            </Descriptions>
        </div>
    )
}