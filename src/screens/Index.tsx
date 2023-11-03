import { Routes, Route } from 'react-router-dom';
import Main from './main/main/Main';
import Notfound from './componentsGlobol/Notfound';
import Comparison from './comparison/Comparison';
import ReloadRefs from './reloadRefs/ReloadRefs';

function Index() {

    return (
        <Routes>
            <Route index element={<Main />} />
            <Route path="/ad" element={<Comparison />} />
            <Route path="/op" element={<ReloadRefs />} />
            <Route path="*" element={<Notfound />} />
        </Routes>
    )
}

export default Index;