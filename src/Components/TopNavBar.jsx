import { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import {HiOutlineSearch} from "react-icons/hi";
import {AiOutlineMenu} from "react-icons/ai";
import {MdLanguage} from "react-icons/md";
import {FaRegUserCircle} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "./LoginUser";
import {MdOutlineDeveloperMode} from "react-icons/md";
import {AiTwotoneShop} from "react-icons/ai";
import {GrLogout} from "react-icons/gr";
import {AiOutlineUserSwitch} from "react-icons/ai";


const HeaderBox = () =>
{
    const [Search, setSearch] = useState("");
    const [ProfileMenuShow, setProfileMenuShow] = useState(false);
    const [ProfileClickCheck, setProfileClickCheck] = useState(false);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();


    let ALLRef = useRef(null);
  
    useEffect(() => {
      function handleOuside(e) {
        if (ALLRef.current && !ALLRef.current.contains(e.target)) {
            setProfileMenuShow(false);
            setProfileClickCheck(false);
        }
      };

      if(!ProfileMenuShow) {
      document.addEventListener("mousedown", handleOuside);
      }
      return () => {
        document.removeEventListener("mousedown", handleOuside);
      };
    }, [ALLRef])

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
    }

    return (
        <Topnav>
        <NavBox>
        <LogoBox>
            <Link to='/'><Logo src='img/8bit.png' alt='로고'/></Link>
        </LogoBox>
            <NavUl>
                <NavLi><Link to='/'>게임</Link></NavLi>
                <NavLi><Link to='/'>쇼핑</Link></NavLi>
                <NavLi><Link to='/'>커뮤니티</Link></NavLi>
                <NavLi><Link to='/'>서포트</Link></NavLi>
            </NavUl>
        </NavBox>
        <AllButtonBox>
            <SearchInputBox>
                <SearchInput value={Search} onChange={OnSearch}/>
                <SearchInputIconBox>
                <SearchButton><HiOutlineSearch/></SearchButton>
                </SearchInputIconBox>
            </SearchInputBox>
        <ButtonBox ref={ALLRef}>
            <MenuBox left={"9px"} size={"25px"} padding={"6px 0px 0px 0px"}><MdLanguage/></MenuBox>
            <MenuBox left={"9px"} size={"25px"} padding={"6px 0px 0px 0px"}><AiOutlineMenu/></MenuBox>
            <>
            {user.data !== "" ? <Profile click={ProfileClickCheck} onClick={() => [setProfileMenuShow(!ProfileMenuShow), setProfileClickCheck(!ProfileClickCheck)]}><Profieimg src="img/kakao.jpg"/></Profile> :
            [<MenuBox left={"9px"} size={"15px"} padding={"10px 0px 10px 0px"}><Link to='/Login'>로그인</Link></MenuBox>,
            <MenuBox left={"9px"} size={"15px"} padding={"10px 0px 10px 0px"}><Link to='/Sign'>회원가입</Link></MenuBox>]}
            </>
            <ProfileListBox show={ProfileMenuShow}>
                <ProfileUl>
                    <ProfileliNickNameBox><ProfileliBox><Link to=""><Profieimg src="img/kakao.jpg"/></Link></ProfileliBox><ProfileNickname> 운영자</ProfileNickname></ProfileliNickNameBox>
                    <Profileli padding="6px 0px 6px 20px" onClick={() => [setProfileMenuShow(!ProfileMenuShow), setProfileClickCheck(!ProfileClickCheck)]}><ProfileliIcon><FaRegUserCircle/></ProfileliIcon><Link to='/Sign'><ProfileliText left="10px">마이페이지</ProfileliText></Link></Profileli>
                    <Profileli padding="6px 0px 6px 20px" onClick={() => [setProfileMenuShow(!ProfileMenuShow), setProfileClickCheck(!ProfileClickCheck)]}><ProfileliIcon><MdOutlineDeveloperMode/></ProfileliIcon><Link to='/'><ProfileliText left="10px">개발자등록</ProfileliText></Link></Profileli>
                    <Profileli padding="6px 0px 6px 20px" onClick={() => [setProfileMenuShow(!ProfileMenuShow), setProfileClickCheck(!ProfileClickCheck)]}><ProfileliIcon><AiTwotoneShop/></ProfileliIcon><Link to='/'><ProfileliText left="10px">굿즈샵 입점</ProfileliText></Link></Profileli>
                    <Profileli padding="6px 0px 6px 20px" onClick={() => [setProfileMenuShow(!ProfileMenuShow), setProfileClickCheck(!ProfileClickCheck)]}><ProfileliIcon><AiOutlineUserSwitch/></ProfileliIcon><Link to='/'><ProfileliText left="10px">회원정보수정</ProfileliText></Link></Profileli>
                    <Profileli line="none" padding="6px 0px 6px 20px" onClick={LogoutFunc}><ProfileliIcon left="3px"><GrLogout/></ProfileliIcon><ProfileliText left="6px">로그아웃</ProfileliText></Profileli>
                </ProfileUl>
            </ProfileListBox>
        </ButtonBox>
        </AllButtonBox>
        </Topnav>
    );
}

const Topnav = styled.header
`
    background-color: #6767ff;
    padding: 0px 48px;
    height: 55px;
    display: flex;
    justify-content: space-between;
    a{
        text-decoration: none;
        color: white;
        font-weight: bold;
        &:hover
        {
            color: #55aaff;
        }
    }
`

const Logo = styled.img
`
    width: 132px;
    height: 42px;
`

const LogoBox = styled.div
`
`

const NavBox = styled.div
`
    display: flex;
    margin: 6px 0px 6px 0px;
`

const NavUl = styled.ul
`
    display: flex;
    margin: 12px 0px 12px 0px;
`

const NavLi = styled.li
`
    padding: 0px 20px 0px 20px;
    list-style: none;
    &
    {
        font-size: 15px;
    }
`

const SearchInput = styled.input
`
    border: none;
    outline: none;
    height: 20px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    padding: 0px 0.6rem;
    font-size: 13px;
    width: 150px;
    caret-color: #6767ff;
    background: #dee2e6;
`

const AllButtonBox = styled.div
`
    display: flex;
    align-items: center;
    justify-content: center;
}
`

const ButtonBox = styled.div
`
    display: flex;
    margin-right: 10px;
`

const MenuBox = styled.div
`
    color: white;
    font-size: ${props => props.size};
    margin-left: ${props => props.left};
    padding: ${props => props.padding};
    cursor: pointer;
    &:hover
    {
        color: #55aaff;
    }
`
const SearchInputBox = styled.div
`
    display: flex;
    border: solid 2px #55aaff;
    border-radius: 13px;
}
`

const SearchInputIconBox = styled.div
`
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    background: #dee2e6;
`

const SearchButton = styled.button
`
    border: none;
    background: transparent;
    padding: 3px 8px 0px 0px;
    cursor: pointer;
    &:hover
    {
        color: #55aaff;
    }
`

const Profile = styled.div
`
    width: 30px;
    height: 30px;
    border-radius: 20px;
    border: ${props => props.click ? "solid 2px #55aaff" : "none"};
    margin: 3px 0px 0px 10px;
    overflow: hidden;
    cursor: pointer;
    margin: ${props => props.click ? "1px 0px 0px 73px" : "3px 0px 0px 75px"};
    position: absolute;
    &:hover
    {
        border: solid 2px #55aaff;
        margin: 1px 0px 0px 73px;
    }
`

const Profieimg = styled.img
`
    width: 30px;
    height: 30px;
`

const slide = keyframes
`
    0%{
        height: 0px;
    }
    100%{
        height: 230px;
    }
`

const ProfileListBox = styled.div
`
    display: ${props => props.show ? "block" : "none"};
    width: 163px;
    border: solid 2px #6767ff;
    margin: 35px 0px 0px -59px;
    background: white;
    height: 230px;
    border-radius: 10px;
    position: absolute;
    animation: ${slide} 0.5s;
    overflow: hidden;
`

const ProfileUl = styled.ul
`
    margin: 0px;
    padding: 0px;
`

const Profileli = styled.li
`
    list-style: none;
    border-radius: 5px;
    cursor:pointer;
    padding: ${props => props.padding};
    font-weight: bold;
    display:flex;
    a{
        color: black;
        font-size: 15px;
        font-weight: bold;
        &:hover
        {
            color: black;
        }
    }
    &:hover
    {
        background-color: #55aaff;
    }
    &::after
    {
        content: '';
        clear: both;
        display: ${props => props.line};
        position: absolute;
        left: 50%;
        width: calc(100% - 48px);
        height: 1px;
        transform: translateX(-51%);
        background: black;
        margin: 24px 0px 0px -1px;
    }
`

const ProfileliBox = styled.div
`
        width: 30px;
        height: 30px;
        border-radius: 20px;
        border: solid 2px #55aaff;
        margin: 17px 0px 14px 16px;
        overflow: hidden;
        cursor: pointer;
        font-weight: bold;
`

const ProfileNickname = styled.span
`
        color: black;
        font-weight: bold;
        margin: 4px 0px 0px 23px;
`

const ProfileliText = styled.span
`
        margin-left: ${props => props.left};
`

const ProfileliIcon = styled.i
`
        margin-left: ${props => props.left};
`

const ProfileliNickNameBox = styled.div
`
        display: flex;
        align-items: center;
        font-weight: bold;
`

const TabMenu = styled.div
`
        position: absolute;
`
export default HeaderBox;