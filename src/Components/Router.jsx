import React, { useState } from "react";
import styled from 'styled-components';
import TopNavBar from './TopNavBar';
import Login from './LoginContainer';
import Sign from './SignContainer';
import EmailPwFound from './EmailPwFoundContainer';
import SubNavBar from "./SubNavBar";
import { BrowserRouter, Routes, Route } from 'react-router-dom';



const Router = () =>
{
return(
<BrowserRouter>
    <TopNavBar/>
    <SubNavBar/>
    <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Sign" element={<Sign />} />
        <Route path="/EmailPwFound" element={<EmailPwFound />} />
    </Routes>
</BrowserRouter>
);
}

export default Router;