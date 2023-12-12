import { DayWebtoonType } from "./webtoonConstants";

export interface WebtoonListProps {
    dayWebtoons: DayWebtoonType[];
}

export interface WebtoonProps {
    id: string;
    title: string | null;
    category: string | null;
    updateDay: string | null;
    thumbnail: string;
    service: string | null;
    episodeLength: number | null;
    fanCount: number | null;
}

export interface ThumnailProps {
    thumbnail: string;
}
