import React, { useState } from "react";
import styled from 'styled-components';
import TopNavBar from './Header/TopNavBarContainer';
import Login from './Login/LoginContainer';
import Sign from './Sign/SignContainer';
import EmailPwFound from './EmailPwFound/EmailPwFoundContainer';
import PhoneAuth from './Phone/PhoneAuthContainer';
import PhoneAuth2 from './Phone/PhoneAuthContainer2';
import SelectSign from "./Phone/SelectSignContainer";
import FreeBoard from "./FreeBoard/FreeBoardContainer";
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import Footer from "./Footer/Footer";
import NotFound from "./ErrorPage/NotFound";
import TestTerminal from "./TestTerminal";




const Router = () =>
{
    
return(
    <BrowserRouter>
    <FooterSetContent>
        <TopNavBar/>
        <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/Sign" element={<Sign />} />
            <Route path="/EmailPwFound" element={<EmailPwFound />} />
            <Route path="/PhoneAuth" element={<PhoneAuth />} />
            <Route path="/PhoneAuth2" element={<PhoneAuth2 />} />
            <Route path="/SelectSign" element={<SelectSign />} />
            <Route path="/FreeBoard" element={<FreeBoard />} />
            <Route path="/" element={<TestTerminal />}/>
            <Route path="*" element={<NotFound />} />
        </Routes> 
    </FooterSetContent>
    <Footer/>
    </BrowserRouter>
    );
}

export default Router;

const FooterSetContent = styled.div
`
    padding-bottom: 285px;
`
