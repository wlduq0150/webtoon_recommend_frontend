import styled from "styled-components";
import { BackgroundProps, WebtoonDetailProps } from "./webtoonProps";

const Background = styled.div<BackgroundProps>`
    display: ${(props: BackgroundProps) => props.showModal};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
`;

const WebtoonBox = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
`;

const CloseButton = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
`;




const WebtoonDetail = (props: WebtoonDetailProps) => {
    const { showModal, onClose } = props;

    return (
        <Background showModal={showModal}>
            <WebtoonBox>
                <CloseButton onClick={onClose}>X</CloseButton>
            </WebtoonBox>
        </Background>
    );

}

export default WebtoonDetail;