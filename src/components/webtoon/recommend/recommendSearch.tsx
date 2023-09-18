import styled from "styled-components";
import { CiSearch } from "react-icons/ci";

const RecommendSearchBlock = styled.div`
    width: 90%;
    height: 50px;

    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
    padding-left: 4px;

    display: flex;
    align-items: center;

    border: none;
    border-bottom: 1px solid rgb(0, 0, 0);
`;

const SearchBlock = styled.input`
    width: 90%;
    height: 40px;

    border: none;
    background: none;

    font-size: 24px;

    &:focus {
        outline: none;
    }
`;

const SearchIcon = styled.div``;

const RecommendSearch = () => {
    return (
        <RecommendSearchBlock>
            <SearchBlock placeholder="장르 키워드를 입력해주세요"></SearchBlock>
            <SearchIcon><CiSearch size={32}/></SearchIcon>
        </RecommendSearchBlock>
    )
    
}

export default RecommendSearch;