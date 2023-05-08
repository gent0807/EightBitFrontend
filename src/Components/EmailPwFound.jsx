import React from 'react';
import '../CSS/EmailPwFound.css';
import { Link } from "react-router-dom";

const EmailPwFound = () => 
{
    const Emailuser = (e) =>
    {
        const currentId = e.target.value;
        setEmail(currentId)
    }

    const EmailAuth = (e) =>
    {
        const currentId = e.target.value;
        setEmailauth(currentId)
    }

    const PasswordChange = (e) =>
    {
        const currentId = e.target.value;
        setPasswordChange(currentId)
    }

    const PasswordChangeConfirm = (e) =>
    {
        const currentId = e.target.value;
        setPasswordChangeConfirm(currentId)
    }

    const EmailCheck = () =>
    {
    }

    const EmailAuthCheck = () =>
    {
    }

    const ChangeBtn = () =>
    {
    }

    const [Email, setEmail] = React.useState("");
    const [Emailauth, setEmailauth] = React.useState("");
    const [passwordChange, setPasswordChange ] = React.useState("");
    const [passwordChangeConfirm, setPasswordChangeConfirm ] = React.useState("");

    const [EmailMessage, setEmailMessage] = React.useState("");
    const [EmailauthMessage, setEmailauthMessage] = React.useState("");
    const [passwordChangeMessage, setPasswordChangeMessage ] = React.useState("");
    const [passwordChangeConfirmMessage, setPasswordChangeConfirmMessage ] = React.useState("");

    const [isEmail, setIsEmail] = React.useState(false);
    const [isEmailauth, setIsEmailauth] = React.useState(false);
    const [ispasswordChange, setIsPasswordChange ] = React.useState("");
    const [ispasswordChangeConfirm, setIsPasswordChangeConfirm ] = React.useState("");

    const [authVisibled, setauthVisibled] = React.useState(false);
    const [changeVisibled, setchangeVisibled] = React.useState(false);

    return(
        <div className='EmPwFoundT'>
            <div className='EmPwFound-Top'>
            <Link to='/'><img className='LOGO' src='img/8bit.png' alt='로고'/></Link>
            </div>
            <div className='EmPwFoundL'>
            <div className='inFor'>
            <span className='title'>이메일/비밀번호 찾기</span>
            </div>
            <div className='EmPwFoundIuput'>
                <div className='EmallIuputT'>
                <input 
                id='EmailCheck'
                type="text"
                className='EmailInput'
                placeholder='이메일을 입력해 주세요!'
                value={Email}
                onChange={Emailuser}
                />
              <button 
                className={`Send ${Email ? 'enabled' : 'disabled'}`}
                disabled={!Email}
                onClick={EmailCheck}
                >
                <span style={{fontWeight: "bold", fontSize: "17px"}}>전송</span>
              </button>
              <div className='EmallAuthInputT'>
                <input 
                id='EmailCheck'
                type="text"
                className='EmailAuthInput'
                placeholder='인증번호를 입력해 주세요!'
                value={Emailauth}
                onChange={EmailAuth}
                />
              <button 
                className={`Send ${Emailauth ? 'enabled' : 'disabled'}`}
                disabled={!Emailauth}
                onClick={EmailAuthCheck}
                >
                <span style={{fontWeight: "bold", fontSize: "17px"}}>인증확인</span>
              </button>
              </div>
              <div className='PasswordChangeT'>
                <input 
                id='EmailPasswordChange'
                type="text"
                className='PasswordChangeInput'
                placeholder='새 비밀번호를 입력해 주세요!'
                value={passwordChange}
                onChange={PasswordChange}
                />
              </div>
              <div className='PasswordChangeConfirmT'>
                <input 
                id='EmailPasswordChange'
                type="text"
                className='PasswordChangeConfirmInput'
                placeholder='새 비밀번호를 다시 입력해 주세요!'
                value={passwordChangeConfirm}
                onChange={PasswordChangeConfirm}
                />
              </div>
              </div>
            </div>
            <div className='EmailPwChangeBtn'>
                <button 
                type="submit" 
                className='ChangeBtn'>
                    <span>완료</span>
                </button>
            </div>
            </div>
        </div>
    );
}

export default EmailPwFound;