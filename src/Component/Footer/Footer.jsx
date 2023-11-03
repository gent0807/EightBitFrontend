import styled from "styled-components";
import { Outlet } from "react-router-dom"

const Footer = () => {
    return (
        <>
        <Outlet />
        <FooterBackground>
            <FooterContainer>
                <FooterText>Copyright 2023. 8bit. All rights reserved.</FooterText>
            </FooterContainer>
        </FooterBackground>
        </>
    );
}

export default Footer;

const FooterContainer = styled.div
    `
    height: 130px;
    max-width: 1500px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (min-width:250px) and (max-width:480px)
    {
        max-width: 480px;
    }
`

const FooterBackground = styled.div
    `
    height: 130px;
    background-color: gray;
    @media (min-width:250px) and (max-width:480px)
    {
        max-width: 480px;
    }
`

const FooterText = styled.span
    `
    color: black;
    padding: 0px 10px 0px 10px;
    text-align: center;
`