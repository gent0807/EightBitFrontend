import { useEffect } from "react";
import { useSelector } from "react-redux";
import {styled} from "styled-components";

const ContainerBox = styled.div
`
    display: flex;
    margin: 0 auto;
    width: 460px;
    justify-content: center;
    align-items: center;
    height: 720px;
    padding: 346px 0px 54px 0px;
    @media (min-width:250px) and (max-width:512px)
    {
    padding: 358px 0px 54px 0px;
    }
`

const FirstText = styled.span
`
    color: ${(props) => props.theme.textColor};
    font-size: 25px;
`

const FirstPage = () => {
  const user=useSelector((state) => state.user);
  let userInfo=localStorage.getItem("userInfo");
  const loginMaintain=localStorage.getItem("loginMaintain");
  userInfo=JSON.parse(userInfo);
  useEffect(() => {
    
  },[]);

  return (
    <ContainerBox>
      <FirstText>
        {loginMaintain == null ? [<div>This is first page!!</div>]: 
        loginMaintain === "true" ? userInfo == null ? [<div>This is first page!!</div>] : userInfo.loginState === "allok" ? [<div>{userInfo.nickName}님 환영합니다!</div>]:[<div>This is first page!!</div>]
        : user.login_state === "allok" ? [<div>{user.nickname}님 환영합니다!</div>]:[<div>This is first page!!</div>]
        }
      </FirstText>
    </ContainerBox>
  );
}

export default FirstPage;   