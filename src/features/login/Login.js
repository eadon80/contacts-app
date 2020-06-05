import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Input, Form, Button } from 'antd';

import { tryToLogin, selectLogin } from './loginSlice';
import styles from './Login.module.css';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

export default () => {
    const { isAuthorized, errors, username, token, theme } = useSelector(selectLogin);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('userData')) {
            history.push('/list');
        }
    }, []);

    useEffect(() => {
        const fields = Object.keys(errors).map(key => {
            return {
                name: key,
                errors: errors[key]
            }
        });

        form.setFields(fields);
    }, [errors]);

    useEffect(() => {
        if (isAuthorized) {
            const userData = JSON.stringify({ username, token, theme });
            localStorage.setItem('userData', userData);
            history.push('/list');
        }
    }, [isAuthorized]);

    const onFinish = values => {
        dispatch(tryToLogin(values));
    };

    return (
        <div className={styles.wrapper}>
            <Form
                {...layout}
                className={styles.form}
                name="login"
                form={form}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}