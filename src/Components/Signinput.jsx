import { useState, useEffect, useRef } from 'react';
import {RiErrorWarningFill} from "react-icons/ri";
import { Link } from "react-router-dom";


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
  const [EmailCertCheckBtnMessage, setEmailCertCheckBtnMessage] = useState("");

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


  const [isVisibled, setVisibled] = useState(false);

  let inputFocus = useRef(null);
  let textRef = useRef(null);
  
    useEffect(() => {
      function handleOuside(e) {
        if (textRef.current && !textRef.current.contains(e.target)) {
            setIsSelectBtnCheck(true);
        }
      };

      if(isSelectBtnCheck) {
      document.addEventListener("mousedown", handleOuside);
      }
      return () => {
        document.removeEventListener("mousedown", handleOuside);
      };
    }, [textRef])


  const OnSelectValue = (e) =>
  {
      const {innerText} = e.target;

      setSelectValue(innerText);
      setIsInputDirect(false);
  }

  const VisibleDirect = () =>
  {
    setInputDirect("");
    setIsInputDirect(true);
    return inputFocus.current.focus();
  }

  const OnInputDirect = (e) =>
  {
    const InputDirect = e.target.value;
    const onlytext = InputDirect.replace(/[~!@#$%^&*()_+|<>?:{}]/g, '');
    setInputDirect(onlytext)
    setSelectValue(InputDirect)
  }

  const OnEmailCertCheckBtn = () =>
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
    setEmailCertCheckMessage([<div style={{margin: "-13px 5px 6px", display: "flex" , position: "absolute" }}>
    <i style={{margin: "0px 5px 6px"}}
    ><RiErrorWarningFill/></i>
    <span style={{margin:"-2px 5px 6px"}}>인증번호가 일치하지 않습니다.</span>
    </div>]);
    }
  }


  const OnChangeEmail = (e) => {
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

  const OnChangeEmailCert = (e) => {
    const currentEmailCert = e.target.value;
    const onlynumber = currentEmailCert.replace(/[^0-9]/g, '');
    setEmailCert(onlynumber)
    if(!EmailCert)
    {
      setIsEmailCertCheckBtn(false);
    }
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
    const EmailTotal = Email + "@" + SelectValue;

    const test = "khs64101014@gmail.com"

    if(EmailTotal === test )
    {
      setEmailMessage([<div style={{ display: "flex" , position: "absolute" ,margin: "10px 5px 6px"}}>
      <i style={{margin: "-19px 5px 6px"}}><RiErrorWarningFill/></i>
      <span style={{margin:"-19px 5px 6px", zIndex:-1}}>이미 존재하는 이메일 입니다.</span>
      </div>])
      setVisibled(false);
    }
    else
    {
      setVisibled(true);
    }
      
    

  }

  const OnSumbit = (e) =>
    {
      e.preventDefault();
      if ( Email === "" || EmailCert === "" || Pw === "" || PwConfirm === "" || Nickname === "" )
      {
        return;
      }
    }

  return (
  <div className='SignT'>
          <div className='Sign-Top'>
            <Link to='/'><img className='LOGO' src='img/8bit.png' alt='로고'/></Link>
          </div>
          <form onSubmit={OnSumbit}>
          <div className='SignInput'>
            <div className='infor'>
            <span className='title'>회원가입</span>
            </div>
            <div className='emailcheck'>
            <label htmlFor="email">이메일</label>
            <div className='Input-Email'>
            <input 
            id='email'
            className="email"
            type="text"
            value={Email}
            onChange={OnChangeEmail}
            />
            <input 
            id='InputDirect'
            onClick={() => setIsSelectBtnCheck(!isSelectBtnCheck)}
            className={`InputDirectT ${isInputDirect ? "ON" : "OFF"}`}
            type="text"
            value={InputDirect}
            ref={inputFocus}
            onChange={OnInputDirect}
            />
            <span className='emailtext'>@</span>
            <div ref={textRef} className={`selectbox ${isSelectBtnCheck ? 'empty' : 'full'}`} onClick={() => setIsSelectBtnCheck(!isSelectBtnCheck)}>
              <ul className={`optionlist ${isSelectBtnCheck ? "empty" : "full"}`}>
                <li value="naver.com" onClick={OnSelectValue}>naver.com</li>
                <li value="gmail.com" onClick={OnSelectValue}>gmail.com</li>
                <li value="hanmail.net" onClick={OnSelectValue}>hanmail.net</li>
                <li value="nate.com" onClick={OnSelectValue}>nate.com</li>
                <li value="daum.net" onClick={OnSelectValue}>daum.net</li>
                <li value="outlook.com" onClick={OnSelectValue}>outlook.com</li>
                <li onClick={VisibleDirect}><span className="InputDirect">직접입력</span></li>
              </ul>
              <span className='Value'>{SelectValue}</span>
              {isSelectBtnCheck ? <div className={`Allow ${isSelectBtnCheck ? "empty" : "full"}`}>▼</div> : <div className={`Allow ${isSelectBtnCheck ? "empty" : "full"}`}>▲</div>}
            </div>
            <button 
            className={`Cert ${isEmail ? 'enabled' : 'disabled'}`}
            disabled={!isEmail}
            onClick={Visibled}
            >
            <span>인증요청</span>
            </button>
            </div>
            <p className={`emailMessage ${isVisibled ? 'success' : 'error'}`}>{EmailMessage}</p>
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
        </form>
    </div>
  );
}

export default Signinput;