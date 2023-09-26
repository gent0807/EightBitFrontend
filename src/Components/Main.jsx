import { styled, createGlobalStyle, ThemeProvider } from 'styled-components';
import Router from './Router';
import { useRecoilValue } from 'recoil';
import { isDark } from './Darkmode/Darkmode';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

const ip= `http://218.155.175.176:8033/EightBitBackend`;

const profileImageDir="http://218.155.175.176:8033/EightBitBackend/resources/Users/profileImage/"

const Main = () => {

  localStorage.setItem("ip", ip);
  localStorage.setItem("profileImageDir", profileImageDir);
  

  const isDarkmode = useRecoilValue(isDark);

  return (
    <ThemeProvider theme={ isDarkmode ? lightTheme : darkTheme }>
    <GlobalStyle />
    <FooterSet>
    <Router />
    </FooterSet>
    </ThemeProvider>
  );
}

export default Main;

const FooterSet = styled.div
`
  min-height: calc(100% - 120px);
  @media (min-width:250px) and (max-width:480px)
    {
        max-width: 480px;
    }
`

const darkTheme = 
{
  backgroundColor: "#1d2024",
  textColor: "#6a9dda",
  successColor: "#6a9dda",
  errorColor: "orange",
  borderColor: "#6a9dda",
  buttonColor: "#6a9dda",
  checkBoxColor: "#6a9dda",
  DropDownListColor: "orange",
  BoardTitle: "white",
  BoardInformaiton: "Orange",
  PaginationSelect: "Orange",
  WriterBorder: "#55aaff"
};

const lightTheme = 
{
  backgroundColor: "white",
  textColor: "black",
  successColor: "green",
  errorColor: "red",
  borderColor: "#3c3c3c",
  buttonColor: "#3c3c3c",
  checkBoxColor: "#3c3c3c",
  DropDownListColor: "#6a9dda",
  BoardTitle: "black",
  BoardInformaiton: "black",
  PaginationSelect: "#6a9dda",
  WriterBorder: "white"
};

const GlobalStyle = createGlobalStyle
`
  ${FooterSet}
  {
    background-color: ${(props) => props.theme.backgroundColor};
    transition: background-color 0.5s, background 0.5s, color 0.5s, box-shadow 0.5s, border 0.5s, accent-color 0.5s;
  }
`

