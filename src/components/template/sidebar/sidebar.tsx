import { useRef, useState } from 'react';
import { MdOutlineMenu } from 'react-icons/md';
import styled from 'styled-components';
import { SidebarProps } from './sidebarProps';
import { useNavigate } from 'react-router-dom';

const SideBox = styled.div`
    background-color: rgb(250, 255, 255);
    border-left: 1px solid #202020;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    transition: 0.4s ease;
    color: #202020;
    height: 100%;
    z-index: 99;
    cursor: pointer;
`;

const SideButton = styled.div`
    position: relative;
    left: -50px;
    top: 15px;
    width: 40px;
    height: 40px;
    z-index: 99;
    transition: 0.6s ease;
    border: none
    overflow: hidden;
`;

const CloseButton = styled.div`
    position: absolute; /* 변경된 부분: position을 absolute로 변경 */
    top: 15px; /* 변경된 부분: top을 0으로 설정 */
    left: 15px; /* 변경된 부분: left을 0으로 설정 */
    width: 40px;
    height: 40px;
    z-index: 99;
    transition: 0.4s ease;
    border: none;
    overflow: hidden;
`;

const SideContent = styled.div`
    padding: 60px 40px 0 20px;
    position: relative;
    width: 100%;
`;

const SideSpan = styled.div`
    width: 70%;
    padding: 6px;
    font-size: 18px;
    border-bottom: 1px solid rgb(0, 0, 0);
    cursor: pointer;
`;

const Sidebar = (props: SidebarProps) => {
    // eslint-disable-next-line
    const [width, modifierWidth] = useState(props.width ? props.width : 220);
    const [isShow, modifierIsShow] = useState(false);
    const [sidePos, modifierSidePos] = useState(-width);
    const navigator = useNavigate();
    const side = useRef<HTMLDivElement>(null);

    const sideButtonOnClick = (e: any) => {
        if (sidePos < 0) {
            modifierIsShow(true);
            modifierSidePos(0);
        } else {
            modifierIsShow(false);
            modifierSidePos(-width);
        }
    };

    const onSideMenuClick = (e: any) => {
        navigator(e.target.dataset.value);
    };

    // const handleClose = async (e: any) => {
    //         console.log('사이드');
    //         if (!side.current) return;
    //         let sideArea: any = side.current;
    //         let sideCildren = side.current.contains(e.target);
    //         if (isShow && (!sideArea || !sideCildren)) {
    //         await modifierSidePos(-width);
    //         await modifierIsShow(false);
    //     }
    // }

    // useEffect(() => {
    //     window.addEventListener("click", handleClose);
    //     return () => {
    //         window.removeEventListener("click", handleClose);
    //     };
    // });

    return (
        <div>
            <SideBox
                ref={side}
                style={{
                    width: `${width}px`,
                    height: '100%',
                    transform: `translatex(${-sidePos}px)`,
                }}
            >
                {isShow ? (
                    <CloseButton onClick={sideButtonOnClick}>
                        <MdOutlineMenu size={32} />
                    </CloseButton>
                ) : (
                    <SideButton onClick={sideButtonOnClick}>
                        <MdOutlineMenu size={32} />
                    </SideButton>
                )}

                <SideContent>
                    <SideSpan data-value="login" onClick={onSideMenuClick}>로그인</SideSpan>
                    <SideSpan data-value="signup" onClick={onSideMenuClick}>회원가입</SideSpan>
                </SideContent>
            </SideBox>
        </div>
    );
};

export default Sidebar;
