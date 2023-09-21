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

const Title = styled.div`
    width: 100%;
    height: auto;

    box-sizing: border-box;

    padding: 8px 8px 8px 2px;

    font-size: 18px;
    font-weight: bold;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
`;

const Webtoon = (props: WebtoonProps) => {
    return (
        <WebtoonBlock>
            <Thumbnail thumbnail={props.thumbnail}></Thumbnail>
            <Title>{props.title}</Title>
        </WebtoonBlock>
    )
}

export default Webtoon;