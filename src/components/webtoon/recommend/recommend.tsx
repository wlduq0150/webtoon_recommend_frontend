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
import { server } from "../../constants";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { authState } from "../../store/state/authState";

const RecommendBlock = styled.div`
    display: flex;
    flex-direction: column;
`;

const Recommend = (props: RecommendProps) => {
    const [startRecommend, modifierStartRecommend] = useState(false);
    const [isLoading, modifierIsLoading] = useState(false);
    const [genres, modifierGenres] = useState<string[]>([]);
    const [episodeLength, modifierEpisodeLength] = useState<number>(0);
    const [recommendWebtoons, modifierRecommendWebtoons] = useState<DayWebtoonType[]>([]);
    const [recommendWebtoonIds, modifierRecommendWebtoonIds] = useState<string[]>([]);
    const userId = useSelector<authState, number>(state => state.id);
    const navigator = useNavigate();
 
    const getRecommendWebtoons = useCallback(async () => {
        modifierIsLoading(true);
        try {
            const accessToken = localStorage.getItem("accessToken");

            if (userId === -1 || !accessToken) {
                window.alert("로그인이 필요합니다");
                return navigator("/login");
            }

            if (genres && startRecommend) {
                const response = await axios.post(
                    server + "/recommend/recommend-webtoon", {
                    userId,
                    category: genres[0],
                    genres: genres.slice(1),
                    episodeLength,
                    newExcludeWebtoonIds: recommendWebtoonIds
                }, {
                    headers: {
                        Authorization: "Bearer " + accessToken
                    }
                });

                console.log(response);
                
                const webtoonIds: string[] = response.data;
    
                const requestWebtoonPromises = webtoonIds.map((webtoonId) => {
                    return axios.get(server + `/webtoon/content/${webtoonId}`);
                });
                
                const webtoons: DayWebtoonType[] = (await Promise.all(requestWebtoonPromises)).map((res) => {
                    return res.data;
                });
    
                modifierRecommendWebtoons(webtoons);
                modifierRecommendWebtoonIds(webtoonIds);
            }  
        } catch (e: any) {
            console.log(e.message);
            if (e.response.status === 401 && e.message !== "accessToken expired") {
                window.alert("로그인이 필요합니다!");
                navigator("/login");
            }
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
    }, [props.genres]);

    const onClick = () => {
        modifierStartRecommend(true);
    }
    
    return (
        <RecommendBlock>
            <RecommendKeyWord
                genres={genres} 
                modifierGenres={modifierGenres}
            ></RecommendKeyWord>
            <RecommendSearch
                genres={genres}
                episodeLength={episodeLength}
                modifierGenres={modifierGenres}
                modifierEpisodeLength={modifierEpisodeLength}
            ></RecommendSearch>
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