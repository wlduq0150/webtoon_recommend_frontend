import styled from "styled-components";
import { days } from "./dayConstants";
import { DayWebtoonNavCategoryProps, DayWebtoonNavProps } from "./dayWebtoonProps";

const DayWebtoonNavBlock = styled.div`
    width: 100%;
    height: 42px;

    display: flex;
`;

const NavCategoryBlock = styled.div<DayWebtoonNavCategoryProps>`
    width: 13%;
    height: 42px;

    margin-left: 1%;

    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 320px) {
        font-size: 15px;
    }

    @media screen and (min-width: 321px) {
        font-size: 16px;
    }

    font-weight: 600;

    color: ${
        (props) => 
        props.name === props.day ?
        "rgb(0, 220, 100)" :
        "rgb(80, 80, 80)"
    };
`;

const NavCategory = (props: DayWebtoonNavCategoryProps) => {
    return (
        <NavCategoryBlock {...props} >{props.children}</NavCategoryBlock>
    )
}

const DayWebtoonNav = (props: DayWebtoonNavProps) => {
    return (
        <DayWebtoonNavBlock>
            {
                days.map(
                    (day_) => {
                        return <NavCategory key={days.indexOf(day_)} name={day_} day={props.day} onClick={props.onClick}>{day_}</NavCategory>
                    }
                )
            }
        </DayWebtoonNavBlock>
    )
}

export default DayWebtoonNav;