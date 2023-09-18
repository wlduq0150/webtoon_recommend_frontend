import styled from "styled-components";
import { NavCategoryProps, WebtoonNavProps } from "./navigationProps";

const NavBox = styled.div`
    width: 100%;
    height: 50px;

    display: flex;
    align-items: center;

    border-bottom: 1px solid rgb(196, 196, 196);
`;

const NavCategoryBlock = styled.div<NavCategoryProps>`
    width: 24%;
    height: auto;

    @media screen and (max-width: 320px) {
        font-size: 16px;
    }

    @media screen and (min-width: 321px) {
        font-size: 18px;
    }

    
    font-weight: 600;

    text-align: center;
    color: ${(props) => 
        props.name === props.selected ?
        "rgba(0, 213, 100)" :
        "rgba(0, 0, 0)"
    };

    cursor: pointer;
`;

const NavCategory = (props: NavCategoryProps) => {
    return (
      <NavCategoryBlock {...props} >{props.children}</NavCategoryBlock>  
    );
}

const WebtoonNav = (props: WebtoonNavProps) => {
    const { selected, modifierSelected } = props;
    const onClick = (e: any) => {
        modifierSelected(e.target.getAttribute("name"));
    }
    return (
        <NavBox>
            <NavCategory name="home" selected={selected} onClick={onClick}>홈</NavCategory>
            <NavCategory name="day" selected={selected} onClick={onClick}>요일별</NavCategory>
            <NavCategory name="finish" selected={selected} onClick={onClick}>완결작</NavCategory>
            <NavCategory name="recommend" selected={selected} onClick={onClick}>장르 추천</NavCategory>
        </NavBox>
    )
}

export default WebtoonNav;