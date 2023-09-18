export interface WebtoonNavProps {
    selected: string;
    modifierSelected: (value: string) => void;
}

export interface NavCategoryProps {
    name: string;
    selected: string;
    children: string;
    onClick: (e: any) => void; 
}