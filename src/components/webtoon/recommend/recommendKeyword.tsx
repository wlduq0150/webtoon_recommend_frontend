import styled from "styled-components";
import { KeywordProps, RecommendKeywordProps } from "./recommendProps";
import { TiDelete } from "react-icons/ti";

const RecommendKeywordBlock = styled.div`
    width: 85%;
    height: auto;
    min-height: 100px;

    margin: 0 auto;
    margin-top: 20px;
    padding: 10px;

    display: flex;
    flex-wrap: wrap;
   
    gap: 10px;

    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.15);

    background-color: rgba(250, 250, 250, 0.5);
`;

const KeywordBlock = styled.div`
    height: 30px;

    padding: 6px;
    padding-bottom: 0;

    display: flex;

    border-radius: 6px;
    font-weight: bold;

    color: rgb(255, 255, 255);
    background-color: rgba(0, 0, 0, 0.9);

    cursor: pointer;

    div {
        pointer-events : none;
    }

    .removeIcon {
        font-size: 21px;
    }
`;

const Genre = (props: { genre: string }) => {
    return <div {...props}>{props.genre}</div>
}

const Keyword = (props: KeywordProps) => {
    return (
        <KeywordBlock onClick={props.onClick}>
            <Genre genre={props.genre} ></Genre>
            <div className="removeIcon">{<TiDelete/>}</div>
        </KeywordBlock>
    )
}

const RecommendKeyWord = (props: RecommendKeywordProps) => {

    const onKeywordClick = (e: any) => {
        if (!props.genres) return;
        const removedGenres: string[] = props.genres.filter(
            (genre) => { return genre !== e.target.children[0].getAttribute("genre")}
        );
        props.modifierGenres(removedGenres);
    }

    return (
        <RecommendKeywordBlock>
            {
                props.genres ?
                props.genres.map(
                    (genre) => {
                        return <Keyword
                            key={genre}
                            genre={genre}
                            onClick={onKeywordClick}
                        >{genre}</Keyword>
                    }
                ) : null
            }
        </RecommendKeywordBlock>
    )
}

export default RecommendKeyWord;