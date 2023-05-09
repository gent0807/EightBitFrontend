import { Link } from "react-router-dom";
import React, { useState } from "react";
import styled from 'styled-components'
import '../CSS/Main.css';

let Containerbox = styled.div`
    margin: auto;
    max-width: 460px;
    padding: 56px 20px 54px;
`

const Main = () => {

  return (
    <Containerbox>
      <Link to='/Login'>로그인</Link>
    </Containerbox>
  );
  };

export default Main;

