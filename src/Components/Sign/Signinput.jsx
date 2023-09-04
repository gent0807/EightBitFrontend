import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import {RiErrorWarningFill} from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { styled, keyframes } from 'styled-components';
import { isDark } from '../Darkmode/Darkmode';
import { useRecoilValue } from 'recoil';
import { ScrollTop } from '../Header/TopNavBar'


const Signinput = (props) => 
{
  const [Email, setEmail] = useState("");
  const [EmailCert, setEmailCert] = useState("");
  const [Pw, setPw] = useState("");
  const [PwConfirm, setPwConfirm] = useState("");
  const [Nickname, setNickname] = useState("");
  const [SelectValue, setSelectValue] = useState("naver.com");
  const [InputDirect, setInputDirect] = useState("naver.com");

  const [PwMessage, setPwMessage] = useState("");
  const [EmailMessage, setEmailMessage] = useState("");
  const [PwConfirmMessage, setPwConfirmMessage] = useState("");
  const [NicknameMessage, setNicknameMessage] = useState("");
  const [EmailCertCheckMessage, setEmailCertCheckMessage] = useState("");

  const [isPw, setIsPw] = useState(false);
  const [isPwConfirm, setIsPwConfirm] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isNickname, setIsNickname] = useState(false);
  const [isEmailCertCheck, setIsEmailCertCheck] = useState(false);
  const [isEmailCertCheckBtn, setIsEmailCertCheckBtn] = useState(true);
  const [isInputCheck, setIsInputCheck] = useState(true);
  const [isConfirmCheck, setIsConfirmCheck] = useState(false);
  const [isSelectBtnCheck, setIsSelectBtnCheck] = useState(true);
  const [isInputDirect, setIsInputDirect] = useState(false);
  const [isInputPwCheck, setIsInputPwCheck] = useState(false);
  const [isInputPwConfirmCheck, setIsInputPwConfirmCheck] = useState(false);
  const [isInputNicknameCheck, setIsInputNicknameCheck] = useState(false);

  const [isVisibled, setVisibled] = useState(false);
  const isDarkmode = useRecoilValue(isDark);
  const ip=localStorage.getItem("ip");

  const navigate = useNavigate();
  const location=useLocation();

  const certEmail=useRef(null);
  const compareMode=useRef(false);
  const password=useRef("");
  const passwordPossibleCombCheck=useRef(false);
  const nickNamePossible=useRef(false);
  const finalEmail=useRef("");
  const authNum=useRef(null);
  const token=useRef(location.state.token);
  const inputFocus = useRef(null);
  const textRef = useRef(null);
  const inputRef = useRef();
  

  useEffect(()=>{
    console.log(props);
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    function handleOuside(e) {
      if (textRef.current && !textRef.current.contains(e.target)) {
          setIsSelectBtnCheck(true);
      };
    };

    if(isSelectBtnCheck) {
      document.addEventListener("mousedown", handleOuside);
      };
      return () => {
        document.removeEventListener("mousedown", handleOuside);
      };
  }, [textRef]);

  const setEmailDomain = (e) =>
  {
      const { innerText }  = e.target;
      console.log(innerText);
      setSelectValue(innerText);
      setInputDirect(innerText);
      setIsInputDirect(false);
  }

  const readyToWirteInputDirect = () =>
  {
    setInputDirect("");
    setIsInputDirect(true);
    return inputFocus.current.focus();
  }

  const checkAndSetInputDirect = (e) =>
  {
    const InputDirect = e.target.value;
    const onlytext = InputDirect.replace(/[~!@#$%^&*()_+|<>?:{}]/g, '');
    setInputDirect(onlytext);
    setSelectValue(InputDirect);
  }

  const checkAuthNumberRight = () =>
  {
    setIsInputCheck(false)

    token.current="Bearer " + token.current
    
    axios.post(`${ip}/Users/check/authkey/`,
      {
        email:certEmail.current,
        authNum:EmailCert
      },
      {
        headers:
        {
          Authorization:token.current,
        },
      })
      .then(res=>{
        return res.data;
      })
      .then(data=>{
         console.log(data);
         if(data=="no"){
            token.current=token.current.substring(7);
            setIsEmailCertCheck(false);
            setIsEmailCertCheckBtn(false);
            setIsConfirmCheck(false);
            setEmailCertCheckMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>인증번호가 일치하지 않습니다.</ErrorMessageText></ErrorMessageBox>]);
         }
         else{
            token.current=data;
            console.log(token.current);
            setIsEmailCertCheck(true);
            setIsEmailCertCheckBtn(true);
            setIsConfirmCheck(true);
            setEmailCertCheckMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>인증번호가 일치합니다.</ErrorMessageText></ErrorMessageBox>]);
            setIsEmail(false);
         }

      })
    
  }


  const checkEmail = (e) => {
    const currentEmail = e.target.value;
    const onlytext = currentEmail.replace(/[~!@#$%^&*()_+|<>?:{}]/g, '');
    setEmail(onlytext);

    const Check = /^([0-9a-zA-Z_\.-]+)/;
    if(!Check.test(currentEmail))
    {
      setIsEmail(false);
    }
    else
    {
      setIsEmail(true);
    }

  };

  const setAuthNumber = (e) => {
    const currentEmailCert = e.target.value;
    //const onlynumber = currentEmailCert.replace(/[^0-9]/g, '');
    setEmailCert(currentEmailCert);

    if(!EmailCert)
    {
      setIsEmailCertCheckBtn(false);
    }
  };

  const OnChangePw = (e) => {
    const currentPw = e.target.value;
    setPw(currentPw);
    const PwCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

    if(currentPw === "")
    {
      setIsInputPwCheck(false);
    }
    else
    {
      setIsInputPwCheck(true);
    }


    if (!PwCheck.test(currentPw))
    {
        setPwMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>숫자,영문자,특수문자 조합으로 8자리 이상 입력해주세요!</ErrorMessageText></ErrorMessageBox>]);
        setIsPw(false);
        passwordPossibleCombCheck.current=false;
    }else{
        setPwMessage("");    
        setIsPw(true); 
        passwordPossibleCombCheck.current=true;   
    }

    if(compareMode.current==true)
    {
      if(currentPw !== PwConfirm)
      {
        setPwConfirmMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>비밀번호가 일치하지 않습니다!</ErrorMessageText></ErrorMessageBox>]);
        setIsPwConfirm(false);
        if(PwConfirm=="")
        {
          setIsPw(true);
        }
        else if(PwConfirm!="")
        {
          setIsPw(false);
        }
      }
      else if(currentPw == PwConfirm)
      { 
        setPwConfirmMessage("");

        if(passwordPossibleCombCheck.current==false)
        {
          setIsPwConfirm(false);
          setIsPw(false);
        }

        else if(passwordPossibleCombCheck.current==true)
        {
          setIsPwConfirm(true);
          setIsPw(true);
        }

        
      }
    }
  };

  const OnChangePwConfirm = (e) => {
    const currentPwConfirm = e.target.value;
    setPwConfirm(currentPwConfirm);

    if(currentPwConfirm === "")
    {   
        compareMode.current=false;
        setIsInputPwConfirmCheck(false);
        if(passwordPossibleCombCheck.current==true)
        { 
          setIsPw(true);
          setPwMessage("")
        }
        else if(passwordPossibleCombCheck.current==false)
        {
          setIsPw(false);
          setPwMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>숫자,영문자,특수문자 조합으로 8자리 이상 입력해주세요!</ErrorMessageText></ErrorMessageBox>]);
        }
    }
    else
    {   
        compareMode.current=true;
        setIsInputPwConfirmCheck(true);
        if(Pw !== currentPwConfirm)
        { 
          setIsPw(false);
          setPwConfirmMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>비밀번호가 일치하지 않습니다!</ErrorMessageText></ErrorMessageBox>])
          setIsPwConfirm(false);
        }
        else if(Pw == currentPwConfirm)
        { 
          if(passwordPossibleCombCheck.current==false)
          {
            setIsPw(false);
            setIsPwConfirm(false);
            setPwMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>숫자,영문자,특수문자 조합으로 8자리 이상 입력해주세요!</ErrorMessageText></ErrorMessageBox>]);
            setPwConfirmMessage("");
          }
          else if(passwordPossibleCombCheck.current==true)
          {
            setPwConfirmMessage("");
            setIsPwConfirm(true);
            setIsPw(true);
          }
        }
    }

    
  };

  const checkAlreadyNickRegistered = (e) => {
    const currentNickname = e.target.value;
    setNickname(currentNickname);

    if(currentNickname === "")
    {
      setIsInputNicknameCheck(false);
    }
    else
    {
      setIsInputNicknameCheck(true);
    }

    if(currentNickname.length > 6 || currentNickname.length < 2)
    {
      setNicknameMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>닉네임은 2자리에서 5자리 내로 작성해주세요!</ErrorMessageText></ErrorMessageBox>]);
      setIsNickname(false);
    }else{
      axios.post(`${ip}/Users/check/nick/already/`,{
        nickname:currentNickname
      } 
      )
      .then(res=>{
        return res.data;
      })  
      .then(data=>{

        if(data === "yes" )
        {
          setNicknameMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>이미 사용 중인 닉네임입니다!</ErrorMessageText></ErrorMessageBox>])
          setIsNickname(false);
        }
        else if(data=== "no" )
        { 
          setNicknameMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>사용가능한 닉네임입니다.</ErrorMessageText></ErrorMessageBox>])
          setIsNickname(true);
        }
        
          
      });
    }

  }

  const checkAlreadySigning = () => 
  {
    const EmailTotal = Email + "@" + SelectValue;
    const EmailTotalCheck = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    setEmailCertCheckMessage("");
    setEmailCert("");
    setIsInputCheck(true);

    if(!EmailTotalCheck.test(EmailTotal) || InputDirect === "")
    {
        setEmailMessage([<div style={{ display: "flex" , position: "absolute" ,margin: "0px 5px 6px"}}>
        <i style={{margin: "-3px 5px 6px"}}><RiErrorWarningFill/></i>
        <span style={{margin:"-3px 5px 6px"}}>올바른 이메일 작성해 주세요!</span>
        </div>])
        setVisibled(false);
    }else{
    
    token.current="Bearer "+token.current;

    finalEmail.current=EmailTotal;
    
    axios.post(`${ip}/Users/check/email/already/`,{
        email:EmailTotal
      },
      {
        headers:
        {
          Authorization: token.current
        },
      }
    )
    .then(res=>{
      return res.data;
    })
    .then(data=>{
      if(data === "yes" )
      {
        token.current=token.current.substring(7);
        setEmailMessage([<div style={{ display: "flex" , position: "absolute" ,margin: "0px 5px 6px"}}>
        <i style={{margin: "-3px 5px 6px"}}><RiErrorWarningFill/></i>
        <span style={{margin:"-3px 5px 6px"}}>이미 가입된 이메일 입니다.</span>
        </div>]);
        setVisibled(false);
      }
      else
      {
        axios.post(`${ip}/Users/authkey/email/`,{
              email:EmailTotal
        },
        {
          headers:
          {
            Authorization: token.current
          },
        })
        .then(res=>{
          return res.data;
        })
        .then(data=>{
          console.log(data);
          token.current=data;
          console.log(token.current);
          setEmailMessage([<div style={{ display: "flex" , position: "absolute" ,margin: "0px 5px 6px"}}>
          <i style={{margin: "-3px 5px 6px"}}><RiErrorWarningFill/></i>
          <span style={{margin:"-3px 5px 6px"}}>인증번호가 전송되었습니다.</span>
          </div>]);
          setVisibled(true);
          certEmail.current=EmailTotal;
        });
        setEmailMessage([<div style={{ display: "flex" , position: "absolute" ,margin: "0px 5px 6px"}}>
        <i style={{margin: "-3px 5px 6px"}}><RiErrorWarningFill/></i>
        <span style={{margin:"-3px 5px 6px"}}>인증번호 전송 중...</span>
        </div>]);
        setVisibled(false);
      }
        
    });
    }
  }

  const register = (e) =>
    {
      e.preventDefault();

      token.current="Bearer "+token.current
      console.log(token.current)
;
      axios.post(`${ip}/Users/user`,
      {
        email:finalEmail.current,
        password:PwConfirm,
        nickname:Nickname,
        role:"USER"
      },
      {
        headers:
        {
          Authorization:token.current,
        },
      })
      .then(res=>{
        return res.data;
      })
      .then(data=>{
        token.current=data;
        console.log(token.current);
        navigate("/Login");
      });
    }

  return (
      <SignT>
        <SignTop>
          <Link to='/'><SignTopLogo src={ isDarkmode ? 'img/8bit_Dark.png' : 'img/8bit.png' } alt='로고'/></Link>
        </SignTop>
        <SubmitT onSubmit={register}>
            <SignInputT>
              <Information>
              <SignTitle className='title'>회원가입</SignTitle>
              </Information>
              <EmailCheckT>
              <Title htmlFor="email">이메일</Title>
              <EmailBox>
              <EmailInput ref={inputRef} disabled={isEmailCertCheck} value={Email} onChange={checkEmail} placeholder="이메일"/>
              <SelectInput onClick={() => setIsSelectBtnCheck(!isSelectBtnCheck)} disabled={isEmailCertCheck} ON={isInputDirect} value={InputDirect} ref={inputFocus} onChange={checkAndSetInputDirect}/>
              <EmailText>@</EmailText>
              <SelectBox ref={textRef} onClick={() => setIsSelectBtnCheck(!isSelectBtnCheck)} show={isSelectBtnCheck} event={isEmailCertCheck}>
                <SelectOption showli={isSelectBtnCheck}>
                  <SelectOptionLI value="naver.com" onClick={setEmailDomain}>naver.com</SelectOptionLI>
                  <SelectOptionLI value="gmail.com" onClick={setEmailDomain}>gmail.com</SelectOptionLI>
                  <SelectOptionLI value="hanmail.net" onClick={setEmailDomain}>hanmail.net</SelectOptionLI>
                  <SelectOptionLI value="nate.com" onClick={setEmailDomain}>nate.com</SelectOptionLI>
                  <SelectOptionLI value="daum.net" onClick={setEmailDomain}>daum.net</SelectOptionLI>
                  <SelectOptionLI value="outlook.com" onClick={setEmailDomain}>outlook.com</SelectOptionLI>
                  <SelectOptionLI onClick={readyToWirteInputDirect}><span>직접입력</span></SelectOptionLI>
                </SelectOption>
                <SelectValueText>{SelectValue}</SelectValueText>
              <ArrowBox direction={isSelectBtnCheck}>{isSelectBtnCheck ? "▼" : "▲"}</ ArrowBox>
              </SelectBox>
              <CertBtn show={isEmail} disabled={isEmailCertCheck} type="button" onClick={checkAlreadySigning}><span>{isVisibled ? "재요청" : "인증요청"}</span></CertBtn>
              </EmailBox>
              <ErrorMessage color={isVisibled}>{EmailMessage}</ErrorMessage>
              <EmailAuthCheckT show={isVisibled}>
              <Title htmlFor="emailCert">인증번호</Title>
              <EmailCheckBtnT>
                {/*<EmailAuthInput show={isInputCheck} check={isEmailCertCheck} maxLength={6} value={EmailCert} onChange={OnChangeEmailCert}/>*/}
                <EmailAuthInput placeholder="인증번호를 입력해주세요!" show={isInputCheck} check={isEmailCertCheck} value={EmailCert} onChange={setAuthNumber}/>
                <CertCheckBtn show={isEmailCertCheck} type="button" onClick={checkAuthNumberRight}><span>{isEmailCertCheck ? "인증완료" : "인증하기"}</span></CertCheckBtn>
              </EmailCheckBtnT>
              </EmailAuthCheckT>
              <ErrorMessage color = {isEmailCertCheckBtn}>{EmailCertCheckMessage}</ErrorMessage>
              </EmailCheckT>
              <PwCofirmNicknameT top={"20px"}>
              <Title htmlFor="Pw">비밀번호</Title>
              <PwBox placeholder="비밀번호를 입력해주세요!" show={isPw} check={isInputPwCheck} type="password" value={Pw} onChange={OnChangePw}/>
                {Pw.length > 0 && (<ErrorMessage show = {isPw}>{PwMessage}</ErrorMessage>)}
              </PwCofirmNicknameT>
              <PwCofirmNicknameT top={"20px"}>
              <Title htmlFor="PwConfirm">비밀번호 확인</Title>
                <PwCofirmBox  placeholder="비번번호를 다시 입력해주세요!" show={isPwConfirm} check={isInputPwConfirmCheck} type="password" value={PwConfirm} onChange={OnChangePwConfirm}/>
                {PwConfirm.length > 0 && (<ErrorMessage show = {isPwConfirm}>{PwConfirmMessage}</ErrorMessage>)}
              </PwCofirmNicknameT>
              <PwCofirmNicknameT top={"20px"}>
              <Title htmlFor="Nickname">닉네임</Title>
                <NicknameBox placeholder="닉네임을 입력해주세요!" show={isNickname} check={isInputNicknameCheck} value={Nickname} onChange={checkAlreadyNickRegistered}/>
                {Nickname.length > 0 && (<ErrorMessage color = {isNickname}>{NicknameMessage}</ErrorMessage>)}
              </PwCofirmNicknameT>
            </SignInputT>
            <SumbitButtonBox>
                  <SumbitButton type='submit' disabled={!(!isEmail && isPw && isPwConfirm && isNickname && isConfirmCheck)}><span>회원가입</span></SumbitButton>
                  {/* <EmPwFoundT>
                    <EmailPwFoundList>
                      <EmailPwFoundListLiBar onClick={() => ScrollTop()}><Link to='/Login'>로그인</Link></EmailPwFoundListLiBar>
                      <EmailPwFoundListLI onClick={() => ScrollTop()}><Link to='/EmailPwFound'>이메일/비밀번호 찾기</Link></EmailPwFoundListLI>
                    </EmailPwFoundList>
                  </EmPwFoundT> */}
            </SumbitButtonBox>
        </SubmitT>
      </SignT>
      
  );
}

const EmailInput = styled.input
`
    width: 130px;
    height: 20px;
    padding: 20px 5px 20px 20px;
    border: none;
    border-radius: 10px;
    caret-color: ${(props) => props.theme.textColor};
    background-color: #dee2e6;
    font-size:15px;
    outline: none;
    &:focus
    {
        box-shadow: 0 0 0 2px ${(props) => props.theme.borderColor} inset;
    }
`

export const Title = styled.label
`
  font-weight: bold;
  color: ${(props) => props.theme.textColor};
`

const SignTitle = styled.span
`
  color: ${(props) => props.theme.textColor};
  font-weight: bold;
  font-size: 20px;
`

const SignT = styled.div
`
  position:relative;
`

const SignInputT = styled.div
`
    display: inline-block;
`

const SignTop = styled.div
`
    text-align: center;
    margin-bottom: 50px;
`

const SignTopLogo = styled.img
`
    width: 192px;
    height: 102px;
    -webkit-user-select: none;
`

const EmailCheckT = styled.div
`
    display: flex;
    flex-direction: column;
`

const EmailBox = styled.div
`
    display: flex;
    margin: 20px 0px 20px 0px;
`

const SubmitT = styled.form
`
`

const Information = styled.div
`
    margin: 0px 154px 45px 154px;
    width: 130px;
    border: solid 3px ${(props) => props.theme.borderColor};
    padding: 10px;
    text-align: center;
    border-radius: 20px;
`

const SelectInput = styled.input
`
    position: absolute;
    width: 130px;
    height: 20px;
    border: none;
    background-color: #dee2e6;
    font-size:15px;
    border-radius: 10px;
    outline: none;
    padding: 20px 5px 20px 20px;
    cursor: pointer;
    margin: 0px 0px 0px 194px;
    z-index: ${props => props.ON ? "2" : "0"};
    caret-color: ${(props) => props.theme.checkBoxColor};
    outline: none;
    &:focus
    {
        box-shadow: 0 0 0 2px ${(props) => props.theme.borderColor} inset;
    }
`

const SelectBox = styled.div
`
    display: block;
    width: 130px;
    height: 20px;
    background-color: #dee2e6;
    font-size:15px;
    box-shadow: ${props => props.show ? "none" : `0 0 0 2px ${props.theme.borderColor} inset`};
    border-radius: 10px;
    outline: none;
    border: none;
    padding: 20px 5px 20px 20px;
    z-index: 1;
    cursor: ${props => props.event ? "none" : "pointer"};
    pointer-events: ${props => props.event ? "none" : ""};
`

const EmailText = styled.span
`
    font-size: 25px;
    margin: 16px 7px 16px 7px;
    color: ${(props) => props.theme.textColor};
`

const slide = keyframes
`
  0%{
    height: 0px;
  }
  100%{
    height: 248px;
  }
`

const SelectOptionLI = styled.li
`
  padding: 10px 0px 10px 0px;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  color: black;
  &:hover
  {
      background-color: ${(props) => props.theme.DropDownListColor};
  }
`

const SelectOption = styled.ul
`
    display: ${props => props.showli ? "none" : "block"};
    position: absolute;
    background: #dee2e6;
    margin: ${props => props.showli ? "0" : "42px 0px 0px -20px"};
    list-style: none;
    padding: 0px 0px 0px 0px;
    width: ${props => props.showli ? "145px" : "155px"};
    border-radius: 10px;
    border: none;
    box-shadow: ${props => props.showli ? "none" : `0 0 0 2px ${props.theme.borderColor} inset`};
    animation: ${slide} 0.5s;
    overflow: hidden;
`

const SelectValueText = styled.span
`
    position: absolute;
    margin: 1px 0px 0px 0px;
    color: black;
`

export const ArrowBox = styled.div
`
    color: ${(props) => props.theme.textColor};
    position: absolute;
    margin-left: 110px;
    margin-top: ${props => props.direction ? "1px" : "0px"};
`

const CertBtn = styled.button
`
    width: 100px;
    height: 59px;
    border: none;
    box-shadow: ${props => props.show ? "none" : "0 0 0 1px #dddddd inset"};
    background: ${props => props.show ? props.theme.buttonColor : "#aaaaaa"};
    border-radius: 0.4rem;
    cursor: pointer;
    color:white;
    font-size: 15px;
    margin: 0px 0px 0px 11px;
    pointer-events: ${props => props.show ? "true" : "none"};
    &:active
    {
      opacity: 90%;
    }
`

export const ErrorMessage = styled.p                  
/*display: ${props => props.show ? "none" : "block"};*/ 
`
    margin: -2px 0px 3px -6px ;
    padding: 0px;
    color: ${(props) => props.color ? props.theme.successColor : props.theme.errorColor };
    font-size: 15px;
`



const EmailAuthCheckT = styled.div
`
    display: ${props => props.show ? "block" : "none"};
    margin-top: 20px;
`

const PwCofirmNicknameT = styled.div
`
    margin-top: ${props => props.top};
`

const EmailAuthInput = styled.input
`
  width: 324px;
  height: 19px;
  padding: 20px 5px 20px 20px;
  border: none;
  box-shadow: ${props => props.show ? "none" : props.check ? `0 0 0 2px ${props.theme.successColor} inset` : `0 0 0 2px ${props.theme.errorColor} inset` };
  border-radius: 10px;
  caret-color: ${props => props.theme.textColor};
  background-color: #dee2e6;
  font-size:15px;
  pointer-events: ${props => props.check ? "none" : "true"};
  outline: none;
  &:focus
  {
    box-shadow: ${props => props.show ? `0 0 0 2px ${props.theme.boderColor} inset` : props.check ? `0 0 0 2px ${props.theme.successColor} inset` : `0 0 0 2px ${props.theme.errorColor} inset` };
  }
`

const EmailCheckBtnT = styled.div
`
    display: flex;
    margin: 20px 0px 20px 0px;
`

const CertCheckBtn = styled.button
`
  width: 100px;
  height: 60px;
  box-shadow: ${props => props.show ? "0 0 0 1px #dddddd inset" : "none"};
  border: none;
  background: ${props => props.show ? "#aaaaaa" : props.theme.buttonColor};
  border-radius: 0.4rem;
  cursor: pointer;
  color:white;
  font-size: 15px;
  margin: 0px 0px 0px 11px;
  pointer-events: ${props => props.show ? "none" : "true"};
  &:active
  {
    opacity: 90%;
  }
`

const PwBox = styled.input
`
  width: 435px;
  padding: 20px 5px 20px 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: ${props => props.check ? props => props.show ? `0 0 0 2px ${props.theme.successColor} inset` : `0 0 0 2px ${props.theme.errorColor} inset` : "none"};
  border-radius: 10px;
  border: none;
  caret-color: ${props => props.theme.textColor};
  background-color: #dee2e6;
  font-size:15px;
  outline: none;
  &:focus
  {
    box-shadow: ${props => props.check ? props => props.show ? `0 0 0 2px ${props.theme.successColor} inset` : `0 0 0 2px ${props.theme.errorColor} inset` : `0 0 0 2px ${props.theme.borderColor} inset`};
  }
`

const PwCofirmBox = styled(PwBox)
`
    box-shadow: ${props => props.check ? props => props.show ? `0 0 0 2px ${props.theme.successColor} inset` : `0 0 0 2px ${props.theme.errorColor} inset` : "none"};
`

const NicknameBox = styled(PwBox)
`
    box-shadow: ${props => props.check ? props => props.show ? `0 0 0 2px ${props.theme.successColor} inset` : `0 0 0 2px ${props.theme.errorColor} inset` : "none"};
`

const SumbitButton = styled.button
`
   
    width: 460px;
    padding: 15px;
    background: ${props => props.theme.buttonColor};
    border: none;
    border-radius: 0.4rem;
    cursor: pointer;
    color:white;
    font-size: 100%;
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

const SumbitButtonBox = styled.div
`
    margin-top: 50px;
`

export const ErrorMessageBox = styled.div
`
    margin: -5px 5px 6px;
    display: flex;
    position: absolute;
`

export const ErrorMessageIcon = styled.i
`
    margin: -2px 5px 6px;
`

export const ErrorMessageText = styled.span
`
    margin: -2px 5px 6px;
`

const EmPwFoundT = styled.div
` 
  margin-top: 50px;
`

const EmailPwFoundListLI = styled.li
`
    margin: 0px 10px 0px 10px;
    a
    {
      color:${props => props.theme.textColor};
      text-decoration: none;
      margin: 0px 15px 0px 15px;
    }
`

const EmailPwFoundList = styled.ul
`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    list-style: none;
    padding: 0px;
`


const EmailPwFoundListLiBar = styled(EmailPwFoundListLI)
`
  &::after {
    background: ${props => props.theme.textColor};
    position: absolute;
    content: "";
    display: inline-block;
    width: 2px;height: 11px;
    margin: 4px 10px 0px 10px;
}
`

export default Signinput;

