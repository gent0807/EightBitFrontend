import React from 'react';
import '../CSS/EmailPwFound.css';
import { Link } from "react-router-dom";

const EmailPwFound = () => 
{
    const EmailCheck = (e) =>
    {
        const currentId = e.target.value;
        setEmail(currentId)
    }

    const Visibled = () => 
    {
        setVisibled(true);
    }

    const [Email, setEmail] = React.useState("");
    const [EmailMessage, setEmailMessage] = React.useState("");
    const [isEmail, isEmailMessage] = React.useState("");
    const [visibled, setVisibled] = React.useState(false);

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
                <input 
                id='Email'
                type="text"
                className='EmailInput'
                placeholder='이메일을 입력해 주세요!'
                value={Email}
                onChange={EmailCheck}
                />
              <button 
                className={`Send ${Email ? 'enabled' : 'disabled'}`}
                disabled={!Email}
                onClick={Visibled}
                >
                <span style={{fontWeight: "bold", fontSize: "17px"}}>전송</span>
              </button>
            </div>
            </div>
        </div>
        
    );
}

export default EmailPwFound;