import { useState } from "react";
import styled from "styled-components";
import Incomplete from "../extras/incomplete";
import WebtooonHeader from "../template/header/header";
import WebtoonNav from "../template/navigation/navigation";
import WebtoonTemplate from "../template/template";
import DayWebtoon from "../webtoon/day/dayWebtoon";
import Recommend from "../webtoon/recommend/recommend";

const MainBlock = styled.div`
    margin: 0;
    width: 100%;
    background: gray;
`

const Main = () => {
    const [selected, modifierSelected] = useState("home");
    return (
        <MainBlock>
            <WebtoonTemplate>
                <WebtooonHeader></WebtooonHeader>
                <WebtoonNav selected={selected} modifierSelected={modifierSelected}></WebtoonNav>
                { selected === "home" ? <Incomplete></Incomplete> : null }
                { selected === "day" ? <DayWebtoon></DayWebtoon> : null }
                { selected === "finish" ? <Incomplete></Incomplete> : null }
                { selected === "recommend" ? <Recommend></Recommend> : null }
                
            </WebtoonTemplate>
        </MainBlock>
    );
};

export default Main;
