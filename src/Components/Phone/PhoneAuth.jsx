import { useState, useEffect, useRef } from "react";
import { RiErrorWarningFill } from "react-icons/ri";
import { styled } from 'styled-components';
import { LoginTopLOGO, InputBox } from "../Login/Logininput"
import { Title, ErrorMessageBox, ErrorMessageIcon, ErrorMessageText, ErrorMessage } from "../Sign/Signinput"
import { IntroduceBox, IntroduceText, SelectSignBox } from "./SelectSignInput"
import { isDark } from '../Darkmode/Darkmode';
import { work } from './PhoneAuthMode';
import { useRecoilValue } from 'recoil';
import { Link, useNavigate, useParams } from "react-router-dom";
import { EmPwInformation, SumbitButton } from "../EmailPwFound/EmailPwFound"
import axios from "axios";
import { useDispatch } from "react-redux";

const Phone = () =>
{
    const isDarkmode = useRecoilValue(isDark);
    const authMode=useRecoilValue(work);
    const [ Phone, setPhone ] = useState("");
    const [ PhoneAuth, setPhoneAuth ] = useState("");
    const [ isPhone, setIsPhone] = useState(false);
    const [ isPhoneAuth, setIsPhoneAuth] = useState(false);
    const [ isPhoneCheck, setIsPhoneCheck ] = useState(false);
    const [ isPhoneAuthCheck, setIsPhoneAuthCheck ] = useState(false);
    const [ isPhoneBtnCheck, setIsPhoneBtnCheck] = useState(false);
    const [ isPhoneAuthBtnCheck, setIsPhoneAuthBtnCheck] = useState(false);
    const [ PhoneMessage, setPhoneMessage ] = useState("");
    const [ PhoneAuthMessage, setPhoneAuthMessage ] = useState("");
    const [ isVisibled, setIsVisibled ] = useState(false);
    const ip=localStorage.getItem("ip");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const inputRef = useRef();
    const token=useRef("");
    const realPhone=useRef("");

    useEffect(() => { 
        inputRef.current.focus();
     },[]);
    
    const OnPhoneChange = (e) =>
    {
        const currentPhone = e.target.value;
        const onlyNumber = currentPhone.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '');
        setPhone(onlyNumber);

        if(currentPhone === "")
        {
            setIsPhoneBtnCheck(false);
            setIsPhoneCheck(false);
        }
        else
        {
            const Check = /[0-9.]{10,12}$/;

            if(!Check.test(currentPhone))
            {
                setIsPhoneBtnCheck(false);
                setIsPhone(false);
                setPhoneMessage(<MessaageAllBox><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>올바른 휴대폰 번호을 입력해주세요!</ErrorMessageText></MessaageAllBox>);
            }
            else
            {
                setIsPhoneBtnCheck(true);
            }
        }
    }

    const OnPhoneAuthChange = (e) =>
    {
        const currentPhoneAuth = e.target.value;
        setPhoneAuth(currentPhoneAuth);

        if(currentPhoneAuth === "")
        {
            setIsPhoneAuthBtnCheck(false);
            setIsPhoneAuthCheck(false);
        }
        else
        {
            setIsPhoneAuthBtnCheck(true);
        }
    }

    const PhoneData = (e) =>
    {
        e.preventDefault();
    }

    const PhoneCheck = () =>
    {
        const Check = /[0-9.]{10,12}$/;
        if(!Check.test(Phone))
        {
            setIsPhone(false);
            setIsPhoneCheck(true);
            setPhoneMessage(<MessaageAllBox><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>올바른 휴대폰 번호을 입력해주세요!</ErrorMessageText></MessaageAllBox>);
        }
        else
        {   
            axios.post(`${ip}/Users/authkey/phone/`,{
                phoneNum:Phone
            })
            .then(res=>{
                return res.data;
            })
            .then(data=>{
                token.current=data;
                console.log(token.current);
                console.log(data);
                realPhone.current=Phone;
                console.log(realPhone.current);
                setIsPhoneCheck(true);
                setPhoneMessage(<MessaageAllBox><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>인증번호가 전송 되었습니다!</ErrorMessageText></MessaageAllBox>);
                setIsVisibled(true);
                setIsPhone(true);
            })
            setIsPhoneCheck(false);
            setPhoneMessage(<MessaageAllBox><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>인증번호 전송 중...</ErrorMessageText></MessaageAllBox>);
            setIsVisibled(false);
            setIsPhone(false);
        }
    }

    

    const PhoneAuthCheck = () =>
    {   
        token.current="Bearer " + token.current
        console.log(token.current);
    
        axios.post(`${ip}/Users/check/phonekey/`,
        {
            phoneNum:realPhone.current,
            authNum:PhoneAuth
        },
        {
            headers:
            {
                Authorization: token.current,
            },
        })
        .then(res=>{
            return res.data;
        })
        .then(data=>{
            if(data=="no"){
                token.current=token.current.substring(7);
                console.log(token.current);
                setIsPhoneAuthCheck(true);
                setPhoneAuthMessage(<MessaageAllBox><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>인증번호가 일치 하지 않습니다.</ErrorMessageText></MessaageAllBox>);
                setIsPhoneAuth(false);
            }
            else{
                token.current=data;
                console.log(token.current);
                setIsPhoneAuth(true);
                setIsPhoneAuthCheck(true);
                setPhoneAuthMessage(<MessaageAllBox><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>인증번호가 일치 합니다!</ErrorMessageText></MessaageAllBox>);
            }
        })
    }

    const deletePhoneNum= ()=>{
        token.current="Bearer " + token.current;
        axios.delete(`${ip}/Users/phone/`,{
            headers:
            {
                Authorization: token.current,
            },
            data:{
                phoneNum:realPhone.current
            }
        })
        .then(res=>{
            return res.data;
        })
        .then(data=>{
            if(data!="fail"){
                token.current=data;
                if(authMode==='register'){
                    
                    navigate("/Sign",{state:{token:token.current}});
                }
                else if(authMode==='find'){
                    navigate("/EmailPwFound",{state:{token:token.current}});
                }
                    
            }
            else{
                token.current=token.current.substring(7);
            }
        })
    }

    return(
        <PhoneBox>
            <Link to='/'><LoginTopLOGO src={ isDarkmode ? 'img/8bit_Dark.png' : 'img/8bit.png' } alt='로고'/></Link>
            <IntroduceBox>
                <MainText as={"h1"}>서비스 이용을 위해 본인 확인이 필요합니다!</MainText>
                <IntroduceText>만 18세 미만인 경우 보호자 동의가 필요합니다.</IntroduceText>
            </IntroduceBox>
            <PhoneInformation>
                <PhoneInformationText>휴대폰 인증</PhoneInformationText>
            </PhoneInformation>
            <PhoneForm onSubmit={PhoneData}>
                <PhoneInputBox>
                    <PhoneTitle>휴대폰</PhoneTitle>
                    <PhoneInputAllBox>
                        <PhoneInput ref={inputRef} maxlength="12" show={isPhone} check={isPhoneCheck} value={Phone} onChange={OnPhoneChange}/>
                        <PhoneSendBtn type="button" onClick={PhoneCheck} show={isPhoneBtnCheck}><span>{isVisibled ? "재전송" : "전송"}</span></PhoneSendBtn>
                    </PhoneInputAllBox>
                    <MessageBox show={isPhoneCheck} color={isPhone}>{PhoneMessage}</MessageBox>
                </PhoneInputBox>
                <PhoneAuthBox show={isVisibled}>
                    <PhoneTitle>인증번호</PhoneTitle>
                    <PhoneInputAllBox>
                        <PhoneInput value={PhoneAuth} show={isPhoneAuth} check={isPhoneAuthCheck} onChange={OnPhoneAuthChange}/>
                        <PhoneSendBtn type="button" show={isPhoneAuthBtnCheck} onClick={PhoneAuthCheck}><span>인증확인</span></PhoneSendBtn>
                    </PhoneInputAllBox>
                    <MessageBox show={isPhoneAuthCheck} color={isPhoneAuth}>{PhoneAuthMessage}</MessageBox>
                </PhoneAuthBox>
                <SubmitBox>
                    <SubmitBtn disabled={!(isPhone && isPhoneAuth)} onClick={deletePhoneNum}><span>완료</span></SubmitBtn>
                </SubmitBox>
            </PhoneForm>
        </PhoneBox>
    );
}

export default Phone;

const PhoneBox = styled(SelectSignBox)
`p

`

const MessageBox = styled(ErrorMessage)
`
    display: ${props => props.show ? "block" : "none"};
    color: ${props => props.color ? props.theme.successColor : props.theme.errorColor};
`

const MessaageAllBox = styled(ErrorMessageBox)
`
    margin: -18px 5px 6px;
`

const PhoneForm = styled.form
`

`

const SubmitBox = styled.div
`
`

const SubmitBtn = styled(SumbitButton)
`
    width: 460px;
    margin: 13px 0px 0px 0px;
`

const PhoneInputAllBox = styled.div
`
    display: flex;
    margin: 20px 0px 20px 0px;
`

const PhoneTitle = styled(Title)
`

`

const PhoneInputBox = styled.div
`
    display: flex;
    flex-direction: column;
    width: 460px;
    margin: 50px 0px 0px 0px;
`

const PhoneAuthBox = styled(PhoneInputBox)
`
    display: ${props => props.show ? "block" : "none"};
    margin: 20px 0px 0px 0px;
`

const PhoneInput = styled(InputBox)
`
    box-shadow: ${props => props.check ? props.show ? `0 0 0 2px ${props.theme.successColor} inset` : `0 0 0 2px ${props.theme.errorColor} inset` : "none"};
    width: 335px;

    &:focus
    {
        box-shadow: ${props => props.check ? props.show ? `0 0 0 2px ${props.theme.successColor} inset` : `0 0 0 2px ${props.theme.errorColor} inset` : `0 0 0 2px ${props.theme.borderColor} inset`};
    }
`

const PhoneSendBtn = styled.button 
`
    width: 100px;
    height: 60px;
    border: none;
    background: ${(props) => props.show ? props.theme.buttonColor : "#aaaaaa"};
    color: white;
    border-radius: 0.4rem;
    font-size: 15px;
    cursor: pointer;
    margin: 0px 0px 0px 10px;
    pointer-events: ${(props) => props.show ? "true" : "none"};
    &:active
    {
        opacity: 90%;
    }

    &:disabled
    {
      padding: 16px;
      box-shadow: 0 0 0 1px #dddddd inset;
      background: #aaaaaa;
      pointer-events: none;
    }
`

const PhoneInformation = styled(EmPwInformation)
`
    width: 100px;
`

const PhoneInformationText = styled.span
`
    font-weight: bold;
    color: ${(props) => props.theme.textColor};
`

const MainText = styled(IntroduceText)
`
    font-size: 25px;
    opacity: 100%;
    white-space: nowrap;
`