import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../css/App.css';
import Main from './main/main';
import Login from './auth/login';
import Signup from './auth/singUp';
import TokenRefresher from './auth/tokenRefresher';
import { Provider } from 'react-redux';
import { useStore } from './store';

function App() {
    const store = useStore();
    return (
        <Provider store={store}>
            <BrowserRouter>
                <TokenRefresher></TokenRefresher>
                <Routes>
                    <Route path="/" Component={Main}></Route>
                    <Route path="/login" Component={Login}></Route>
                    <Route path="/signup" Component={Signup}></Route>
                </Routes>
            </BrowserRouter>
        </Provider>
        
    );
}

export default App;
