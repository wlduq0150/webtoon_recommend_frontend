import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { server } from "../../constants";
import { DayWebtoonType } from "../webtoon/webtoonConstants";
import WebtoonList from "../webtoon/webtoonList";

const FinishWebtoonBlock = styled.div`
    width: 100%;
    height: auto;

    display: flex;
    flex-direction: column;

    margin: 0 auto;
`;

const FinishWebtoonLine = styled.div`
    width: 100%;
    heigth: 50px;

    padding-left: 8px;
    padding-right: 8px;

    display: flex;
    justify-content: space-between;

    box-sizing: border-box;
`;

const FinishWebtoonLabel = styled.div`
    height: auto;

    margin-top: 8px;

    font-size: 24px;
    font-weight: bold;

    line-heigth: 180%;
`;

const FinishWebtoonSortByCategory = styled.select`
    width: 60px;
    height: 50px;

    font-size: 16px;
    font-weight: bold;

    border: none;
`;

const FinishWebtoon = () => {
    const [isLoading, modifierIsLoading] = useState(false);
    const [allFinishWebtoon, modifierAllFinishWebtoon] = useState<DayWebtoonType[]>([]);
    const [selectedWebtoon, modifierSelectedWebtoon] = useState<DayWebtoonType[]>([]);
    const [showWebtoon, modifierShowWebtoon] = useState<number>(0);
    const [finishWebtoons, modifierfinishWebtoons] = useState<DayWebtoonType[]>([]);
    const [allCategory, modifierAllCategory] = useState<string[]>([]);
    const [category, modifierCategory] = useState<string>("");

    const getWebtoonForfinish = useCallback(
        async () => {
            const response: any = await axios.get(server + `/webtoons/finished`);
            const webtoons: DayWebtoonType[] = response.data;
            webtoons.sort(
                (a: DayWebtoonType, b: DayWebtoonType) => {
                    return b.fanCount - a.fanCount;
                }
            )
            modifierAllFinishWebtoon(webtoons);

            axios.get(server + "/data-manager/categoryKeyword")
            .then((res) => {
                const allCategory_: string[] = res.data;
                modifierAllCategory([ "전체", ...allCategory_ ]);
                modifierCategory("전체");
            });
        }, []
    );

    const handleScroll = () => {
        const { scrollTop } = document.documentElement;
        const { scrollHeight } = document.body;
        const { innerHeight } = window;

        if (!isLoading && (scrollTop + innerHeight) >= scrollHeight - 200) {
            modifierShowWebtoon(showWebtoon + 21);
        }
    };

    const onChangeCategory = (e: any) => {
        modifierCategory(e.target.value);
    }

    // useEffect(() => {
        
    // }, []);

    useEffect(() => {
        const filterdWebtoons: DayWebtoonType[] = allFinishWebtoon.filter(
            (webtoon) => {
                if (category === "전체") return true;
                return webtoon.category === category;
            }
        );
        modifierSelectedWebtoon(filterdWebtoons);
    }, [allFinishWebtoon, category]);

    useEffect(() => {
        getWebtoonForfinish();
        modifierShowWebtoon(15);
    }, [getWebtoonForfinish]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, true);
        return () => {
            window.removeEventListener("scroll", handleScroll, true);
        }
    });

    useEffect(() => {
        modifierIsLoading(true);

        const showWebtoons = selectedWebtoon.slice(0, showWebtoon);
        modifierfinishWebtoons(showWebtoons);

        modifierIsLoading(false);
    }, [showWebtoon, selectedWebtoon]);

    return (
        <FinishWebtoonBlock>
            <FinishWebtoonLine>
                <FinishWebtoonLabel>완결 웹툰</FinishWebtoonLabel>
                <FinishWebtoonSortByCategory onChange={onChangeCategory} value={category}>
                    {
                        allCategory.map(
                            (category_) => {
                                return <option key={category_} value={category_}>{category_}</option>
                            }
                        )
                    }
                </FinishWebtoonSortByCategory>
            </FinishWebtoonLine>
            <WebtoonList dayWebtoons={finishWebtoons}></WebtoonList>
        </FinishWebtoonBlock>
    )

}

export default FinishWebtoon;