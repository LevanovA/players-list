import React, { useEffect, useState } from 'react';
import { List, Typography, Calendar } from 'antd';
const Main = () => {
    const { Title } = Typography;
    const count = 3;
    const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
    const [list, setList] = useState([]);

    useEffect(() => {
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((res) => {
                // setInitLoading(false);
                console.log(999, res);
                // setData(res.results);
                setList(res.results);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const moveToAdditionalList = () => {
        console.log(111, 'doit');
    };

    const moveToMainlList = () => {
        console.log(222, 'doit');
    };

    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };

    const selectDate = (value) => {
        console.log(333, value);
    };
    return (
        <div className="main">
            <div className="wrapper">
                <div className="content">
                    <Title className="content__title" level={2}>
                        Тренировка 22.02.2022
                    </Title>
                    <div className="content__flex">
                        <div className="content__el content__el--list">
                            <Title level={3}>Основной состав</Title>
                            <div className="players-list">
                                <List
                                    size="large"
                                    bordered
                                    dataSource={list}
                                    renderItem={(item, index) => (
                                        <List.Item
                                            actions={[
                                                <button type="button" onClick={moveToAdditionalList} key="list-loadmore-edit">
                                                    Освободить место
                                                </button>,
                                            ]}
                                        >
                                            {index + 1 + '. '}
                                            {item.name?.last}
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
                                                <button type="button" onClick={moveToMainlList} key="list-loadmore-edit">
                                                    Участвовать в тренировке
                                                </button>,
                                            ]}
                                        >
                                            {index + 1 + '. '}
                                            {item.name?.last}
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="content__el content__el--calendar">
                            <div className="site-calendar-demo-card">
                                <Calendar fullscreen={false} onPanelChange={onPanelChange} onSelect={selectDate} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
