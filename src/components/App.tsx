import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../css/App.css';
import Main from './main/main';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={Main}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
