import { styled, createGlobalStyle, ThemeProvider } from 'styled-components';
import Router from './Router';
import { useRecoilValue } from 'recoil';
import { isDark } from './Darkmode/Darkmode';

const Main = () => {
 
  const isDarkmode = useRecoilValue(isDark);

  return (
    <ThemeProvider theme={ isDarkmode ? lightTheme : darkTheme }>
    <GlobalStyle />
    <FooterSet>
    <Router/>
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
        width: 480px;
    }
`

const darkTheme = 
{
  backgroundColor: "#1d2024",
  textColor: "#6a9dda",
  successColor: "green",
  errorColor: "white",
  borderColor: "#6a9dda",
  buttonColor: "#6a9dda",
  checkBoxColor: "#6a9dda",
  DropDownListColor: "#6a9dda",
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
  DropDownListColor: "#3c3c3c",
};

const GlobalStyle = createGlobalStyle
`
  body
  {
    background-color: ${(props) => props.theme.backgroundColor};
  }
`
