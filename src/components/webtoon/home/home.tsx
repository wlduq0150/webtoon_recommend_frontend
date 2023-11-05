import axios from "axios";

const Home = () => {
    
    const onClick = (e: any) => {
        axios.get("http://localhost:5000/user/test", { withCredentials: true })
        .then((data) => {
            console.log(data);
        });
    }

    const login = () => {
        axios.post("http://localhost:5000/auth/login", {
            userId: "test",
            password: "1234"
        }, {
            withCredentials: true,
        })
        .then((res) => {
            console.log(res);
        });
    };

    const refresh = () => {
        axios.post("http://localhost:5000/auth/refresh", null, { withCredentials: true })
        .then((res) => {
            console.log(res);
        });
        console.log("히");
    };

    const logout = () => {
        axios.post("http://localhost:5000/auth/logout", null, { withCredentials: true })
        .then((res) => {
            console.log(res);
        });
        console.log(new Date().toISOString());
    };

    return (
        <div>
            <button onClick={onClick}>테스트</button>
            <button onClick={login}>로그인</button>
            <button onClick={refresh}>재발급</button>
            <button onClick={logout}>로그아웃</button>
        </div>
    )
}

export default Home;