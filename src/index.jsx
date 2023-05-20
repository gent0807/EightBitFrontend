import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './Components/Main.jsx';
import Login from './Components/LoginContainer';
import Sign from './Components/SignContainer';
import EmailPwFound from './Components/EmailPwFoundContainer'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./fonts/font.css"
import styled from 'styled-components';

const All = styled.div
`
    div
    {
      font-family: 'Dung Geun Mo';
    }

    button
    {
      font-family: 'Dung Geun Mo';
    }

    input::placeholder
    {
      font-family: 'Dung Geun Mo';
    }

    input
    {
      font-family: 'Dung Geun Mo';
    }
`
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <All>
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Sign" element={<Sign />} />
        <Route path="/EmailPwFound" element={<EmailPwFound />} />
    </Routes>
  </BrowserRouter>
  </All>
);

reportWebVitals();
