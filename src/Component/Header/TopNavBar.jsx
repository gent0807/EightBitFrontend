import { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";
import { CgMenuGridR } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";
import Darkmode from "../../Recoil/Darkmode/DarkmodeChangeBtn";
import { AiOutlineShopping } from "react-icons/ai";
import { clearLoginState } from "../../Redux/User";
import { Outlet } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import SwiperCore, { FreeMode, Navigation, Pagination, EffectCoverflow } from "swiper";
import LogoLight from "../../Item/img/LOGO/8bitLight.png";

import User from "../../Item/img/MySlide/user.png";
import Bell from "../../Item/img/MySlide/bell.png";
import Coding from "../../Item/img/MySlide/coding.png";
import Shop from "../../Item/img/MySlide/store.png";
import Update from "../../Item/img/MySlide/update.png";
import Logout from "../../Item/img/MySlide/logout.png";

import Upload from "../../Item/img/BoardSlide/upload.png";
import Essay from "../../Item/img/BoardSlide/essay.png";
import Discussion from "../../Item/img/BoardSlide/discussion.png";
import Strategy from "../../Item/img/BoardSlide/strategy.png";
import Rating from "../../Item/img/BoardSlide/rating.png";
import Console from "../../Item/img/BoardSlide/console.png";
import Digital from "../../Item/img/BoardSlide/digital.png";

import axios from 'axios';
import Store from "../../Redux/Store";
import { contextType } from "react-quill";

SwiperCore.use([Navigation, Pagination, EffectCoverflow]);


const HeaderBox = () => {
    const [Search, setSearch] = useState("");
    const [ProfileMenuShow, setProfileMenuShow] = useState(false);
    const [ProfileClickCheck, setProfileClickCheck] = useState(false);
    const [isGameTabCheck, setIsGameTabCheck] = useState(false);
    const [isShopTabCheck, setIsShopTabCheck] = useState(false);
    const [isComunityTabCheck, setIsComunityTabCheck] = useState(false);
    const [isSupprotTabCheck, setIsSupprotTabCheck] = useState(false);
    const [isGameIconCheck, setIsGameIconCheck] = useState(true);
    const [isShopIconCheck, setIsShopIconCheck] = useState(false);
    const [isComunityIconCheck, setIsComunityIconCheck] = useState(false);
    const [isSupprotIconCheck, setIsSupprotIconCheck] = useState(false);
    const [isProfileLogoutCheck, setIsProfileLogoutCheck] = useState(false);
    const [isDefaultProfileScene, setIsDefaultProfileScene] = useState(false);
    const [isDefaultFastScene, setIsDefaultFastScene] = useState(false);
    const [isDefaultWriteScene, setDefaultWriteScene] = useState(false);
    const [FastMenuShow, setIsFastMenuShow] = useState(false);
    const [WriteMenuShow, setIsWriteMenuShow] = useState(false);
    const [WriteMenuClickCheck, setIsWriteMenuClickCheck] = useState(false);
    const [WriteClickCheck, setWriteClickCheck] = useState(false);
    const [FastClickCheck, setFastClickCheck] = useState(false);
    const [BackgroundLine, setBackgroundLine] = useState(false)
    const [modalOnOffBtn, setModalOnOffBtn] = useState(false);
    const [searchmodalOnOffBtn, setSearchModalOnOffBtn] = useState(false);
    const [swiper, setSwiper] = useState(null);

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let userInfo = localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    const loginMaintain = localStorage.getItem("loginMaintain");
    const ip = localStorage.getItem("ip");

    let BtnLeaveRef = useRef("");

    const swiperParams =
    {
        onSwiper: setSwiper,
        spaceBetween: 4,
        slidesPerView: "auto",
    }

    const [WindowLength, setWindowLength] = useState(window.innerWidth);

    const handleResize = () => {
        setWindowLength(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    })

    useEffect(() => {
        function handleOuside(e) {
            if (BtnLeaveRef.current && !BtnLeaveRef.current.contains(e.target)) {
                setIsGameTabCheck(false);
                setIsShopTabCheck(false);
                setIsComunityTabCheck(false);
                setIsSupprotTabCheck(false);
                setBackgroundLine(false);
                setIsGameIconCheck(false);
                setIsShopIconCheck(false);
                setIsComunityIconCheck(false);
                setIsSupprotIconCheck(false);
            }
        };

        if (!isGameTabCheck) {
            document.addEventListener("mouseover", handleOuside);
        }
        return () => {
            document.removeEventListener("mouseover", handleOuside);
        };
    }, [BtnLeaveRef]);

    const OnSearch = (e) => {
        const currentSearch = e.target.value;
        setSearch(currentSearch);
    }

    const LogoutFunc = () => {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("loginMaintain");
        dispatch(clearLoginState());
        setProfileMenuShow(false);
        setProfileClickCheck(false);
        setIsProfileLogoutCheck(true);
        navigate("/");
    }

    const GameliHover = () => {
        setIsGameIconCheck(true);
        setIsShopIconCheck(false);
        setIsComunityIconCheck(false);
        setIsSupprotIconCheck(false);
        setIsShopTabCheck(false);
        setIsComunityTabCheck(false);
        setIsSupprotTabCheck(false);
        setIsGameTabCheck(true);
        setBackgroundLine(true);
    }

    const ComunityliHover = () => {
        setIsGameIconCheck(false);
        setIsShopIconCheck(false);
        setIsComunityIconCheck(true);
        setIsSupprotIconCheck(false);
        setIsShopTabCheck(false);
        setIsComunityTabCheck(true);
        setIsSupprotTabCheck(false);
        setIsGameTabCheck(false);
        setBackgroundLine(true);
    }

    const ShopliHover = () => {
        setIsGameIconCheck(false);
        setIsShopIconCheck(true);
        setIsComunityIconCheck(false);
        setIsSupprotIconCheck(false);
        setIsShopTabCheck(true);
        setIsComunityTabCheck(false);
        setIsSupprotTabCheck(false);
        setIsGameTabCheck(false);
        setBackgroundLine(true);
    }

    const SupportliHover = () => {
        setIsGameIconCheck(false);
        setIsShopIconCheck(false);
        setIsComunityIconCheck(false);
        setIsSupprotIconCheck(true);
        setIsShopTabCheck(false);
        setIsComunityTabCheck(false);
        setIsSupprotTabCheck(true);
        setIsGameTabCheck(false);
        setBackgroundLine(true);
    }


    const [scrollPosition, setScrollPosition] = useState(0);

    const updateScroll = () => {
        setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    }

    useEffect(() => {
        window.addEventListener('scroll', updateScroll);
    });

    return (
        <>
            <ALLNavBox>
                <LeaveBox ref={BtnLeaveRef}>

                    <BackgroudTopNav TopBack={scrollPosition}>

                        <ModalFast OnOff={modalOnOffBtn}>
                            <ModalFastMenuBox OnOff={modalOnOffBtn}>

                                <ModalAllOffBtn>
                                    <ModalAllOffBtnText
                                        onClick={() => setModalOnOffBtn(false)}
                                    >
                                        x
                                    </ModalAllOffBtnText>
                                </ModalAllOffBtn>

                                <ModalUserMenu>

                                    {loginMaintain == null ?
                                        <LoginCheckBox>
                                            <Link to='/Login' onClick={() => setModalOnOffBtn()}>로그인</Link> 후 이용해주세요.
                                        </LoginCheckBox> :

                                        loginMaintain == "true" ?
                                            userInfo == null ?

                                                <LoginCheckBox>
                                                    <Link to='/Login' onClick={() => setModalOnOffBtn()}>로그인</Link> 후 이용해주세요.
                                                </LoginCheckBox> :

                                                userInfo.loginState === "allok" ?

                                                    <ModalProfileImgBox>
                                                        <Profile>
                                                            <Profileimg src={`${ip}/Users/profileImg/${userInfo.nickName}`} />
                                                        </Profile>

                                                        <ModalNickNameBox>
                                                            <ModalNickNameText>
                                                                <ModalNickNamePointText>
                                                                    {user.nickname}
                                                                </ModalNickNamePointText>
                                                                님, 환영합니다!
                                                            </ModalNickNameText>
                                                        </ModalNickNameBox>

                                                        <MyPageShopBox>
                                                            <MyPageBtnBox>
                                                                <Link to={"/"}>
                                                                    <MyPageBtnText>마이페이지</MyPageBtnText>
                                                                </Link>
                                                            </MyPageBtnBox>

                                                            <ShopBtnBox>
                                                                <Link to={"/"}>
                                                                    <ShopBtnText>장바구니</ShopBtnText>
                                                                </Link>
                                                            </ShopBtnBox>
                                                        </MyPageShopBox>

                                                    </ModalProfileImgBox> :

                                                    <LoginCheckBox>
                                                        <Link to='/Login' onClick={() => setModalOnOffBtn()}>로그인</Link> 후 이용해주세요.
                                                    </LoginCheckBox> :

                                            user.login_state === "allok" ?

                                                <ModalProfileImgBox>
                                                    <Profile>
                                                        <Profileimg src={`${ip}/Users/profileImg/${userInfo.nickName}`} />
                                                    </Profile>

                                                    <ModalNickNameBox>
                                                        <ModalNickNameText>
                                                            <ModalNickNamePointText>
                                                                {user.nickname}
                                                            </ModalNickNamePointText>
                                                            님, 환영합니다!
                                                        </ModalNickNameText>
                                                    </ModalNickNameBox>

                                                    <MyPageShopBox>
                                                        <MyPageBtnBox>
                                                            <Link to={"/"}>
                                                                <MyPageBtnText>마이페이지</MyPageBtnText>
                                                            </Link>
                                                        </MyPageBtnBox>

                                                        <ShopBtnBox>
                                                            <Link to={"/"}>
                                                                <ShopBtnText>장바구니</ShopBtnText>
                                                            </Link>
                                                        </ShopBtnBox>
                                                    </MyPageShopBox>

                                                </ModalProfileImgBox> :

                                                <LoginCheckBox>
                                                    <Link to='/Login' onClick={() => setModalOnOffBtn()}>로그인</Link> 후 이용해주세요.
                                                </LoginCheckBox>
                                    }

                                    {loginMaintain == null ?
                                        <></> :
                                        loginMaintain == "true" ?
                                            userInfo == null ?
                                                <></> :
                                                userInfo.loginState === "allok" ?
                                                    user.role === "DEVELOPER" ?
                                                        <Link to="/GameUploadPage/indie">
                                                            <ProfileliText MediaLeft={"17px"}>게임 업로드</ProfileliText>
                                                        </Link> :
                                                        <></> :
                                                    <></> :
                                            user.login_state === "allok" ?
                                                user.role === "DEVELOPER" ?
                                                    <Link to="/GameUploadPage/indie">
                                                        <ProfileliText MediaLeft={"17px"}>게임 업로드</ProfileliText>
                                                    </Link> :
                                                    <></> :
                                                <></>}

                                </ModalUserMenu>
                            </ModalFastMenuBox>
                        </ModalFast>

                        <SearchModal OnOff={searchmodalOnOffBtn}>

                        </SearchModal>

                        <Topnav>

                            <NavBox TopBack={scrollPosition}>
                                <NavMenuAllBox>
                                    <LogoBox>
                                        <Link to='/'><Logo src={LogoLight} alt='로고' /></Link>
                                    </LogoBox>

                                    <NavUl>
                                        <GameLi onClick={() => ScrollTop()} active={isGameIconCheck}><Link to='/' onMouseOver={GameliHover}>게임</Link></GameLi>
                                        <ShopLi onClick={() => ScrollTop()} active={isShopIconCheck}><Link to='/' onMouseOver={ShopliHover}>쇼핑</Link></ShopLi>
                                        <ComunityLi onClick={() => ScrollTop()} active={isComunityIconCheck}><Link to='/' onMouseOver={ComunityliHover}>커뮤니티</Link></ComunityLi>
                                        <SupportLi onClick={() => ScrollTop()} active={isSupprotIconCheck}><Link to='/' onMouseOver={SupportliHover}>서포트</Link></SupportLi>
                                    </NavUl>

                                </NavMenuAllBox>

                                <SlideNav {...swiperParams} ref={setSwiper}>
                                    <SwiperSlide>
                                        <GameLi as={"div"} onClick={() => ScrollTop()} active={isGameIconCheck}><Link to='/' onMouseOver={GameliHover}>게임</Link></GameLi>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <ShopLi as={"div"} onClick={() => ScrollTop()} active={isShopIconCheck}><Link to='/' onMouseOver={ShopliHover}>쇼핑</Link></ShopLi>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <ComunityLi as={"div"} onClick={() => ScrollTop()} active={isComunityIconCheck}><Link to='/' onMouseOver={ComunityliHover}>커뮤니티</Link></ComunityLi>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <SupportLi as={"div"} onClick={() => ScrollTop()} active={isSupprotIconCheck}><Link to='/' onMouseOver={SupportliHover}>서포트</Link></SupportLi>
                                    </SwiperSlide>
                                </SlideNav>

                            </NavBox>



                            <AllButtonBox>


                                <ButtonBox>

                                    <SearchInputBox>
                                        <SearchInput TopBack={scrollPosition} placeholder="게임 검색하기" value={Search} onChange={OnSearch} />
                                        <SearchInputIconBox TopBack={scrollPosition}>
                                            <SearchButton><HiOutlineSearch /></SearchButton>
                                        </SearchInputIconBox>
                                    </SearchInputBox>

                                    <SearchModalMenu
                                        onClick={() => setSearchModalOnOffBtn(!searchmodalOnOffBtn)}
                                    >
                                        <ModalSearchMenuIcon><HiOutlineSearch /></ModalSearchMenuIcon>
                                    </SearchModalMenu>


                                    <ShoppingBox
                                        onClick={() => setModalOnOffBtn(!modalOnOffBtn)}
                                    >
                                        <ShoppingMenuIcon><AiOutlineShopping /></ShoppingMenuIcon>
                                    </ShoppingBox>

                                    <WriteListBox
                                        default={isDefaultWriteScene}
                                        show={WriteMenuShow}
                                        size={user.role}
                                    >
                                        <ProfileUl>
                                            <Link to='/WriteBoard/free'>
                                                <Profileli
                                                    padding="15px 0px 15px 13px"
                                                    onClick={() => setIsWriteMenuShow(!WriteMenuShow)}
                                                >
                                                    <DropdownImg src={Essay} />
                                                    <ProfileliText MediaLeft={"17px"}>자유게시판</ProfileliText>
                                                </Profileli>
                                            </Link>

                                            <Link to="/WriteBoard/strategy">
                                                <Profileli
                                                    padding="15px 0px 15px 13px"
                                                    onClick={() => setIsWriteMenuShow(!WriteMenuShow)}
                                                >
                                                    <DropdownImg src={Strategy} />
                                                    <ProfileliText MediaLeft={"17px"}>공략게시판</ProfileliText>
                                                </Profileli>
                                            </Link>

                                            <Link to="/WriteBoard/question">
                                                <Profileli
                                                    padding="15px 0px 15px 13px"
                                                    onClick={() => setIsWriteMenuShow(!WriteMenuShow)}
                                                >
                                                    <DropdownImg src={Discussion} />
                                                    <ProfileliText MediaLeft={"17px"}>질문게시판</ProfileliText>
                                                </Profileli>
                                            </Link>

                                            <Profileli
                                                padding="15px 0px 15px 13px"
                                                onClick={() => setIsWriteMenuShow(!WriteMenuShow)}
                                            >
                                                <DropdownImg src={Rating} />
                                                <ProfileliText MediaLeft={"17px"}>상품 리뷰</ProfileliText>
                                            </Profileli>

                                            <Profileli
                                                padding="15px 0px 15px 13px"
                                                onClick={() => setIsWriteMenuShow(!WriteMenuShow)}
                                            >
                                                <DropdownImg src={Console} />
                                                <ProfileliText MediaLeft={"17px"}>게임 리뷰</ProfileliText>
                                            </Profileli>

                                        </ProfileUl>
                                    </WriteListBox>

                                    <ModalFastMenu
                                        onClick={() => setModalOnOffBtn(!modalOnOffBtn)}
                                    >
                                        <ModalFastMenuIcon><CgMenuGridR /></ModalFastMenuIcon>
                                    </ModalFastMenu>

                                    <Darkmode />

                                </ButtonBox>


                            </AllButtonBox>
                        </Topnav>
                    </BackgroudTopNav>

                    <BackgroudSubNav LineCheck={BackgroundLine} TopBack={scrollPosition}>
                        <SubNavMenu LineCheck={BackgroundLine}>
                            <GameSubNav display={isGameTabCheck} TopBack={scrollPosition}>
                                <Link to='/'><SubNavText>홈</SubNavText></Link>
                                <Link to='/OfficialGame'><SubNavText>공식게임</SubNavText></Link>
                                <Link to='/AllGamePage/indie'><SubNavText>전체게임</SubNavText></Link>
                            </GameSubNav>
                            <ShopSubNav display={isShopTabCheck} TopBack={scrollPosition}>
                                <Link to='/'><SubNavText>홈</SubNavText></Link>
                                <Link to='/'><SubNavText>쿠폰샵</SubNavText></Link>
                                <Link to='/'><SubNavText>굿즈샵</SubNavText></Link>
                                <Link to='/'><SubNavText>장바구니</SubNavText></Link>
                            </ShopSubNav>
                            <ComunitySubNav display={isComunityTabCheck} TopBack={scrollPosition}>
                                <Link to='/Board/notice'><SubNavText>공지사항</SubNavText></Link>
                                <Link to='/Event'><SubNavText>이벤트</SubNavText></Link>
                                <Link to='/Board/question'><SubNavText>질문게시판</SubNavText></Link>
                                <Link to='/Board/strategy'><SubNavText>공략게시판</SubNavText></Link>
                                <Link to='/Board/free'><SubNavText>자유게시판</SubNavText></Link>
                            </ComunitySubNav>
                            <SupportSubNav display={isSupprotTabCheck} TopBack={scrollPosition}>
                                <Link to='/'><SubNavText>이용문의</SubNavText></Link>
                                <Link to='/'><SubNavText>회사정보</SubNavText></Link>
                            </SupportSubNav>
                        </SubNavMenu>
                    </BackgroudSubNav>
                </LeaveBox>
            </ALLNavBox>
            <Outlet />
        </>
    );
}

export const ScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

const LoginCheckBox = styled.div
    `
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    align-items: center;
    color: #ededed;
    font-size: 20px;
    a{
        color: #ededed;
        margin: 0px 8px 0px 0px;
    }
`

const SlideNav = styled(Swiper)
    `
    display: none;
    -webkit-tap-highlight-color: transparent;

    .swiper-slide {
        display: inline-flex;
        width: auto;
    }

    @media (min-width:250px) and (max-width:891px)
    {
        display: flex;
    }

`

const ModalAllOffBtn = styled.div
    `
    display: flex;
    color: white;
    font-size: 45px;
    justify-content: end;
    cursor: pointer;
`

const ModalAllOffBtnText = styled.span
    `
    margin: 14px 23px 0px 0px;
`

const ModalUserMenu = styled.div
    `
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`

const ModalFast = styled.div
    `
    display: ${props => props.OnOff ? "flex" : "none"};
    justify-content: end;
    position: fixed;
    white-space: nowrap;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(25,25,25,0.3);
    z-index:99999;
`

const ModalAnimateOpen = keyframes
    `
    0%{
        width: 0px;
    },
    100%{
        width: 375px;
    }

`

const ModalAnimateClose = keyframes
    `
    0%{
        width: 375px;
    },
    100%{
        width: 0px;
    }

`

const ModalFastMenuBox = styled.div
    `
    display: flex;
    flex-direction: column;
    width: ${props => props.OnOff ? "375px" : "0px"};
    height: 100%;
    background: rgba(25,25,25,1);
    animation: ${props => props.OnOff ? ModalAnimateOpen : ModalAnimateClose} 0.5s;
    overflow: hidden;
    @media (min-width:250px) and (max-width:622px)
    {
         width: 100%;
    }

`

const SearchModal = styled.div
    `
    display: ${props => props.OnOff ? "flex" : "none"};
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(25,25,25,1);
`

const ModalFastMenu = styled.div
    `
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 35px;
        cursor: pointer;
        margin: 0px 10px 0px 0px;
        &:hover{
        color: #55aaff;
    }
`

const SearchModalMenu = styled.div
    `
    display: none;

    @media (min-width:250px) and (max-width:1156px)
    {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 35px;
        cursor: pointer;
        margin: 0px 10px 0px 0px;
        &:hover{
            color: #55aaff;
        }
    };
`

const NavMenuAllBox = styled.div
    `
    display: flex;
`

const ModalFastMenuIcon = styled.i
    `
    display: flex;
    align-items: center;
`

const ShoppingMenuIcon = styled.i
    `
    display: flex;
    align-items: center;
`

const ModalSearchMenuIcon = styled.i
    `
    display: flex;
    align-items: center;
`

const LeaveBox = styled.div
    `

`

const WriteBox = styled.div
    `
    width: 66px;
    height: 11px;
    border: solid 2px white;
    padding: 14.5px;
    border-radius: 8px;
    background: ${props => props.click ? "#2773cf" : "#6a9dda"};
    font-size: 22px;
    cursor: pointer;
    margin: 7px 0px 0px 19px;
    
    @media (hover: hover)
    {
        &:hover
        {
            background: #2773cf;
        }
    }
`

const WriteBoxText = styled.span
    `   
    margin: -6px 0px 0px 2.5px;
    position:absolute;
    @media (min-width:250px) and (max-width:666px)
    {
        white-space: nowrap;
    }
`
const BackgroudTopNav = styled.div
    `
    background-color: ${props => props.TopBack === 0 ? "rgba(25,25,25,0.6)" : "#2b2b2b"};
    transition: background-color 0.5s;

    @media (min-width:250px) and (max-width:666px)
    {
        width: 100%;
    }

    @media (min-width:667px) and (max-width:1342px)
    {
        height: 78px;
    }
`

const BackgroudSubNav = styled.div
    `
    display: ${props => props.LineCheck ? "block" : "none"};
    background: ${props => props.TopBack === 0 ? "rgba(25,25,25,0.4)" : "white"};
    border-bottom: ${props => props.LineCheck ? props.TopBack === 0 ? "none" : "solid 3px #3c3c3c" : "none"};

    @media (min-width:250px) and (max-width:666px)
    {
        width: 100%;
    }

`

const ALLNavBox = styled.div
    `
    font-size: 25px;
    position: relative;
    z-index:9999;
`

const GameSubNav = styled.div
    `
    display: ${props => props.display ? "block" : "none"};
a{
    text-decoration: none;
    -webkit-tap-highlight-color:transparent;
    color: ${props => props.TopBack === 0 ? "white" : "black"};
    font-weight: bold;
    &:hover
    {
        color: #6a9dda;
    }
}

&::-webkit-scrollbar
    {
        display: none;
    }

    @media (min-width:250px) and (max-width:666px)
    {
        white-space: nowrap;
        overflow: scroll;
    }
`

const ShopSubNav = styled(GameSubNav)
    `
    display: ${props => props.display ? "block" : "none"};
    a{
        text-decoration: none;
        -webkit-tap-highlight-color:transparent;
        color: ${props => props.TopBack === 0 ? "white" : "black"};
        font-weight: bold;
        &:hover
        {
            color: #6a9dda;
        }
    }
    &:hover
    {
        color: #6a9dda;
    }
    &::-webkit-scrollbar
    {
        display: none;
    }

    @media (min-width:250px) and (max-width:666px)
    {
        white-space: nowrap;
        overflow: scroll;
    }
`
const ComunitySubNav = styled(GameSubNav)
    `
    display: ${props => props.display ? "block" : "none"};
    a{
        text-decoration: none;
        -webkit-tap-highlight-color:transparent;
        color: ${props => props.TopBack === 0 ? "white" : "black"};
        font-weight: bold;
        &:hover
        {
            color: #6a9dda;
        }
    }
    &:hover
    {
        color: #6a9dda;
    }

    &::-webkit-scrollbar
    {
        display: none;
    }

    @media (min-width:250px) and (max-width:666px)
    {
        white-space: nowrap;
        overflow: scroll;
    }
`
const SupportSubNav = styled(GameSubNav)
    `
    display: ${props => props.display ? "block" : "none"};
    a{
        text-decoration: none;
        -webkit-tap-highlight-color:transparent;
        color: ${props => props.TopBack === 0 ? "white" : "black"};
        font-weight: bold;
        &:hover
        {
            color: #6a9dda;
        }
    }
    &:hover
    {
        color: #6a9dda;
    }
    &::-webkit-scrollbar
    {
        display: none;
    }

    @media (min-width:250px) and (max-width:666px)
    {
        white-space: nowrap;
        overflow: scroll;
    }
`

const SubNavText = styled.span
    `
    padding: 0px 10px 0px 10px;
`

const GameLi = styled.li
    `
    display: flex;
    flex-direction: column;
    -webkit-tap-highlight-color: transparent;
    justify-content: center;
    padding: 0px 20px 0px 20px;
    list-style: none;
    white-space: nowrap;
    font-size: 25px;
    @media (min-width:250px) and (max-width:666px)
    {
        font-size: 20px;
    }
    a
    {
        color: ${props => props.active ? "#55aaff" : "white"};
        -webkit-tap-highlight-color:transparent;
    }
`

const ShopLi = styled(GameLi)
    `
`

const ComunityLi = styled(GameLi)
    `
`
const SupportLi = styled(GameLi)
    `
`

const SubNavMenu = styled.div
    `
    height: 55px;
    justify-content: center;
    font-size:21.7px;
    display: flex;
    margin: auto;
    max-width: 1500px;
    align-items: center;
    @media (min-width:250px) and (max-width:666px)
    {
        font-size: 17px;
    }
`

const Topnav = styled.header
    `
    padding: 0px 48px;
    height: 78px;
    display: flex;
    margin: auto;
    max-width: 1500px;
    color: white;
    justify-content: space-between;
    a{
        text-decoration: none;
        font-weight: bold;
        -webkit-tap-highlight-color:transparent;
    }

    @media (min-width:250px) and (max-width:623px)
    {
        flex-direction: column;
        padding: 10px;
    }
`

const Logo = styled.img
    `
    width: 144px;
    height: 72px;

     @media (min-width:250px) and (max-width:666px)
    {
        width: 95px;
        height: 46px;
    }
`

const LogoBox = styled.div
    `
`

const NavBox = styled.div
    `
    display: flex;
    align-items: center;
    position: relative;
    color: white;
    overflow: hidden;
    -webkit-mask-image: linear-gradient(270deg,transparent,#000 2.2rem);
`
const NavSlideAllBox = styled.div
    `

`

const NavUl = styled.ul
    `
    display: flex;
    white-space: nowrap;
    height: 27px;

    @media (min-width:250px) and (max-width:891px)
    {
        display: none;
    }
`

export const SearchInput = styled.input
    `
    border: none;
    outline: none;
    border-top-left-radius: 18px;
    border-bottom-left-radius: 18px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    padding: 0px 8px 0px 12px;
    font-size: 20px;
    width: 170px;
    height: 35.5px;
    caret-color: white;
    background: ${props => props.TopBack === 0 ? "rgba(74, 74, 74, 0.7)" : "#4a4a4a"};
    transition: background 0.5s;
    color: #d1d1d1;

    &::placeholder{
        color: #d1d1d1;
    }
`

const AllButtonBox = styled.div
    `
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    color: white;
    -webkit-tap-highlight-color:transparent;
`

const ButtonBox = styled.div
    `
    display: flex;
    align-items: center;
`

const MenuBox = styled.div
    `
    color: ${props => props.click ? "#6a9dda" : "white"};
    cursor: pointer;
    white-space: nowrap;
    a
    {
        font-size:23px;
        font-weight: lighter;
        color: white;
        text-decoration: none;
        -webkit-tap-highlight-color:transparent;    
    }

    @media (hover: hover)
    {
        &:hover
        {
            color: #6a9dda;
        }
    }
`

const ShoppingBox = styled.div
    `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 35px;
    cursor: pointer;
    margin: 0px 10px 0px 0px;
    &:hover{
        color: #55aaff;
    }
`

const LineBox = styled(MenuBox)
    `
    &::after
    {
        content: "";
        background: white;
        display: inline-block;
        height: 16px;
        width: 2px;
        margin: 0px 7px -1px 15px;
    }
`

export const SearchInputBox = styled.div
    `
    display: flex;
    border: none;
    border-radius: 13px;
    margin: 0px 16px 0px 0px;

    @media (min-width:250px) and (max-width:1155px)
    {
        display: none;
    }
}
`

export const SearchInputIconBox = styled.div
    `
    border-top-right-radius: 18px;
    border-bottom-right-radius: 18px;
    background: ${props => props.TopBack === 0 ? "rgba(74, 74, 74, 0.7)" : "#4a4a4a"};
    transition: background 0.5s;
    height: 35.5px;
    -webkit-user-select: none;
`

export const SearchButton = styled.button
    `
    border: none;
    background: transparent;
    padding: 2px 8px 0px 0px;
    cursor: pointer;
    font-size: 29px;
    color: white;

    @media (hover: hover)
    {
        &:hover
        {
            color: #6a9dda;
        }
    }

`

const ModalProfileImgBox = styled.div
    `
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #ededed;
    margin: 14px 0px 0px 0px;
`

const ModalNickNameBox = styled.div
    `
    margin: 37px 0px 25px 0px;
    font-size: 22px;
`

const ModalNickNamePointText = styled.span
    `
    font-weight: bold;
`

const ModalNickNameText = styled.span
    `

`

const MyPageShopBox = styled.div
    `
    display: flex;
    font-size: 18px;
    color: #ededed;
    a{
        color: #ededed;
    }
`

const MyPageBtnBox = styled.div
    `
    margin: 0px 23px 0px 0px;
`

const MyPageBtnText = styled.span
    `

`

const ShopBtnBox = styled.div
    `

`

const ShopBtnText = styled.span
    `

`

const Profile = styled.div
    `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 130px;
    height: 130px;
    border-radius: 50%;
    box-sizing: border-box;
    overflow: hidden;
    cursor: pointer;
    
    @media (hover: hover)
    {
        &:hover
        {
            box-shadow: 0px 0px 0px 3px #6a9dda;
        }
        
    }
`

const Profileimg = styled.img
    `
    width: 130px;
    height: 130px;
`
const DropdownImg = styled.img
    `
    width: 34px;
    height: 34px;
`

const ProfileImg = styled(DropdownImg)
    `
    border-radius: 50%;
`

const ProFileSlideDown = keyframes
    `
    0%{
        height: 0px;
    }
    100%{
        height: 384px;
    }
    }
`

const WriterSlideDown = keyframes
    `
    0%{
        height: 0%;
    }
    100%{
        ${props => props.size === "DEVELOPER" ? "319px" : "255px"}
    }
`

const ProfileListBox = styled.div
    `
    display: ${props => props.default ? props.logout ? "none" : "block" : "none"};
    width: 217px;
    margin: 59px 0px 0px 56.5px;
    box-shadow: 0px 0px 0px ${props => props.show ? "3px" : "0px"} ${props => props.theme.borderColor};
    background: white;  
    height: ${props => props.show ? "384px" : "0px"};
    border-radius: 10px;
    position: absolute;
    animation: ${props => props.show ? ProFileSlideDown : "none"} 0.25s;
    overflow: hidden;
    z-index: ${props => props.zindex ? 2 : 1};
`

const FastListBox = styled(ProfileListBox)
    `
    display: ${props => props.default ? "block" : "none"};
    width: 310px;
    margin: 59px 0px 0px 11px;
    height: ${props => props.show ? "378px" : "0px"};
    z-index: ${props => props.zindex ? 2 : 1};
`

const WriteListBox = styled.div
    `
    display: ${props => props.default ? props.logout ? "none" : "block" : "none"};
    width: 217px;
    margin: 59px 0px 0px 137px;
    box-shadow: 0px 0px 0px ${props => props.show ? "3px" : "0px"} ${props => props.theme.borderColor};
    background: white;
    border-radius: 10px;
    position: absolute;
    height: ${props => props.show ? props.size === "DEVELOPER" ? "377px" : "314px" : "0px"};
    animation: ${props => props.show ? WriterSlideDown : "none"} 0.25s;
    overflow: hidden;
    z-index: ${props => props.zindex ? 2 : 1};
`

const ProfileUl = styled.ul
    `
    margin: 0px;
    padding: 0px;
    color: black;
    overflow: hidden;
    a
    {
        color: black;
        font-size: 25px;
        font-weight: bold;
        -webkit-tap-highlight-color:transparent;
    }
`

const Profileli = styled.li
    `
    list-style: none;
    cursor:pointer;
    padding: ${props => props.padding};
    font-weight: bold;
    font-size: 25px;
    display:flex;
    &:hover
    {
        background-color: #6a9dda;
    }
    &::after
    {
        content: '';
        display: ${props => props.line};
        clear: both;
        position: absolute;
        left: 50%;
        width: calc(100% - -4px);
        height: 1px;
        transform: translateX(-50%);
        background: black;
        margin: 48px 0px 0px -1px;
    }
`
const ProfileliText = styled.span
    `
        margin-left: ${props => props.MediaLeft};
        margin-top: 2.5px; 
        font-size: 25px;
`

const ProfileliIcon = styled.i
    `
        margin-left: ${props => props.left};
`
export default HeaderBox;