import React, { useEffect, useState } from 'react';
import { Layout, Avatar, List, Skeleton, Typography, Calendar } from 'antd';
import './index.scss';

function App() {
    const { Header, Footer, Content } = Layout;
    const { Title } = Typography;
    const count = 3;
    const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
    // const [data, setData] = useState([]);
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
        <Layout>
            <Header>
                <div className="wrapper">
                    <div className="header">
                        <div className="header__text">Header</div>
                    </div>
                </div>
            </Header>
            <Content>
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
                                        className="demo-loadmore-list"
                                        // loading={initLoading}
                                        itemLayout="horizontal"
                                        // loadMore={loadMore}
                                        dataSource={list}
                                        renderItem={(item) => (
                                            <List.Item
                                                actions={[
                                                    <button type="button" onClick={moveToAdditionalList} key="list-loadmore-edit">
                                                        Освободить место
                                                    </button>,
                                                ]}
                                            >
                                                <Skeleton avatar title={false} loading={item.loading} active>
                                                    <List.Item.Meta
                                                        avatar={<Avatar src={item.picture.large} />}
                                                        title={<a href="https://ant.design">{item.name?.last}</a>}
                                                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                                    />
                                                    {/* <div>content</div> */}
                                                </Skeleton>
                                            </List.Item>
                                        )}
                                    />
                                </div>
                                <Title level={3}>Дополнительный состав</Title>
                                <div className="players-list">
                                    <List
                                        className="demo-loadmore-list"
                                        // loading={initLoading}
                                        itemLayout="horizontal"
                                        // loadMore={loadMore}
                                        dataSource={list}
                                        renderItem={(item) => (
                                            <List.Item
                                                actions={[
                                                    <button type="button" onClick={moveToMainlList} key="list-loadmore-edit">
                                                        Участвовать в тренировке
                                                    </button>,
                                                ]}
                                            >
                                                <Skeleton avatar title={false} loading={item.loading} active>
                                                    <List.Item.Meta
                                                        avatar={<Avatar src={item.picture.large} />}
                                                        title={<a href="https://ant.design">{item.name?.last}</a>}
                                                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                                    />
                                                    {/* <div>content</div> */}
                                                </Skeleton>
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
            </Content>
            <Footer>
                <div className="wrapper">
                    <div className="footer">
                        <div className="footer__text">Footer</div>
                    </div>
                </div>
            </Footer>
        </Layout>
    );
}

export default App;
