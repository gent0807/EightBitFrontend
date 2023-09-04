import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
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
    const [ isInputEmailAuthCheck, setIsInputEmailAuthCheck ] = useState(false);
    const [ isButtonCheck, setIsButtonCheck ] = useState(false);
    const [ isPasswordChange, setIsPasswordChange ] = useState(false);
    const [ isPasswordChangeConfirm, setIsPasswordChangeConfirm ] = useState(false);
    const [ isEmailPoundCheck, setIsEmailPoundCheck ] = useState(false);
    const [ isInputEmailCheck, setIsEmailtPwCheck ] = useState(false);
    const [ isInputPasswordChangeCheck, setIsInputPasswordChangeCheck ] = useState(false);
    const [ isInputPasswordChangeConfirmCheck, setIsInputPasswordChangeConfirmCheck ] = useState(false);
    const [ isEmailAuthInputCheck, setIsEmailAuthInputCheck] = useState(false);
    const [ MessageChangeCheck, setMessageChangeCheck] = useState(false);
    const [ MessageRevert, setMessageRevert ] = useState(false);
    const [ changeVisibled, setchangeVisibled ] = useState(false);
    const isDarkmode = useRecoilValue(isDark);
    const ip=localStorage.getItem("ip");

    const navigate = useNavigate();
    const location = useLocation();

    const inputRef=useRef();
    const token=useRef(location.state.token);
    const compareMode=useRef(false);
    const passwordPossibleCombCheck=useRef(false);
    const authNum=useRef(null);
    const alreadyPasswordUsing=useRef("no");

    useEffect(() => {
      inputRef.current.focus();
    },[]);

    const Emailuser = (e) =>
    {
      const EmailCheck = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
      const currentEmail = e.target.value;

      if(currentEmail === "")
      {
          setIsEmailtPwCheck(false);
          setIsEmailAuthInputCheck(false);
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
        setIsEmailAuthInputCheck(false);
        setMessageChangeCheck(false);
        setMessageRevert(true);
      }
      else
      {
        setMessageChangeCheck(true);
        setEmailMessage("");
        { MessageRevert ? setIsEmail(true) : setIsEmail(false) };
        setIsEmailAuthInputCheck(true);
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
        token.current="Bearer "+token.current;

        axios.post(`${ip}/Users/check/password/already/`,{
            email:Email,
            password:password
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
            token.current=token.current.substring(7);
            alreadyPasswordUsing.current=data;
            if(alreadyPasswordUsing.current=="no"){
              setPasswordChangeConfirmMessage("");

              if(passwordPossibleCombCheck.current==false)
              {
                setIsPasswordChangeConfirm(false);
                setIsPasswordChange(false);
              }

              else if(passwordPossibleCombCheck.current==true)
              {
                setIsPasswordChangeConfirm(true);
                setIsPasswordChange(true);
              }

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
        token.current="Bearer "+token.current;

        axios.post(`${ip}/Users/check/email/already/`,{
          email:Email
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
          if(data === "no" )
          { 
            token.current=token.current.substring(7);
            setMessageChangeCheck(true);
            setIsEmail(false);
            setIsEmailBtn(false);
            setIsEmailPoundCheck(true);
            setMessageRevert(false);
            setEmailFoundCheckMessage([<ErrorMessageBox margin={"-13px 0px 0px -202px"}><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>가입 정보가 확인되지 않습니다!</ErrorMessageText></ErrorMessageBox>]);
          }
          else if(data==="yes")
          {
            axios.post(`${ip}/Users/authkey/email`,{
                  email:Email
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
              token.current=data;
              console.log(token.current);
              setIsEmail(true);
              setIsEmailBtn(true);
              setIsEmailPoundCheck(false);
              setMessageRevert(true);
              setEmailMessage([<ErrorMessageBox margin={"-13px 0px 0px -202px"}><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>인증 번호가 전송되었습니다!</ErrorMessageText></ErrorMessageBox>]);
            });
            setMessageChangeCheck(false);
            setIsEmail(false);
            setIsEmailBtn(false);
            setIsEmailPoundCheck(false);
            setMessageRevert(false);
            setEmailMessage([<ErrorMessageBox margin={"-13px 0px 0px -202px"}><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>인증번호 전송 중...</ErrorMessageText></ErrorMessageBox>]);

          }
        });

       

    }
    
    const update = (e) =>
    {
      e.preventDefault();

      token.current="Bearer "+token.current
      console.log(token.current);

      axios.put(`${ip}/Users/password/`,{
        email:Email,
        password:PasswordChangeConfirmM,
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
        token.current=data;
        navigate("/Login", {state:{token:token.current}});
      });
      
    }
  

    const EmailAuthCheck = () =>
    {
      token.current="Bearer " + token.current

      axios.post(`${ip}/Users/check/authkey/`,
      {
        email: Email,
        authNum: Emailauth 
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
            console.log(token.current);
            setIsInputEmailAuthCheck(true)
            setIsButtonCheck(false)
            setIsEmailauthBtn(false)
            setchangeVisibled(false)
            setEmailauthMessage([<ErrorMessageBox margin={"-9px 0px 0px 8px"}><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>인증번호가 일치하지 않습니다!</ErrorMessageText></ErrorMessageBox>])
          }
          else{
            token.current=data;
            console.log(token.current);
            setIsEmailauthBtn(true)
            setIsButtonCheck(true)
            setchangeVisibled(true)
            setIsInputEmailAuthCheck(true)
            setEmailauthMessage([<ErrorMessageBox margin={"-9px 0px 0px 8px"}><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><ErrorMessageText>인증번호가 일치합니다.</ErrorMessageText></ErrorMessageBox>])
          }
      })

      
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
                <EmailInput ref={inputRef} disabled={isEmailauthBtn} revert={MessageRevert} show = {isEmail} check = {isInputEmailCheck} placeholder='이메일을 입력해 주세요!' value={Email} onChange={Emailuser}/>
                <SendButton show = {isEmail} type="button" onClick={EmailCheck} disabled={isEmailAuthInputCheck ? isEmailauthBtn : true}><span>{isEmailBtn ? "재전송" : "전송"}</span></SendButton>
                </EmailAuthAllBox>
                </EmailAuthInputBox>
                <>
                {MessageChangeCheck ?
                <EmailFoundErrorMessage show = {MessageRevert} check={isEmailPoundCheck}>{EmailFoundCheckMessage}</EmailFoundErrorMessage> :
                Email.length > 0 && (<ErrorMessage color={isEmail}>{EmailMessage}</ErrorMessage>)}
                </>
                <EmailAuthBox show={isEmailBtn}>
                <Title position={"absolute"} marginTop={"-8px"}>인증번호</Title>
                <EmailAuthInput show={isInputEmailAuthCheck} check={isEmailauthBtn} disabled={isEmailauthBtn} placeholder='인증번호를 입력해 주세요!' value={Emailauth} onChange={EmailAuth}/>
                <EmailAuthBtn show={isEmailauthBtn} type="button" onClick={EmailAuthCheck} disabled={isEmailauthBtn}><span>{isButtonCheck ? "인증완료" : "인증확인"}</span></EmailAuthBtn>
                <ErrorMessage2 color = {isEmailauthBtn}>{EmailauthMessage}</ErrorMessage2>
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
           {/*  <AnotherList>
              <Login onClick={() => ScrollTop()}><Link to='/Login' >로그인</Link></Login>
              <Sign onClick={() => ScrollTop()}><Link to='/SelectSign'>회원가입</Link></Sign>
            </AnotherList> */}
            </AnotherRoute>
            </EmPwForm>
        </EmPwFoundT>
    );
}

export const EmPwInformation = styled.div
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
    border: none;
    box-shadow: ${props => props.check ? props.revert ? props.show ? `0 0 0 2px ${props.theme.successColor} inset` : `0 0 0 2px ${props.theme.errorColor} inset` : `0 0 0 2px ${props.theme.errorColor} inset` : "none"};
    border-radius: 10px;
    caret-color:  ${(props) => props.theme.textColor};
    background-color: #dee2e6;
    font-size:15px;
    outline: none;
    &:focus
    {
      box-shadow: ${props => props.check ? props.show ? `0 0 0 2px ${props.theme.successColor} inset` : `0 0 0 2px ${props.theme.errorColor} inset` : `0 0 0 2px ${props.theme.borderColor} inset`};
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
    margin: 0px;
    padding: 0px;
    color: ${(props) => props.color ? props.theme.successColor : props.theme.errorColor};
    font-size: 15px;
`
const ErrorMessage2=styled(ErrorMessage)
`
    margin: -5px 0px 7.7px -6px;
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
    height: 56.66px;
    border: none;
    box-shadow: "0 0 0 1px #dddddd inset";
    background: ${props => props.theme.buttonColor};
    border-radius: 0.4rem;
    cursor: pointer;
    color: white;
    font-size: 15px;
    margin-top: -3px; 
    &:active
    {
      opacity: 90%;
    }

    &:disabled
    {
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
    box-shadow: ${props => props.show ? props.check ?  `0 0 0 2px ${props.theme.successColor} inset` : `0 0 0 2px ${props.theme.errorColor} inset` : "none"};
    margin-top: 27px;

    &:focus
    {
      box-shadow: ${props => props.show ? props.check ?  `0 0 0 2px ${props.theme.successColor} inset` : `0 0 0 2px ${props.theme.errorColor} inset` : `0 0 0 2px ${props.theme.borderColor} inset`};
    }
`

const EmailAuthBtn = styled.button
`
    margin-left: 10px;
    width: 100px;
    height: 55px;
    border: none;
    background: ${props => props.theme.buttonColor};
    box-shadow: 0 0 0 1px #dddddd inset;
    border-radius: 0.4rem;
    cursor: pointer;
    color:white;
    font-size: 15px;
    margin-top: -3px;
    &:disabled
    {
        background: #aaaaaa;
        pointer-events: none;
    }
`

const PasswordChangeT = styled.div
`
    display: ${props => props.show ? "flex" : "none"};
    flex-direction: column;
    margin-top: 7px;
`

const PasswordChangeConfirmT = styled.div
`
    display: ${props => props.show ? "flex" : "none"};
    flex-direction: column;
    margin-top: 7px;
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
    border: none;
    outline: none;
    box-shadow: ${props => props.check ? props.show ? `0 0 0 2px ${props.theme.successColor} inset` : `0 0 0 2px ${props.theme.errorColor} inset` : "none"};
    border-radius: 10px;
    caret-color: ${(props) => props.theme.textColor};
    background-color: #dee2e6;
    font-size:15px;
    &:focus
    {
      box-shadow: ${props => props.check ? props.show ? `0 0 0 2px ${props.theme.successColor} inset` : `0 0 0 2px ${props.theme.errorColor} inset` : `0 0 0 2px ${props.theme.borderColor} inset`};
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

export const SumbitButton = styled.button
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
      box-shadow: 0 0 0 1px #dddddd inset;
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