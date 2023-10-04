export interface Webtoon {
    webtoonId: string | null;
    title: string | null;
    author: string[] | string | null;
    episodeLength: number | null;
    thumbnail: string;
    service: string | null;
    updateDay: string | null;
    category: string | null;
    genres: string[] | string | null;
    genreCount: number | null;
    description: string | null;
    fanCount: number | null;
}

export type DayWebtoonType = {
    webtoonId: string;
    title: string | null;
    category: string | null;
    updateDay: string | null;
    author: string[] | string | null;
    thumbnail: string;
    service: string | null;
    episodeLength: number | null;
    fanCount: number;
}