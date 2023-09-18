import { DayWebtoonType } from "./webtoonConstants";

export interface WebtoonListProps {
    dayWebtoons: DayWebtoonType[];
}

export interface WebtoonProps {
    webtoonId: string;
    title: string | null;
    author: string[] | string | null;
    thumbnail: string;
    service: string | null;
    fanCount: number | null;
}

export interface ThumnailProps {
    thumbnail: string;
}
