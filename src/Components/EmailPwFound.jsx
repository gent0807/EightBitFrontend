import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {RiErrorWarningFill} from "react-icons/ri";
import { styled } from 'styled-components';
import axios from 'axios';

const EmailPwFound = () => 
{
    const [Pw1,setPw1]=useState("");
    const [Pw2,setPw2]=useState("");

    const [ Email, setEmail ] = useState("");
    const [ Emailauth, setEmailauth ] = useState("");
    const [ PasswordChangeE, setPasswordChange ] = useState("");
    const [ PasswordChangeConfirmM, setPasswordChangeConfirm ] = useState("");

    const [ EmailMessage, setEmailMessage ] = useState("");
    const [ EmailauthMessage, setEmailauthMessage ] = useState("");
    const [ PasswordChangeMessage, setPasswordChangeMessage ] = useState("");
    const [ PasswordChangeConfirmMessage, setPasswordChangeConfirmMessage ] = useState("");
    const [ EmailFoundCheckMessage, setEmailFoundCheckMessage ] = useState("");

    const [ isEmail, setIsEmail ] = useState(false);
    const [ isEmailBtn, setIsEmailBtn ] = useState(false);
    const [ isEmailauthBtn, setIsEmailauthBtn ] = useState(false);
    const [ isInputCheck, setIsInputCheck ] = useState(true);
    const [ isButtonCheck, setIsButtonCheck ] = useState(false);
    const [ isPasswordChange, setIsPasswordChange ] = useState(false);
    const [ isPasswordChangeConfirm, setIsPasswordChangeConfirm ] = useState(false);
    const [ isEmailPoundCheck, setIsEmailPoundCheck ] = useState(false);
    const [ isInputEmailCheck, setIsEmailtPwCheck ] = useState(false);
    const [ isInputPasswordChangeCheck, setIsInputPasswordChangeCheck ] = useState(false);
    const [ isInputPasswordChangeConfirmCheck, setIsInputPasswordChangeConfirmCheck ] = useState(false);

    const [ changeVisibled, setchangeVisibled ] = useState(false);

    const navigate = useNavigate();

    let compareMode=useRef(false);
    let passwordPossibleCombCheck=useRef(false);
    let authNum=useRef(null);
    let alreadyPasswordUsing=useRef("no");
    let checkRef = useRef(null);
  
    useEffect(() => {
      function handleOuside(e) {
        if (document.activeElement !== checkRef.current || !checkRef.current.contains(e.target)) 
        {
            setIsEmailPoundCheck(false);
            console.log(checkRef);
        }
      };

      if(!isEmailPoundCheck) {
        document.addEventListener("mousedown", handleOuside);
      }
      return () => {
        document.removeEventListener("mousedown", handleOuside);
      };
    }, [checkRef])

    const Emailuser = (e) =>
    {
      const EmailCheck = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
      const currentEmail = e.target.value;

      if(currentEmail === "")
      {
          setIsEmailtPwCheck(false);
      }
      else
      {
          setIsEmailtPwCheck(true);
      }

      setEmail(currentEmail);

    if (!EmailCheck.test(currentEmail)) 
      {
        setEmailMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>올바른 이메일을 작성해 주세요!</ErrorMessageText></ErrorMessageBox>]);
        setIsEmail(false);
      }
      else
      {
        setEmailMessage("");
        setIsEmail(true);
      }
    }

    const EmailAuth = (e) =>
    {
        const currentEmailCert = e.target.value;
        setEmailauth(currentEmailCert);
    }

    const PasswordChange = (e) =>
    {   
        const PasswordChangeV = e.target.value;
        setPasswordChange(PasswordChangeV)
        const PwCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

        if(PasswordChangeV === "")
        {
            setIsInputPasswordChangeCheck(false);
        }
        else
        {
          setIsInputPasswordChangeCheck(true);
        }

        if(!PwCheck.test(PasswordChangeV))
        {
          setPasswordChangeMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>숫자,영문자,특수문자 조합으로 8자리 이상 입력해주세요!</ErrorMessageText></ErrorMessageBox>])
          setIsPasswordChange(false);
          passwordPossibleCombCheck.current=false;
        }
        else
        {
          setPasswordChangeMessage("")
          setIsPasswordChange(true);
          passwordPossibleCombCheck.current=true;
        }
        if(compareMode.current==true)
        {
          if(PasswordChangeV !== PasswordChangeConfirmM)
          {
            setPasswordChangeConfirmMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>비밀번호가 일치하지 않습니다!</ErrorMessageText></ErrorMessageBox>])
            setIsPasswordChangeConfirm(false)
            if(PasswordChangeConfirmM=="")
            {
              setIsPasswordChange(true);
            }
            else if(PasswordChangeConfirmM!="")
            {
              setIsPasswordChange(false);
            }
          }
          else if(PasswordChangeV == PasswordChangeConfirmM)
          { 
            userPasswordAlreadyUsingCheck(PasswordChangeV);
          }
        }
    }

    const PasswordChangeConfirm = (e) =>
    {   
        const PasswordChangeConfirmV = e.target.value
        setPasswordChangeConfirm(PasswordChangeConfirmV)
        
        if(PasswordChangeConfirmV === "")
        {   
            compareMode.current=false;
            setIsInputPasswordChangeConfirmCheck(false);
            if(passwordPossibleCombCheck.current==true)
            { 
              setIsPasswordChange(true);
              setPasswordChangeMessage("")
            }
            else if(passwordPossibleCombCheck.current==false)
            {
              setIsPasswordChange(false);
              setPasswordChangeMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>숫자,영문자,특수문자 조합으로 8자리 이상 입력해주세요!</ErrorMessageText></ErrorMessageBox>]);
            }
        }
        else
        {   
            compareMode.current=true;
            setIsInputPasswordChangeConfirmCheck(true);
            if(PasswordChangeE !== PasswordChangeConfirmV)
            { 
              setIsPasswordChange(false);
              setPasswordChangeConfirmMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>비밀번호가 일치하지 않습니다!</ErrorMessageText></ErrorMessageBox>])
              setIsPasswordChangeConfirm(false)
            }
            else if(PasswordChangeE == PasswordChangeConfirmV)
            { 
              if(passwordPossibleCombCheck.current==false)
              {
                setIsPasswordChange(false);
                setIsPasswordChangeConfirm(false);
                setPasswordChangeMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>숫자,영문자,특수문자 조합으로 8자리 이상 입력해주세요!</ErrorMessageText></ErrorMessageBox>]);
                setPasswordChangeConfirmMessage("");
              }
              else if(passwordPossibleCombCheck.current==true)
              {
                userPasswordAlreadyUsingCheck(PasswordChangeConfirmV);
              }
            }
        }

        
      
     }

     const userPasswordAlreadyUsingCheck=(password)=>
     {  
        axios.post("http://localhost:8033/EightBitBackend/user/alreadyPasswordUsingCheck/",{
            email:Email,
            password:password
        })
        .then(res=>{
            return res.data;
        })
        .then(data=>{
            alreadyPasswordUsing.current=data;
            if(alreadyPasswordUsing.current=="no"){
              setPasswordChangeConfirmMessage("");
              setIsPasswordChangeConfirm(true);
              setIsPasswordChange(true);
            }
            else if(alreadyPasswordUsing.current=="yes"){
              setPasswordChangeConfirmMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>기존의 비밀번호와 일치합니다!</ErrorMessageText></ErrorMessageBox>])
              setIsPasswordChangeConfirm(false);
              setIsPasswordChange(false);
            }
        })


     }

     

    const EmailCheck = () =>
    {   
        axios.post("http://localhost:8033/EightBitBackend/user/alreadyEmailRegisterCheck/",{
          email:Email
        })
        .then(res=>{
          return res.data;
        })
        .then(data=>{
          if(data === "no" )
          {
            setIsEmailBtn(false);
            setIsEmailPoundCheck(true);
            setEmailFoundCheckMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>가입 정보가 확인되지 않습니다!</ErrorMessageText></ErrorMessageBox>]);
          }
          else if(data==="yes")
          {
            setIsEmailBtn(true);
            setEmailFoundCheckMessage("");
            axios.post("http://localhost:8033/EightBitBackend/user/send_auth_key_to_email/",{
                  email:Email
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
    
    const update = (e) =>
    {
      e.preventDefault();

      axios.put("http://localhost:8033/EightBitBackend/user/updateUserPw/",{
        email:Email,
        password:PasswordChangeConfirmM,
      } 
      )
      .then(res=>{
        return res.data;
      })
      .then(data=>{
        navigate("/Login");
      });
      
    }
  

    const EmailAuthCheck = () =>
    {
      setIsInputCheck(false)
      
      if(Emailauth == authNum.current)
        {   
          setIsEmailauthBtn(true)
          setIsButtonCheck(true)
          setchangeVisibled(true)
        }
        else
        {
          setIsButtonCheck(false)
          setIsEmailauthBtn(false)
          setchangeVisibled(false)
          setEmailauthMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>인증번호가 일치하지 않습니다.</ErrorMessageText></ErrorMessageBox>])
        }
       
    }

    return (
        <EmPwFoundT>
            <EmPwFoundTop>
            <Link to='/'><EmPwLogo src='img/8bit.png' alt='로고'/></Link>
            </EmPwFoundTop>
            <EmPwForm onSubmit={update}>
            <EmPwInputContainer>
            <Information>
            <EmPwFoundTitle>이메일/비밀번호 찾기</EmPwFoundTitle>
            </Information>
            <EmPwInputT>
            <Title>이메일</Title>
              <EmailInputT>
                <EmailInput ref={checkRef} disabled={isEmailauthBtn} show = {isEmail} check = {isInputEmailCheck} placeholder='이메일을 입력해 주세요!' value={Email} onChange={Emailuser}/>
                <SendButton show = {isEmail} type="button" onClick={EmailCheck} disabled={isEmailauthBtn}><span>{isEmailBtn ? "재전송" : "전송"}</span></SendButton>
                {Email.length > 0 && (<ErrorMessage show = {isEmail}>{EmailMessage}</ErrorMessage>)}
                <EmailFoundErrorMessage show = {isEmailBtn} check={isEmailPoundCheck}>{EmailFoundCheckMessage}</EmailFoundErrorMessage>
                <EmailAuthBox show={isEmailBtn}>
                <Title position={"absolute"} marginTop={"-8px"}>인증번호</Title>
                <EmailAuthInput show={isInputCheck} check={isEmailauthBtn} disabled={isEmailauthBtn} placeholder='인증번호를 입력해 주세요!' value={Emailauth} onChange={EmailAuth}/>
                <EmailAuthBtn show={isEmailauthBtn} type="button" onClick={EmailAuthCheck} disabled={isEmailauthBtn}><span>{isButtonCheck ? "인증완료" : "인증확인"}</span></EmailAuthBtn>
                <ErrorMessage show = {isEmailauthBtn}>{EmailauthMessage}</ErrorMessage>
                </EmailAuthBox>
                <PasswordChangeT show={changeVisibled}>
                <Title>새 비밀번호</Title>
                <PasswordChangeInput type="password" show={isPasswordChange} check={isInputPasswordChangeCheck} placeholder='새 비밀번호를 입력해 주세요!' value={PasswordChangeE} onChange={PasswordChange}/>
                </PasswordChangeT>
                {PasswordChangeE.length > 0 && (<ErrorMessage show = {isPasswordChange}>{PasswordChangeMessage}</ErrorMessage>)}
                <PasswordChangeConfirmT show={changeVisibled}>
                <Title>새 비밀번호 확인</Title>
                <PasswordChangeConfirmInput type="password" show={isPasswordChangeConfirm} check={isInputPasswordChangeConfirmCheck} placeholder='새 비밀번호를 다시 입력해 주세요!' value={PasswordChangeConfirmM} onChange={PasswordChangeConfirm}/>
                </PasswordChangeConfirmT>
                {PasswordChangeConfirmM.length > 0 && (<ErrorMessage show = {isPasswordChangeConfirm}>{PasswordChangeConfirmMessage}</ErrorMessage>)}
                </EmailInputT>
            </EmPwInputT>
            <SubmitBtnBox>
                <SumbitButton type="submit" disabled={!(isEmail && isEmailauthBtn && isPasswordChange && isPasswordChangeConfirm)}><span>완료</span></SumbitButton>
            </SubmitBtnBox>
            </EmPwInputContainer>
            <AnotherRoute>
            <AnotherList>
              <Login><Link to='/Login'>로그인</Link></Login>
              <Sign><Link to='/Sign'>회원가입</Link></Sign>
            </AnotherList>
            </AnotherRoute>
            </EmPwForm>
        </EmPwFoundT>
    );
}

const EmPwFoundT = styled.div
`
`

const EmPwFoundTop = styled.div
`
    text-align: center;
    margin-bottom: 50px;
`

const EmPwLogo = styled.img
`
    width: 192px;
    height: 102px;
`

const EmPwForm = styled.form
`
`

const EmPwInputContainer = styled.div
`
    width: 460px;
    border: solid 3px #6767ff;
    padding: 20px;
    border-radius: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Information = styled.div
`
    margin: 0px 120px 30px 120px;
    width: 200px;
    padding: 10px;
    text-align: center;
    border-radius: 20px;
`

const EmPwFoundTitle = styled.span
`
    color: #6767ff;
    font-weight: bold;
    font-size: 20px;
`

const EmPwInputT = styled.div
`
`

const EmailInputT = styled.div
`
`

const EmailInput = styled.input
`
    width: 275px;
    padding: 20px 5px 20px 20px;
    margin-bottom: 20px;
    margin-top: 20px;
    border: ${props => props.check ? props.show ? "solid 2px green" : "solid 2px red" : "none"};
    border-radius: 10px;
    caret-color: #03ab95;
    background-color: #dee2e6;
    font-size:15px;
    &:focus
    {
      border: none;
      outline: none;
      border: solid 2px #6767ff;
      border-radius: 10px;
    }
`

const ErrorMessageBox = styled.div
`
    margin: -13px 5px 6px;
    display: flex;
    position: absolute;
`

const ErrorMessageIcon = styled.i
`
    margin: -2px -2px 5px;
`

const ErrorMessageText = styled.span
`
    margin: -2px 8px 6px;
`

const ErrorMessage = styled.p
`
    display: ${props => props.show ? "none" : "block"};
    margin: 0px;
    padding: 0px;
    color:red;
    font-size: 15px;
`

const EmailFoundErrorMessage = styled.p
`
    display: ${props => props.show ? "none" : props.check ? "block" : "none" };
    margin: 0px;
    padding: 0px;
    color:red;
    font-size: 15px;
`

const SendButton = styled.button
`
    margin-left: 10px;
    width: 100px;
    height: 55px;
    border: ${props => props.show ? "none" : "solid 1px #dddddd"};
    background: ${props => props.show ? "#6767ff" : "#aaaaaa"};
    border-radius: 0.4rem;
    cursor: pointer;
    color:white;
    font-size: 15px;
    margin-top: -3px;
    pointer-events: ${props => props.show ? "true" : "none"};
    &:active
    {
      opacity: 90%;
    }
    &:disabled
    {
        border: solid 1px #dddddd;
        background: #aaaaaa;
        pointer-events: none;
    }
`

const EmailAuthBox = styled.div
`
    display: ${props => props.show ? "inline-block" : "none"};
`
const EmailAuthInput = styled(EmailInput)
`
    border: ${props => props.show ? "none" : props.check ? "solid 2px green" : "solid 2px red"};
    margin-top: 44px;
`

const EmailAuthBtn = styled.button
`
    margin-left: 10px;
    width: 100px;
    height: 55px;
    border: none;
    background: #6767ff;
    border-radius: 0.4rem;
    cursor: pointer;
    color:white;
    font-size: 15px;
    margin-top: -3px;
    &:disabled
    {
        border: solid 1px #dddddd;
        background: #aaaaaa;
        pointer-events: none;
    }
`

const PasswordChangeT = styled.div
`
    display: ${props => props.show ? "inline-block" : "none"};
`

const PasswordChangeConfirmT = styled.div
`
    display: ${props => props.show ? "inline-block" : "none"};
    margin-top: 12px;
`

const Title = styled.label
`
    font-weight: bold;
    position: ${props => props.position};
    margin-top: ${props => props.marginTop};
`

const PasswordChangeInput = styled.input
`
    width: 385px;
    padding: 20px 5px 20px 20px;
    margin-bottom: 20px;
    margin-top: 20px;
    border: ${props => props.check ? props.show ? "solid 2px green" : "solid 2px red" : "none"};
    border-radius: 10px;
    caret-color: #03ab95;
    background-color: #dee2e6;
    font-size:15px;
    &:focus
    {
      border: none;
      outline: none;
      border: solid 2px #6767ff;
      border-radius: 10px;
    }
`

const PasswordChangeConfirmInput= styled(PasswordChangeInput)
`
`

const SubmitBtnBox = styled.div
`
  margin: 22px 180px 0px 180px;
`

const SumbitButton = styled.button
`
    width: 100px;
    height: 55px;
    background: #6767ff;
    border: none;
    border-radius: 0.4rem;
    cursor: pointer;
    color:white;
    font-size: 16px;
    &:active
    {
      font-size: 15px;
      opacity: 90%;
    }
    &:disabled
    {
      border: solid 1px #dddddd;
      background: #aaaaaa;
      pointer-events: none;
    }

`
const AnotherRoute = styled.div
`
`

const AnotherList = styled.ul
`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    list-style: none;
    padding: 0px;
`

const Sign = styled.li
`
    margin: 0px 10px 0px 10px;
    a
    {
      color:black;
      text-decoration: none;
      margin: 0px 15px 0px 15px;
    }
`

const Login = styled(Sign)
`
  &::after {
  position: absolute;
  content: "";
  display: inline-block;
  border-right: solid 1px gray;
  width: 1px;
  height: 11px;
  margin: 4px 10px 0px 8px;
  opacity: 20%;
}
`


export default EmailPwFound;