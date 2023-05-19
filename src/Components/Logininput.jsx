import React, { useState, useEffect, useRef } from 'react';
import {FcGoogle} from "react-icons/fc";
import {FaFacebookF} from "react-icons/fa";
import {SiNaver} from "react-icons/si";
import {AiOutlineTwitter} from "react-icons/ai";
import {RiErrorWarningFill} from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Logininput = () => 
{                 
    const [email, setemail] = React.useState('');
    const [pw, setpw] = React.useState('');
    //const [loginCheck,setLoginCheck]=React.useState('');
    const [message,setMessage]=React.useState(''); 
    const navigate=useNavigate();
    let loginCheck;
    

    //console.log(email);
    //console.log(pw);
    //console.log(loginCheck);
    //console.log(message);

    const OnChangeemail = (e) => {
      const currentemail = e.target.value;
      setemail(currentemail);
    }
  
    const OnChangepw = (e) => {
      const currentpw = e.target.value;
      setpw(currentpw);
    }

    const OnCheckSubmit = (e) =>
    {   
        e.preventDefault();
        if(email==""&&pw==""){
          setMessage([<div style={{display: "flex"}}><i style={{margin: "1px 9px 0px"}}><RiErrorWarningFill/></i><span style={{margin : "0px 0px 0px 0px"}}>이메일과 패스워드를 입력하세요!</span></div>])
        }
        else if(email!=""&&pw==""){
          setMessage([<div style={{display: "flex"}}><i style={{margin: "1px 9px 0px"}}><RiErrorWarningFill/></i><span style={{margin : "0px 0px 0px 0px"}}>패스워드를 입력하세요!</span></div>])
        }
        else if(email==""&&pw!=""){
          setMessage([<div style={{display: "flex"}}><i style={{margin: "1px 9px 0px"}}><RiErrorWarningFill/></i><span style={{margin : "0px 0px 0px 0px"}}>이메일을 입력하세요!</span></div>])
        }
        else{
        /*fetch(`http://localhost:8033/EightBitBackend/user/loginCheck/`, {
          method:"POST",
          headers:{
            "Content-Type":"application/json",
          },
          body: JSON.stringify({
            email:email,
            password:pw
          })
        }).
        then(res=>{
          return res.text();
        })
        .then(data=>{
          setLoginCheck(data);
        })*/
        axios.post("http://localhost:8033/EightBitBackend/user/loginCheck/",{
            email:email,
            password:pw
          } 
        )
        .then(res=>{
          return res.data;
        })
        .then(data=>{
          
          loginCheck=data;
          if(loginCheck=="allok"){
            console.log("로그인 가능");
            setMessage([<div style={{display: "flex"}}><i style={{margin: "1px 9px 0px"}}><RiErrorWarningFill/></i><span style={{margin : "0px 0px 0px 0px"}}>로그인 가능</span></div>])
            //navigate("/");
          }
          else if(loginCheck=="emailok"){
            console.log("비밀번호가 틀렸습니다.");
            setMessage([<div style={{display: "flex"}}><i style={{margin: "1px 9px 0px"}}><RiErrorWarningFill/></i><span style={{margin : "0px 0px 0px 0px"}}>비밀번호가 틀렸습니다!</span></div>])
          }
          else if(loginCheck=="no"){
            console.log("가입되지 않은 이메일입니다.");
            setMessage([<div style={{display: "flex"}}><i style={{margin: "1px 9px 0px"}}><RiErrorWarningFill/></i><span style={{margin : "0px 0px 0px 0px"}}>가입되지 않은 이메일입니다!</span></div>])
          }            
        });

        /*if(loginCheck=="emailok"){   <- 위에 함수 호출로 인한 실행과 비동기적이기 때문에 위에서의 loginCheck와는 동기화되지 않는다. 즉 최초의 submit 이벤트 처리시에는 axios 함수에서의 loginCheck와 axios와 비동기적으로 실행되는 if문에서의 loginCheck는 다를 수 밖에 없다.
            console.log('까비');           
        }*/

        
        
      }

    }

    return(
      <div className="LoginT"> 
          <div className="login-top">
          <Link to='/'><img className='LOGO' src='img/8bit.png' alt='로고'/></Link>
          </div>
          <div className="login-input">
          <div className='loginT'>
          <form onSubmit={OnCheckSubmit}>
          <input 
            id="email" 
            type="text" 
            placeholder="이메일" 
            className="ID"
            onChange={OnChangeemail}
          />
          <input 
            id="pw" 
            type="password" 
            placeholder="비밀번호" 
            className="PW"
            onChange={OnChangepw}
          />
          <p className='message'>{message}</p>
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
          ><span>로그인</span>
          </button>
          </div>
          </form>
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
            <li><Link to='/emailpwFound' className='F' >이메일/비밀번호 찾기</Link></li>
            <li><Link to='/SIGN' className='F2'>회원가입</Link></li>
          </ul>
          </div>
        </div>
        
      </div>
    );
}

export default Logininput;