import React, { useEffect, useState } from 'react';
import { List, Typography, Button, Form, Input, Select } from 'antd';
import Api from '../requests/Api';

const CommonList = () => {
    const { Title } = Typography;
    const count = 3;
    const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
    const [list, setList] = useState([]);
    const [mainList, setMainList] = useState([]);
    const [additionalList, setAdditionalList] = useState([]);
    const request = new Api();

    const onFinish = (values) => {
        let formData = new FormData();

        Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
        });

        request.createPlayer(formData).then((res) => {
            setMainList(mainList.push(res));
        });
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        // request.getPlayers().then((res) => {
        //     res.map((item) => (item?.type === '0' ? setMainList(mainList.push(item)) : setAdditionalList(additionalList.push(item))));
        //     console.log(333, mainList);
        // });
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((res) => {
                setList(res.results);
                console.log(999, list);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const moveToAdditionalList = () => {
        console.log(111, 'doit');
    };

    const moveToMainlList = () => {
        console.log(222, 'doit');
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    return (
        <div className="common-list">
            <div className="wrapper">
                <div className="content">
                    <div className="content__form">
                        <Form
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Фамилия"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Заполните поле',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Имя"
                                name="surname"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Заполните поле',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="В какой состав"
                                name="type"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Заполните поле',
                                    },
                                ]}
                            >
                                <Select
                                    style={{
                                        width: 200,
                                    }}
                                    onChange={handleChange}
                                    options={[
                                        {
                                            value: '0',
                                            label: 'Основной состав',
                                        },
                                        {
                                            value: '1',
                                            label: 'Дополнительный состав',
                                        },
                                    ]}
                                />
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Добавить игрока
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <Title level={3}>Основной состав</Title>
                    <div className="players-list">
                        <List
                            size="large"
                            bordered
                            dataSource={list}
                            renderItem={(item, index) => (
                                <List.Item
                                    actions={[
                                        <Button type="primary" onClick={moveToAdditionalList} htmlType="button">
                                            В дополнительный
                                        </Button>,
                                        <Button type="primary" onClick={moveToAdditionalList} htmlType="button" danger>
                                            Удалить
                                        </Button>,
                                    ]}
                                >
                                    {index + 1 + '. '}
                                    {item?.name.last + ' ' + item?.surname}
                                </List.Item>
                            )}
                        />
                    </div>
                    <Title level={3}>Дополнительный состав</Title>
                    <div className="players-list">
                        <List
                            size="large"
                            bordered
                            dataSource={list}
                            renderItem={(item, index) => (
                                <List.Item
                                    actions={[
                                        <Button type="primary" onClick={moveToMainlList} htmlType="button">
                                            В основной
                                        </Button>,
                                        <Button type="primary" onClick={moveToAdditionalList} htmlType="button" danger>
                                            Удалить
                                        </Button>,
                                    ]}
                                >
                                    {index + 1 + '. '}
                                    {item?.name.last + ' ' + item?.surname}
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommonList;
