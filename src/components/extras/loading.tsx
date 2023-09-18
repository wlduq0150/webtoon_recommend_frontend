import styled from "styled-components";

const LoadingBlock = styled.div`
    width: 100%;
    height: 600px;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const Loading = () => {
    return <LoadingBlock>Loading...</LoadingBlock>
}

export default Loading;