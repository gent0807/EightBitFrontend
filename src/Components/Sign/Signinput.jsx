import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import {RiErrorWarningFill} from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { styled, keyframes } from 'styled-components';
import { isDark } from '../Darkmode/Darkmode';
import { useRecoilValue } from 'recoil';
import { ScrollTop } from '../Header/TopNavBar'


const Signinput = () => 
{
  const [Email, setEmail] = useState("");
  const [EmailCert, setEmailCert] = useState("");
  const [Pw, setPw] = useState("");
  const [PwConfirm, setPwConfirm] = useState("");
  const [Nickname, setNickname] = useState("");
  const [SelectValue, setSelectValue] = useState("naver.com");
  const [InputDirect, setInputDirect] = useState("");

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

  const navigate = useNavigate();

  let finalEmail=useRef("");
  let authNum=useRef(null);
  let inputFocus = useRef(null);
  let textRef = useRef(null);
  
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
    }, [textRef])

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
    
    
    if(EmailCert == authNum.current)
    {
    setIsEmailCertCheck(true);
    setIsEmailCertCheckBtn(true);
    setIsConfirmCheck(true);
    setEmailCertCheckMessage("");
    setIsEmail(false);
    }
    else
    {
    setIsEmailCertCheck(false);
    setIsEmailCertCheckBtn(false);
    setIsConfirmCheck(false);
    setEmailCertCheckMessage([<ErrorMessageBox margin={"33px 5px 6px"}><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>인증번호가 일치하지 않습니다.</ErrorMessageText></ErrorMessageBox>]);
    }
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

    if(currentPw === "")
    {
      setIsInputPwCheck(false);
    }
    else
    {
     setIsInputPwCheck(true);
    }

    const PwCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

    if (!PwCheck.test(currentPw))
    {
        setPwMessage([<ErrorMessageBox margin={"-7px 5px 6px"}><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>숫자,영문자,특수문자 조합으로 8자리 이상 입력해주세요!</ErrorMessageText></ErrorMessageBox>]);
        setIsPw(false);
    }else{
        setPwMessage("");
        setIsPw(true);
    }

    if(currentPw !== PwConfirm)
    {
        setPwConfirmMessage([<ErrorMessageBox margin={"-7px 5px 6px"}><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>비밀번호가 일치하지 않습니다.</ErrorMessageText></ErrorMessageBox>]);
        setIsPwConfirm(false);
    }else{
        setPwConfirmMessage("");
        setIsPwConfirm(true);
      
    }
  };

  const OnChangePwConfirm = (e) => {
    const currentPwConfirm = e.target.value;
    setPwConfirm(currentPwConfirm);

    if(currentPwConfirm === "")
    {
      setIsInputPwConfirmCheck(false);
    }
    else
    {
      setIsInputPwConfirmCheck(true);
    }

    if(Pw !== currentPwConfirm)
    {
      setPwConfirmMessage([<ErrorMessageBox margin={"-7px 5px 6px"}><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>비밀번호가 일치하지 않습니다.</ErrorMessageText></ErrorMessageBox>]);
      setIsPwConfirm(false);
    }else{
      setPwConfirmMessage("");
      setIsPwConfirm(true);

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
      setNicknameMessage([<ErrorMessageBox margin={"-7px 5px 6px"}><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>닉네임은 2자리에서 5자리 내로 작성해주세요!</ErrorMessageText></ErrorMessageBox>])
      setIsNickname(false);
    }else{
      axios.post("http://localhost:8033/EightBitBackend/user/alreadyNickRegisterCheck/",{
        nickname:currentNickname
      } 
      )
      .then(res=>{
        return res.data;
      })  
      .then(data=>{
        console.log(data);
        if(data === "yes" )
        {
          setNicknameMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>이미 등록된 닉네임입니다!</ErrorMessageText></ErrorMessageBox>]);
          setIsNickname(false);
        }
        else if(data=== "no" )
        { 
          setNicknameMessage("");
          setIsNickname(true);
       
        }
          
      });
    }

  }

  const checkAlreadySigning = () => 
  {
    const EmailTotal = Email + "@" + SelectValue;
    const EmailTotalCheck = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    if(!EmailTotalCheck.test(EmailTotal) || InputDirect === "")
    {
        setEmailMessage([<div style={{ display: "flex" , position: "absolute" ,margin: "17px 5px 6px"}}>
        <i style={{margin: "-3px 5px 6px"}}><RiErrorWarningFill/></i>
        <span style={{margin:"-3px 5px 6px"}}>올바른 이메일 작성해 주세요!</span>
        </div>])
        setEmailCertCheckMessage("");
        setVisibled(false);
        setEmailCert("");
        setIsInputCheck(true);
    }else{
    
    finalEmail.current=EmailTotal;
    
    axios.post("http://localhost:8033/EightBitBackend/user/alreadyEmailRegisterCheck/",{
        email:EmailTotal
      } 
    )
    .then(res=>{
      return res.data;
    })
    .then(data=>{
      if(data === "yes" )
      {
        setEmailMessage([<div style={{ display: "flex" , position: "absolute" ,margin: "17px 5px 6px"}}>
        <i style={{margin: "-3px 5px 6px"}}><RiErrorWarningFill/></i>
        <span style={{margin:"-3px 5px 6px"}}>이미 가입된 이메일 입니다.</span>
        </div>])
        setVisibled(false);
      }
      else
      {
        setVisibled(true);
        axios.post("http://localhost:8033/EightBitBackend/user/send_auth_key_to_email/",{
              email:EmailTotal
        })
        .then(res=>{
          return res.data;
        })
        .then(data=>{
          authNum.current=data;
        });
      }
        
    });
    }
  }

  const register = (e) =>
    {
      e.preventDefault();
      
      axios.post("http://localhost:8033/EightBitBackend/user/insert/",{
        email:finalEmail.current,
        password:PwConfirm,
        nickname:Nickname
      } 
      )
      .then(res=>{
        return res.data;
      })
      .then(data=>{
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
              <EmailInput disabled={isEmailCertCheck} value={Email} onChange={checkEmail} placeholder="이메일"/>
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
              <CertBtn show={isEmail} disabled={isEmailCertCheck} type="button"onClick={checkAlreadySigning}><span>{isVisibled ? "재요청" : "인증요청"}</span></CertBtn>
              </EmailBox>
              <ErrorMessage show = {isVisibled}>{EmailMessage}</ErrorMessage>
              <EmailAuthCheckT show={isVisibled}>
              <Title htmlFor="emailCert">인증번호</Title>
              <EmailCheckBtnT>
                {/*<EmailAuthInput show={isInputCheck} check={isEmailCertCheck} maxLength={6} value={EmailCert} onChange={OnChangeEmailCert}/>*/}
                <EmailAuthInput placeholder="인증번호를 입력해주세요!" show={isInputCheck} check={isEmailCertCheck} value={EmailCert} onChange={setAuthNumber}/>
                <CertCheckBtn show={isEmailCertCheck} type="button" onClick={checkAuthNumberRight}><span>{isEmailCertCheck ? "인증완료" : "인증하기"}</span></CertCheckBtn>
              </EmailCheckBtnT>
              </EmailAuthCheckT>
              <ErrorMessage show = {isEmailCertCheckBtn}>{EmailCertCheckMessage}</ErrorMessage>
              </EmailCheckT>
              <PwCofirmNicknameT top={isVisibled ? "57px" : "42px"}>
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
                {Nickname.length > 0 && (<ErrorMessage show = {isNickname}>{NicknameMessage}</ErrorMessage>)}
              </PwCofirmNicknameT>
            </SignInputT>
            <SumbitButtonBox>
                  <SumbitButton type='submit' disabled={!(!isEmail && isPw && isPwConfirm && isNickname && isConfirmCheck)}><span>회원가입</span></SumbitButton>
                  <EmPwFoundT>
                    <EmailPwFoundList>
                      <EmailPwFoundListLiBar onClick={() => ScrollTop()}><Link to='/Login'>로그인</Link></EmailPwFoundListLiBar>
                      <EmailPwFoundListLI onClick={() => ScrollTop()}><Link to='/EmailPwFound'>이메일/비밀번호 찾기</Link></EmailPwFoundListLI>
                    </EmailPwFoundList>
                  </EmPwFoundT>
            </SumbitButtonBox>
        </SubmitT>
      </SignT>
      
  );
}

const EmailInput = styled.input
`
    position: absolute;
    width: 130px;
    height: 20px;
    padding: 20px 5px 20px 20px;
    margin-bottom: 20px;
    margin-top: 20px;
    border: none;
    border-radius: 10px;
    caret-color: ${(props) => props.theme.textColor};
    background-color: #dee2e6;
    font-size:15px;
    &:focus
    {
        outline: none;
        border: solid 2px ${(props) => props.theme.borderColor};
        border-radius: 10px;
    }
`

const Title = styled.label
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
    flex-wrap: nowrap;
`

const EmailBox = styled.div
`
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
    display: inline-block;
    position: absolute;
    width: 130px;
    height: 20px;
    border: none;
    background-color: #dee2e6;
    font-size:15px;
    border-radius: 10px;
    outline: none;
    padding: 20px 5px 20px 20px;
    margin: ${props => props.ON ? "20px -4px 0px 194px" : "20px -4px 0px 194px"};
    cursor: pointer;
    z-index: ${props => props.ON ? "2" : "0"};
    caret-color: ${(props) => props.theme.checkBoxColor};
    &:focus
    {
        outline: none;
        border: solid 2px ${(props) => props.theme.borderColor};
        border-radius: 10px;
    }
`

const SelectBox = styled.div
`
    display: inline-block;
    position: absolute;
    width: 130px;
    height: 20px;
    background-color: #dee2e6;
    font-size:15px;
    border: ${props => props.show ? "none" : `solid 2px ${props.theme.borderColor}`};
    border-radius: 10px;
    outline: none;
    padding: 20px 5px 20px 20px;
    margin: 20px 0px 20px 194px;
    z-index: 1;
    cursor: ${props => props.event ? "none" : "pointer"};
    pointer-events: ${props => props.event ? "none" : ""};
`

const EmailText = styled.span
`
    position: absolute;
    font-size: 25px;
    margin: 36px 0px 0px 162px;
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
  &:hover
  {
        background-color: #6a9dda;
        border-radius: 5px;
  }
`

const SelectOption = styled.ul
`
    display: ${props => props.showli ? "none" : "block"};
    position: absolute;
    background: #dee2e6;
    margin: ${props => props.showli ? "53px 0px 0px -14px" : "41px 0px 0px -21px"};
    list-style: none;
    padding: 0px 0px 0px 0px;
    width: ${props => props.showli ? "145px" : "155px"};
    border-radius: 10px;
    border: ${props => props.showli ? "none" : `solid 2px ${props.theme.borderColor}`};
    animation: ${slide} 0.5s;
    overflow: hidden;
`

const SelectValueText = styled.span
`
    position: absolute;
    margin: 1px 0px 0px 0px;
`

const ArrowBox = styled.div
`
    color: ${(props) => props.theme.textColor};
    position: absolute;
    margin-left: 110px;
    margin-top: ${props => props.direction ? "1px" : "0px"};
`

const CertBtn = styled.button
`
    margin-left: 359px;
    margin-top: 20px;
    width: 100px;
    height: 59px;
    border: ${props => props.show ? "none" : "solid 1px #dddddd"};
    background: ${props => props.show ? props.theme.buttonColor : "#aaaaaa"};
    border-radius: 0.4rem;
    cursor: pointer;
    color:white;
    font-size: 15px;
    pointer-events: ${props => props.show ? "true" : "none"};
    &:active
    {
      opacity: 90%;
    }
`

const ErrorMessage = styled.p                  
`
    display: ${props => props.show ? "none" : "block"};
    margin: 0px;
    padding: 0px;
    color: ${(props) => props.theme.errorColor};
    font-size: 15px;
`



const EmailAuthCheckT = styled.div
`
    display: ${props => props.show ? "block" : "none"};
    margin-top: ${props => props.show ? "39px" : "0px"};
    margin-bottom: ${props => props.show ? "-18px" : "0px"};
`

const PwCofirmNicknameT = styled.div
`
    margin-top: ${props => props.top};
`

const EmailAuthInput = styled.input
`
  width: 324px;
  height: 20px;
  padding: 20px 5px 20px 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  border: ${props => props.show ? "none" : props.check ? `solid 2px ${props.theme.successColor}` : `solid 2px ${props.theme.errorColor}` };
  border-radius: 10px;
  caret-color: ${props => props.theme.textColor};
  background-color: #dee2e6;
  font-size:15px;
  pointer-events: ${props => props.check ? "none" : "true"};
  position: absolute;
  &:focus
  {
    outline: none;
    border: solid 2px ${props => props.theme.borderColor};
    border-radius: 10px;
  }
`

const EmailCheckBtnT = styled.div
`
`

const CertCheckBtn = styled.button
`
  margin: 19.8px 0px 0px 358px;
  width: 100px;
  height: 59px;
  border: ${props => props.show ? "solid 1px #dddddd" : "none"};
  background: ${props => props.show ? "#aaaaaa" : props.theme.buttonColor};
  border-radius: 0.4rem;
  cursor: pointer;
  color:white;
  font-size: 15px;
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
  border: ${props => props.check ? props => props.show ? `solid 2px ${props.theme.successColor}` : `solid 2px ${props.theme.errorColor}` : "none"};
  border-radius: 10px;
  caret-color: ${props => props.theme.textColor};
  background-color: #dee2e6;
  font-size:15px;
  &:focus
  {
    outline: none;
    border: solid 2px  ${props => props.theme.borderColor};
    border-radius: 10px;
  }
`

const PwCofirmBox = styled(PwBox)
`
    border: ${props => props.check ? props => props.show ? `solid 2px ${props.theme.successColor}` : `solid 2px ${props.theme.errorColor}` : "none"};
`

const NicknameBox = styled(PwBox)
`
    border: ${props => props.check ? props => props.show ? `solid 2px ${props.theme.successColor}` : `solid 2px ${props.theme.errorColor}` : "none"};
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
      border: solid 1px #dddddd;
      background: #aaaaaa;
      pointer-events: none;
    }
`

const SumbitButtonBox = styled.div
`
    margin-top: 50px;
`

const ErrorMessageBox = styled.div
`
    margin: ${props => props.margin};
    display: flex;
    position: absolute;
`

const ErrorMessageIcon = styled.i
`
    margin: -2px 5px 6px;
`

const ErrorMessageText = styled.span
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

