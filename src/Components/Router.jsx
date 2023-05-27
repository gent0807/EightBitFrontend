import React, { useState } from "react";
import styled from 'styled-components';
import TopNavBar from './TopNavBar';
import Login from './LoginContainer';
import Sign from './SignContainer';
import EmailPwFound from './EmailPwFoundContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from "./Footer";



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
    </Routes>
</FooterSetContent>
    <Footer/>
</BrowserRouter>
);
}

export default Router;

const FooterSetContent = styled.div
`
    padding-bottom: 500px;
`