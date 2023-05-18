import React from 'react';
import ReactDOM from 'react-dom/client';
import './CSS/index.css';
import Main from './Components/Main';
import Login from './Components/LoginContainer';
import Sign from './Components/SignContainer';
import EmailPwFound from './Components/EmailPwFoundContainer'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./fonts/font.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Sign" element={<Sign />} />
        <Route path="/EmailPwFound" element={<EmailPwFound />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
