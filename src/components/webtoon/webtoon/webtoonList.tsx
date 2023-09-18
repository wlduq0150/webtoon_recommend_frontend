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
                            key={dayWebtoon.webtoonId}
                            webtoonId={dayWebtoon.webtoonId}
                            title={dayWebtoon.title}
                            author={dayWebtoon.author}
                            thumbnail={dayWebtoon.thumbnail}
                            service={dayWebtoon.service}
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