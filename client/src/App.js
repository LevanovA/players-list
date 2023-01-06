import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import Navigation from './navigation';
import './index.scss';

function App() {
    const { Header, Footer, Content } = Layout;

    return (
        <Layout>
            <Header>
                <div className="wrapper">
                    <div className="header">
                        <Link className="link" to={'/'}>
                            Главная
                        </Link>
                        <Link className="link" to={'/commonList'}>
                            Общий список
                        </Link>
                    </div>
                </div>
            </Header>
            <Content>
                <Navigation />
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
