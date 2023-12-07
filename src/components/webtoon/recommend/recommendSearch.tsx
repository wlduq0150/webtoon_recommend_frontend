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

const RecommendCategoryLine = styled.div`
    display: flex;
`;

const RecommendCategoryLabel = styled.label`
    height: 40px;

    margin-left: 5px;

    font-size: 20px;
    font-weight: bold;

    line-height: 180%;
`;

const RecommendCategory = styled.select`
    width: 30%;
    height: 40px;

    margin-left: 8px;

    border-radius: 8px;
    border: 1px solid rgb(20, 20, 20);

    font-size: 16px;
    font-weight: bold;

    background-color: rgb(255, 255, 255);
`;

const RecommendEpisodeLengthLine = styled.div`
    display: flex;

    margin-top: 10px;
`;

const RecommendEpisodeLengthLabel = styled.label`
    height: 40px;

    margin-left: 5px;

    font-size: 20px;
    font-weight: bold;

    line-height: 180%;
`;

const RecommendEpisodeLength = styled.select`
    width: 30%;
    height: 40px;
    
    margin-left: 8px;

    border-radius: 8px;
    border: 1px solid rgb(20, 20, 20);

    font-size: 16px;
    font-weight: bold;

    background-color: rgb(255, 255, 255);
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
    const [allCategory, modifierAllCategory] = useState<string[]>([]);
    const [category, modifierCategory] = useState<string>("none");
    const [allEpsiodeLength, modifierAllEpisodeLength] = useState<number[]>([]);
    const [allKeyWord, modifierAllKeyWord] = useState<string[]>([]);
    const [showkeyWord, modifierShowKeyWord] = useState<string[]>([]);

    useEffect(() => {
        // 카테고리 불러오기
        axios.get(server + "/genre/category-keyword")
        .then((res: any) => {
            const categorys = res.data;
            modifierAllCategory(categorys);
        });

        // 에피소드 길이 설정
        const episodeLengthList: number[] = [20, 40, 60, 80, 100];
        modifierAllEpisodeLength(episodeLengthList);

        // 장르 불러오기
        axios.get(server + "/genre/genre-keyword")
        .then((res: any) => {
            console.log(res);
            const datas: any[] = res.data;
            const genres = datas.map((data) => data?.keyword);
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
    };
    
    const onInputBlur = (e: any) => {
        e.preventDefault();
        if (e.target.className !== "keyWordList") {
            modifierIsDisplay(false);
        }
    };

    const onCategoryChange = (e: any) => {
        const newCategory: string = e.target.value;
        let genres: string[] = [];

        if (newCategory !== "none" && props.genres) {
            if (props.genres[0] && allCategory.includes(props.genres[0])) {
                genres = [...props.genres];
                genres[0] = newCategory;
            } else {
                genres = [ newCategory ].concat(props.genres);
            }
        }

        modifierCategory(newCategory);
        props.modifierGenres(genres);
    }

    const onEpisodeLengthChange = (e: any) => {
        props.modifierEpisodeLength(parseInt(e.target.value));
    }

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
            <RecommendCategoryLine>
                <RecommendCategoryLabel> 분 류 :</RecommendCategoryLabel>
                <RecommendCategory onChange={onCategoryChange} value={category}>
                    <option value="none">카테고리</option>
                    {
                        allCategory.map(
                            (category_) => {
                                return <option key={category_} value={category_}>{category_}</option>
                            }
                        )
                    }
                </RecommendCategory>
                
            </RecommendCategoryLine>
            <RecommendEpisodeLengthLine>
                <RecommendEpisodeLengthLabel>총 편수 :</RecommendEpisodeLengthLabel>
                <RecommendEpisodeLength onChange={onEpisodeLengthChange} value={props.episodeLength}>
                    <option value={0}>전체</option>
                    {
                        allEpsiodeLength.map(
                            (episodeLength) => {
                                return <option key={episodeLength} value={episodeLength}>{episodeLength}화 이상</option>
                            }
                        )
                    }
                </RecommendEpisodeLength>
            </RecommendEpisodeLengthLine>
            <RecommendSearchLine>
                <SearchBlock value={search} onFocus={onInputFocus} onBlur={onInputBlur} onChange={onSearchChange} placeholder="장르 키워드를 입력해주세요"></SearchBlock>
                <SearchIcon type="submit"><CiSearch size={32}/></SearchIcon>
            </RecommendSearchLine>
            <SearchKeyWordList isdisplay={isDisplay} keywords={showkeyWord} onMouseDown={onKeyWordDown} onClick={onKeyWordClick} ></SearchKeyWordList>
        </RecommendSearchBlock>
    )
    
}

export default RecommendSearch;