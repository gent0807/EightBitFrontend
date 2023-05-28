import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import "./fonts/font.css";
import Main from './Components/Main';
import styled from 'styled-components';
import { Provider } from "react-redux";
import store from "./Components/LoginRedux/Store";

const Font = styled.body
`
  font-family: "NanumSquareR";
  margin: 0px;
  input 
  {
    font-family: "NanumSquareR";
    &::placeholder
    {
      font-family: "NanumSquareR";
    }
  }

  input[type=password] 
  {
    font-family: none;
  }
  
  button
  {
    font-family: "NanumSquareR";
  }

`


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Font>
    <Main />
    </Font>
  </Provider>
);

reportWebVitals();
