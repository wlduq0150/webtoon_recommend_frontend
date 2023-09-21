import styled from "styled-components";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import { server } from "../../constants";
import axios from "axios";
import SearchKeyWordList from "./searchKeyWordList";
import { RecommendSearchProps } from "./recommendProps";

const RecommendSearchBlock = styled.form`
    width: 90%;
    height: auto;

    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;

    display: flex;
    flex-direction: column;
`;

const RecommendSearchLine = styled.div`
    width: 100%;
    height: 50px;

    display: flex;
    align-items: center;

    border: none;
    border-bottom: 1px solid rgb(0, 0, 0);
`;

const SearchBlock = styled.input`
    width: 90%;
    height: 40px;

    margin-left: 4px;

    border: none;
    background: none;

    font-size: 24px;

    &:focus {
        outline: none;
    }
`;

const SearchIcon = styled.button`
    background: none;
    border: none;
`;

const RecommendSearch = (props: RecommendSearchProps) => {
    const [isDisplay, modifierIsDisplay] = useState<boolean>(false);
    const [search, modifierSearch] = useState<string>("");
    const [searchLength, modifierSearchLength] = useState<number>(0);
    const [allKeyWord, modifierAllKeyWord] = useState<string[]>([]);
    const [showkeyWord, modifierShowKeyWord] = useState<string[]>([]);

    useEffect(() => {
        axios.get(server + "/webtoons/genreKeyWords")
        .then((res: any) => {
            const genres = res.data;
            modifierAllKeyWord(genres);
            modifierShowKeyWord(genres);
        });
    }, []);

    useEffect(() => {
        const selectedKeywords: string[] = [];
        if (showkeyWord && search.length > searchLength) {
            showkeyWord.forEach(
                (keyWord) => {
                    if (keyWord.includes(search)) {
                        selectedKeywords.push(keyWord);
                    }
                }
            )
        } else if (allKeyWord && search.length <= searchLength) {
            allKeyWord.forEach(
                (keyWord) => {
                    if (keyWord.includes(search)) {
                        selectedKeywords.push(keyWord);
                    }
                }
            )
        }

        if (selectedKeywords.length > 0) {
            modifierShowKeyWord(selectedKeywords);
            modifierSearchLength(search.length);
        }
        // eslint-disable-next-line
    }, [search]);

    const onInputFocus = (e: any) => {
        modifierIsDisplay(true);
        console.log(isDisplay);
    };
    
    const onInputBlur = (e: any) => {
        e.preventDefault();
        if (e.target.className !== "keyWordList") {
            modifierIsDisplay(false);
        }
        console.log(isDisplay);
    };

    const onSearchChange = (e: any) => {
        modifierSearch(e.target.value);
    };

    const onKeyWordDown = (e: any) => {
        e.preventDefault();
    };

    const onKeyWordClick = (e: any) => {
        let newGenres: string[] = [];
        const genre: string = e.target.getAttribute("value");
        if (props.genres) {
            newGenres = props.genres;
            if (!props.genres.includes(genre)) {
                newGenres = props.genres.concat(genre);
            } 
        } else {
            newGenres.push(e.target.value);
        }
        props.modifierGenres(newGenres);
        modifierSearch("");
    }

    return (
        <RecommendSearchBlock>
            <RecommendSearchLine>
                <SearchBlock value={search} onFocus={onInputFocus} onBlur={onInputBlur} onChange={onSearchChange} placeholder="장르 키워드를 입력해주세요"></SearchBlock>
                <SearchIcon type="submit"><CiSearch size={32}/></SearchIcon>
            </RecommendSearchLine>
            <SearchKeyWordList isdisplay={isDisplay} keywords={showkeyWord} onMouseDown={onKeyWordDown} onClick={onKeyWordClick} ></SearchKeyWordList>
        </RecommendSearchBlock>
    )
    
}

export default RecommendSearch;