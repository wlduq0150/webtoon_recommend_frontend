import axios from "axios";

const Home = () => {
    
    const onClick = (e: any) => {
        axios.get("https://finding-restaurant.run.goorm.site/data-manager/test");
    }

    return (
        <div>
            <button onClick={onClick}>테스트</button>
        </div>
    )
}

export default Home;