import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { EmailPwFoundList, LoginTopLOGO, APIListA, Line } from "../Login/Logininput";
import { isDark } from '../Darkmode/Darkmode';
import { useRecoilState, useRecoilValue } from 'recoil';
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { SiNaver } from "react-icons/si";
import { AiOutlineTwitter } from "react-icons/ai";
import { work } from '../Phone/PhoneAuthMode';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { BsGithub } from 'react-icons/bs';

import LogoLight from "../../img/LOGO/8bitLight.png";
import LogoDark from "../../img/LOGO/8bitDark.png";


const SelectSign = () => 
{
    const isDarkmode = useRecoilValue(isDark);
    const [authMode, setAuthMode]=useRecoilState(work);
    
    useEffect(() => {
        setAuthMode('register');
    },[]);

    return(
        <SelectSignBox>
            <LogoBox>
                <Link to='/'><LoginTopLOGO src={ isDarkmode ? LogoDark : LogoLight } alt='로고'/></Link>
            </LogoBox>
            <IntroduceBox>
                <MainText as="h1">8bit 가입을 시작합니다!</MainText>
                <IntroduceText>회원가입을 위해 가입 방식을 선택하세요!</IntroduceText>
            </IntroduceBox>
            <EmailBtnBox>
                <Link to='/PhoneAuth'>
                    <EmailButton><EmailButtonText>이메일로 가입</EmailButtonText></EmailButton>
                </Link>
            </EmailBtnBox>
            <LOGINAPI>
            <Line><span>또는</span></Line>
            <APIList>
                <APIListLI>< APIListA border={"rgba(0,0,0,.15)"} background={"white"} API="#"><FcGoogle /></ APIListA></APIListLI>
                <APIListLI>< APIListA border={"#00c60c"} background={"#00c60c"} API="#"><SiNaver /></APIListA></APIListLI>
                <APIListLI>< APIListA border={"#edf511"} background={"#edf511"} API="#"><RiKakaoTalkFill style={{color:"black"}}/><SiNaver /></ APIListA></APIListLI>
                <APIListLI>< APIListA border={"#0d0c0c"} background={"#0d0c0c"} API="#"><BsGithub /></ APIListA></APIListLI>
            </APIList>
            </LOGINAPI>
        </SelectSignBox>
    );
}

export default SelectSign;

const LogoBox = styled.div
`
    display: flex;
    justify-content: center;
`

const EmailBtnBox = styled.div
`
    display: flex;
    flex-direction: column;
`

const SelectSignBox = styled.div
`
    display: flex;
    flex-direction: column;
    a
    {
        text-decoration: none;
    }
`

const IntroduceBox = styled.div
`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${(props) => props.theme.textColor};
    margin: 0px 0px 32px 0px;
`

const APIListLI = styled.li
`
`

const LOGINAPI = styled.div
`
    width: 100%;
`

const EmailButton = styled.div
`
    max-width: 416px;
    border: solid 2px ${(props) => props.theme.borderColor};
    display: flex;
    justify-content: center;
    color: ${(props) => props.theme.textColor};
    cursor: pointer;
    padding: 20px;
    border-radius: 10px;
    margin: 0px 0px 32px 0px;
    -webkit-tap-highlight-color: transparent;
    &:active
    {
        opacity: 50%;
    }
`

const EmailButtonText = styled.span
`
    font-weight: bold;
`

const APIList = styled(EmailPwFoundList)
`
    margin:40px 0px 40px 0px;
`


export const IntroduceText = styled.span
`
    font-size: 20px;
    opacity: 50%;
`

const MainText = styled(IntroduceText)
`
    font-size: 25px;
    opacity: 100%;
`
