import styled from "styled-components";

const WebtoonTemplateBlock = styled.div`
    @media screen and (max-width: 767px) {
        width: 100%;
        height: auto;

        background: white;
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

        margin: 0 auto;

        display: flex;
        flex-direction: column;
    }

    @media screen and (min-width: 768px) {
        width: 100%;
        height: auto;

        background: white;
        border-radius: 16px;
        
        display: flex;
        flex-direction: column;
    }
`;

const WebtoonTemplate = (props: any) => {
    return <WebtoonTemplateBlock>{ props.children }</WebtoonTemplateBlock>
}



export default WebtoonTemplate;