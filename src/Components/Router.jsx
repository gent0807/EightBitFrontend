import React, { useState } from "react";
import styled from 'styled-components';
import TopNavBar from './TopNavBar';
import Login from './LoginContainer';
import Sign from './SignContainer';
import EmailPwFound from './EmailPwFoundContainer';
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import Footer from "./Footer";
import NotFound from "./NotFound";



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
    padding-bottom: 166px;
`