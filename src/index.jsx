import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import "./fonts/font.css";
import Main from './Components/Main';
import styled from 'styled-components';
import { Provider } from "react-redux";
import store from "./Components/Store";

const Font = styled.body
`
  font-family: "Dung Geun Mo";
  margin: 0px;
  input 
  {
    font-family: "Dung Geun Mo";
    &::placeholder
    {
      font-family: "Dung Geun Mo";
    }
  }

  button
  {
    font-family: "Dung Geun Mo";
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
