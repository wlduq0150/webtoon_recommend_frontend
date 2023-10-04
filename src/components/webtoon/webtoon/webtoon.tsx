import styled from "styled-components";
import { ThumnailProps, WebtoonProps } from "./webtoonProps";

const WebtoonBlock = styled.div`
    width: 33.3%;
    
    display: flex;
    flex-direction: column;
`;

const Thumbnail = styled.div<ThumnailProps>`
    width: 100%;
    height: 200px;

    background-image: url(${(props: ThumnailProps) => props.thumbnail});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
`

const TitleLine = styled.div`
    width: 100%;
    height: auto;

    box-sizing: border-box;

    padding: 2px;

    font-size: 14px;
    font-weight: 1000;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
`;

const InfoLine = styled.div`
    width: 100%;
    height: auto;

    box-sizing: border-box;

    padding: 2px;

    font-size: 12px;
    font-weight: bold;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
`;

const InfoLineLeft = styled.div`
    float: left;
`;

const InfoLienRight = styled.div`
    float: right;
`;

const transformFanCount = (fanCount: number) => {
    const first: string = fanCount.toString()[0];
    if (fanCount < 10) {
        return first;
    } else if (fanCount < 100) {
        return first + "십";
    } else if (fanCount < 1000) {
        return first + "백";
    } else if (fanCount < 10000) {
        return first + "천";
    }
    return Math.floor(fanCount / 10000) + "만";
}

const Webtoon = (props: WebtoonProps) => {
    return (
        <WebtoonBlock>
            <Thumbnail thumbnail={props.thumbnail}></Thumbnail>
            <Info>
                <TitleLine>{props.title}</TitleLine>
                <InfoLine>
                    <InfoLineLeft>{props.category}/{props.updateDay}</InfoLineLeft>
                    <InfoLienRight>{props.episodeLength}화</InfoLienRight>
                </InfoLine>
                <InfoLine>
                    <InfoLineLeft>{props.service === "kakao" ? "카카오" : "네이버"}</InfoLineLeft>
                    <InfoLienRight>{props.fanCount ? transformFanCount(props.fanCount) : null}</InfoLienRight>
                </InfoLine>
            </Info>
            
        </WebtoonBlock>
    )
}

export default Webtoon;