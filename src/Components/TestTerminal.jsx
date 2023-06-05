import { useState } from "react";
import styled from "styled-components";


const NotFound = () =>
{   
    
    const[alreadyLogin, setAlreadyLogin]=useState(false);

    return(
        <TestTerminalContainer>
            <TestTerminalText>{alreadyLogin ? "님 환경합니다." : ""}</TestTerminalText>
        </TestTerminalContainer>
    );
}

export default NotFound;

const TestTerminalContainer = styled.div
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

const TestTerminalText = styled.span
`
    color: ${(props) => props.theme.textColor};
    font-size: 25px;
`