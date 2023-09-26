import { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";
import { CgMenuGridR } from "react-icons/cg";
import { MdLanguage } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import Darkmode from "../Darkmode/DarkmodeChangeBtn";
import { AiOutlineShopping } from "react-icons/ai";
import { clearLoginState } from "../Redux/User";

import LogoLight from "../../img/LOGO/8bitLight.png";

import Korean from "../../img/Lang/korea.png";
import Japan from "../../img/Lang/japan.png";
import Germany from "../../img/Lang/germany.png";
import China from "../../img/Lang/china.png";
import Spain from "../../img/Lang/spain.png";
import UK from "../../img/Lang/uk.png";

import User from "../../img/MySlide/user.png";
import Bell from "../../img/MySlide/bell.png";
import Coding from "../../img/MySlide/coding.png";
import Shop from "../../img/MySlide/store.png";
import Update from "../../img/MySlide/update.png";
import Logout from "../../img/MySlide/logout.png";

import Essay from "../../img/BoardSlide/essay.png";
import Discussion from "../../img/BoardSlide/discussion.png";
import Strategy from "../../img/BoardSlide/strategy.png";
import Rating from "../../img/BoardSlide/rating.png";
import Console from "../../img/BoardSlide/console.png";
import Digital from "../../img/BoardSlide/digital.png";

import axios from 'axios';
import Store from "../Redux/Store";

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
    const [isDefaultLanguageScene, setIsDefaultLanguageScene] = useState(false);
    const [isDefaultFastScene, setIsDefaultFastScene] = useState(false);
    const [isDefaultWriteScene, setDefaultWriteScene] = useState(false);
    const [LanguageMenuShow, setIsLanguageMenuShow] = useState(false);
    const [FastMenuShow, setIsFastMenuShow] = useState(false);
    const [WriteMenuShow, setIsWriteMenuShow] = useState(false);
    const [WriteMenuClickCheck, setIsWriteMenuClickCheck] = useState(false);
    const [WriteClickCheck, setWriteClickCheck] = useState(false);
    const [LanguageClickCheck, setLanguageClickCheck] = useState(false);
    const [FastClickCheck, setFastClickCheck] = useState(false);
    const [BackgroundLine, setBackgroundLine] = useState(false)



    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let userInfo = localStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    const loginMaintain = localStorage.getItem("loginMaintain");
    const ip = localStorage.getItem("ip");


    let languageTopZIndex = useRef(false);
    let fastMenuTopZIndex = useRef(false);
    let profileMenuTopZIndex = useRef(false);
    let writeMemuTopZIndex = useRef(false);
    let ProfileRef = useRef(null);
    let LanguageRef = useRef(null);
    let FastRef = useRef(null);
    let WriteRef = useRef(null);
    let BtnLeaveRef = useRef(null);

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
            document.addEventListener("mouseout", handleOuside);
        }
        return () => {
            document.removeEventListener("mouseout", handleOuside);
        };
    }, [BtnLeaveRef]);

    console.log(BtnLeaveRef);

    useEffect(() => {
        function handleOuside(e) {
            if (LanguageRef.current && !LanguageRef.current.contains(e.target)) {
                setLanguageClickCheck(false);
                setIsLanguageMenuShow(false);
            }
        };

        if (!LanguageMenuShow) {
            document.addEventListener("click", handleOuside);
        }
        return () => {
            document.removeEventListener("click", handleOuside);
        };
    }, [LanguageRef]);

    useEffect(() => {
        function handleOuside(e) {
            if (FastRef.current && !FastRef.current.contains(e.target)) {
                setFastClickCheck(false);
                setIsFastMenuShow(false);
            }
        };

        if (!FastMenuShow) {
            document.addEventListener("click", handleOuside);
        }
        return () => {
            document.removeEventListener("click", handleOuside);
        };
    }, [FastRef]);

    useEffect(() => {
        function handleOuside(e) {
            if (ProfileRef.current && !ProfileRef.current.contains(e.target)) {
                setProfileMenuShow(false);
                setProfileClickCheck(false);
            }
        };

        if (!ProfileMenuShow) {
            document.addEventListener("click", handleOuside);
        }
        return () => {
            document.removeEventListener("click", handleOuside);
        };
    }, [ProfileRef]);

    useEffect(() => {
        function handleOuside(e) {
            if (WriteRef.current && !WriteRef.current.contains(e.target)) {
                setIsWriteMenuShow(false);
                setIsWriteMenuClickCheck(false);
                setWriteClickCheck(false);
            }
        };

        if (!WriteMenuShow) {
            document.addEventListener("click", handleOuside);
        }
        return () => {
            document.removeEventListener("click", handleOuside);
        };
    }, [WriteRef]);



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


    const LanguageMenuCheck = () => {
        languageTopZIndex.current = true;
        fastMenuTopZIndex.current = false;
        profileMenuTopZIndex.current = false;
        writeMemuTopZIndex.current = false;
        setIsLanguageMenuShow(!LanguageMenuShow);
        setLanguageClickCheck(!LanguageClickCheck);
        setIsDefaultLanguageScene(true);
        setProfileMenuShow(false);
        setProfileClickCheck(false);
        setIsFastMenuShow(false);
        setFastClickCheck(false);
        setWriteClickCheck(false);
        setIsWriteMenuShow(false);
        setIsWriteMenuClickCheck(false);
    }

    const LanguageMenuNotCheck = () => {
        setLanguageClickCheck(false);
        setIsLanguageMenuShow(false);
    }

    const FastMenuCheck = () => {
        languageTopZIndex.current = false;
        fastMenuTopZIndex.current = true;
        profileMenuTopZIndex.current = false;
        writeMemuTopZIndex.current = false;
        setIsFastMenuShow(!FastMenuShow);
        setFastClickCheck(!FastClickCheck);
        setIsDefaultFastScene(true);
        setProfileMenuShow(false);
        setProfileClickCheck(false);
        setIsLanguageMenuShow(false);
        setLanguageClickCheck(false);
        setWriteClickCheck(false);
        setIsWriteMenuShow(false);
        setIsWriteMenuClickCheck(false);
    }

    const ProfileMenuCheck = () => {
        languageTopZIndex.current = false;
        fastMenuTopZIndex.current = false;
        profileMenuTopZIndex.current = true;
        writeMemuTopZIndex.current = false;
        setIsProfileLogoutCheck(false);
        setProfileMenuShow(!ProfileMenuShow);
        setProfileClickCheck(!ProfileClickCheck);
        setIsDefaultProfileScene(true);
        setIsLanguageMenuShow(false);
        setLanguageClickCheck(false);
        setIsFastMenuShow(false);
        setFastClickCheck(false);
        setWriteClickCheck(false);
        setIsWriteMenuShow(false);
        setIsWriteMenuClickCheck(false);
    }

    const WriteMenuCheck = () => {
        languageTopZIndex.current = false;
        fastMenuTopZIndex.current = false;
        profileMenuTopZIndex.current = false;
        writeMemuTopZIndex.current = true;
        setIsWriteMenuShow(!WriteMenuShow);
        setIsWriteMenuClickCheck(!WriteMenuClickCheck);
        setWriteClickCheck(!WriteClickCheck);
        setDefaultWriteScene(true);
        setProfileMenuShow(false);
        setProfileClickCheck(false);
        setIsLanguageMenuShow(false);
        setLanguageClickCheck(false);
        setIsFastMenuShow(false);
        setFastClickCheck(false);
    }


    return (
        <ALLNavBox>
            <LeaveBox  ref={BtnLeaveRef}>
            <BackgroudTopNav>
                <Topnav>
                    <NavBox>
                        <LogoBox>
                            <Link to='/'><Logo src={LogoLight} alt='로고' /></Link>
                        </LogoBox>
                        <NavUl>
                            <GameLi onClick={() => ScrollTop()} active={isGameIconCheck}><Link to='/' onMouseOver={GameliHover}>게임</Link></GameLi>
                            <ShopLi onClick={() => ScrollTop()} active={isShopIconCheck}><Link to='/' onMouseOver={ShopliHover}>쇼핑</Link></ShopLi>
                            <ComunityLi onClick={() => ScrollTop()} active={isComunityIconCheck}><Link to='/' onMouseOver={ComunityliHover}>커뮤니티</Link></ComunityLi>
                            <SupportLi onClick={() => ScrollTop()} active={isSupprotIconCheck}><Link to='/' onMouseOver={SupportliHover}>서포트</Link></SupportLi>
                        </NavUl>
                    </NavBox>
                    <AllButtonBox>
                        <SearchInputBox>
                            <SearchInput placeholder="게임 검색하기" value={Search} onChange={OnSearch} />
                            <SearchInputIconBox>
                                <SearchButton><HiOutlineSearch /></SearchButton>
                            </SearchInputIconBox>
                        </SearchInputBox>
                        <ButtonBox
                            menucheck={loginMaintain == null ?
                                false : loginMaintain === "true" ?
                                    (userInfo == null ? false : userInfo.loginState === "allok" ? true : false) : (user.login_state === "allok" ? true : false)}
                        >

                            {loginMaintain == null ? [] : loginMaintain == "true" ?
                                (userInfo == null ? [] : userInfo.loginState === "allok" ?
                                    [<MenuBox
                                        left={"19px"}
                                        top={"8.3px"}
                                        size={"33px"}
                                        padding={"5.4px 0px 0px 0px"}
                                    >
                                        <AiOutlineShopping />
                                    </MenuBox>] : []) :

                                (user.login_state === "allok" ?
                                    [<MenuBox
                                        left={"19px"}
                                        top={"8.3px"}
                                        size={"33px"}
                                        padding={"5.4px 0px 0px 0px"}
                                    >
                                        <AiOutlineShopping />
                                    </MenuBox>] : [])}

                            <MenuBox
                                click={LanguageClickCheck}
                                left={"19px"}
                                top={"10px"}
                                size={"30px"}
                                ref={LanguageRef}
                                padding={"6px 0px 0px 0px"}
                                onClick={() => LanguageMenuCheck()} onBlur={() => LanguageMenuNotCheck()}
                            >
                                <MdLanguage />
                            </MenuBox>

                            <Darkmode />

                            <MenuBox
                                click={FastClickCheck}
                                left={"24px"}
                                top={"9px"}
                                size={"33px"}
                                ref={FastRef}
                                padding={"4.8px 0px 0px 0px"}
                                onClick={() => FastMenuCheck()}
                            >
                                <CgMenuGridR />
                            </MenuBox>

                            <>
                                {loginMaintain == null ?
                                    [<LineBox onClick={() => ScrollTop()} left={"20px"} top={"7px"} size={"15px"} padding={"10px 0px 10px 0px"}>
                                        <Link to='/Login'>로그인</Link>
                                    </LineBox>,
                                    <MenuBox
                                        onClick={() => ScrollTop()}
                                        left={"9px"}
                                        top={"7px"}
                                        size={"15px"}
                                        padding={"10px 0px 10px 0px"}
                                    >
                                        <Link to='/SelectSign'>회원가입</Link>
                                    </MenuBox>] :

                                    loginMaintain == "true" ?
                                        (userInfo == null ?
                                            [<LineBox
                                                onClick={() => ScrollTop()}
                                                left={"20px"}
                                                top={"7px"}
                                                size={"15px"}
                                                padding={"10px 0px 10px 0px"}
                                            >
                                                <Link to='/Login'>로그인</Link>
                                            </LineBox>,

                                            <MenuBox
                                                onClick={() => ScrollTop()}
                                                left={"9px"}
                                                top={"7px"}
                                                size={"15px"}
                                                padding={"10px 0px 10px 0px"}
                                            >
                                                <Link to='/SelectSign'>회원가입</Link>
                                            </MenuBox>] :

                                            userInfo.loginState === "allok" ?
                                                [<Profile
                                                    click={ProfileClickCheck}
                                                    ref={ProfileRef}
                                                    onClick={() => ProfileMenuCheck()}
                                                >
                                                    <Profileimg src={localStorage.getItem("profileImageDir") + userInfo.profileImgPath} />
                                                </Profile>,

                                                <WriteBox
                                                    click={WriteClickCheck}
                                                    onClick={() => WriteMenuCheck()}
                                                    ref={WriteRef}
                                                >
                                                    <WriteBoxText >글쓰기</WriteBoxText>
                                                </WriteBox>] :

                                                [<LineBox
                                                    onClick={() => ScrollTop()}
                                                    left={"20px"}
                                                    top={"7px"}
                                                    size={"15px"}
                                                    padding={"10px 0px 10px 0px"}
                                                >
                                                    <Link to='/Login'>로그인</Link>
                                                </LineBox>,

                                                <MenuBox
                                                    onClick={() => ScrollTop()}
                                                    left={"9px"}
                                                    top={"7px"}
                                                    size={"15px"}
                                                    padding={"10px 0px 10px 0px"}
                                                >
                                                    <Link to='/SelectSign'>회원가입</Link>
                                                </MenuBox>]) :
                                        (user.login_state === "allok" ?
                                            [<Profile
                                                click={ProfileClickCheck}
                                                ref={ProfileRef}
                                                onClick={() => ProfileMenuCheck()}
                                            >
                                                <Profileimg src={localStorage.getItem("profileImageDir") + user.profile_img_path} />
                                            </Profile>,

                                            <WriteBox
                                                click={WriteClickCheck}
                                                onClick={() => WriteMenuCheck()}
                                                ref={WriteRef}
                                            >
                                                <WriteBoxText >글쓰기</WriteBoxText>
                                            </WriteBox>] :
                                            [<LineBox
                                                onClick={() => ScrollTop()}
                                                left={"20px"}
                                                top={"7px"}
                                                size={"15px"}
                                                padding={"10px 0px 10px 0px"}
                                            >
                                                <Link to='/Login'>로그인</Link>
                                            </LineBox>,

                                            <MenuBox
                                                onClick={() => ScrollTop()}
                                                left={"9px"}
                                                top={"7px"}
                                                size={"15px"}
                                                padding={"10px 0px 10px 0px"}
                                            >
                                                <Link to='/SelectSign'>회원가입</Link>
                                            </MenuBox>])}
                            </>

                            <LanguageListBox
                                margin={loginMaintain == null ? false : loginMaintain == "true" ?
                                    ((userInfo != null) ? (userInfo.loginState === "allok" ?
                                        true : false) : false) :
                                    (user.login_state === "allok" ? true : false)}
                                zindex={languageTopZIndex.current}
                                default={isDefaultLanguageScene}
                                show={LanguageMenuShow}>
                                <ProfileUl>
                                    <Profileli
                                        padding="15px 0px 15px 13px"
                                        onClick={() => [setIsLanguageMenuShow(!LanguageMenuShow),
                                        setLanguageClickCheck(!LanguageClickCheck)]}
                                    >
                                        <DropdownImg src={Korean} />
                                        <ProfileliText MediaLeft={"17px"}>Korean</ProfileliText>
                                    </Profileli>
                                    <Profileli
                                        padding="15px 0px 15px 13px"
                                        onClick={() => [setIsLanguageMenuShow(!LanguageMenuShow),
                                        setLanguageClickCheck(!LanguageClickCheck)]}
                                    >
                                        <DropdownImg src={UK} />
                                        <ProfileliText MediaLeft={"17px"}>English</ProfileliText>
                                    </Profileli>
                                    <Profileli
                                        padding="15px 0px 15px 13px"
                                        onClick={() => [setIsLanguageMenuShow(!LanguageMenuShow),
                                        setLanguageClickCheck(!LanguageClickCheck)]}
                                    >
                                        <DropdownImg src={Germany} />
                                        <ProfileliText MediaLeft={"17px"}>Deutsch</ProfileliText>
                                    </Profileli>
                                    <Profileli
                                        padding="15px 0px 15px 13px"
                                        onClick={() => [setIsLanguageMenuShow(!LanguageMenuShow),
                                        setLanguageClickCheck(!LanguageClickCheck)]}
                                    >
                                        <DropdownImg src={Spain} />
                                        <ProfileliText MediaLeft={"17px"}>Espanol</ProfileliText>
                                    </Profileli>
                                    <Profileli
                                        padding="15px 0px 15px 13px"
                                        onClick={() => [setIsLanguageMenuShow(!LanguageMenuShow),
                                        setLanguageClickCheck(!LanguageClickCheck)]}
                                    >
                                        <DropdownImg src={Japan} />
                                        <ProfileliText MediaLeft={"17px"}>Japanese</ProfileliText>
                                    </Profileli>
                                    <Profileli
                                        padding="11.5px 0px 15px 13px"
                                        onClick={() => [setIsLanguageMenuShow(!LanguageMenuShow),
                                        setLanguageClickCheck(!LanguageClickCheck)]}
                                    >
                                        <DropdownImg src={China} />
                                        <ProfileliText MediaLeft={"17px"}>Chinese</ProfileliText>
                                    </Profileli>
                                </ProfileUl>
                            </LanguageListBox>

                            <FastListBox zindex={fastMenuTopZIndex.current} default={isDefaultFastScene} show={FastMenuShow}>
                                <ProfileUl>

                                </ProfileUl>
                            </FastListBox>

                            <ProfileListBox
                                zindex={profileMenuTopZIndex.current}
                                default={isDefaultProfileScene}
                                logout={isProfileLogoutCheck}
                                show={ProfileMenuShow}
                            >
                                <ProfileUl>
                                    <Link to='/'>
                                        <Profileli
                                            padding="15px 0px 15px 13px"
                                            onClick={() => [setProfileMenuShow(!ProfileMenuShow),
                                            setProfileClickCheck(!ProfileClickCheck)]}
                                        >
                                            <DropdownImg src={User} />
                                            <ProfileliText MediaLeft={"17px"}>마이페이지</ProfileliText>
                                        </Profileli>
                                    </Link>

                                    <Profileli
                                        padding="15px 0px 15px 13px"
                                        onClick={() => [setProfileMenuShow(!ProfileMenuShow),
                                        setProfileClickCheck(!ProfileClickCheck)]}
                                    >
                                        <DropdownImg src={Bell} />
                                        <ProfileliText MediaLeft={"17px"}>소식 알람</ProfileliText>
                                    </Profileli>

                                    <Link to='/'>
                                        <Profileli
                                            padding="15px 0px 15px 13px"
                                            onClick={() => [setProfileMenuShow(!ProfileMenuShow),
                                            setProfileClickCheck(!ProfileClickCheck)]}
                                        >
                                            <DropdownImg src={Coding} />
                                            <ProfileliText MediaLeft={"17px"}>개발자등록</ProfileliText>
                                        </Profileli>
                                    </Link>

                                    <Link to='/'>
                                        <Profileli
                                            padding="15px 0px 15px 13px"
                                            onClick={() => [setProfileMenuShow(!ProfileMenuShow),
                                            setProfileClickCheck(!ProfileClickCheck)]}
                                        >
                                            <DropdownImg src={Shop} />
                                            <ProfileliText MediaLeft={"17px"}>굿즈샵 입점</ProfileliText>
                                        </Profileli>
                                    </Link>

                                    <Link to='/'>
                                        <Profileli
                                            padding="15px 0px 15px 13px"
                                            onClick={() => [setProfileMenuShow(!ProfileMenuShow),
                                            setProfileClickCheck(!ProfileClickCheck)]}
                                        >
                                            <DropdownImg src={Update} />
                                            <ProfileliText MediaLeft={"17px"}>회원정보수정</ProfileliText>
                                        </Profileli>
                                    </Link>

                                    <Profileli
                                        line="none"
                                        padding="10px 0px 15px 13px"
                                        onClick={LogoutFunc}
                                    >
                                        <DropdownImg src={Logout} />
                                        <ProfileliText MediaLeft={"16px"}>로그아웃</ProfileliText>
                                    </Profileli>
                                </ProfileUl>

                            </ProfileListBox>

                            <WriteListBox
                                zindex={writeMemuTopZIndex.current}
                                default={isDefaultWriteScene}
                                show={WriteMenuShow}
                            >
                                <ProfileUl>
                                    <Link to="/WriteBoard">
                                        <Profileli
                                            padding="15px 0px 15px 13px"
                                            onClick={() => setIsWriteMenuShow(!WriteMenuShow)}
                                        >
                                            <DropdownImg src={Essay} />
                                            <ProfileliText MediaLeft={"17px"}>자유게시판</ProfileliText>
                                        </Profileli>
                                    </Link>

                                    <Profileli
                                        padding="15px 0px 15px 13px"
                                        onClick={() => setIsWriteMenuShow(!WriteMenuShow)}
                                    >
                                        <DropdownImg src={Discussion} />
                                        <ProfileliText MediaLeft={"17px"}>토론게시판</ProfileliText>
                                    </Profileli>

                                    <Profileli
                                        padding="15px 0px 15px 13px"
                                        onClick={() => setIsWriteMenuShow(!WriteMenuShow)}
                                    >
                                        <DropdownImg src={Strategy} />
                                        <ProfileliText MediaLeft={"17px"}>공략게시판</ProfileliText>
                                    </Profileli>

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

                                    <Profileli
                                        padding="10.5px 0px 15px 13px"
                                        onClick={() => setIsWriteMenuShow(!WriteMenuShow)}
                                    >
                                        <DropdownImg src={Digital} />
                                        <ProfileliText MediaLeft={"17px"}>아트워크</ProfileliText>
                                    </Profileli>

                                </ProfileUl>
                            </WriteListBox>
                        </ButtonBox>
                    </AllButtonBox>
                </Topnav>
            </BackgroudTopNav>

            <BackgroudSubNav LineCheck={BackgroundLine}>
                <SubNavMenu LineCheck={BackgroundLine}>
                    <GameSubNav display={isGameTabCheck}>
                        <Link to='/'><SubNavText>홈</SubNavText></Link>
                        <Link to='/'><SubNavText>전체게임</SubNavText></Link>
                        <Link to='/'><SubNavText>공식게임</SubNavText></Link>
                        <Link to='/'><SubNavText>인디게임</SubNavText></Link>
                        <Link to='/'><SubNavText>추천게임</SubNavText></Link>
                    </GameSubNav>
                    <ShopSubNav display={isShopTabCheck}>
                        <Link to='/'><SubNavText>홈</SubNavText></Link>
                        <Link to='/'><SubNavText>쿠폰샵</SubNavText></Link>
                        <Link to='/'><SubNavText>굿즈샵</SubNavText></Link>
                        <Link to='/'><SubNavText>장바구니</SubNavText></Link>
                        <Link to='/'><SubNavText>위시리스트</SubNavText></Link>
                    </ShopSubNav>
                    <ComunitySubNav display={isComunityTabCheck}>
                        <Link to='/'><SubNavText>공지사항</SubNavText></Link>
                        <Link to='/'><SubNavText>이벤트</SubNavText></Link>
                        <Link to='/'><SubNavText>공략게시판</SubNavText></Link>
                        <Link to='/'><SubNavText>토론게시판</SubNavText></Link>
                        <Link to='/FreeBoard'><SubNavText>자유게시판</SubNavText></Link>
                    </ComunitySubNav>
                    <SupportSubNav display={isSupprotTabCheck}>
                        <Link to='/'><SubNavText>이용문의</SubNavText></Link>
                        <Link to='/'><SubNavText>회사정보</SubNavText></Link>
                    </SupportSubNav>
                </SubNavMenu>
            </BackgroudSubNav>
            </LeaveBox>
        </ALLNavBox>
    );
}

export const ScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

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
    background-color: #3c3c3c;

    @media (min-width:250px) and (max-width:666px)
    {
        width: 100%;
        height: 260px;
    }

    @media (min-width:667px) and (max-width:1342px)
    {
        height: 160px;
    }
`

const BackgroudSubNav = styled.div
    `
    background: ${props => props.LineCheck ? "white" : "transparent"};
    border-bottom: ${props => props.LineCheck ? "solid 3px #3c3c3c" : "none"};

    @media (min-width:250px) and (max-width:666px)
    {
        width: 100%;
    }

`

const ALLNavBox = styled.div
    `
    font-size: 25px;
    
`

const GameSubNav = styled.div
    `
    display: ${props => props.display ? "block" : "none"};
a{
    text-decoration: none;
    -webkit-tap-highlight-color:transparent;
    color: black;
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
    padding: 0px 20px 0px 20px;
    list-style: none;
    white-space: nowrap;
    &
    {
        font-size: 25px;
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
    background: ${props => props.LineCheck ? "white" : "transparent"};
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
        font-size: 25px;
        -webkit-tap-highlight-color:transparent;
    }

    @media (min-width:250px) and (max-width:1342px)
    {
        flex-direction: column;
    }

`

const Logo = styled.img
    `
    width: 144px;
    height: 72px;
`

const LogoBox = styled.div
    `
    margin: -13px 0px 0px 0px;
`

const NavBox = styled.div
    `
    display: flex;
    margin: 15px 0px 15px 0px;
    color: white;

    @media (min-width:250px) and (max-width:666px)
    {
        flex-direction: column;
        margin: 12px 0px 0px 0px;
        text-align: center;
    }

    @media (min-width:666px) and (max-width:1342px)
    {
        justify-content: center;
    }
`

const NavUl = styled.ul
    `
    display: flex;
    margin: 12px 0px 12px 0px;
    white-space: nowrap;

    @media (min-width:250px) and (max-width:666px)
    {
        padding: 0px;
        justify-content: center;
    }

`

export const SearchInput = styled.input
    `
    margin: 5.5px 0px 0px 0px;
    border: none;
    outline: none;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    padding: 3px 0px 0px 11px;
    font-size: 20px;
    width: 200px;
    height: 43.5px;
    caret-color: #3c3c3c;
    background: #dee2e6;
`

const AllButtonBox = styled.div
    `
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    -webkit-tap-highlight-color:transparent;

    @media (min-width:250px) and (max-width:666px)
    {
        flex-direction: column;
    }

    @media (min-width:666px) and (max-width:1342px)
    {
        margin: -10px 13px 0px 0px;
    }
`

const ButtonBox = styled.div
    `
    display: flex;
`

const MenuBox = styled.div
    `
    color: ${props => props.click ? "#6a9dda" : "white"};
    font-size: ${props => props.size};
    margin-left: ${props => props.left};
    margin-top: ${props => props.top};
    padding: ${props => props.padding};
    cursor: pointer;
    white-space: nowrap;
    a
    {
        font-size:23px;
        font-weight: lighter;
        color: white;
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
    border: solid 3px #3c3c3c;
    border-radius: 13px;
}
`

export const SearchInputIconBox = styled.div
    `
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    background: #dee2e6;
    margin: 5.5px 0px 0px 0px;
    height: 46.5px;
    -webkit-user-select: none;
`

export const SearchButton = styled.button
    `
    border: none;
    background: transparent;
    padding: 8px 8px 0px 0px;
    cursor: pointer;
    font-size: 29px;
    color: black;

    @media (hover: hover)
    {
        &:hover
        {
            color: #6a9dda;
        }
    }

`

const Profile = styled.div
    `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    border-radius: 26px;
    box-sizing: border-box;
    box-shadow: ${props => props.click ? "0px 0px 0px 3px" : "none"} #6a9dda;
    overflow: hidden;
    cursor: pointer;
    margin: 12px 0px 0px 19px;
    
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
    width: 36px;
    height: 36px;
`
const DropdownImg = styled.img
    `
    width: 33px;
    height: 33px;
`

const UserImg = styled(DropdownImg)
    `
    border-radius: 26px;
`


const ProFileSlideDown = keyframes
    `
    0%{
        height: 0px;
    }
    100%{
        height: 370px;
    }
    }
`

const ProFileSlideUp = keyframes
    `
    0%{
        height: 370px;
    }
    100%{
        height: 0px;
    }
`

const LanguageSlideDown = keyframes
    `
    0%{
        height: 0px;
    }
    100%{
        height: 119px;
    }
    }
`

const LanguageSlideUp = keyframes
    `
    0%{
        height: 119px;
    }
    100%{
        height: 0px;
    }
`

const WriteSlideDown = keyframes
    `
    0%{
        height: 0px;
    }
    100%{
        height: 119px;
    }
    }
`

const WriteSlideUp = keyframes
    `
    0%{
        height: 119px;
    }
    100%{
        height: 0px;
    }
`

const ProfileListBox = styled.div
    `
    display: ${props => props.default ? props.logout ? "none" : "block" : "none"};
    width: 217px;
    margin: 59px 0px 0px 158.5px;
    border: solid 2px #3c3c3c;
    background: white;  
    height: ${props => props.show ? "370px" : "0px"};
    border-radius: 10px;
    position: absolute;
    animation: ${props => props.show ? ProFileSlideDown : ProFileSlideUp} 0.25s;
    overflow: hidden;
    z-index: ${props => props.zindex ? 2 : 1};
`

const LanguageListBox = styled(ProfileListBox)
    `
    display: ${props => props.default ? "block" : "none"};
    width: 217px;
    margin: ${props => props.margin ? "59px 0px 0px -21.4px" : "59px 0px 0px -74px"};
    height: ${props => props.show ? "370px" : "0px"};
    z-index: ${props => props.zindex ? 2 : 1};
`

const FastListBox = styled(ProfileListBox)
    `
    display: ${props => props.default ? "block" : "none"};
    width: 310px;
    margin: 59px 0px 0px 6px;
    height: ${props => props.show ? "370px" : "0px"};
    z-index: ${props => props.zindex ? 2 : 1};
`

const WriteListBox = styled(ProfileListBox)
    `
    display: ${props => props.default ? "block" : "none"};
    width: 217px;
    margin: 59px 0px 0px 244.9px;
    height: ${props => props.show ? "369px" : "0px"};
    z-index: ${props => props.zindex ? 2 : 1};
`

const ProfileUl = styled.ul
    `
    margin: 0px;
    padding: 0px;
    color: black;
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
    border-radius: 5px;
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
        width: calc(100% - -1px);
        height: 1px;
        transform: translateX(-50%);
        background: black;
        margin: 44px 0px 0px -1px;
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