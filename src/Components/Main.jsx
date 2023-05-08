import { Link } from "react-router-dom";
import '../CSS/Main.css';
import React, { useState } from "react";

const Main = () => {

  return (
    <div className="Container">
      <Link to='/Login'>로그인</Link>
    </div>
  );
  };

export default Main;

