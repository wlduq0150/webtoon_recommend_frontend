import styled from "styled-components";
import { CiSearch } from "react-icons/ci";
import Sidebar from "../sidebar/sidebar";
import { logoImage } from "../../constants";

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


const WebtooonHeader = () => {
    return (
        <HeaderBox>
            <HeaderLogo src={logoImage}></HeaderLogo>
            <SearchButton>{<CiSearch size={32} />}</SearchButton>
            <Sidebar></Sidebar>
        </HeaderBox>
    )
}

export default WebtooonHeader;