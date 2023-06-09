import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { RiErrorWarningFill } from "react-icons/ri";
import { styled } from 'styled-components';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { isDark } from '../Darkmode/Darkmode';
import { ScrollTop } from '../Header/TopNavBar';

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
    const isDarkmode = useRecoilValue(isDark);

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
        setEmailMessage([<ErrorMessageBox margin={"-13px 0px 0px -202px"}><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>올바른 이메일을 작성해 주세요!</ErrorMessageText></ErrorMessageBox>]);
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
          setPasswordChangeMessage([<ErrorMessageBox margin={"-13px 0px 0px -202px"}><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>숫자,영문자,특수문자 조합으로 8자리 이상 입력해주세요!</ErrorMessageText></ErrorMessageBox>])
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
            setPasswordChangeConfirmMessage([<ErrorMessageBox margin={"-30px 0px 0px -202px"}><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>비밀번호가 일치하지 않습니다!</ErrorMessageText></ErrorMessageBox>])
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
        const PasswordChangeConfirmV = e.target.value;
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
              setPasswordChangeMessage([<ErrorMessageBox margin={"-13px 0px 0px -202px"}><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>숫자,영문자,특수문자 조합으로 8자리 이상 입력해주세요!</ErrorMessageText></ErrorMessageBox>]);
            }
        }
        else
        {   
            compareMode.current=true;
            setIsInputPasswordChangeConfirmCheck(true);
            if(PasswordChangeE !== PasswordChangeConfirmV)
            { 
              setIsPasswordChange(false);
              setPasswordChangeConfirmMessage([<ErrorMessageBox margin={"-30px 0px 0px -202px"}><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>비밀번호가 일치하지 않습니다!</ErrorMessageText></ErrorMessageBox>])
              setIsPasswordChangeConfirm(false)
            }
            else if(PasswordChangeE == PasswordChangeConfirmV)
            { 
              if(passwordPossibleCombCheck.current==false)
              {
                setIsPasswordChange(false);
                setIsPasswordChangeConfirm(false);
                setPasswordChangeMessage([<ErrorMessageBox margin={"-13px 0px 0px -202px"}><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>숫자,영문자,특수문자 조합으로 8자리 이상 입력해주세요!</ErrorMessageText></ErrorMessageBox>]);
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
              setPasswordChangeConfirmMessage([<ErrorMessageBox margin={"-30px 0px 0px -202px"}><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>기존의 비밀번호와 일치합니다!</ErrorMessageText></ErrorMessageBox>])
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
            setEmailFoundCheckMessage([<ErrorMessageBox margin={"-13px 0px 0px -202px"}><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>가입 정보가 확인되지 않습니다!</ErrorMessageText></ErrorMessageBox>]);
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
          setEmailauthMessage([<ErrorMessageBox margin={"-9px 0px 0px 8px"}><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>인증번호가 일치하지 않습니다.</ErrorMessageText></ErrorMessageBox>])
        }
       
    }

    return (
        <EmPwFoundT>
            <EmPwFoundTop>
            <Link to='/'><EmPwLogo src={ isDarkmode ? 'img/8bit_Dark.png' : 'img/8bit.png' } alt='로고'/></Link>
            </EmPwFoundTop>
            <EmPwForm onSubmit={update}>
            <InformationAllBox>
            <EmPwInformation>
            <EmPwFoundTitle>이메일/비밀번호 찾기</EmPwFoundTitle>
            </EmPwInformation>
            </InformationAllBox>
            <EmPwInputT>
              <EmailInputT>
                <EmailAuthInputBox>
                <Title>이메일</Title>
                <EmailAuthAllBox>
                <EmailInput ref={checkRef} disabled={isEmailauthBtn} show = {isEmail} check = {isInputEmailCheck} placeholder='이메일을 입력해 주세요!' value={Email} onChange={Emailuser}/>
                <SendButton show = {isEmail} type="button" onClick={EmailCheck} disabled={isEmailauthBtn}><span>{isEmailBtn ? "재전송" : "전송"}</span></SendButton>
                </EmailAuthAllBox>
                </EmailAuthInputBox>
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
                <SumbitButton type="submit" disabled={!(isEmail && isEmailauthBtn && isPasswordChange && isPasswordChangeConfirm)}><span>비밀번호 수정완료</span></SumbitButton>
            </SubmitBtnBox>
            <AnotherRoute>
            <AnotherList>
              <Login onClick={() => ScrollTop()}><Link to='/Login'>로그인</Link></Login>
              <Sign onClick={() => ScrollTop()}><Link to='/Sign'>회원가입</Link></Sign>
            </AnotherList>
            </AnotherRoute>
            </EmPwForm>
        </EmPwFoundT>
    );
}

const EmPwInformation = styled.div
`
    width: 191px;
    border: solid 3px ${(props) => props.theme.borderColor};
    padding: 10px;
    text-align: center;
    border-radius: 20px;
`

const EmPwFoundT = styled.div
`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const InformationAllBox = styled.div
`
    display: flex;
    justify-content: center;
`

const EmailAuthInputBox = styled.div
`
    margin: 50px 0px 0px 0px;
`

const EmailAuthAllBox = styled.div
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
    -webkit-user-select: none;
`

const EmPwForm = styled.form
`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const EmPwInputContainer = styled.div
`
    width: 460px;
    
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
    margin: 0px 154px 45px 154px;
    width: 250px;
    border: solid 3px #3c3c3c;
    padding: 10px;
    text-align: center;
    border-radius: 20px;
`

const EmPwFoundTitle = styled.span
`
    color: ${(props) => props.theme.textColor};
    font-weight: bold;
    font-size: 20px;
`

const EmPwInputT = styled.div
`
`

const EmailInputT = styled.div
`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const EmailInput = styled.input
`
    width: 275px;
    padding: 20px 5px 20px 20px;
    margin-bottom: 20px;
    margin-top: 20px;
    border: ${props => props.check ? props.show ? `solid 2px ${props.theme.successColor}` : `solid 2px ${props.theme.errorColor}` : "none"};
    border-radius: 10px;
    caret-color:  ${(props) => props.theme.textColor};
    background-color: #dee2e6;
    font-size:15px;
    &:focus
    {
      border: none;
      outline: none;
      border: solid 2px ${(props) => props.theme.borderColor};
      border-radius: 10px;
    }
`

const ErrorMessageBox = styled.div
`
    margin: ${props => props.margin};
    display: flex;
    position: absolute;
`

const ErrorMessageIcon = styled.i
`
    margin: -2px -2px 5px;
`

const ErrorMessageText = styled.span
`
    margin: -3px 6px 6px 7px;
`

const ErrorMessage = styled.p
`
    display: ${props => props.show ? "none" : "block"};
    margin: 0px;
    padding: 0px;
    color: ${(props) => props.theme.errorColor};
    font-size: 15px;
`

const EmailFoundErrorMessage = styled.p
`
    display: ${props => props.show ? "none" : props.check ? "block" : "none" };
    margin: 0px;
    padding: 0px;
    color:${(props) => props.theme.errorColor};;
    font-size: 15px;
`

const SendButton = styled.button
`
    margin-left: 10px;
    width: 100px;
    height: 55px;
    border: ${props => props.show ? "none" : "solid 1px #dddddd"};
    background: ${props => props.show ? props.theme.buttonColor : "#aaaaaa"};
    border-radius: 0.4rem;
    cursor: pointer;
    color: white;
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
    margin: 21px 0px 0px 0px;
`
const EmailAuthInput = styled(EmailInput)
`
    border: ${props => props.show ? "none" : props.check ? `solid 2px ${props.theme.successColor}` : `solid 2px ${props.theme.errorColor}` };
    margin-top: 27px;
`

const EmailAuthBtn = styled.button
`
    margin-left: 10px;
    width: 100px;
    height: 55px;
    border: none;
    background: ${props => props.theme.buttonColor};
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
    display: ${props => props.show ? "flex" : "none"};
    flex-direction: column;
    margin-top: 4px;
`

const PasswordChangeConfirmT = styled.div
`
    display: ${props => props.show ? "flex" : "none"};
    flex-direction: column;
    margin-top: 17px;
    margin-bottom: 21px;
`

const Title = styled.label
`
    color: ${(props) => props.theme.textColor};
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
    border: ${props => props.check ? props.show ? `solid 2px ${props.theme.successColor}` : `solid 2px ${props.theme.errorColor}` : "none"};
    border-radius: 10px;
    caret-color: ${(props) => props.theme.textColor};
    background-color: #dee2e6;
    font-size:15px;
    &:focus
    {
      border: none;
      outline: none;
      border: solid 2px ${(props) => props.theme.borderColor};
      border-radius: 10px;
    }
`

const PasswordChangeConfirmInput= styled(PasswordChangeInput)
`
    margin-top: 23px;
`

const SubmitBtnBox = styled.div
`
    margin-top: 13px;
    margin-bottom: 28px;
`

const SumbitButton = styled.button
`
    width: 410px;
    height: 55px;
    background: ${props => props.theme.buttonColor};
    border: none;
    border-radius: 0.4rem;
    cursor: pointer;
    color: white;
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
      color: ${props => props.theme.textColor};
      text-decoration: none;
      margin: 0px 15px 0px 15px;
    }
`

const Login = styled(Sign)
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


export default EmailPwFound;