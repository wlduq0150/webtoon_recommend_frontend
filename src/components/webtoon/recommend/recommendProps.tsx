export interface RecommendProps {
    genres?: string[];
}

export interface RecommendKeywordProps {
    genres?: string[];
    modifireGenres: (value: string[]) => void;
}

export interface KeywordProps {
    genre: string;
    children: string;
    onClick: (e: any) => void;
}

export interface RecommendButtonProps {
    onClick: (e: any) => void;
}