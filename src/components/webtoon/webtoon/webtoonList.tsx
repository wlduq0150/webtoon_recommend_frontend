import styled from "styled-components";
import Loading from "../../extras/loading";
import Webtoon from "./webtoon";
import { DayWebtoonType } from "./webtoonConstants";
import { WebtoonListProps } from "./webtoonProps";

const WebtoonListblock = styled.div`
    width: 100%;
    height: auto;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.05%;
`;

const WebtoonList = (props: WebtoonListProps) => {
    return (
        <WebtoonListblock>
            { props.dayWebtoons.length ? (
                props.dayWebtoons.map(
                    (dayWebtoon: DayWebtoonType) => {
                        return <Webtoon 
                            key={"#" + dayWebtoon.id}
                            id={dayWebtoon.id}
                            title={dayWebtoon.title}
                            category={dayWebtoon.category}
                            updateDay={dayWebtoon.updateDay}
                            thumbnail={dayWebtoon.thumbnail}
                            service={dayWebtoon.service}
                            episodeLength={dayWebtoon.episodeLength}
                            fanCount={dayWebtoon.fanCount}
                        ></Webtoon>
                    }
                )
            ) :
            <Loading></Loading> }
        </WebtoonListblock>
    )
}

export default WebtoonList;