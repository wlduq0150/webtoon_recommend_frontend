import styled from "styled-components";
import { CiSearch } from "react-icons/ci";
import { MdOutlineMenu } from "react-icons/md";

// image
const logoImage = require("../../../images/header_logo.png");


const HeaderBox = styled.div`
    width: 100%;
    height: 65px;

    margin: 0 auto;

    display: flex;
    position: relative;

    border-bottom: 1px solid rgb(196, 196, 196);
`;

const HeaderLogo = styled.img`
    width: 65px;
    height: 65px;
`;

const SearchButton = styled.div`
    position: absolute;
    right: 60px;

    margin-top: 8px;
    margin-left: 60%;
    padding: 6px;
`;

const MyMenuButton = styled.div`
    position: absolute;
    right: 12px;

    margin-top:8px;
    padding: 6px;
`;


const WebtooonHeader = () => {
    return (
        <HeaderBox>
            <HeaderLogo src={logoImage}></HeaderLogo>
            <SearchButton>{<CiSearch size={32} />}</SearchButton>
            <MyMenuButton>{<MdOutlineMenu size={32} />}</MyMenuButton>
        </HeaderBox>
    )
}

export default WebtooonHeader;