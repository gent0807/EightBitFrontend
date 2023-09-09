import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { styled } from 'styled-components';
import WriteBoard from "./WriteBoard";

let Containerbox = styled.div`
    margin: 0 auto;
    max-width: 833px;
    padding: 267px 0px 54px 0px;
    @media (min-width:250px) and (max-width:666px)
    {
        padding: 358px 0px 54px 0px;
    }
`

const WriteBoardContainer = () =>
{
    return(
        <Containerbox>
            <WriteBoard/>
        </Containerbox>
    );
}

export default WriteBoardContainer;
