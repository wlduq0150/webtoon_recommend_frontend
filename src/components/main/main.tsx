import { useState } from "react";
import styled from "styled-components";
// import Incomplete from "../extras/incomplete";
import WebtooonHeader from "../template/header/header";
import WebtoonNav from "../template/navigation/navigation";
import WebtoonTemplate from "../template/template";
import DayWebtoon from "../webtoon/day/dayWebtoon";
import FinishWebtoon from "../webtoon/finish/finishWebtoon";
import Home from "../webtoon/home/home";
import Recommend from "../webtoon/recommend/recommend";
import { useSelector } from "react-redux";
import { authState } from "../store/state/authState";

const MainBlock = styled.div`
    margin: 0;
    width: 100%;
    background: gray;
`;

const Main = () => {
    const [selected, modifierSelected] = useState("home");
    const test = useSelector<authState, number>(state => state.id);
    console.log("auth 테스트입니다", test);
    return (
        <MainBlock>
            <WebtoonTemplate>
                <WebtooonHeader></WebtooonHeader>
                <WebtoonNav selected={selected} modifierSelected={modifierSelected}></WebtoonNav>
                { selected === "home" ? <Home></Home> : null }
                { selected === "day" ? <DayWebtoon></DayWebtoon> : null }
                { selected === "finish" ? <FinishWebtoon></FinishWebtoon> : null }
                { selected === "recommend" ? <Recommend></Recommend> : null }
                
            </WebtoonTemplate>
        </MainBlock>
    );
};

export default Main;
