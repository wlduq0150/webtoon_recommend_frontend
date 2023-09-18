import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import { RecommendProps } from "./recommendProps";
import RecommendKeyWord from "./recommendKeyword";
import RecommendSearch from "./recommendSearch";
import { DayWebtoonType } from "../webtoon/webtoonConstants";
import axios from "axios";
// eslint-disable-next-line
import WebtoonList from "../webtoon/webtoonList";
// eslint-disable-next-line
import Loading from "../../extras/loading";
import RecommendButton from "./recommendButton";

const RecommendBlock = styled.div`
    display: flex;
    flex-direction: column;
`;

const Recommend = (props: RecommendProps) => {
    const [startRecommend, modifierStartRecommend] = useState(false);
    const [isLoading, modifierIsLoading] = useState(false);
    const [genres, modifierGenres] = useState<string[]>([]);
    // const [search, modifierSearch] = useState<string>("");
    const [recommendWebtoons, modifierRecommendWebtoons] = useState<DayWebtoonType[]>([]);
    const [recommendWebtoonIds, modifierRecommendWebtoonIds] = useState<string[]>([]);
 
    const getRecommendWebtoons = useCallback(async () => {
        modifierIsLoading(true);
        if (genres && startRecommend) {
            console.log(genres); 
            const response: any = await axios.post(
                "https://finding-restaurant.run.goorm.site/recommend/webtoons", {
                userId: "test",
                genres,
                newExcludeWebtoonIds: recommendWebtoonIds
            });
            const webtoons: DayWebtoonType[] = response.data;
            const webtoonIds: string[] = (
                webtoons.map(
                    (webtoon) => {
                        return webtoon.webtoonId;
                    }
                )
            );
            modifierRecommendWebtoons(webtoons);
            modifierRecommendWebtoonIds(webtoonIds);
        }
        modifierIsLoading(false);
        modifierStartRecommend(false);
        // eslint-disable-next-line
    }, [startRecommend]);

    useEffect(() => {
        (async () => {
            await getRecommendWebtoons();
            console.log(recommendWebtoons);
        })();
        // eslint-disable-next-line
    }, [getRecommendWebtoons]);

    useEffect(() => {
        if (props.genres) {
            modifierGenres(props.genres);
        }
        modifierGenres(["판타지", "회귀물", "복수물", "전쟁", "비극적", "마법", "대마법사"]);
    }, [props.genres]);

    const onClick = () => {
        modifierStartRecommend(true);
    }
    
    return (
        <RecommendBlock>
            <RecommendKeyWord genres={genres} modifireGenres={modifierGenres}></RecommendKeyWord>
            <RecommendSearch></RecommendSearch>
            {
                isLoading ?
                <Loading></Loading>
                : ( 
                    recommendWebtoons.length ? 
                    <WebtoonList dayWebtoons={recommendWebtoons}></WebtoonList> : 
                    null
                )
            }
            <RecommendButton onClick={onClick}></RecommendButton>
        </RecommendBlock>
    );
}

export default Recommend;