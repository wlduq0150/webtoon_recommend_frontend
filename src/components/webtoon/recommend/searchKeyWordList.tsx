import styled from "styled-components";
import { SearchKeyWordListProps } from "./recommendProps";

const SearchKeyWordListBlock = styled.ul<SearchKeyWordListProps>`
    width: 100%;
    max-height: 150px;

    display: ${(props: SearchKeyWordListProps) => 
        props.isdisplay
    };

    border: 1px solid rgb(0, 0, 0);

    list-style: none;

    overflow-y: auto;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const SearchKeyWord = styled.li`
    width: 100%;
    
    padding: 4px;
    box-sizing: border-box;

    font-size: 18px;
    font-weight: bold;

    padding-top: 4px;

    
`;

const SearchKeyWordList = (props: SearchKeyWordListProps) => {
    
    return (
        <SearchKeyWordListBlock className="keyWordList" {...props} >
            {
                props.keywords.map(
                    (keyWord: string) => {
                        return <SearchKeyWord key={keyWord} value={keyWord} onClick={props.onClick}>{keyWord}</SearchKeyWord>
                    }
                )
            }
        </SearchKeyWordListBlock>
    )
}

export default SearchKeyWordList;