import { useEffect } from "react";
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

  useEffect(() => {
    
  },[]);

  return (
    <ContainerBox>
        <FirstText>First Page!</FirstText>
    </ContainerBox>
  );
}

export default FirstPage;   