import styled from "styled-components";
import { RecommendButtonProps } from "./recommendProps";

const ButtonBlock = styled.div`


    margin: 0 auto;
    margin-top: 20px;
    padding: 12px;

    border: none;
    border-radius: 8px;
    box-sizing: border-box;

    font-size: 32px;
    font-weight: bold;

    color: rgb(255, 255, 255);
    background-color: rgb(0, 0, 0, 0.9);

    cursor: pointer;
`

const RecommendButton = (props: RecommendButtonProps) =>  {
    return <ButtonBlock onClick={props.onClick}>추천받기</ButtonBlock>;
}

export default RecommendButton;