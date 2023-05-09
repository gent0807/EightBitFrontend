import React from 'react';
import {RiErrorWarningFill} from "react-icons/ri";
import { Link } from "react-router-dom";


const Signinput = () => 
{
  const [Email, setEmail] = React.useState("");
  const [EmailCert, setEmailCert] = React.useState("");
  const [Pw, setPw] = React.useState("");
  const [PwConfirm, setPwConfirm] = React.useState("");
  const [Nickname, setNickname] = React.useState("");

  const [PwMessage, setPwMessage] = React.useState("");
  const [EmailMessage, setEmailMessage] = React.useState("");
  const [PwConfirmMessage, setPwConfirmMessage] = React.useState("");
  const [NicknameMessage, setNicknameMessage] = React.useState("");
  const [EmailCertCheckMessage, setEmailCertCheckMessage] = React.useState("");
  const [EmailCertCheckBtnMessage, setEmailCertCheckBtnMessage] = React.useState("");

  const [isPw, setIsPw] = React.useState(false);
  const [isPwConfirm, setIsPwConfirm] = React.useState(false);
  const [isEmail, setIsEmail] = React.useState(false);
  const [isNickname, setIsNickname] = React.useState(false);
  const [isEmailCertCheck, setIsEmailCertCheck] = React.useState(false);
  const [isEmailCertCheckBtn, setIsEmailCertCheckBtn] = React.useState(true);
  const [isInputCheck, setIsInputCheck] = React.useState(true);
  const [isConfirmCheck, setIsConfirmCheck] = React.useState(false);

  const [isVisibled, setVisibled] = React.useState(false);

  const OnEmailCertCheckBtn = ({text="인증하기"}) =>
  {
    setIsInputCheck(false)

    if(EmailCert === "123456")
    {
    setIsEmailCertCheck(true);
    setIsEmailCertCheckBtn(true);
    setIsConfirmCheck(true);
    setEmailCertCheckBtnMessage("인증완료");
    setEmailCertCheckMessage("");
    }
    else
    {
    setIsEmailCertCheck(false);
    setIsEmailCertCheckBtn(false);
    setIsConfirmCheck(false);
    setEmailCertCheckBtnMessage("인증하기");
    setEmailCertCheckMessage([<div style={{margin: "-13px 5px 6px", display: "flex" , position: "absolute" }}>
    <i style={{margin: "0px 5px 6px"}}
    ><RiErrorWarningFill/></i>
    <span style={{margin:"-2px 5px 6px"}}>인증번호가 일치하지 않습니다.</span>
    </div>]);
    }
  }


  const OnChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    const EmailCheck = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    if (!EmailCheck.test(currentEmail)) 
    {
        setEmailMessage([<div style={{margin: "-13px 5px 6px" , display: "flex" , position: "absolute" }}>
                        <i style={{margin: "0px 5px 6px"}}><RiErrorWarningFill/></i>
                        <span style={{margin:"-2px 5px 6px"}}>올바른 이메일을 작성해 주세요!</span>
                        </div>]);
        setIsEmail(false);
    }else{
        setEmailMessage("");
        setIsEmail(true);
    }
  };

  const OnChangeEmailCert = (e) => {
    const currentEmailCert = e.target.value;
    const onlynumber = currentEmailCert.replace(/[^0-9]/g, '');
    setEmailCert(onlynumber)
  };

  const OnChangePw = (e) => {
    const currentPw = e.target.value;
    setPw(currentPw);
    const PwCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

    if (!PwCheck.test(currentPw))
    {
        setPwMessage([<div style={{display: "flex" , position: "absolute" , margin: "-13px 5px 6px"}}>
        <i style={{margin: "0px 5px 6px"}}><RiErrorWarningFill/></i>
        <span style={{margin:"-2px 5px 6px"}}>숫자,영문자,특수문자 조합으로 8자리 이상 입력해주세요!</span>
        </div>]);
        setIsPw(false);
    }else{
        setPwMessage("");
        setIsPw(true);
    }
  };

  const OnChangePwConfirm = (e) => {
    const currentPwConfirm = e.target.value;
    setPwConfirm(currentPwConfirm);

    if(Pw !== currentPwConfirm)
    {
      setPwConfirmMessage([<div style={{display: "flex" , position: "absolute" , margin: "-13px 5px 6px"}}>
      <i style={{margin: "0px 5px 6px"}}><RiErrorWarningFill/></i>
      <span style={{margin:"-2px 5px 6px"}}>비밀번호가 일치하지 않습니다.</span>
      </div>]);
      setIsPwConfirm(false);
    }else{
      setPwConfirmMessage("");
      setIsPwConfirm(true);
    }
  };

  const OnChangeNickname = (e) => {
    const currentNickname = e.target.value;
    setNickname(currentNickname);

    if(currentNickname.length > 6 || currentNickname.length < 2)
    {
      setNicknameMessage([<div style={{ display: "flex" , position: "absolute" ,margin: "10px 5px 6px"}}>
      <i style={{margin: "0px 5px 6px"}}><RiErrorWarningFill/></i>
      <span style={{margin:"-2px 5px 6px"}}>닉네임은 2자리에서 5자리 내로 작성해주세요!</span>
      </div>])
      setIsNickname(false);
    }else{
      setNicknameMessage("")
      setIsNickname(true);
    }

  }

  const Visibled = () => 
  {
    setVisibled(true);
  }

  return (
  <div className='SignT'>
          <div className='Sign-Top'>
            <Link to='/'><img className='LOGO' src='img/8bit.png' alt='로고'/></Link>
          </div>
          <div className='SignInput'>
            <div className='infor'>
            <span className='title'>회원가입</span>
            </div>
            <div className='emailcheck'>
            <label htmlFor="email">이메일</label>
            <div className='Input-Email'>
            <input 
            id='email'
            className={Email.length > 0 && `email ${isEmail ? 'success' : 'error'}`}
            type="text"
            value={Email}
            onChange={OnChangeEmail}
            />
            <button 
            className={`Cert ${isEmail ? 'enabled' : 'disabled'}`}
            disabled={!isEmail}
            onClick={Visibled}
            >
            <span>인증요청</span>
            </button>
            </div>
            {Email.length > 0 && (
            <p className={`emailMessage ${isEmail ? 'success' : 'error'}`}>{EmailMessage}</p>
          )}
          <div 
          className={`emailCheckT ${isVisibled ? 'visibled' : 'disibled' }`}
          >
          <label htmlFor="emailCert">인증번호</label>
          <div className='Input-EmailCheck'>
            <input 
            id='emailCert'
            className={isInputCheck ? 'emailCert' : `emailCert ${isEmailCertCheckBtn ? 'success' : 'error'}`}
            maxLength={6}
            type="text"
            value={EmailCert}
            onChange={OnChangeEmailCert}
            />
             <button 
            className={`CertCheck ${isEmailCertCheck ? 'success' : 'error' }`}
            onClick={OnEmailCertCheckBtn}
            ><span>{isEmailCertCheck ? EmailCertCheckBtnMessage : "인증하기"}</span>
            </button>
            </div>
            </div>
            <p className={`emailCertBtnMessage ${isEmailCertCheckBtn ? 'success' : 'error'}`}>{EmailCertCheckMessage}</p>
          </div>
          <div className='PwCheck'>
          <label htmlFor="Pw">비밀번호</label>
            <input 
            id='Pw'
            className={Pw.length > 0 && `Pw ${isPw ? 'success' : 'error'}`}
            type="password"
            value={Pw}
            onChange={OnChangePw}
            />
            {Pw.length > 0 && (
            <p className={`PwMessage ${isPw ? 'success' : 'error'}`}>{PwMessage}</p>
          )}
          </div>
          <div className='PwConfirmCheck'>
          <label htmlFor="PwConfirm">비밀번호 확인</label>
            <input 
            id='PwConfirm'
            className={PwConfirm.length > 0 && `PwConfirm ${isPwConfirm ? 'success' : 'error'}`}
            type="password"
            value={PwConfirm}
            onChange={OnChangePwConfirm}
            />
            {PwConfirm.length > 0 && (
            <p className={`PwConfirmMessage ${isPwConfirm ? 'success' : 'error'}`}>{PwConfirmMessage}</p>
          )}
          </div>
          <div className='NicknameCheck'>
          <label htmlFor="Nickname">닉네임</label>
            <input 
            id='Nickname'
            className={Nickname.length > 0 && `Nickname ${isNickname ? 'success' : 'error'}`}
            type="text"
            value={Nickname}
            onChange={OnChangeNickname}
            />
            {Nickname.length > 0 && (
            <p className={`NicknameMessage ${isNickname ? 'success' : 'error'}`}>{NicknameMessage}</p>
          )}
          </div>
          </div>
          <div className='SIGNBTN'>
          <button 
          className='SIGNbtn'
          type='submit'
          disabled={!(isEmail && isPw && isPwConfirm && isNickname && isConfirmCheck)}
          >
          <span>회원가입</span>
          </button>
        </div>
    </div>
  );
}

export default Signinput;