import React from 'react';
import {FcGoogle} from "react-icons/fc";
import {FaFacebookF} from "react-icons/fa";
import {SiNaver} from "react-icons/si";
import {AiOutlineTwitter} from "react-icons/ai";
import {RiErrorWarningFill} from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Logininput = () => 
{
    const [Email, setEmail] = React.useState("");
    const [Pw, setPw] = React.useState("");
    const [loginCheck,setLoginCheck]=React.useState("");
  
    const [Allmessage, setAllMessage] = React.useState("");
  
    const [isAll, setIsAll] = React.useState(false);
    
    const navigate=useNavigate();
  
    const OnChangeEmail = (e) => {
      const currentId = e.target.value;
      setEmail(currentId);
    }
  
    const OnChangePw = (e) => {
      const currentPw = e.target.value;
      setPw(currentPw);
    }
    const OnCheckSubmit = () =>
    {
      if ((Email === "" && Pw === "") || (Email === "" && Pw !== "") || (Email !== "" && Pw === ""))
      { 
        setAllMessage([<div style={{display: "flex"}}><i style={{margin: "1px 9px 0px"}}><RiErrorWarningFill/></i><span style={{margin : "0px 0px 0px 0px"}}>이메일과 비밀번호를 입력해 주세요!</span></div>]);
        setIsAll(false);
      }else{
        setAllMessage("");
        setIsAll(true);
        /*fetch(`http://localhost:8033/EightBitBackend/user/loginCheck/`, {
          method:"POST",
          headers:{
            "Content-Type":"application/json",
          },
          body: JSON.stringify({
            email:Email,
            password:Pw
          })
        }).
        then(res=>{
          return res.text();
        })
        .then(data=>{
          setLoginCheck(data);
        })*/
        axios.post("http://localhost:8033/EightBitBackend/user/loginCheck/",{
          headers:{
            'Content-Type':'application/json'
          },
          data:{
            email:Email,
            password:Pw
          },
        })
        .then(res=>{
          return res.data;
        })
        .then(data=>{
          setLoginCheck(data);
        });
        if(loginCheck=="allok"){
          console.log("로그인 가능");
          navigate("/");
        }
        else if(loginCheck=="emailok"){
          console.log("비밀번호가 틀렸습니다.");
        }
        else if(loginCheck=="no"){
          console.log("가입되지 않은 이메일입니다.");
        }
      }
    }
  
    let textRef = React.useRef(null);
  
    React.useEffect(() => {
      function handleOuside(e) {
        if (textRef.current && !textRef.current.contains(e.target)) {
          setIsAll(true);
        }
      }
      document.addEventListener("mousedown", handleOuside);
      return () => {
        document.removeEventListener("mousedown", handleOuside);
      };
    }, [textRef])
  
    return(
      <div className="LoginT"> 
          <div className="login-top">
          <Link to='/'><img className='LOGO' src='img/8bit.png' alt='로고'/></Link>
          </div>
          <div className="login-input">
          <div className='loginT'>
          <input 
            id="Email" 
            type="text" 
            value={Email}
            placeholder="이메일" 
            className="ID"
            onChange={OnChangeEmail}
          />
          <input 
            id="pw" 
            type="password" 
            value={Pw}
            placeholder="비밀번호" 
            className="PW"
            onChange={OnChangePw}
          />
         {((!Email && !Pw) || (Email && !Pw) || (!Email && Pw)) && (<p ref={textRef} onClick={() => {setIsAll(true)}} className={`Allmessage ${isAll ? 'success' : 'error'}`}>{Allmessage}</p>)}
          <div className="LOGINCON">
          <input
            id="check"
            type="checkbox"
            className="checkbox"
          />
          <p className="checkT">로그인 유지</p>
          <div className="CONPRE">
          <span>개인정보 보호를 위해 개인 PC에서만 사용하세요.</span>
          </div>
          </div>
          <div className="BTNT">
          <button 
            type="submit" 
            className="btn"
            onClick={OnCheckSubmit}
          ><span>로그인</span>
          </button>
          </div>
          </div>
          <div className='APIZONE'>
          <p className="line"><span className="lineT">또는</span></p>
          <ul className='API'>
            <li><a href='#' className='google'><FcGoogle /></a></li>
            <li><a href='#' className='facebook'><FaFacebookF color='white'/></a></li>
            <li><a href='#' className='naver'><SiNaver color='white'/></a></li>
            <li><a href='#' className='twitter'><AiOutlineTwitter color='white'/></a></li>
          </ul>
          <ul className='SIGN'>
            <li><Link to='/EmailPwFound' className='F' >이메일/비밀번호 찾기</Link></li>
            <li><Link to='/SIGN' className='F2'>회원가입</Link></li>
          </ul>
          </div>
        </div>
      </div>
    );
}

export default Logininput;