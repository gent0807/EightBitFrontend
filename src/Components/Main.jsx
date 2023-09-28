import { styled, createGlobalStyle, ThemeProvider } from 'styled-components';
import Router from './Router';
import { useRecoilValue } from 'recoil';
import { isDark } from './Darkmode/Darkmode';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

const ip = `http://218.155.175.176:8033/EightBitBackend`;

const profileImageDir = "http://218.155.175.176:8033/EightBitBackend/resources/Users/profileImage/"

const Main = () => {

  localStorage.setItem("ip", ip);
  localStorage.setItem("profileImageDir", profileImageDir);


  const isDarkmode = useRecoilValue(isDark);

  return (
    <ThemeProvider theme={isDarkmode ? lightTheme : darkTheme}>
      <GlobalStyle />
      <DarkModeBox>
        <Router />
      </DarkModeBox>
    </ThemeProvider>
  );
}

export default Main;

const DarkModeBox = styled.div
  `
  
`

const darkTheme =
{
  backgroundColor: "rgba(25,25,25,1)",
  textColor: "white",
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
  ${DarkModeBox}
  {
    background-color: ${(props) => props.theme.backgroundColor};

    transition: background-color 0.5s, background 0.5s, color 0.5s, box-shadow 0.5s, border 0.5s, accent-color 0.5s;
  }
`

