import { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";
import { CgMenuGridR } from "react-icons/cg";
import { MdLanguage } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../LoginRedux/LoginUser";
import { MdOutlineDeveloperMode } from "react-icons/md";
import { AiTwotoneShop } from "react-icons/ai";
import { GrLogout } from "react-icons/gr";
import { AiOutlineUserSwitch } from "react-icons/ai";


const HeaderBox = () =>
{
    const [ Search, setSearch ] = useState("");
    const [ ProfileMenuShow, setProfileMenuShow ] = useState(false);
    const [ ProfileClickCheck, setProfileClickCheck ] = useState(false);
    const [ isGameTabCheck, setIsGameTabCheck ] = useState(false);
    const [ isShopTabCheck, setIsShopTabCheck ] = useState(false);
    const [ isComunityTabCheck, setIsComunityTabCheck ] = useState(false);
    const [ isSupprotTabCheck, setIsSupprotTabCheck ] = useState(false);
    const [ isGameIconCheck, setIsGameIconCheck ] = useState(true);
    const [ isShopIconCheck, setIsShopIconCheck ] = useState(false);
    const [ isComunityIconCheck, setIsComunityIconCheck ] = useState(false);
    const [ isSupprotIconCheck, setIsSupprotIconCheck ] = useState(false);
    const [ isProfileLogoutCheck, setIsProfileLogoutCheck ] = useState(false);
    const [ isDefaultProfileScene, setIsDefaultProfileScene ] = useState(false);
    const [ isDefaultLanguageScene, setIsDefaultLanguageScene ] = useState(false);
    const [ isDefaultFastScene, setIsDefaultFastScene ] = useState(false);
    const [ isDefaultWriteScene, setDefaultWriteScene ] = useState(false);
    const [ LanguageMenuShow, setIsLanguageMenuShow ] = useState(false);
    const [ FastMenuShow, setIsFastMenuShow ] = useState(false);
    const [ WriteMenuShow, setIsWriteMenuShow ] = useState(false);
    const [ LanguageClickCheck, setLanguageClickCheck ] = useState(false);
    const [ FastClickCheck, setFastClickCheck ] = useState(false);
    const user = useSelector( (state) => state.user );
    const dispatch = useDispatch();

    let ProfileRef = useRef(null);
    let LanguageRef = useRef(null);
    let FastRef = useRef(null);
    let WriteRef = useRef(null);
  
    useEffect(() => {
      function handleOuside(e) {
        if (ProfileRef.current && !ProfileRef.current.contains(e.target)) {
            setProfileMenuShow(false);
            setProfileClickCheck(false);
        }
      };

      if(!ProfileMenuShow) {
        document.addEventListener("click", handleOuside);
      }
      return () => {
        document.removeEventListener("click", handleOuside);
      };
    }, [ProfileRef])

    useEffect(() => {
        function handleOuside(e) {
          if (LanguageRef.current && !LanguageRef.current.contains(e.target)) {
              setLanguageClickCheck(false);
              setIsLanguageMenuShow(false);
          }
        };
  
        if(!LanguageMenuShow) {
          document.addEventListener("click", handleOuside);
        }
        return () => {
          document.removeEventListener("click", handleOuside);
        };
      }, [LanguageRef])

      useEffect(() => {
        function handleOuside(e) {
          if (FastRef.current && !FastRef.current.contains(e.target)) {
              setFastClickCheck(false);
              setIsFastMenuShow(false);
          }
        };
  
        if(!FastMenuShow) {
          document.addEventListener("click", handleOuside);
        }
        return () => {
          document.removeEventListener("click", handleOuside);
        };
      }, [FastRef])

      useEffect(() => {
        function handleOuside(e) {
          if (WriteRef.current && !WriteRef.current.contains(e.target)) {
              setIsWriteMenuShow(false);
          }
        };
  
        if(!WriteMenuShow) {
          document.addEventListener("click", handleOuside);
        }
        return () => {
          document.removeEventListener("click", handleOuside);
        };
      }, [WriteRef])

    const OnSearch = (e) =>
    {
        const currentSearch = e.target.value;
        setSearch(currentSearch);
    }
    
    const LogoutFunc = () =>
    {
        dispatch(clearUser(user));
        setProfileMenuShow(false);
        setProfileClickCheck(false);
        setIsProfileLogoutCheck(true);
    }

    const GameliHover = () =>
    {
        setIsGameIconCheck(true);
        setIsShopIconCheck(false);
        setIsComunityIconCheck(false);
        setIsSupprotIconCheck(false);
        setIsShopTabCheck(false);
        setIsComunityTabCheck(false);
        setIsSupprotTabCheck(false);
        setIsGameTabCheck(false);
    }

    const ComunityliHover = () =>
    {
        setIsGameIconCheck(false);
        setIsShopIconCheck(false);
        setIsComunityIconCheck(true);
        setIsSupprotIconCheck(false);
        setIsShopTabCheck(false);
        setIsComunityTabCheck(true);
        setIsSupprotTabCheck(false);
        setIsGameTabCheck(true);
    }

    const ShopliHover = () =>
    {
        setIsGameIconCheck(false);
        setIsShopIconCheck(true);
        setIsComunityIconCheck(false);
        setIsSupprotIconCheck(false);
        setIsShopTabCheck(true);
        setIsComunityTabCheck(false);
        setIsSupprotTabCheck(false);
        setIsGameTabCheck(true);
    }

    const SupportliHover = () =>
    {
        setIsGameIconCheck(false);
        setIsShopIconCheck(false);
        setIsComunityIconCheck(false);
        setIsSupprotIconCheck(true);
        setIsShopTabCheck(false);
        setIsComunityTabCheck(false);
        setIsSupprotTabCheck(true);
        setIsGameTabCheck(true);
    }

    const ProfileMenuCheck = () =>
    {
        setIsProfileLogoutCheck(false);
        setProfileMenuShow(!ProfileMenuShow);
        setProfileClickCheck(!ProfileClickCheck);
        setIsDefaultProfileScene(true);
        setIsLanguageMenuShow(false);
        setLanguageClickCheck(false);
        setIsFastMenuShow(false);
        setFastClickCheck(false);
        setIsWriteMenuShow(false);
    }

    const LanguageMenuCheck = () =>
    {
        setIsLanguageMenuShow(!LanguageMenuShow);
        setLanguageClickCheck(!LanguageClickCheck);
        setIsDefaultLanguageScene(true);
        setProfileMenuShow(false);
        setProfileClickCheck(false);
        setIsFastMenuShow(false);
        setFastClickCheck(false);
        setIsWriteMenuShow(false);
    }

    const FastMenuCheck = () =>
    {
        setIsFastMenuShow(!FastMenuShow);
        setFastClickCheck(!FastClickCheck);
        setIsDefaultFastScene(true);
        setProfileMenuShow(false);
        setProfileClickCheck(false);
        setIsLanguageMenuShow(false);
        setLanguageClickCheck(false);
        setIsWriteMenuShow(false);
    }

    const WriteMenuCheck = () =>
    {
        setIsWriteMenuShow(!WriteMenuShow);
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
        <BackgroudTopNav>
        <Topnav>
        <NavBox>
        <LogoBox>
            <Link to='/'><Logo src='img/8bit.png' alt='로고'/></Link>
        </LogoBox>
            <NavUl>
                <GameLi active = {isGameIconCheck}><Link to='/' onMouseOver={GameliHover}>게임</Link></GameLi>
                <ShopLi active = {isShopIconCheck}><Link to='/' onMouseOver={ShopliHover}>쇼핑</Link></ShopLi>
                <ComunityLi active = {isComunityIconCheck}><Link to='/' onMouseOver={ComunityliHover}>커뮤니티</Link></ComunityLi>
                <SupportLi active = {isSupprotIconCheck}><Link to='/' onMouseOver={SupportliHover}>서포트</Link></SupportLi>
            </NavUl>
        </NavBox>
        <AllButtonBox>
            <SearchInputBox>
                <SearchInput value={Search} onChange={OnSearch}/>
                <SearchInputIconBox>
                <SearchButton><HiOutlineSearch/></SearchButton>
                </SearchInputIconBox>
            </SearchInputBox>
        <ButtonBox menucheck={user.data !== ""}>
            <MenuBox left={"20px"} top={"9px"} size={"29px"} ref={LanguageRef} padding={"6px 0px 0px 0px"} onClick={() => LanguageMenuCheck()}><MdLanguage/></MenuBox>
            <MenuBox left={"20px"} top={"9px"} size={"29px"} ref={FastRef} padding={"6px 0px 0px 0px"} onClick={() => FastMenuCheck()}><CgMenuGridR/></MenuBox>
            <>
            {user.data !== "" ? [<Profile click={ProfileClickCheck} ref={ProfileRef} onClick={() => ProfileMenuCheck()}><Profieimg src="img/Default.png"/></Profile>,
            <WriteBox onClick={WriteMenuCheck} ref={WriteRef}><WriteBoxText>글쓰기</WriteBoxText></WriteBox>] :
            [<LineBox left={"20px"} top={"12px"} size={"15px"} padding={"10px 0px 10px 0px"}><Link to='/Login'>로그인</Link></LineBox>,
            <MenuBox left={"9px"} top={"12px"} size={"15px"} padding={"10px 0px 10px 0px"}><Link to='/Sign'>회원가입</Link></MenuBox>]}
            </>
            <ProfileListBox default={isDefaultProfileScene} logout={isProfileLogoutCheck} show={ProfileMenuShow}>
                <ProfileUl>
                <Link to='/Sign'><Profileli padding="15px 0px 15px 13px" onClick={() => [setProfileMenuShow(!ProfileMenuShow), setProfileClickCheck(!ProfileClickCheck)]}><ProfileliIcon><FaRegUserCircle/></ProfileliIcon><ProfileliText  MediaLeft={"17px"}>마이페이지</ProfileliText></Profileli></Link>
                <Link to='/'><Profileli padding="15px 0px 15px 13px" onClick={() => [setProfileMenuShow(!ProfileMenuShow), setProfileClickCheck(!ProfileClickCheck)]}><ProfileliIcon><MdOutlineDeveloperMode/></ProfileliIcon><ProfileliText  MediaLeft={"17px"}>개발자등록</ProfileliText></Profileli></Link>
                <Link to='/'><Profileli padding="15px 0px 15px 13px" onClick={() => [setProfileMenuShow(!ProfileMenuShow), setProfileClickCheck(!ProfileClickCheck)]}><ProfileliIcon><AiTwotoneShop/></ProfileliIcon><ProfileliText  MediaLeft={"17px"}>굿즈샵 입점</ProfileliText></Profileli></Link>
                <Link to='/'><Profileli padding="15px 0px 15px 13px" onClick={() => [setProfileMenuShow(!ProfileMenuShow), setProfileClickCheck(!ProfileClickCheck)]}><ProfileliIcon><AiOutlineUserSwitch/></ProfileliIcon><ProfileliText  MediaLeft={"17px"}>회원정보수정</ProfileliText></Profileli></Link>
                    <Profileli line="none" padding="15px 0px 15px 13px" onClick={LogoutFunc}><ProfileliIcon left="3px"><GrLogout/></ProfileliIcon><ProfileliText MediaLeft={"13px"}>로그아웃</ProfileliText></Profileli>
                </ProfileUl>
            </ProfileListBox>
            <LanguageListBox default={isDefaultLanguageScene} show={LanguageMenuShow}>
                <ProfileUl>
                <Link to='/Sign'><Profileli padding="15px 0px 15px 13px" onClick={() => [setIsLanguageMenuShow(!LanguageMenuShow), setLanguageClickCheck(!LanguageClickCheck)]}><ProfileliIcon><FaRegUserCircle/></ProfileliIcon><ProfileliText  MediaLeft={"17px"}>Korean</ProfileliText></Profileli></Link>
                <Link to='/'><Profileli padding="15px 0px 15px 13px" onClick={() => [setIsLanguageMenuShow(!LanguageMenuShow), setLanguageClickCheck(!LanguageClickCheck)]}><ProfileliIcon><MdOutlineDeveloperMode/></ProfileliIcon><ProfileliText  MediaLeft={"17px"}>English</ProfileliText></Profileli></Link>
                </ProfileUl>
            </LanguageListBox>
            <FastListBox default={isDefaultFastScene} show={FastMenuShow}>
                <ProfileUl>
                <Link to='/Sign'><Profileli padding="15px 0px 15px 13px" onClick={() => [setIsFastMenuShow(!FastMenuShow), setFastClickCheck(!FastClickCheck)]}><ProfileliIcon><FaRegUserCircle/></ProfileliIcon><ProfileliText  MediaLeft={"17px"}>미정</ProfileliText></Profileli></Link>
                <Link to='/'><Profileli padding="15px 0px 15px 13px" onClick={() => [setIsFastMenuShow(!FastMenuShow), setFastClickCheck(!FastClickCheck)]}><ProfileliIcon><MdOutlineDeveloperMode/></ProfileliIcon><ProfileliText  MediaLeft={"17px"}>미정</ProfileliText></Profileli></Link>
                <Link to='/'><Profileli padding="15px 0px 15px 13px" onClick={() => [setIsFastMenuShow(!FastMenuShow), setFastClickCheck(!FastClickCheck)]}><ProfileliIcon><AiTwotoneShop/></ProfileliIcon><ProfileliText  MediaLeft={"17px"}>미정</ProfileliText></Profileli></Link>
                <Link to='/'><Profileli padding="15px 0px 15px 13px" onClick={() => [setIsFastMenuShow(!FastMenuShow), setFastClickCheck(!FastClickCheck)]}><ProfileliIcon><AiOutlineUserSwitch/></ProfileliIcon><ProfileliText  MediaLeft={"17px"}>미정</ProfileliText></Profileli></Link>
                </ProfileUl>
            </FastListBox>
            <WriteListBox default={isDefaultWriteScene} show={WriteMenuShow}>
                <ProfileUl>
                <Link to='/Sign'><Profileli padding="15px 0px 15px 13px" onClick={() => setIsWriteMenuShow(!WriteMenuShow)}><ProfileliIcon><FaRegUserCircle/></ProfileliIcon><ProfileliText  MediaLeft={"17px"}>미정</ProfileliText></Profileli></Link>
                <Link to='/'><Profileli padding="15px 0px 15px 13px" onClick={() => setIsWriteMenuShow(!WriteMenuShow)}><ProfileliIcon><MdOutlineDeveloperMode/></ProfileliIcon><ProfileliText  MediaLeft={"17px"}>미정</ProfileliText></Profileli></Link>
                <Link to='/'><Profileli padding="15px 0px 15px 13px" onClick={() => setIsWriteMenuShow(!WriteMenuShow)}><ProfileliIcon><AiTwotoneShop/></ProfileliIcon><ProfileliText  MediaLeft={"17px"}>미정</ProfileliText></Profileli></Link>
                <Link to='/'><Profileli padding="15px 0px 15px 13px" onClick={() => setIsWriteMenuShow(!WriteMenuShow)}><ProfileliIcon><AiOutlineUserSwitch/></ProfileliIcon><ProfileliText  MediaLeft={"17px"}>미정</ProfileliText></Profileli></Link>
                </ProfileUl>
            </WriteListBox>
        </ButtonBox>
        </AllButtonBox>
        </Topnav>
        </BackgroudTopNav>
        <BackgroudSubNav>
        <SubNavMenu>
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
                <Link to='/'><SubNavText>자유게시판</SubNavText></Link>
            </ComunitySubNav>
            <SupportSubNav display={isSupprotTabCheck}>
                <Link to='/'><SubNavText>이용문의</SubNavText></Link>
                <Link to='/'><SubNavText>회사정보</SubNavText></Link>
            </SupportSubNav>
        </SubNavMenu>
        </BackgroudSubNav>
        </ALLNavBox>
    );
}

const WriteBox = styled.div
`
    margin: -1px 0px 0px 183px;
    position: absolute;
    border: solid 2px white;
    padding: 15px;
    border-radius: 11px;
    background: #6a9dda;
    font-size: 21px;
    cursor: pointer;
    &:hover
    {
        background: #2773cf;
    }
`

const WriteBoxText = styled.span
`
    @media (min-width:250px) and (max-width:480px)
    {
        white-space: nowrap;
    }
`
const BackgroudTopNav = styled.div
`
    background-color: #3c3c3c;

    @media (min-width:250px) and (max-width:480px)
    {
        width: 480px;
        height: 244px;
    }
`

const BackgroudSubNav = styled.div
`
    border-bottom: solid 3px #3c3c3c;

    @media (min-width:250px) and (max-width:480px)
    {
        width: 480px;
    }
`

const ALLNavBox = styled.div
`
    font-size: 25px;
`

const GameSubNav = styled.div
`
    display: ${props => props.display ? "none" : "block"};
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
`

const ShopSubNav = styled(GameSubNav)
`
    display: ${props => props.display ? "block" : "none"};
    &:hover
    {
        color: #6a9dda;
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

    @media (min-width:250px) and (max-width:480px)
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
`

const SubNavText = styled.span
`
    padding: 0px 10px 0px 10px;
`

const GameLi = styled.li
`
    padding: 0px 20px 0px 20px;
    list-style: none;
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
    display: flex;
    margin: auto;
    max-width: 1500px;
    align-items: center;
    background: white;
    @media (min-width:250px) and (max-width:480px)
    {
        font-size: 21px;
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

    @media (min-width:250px) and (max-width:480px)
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

    @media (min-width:250px) and (max-width:480px)
    {
        flex-direction: column;
        margin: 12px 0px 0px 0px;
        text-align: center;
    }
`

const NavUl = styled.ul
`
    display: flex;
    margin: 12px 0px 12px 0px;

    @media (min-width:250px) and (max-width:480px)
    {
        margin: 12px 0px 12px -63px;
        white-space: nowrap;
    }
`

const SearchInput = styled.input
`
    border: none;
    outline: none;
    height: 20px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    padding: 0px 0.6rem;
    font-size: 20px;
    width: 200px;
    height: 40px;
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

    @media (min-width:250px) and (max-width:480px)
    {
        flex-direction: column;
    }
`

const ButtonBox = styled.div
`
    display: flex;
    margin-right: ${props => props.menucheck ? "265px" : "72px"};

    @media (min-width:250px) and (max-width:480px)
    {
        margin-left: ${props => props.menucheck ? "-61px" : "0px"};
        margin-top: ${props => props.menucheck ? "5px" : "0px"};
        margin-right: ${props => props.menucheck ? "155px" : "28px"};
    }
`

const MenuBox = styled.div
`
    color: white;
    font-size: ${props => props.size};
    margin-left: ${props => props.left};
    margin-top: ${props => props.top};
    padding: ${props => props.padding};
    cursor: pointer;
    white-space: nowrap;
    a
    {
        font-size:20px;
        font-weight: lighter;
        color: white;
        -webkit-tap-highlight-color:transparent;
    }
    &:hover
    {
        color: #6a9dda;
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
        margin: 1px 7px -3px 15px;
    }
`
const SearchInputBox = styled.div
`
    display: flex;
    border: solid 3px #3c3c3c;
    border-radius: 24px;
}
`

const SearchInputIconBox = styled.div
`
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    background: #dee2e6;
`

const SearchButton = styled.button
`
    border: none;
    background: transparent;
    padding: 3px 8px 0px 0px;
    cursor: pointer;
    font-size: 29px;
    &:hover
    {
        color: #6a9dda;
    }
`

const Profile = styled.div
`
    width: 40px;
    height: 40px;
    border-radius: 26px;
    border: ${props => props.click ? "solid 2px #3c3c3c" : "none"};
    overflow: hidden;
    cursor: pointer;
    margin: ${props => props.click ? "7px 0px 0px 120px" : "9px 0px 0px 122px"};
    position: absolute;
    &:hover
    {
        border: solid 2px #6a9dda;
        margin: 7px 0px 0px 120px;
    }
`

const Profieimg = styled.img
`
    width: 40px;
    height: 40px;
`

const ProFileSlideDown = keyframes
`
    0%{
        height: 0px;
    }
    100%{
        height: 300px;
    }
    }
`

const ProFileSlideUp = keyframes
`
    0%{
        height: 300px;
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
    margin: 59px 0px 0px 53px;
    border: solid 2px #3c3c3c;
    background: white;
    height: ${props => props.show ? "300px" : "0px"};
    border-radius: 10px;
    position: absolute;
    animation: ${props => props.show ? ProFileSlideDown : ProFileSlideUp } 0.5s;
    overflow: hidden;
    z-index: 1;
`

const LanguageListBox = styled(ProfileListBox)
`
    display: ${props => props.default ? "block" : "none"};
    width: 160px;
    margin: 57px 0px 0px -21px;
    height: ${props => props.show ? "119px" : "0px"};
    animation: ${props => props.show ? LanguageSlideDown : LanguageSlideUp } 0.5s;
    z-index: 1;
`

const WriteListBox = styled(ProfileListBox)
`
    display: ${props => props.default ? "block" : "none"};
    width: 160px;
    margin: 57px 0px 0px 184px;
    height: ${props => props.show ? "119px" : "0px"};
    animation: ${props => props.show ? WriteSlideDown : WriteSlideUp } 0.5s;
    z-index: 1;
`

const FastListBox = styled.div
`
    display: ${props => props.show ? "block" : "none"};
    position: absolute;
    z-index: 1;
    background: white;
    border: solid 2px #3c3c3c;
    margin: 59px 0px 0px 54px;
    width: 335px;
    z-index: 1;
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
        margin-top: ${props => props.MediaTop};
        font-size: 25px;
`

const ProfileliIcon = styled.i
`
        margin-left: ${props => props.left};
`
export default HeaderBox;