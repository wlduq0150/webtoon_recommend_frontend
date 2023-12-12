export interface RecommendProps {
    genres?: string[];
}

export interface RecommendKeywordProps {
    genres?: string[];
    modifierGenres: (value: string[]) => void;
}

export interface KeywordProps {
    genre: string;
    children: string;
    onClick: (e: any) => void;
}

export interface RecommendButtonProps {
    onClick: (e: any) => void;
}

export interface SearchKeyWordListProps {
    isdisplay: string;
    keywords: string[];
    onClick: (e: any) => void;
    onMouseDown: (e: any) => void;
}

export interface RecommendSearchProps extends RecommendKeywordProps{
    episodeLength: number;
    modifierEpisodeLength: (e: any) => void;
}

