import { Routes, Route } from 'react-router-dom';
import Main from './Pages/main';
import CommonList from './Pages/commonList';

const Routing = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Main />} />
            <Route path={'/commonList'} element={<CommonList />} />
        </Routes>
    );
};

export default Routing;
