import React, { useState } from 'react';
import {FcGoogle} from "react-icons/fc";
import {FaFacebookF} from "react-icons/fa";
import {SiNaver} from "react-icons/si";
import {AiOutlineTwitter} from "react-icons/ai";
import {RiErrorWarningFill} from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { styled } from 'styled-components';

const Logininput = () => 
{                 
    const [Email, setEmail] = useState('');
    const [Pw, setPw] = useState('');
    //const [loginCheck,setLoginCheck]=React.useState('');
    const [message,setMessage] = useState('');
    const [isShow, setIsShow] = useState(false);
    let loginCheck;


    const Show = () =>
    {
      setIsShow(!isShow);
    } 

    const OnChangeEmail = (e) => {
      const currentEmail = e.target.value;
      setEmail(currentEmail);
      console.log(Email);
    }
  
    const OnChangePw = (e) => {
      const currentPw = e.target.value;
      setPw(currentPw);
      console.log(Pw);
    }

    const OnCheckSubmit = (e) =>
    {   
        e.preventDefault();
        if(Email==""&&Pw==""){
          setMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><span>이메일과 패스워드를 입력하세요!</span></ErrorMessageBox>])
        }
        else if(Email!=""&&Pw==""){
          setMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><span>패스워드를 입력하세요!</span></ErrorMessageBox>])
        }
        else if(Email==""&&Pw!=""){
          setMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><span>이메일을 입력하세요!</span></ErrorMessageBox>])
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
            email:Email,
            password:Pw
          } 
        )
        .then(res=>{
          return res.data;
        })
        .then(data=>{
          
          loginCheck=data;
          if(loginCheck=="allok"){
            console.log("로그인 가능");
            setMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><span>로그인 가능</span></ErrorMessageBox>])
            //navigate("/");
          }
          else if(loginCheck=="emailok"){
            console.log("비밀번호가 틀렸습니다.");
            setMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><span>비밀번호가 틀렸습니다!</span></ErrorMessageBox>])
          }
          else if(loginCheck=="no"){
            console.log("가입되지 않은 이메일입니다.");
            setMessage([<ErrorMessageBox><ErrorMessageIcon><RiErrorWarningFill/></ErrorMessageIcon><span>가입되지 않은 이메일입니다!</span></ErrorMessageBox>])
          }            
        });

        /*if(loginCheck=="emailok"){   <- 위에 함수 호출로 인한 실행과 비동기적이기 때문에 위에서의 loginCheck와는 동기화되지 않는다. 즉 최초의 submit 이벤트 처리시에는 axios 함수에서의 loginCheck와 axios와 비동기적으로 실행되는 if문에서의 loginCheck는 다를 수 밖에 없다.
            console.log('까비');           
        }*/

        
        
      }

    }

    return(
      <LoginT> 
          <LoginTop>
          <Link to='/'><LoginTopLOGO src='img/8bit.png' alt='로고'/></Link>
          </LoginTop>
          <LoginInput>
          <InputT>
          <Sumbit onSubmit={OnCheckSubmit}>
          <InputBox placeholder="이메일" onChange={OnChangeEmail}/>
          <InputBox placeholder="비밀번호" onChange={OnChangePw}/>
          <ErrorMessageShow>{message}</ErrorMessageShow>
          <LoginMaintainT>
          <LoginMaintainCheckBox type='checkbox' onClick={Show}/>
          <LoginMaintain>로그인 유지</LoginMaintain>
          <LoginMaintainMessageShow show={isShow}><span>개인정보 보호를 위해 개인 PC에서만 사용하세요.</span></LoginMaintainMessageShow>
          </LoginMaintainT>
          <LoginBtnT>
          <LoginBtn type="submit"><span>로그인</span></LoginBtn>
          </LoginBtnT>
          </Sumbit>
          </InputT>
          <LOGINAPI>
          <Line><span>또는</span></Line>
          <APIList>
            <APIListLI>< APIListA border="rgba(0,0,0,.15)" background="white" API="#"><FcGoogle /></ APIListA></APIListLI>
            <APIListLI>< APIListA border="#1877f2" background="#1877f2" API="#"><FaFacebookF color='white'/></APIListA></APIListLI>
            <APIListLI>< APIListA border="#00c60c" background="#00c60c" API="#"><SiNaver color='white'/></ APIListA></APIListLI>
            <APIListLI>< APIListA border="#1da1f2" background="#1da1f2" API="#"><AiOutlineTwitter color='white'/></ APIListA></APIListLI>
          </APIList>
          </LOGINAPI>
          <EmPwFoundT>
          <EmailPwFoundList>
            <EmailPwFoundListLiBar><Link to='/EmailPwFound'>이메일/비밀번호 찾기</Link></EmailPwFoundListLiBar>
            <EmailPwFoundListLI><Link to='/SIGN'>회원가입</Link></EmailPwFoundListLI>
          </EmailPwFoundList>
          </EmPwFoundT>
        </LoginInput>
      </LoginT>
    );
}

export const InputBox = styled.input
`
    width: 435px;
    padding: 20px 5px 20px 20px;
    margin-bottom: 10px;
    border: none;
    border-radius: 10px;
    caret-color: #03ab95;
    background-color: #f5f5f5;
    font-size:15px;
    &:focus
    {
      border: none;
      outline: none;
      border: solid 2px #6767ff;
      border-radius: 10px;
    }
    &::placeholder
    {
      color:gray;
      font-weight:bolder;
      opacity: 50%;
      font-size: 15px;
    }
`

const ErrorMessageBox = styled.div
`
    display: flex;

`

const ErrorMessageIcon = styled.i
`
    margin: 1px 9px 0px;
`

const LoginT = styled.div
`
    position:relative;
`

const LoginTop = styled.div
`
    text-align: center;
    margin-bottom: 50px;
`
const LoginTopLOGO = styled.img
`
    width: 192px;
    height: 102px;
`

const LoginInput = styled.div
`
    display: inline-block;
`

const InputT = styled.div
`

`

const Sumbit = styled.form
`
`

const ErrorMessageShow = styled.p
`
    display: inline-block;
    margin: 0px;
    font-size: 15px;
    color: red;
`

const LoginMaintain = styled.p
`
    font-size: 15px;
    margin-top: 14px;
    margin-left: 4px;
    font-weight: 400;
`

const LoginMaintainT = styled.div
`
    margin-bottom: 15px;
    display: flex;
`

const LoginMaintainCheckBox = styled.input
`
    accent-color: #6767ff;
    zoom: 1.5;
    margin-top: 3px;
    &:checked
    {
      accent-color: #6767ff;
      zoom: 1.5;
      margin-top: -2px;
    }
`

const LoginMaintainMessageShow = styled.p
`
    display: ${props => props.show ? "block" : "none"};
    margin: 40px 0px 0px -100px;
    font-size: 12px;
    color:gray;
`

const LoginBtnT = styled.div
`
`
const LoginBtn = styled.button
`
    width: 460px;
    height: 44px;
    padding: 0px 16px;
    background: #6767ff;
    border: none;
    border-radius: 0.4rem;
    cursor: pointer;
    color:white;
    font-size: 100%;
    margin-bottom: 30px;
  &:active
  {
      padding: 10px;
      background: #6767ff;
      font-size: 90%;
      opacity: 90%;
  }
`

const Line = styled.p
`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    color:gray;
    font-size: 13px;
    &::before
    {
      height: 1px;
      flex: 1 1 0%;
      content: "";
      background-color: rgba(0,0,0,.06);
    }
    &::after
    {
      height: 1px;
      flex: 1 1 0%;
      content: "";
      background-color: rgba(0,0,0,.06);
    }
    span
    {
      display: block;
      padding-left: 1.6rem;
      padding-right: 1.6rem;
    }
`

const LOGINAPI = styled.div
`
`

const EmPwFoundT = styled.div
`
`

const EmailPwFoundList = styled.ul
`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    list-style: none;
    padding: 0px;
`

const APIList = styled(EmailPwFoundList)
`
    margin:40px 0px 40px 0px;
`

const APIListA = styled.a.attrs((props) => ({href : props.API}))
`
    display: inline-block;
    padding: 5px;
    margin: 0px 10px 0px 10px;
    width: 44px;
    height: 44px;
    border-radius: 30px;
    border: 1px solid ${props => props.border};
    background-color: ${props => props.background};
    cursor: pointer;
    svg
    {
      padding: 10px;
      width: 24px;
      height: 24px;
    }
`

const APIListLI = styled.li
`
`

const EmailPwFoundListLI = styled.li
`
    margin: 0px 10px 0px 10px;
    a
    {
      color:black;
      text-decoration: none;
      margin: 0px 15px 0px 15px;
    }
`

const EmailPwFoundListLiBar = styled(EmailPwFoundListLI)
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
export default Logininput;