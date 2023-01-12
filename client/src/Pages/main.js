import React, { useEffect, useState } from 'react';
import { List, Typography, Calendar, Button } from 'antd';
import Api from '../requests/Api';
import dayjs from 'dayjs';
// import updateLocale from 'dayjs/plugin/updateLocale';
import 'dayjs/locale/ru';

const Main = () => {
    const { Title } = Typography;
    const [mainList, setMainList] = useState([]);
    const [additionalList, setAdditionalList] = useState([]);
    const [isWorkout, setIsWorkout] = useState(true);
    const [currentDate, setCurrentDate] = useState('22.02.2023');
    const request = new Api();

    // dayjs.extend(updateLocale);
    // dayjs.updateLocale('en', {
    //     months: ['Янв', 'Фев', 'Март', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    // });

    useEffect(() => {
        setCurrentDate(dayjs().format('DD.MM.YYYY'));

        request.getPlayers().then((res) => {
            changePlayersList(res);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const moveToAdditionalList = () => {
        console.log(111, 'doit');
    };

    const moveToMainlList = () => {
        console.log(222, 'doit');
    };

    const selectDate = (value) => {
        // console.log(333, value);
        const formData = new FormData();
        const date = dayjs(value.$d).format('DD.MM.YYYY');

        setCurrentDate(date);

        //Если вторник или четверг, то выводим календарь
        value.$W === 2 || value.$W === 4 ? setIsWorkout(true) : setIsWorkout(false);

        formData.append('date', date);

        request.getPlayersOnDate(formData).then((res) => {
            console.log(777, res.date);
            changePlayersList(res.playerList);
        });
    };

    const changePlayersList = (playersList) => {
        let mainPlayers = [];
        let additionalPlayers = [];
        playersList.map((item) => (item?.type === '0' ? mainPlayers.push(item) : additionalPlayers.push(item)));
        setMainList(mainPlayers);
        setAdditionalList(additionalPlayers);
    };

    return (
        <div className="main">
            <div className="wrapper">
                <div className="content">
                    {isWorkout && (
                        <Title className="content__title" level={2}>
                            Тренировка {currentDate}
                        </Title>
                    )}
                    <div className="content__flex">
                        <div className="content__el content__el--list">
                            {!isWorkout ? (
                                <div className="content__no-workout">В этот день нет тренировки</div>
                            ) : (
                                <div className="content__box">
                                    <Title level={3}>Основной состав</Title>
                                    <div className="players-list">
                                        <List
                                            size="large"
                                            bordered
                                            dataSource={mainList}
                                            renderItem={(item, index) => (
                                                <List.Item
                                                    actions={[
                                                        <Button
                                                            type="primary"
                                                            onClick={() => {
                                                                moveToAdditionalList(item.id, item.name, item.surname);
                                                            }}
                                                            htmlType="button"
                                                        >
                                                            В дополнительный
                                                        </Button>,
                                                    ]}
                                                >
                                                    {index + 1 + '. ' + item?.name + ' ' + item?.surname}
                                                </List.Item>
                                            )}
                                        />
                                    </div>
                                    <Title level={3}>Дополнительный состав</Title>
                                    <div className="players-list">
                                        <List
                                            size="large"
                                            bordered
                                            dataSource={additionalList}
                                            renderItem={(item, index) => (
                                                <List.Item
                                                    actions={[
                                                        <Button
                                                            type="primary"
                                                            onClick={() => {
                                                                moveToMainlList(item.id, item.name, item.surname);
                                                            }}
                                                            htmlType="button"
                                                        >
                                                            В основной
                                                        </Button>,
                                                    ]}
                                                >
                                                    {index + 1 + '. ' + item?.name + ' ' + item?.surname}
                                                </List.Item>
                                            )}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="content__el content__el--calendar">
                            <div className="site-calendar-demo-card">
                                <Calendar fullscreen={false} onSelect={selectDate} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
