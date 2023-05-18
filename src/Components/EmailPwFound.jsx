import { useState, useEffect, useRef } from 'react';
import '../CSS/EmailPwFound.css';
import { Link } from "react-router-dom";
import {RiErrorWarningFill} from "react-icons/ri";

const EmailPwFound = () => 
{

    const [Email, setEmail] = useState("");
    const [Emailauth, setEmailauth] = useState("");
    const [PasswordChangeE, setPasswordChange ] = useState("");
    const [PasswordChangeConfirmM, setPasswordChangeConfirm ] = useState("");

    const [EmailMessage, setEmailMessage] = useState("");
    const [EmailauthMessage, setEmailauthMessage] = useState("");
    const [PasswordChangeMessage, setPasswordChangeMessage ] = useState("");
    const [PasswordChangeConfirmMessage, setPasswordChangeConfirmMessage ] = useState("");
    const [ButtonText, setButtonText] = useState("");

    const [isEmail, setIsEmail] = useState(false);
    const [isEmailBtn, setIsEmailBtn] = useState(false);
    const [isEmailauthBtn, setIsEmailauthBtn] = useState(false);
    const [isInputCheck, setIsInputCheck] = useState(true);
    const [isButtonCheck, setIsButtonCheck] = useState(false);
    const [isPasswordChange, setIsPasswordChange ] = useState(false);
    const [isPasswordChangeConfirm, setIsPasswordChangeConfirm ] = useState(false);

    const [changeVisibled, setchangeVisibled] = useState(false);

    const Emailuser = (e) =>
    {
      const EmailCheck = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
      const currentEmail = e.target.value;
      setEmail(currentEmail);

    if (!EmailCheck.test(currentEmail)) 
      {
        setEmailMessage([<div style={{margin: "-13px 5px 6px" , display: "flex"  }}>
                        <i style={{margin: "0px 5px 6px"}}><RiErrorWarningFill/></i>
                        <span style={{margin:"-2px 5px 6px"}}>올바른 이메일을 작성해 주세요!</span>
                        </div>]);
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
        const onlynumber = currentEmailCert.replace(/[^0-9]/g, '');
        setEmailauth(onlynumber)
    }

    const PasswordChange = (e) =>
    {
        const currentId = e.target.value;
        setPasswordChange(currentId)
        const PwCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

        if(!PwCheck.test(currentId))
        {
          setPasswordChangeMessage([<div style={{display: "flex" , position: "absolute" , margin: "-13px 5px 6px"}}>
          <i style={{margin: "0px 5px 6px"}}><RiErrorWarningFill/></i>
          <span style={{margin:"-2px 5px 6px"}}>숫자,영문자,특수문자 조합으로 8자리 이상 입력해주세요!</span>
          </div>])
          setIsPasswordChange(false)
        }
        else
        {
          setPasswordChangeMessage("")
          setIsPasswordChange(true)
        }
    }

    const PasswordChangeConfirm = (e) =>
    {
        const currentId = e.target.value
        setPasswordChangeConfirm(currentId)

        if(PasswordChangeE !== currentId)
        {
          setPasswordChangeConfirmMessage([<div style={{display: "flex" , position: "absolute" , margin: "-13px 5px 6px"}}>
          <i style={{margin: "0px 5px 6px"}}><RiErrorWarningFill/></i>
          <span style={{margin:"-2px 5px 6px"}}>비밀번호가 일치하지 않습니다!</span>
          </div>])
          setIsPasswordChangeConfirm(false)
        }
        else
        {
          setPasswordChangeConfirmMessage("")
          setIsPasswordChangeConfirm(true)
        }
    }

    const EmailCheck = () =>
    {
        setIsEmailBtn(true)


    }
    
    const OnSumbit = (e) =>
    {
      e.preventDefault();
      if ( Email === "" || Emailauth === "" || PasswordChangeE === "" || PasswordChangeConfirmM === "" )
      {
        return;
      }
      
      setEmail("");
      setEmailauth("");
      PasswordChangeE("");
      PasswordChangeConfirmM("");
    }
  

    const EmailAuthCheck = ({text}) =>
    {
      setIsInputCheck(false)

      if(Emailauth === "123456")
        {   
          setButtonText("인증완료")
          setIsEmailauthBtn(true)
          setIsButtonCheck(true)
          setchangeVisibled(true)
        }
        else
        {
          setIsButtonCheck(false)
          setIsEmailauthBtn(false)
          setchangeVisibled(false)
          setEmailauthMessage([<div style={{margin: "-13px 5px 6px", display: "flex" , position: "absolute" }}>
          <i style={{margin: "0px 5px 6px"}}
          ><RiErrorWarningFill/></i>
          <span style={{margin:"-2px 5px 6px"}}>인증번호가 일치하지 않습니다.</span>
          </div>])
        }
       
    }

    return (
        <div className='EmPwFoundT'>
            <div className='EmPwFound-Top'>
            <Link to='/'><img className='LOGO' src='img/8bit.png' alt='로고'/></Link>
            </div>
            <form onSubmit={OnSumbit}>
            <div className='EmPwFoundL'>
            <div className='inFor'>
            <span className='title'>이메일/비밀번호 찾기</span>
            </div>
            <div className='EmPwFoundIuput'>
                <div className='EmallIuputT'>
                <input 
                id='EmailCheck'
                type="text"
                className={Email.length > 0 && `EmailInput ${isEmail ? 'success' : `error`}`}
                placeholder='이메일을 입력해 주세요!'
                value={Email}
                onChange={Emailuser}
                />
              <button 
                className={`Send ${isEmail ? 'enabled' : 'disabled'}`}
                onClick={EmailCheck}
                >
                <span>전송</span>
              </button>
              {Email.length > 0 && (<p className={`emailMessage ${isEmail ? 'success' : 'error'}`}>{EmailMessage}</p>)}
              <div className={`EmallAuthInputT ${isEmailBtn ? 'success' : 'error'}`}>
                <input 
                id='EmailCheck'
                type="text"
                className={isInputCheck ? 'EmailAuthInput' : `EmailAuthInput ${isEmailauthBtn ? 'success' : 'error'}`}
                placeholder='인증번호를 입력해 주세요!'
                value={Emailauth}
                onChange={EmailAuth}
                maxLength={6}
                />
              <button 
                className={`EmailAuthInputBtn ${isEmailauthBtn ? 'success' : 'error'}`}
                onClick={EmailAuthCheck}
                >
                <span style={{fontWeight: "bold", fontSize: "17px"}}>{isButtonCheck ? ButtonText : "인증확인"}</span>
              </button>
              <p className={`emailMessage ${isEmailauthBtn ? 'success' : 'error'}`}>{EmailauthMessage}</p>
              </div>
              <div className={`PasswordChangeT ${changeVisibled ? 'success' : 'error'}`}>
                <input 
                id='EmailPasswordChange'
                type="password"
                className={PasswordChangeE.length > 0 && `PasswordChange ${isPasswordChange ? 'success' : 'error'}`}
                placeholder='새 비밀번호를 입력해 주세요!'
                value={PasswordChangeE}
                onChange={PasswordChange}
                />
              </div>
              {PasswordChangeE.length > 0 && (<p className={`emailMessage ${isPasswordChange ? 'success' : 'error'}`}>{PasswordChangeMessage}</p>)}
              <div className={`PasswordChangeConfirmT ${changeVisibled ? 'success' : 'error'}`}>
                <input 
                id='EmailPasswordChange'
                type="password"
                className={PasswordChangeConfirmM.length > 0 && `PasswordChangeConfirm ${isPasswordChangeConfirm ? 'success' : 'error'}`}
                placeholder='새 비밀번호를 다시 입력해 주세요!'
                value={PasswordChangeConfirmM}
                onChange={PasswordChangeConfirm}
                />
              </div>
              {PasswordChangeConfirmM.length > 0 && (<p className={`emailMessage ${isPasswordChangeConfirm ? 'success' : 'error'}`}>{PasswordChangeConfirmMessage}</p>)}
              </div>
            </div>
            <div className='EmailPwChangeBtn'>
                <button 
                type="submit" 
                className='ChangeBtn'
                disabled={!(isEmail && isEmailauthBtn && isPasswordChange && isPasswordChangeConfirm)}
                >
                    <span>완료</span>
                </button>
            </div>
            </div>
            </form>
        </div>
    );
}

export default EmailPwFound;