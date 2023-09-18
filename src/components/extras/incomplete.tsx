import styled from "styled-components";

const IncompleteBlock = styled.div`
    width: 100%;
    height: 600px;

    font-size: 32px;
    font-weight: bold;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const Incomplete = () => {
    return <IncompleteBlock>추후 구현 예정입니다!</IncompleteBlock>
}

export default Incomplete;