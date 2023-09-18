import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { server } from "../../constants";
import { DayWebtoonType } from "../webtoon/webtoonConstants";
import WebtoonList from "../webtoon/webtoonList";
import DayWebtoonNav from "./dayWebtoonNav";

const DayWebtoonBlock = styled.div`
    width: 100%;
    height: auto;

    display: flex;
    flex-direction: column;

    margin: 0 auto;
`;

const DayWebtoon = () => {
    const [isLoading, modifierIsLoading] = useState(false);
    const [day, modifierDay] = useState("월");
    const [showWebtoon, modifierShowWebtoon] = useState<number>(0);
    const [dayWebtoons, modifierDayWebtoons] = useState<DayWebtoonType[]>([]);

    const getWebtoonForDay = useCallback(
        async (day_: string) => {
            modifierIsLoading(true);
            const webtoons: any = await axios.get(server + `/webtoons/${day_}`);
            console.log(webtoons);
            const showWebtoons = webtoons.data.slice(0, showWebtoon);
            modifierDayWebtoons(showWebtoons);
            modifierIsLoading(false);
        }, [showWebtoon]
    );

    const handleScroll = () => {
        const { scrollTop } = document.documentElement;
        const { scrollHeight } = document.body;
        const { innerHeight } = window;

        if (!isLoading && (scrollTop + innerHeight) >= scrollHeight - 200) {
            modifierShowWebtoon(showWebtoon + 21);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, true);
        return () => {
            window.removeEventListener("scroll", handleScroll, true);
        }
    });

    useEffect(() => {
        modifierShowWebtoon(15);
    }, [day]);

    useEffect(() => {
        getWebtoonForDay(day);
    }, [day, getWebtoonForDay]);

    const onClick = (e: any) => {
        modifierDayWebtoons([]);
        modifierDay(e.target.getAttribute("name"));
    }

    return (
        <DayWebtoonBlock>
            <DayWebtoonNav day={day} onClick={onClick} ></DayWebtoonNav>
            <WebtoonList dayWebtoons={dayWebtoons}></WebtoonList>
        </DayWebtoonBlock>
    )

}

export default DayWebtoon;